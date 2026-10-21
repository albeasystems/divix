import IronSource
import Foundation
import Combine
import os
#if canImport(UIKit)
import UIKit
#endif
#if canImport(GoogleMobileAds)
import GoogleMobileAds
#endif

/// Ad-layer logging. Filter the console with `subsystem:com.albeasystems.Divix
/// category:ads-*` (or `AdsLog` in Xcode) to isolate mediation issues.
enum AdsLog {
    private static let subsystem = "com.albeasystems.Divix"
    static let sdk          = Logger(subsystem: subsystem, category: "ads-sdk")
    static let banner       = Logger(subsystem: subsystem, category: "ads-banner")
    static let interstitial = Logger(subsystem: subsystem, category: "ads-interstitial")
    static let rewarded     = Logger(subsystem: subsystem, category: "ads-rewarded")
    static let auction      = Logger(subsystem: subsystem, category: "ads-auction")
    static let consent      = Logger(subsystem: subsystem, category: "ads-consent")
}

// MARK: - AdsManager
//
// Gestor de anuncios sobre Unity LevelPlay (mediación ironSource). AGNÓSTICO DE
// RED: solo referencia la capa de mediación (LevelPlay / LPM*), nunca una red
// concreta. La única excepción es el registro del test device de AdMob en DEBUG,
// acotado con `#if canImport(GoogleMobileAds)`.
//
// Añadir o quitar una red = tocar SOLO el Podfile + el dashboard de LevelPlay.

@MainActor
final class AdsManager: NSObject, ObservableObject {

    static let shared = AdsManager()

    /// Whether the SDK is ready to take ad requests. Ad views must wait on this:
    /// requests before init are wasted, and ATT/consent has to be resolved first.
    @Published private(set) var isInitialized = false

    /// Whether a full-screen interstitial is currently on screen.
    @Published private(set) var isShowingInterstitial = false

    // MARK: Ventana sin anuncios (rewarded)

    /// Instante hasta el que la app está "sin anuncios" por haber visto un
    /// rewarded. Persistido para sobrevivir a un relaunch.
    @Published private(set) var adFreeUntil: Date?

    /// `true` mientras una petición de rewarded iniciada por el usuario está en
    /// curso (para el spinner de la pastilla del Home).
    @Published var isFetchingRewarded = false

    /// Se pone a `true` cuando no hay vídeo disponible tras el timeout (dispara
    /// el aviso "No hay vídeo disponible"). La vista lo resetea al cerrar.
    @Published var rewardedUnavailable = false

    /// `true` si el usuario es premium de pago O está dentro de la ventana
    /// rewarded. Se computa SIEMPRE desde la fecha guardada (nunca queda stale).
    var isAdFree: Bool {
        if PremiumService.shared.isPremium { return true }
        if let until = adFreeUntil, until > Date() { return true }
        return false
    }

    var isRewardedReady: Bool { rewardedAd?.isAdReady() ?? false }

    // MARK: Estado interno

    private var interstitialAd: LPMInterstitialAd?
    /// Ref FUERTE: el SDK guarda el delegado en débil y, sin esto, se libera y
    /// dejan de llegar callbacks.
    private var interstitialDelegate: InterstitialAdDelegate?
    private var interstitialLoadInFlight = false
    private var interstitialRetryDelay: TimeInterval = AdConfig.interstitialBaseRetryDelay
    private var successfulActionsCount = 0
    private var lastInterstitialShownAt: Date?

    /// Cuándo se cerró el último intersticial. Lo lee `ReviewService` para no
    /// pedir valoración con el anuncio recién quitado de en medio.
    private(set) var lastInterstitialClosedAt: Date?

    /// Intersticiales ya mostrados en esta sesión, contra `maxInterstitialsPerSession`.
    private var interstitialsThisSession = 0

    /// Tarea de espera de fill del intersticial del primer cálculo.
    private var firstActionAdTask: Task<Void, Never>?

    /// Temporizador del intersticial por tiempo (ver `scheduleSessionInterstitial`).
    private var sessionInterstitialTask: Task<Void, Never>?

    /// Inicio de la sesión de uso actual, reiniciado por `noteNewSession()`. Si
    /// solo significara "arranque en frío", volver a la app tras horas no tendría
    /// ninguna gracia de arranque y el anuncio podría salir en la primera acción.
    private var sessionStartDate = Date()

