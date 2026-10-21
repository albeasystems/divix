import Foundation

enum AppConfig {

    // MARK: - Branding
    static let appName            = "Divix: Currency Exchange"
    static let marketingURL       = URL(string: "https://albeasystems.github.io/divix/")!
    static let privacyPolicyURL   = URL(string: "https://albeasystems.github.io/divix/privacy.html")!
    static let termsOfUseURL      = URL(string: "https://albeasystems.github.io/divix/terms.html")!
    static let supportURL         = URL(string: "https://albeasystems.github.io/divix/support.html")!
    static let supportEmail       = "albeasystems@gmail.com"

    // MARK: - Exchange Rate APIs
    static let frankfurterBaseURL = URL(string: "https://api.frankfurter.dev/v1")!
    static let exchangeRateAPIBase = "https://v6.exchangerate-api.com/v6"
    /// CoinGecko free API for crypto prices/history (no key required; rate-limited).
    /// `coinGeckoAPIKey` is optional (a demo key raises the limits).
    static let coinGeckoBaseURL = URL(string: "https://api.coingecko.com/api/v3")!
    static let coinGeckoAPIKey = ""
    static let networkTimeoutSeconds: TimeInterval = 5

    // MARK: - Cache freshness thresholds
    static let liveThresholdSeconds: TimeInterval     = 4 * 60 * 60        // 4 hours
    static let staleThresholdSeconds: TimeInterval    = 24 * 60 * 60       // 24 hours

    // MARK: - Background refresh
    static let backgroundRefreshIdentifier = "com.divix.raterefresh"
    static let backgroundRefreshIntervalSeconds: TimeInterval = 4 * 60 * 60

    // MARK: - Defaults
    static let defaultBaseCurrencyCode   = "EUR"
    static let defaultTargetCurrencyCode = "USD"
    static let defaultExtraTargetCodes: [String] = ["GBP", "JPY", "USD"]
    /// Favourites quick-view starts empty — the user curates it from the picker.
    static let defaultFavoriteCodes: [String] = []

    // MARK: - In-App Purchase
    /// Non-consumable product ID configured in App Store Connect.
    static let premiumProductID = "com.albeasystems.divix.premium"

    // MARK: - Easter egg
    static let easterEggRequiredTaps   = 20
    static let easterEggTimeWindowSeconds: TimeInterval = 10

    /// Toques sobre el título de Ajustes que revelan el panel de diagnóstico de
    /// anuncios, y su ventana de tiempo. Más holgada que la del easter egg
    /// premium: es una herramienta de depuración, no un secreto que proteger.
    static let adDiagnosticsRequiredTaps = 10
    static let adDiagnosticsTapWindowSeconds: TimeInterval = 15

    // MARK: - Persistence keys (AppStorage)
    enum StorageKeys {
        static let isPremiumUnlocked   = "isPremiumUnlocked"
        static let hasSeenOnboarding   = "hasSeenOnboarding"
        static let baseCurrencyCode    = "baseCurrencyCode"
        static let targetCurrencyCode  = "targetCurrencyCode"
        static let preferredLanguage   = "preferredLanguage"
        static let extraTargetCodes    = "extraTargetCodes"
        static let favoritesData       = "favoritesData"        // legacy (pairs)
        static let favoriteCodesData   = "favoriteCodesData"    // quick-view currency codes
        static let multiOrder          = "multiOrder"           // Multi list custom order (CSV)
    }
}
