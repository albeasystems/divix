import StoreKit
import UIKit
import os

// MARK: - ReviewService
//
// Pide la valoración nativa poco después del PRIMER cálculo de cada sesión.
// Apple limita a 3 las solicitudes que realmente MUESTRA al año; las llamadas que
// descarta en silencio no gastan esa cuota, así que pedir pronto y a menudo por
// nuestro lado es gratis.
//
// Coordinación con los anuncios: LA VALORACIÓN VA PRIMERO. Tiene preferencia
// sobre el hueco de los 5 s tras el primer cálculo; si lo coge, el intersticial se
// programa `AdConfig.interstitialDelayAfterReview` segundos después de ella. Si
// renuncia (ya preguntada, dentro de su cooldown, sin escena activa), el hueco
// pasa íntegro al intersticial en vez de desperdiciarse. Ver `fireFirstActionSlot()`.

@MainActor
final class ReviewService {

    static let shared = ReviewService()

    private let log = Logger(subsystem: "com.albeasystems.Divix", category: "review")

    // MARK: - Estado persistido

    private let totalConversionsKey  = "divix_review_total_conversions"
    private let lastRequestKey       = "divix_review_last_request_ts"
    private let ratedManuallyKey     = "divix_review_rated_manually"
    private let sessionsKey          = "divix_review_session_count"
    private let lastForegroundKey    = "divix_review_last_foreground_ts"

    /// Conversiones acumuladas entre sesiones. Solo alimenta la válvula de escape
    /// de los anuncios: la valoración ya no depende de un umbral.
    private var totalConversions: Int {
        get { UserDefaults.standard.integer(forKey: totalConversionsKey) }
        set { UserDefaults.standard.set(newValue, forKey: totalConversionsKey) }
    }

    /// Número de sesiones de uso. Lo incrementa `noteForeground()`.
    private var sessionCount: Int {
        get { UserDefaults.standard.integer(forKey: sessionsKey) }
        set { UserDefaults.standard.set(newValue, forKey: sessionsKey) }
    }

    /// Última solicitud NUESTRA. Persistida: es el cooldown de 30 días.
    private var lastRequestDate: Date? {
        get {
            let ts = UserDefaults.standard.double(forKey: lastRequestKey)
            return ts > 0 ? Date(timeIntervalSince1970: ts) : nil
        }
        set {
            UserDefaults.standard.set(newValue?.timeIntervalSince1970 ?? 0, forKey: lastRequestKey)
        }
    }

    /// Último paso de la app por primer plano. Persistido para medir bien el hueco
    /// aunque iOS mate el proceso entre visitas.
    private var lastForegroundDate: Date? {
        get {
            let ts = UserDefaults.standard.double(forKey: lastForegroundKey)
            return ts > 0 ? Date(timeIntervalSince1970: ts) : nil
        }
        set {
            UserDefaults.standard.set(newValue?.timeIntervalSince1970 ?? 0, forKey: lastForegroundKey)
        }
    }

    /// `true` si el usuario fue a valorar por su cuenta desde Ajustes.
    ///
    /// Apple no nos dice si alguien valoró: `requestReview` no tiene callback ni
    /// valor de retorno. Esa contabilidad vive en iOS, no aquí. Lo único que
    /// sabemos es que tocó "Valorar la app". Eso NO prueba que valorara, así que
    /// esta marca no silencia la solicitud automática: solo libera los
    /// intersticiales, porque si ya fue a valorar no hay valoración pendiente que
    /// proteger.
    private var hasRatedManually: Bool {
        get { UserDefaults.standard.bool(forKey: ratedManuallyKey) }
        set { UserDefaults.standard.set(newValue, forKey: ratedManuallyKey) }
    }

    // MARK: - Estado en memoria

    /// Momento en que se lanzó la solicitud; `AdsManager` lo lee para respetar la
    /// gracia post-valoración. En memoria a propósito: la gracia protege ESTA
    /// sesión, no la siguiente.
    private(set) var lastRequestedAt: Date?