    /// true durante la primera visita tras instalar. Se persiste en cuanto se
    /// arranca, así que el siguiente arranque (o una sesión nueva) ya no lo es.
    private var isFirstInstallSession = false

    /// Edad mínima de la sesión antes de cualquier intersticial: 180 s en la
    /// primera visita, 60 s después.
    private var minSessionAge: TimeInterval {
        isFirstInstallSession ? AdConfig.firstSessionInterstitialDelay
                              : AdConfig.sessionInterstitialDelay
    }

    private var rewardedAd: LPMRewardedAd?
    private var rewardedDelegate: RewardedAdDelegate?   // ref fuerte (ídem)
    private var rewardedLoadInFlight = false
    private var expiryTask: Task<Void, Never>?

    private override init() {
        super.init()
        let defaults = UserDefaults.standard
        isFirstInstallSession = !defaults.bool(forKey: AdConfig.firstSessionDoneKey)
        defaults.set(true, forKey: AdConfig.firstSessionDoneKey)
        // Rehidratar la ventana sin anuncios desde disco.
        let ts = UserDefaults.standard.double(forKey: AdConfig.adFreeUntilKey)
        if ts > 0 {
            let date = Date(timeIntervalSince1970: ts)
            if date > Date() {
                adFreeUntil = date
                scheduleExpiry()
            }
        }
    }

    // MARK: - Inicialización

    /// Inicializa la mediación. Llamar UNA vez, después de resolver el prompt de
    /// ATT y el formulario de consentimiento (ver `DivixApp`), para que el SDK
    /// arranque con la decisión del usuario ya tomada.
    func initialize() {
        guard !isInitialized else { return }

        #if DEBUG
        // Logs detallados por adaptador (qué red inicializa/responde) + reporte
        // de integración: imprime VERIFIED / NOT VERIFIED por cada red, así que
        // confirma en segundos si el Podfile y el dashboard están alineados.
        LevelPlay.setAdaptersDebug(true)
        LevelPlay.validateIntegration()
        // Habilita el Test Suite de LevelPlay: DEBE fijarse antes de initWith.
        LevelPlay.setMetaDataWithKey("is_test_suite", value: "enable")
        #endif

        let request = LPMInitRequest(appKey: AdConfig.appKey, userId: nil)
        AdsLog.sdk.info("initializing LevelPlay…")

        LevelPlay.initWith(request) { [weak self] _, error in
            let errorText = error?.localizedDescription
            Task { @MainActor in
                guard let self else { return }
                if let errorText {
                    AdsLog.sdk.error("LevelPlay init failed: \(errorText, privacy: .public)")
                    return
                }
                AdsLog.sdk.info("LevelPlay initialized — SDK \(LevelPlay.sdkVersion(), privacy: .public)")
                self.isInitialized = true
                #if DEBUG
                self.configureAdMobTestDeviceIfNeeded()
                #endif
                // Delegado de impresiones (log de subasta) — justo tras init.
                LevelPlay.add(self)
                self.preloadInterstitial()
                self.preloadRewarded()
            }
        }
    }

    #if DEBUG
    /// Abre el Test Suite de LevelPlay (probar cada red/formato por separado,
    /// p. ej. solo AdMob). Requiere el SDK ya inicializado.
    func launchTestSuite() {
        guard isInitialized, let vc = UIApplication.shared.topViewController else {
            AdsLog.sdk.error("Test Suite unavailable: SDK not initialized or no view controller")
            return
        }
        LevelPlay.launchTestSuite(vc)
    }

