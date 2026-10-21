import SwiftUI
import ObjectiveC

// MARK: - Runtime language switching (Bundle swizzle, à la Amortix)

nonisolated(unsafe) private var localizedBundleKey: UInt8 = 0

/// `Bundle` subclass that redirects string lookups to the user-selected
/// `.lproj`, so changing the language updates the UI **immediately** (no relaunch).
final class LocalizedBundle: Bundle, @unchecked Sendable {
    override func localizedString(forKey key: String, value: String?, table tableName: String?) -> String {
        if let override = objc_getAssociatedObject(self, &localizedBundleKey) as? Bundle {
            return override.localizedString(forKey: key, value: value, table: tableName)
        }
        return super.localizedString(forKey: key, value: value, table: tableName)
    }
}

extension Bundle {
    nonisolated(unsafe) private static var didSwizzleLanguage = false

    /// Point `Bundle.main` at the given language's `.lproj` ("" = system default).
    static func setAppLanguage(_ code: String) {
        if !didSwizzleLanguage {
            didSwizzleLanguage = true
            object_setClass(Bundle.main, LocalizedBundle.self)
        }
        let override: Bundle? = code.isEmpty
            ? nil
            : Bundle.main.path(forResource: code, ofType: "lproj").flatMap(Bundle.init(path:))
        objc_setAssociatedObject(Bundle.main, &localizedBundleKey, override,
                                 .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
    }
}

/// App-wide language state. Changing `language` swaps the active `.lproj` and,
/// because the root view observes `locale`, every screen re-renders at once.
@MainActor
@Observable
final class LocalizationManager {
    static let shared = LocalizationManager()

    /// Selected language code; "" follows the system.
    var language: String {
        didSet {
            UserDefaults.standard.set(language, forKey: AppConfig.StorageKeys.preferredLanguage)
            Bundle.setAppLanguage(language)
        }
    }

    init() {
        language = UserDefaults.standard.string(forKey: AppConfig.StorageKeys.preferredLanguage) ?? ""
        Bundle.setAppLanguage(language)
    }

    /// Locale for the SwiftUI environment (drives formatting + RTL for Arabic).
    var locale: Locale {
        language.isEmpty ? .autoupdatingCurrent : Locale(identifier: language)
    }
}

@main
struct DivixApp: App {

    #if canImport(UIKit)
    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    #endif

    @AppStorage(AppConfig.StorageKeys.hasSeenOnboarding) private var hasSeenOnboarding: Bool = false
    @Environment(\.scenePhase) private var scenePhase
    @State private var tracking = AppTrackingService.shared
    @State private var localization = LocalizationManager.shared

    var body: some Scene {
        WindowGroup {
            rootView
                .environment(\.locale, localization.locale)
                .task {
                    // El reloj de los 60 s corre desde el arranque, no desde
                    // que termine ATT/consentimiento.
                    AdsManager.shared.scheduleSessionInterstitial()
                    try? await Task.sleep(for: .milliseconds(500))
                    // Orden estricto: ATT → consentimiento (se ESPERA a que
                    // termine) → mediación. Así el SDK de anuncios arranca con
                    // la decisión del usuario ya tomada, no a mitad de camino.
                    await tracking.requestIfNeeded()
                    await ConsentService.shared.resolve()
                    AdsManager.shared.initialize()
                }
        }
        .onChange(of: scenePhase) { _, newPhase in
            switch newPhase {
            case .background:
                #if os(iOS)
                BackgroundRefreshService.schedule()
                #endif
                // Volcar el resumen de subastas al log al salir: deja en consola
                // qué redes han ganado durante la sesión.
                AdDiagnostics.shared.logSummary()
                // Cancela la cuenta atrás del primer cálculo: ni valoración ni
                // anuncio deben dispararse contra una pantalla que ya no se mira.
                ReviewService.shared.noteBackground()
            case .active:
                // El Task.sleep que expira la ventana sin anuncios no corre con
                // la app suspendida, así que hay que recalcularla al volver.
                AdsManager.shared.refreshAdFreeState()
                // Abre sesión (si el hueco fuera de la app fue suficiente) y, con
                // ella, un hueco nuevo para el primer cálculo. Contar sesiones
                // solo en arranque en frío no basta: iOS mantiene la app residente
                // y el usuario la reabre desde el conmutador sin ejecutar nada
                // del lanzamiento.
                ReviewService.shared.noteForeground()
            default:
                break
            }
        }
    }

    @ViewBuilder
    private var rootView: some View {
        if hasSeenOnboarding {
            RootTabView()
                .id(localization.language)
        } else {
            OnboardingView(hasSeenOnboarding: $hasSeenOnboarding)
        }
    }
}
