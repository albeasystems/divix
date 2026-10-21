import Foundation

// MARK: - AdConfig
//
// Configuración de anuncios sobre Unity LevelPlay (mediación, SDK ironSource).
// El código Swift es AGNÓSTICO DE RED: aquí no se nombra ninguna red concreta;
// las redes se activan/desactivan en el Podfile + dashboard de LevelPlay.

enum AdConfig {

    // MARK: - Credenciales LevelPlay (Setup → App / Ad units)
    //
    // El App Key alfanumérico es DISTINTO del Game ID numérico de Unity: el App
    // Key va aquí; el Game ID solo en el dashboard, para la instancia de Unity Ads.

    /// App Key alfanumérico de LevelPlay (Setup → SDK Integration).
    static let appKey = "27b617955"

    // Ad unit IDs por formato (Setup → Ad units), alfanuméricos.
    // OJO: es el ad unit ID, NO el nombre visible ("Banner_iOS") — pasar el
    // nombre da "Invalid ad unit id".
    static let bannerAdUnitId       = "ox7ch08eb2xgqika"
    static let interstitialAdUnitId = "jqdujicxy5dcwwn8"
    static let rewardedAdUnitId     = "ptcyjuxnkucfvjgf"

    // El App ID de AdMob (ca-app-pub-3189608370371609~7438433438) NO vive aquí:
    // va en GADApplicationIdentifier del Info.plist, que es donde lo busca el
    // SDK de Google que arrastra el adaptador.

    // MARK: - Frequency capping del intersticial
    //
    // El contador de conversiones corre SIEMPRE: las guardas de abajo deciden si
    // un intersticial puede MOSTRARSE, nunca si una conversión cuenta. Descartar
    // conversiones es justo cómo una sesión corta acababa sin una sola impresión.

    /// Conversiones completadas requeridas antes de mostrar cada intersticial
    /// (aplica también entre anuncios sucesivos, no solo al primero).
    ///
    /// Solo pacea el anuncio REPETIDO: el primero de cada sesión lo dispara el
    /// hueco de los 5 s tras el primer cálculo (`showInterstitialAfterFirstAction`).
    static let successfulActionsRequired = 3

    /// Tiempo mínimo entre dos intersticiales mostrados.
    static let interstitialCooldown: TimeInterval = 150   // 2,5 minutos

    /// Ventana de gracia tras el arranque de SESIÓN durante la que no se muestra
    /// un intersticial por la vía del contador, para no interrumpir la apertura.
    /// Corta a propósito: una sesión aquí dura a menudo uno o dos minutos y una
    /// gracia larga se la comía entera. El intersticial del primer cálculo la
    /// ignora: va programado explícitamente 5 s después de que el usuario pidiera
    /// algo, así que no es una interrupción sorpresa.
    static let launchGracePeriod: TimeInterval = 45

    /// Techo duro por sesión: la guardia que evita que el cooldown más corto
    /// convierta una sesión larga en un pase de diapositivas. Una sesión nueva
    /// empieza tras `reviewNewSessionGap` fuera de la app.
    static let maxInterstitialsPerSession = 3

    /// Segundos desde el inicio de la sesión tras los cuales sale un intersticial
    /// por tiempo, sin esperar a ninguna conversión. Respeta las mismas guardas
    /// de seguridad (tope, cooldown, gracia tras valoración) que el resto.
    ///
    /// Segunda sesión en adelante: 60 s. La primera visita tras instalar usa
    /// `firstSessionInterstitialDelay`.
    static let sessionInterstitialDelay: TimeInterval = 60

    /// Igual, pero para la PRIMERA visita tras instalar la app: ningún
    /// intersticial antes de 180 s, para no recibir al usuario nuevo con un anuncio.
    static let firstSessionInterstitialDelay: TimeInterval = 180

    /// Clave de UserDefaults: true una vez que la primera visita ya ocurrió.
    static let firstSessionDoneKey = "adsFirstSessionDone"

    /// Cuánto espera fill el intersticial del primer cálculo antes de rendirse.
    ///
    /// Ese anuncio sale 5 s después del primer cálculo, que en un arranque en frío
    /// puede ser antes de que vuelva la primera subasta. Rendirse al instante
    /// desperdiciaría el hueco; esperar unos segundos convierte un fill lento en
    /// una impresión. Al agotarse, el contador se deja en el umbral para que el
    /// siguiente cálculo lo muestre.
    static let firstActionAdWaitTimeout: TimeInterval = 8

    /// Backoff exponencial al fallar la carga del intersticial (segundos):
    /// arranca en `base` y dobla hasta `max`, reseteando al cargar con éxito.
    static let interstitialBaseRetryDelay: TimeInterval = 4
    static let interstitialMaxRetryDelay: TimeInterval = 64