    /// Registra este dispositivo como test device de AdMob (la red la arrastra el
    /// adaptador). Sin esto, en un iPhone REAL recibes anuncios REALES y
    /// arriesgas que la cuenta se marque por tráfico inválido con los toques de
    /// desarrollo.
    ///
    /// El hash es POR DISPOSITIVO: lo imprime el SDK de Google en la consola de
    /// Xcode la primera vez que se pide un anuncio en ESE iPhone concreto
    /// ("<Google> To get test ads on this device, set: ..."). Añádelo abajo.
    /// El del simulador no sirve — el que importa es el del iPhone físico.
    ///
    /// Nombre de API en Google Mobile Ads 12.x: `MobileAds.shared` (propiedad),
    /// NO `GADMobileAds.sharedInstance()` (perdió el prefijo GAD).
    private func configureAdMobTestDeviceIfNeeded() {
        #if canImport(GoogleMobileAds)
        // En el simulador usamos GADBannerView directo con test unit IDs de AdMob
        // (ver AdMobSimulatorBannerHost en AdBannerView.swift), así que no necesitamos
        // registrar un hash aquí para el simulador.
        //
        // En un iPhone REAL, el hash del dispositivo aparece en consola la primera
        // vez que se pide un anuncio a AdMob:
        //   "<Google> To get test ads on this device, set:
        //    GADMobileAds.sharedInstance.requestConfiguration.testDeviceIdentifiers
        //    = @[ @"XXXXXX" ]"
        // Pega ese hash en el array de abajo para evitar recibir anuncios reales
        // durante el desarrollo y no arriesgar la cuenta de AdMob.
        let realDeviceTestHashes: [String] = [
            // TODO: pegar el hash del iPhone de prueba cuando lo imprima la consola.
        ]
        guard !realDeviceTestHashes.isEmpty else { return }
        MobileAds.shared.requestConfiguration.testDeviceIdentifiers = realDeviceTestHashes
        AdsLog.sdk.info("AdMob test devices configured: \(realDeviceTestHashes.count) identifier(s)")
        #endif
    }
    #endif

    // MARK: - Intersticial

    /// Pre-fetches the next interstitial. Bloqueada solo por premium: mantiene uno
    /// listo para cuando termine la ventana rewarded.
    /// VC raíz para el banner. A diferencia de `topViewController`, NO sube hasta
    /// el modal de más arriba: el banner vive en la jerarquía de la pantalla, y
    /// pasarle una hoja presentada lo deja colgando de un VC que desaparece.
    func bannerRootViewController() -> UIViewController? {
        UIApplication.shared.activeKeyWindow?.rootViewController
    }

    func preloadInterstitial() {
        guard isInitialized, !PremiumService.shared.isPremium else { return }
        guard !interstitialLoadInFlight, !(interstitialAd?.isAdReady() ?? false) else { return }

        let delegate = InterstitialAdDelegate(manager: self)
        let ad = LPMInterstitialAd(adUnitId: AdConfig.interstitialAdUnitId)
        ad.setDelegate(delegate)
        interstitialDelegate = delegate
        interstitialAd = ad
        interstitialLoadInFlight = true
        AdsLog.interstitial.info("preloading interstitial…")
        ad.loadAd()
    }

    /// Records a completed conversion — the app's natural transition point — and
    /// shows an interstitial when every gate allows it.
    ///
    /// Esta vía pacea el anuncio REPETIDO. El primero de cada sesión no sale de
    /// aquí: lo dispara el hueco de los 5 s tras el primer cálculo, que reclama
    /// `ReviewService` y cede a `showInterstitialAfterFirstAction()`.
    @discardableResult
    func registerSuccessfulConversion() -> Bool {
        // El review va PRIMERO, y fuera de cualquier guarda de anuncios: un
        // usuario premium (o dentro de la ventana rewarded) también tiene que
        // poder puntuar la app. Si el diálogo acaba de aparecer,
        // `maybeShowInterstitial` lo respetará con su tiempo de gracia.
        ReviewService.shared.registerConversion()

        // Contar SIEMPRE, aunque el SDK no haya inicializado todavía. El init
        // va detrás del prompt de ATT y del formulario de consentimiento, así
        // que puede tardar varios segundos: si aquí se descartara la conversión,
        // las primeras de cada sesión no contarían nunca y el intersticial
        // tardaría muchísimo más de lo configurado en aparecer.
        // Lo que sí depende del init es PRESENTAR, y eso se comprueba abajo.
        guard !isAdFree else { return false }
        // Tope en el umbral para que un rato bloqueado no acumule una deuda que
        // dispare un anuncio en el instante en que se abra la puerta.
        successfulActionsCount = min(successfulActionsCount + 1,
                                     AdConfig.successfulActionsRequired)
        // `.info` y no `.debug`: los mensajes debug no se persisten en el log
        // store, y este contador es justo lo que hay que poder observar en
        // consola para razonar sobre el frequency capping.
        AdsLog.interstitial.info("successful action (\(self.successfulActionsCount)/\(AdConfig.successfulActionsRequired))")
        return maybeShowInterstitial()
    }