    /// Cuenta atrás pendiente arrancada por el primer cálculo de la sesión. Se
    /// cancela si el usuario sale de la app antes de que dispare: no tiene sentido
    /// pedir estrellas, ni mucho menos un anuncio, contra una pantalla vacía.
    private var firstActionTask: Task<Void, Never>?

    /// Intersticial programado tras una solicitud de valoración que sí cogió el
    /// hueco. Se cancela igual al irse al fondo.
    private var postReviewAdTask: Task<Void, Never>?

    /// `true` una vez reclamado el hueco de esta sesión, para que una ráfaga de
    /// toques programe una sola cuenta atrás y no una por toque.
    private var firstActionSlotUsed = false

    /// `true` cuando la app ha pasado al fondo desde la última activación. En
    /// memoria a propósito: si iOS mata el proceso suspendido, el siguiente
    /// arranque entra por la rama de `countedThisProcess`.
    private var wentToBackground = false

    /// `true` una vez evaluada la activación inicial de este proceso.
    private var countedThisProcess = false

    private init() {}

    // MARK: - Ciclo de vida

    /// Llamar al arrancar Y cada vez que la app vuelve al primer plano.
    ///
    /// Contar sesiones solo en arranque en frío no basta: iOS mantiene las apps
    /// residentes mucho tiempo, así que un usuario puede abrirla docenas de veces
    /// desde el conmutador sin que vuelva a correr código de lanzamiento.
    ///
    /// Idempotente: las llamadas extra no inflan el contador, porque una sesión
    /// nueva solo se cuenta si el hueco fuera de la app supera
    /// `AdConfig.reviewNewSessionGap`.
    func noteForeground() {
        let now = Date()

        // Solo dos cosas abren sesión: el proceso arrancando, o volver del fondo.
        // Un ciclo `.inactive` → `.active` NO cuenta: pasa con los diálogos del
        // sistema (ATT, consentimiento), el Centro de control o una llamada, y
        // ahí el usuario nunca se fue de la app.
        //
        // Este filtro es imprescindible: a la VUELTA, iOS pasa por `.inactive`
        // antes de `.active`, así que inferirlo solo del timestamp falla — se
        // reescribiría justo antes de medirlo y el hueco saldría siempre ~0.
        guard !countedThisProcess || wentToBackground else { return }

        let gap = lastForegroundDate.map { now.timeIntervalSince($0) } ?? .greatestFiniteMagnitude
        countedThisProcess = true
        wentToBackground = false
        lastForegroundDate = now

        guard gap >= AdConfig.reviewNewSessionGap else { return }

        sessionCount += 1
        // Sesión nueva, hueco nuevo: el primer cálculo de cada visita vale o una
        // solicitud de valoración o un intersticial.
        firstActionSlotUsed = false
        log.info("review — sesión \(self.sessionCount), conversiones totales: \(self.totalConversions)")
        // Esta clase es la que mide el hueco fuera de la app, así que es la que
        // puede decirle a AdsManager cuándo empieza una sesión nueva.
        AdsManager.shared.noteNewSession()
    }

    /// Llamar cuando la app pasa al fondo (`.background`, NO `.inactive`).
    func noteBackground() {
        wentToBackground = true
        lastForegroundDate = Date()

        // Si la cuenta atrás seguía pendiente, el hueco NO llegó a gastarse:
        // devolverlo. Sin esto, irse dos segundos a mirar una notificación en
        // mitad de los 5 s quemaba el hueco de la sesión entera — ni valoración ni
        // intersticial hasta 30 min después, que es exactamente la clase de fallo
        // silencioso que hacía que no saltara nunca nada.
        if firstActionTask != nil {
            firstActionSlotUsed = false
            log.debug("review — cuenta atrás cancelada al salir, hueco devuelto")
        }

        // Mismo razonamiento para el intersticial que esperaba sus 30 s tras la
        // valoración: si lo cancelamos aquí, nadie lo rearma y la sesión se queda
        // sin anuncio salvo que el usuario encadene 3 conversiones más. Al
        // devolver el hueco, el siguiente cálculo reabre la cuenta atrás: la
        // valoración renunciará (acaba de pedirse, cooldown activo) y el
        // intersticial se lo quedará a los 5 s, que es justo la regla pactada.
        if postReviewAdTask != nil {
            firstActionSlotUsed = false
            log.debug("review — intersticial post-valoración cancelado al salir, hueco devuelto")
        }

        firstActionTask?.cancel()
        firstActionTask = nil
        postReviewAdTask?.cancel()
        postReviewAdTask = nil
    }

