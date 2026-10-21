import SwiftUI
import IronSource
import UIKit
import os

// MARK: - AdBannerView
//
// Banner de Unity LevelPlay (`LPMBannerAdView`, que es una UIView) envuelto en
// `UIViewRepresentable`. Mismo planteamiento que Capital, que es el que
// demostradamente llena —también en el simulador—. Resumen de lo que importa:
//
//   1. NO hay ruta especial de simulador. La versión anterior saltaba la
//      mediación y pedía un banner directo a AdMob con una unidad de test,
//      partiendo de que "LevelPlay no sirve fill real en el simulador". Es
//      falso: LevelPlay llena en el simulador. Y AdMob respondía "No ad to
//      show" a su propia unidad de test, así que esa ruta no pintaba nada.
//
//   2. La vista SIEMPRE reserva 50 pt. Antes la altura era
//      `isLoaded ? 50 : 0`, que es un pez que se muerde la cola: el SDK carga
//      dentro de una vista de altura 0 y, sin carga, la altura nunca sube.
//
//   3. Se ESPERA a que se cumplan las precondiciones (SDK inicializado + VC
//      raíz + la vista dentro de una UIWindow) sondeando cada 0,5 s, en vez de
//      pedir una sola vez y rendirse. Mientras no se ha pedido nada a la red,
//      sondear rápido es correcto: hacer backoff aquí dejaría el banner en
//      blanco decenas de segundos después de que el SDK ya estuviera listo.
//
//   4. Un fallo REAL de carga sí hace backoff exponencial (1→30 s) y vuelve a
//      intentarlo. El auto-refresh del SDK solo arranca tras una carga con
//      éxito, así que sin esto un "No fill" inicial dejaba el banner muerto
//      para siempre.

private struct LevelPlayBannerView: UIViewRepresentable {

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> LPMBannerAdView {
        let config = LPMBannerAdViewConfigBuilder()
            .set(adSize: LPMAdSize.banner())
            .build()
        // OJO: es el ad unit ID, no el nombre visible del ad unit.
        let banner = LPMBannerAdView(adUnitId: AdConfig.bannerAdUnitId, config: config)
        banner.setDelegate(context.coordinator)
        context.coordinator.banner = banner
        return banner
    }

    func updateUIView(_ uiView: LPMBannerAdView, context: Context) {
        context.coordinator.loadIfPossible()
    }

    static func dismantleUIView(_ uiView: LPMBannerAdView, coordinator: Coordinator) {
        coordinator.cancelRetry()
        uiView.destroy()
    }

    @MainActor
    final class Coordinator: NSObject, LPMBannerAdViewDelegate {

        /// El SDK guarda el delegado en DÉBIL, así que el Coordinator —que sí
        /// retiene SwiftUI— es quien debe mantener la referencia al banner.
        weak var banner: LPMBannerAdView?

        private var hasLoaded = false
        private var retryAttempt = 0
        private var retryTask: Task<Void, Never>?

        private static let maxRetryDelay: TimeInterval = 30
        private static let recheckInterval: TimeInterval = 0.5

        func loadIfPossible() {
            guard !hasLoaded, let banner else { return }
            guard AdsManager.shared.isInitialized,
                  let vc = AdsManager.shared.bannerRootViewController(),
                  banner.window != nil else {
                scheduleRecheck()
                return
            }
            cancelRetry()
            hasLoaded = true
            AdsLog.banner.info("requesting banner load")
            banner.loadAd(with: vc)
        }

        /// Las precondiciones aún no se cumplen (SDK inicializándose, o la vista
        /// todavía sin ventana). No se ha pedido nada a la red, así que se sondea
        /// a intervalo corto y fijo.
        private func scheduleRecheck() {
            cancelRetry()
            retryTask = Task { @MainActor [weak self] in
                try? await Task.sleep(for: .seconds(Self.recheckInterval))
                guard !Task.isCancelled else { return }
                self?.loadIfPossible()
            }
        }

        /// Una carga REAL ha fallado: backoff exponencial antes de volver a pedir.
        private func scheduleRetry() {
            cancelRetry()
            let delay = min(pow(2.0, Double(retryAttempt)), Self.maxRetryDelay)
            retryAttempt += 1
            AdsLog.banner.info("banner retry in \(Int(delay))s")
            retryTask = Task { @MainActor [weak self] in
                try? await Task.sleep(for: .seconds(delay))
                guard !Task.isCancelled else { return }
                self?.loadIfPossible()
            }
        }

        func cancelRetry() {
            retryTask?.cancel()
            retryTask = nil
        }

        // MARK: LPMBannerAdViewDelegate

        nonisolated func didLoadAd(with adInfo: LPMAdInfo) {
            let info = AuctionInfo(adInfo)
            Task { @MainActor in
                self.retryAttempt = 0
                AdsLog.banner.info("banner loaded — \(info.network ?? "?", privacy: .public) / \(info.instance ?? "?", privacy: .public)")
                AdDiagnostics.shared.record(load: info)
            }
        }

        nonisolated func didFailToLoadAd(withAdUnitId adUnitId: String, error: Error) {
            let message = error.localizedDescription
            Task { @MainActor in
                AdsLog.banner.error("banner failed: \(message, privacy: .public)")
                AdDiagnostics.shared.recordFailure(format: "banner", message: message)
                self.hasLoaded = false
                self.scheduleRetry()
            }
        }

        nonisolated func didClickAd(with adInfo: LPMAdInfo) {}
        nonisolated func didDisplayAd(with adInfo: LPMAdInfo) {}
        nonisolated func didFailToDisplayAd(with adInfo: LPMAdInfo, error: Error) {}
        nonisolated func didLeaveApp(with adInfo: LPMAdInfo) {}
        nonisolated func didExpandAd(with adInfo: LPMAdInfo) {}
        nonisolated func didCollapseAd(with adInfo: LPMAdInfo) {}
    }
}

// MARK: - AdBannerView (envoltorio con las guardas de ocultación)
//
// Se ancla siempre con `.safeAreaInset(edge: .bottom)` en el call site, para que
// nunca solape contenido interactivo.
//
// El guard vive AQUÍ y no en cada pantalla: se oculta si el usuario es premium o
// está dentro de la ventana rewarded. Observa `@AppStorage` de la clave REAL de
// UserDefaults además del manager, porque `isPremium` es una propiedad computada
// sin nada `@Published` detrás y la vista no se enteraría de la compra hasta el
// siguiente relaunch.

struct AdBannerView: View {

    @ObservedObject private var ads = AdsManager.shared
    @AppStorage(AppConfig.StorageKeys.isPremiumUnlocked) private var isPremium = false

    var body: some View {
        Group {
            if !isPremium, !ads.isAdFree {
                LevelPlayBannerView()
                    .frame(height: 50)
                    .frame(maxWidth: .infinity)
            }
        }
    }
}