    /// Llamar cuando empieza una sesión de uso nueva — lo decide `ReviewService`,
    /// que es quien mide el hueco fuera de la app.
    ///
    /// Reinicia el paceo del intersticial: sin esto, quien se va con el contador
    /// en 2/3 recibe el anuncio en su PRIMERA acción al volver, que es justo la
    /// interrupción más irritante y la que hunde las valoraciones.
    func noteNewSession() {
        successfulActionsCount = 0
        interstitialsThisSession = 0
        sessionStartDate = Date()
        isFirstInstallSession = false
        firstActionAdTask?.cancel()
        firstActionAdTask = nil
        AdsLog.interstitial.info("new session — interstitial pacing reset")
        scheduleSessionInterstitial()
        preloadInterstitial()
    }

    /// El primer cálculo de la sesión reserva un hueco de 5 s. La valoración tiene
    /// preferencia (`ReviewService.fireFirstActionSlot()`); cuando renuncia —ya
    /// preguntada, aún en su cooldown— el hueco llega aquí en vez de perderse, y
    /// cuando se lo queda, el intersticial vuelve aquí
    /// `AdConfig.interstitialDelayAfterReview` segundos después.
    ///
    /// Se salta a propósito el contador de acciones y `launchGracePeriod`: esos
    /// pacean el anuncio REPETIDO, y este va programado explícitamente después de
    /// que el usuario pidiera algo. Todo lo que protege al usuario sigue en pie:
    /// el tope por sesión, el cooldown entre dos anuncios y la gracia tras la
    /// valoración.
    func showInterstitialAfterFirstAction() {
        guard !isAdFree, !isShowingInterstitial else { return }
        guard UIApplication.shared.applicationState == .active else { return }
        guard interstitialsThisSession < AdConfig.maxInterstitialsPerSession else {
            AdsLog.interstitial.info("first-action interstitial skipped — session cap reached")
            return
        }
        guard Date().timeIntervalSince(sessionStartDate) >= minSessionAge else {
            AdsLog.interstitial.info("first-action interstitial skipped — session too young")
            return
        }
        if let last = lastInterstitialShownAt,
           Date().timeIntervalSince(last) < AdConfig.interstitialCooldown {
            AdsLog.interstitial.info("first-action interstitial skipped — cooldown active")
            return
        }
        if let reviewedAt = ReviewService.shared.lastRequestedAt,
           Date().timeIntervalSince(reviewedAt) < AdConfig.interstitialDelayAfterReview {
            AdsLog.interstitial.info("first-action interstitial skipped — review prompt still fresh")
            return
        }

        // Dejar el contador en el umbral: si no entra fill a tiempo, lo muestra la
        // siguiente conversión en vez de empezar otra vez de cero.
        successfulActionsCount = AdConfig.successfulActionsRequired

        // A los 5 s el SDK puede no estar arriba: en un arranque en frío el init va
        // DETRÁS del prompt de ATT y del formulario de consentimiento, y eso son
        // varios segundos. Comprobarlo antes de parquear el contador perdía el
        // anuncio del todo; así la siguiente conversión lo muestra en cuanto haya SDK.
        guard isInitialized else {
            AdsLog.interstitial.info("first-action interstitial deferred — SDK not initialized yet")
            return
        }

        if interstitialAd?.isAdReady() == true {
            presentInterstitialIfReady()
            return
        }

        // A los 5 s, un arranque en frío puede estar aún esperando su primera
        // subasta: esperar unos segundos convierte un fill lento en impresión.
        AdsLog.interstitial.info("first-action interstitial — waiting for fill")
        preloadInterstitial()
        firstActionAdTask?.cancel()
        firstActionAdTask = Task { @MainActor [weak self] in
            let deadline = Date().addingTimeInterval(AdConfig.firstActionAdWaitTimeout)
            while Date() < deadline {
                try? await Task.sleep(for: .milliseconds(250))
                guard !Task.isCancelled, let self, !self.isShowingInterstitial else { return }
                guard self.interstitialAd?.isAdReady() == true else { continue }
                guard UIApplication.shared.applicationState == .active else { return }
                self.presentInterstitialIfReady()
                return
            }
            AdsLog.interstitial.info("first-action interstitial — no fill in time, deferred to the next conversion")
        }
    }