    // MARK: - Reintentos del banner
    //
    // El auto-refresh del SDK solo entra en marcha DESPUÉS de una carga con
    // éxito. Si la PRIMERA falla —"No fill" en arranque en frío es lo normal—
    // no hay ciclo que reintentar y el banner se queda muerto toda la vida del
    // proceso. De ahí un backoff propio, activo solo hasta la primera carga.
    static let bannerBaseRetryDelay: TimeInterval = 5
    static let bannerMaxRetryDelay: TimeInterval = 60

    // MARK: - Rewarded → ventana "1 hora sin anuncios"

    /// Duración de la ventana sin anuncios que concede cada vídeo rewarded.
    static let rewardedAdFreeDuration: TimeInterval = 3600

    /// Clave de UserDefaults donde se persiste el vencimiento de esa ventana.
    static let adFreeUntilKey = "divix_ad_free_until"

    // MARK: - Valoración nativa (SKStoreReviewController / AppStore)
    //
    // POR QUÉ YA NO HAY UN UMBRAL DE CONVERSIONES.
    //
    // La regla anterior era "4 conversiones acumuladas, una vez por versión", y se
    // evaluaba SOLO dentro de `registerConversion()`. En un conversor eso casi
    // nunca dispara: el usuario hace su cálculo, mira el resultado y se va. Si
    // además la primera sesión no llega a 4 conversiones, no queda ningún toque
    // posterior sobre el que reevaluar la regla, así que no se pide nada — y con
    // el candado "una vez por versión" bastaba con que ese único intento cayera en
    // mal momento (sin escena activa) para perder la versión entera.
    //
    // Ahora la regla es un temporizador, no un contador: un cálculo es intención
    // suficiente, y la espera es corta, así que el usuario sigue mirando su propio
    // resultado cuando aparece la hoja — exactamente el momento en que la app
    // acaba de serle útil.

    /// Segundos entre el primer cálculo de la sesión y la solicitud de valoración.
    static let reviewFirstActionDelay: TimeInterval = 5

    /// Si a la hora de pedir la valoración no hay escena activa (p. ej. ATT o el
    /// consentimiento en pantalla), se reintenta tras este tiempo en vez de ceder
    /// el hueco al intersticial, hasta `reviewNoSceneMaxRetries` veces.
    static let reviewNoSceneRetryDelay: TimeInterval = 15
    static let reviewNoSceneMaxRetries = 4

    /// Válvula de escape para los anuncios: si la solicitud nunca llega a salir
    /// (p. ej. sin escena activa), los intersticiales se liberan tras estas
    /// conversiones para no perder monetización indefinidamente.
    static let reviewActionsBeforeUnblockingAds = 4

    /// Segundos que deben haber pasado desde que se cerró el último intersticial
    /// para pedir valoración (no pedir estrellas con el anuncio aún caliente).
    static let reviewPostInterstitialGrace: TimeInterval = 45

    /// Segundos de gracia tras la solicitud de valoración antes de mostrar un
    /// intersticial, para no encadenar dos interrupciones.
    ///
    /// Es también el retardo con el que se programa el intersticial cuando la
    /// valoración se queda el hueco del primer cálculo: la hoja se pide a los 5 s
    /// y el anuncio 30 s después de ella, no en el siguiente cálculo (que puede no
    /// llegar nunca).
    static let interstitialDelayAfterReview: TimeInterval = 30

    #if DEBUG
    /// Valores cortos para poder recorrer el flujo completo en el simulador.
    ///
    /// OJO: `reviewMinTimeBetweenRequests` no puede ser 0. Si lo fuera, cada
    /// conversión refrescaría la marca de la última solicitud y
    /// `interstitialDelayAfterReview` bloquearía el intersticial para siempre.
    static let reviewMinTimeBetweenRequests: TimeInterval = 300
    static let reviewNewSessionGap: TimeInterval = 20
    #else
    /// Tiempo mínimo entre dos solicitudes NUESTRAS.
    ///
    /// No confundir con el límite de Apple (3 MOSTRADAS al año): las llamadas que
    /// iOS descarta en silencio no gastan esa cuota. De ahí 30 días y no 60 — si
    /// una solicitud cae en mal momento no queremos perder dos meses.
    static let reviewMinTimeBetweenRequests: TimeInterval = 30 * 24 * 3600

    /// Hueco fuera de la app a partir del cual volver al primer plano cuenta como
    /// sesión nueva. Evita inflar el contador al cambiar de app unos segundos.
    static let reviewNewSessionGap: TimeInterval = 30 * 60
    #endif

    // MARK: - No relacionado con anuncios
    //
    // ExchangeRate-API fallback (free tier). Vive aquí por histórico y lo usa
    // ExchangeRateService. Register at https://exchangerate-api.com
    // TODO: replace with the real API key. Empty string disables the fallback layer.
    static let exchangeRateAPIKey = ""
}