    // MARK: - Puerta del intersticial
    //
    // LA VALORACIÓN VA PRIMERO. Un usuario al que se le ha enseñado un
    // intersticial antes de pedirle valoración puntúa peor, así que no se muestra
    // ningún intersticial hasta haber lanzado la solicitud al menos una vez.

    /// `true` una vez lanzada la solicitud (persistido: retener el primer
    /// intersticial pasa una sola vez en la vida de la instalación).
    var hasRequestedReview: Bool { lastRequestDate != nil }

    /// Lo lee `AdsManager` antes de mostrar cualquier intersticial.
    var allowsInterstitials: Bool {
        hasRequestedReview
            || hasRatedManually
            || totalConversions >= AdConfig.reviewActionsBeforeUnblockingAds
    }

    // MARK: - API pública

    /// Registrar una conversión exitosa. La primera de cada sesión reclama el
    /// hueco de los `AdConfig.reviewFirstActionDelay` segundos.
    func registerConversion() {
        totalConversions += 1
        log.info("review — conversión \(self.totalConversions)")
        claimFirstActionSlot()
    }

    /// Llamar cuando el usuario toca "Valorar la app" en Ajustes.
    ///
    /// Aplica el cooldown NORMAL, no un silencio permanente: pedir la hoja a mano
    /// no prueba que valorara. La supresión real de "ya valoró" la hace iOS.
    func requestReviewFromSettings() {
        hasRatedManually = true          // libera los intersticiales
        guard let scene = activeScene() else {
            log.debug("review — Ajustes: sin escena activa")
            return
        }
        lastRequestDate = Date()         // cooldown normal, reversible
        lastRequestedAt = Date()         // respetar la gracia post-valoración
        log.info("review — solicitada desde Ajustes")
        present(in: scene)
    }

    // MARK: - Interno

    /// Arranca la única cuenta atrás de la sesión, solo en el primer cálculo.
    private func claimFirstActionSlot() {
        guard !firstActionSlotUsed else { return }
        firstActionSlotUsed = true

        log.info("review — primer cálculo de la sesión, disparo en \(Int(AdConfig.reviewFirstActionDelay))s")
        scheduleFirstActionSlot(after: AdConfig.reviewFirstActionDelay, retriesLeft: AdConfig.reviewNoSceneMaxRetries)
    }

    private func scheduleFirstActionSlot(after delay: TimeInterval, retriesLeft: Int) {
        firstActionTask?.cancel()
        firstActionTask = Task { @MainActor [weak self] in
            try? await Task.sleep(for: .seconds(delay))
            guard !Task.isCancelled, let self else { return }
            // Limpiarla ANTES de disparar: `noteBackground()` distingue por este
            // campo una cuenta atrás pendiente (hueco devuelto) de una ya gastada.
            self.firstActionTask = nil
            self.fireFirstActionSlot(retriesLeft: retriesLeft)
        }
    }