    /// Programa el intersticial por tiempo: `AdConfig.sessionInterstitialDelay`
    /// segundos después del inicio de la sesión (descontando lo ya transcurrido,
    /// p. ej. mientras salían ATT y el consentimiento). Llamar al arrancar y al
    /// abrir sesión nueva; es idempotente.
    func scheduleSessionInterstitial() {
        sessionInterstitialTask?.cancel()
        let remaining = max(0, minSessionAge
                            - Date().timeIntervalSince(sessionStartDate))
        AdsLog.interstitial.info("session interstitial scheduled in \(Int(remaining))s")
        sessionInterstitialTask = Task { @MainActor [weak self] in
            try? await Task.sleep(for: .seconds(remaining))
            guard !Task.isCancelled, let self else { return }
            self.sessionInterstitialTask = nil
            AdsLog.interstitial.info("session interstitial timer fired")
            self.showInterstitialAfterFirstAction()
        }
    }

    /// Presenta el intersticial precargado solo si se cumple TODO: no hay otro en
    /// pantalla, pasó la gracia de inicio de sesión, hay suficientes conversiones,
    /// la valoración ya se ha pedido, venció el cooldown, queda cupo de sesión y
    /// hay un anuncio listo.
    ///
    /// NOTA de comportamiento (consciente, igual que en las otras apps): si un
    /// guard bloquea, el contador de acciones NO se resetea — se queda en el umbral
    /// y el intersticial sale en la SIGUIENTE conversión que pase todos los
    /// guards. Solo se resetea al presentar un intersticial o al abrir sesión.
    @discardableResult
    private func maybeShowInterstitial() -> Bool {
        guard isInitialized, !isShowingInterstitial else { return false }
        // Nunca interrumpir justo al abrir la app (o al volver a ella).
        guard Date().timeIntervalSince(sessionStartDate) >= max(AdConfig.launchGracePeriod, minSessionAge) else { return false }
        // Solo tras unas cuantas interacciones satisfactorias.
        guard successfulActionsCount >= AdConfig.successfulActionsRequired else {
            preloadInterstitial()   // la siguiente conversión puede ser la buena
            return false
        }
        // LA VALORACIÓN VA PRIMERO: retener el intersticial hasta haber lanzado la
        // solicitud al menos una vez, para que un anuncio no agrie al usuario justo
        // antes de pedirle estrellas.
        guard ReviewService.shared.allowsInterstitials else {
            AdsLog.interstitial.info("interstitial held back — review not requested yet")
            return false
        }
        // Y tampoco encadenar el diálogo con un anuncio inmediatamente después.
        if let reviewedAt = ReviewService.shared.lastRequestedAt,
           Date().timeIntervalSince(reviewedAt) < AdConfig.interstitialDelayAfterReview {
            AdsLog.interstitial.info("interstitial held — review prompt shown \(Int(Date().timeIntervalSince(reviewedAt)))s ago")
            return false
        }
        // Frequency cap.
        if let last = lastInterstitialShownAt,
           Date().timeIntervalSince(last) < AdConfig.interstitialCooldown {
            return false
        }
        // Techo duro por sesión. Es la guardia que permite que el cooldown sea de
        // 2,5 min y no de 5: sin ella, una sesión larga vuelve a ser un pase de
        // diapositivas (una sesión de 20 min daría ~8 impresiones).
        guard interstitialsThisSession < AdConfig.maxInterstitialsPerSession else {
            AdsLog.interstitial.info("interstitial capped — \(self.interstitialsThisSession) already shown this session")
            return false
        }
        return presentInterstitialIfReady()
    }

    /// Último tramo común a las dos vías (contador y hueco del primer cálculo):
    /// presenta si hay fill y hay dónde presentar. Aquí —y solo aquí— se apuntan
    /// el cooldown, el cupo de sesión y el reset del contador.
    @discardableResult
    private func presentInterstitialIfReady() -> Bool {
        guard let ad = interstitialAd, ad.isAdReady() else {
            // Sin fill todavía. El contador se queda en el umbral, así que la
            // siguiente conversión reintenta; y se vuelve a pedir anuncio aquí para
            // no quedarse esperando al backoff.
            AdsLog.interstitial.debug("interstitial not ready yet (no fill or still loading)")
            preloadInterstitial()
            return false
        }
        guard let vc = UIApplication.shared.topViewController else { return false }

        isShowingInterstitial = true
        lastInterstitialShownAt = Date()
        successfulActionsCount = 0
        interstitialsThisSession += 1
        AdsLog.interstitial.info("presenting interstitial (\(self.interstitialsThisSession)/\(AdConfig.maxInterstitialsPerSession) this session)")
        AdDiagnostics.shared.recordShow(format: "interstitial")
        // placementName es nullable → nil salvo que se usen placements concretos.
        ad.showAd(viewController: vc, placementName: nil)
        return true
    }

    // MARK: Callbacks del intersticial (invocados desde InterstitialAdDelegate)

    fileprivate func interstitialDidLoad(_ info: AuctionInfo) {
        interstitialLoadInFlight = false
        interstitialRetryDelay = AdConfig.interstitialBaseRetryDelay   // reset del backoff
        AdsLog.interstitial.info("interstitial preloaded and ready")
        AdDiagnostics.shared.record(load: info)
    }

    fileprivate func interstitialDidFailToLoad(_ message: String) {
        interstitialLoadInFlight = false
        interstitialAd = nil
        interstitialDelegate = nil
        let delay = interstitialRetryDelay
        interstitialRetryDelay = min(interstitialRetryDelay * 2, AdConfig.interstitialMaxRetryDelay)
        AdsLog.interstitial.error("interstitial load failed: \(message, privacy: .public) — retry in \(Int(delay))s")
        AdDiagnostics.shared.recordFailure(format: "interstitial", message: message)
        Task { @MainActor [weak self] in
            try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
            self?.preloadInterstitial()
        }
    }

    fileprivate func interstitialDidClose() {
        isShowingInterstitial = false
        lastInterstitialClosedAt = Date()
        interstitialAd = nil
        interstitialDelegate = nil
        preloadInterstitial()   // solo ahora es legal pedir el siguiente
    }

    fileprivate func interstitialDidFailToShow(_ message: String) {
        isShowingInterstitial = false
        interstitialAd = nil
        interstitialDelegate = nil
        // El anuncio no llegó al usuario, así que no se le cobra: deshacer el
        // cooldown y el cupo de sesión, y dejar el contador en el umbral para que
        // la siguiente conversión pueda reintentar de inmediato.
        lastInterstitialShownAt = nil
        interstitialsThisSession = max(0, interstitialsThisSession - 1)
        successfulActionsCount = AdConfig.successfulActionsRequired
        AdsLog.interstitial.error("interstitial failed to show: \(message, privacy: .public)")
        preloadInterstitial()
    }

    // MARK: - Rewarded → ventana sin anuncios

    /// Precarga del rewarded. Bloqueada SOLO por premium (no por `isAdFree`), para
    /// que un usuario dentro de la hora libre pueda ver otro vídeo y ampliarla.
    func preloadRewarded() {
        guard isInitialized, !PremiumService.shared.isPremium else { return }
        guard !rewardedLoadInFlight, !isRewardedReady else { return }

        let delegate = RewardedAdDelegate(manager: self)
        let ad = LPMRewardedAd(adUnitId: AdConfig.rewardedAdUnitId)
        ad.setDelegate(delegate)
        rewardedDelegate = delegate
        rewardedAd = ad
        rewardedLoadInFlight = true
        AdsLog.rewarded.info("loading rewarded…")
        ad.loadAd()
    }

    /// Muestra el rewarded cacheado; si no lo hay, lanza una carga bajo demanda y
    /// sondea hasta `timeout` s. Si falla, marca `rewardedUnavailable`.
    func showRewardedFetchingIfNeeded(timeout: TimeInterval = 6) {
        guard !PremiumService.shared.isPremium else { return }
        if isRewardedReady {
            presentRewarded()
            return
        }
        isFetchingRewarded = true
        preloadRewarded()
        Task { @MainActor in
            let deadline = Date().addingTimeInterval(timeout)
            while Date() < deadline {
                try? await Task.sleep(nanoseconds: 200_000_000)   // 200 ms
                if isRewardedReady {
                    isFetchingRewarded = false
                    presentRewarded()
                    return
                }
            }
            isFetchingRewarded = false
            rewardedUnavailable = true
            AdsLog.rewarded.info("rewarded unavailable after \(Int(timeout))s")
        }
    }

    private func presentRewarded() {
        guard let ad = rewardedAd, ad.isAdReady(),
              let vc = UIApplication.shared.topViewController else {
            rewardedUnavailable = true
            return
        }
        isFetchingRewarded = false
        AdsLog.rewarded.info("presenting rewarded")
        AdDiagnostics.shared.recordShow(format: "rewarded")
        ad.showAd(viewController: vc, placementName: nil)
    }