    /// La valoración se queda el hueco; si no puede, se lo queda el intersticial.
    /// Aquí sale uno o el otro — nunca los dos a la vez, y nunca ninguno.
    private func fireFirstActionSlot(retriesLeft: Int) {
        switch requestReviewIfPossible() {
        case .requested:
            break
        case .noActiveScene where retriesLeft > 0:
            // Típico del primer arranque: ATT o el consentimiento siguen en
            // pantalla y la escena no está activa. No ceder el hueco: reintentar.
            log.info("review — sin escena activa, reintento en \(Int(AdConfig.reviewNoSceneRetryDelay))s")
            scheduleFirstActionSlot(after: AdConfig.reviewNoSceneRetryDelay, retriesLeft: retriesLeft - 1)
            return
        case .noActiveScene, .skipped:
            log.info("review — renuncia al hueco, se lo queda el intersticial")
            AdsManager.shared.showInterstitialAfterFirstAction()
            return
        }
        // La valoración cogió el hueco. El intersticial no se descarta: se
        // reprograma tras la gracia, porque esperar "al siguiente cálculo" en un
        // conversor significaba a menudo esperar para siempre.
        scheduleInterstitialAfterReview()
    }

    private func scheduleInterstitialAfterReview() {
        let delay = AdConfig.interstitialDelayAfterReview
        log.info("review — intersticial reprogramado a \(Int(delay))s de la valoración")
        postReviewAdTask?.cancel()
        postReviewAdTask = Task { @MainActor [weak self] in
            // Medio segundo de margen: `showInterstitialAfterFirstAction()` vuelve
            // a comprobar esta misma gracia contra `lastRequestedAt`, y despertar
            // justo en el límite haría que se rechazara a sí misma por redondeo.
            try? await Task.sleep(for: .seconds(delay + 0.5))
            guard !Task.isCancelled, let self else { return }
            // Limpiarla ANTES de disparar, igual que la cuenta atrás: así
            // `noteBackground()` puede distinguir una espera pendiente de una ya
            // consumida.
            self.postReviewAdTask = nil
            AdsManager.shared.showInterstitialAfterFirstAction()
        }
    }

    private enum ReviewOutcome { case requested, skipped, noActiveScene }

    private func requestReviewIfPossible() -> ReviewOutcome {
        if let last = lastRequestDate {
            guard Date().timeIntervalSince(last) >= AdConfig.reviewMinTimeBetweenRequests else {
                log.debug("review — omitida: cooldown activo (última: \(last, privacy: .public))")
                return .skipped
            }
        }

        if let lastAd = AdsManager.shared.lastInterstitialClosedAt {
            guard Date().timeIntervalSince(lastAd) >= AdConfig.reviewPostInterstitialGrace else {
                log.debug("review — omitida: intersticial reciente")
                return .skipped
            }
        }

        guard let scene = activeScene() else {
            log.debug("review — omitida: sin escena en primer plano")
            return .noActiveScene
        }

        log.info("review — solicitando valoración (conversiones: \(self.totalConversions), sesión \(self.sessionCount))")
        lastRequestedAt = Date()
        lastRequestDate = Date()
        present(in: scene)
        return .requested
    }

    private func activeScene() -> UIWindowScene? {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first { $0.activationState == .foregroundActive }
    }

    /// `SKStoreReviewController` quedó obsoleto en iOS 18 a favor de
    /// `AppStore.requestReview(in:)`. La vía antigua se mantiene por el target de
    /// despliegue (17.6).
    private func present(in scene: UIWindowScene) {
        if #available(iOS 18.0, *) {
            AppStore.requestReview(in: scene)
        } else {
            SKStoreReviewController.requestReview(in: scene)
        }
    }

    #if DEBUG
    /// Borra el estado persistido para poder probar el flujo desde cero.
    func debugReset() {
        UserDefaults.standard.removeObject(forKey: totalConversionsKey)
        UserDefaults.standard.removeObject(forKey: lastRequestKey)
        UserDefaults.standard.removeObject(forKey: ratedManuallyKey)
        UserDefaults.standard.removeObject(forKey: sessionsKey)
        UserDefaults.standard.removeObject(forKey: lastForegroundKey)
        lastRequestedAt = nil
        firstActionSlotUsed = false
        firstActionTask?.cancel()
        firstActionTask = nil
        postReviewAdTask?.cancel()
        postReviewAdTask = nil
        log.debug("review — estado reseteado")
    }
    #endif
}