    /// Recalcula el estado de la ventana; llamar en `scenePhase == .active` porque
    /// el `Task.sleep` de expiración no corre con la app suspendida.
    func refreshAdFreeState() {
        if let until = adFreeUntil, until <= Date() {
            adFreeUntil = nil
            preloadRewarded()
        } else if adFreeUntil != nil {
            scheduleExpiry()
        }
    }

    // MARK: Callbacks del rewarded (invocados desde RewardedAdDelegate)

    fileprivate func rewardedDidLoad(_ info: AuctionInfo) {
        rewardedLoadInFlight = false
        AdsLog.rewarded.info("rewarded loaded")
        AdDiagnostics.shared.record(load: info)
    }

    fileprivate func rewardedDidFailToLoad(_ message: String) {
        rewardedLoadInFlight = false
        rewardedAd = nil
        rewardedDelegate = nil
        AdsLog.rewarded.error("rewarded load failed: \(message, privacy: .public)")
        AdDiagnostics.shared.recordFailure(format: "rewarded", message: message)
    }

    fileprivate func rewardedDidClose() {
        rewardedAd = nil
        rewardedDelegate = nil
        preloadRewarded()   // dejar otro listo
    }

    fileprivate func rewardedDidFailToShow(_ message: String) {
        isFetchingRewarded = false
        rewardedUnavailable = true
        rewardedAd = nil
        rewardedDelegate = nil
        AdsLog.rewarded.error("rewarded failed to show: \(message, privacy: .public)")
        preloadRewarded()
    }

    /// Concede/AMPLÍA la ventana sin anuncios: extiende desde el vencimiento
    /// actual (no reinicia), para no quitar tiempo ya ganado.
    fileprivate func grantAdFreeWindow() {
        let base = max(Date(), adFreeUntil ?? .distantPast)
        let newUntil = base.addingTimeInterval(AdConfig.rewardedAdFreeDuration)
        adFreeUntil = newUntil
        UserDefaults.standard.set(newUntil.timeIntervalSince1970, forKey: AdConfig.adFreeUntilKey)
        AdsLog.rewarded.info("reward granted — ad-free until \(newUntil, privacy: .public)")
        scheduleExpiry()
    }

    private func scheduleExpiry() {
        expiryTask?.cancel()
        guard let until = adFreeUntil else { return }
        let interval = until.timeIntervalSinceNow
        guard interval > 0 else { adFreeUntil = nil; return }
        expiryTask = Task { @MainActor [weak self] in
            try? await Task.sleep(nanoseconds: UInt64(interval * 1_000_000_000))
            guard let self, !Task.isCancelled else { return }
            if let u = self.adFreeUntil, u <= Date() {
                self.adFreeUntil = nil
                self.preloadRewarded()
            }
        }
    }
}

// MARK: - LPMImpressionDataDelegate (log de subasta: qué red gana)
//
// Solo reporta el GANADOR de cada impresión (cubre banner/interstitial/rewarded).
// El SDK NO expone qué redes pujaron y perdieron, ni cuáles no llegaron a pujar:
// ese desglose está SOLO en el dashboard de LevelPlay (Mediation → tabla de
// redes con eCPM/Imps/SOW). En DEBUG, `setAdaptersDebug(true)` imprime además
// logs por adaptador en consola.

extension AdsManager: LPMImpressionDataDelegate {
    nonisolated func impressionDataDidSucceed(_ impressionData: LPMImpressionData) {
        let info = AuctionInfo(impressionData)
        let auctionId = impressionData.auctionId
        Task { @MainActor in
            AdsLog.auction.info("auction won (impression) — \(info.format, privacy: .public) / \(info.network ?? "?", privacy: .public) / \(info.instance ?? "?", privacy: .public) / \(info.revenue.map { "\($0)" } ?? "?", privacy: .public) / \(info.precision ?? "?", privacy: .public) / \(auctionId ?? "?", privacy: .public)")
            AdDiagnostics.shared.record(impression: info, auctionId: auctionId)
        }
    }
}

// MARK: - AuctionInfo
//
// Vista propia y Sendable de los datos de subasta. `LPMAdInfo` y
// `LPMImpressionData` son dos tipos distintos del SDK con los mismos campos
// útiles; normalizarlos aquí evita duplicar el mapeo y permite cruzar el hilo
// desde los callbacks `nonisolated` del SDK hasta el @MainActor.

struct AuctionInfo: Sendable {
    let format: String
    let network: String?
    let instance: String?
    let revenue: Double?
    let precision: String?
    let country: String?

    init(_ adInfo: LPMAdInfo) {
        format = adInfo.adFormat
        network = adInfo.adNetwork
        instance = adInfo.instanceName
        revenue = adInfo.revenue.doubleValue
        precision = adInfo.precision
        country = adInfo.country
    }

    init(_ data: LPMImpressionData) {
        format = data.adFormat ?? "?"
        network = data.adNetwork
        instance = data.instanceName
        revenue = data.revenue?.doubleValue
        precision = data.precision
        country = data.country
    }
}

// MARK: - InterstitialAdDelegate
//
// GOTCHA: `LPMInterstitialAdDelegate` y `LPMRewardedAdDelegate` declaran los
// MISMOS selectores a nivel ObjC, así que un solo objeto NO puede ser delegado de
// ambos formatos. De ahí una clase separada por formato, cada una reenviando al
// manager. El SDK guarda el delegado en DÉBIL → el manager mantiene la ref fuerte.

final class InterstitialAdDelegate: NSObject, LPMInterstitialAdDelegate {
    weak var manager: AdsManager?

    init(manager: AdsManager) {
        self.manager = manager
        super.init()
    }

    func didLoadAd(with adInfo: LPMAdInfo) {
        let mgr = manager
        let info = AuctionInfo(adInfo)
        Task { @MainActor in mgr?.interstitialDidLoad(info) }
    }

    func didFailToLoadAd(withAdUnitId adUnitId: String, error: Error) {
        let mgr = manager
        let message = error.localizedDescription
        Task { @MainActor in mgr?.interstitialDidFailToLoad(message) }
    }

    func didDisplayAd(with adInfo: LPMAdInfo) {}

    func didCloseAd(with adInfo: LPMAdInfo) {
        let mgr = manager
        Task { @MainActor in mgr?.interstitialDidClose() }
    }

    func didFailToDisplayAd(with adInfo: LPMAdInfo, error: Error) {
        let mgr = manager
        let message = error.localizedDescription
        Task { @MainActor in mgr?.interstitialDidFailToShow(message) }
    }

    func didClickAd(with adInfo: LPMAdInfo) {}
}

// MARK: - RewardedAdDelegate
//
// Clase separada por el mismo motivo que arriba. Además del juego común de
// callbacks, el rewarded añade `didRewardAd(with:reward:)`.

final class RewardedAdDelegate: NSObject, LPMRewardedAdDelegate {
    weak var manager: AdsManager?

    init(manager: AdsManager) {
        self.manager = manager
        super.init()
    }

    func didLoadAd(with adInfo: LPMAdInfo) {
        let mgr = manager
        let info = AuctionInfo(adInfo)
        Task { @MainActor in mgr?.rewardedDidLoad(info) }
    }

    func didFailToLoadAd(withAdUnitId adUnitId: String, error: Error) {
        let mgr = manager
        let message = error.localizedDescription
        Task { @MainActor in mgr?.rewardedDidFailToLoad(message) }
    }

    func didDisplayAd(with adInfo: LPMAdInfo) {}

    func didRewardAd(with adInfo: LPMAdInfo, reward: LPMReward) {
        let mgr = manager
        Task { @MainActor in mgr?.grantAdFreeWindow() }
    }

    func didCloseAd(with adInfo: LPMAdInfo) {
        let mgr = manager
        Task { @MainActor in mgr?.rewardedDidClose() }
    }

    func didFailToDisplayAd(with adInfo: LPMAdInfo, error: Error) {
        let mgr = manager
        let message = error.localizedDescription
        Task { @MainActor in mgr?.rewardedDidFailToShow(message) }
    }

    func didClickAd(with adInfo: LPMAdInfo) {}
}

#if canImport(UIKit)
extension UIApplication {

    /// The active, foreground key window (falls back to any window).
    var activeKeyWindow: UIWindow? {
        let scenes = connectedScenes.compactMap { $0 as? UIWindowScene }
        if let foreground = scenes.first(where: { $0.activationState == .foregroundActive }),
           let key = foreground.windows.first(where: \.isKeyWindow) ?? foreground.windows.first {
            return key
        }
        return scenes.flatMap(\.windows).first { $0.isKeyWindow } ?? scenes.flatMap(\.windows).first
    }

    /// Top-most presented view controller — hosts full-screen ads.
    var topViewController: UIViewController? {
        var top = activeKeyWindow?.rootViewController
        while let presented = top?.presentedViewController {
            top = presented
        }
        return top
    }
}
#endif
