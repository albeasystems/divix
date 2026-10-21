import Foundation

/// Distinguishes traditional currencies from cryptocurrencies.
enum CurrencyKind { case fiat, crypto }

struct Currency: Identifiable, Hashable, Codable {
    /// ISO 4217 alphabetic code (e.g. "EUR") or crypto ticker (e.g. "BTC").
    let code: String
    /// Flag emoji rendered from country code; falls back to a globe symbol when unknown.
    let flag: String

    var id: String { code }

    /// Fiat vs cryptocurrency.
    var kind: CurrencyKind { CurrencyCatalog.isCrypto(code) ? .crypto : .fiat }

    /// Localized display name. Crypto uses its catalog name (e.g. "Bitcoin");
    /// fiat resolves via the system (`Locale.current`).
    var localizedName: String {
        if let meta = CurrencyCatalog.cryptoMeta[code] { return meta.name }
        return Locale.current.localizedString(forCurrencyCode: code) ?? code
    }

    static func flag(forCurrencyCode code: String) -> String {
        // Hardcoded emoji dictionary: avoids relying on Unicode regional indicator
        // scalar combination, which doesn't render on some simulator runtimes.
        let flags: [String: String] = [
            "EUR": "🇪🇺", "USD": "🇺🇸", "GBP": "🇬🇧", "JPY": "🇯🇵", "CHF": "🇨🇭",
            "CAD": "🇨🇦", "AUD": "🇦🇺", "NZD": "🇳🇿", "CNY": "🇨🇳", "HKD": "🇭🇰",
            "SGD": "🇸🇬", "SEK": "🇸🇪", "NOK": "🇳🇴", "DKK": "🇩🇰", "PLN": "🇵🇱",
            "CZK": "🇨🇿", "HUF": "🇭🇺", "RON": "🇷🇴", "BGN": "🇧🇬", "ISK": "🇮🇸",
            "MXN": "🇲🇽", "BRL": "🇧🇷", "ARS": "🇦🇷", "CLP": "🇨🇱", "COP": "🇨🇴",
            "PEN": "🇵🇪", "UYU": "🇺🇾",
            "ZAR": "🇿🇦", "EGP": "🇪🇬", "MAD": "🇲🇦", "NGN": "🇳🇬", "KES": "🇰🇪",
            "INR": "🇮🇳", "PKR": "🇵🇰", "BDT": "🇧🇩", "LKR": "🇱🇰", "NPR": "🇳🇵",
            "IDR": "🇮🇩", "MYR": "🇲🇾", "PHP": "🇵🇭", "THB": "🇹🇭", "VND": "🇻🇳",
            "KRW": "🇰🇷", "TWD": "🇹🇼",
            "TRY": "🇹🇷", "ILS": "🇮🇱", "AED": "🇦🇪", "SAR": "🇸🇦", "QAR": "🇶🇦",
            "KWD": "🇰🇼", "BHD": "🇧🇭", "OMR": "🇴🇲", "JOD": "🇯🇴", "LBP": "🇱🇧",
            "RUB": "🇷🇺", "UAH": "🇺🇦"
        ]
        return flags[code] ?? "🌐"
    }

    /// ISO 3166-1 alpha-2 region code used for the simulator flag fallback chip.
    /// For all supported currencies the first two letters match the region,
    /// except the multi-country euro.
    static func regionCode(for code: String) -> String {
        let overrides = ["EUR": "EU"]
        return overrides[code] ?? String(code.prefix(2)).uppercased()
    }
}

enum CurrencyCatalog {
    /// Subset of the 201 currencies returned by Frankfurter; the live list is
    /// rehydrated on the first successful network response.
    static let supportedCodes: [String] = [
        "EUR", "USD", "GBP", "JPY", "CHF", "CAD", "AUD", "NZD", "CNY", "HKD",
        "SGD", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "RON", "BGN", "ISK",
        "MXN", "BRL", "ARS", "CLP", "COP", "PEN", "UYU",
        "ZAR", "EGP", "MAD", "NGN", "KES",
        "INR", "PKR", "BDT", "LKR", "NPR",
        "IDR", "MYR", "PHP", "THB", "VND", "KRW", "TWD",
        "TRY", "ILS", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "JOD", "LBP",
        "RUB", "UAH"
    ]

    // MARK: - Crypto catalog

    struct CryptoMeta {
        let name: String
        let geckoID: String   // CoinGecko coin id used by the price/history API
    }

    /// Display order for crypto in pickers/lists.
    static let cryptoOrder: [String] = [
        "BTC", "ETH", "USDT", "BNB", "SOL", "XRP", "USDC", "ADA", "DOGE", "TRX",
        "TON", "AVAX", "DOT", "LINK", "MATIC", "LTC", "OP", "ARB", "SHIB", "XLM"
    ]

    static let cryptoMeta: [String: CryptoMeta] = [
        "BTC":   .init(name: "Bitcoin",     geckoID: "bitcoin"),
        "ETH":   .init(name: "Ethereum",    geckoID: "ethereum"),
        "USDT":  .init(name: "Tether",      geckoID: "tether"),
        "BNB":   .init(name: "BNB",         geckoID: "binancecoin"),
        "SOL":   .init(name: "Solana",      geckoID: "solana"),
        "XRP":   .init(name: "XRP",         geckoID: "ripple"),
        "USDC":  .init(name: "USD Coin",    geckoID: "usd-coin"),
        "ADA":   .init(name: "Cardano",     geckoID: "cardano"),
        "DOGE":  .init(name: "Dogecoin",    geckoID: "dogecoin"),
        "TRX":   .init(name: "TRON",        geckoID: "tron"),
        "TON":   .init(name: "Toncoin",     geckoID: "the-open-network"),
        "AVAX":  .init(name: "Avalanche",   geckoID: "avalanche-2"),
        "DOT":   .init(name: "Polkadot",    geckoID: "polkadot"),
        "LINK":  .init(name: "Chainlink",   geckoID: "chainlink"),
        "MATIC": .init(name: "Polygon",     geckoID: "matic-network"),
        "LTC":   .init(name: "Litecoin",    geckoID: "litecoin"),
        "OP":    .init(name: "Optimism",    geckoID: "optimism"),
        "ARB":   .init(name: "Arbitrum",    geckoID: "arbitrum"),
        "SHIB":  .init(name: "Shiba Inu",   geckoID: "shiba-inu"),
        "XLM":   .init(name: "Stellar",     geckoID: "stellar")
    ]

    static func isCrypto(_ code: String) -> Bool { cryptoMeta[code] != nil }
    static func geckoID(for code: String) -> String? { cryptoMeta[code]?.geckoID }

    // MARK: - Combined catalog

    static let all: [Currency] = (supportedCodes + cryptoOrder).map { code in
        Currency(code: code, flag: Currency.flag(forCurrencyCode: code))
    }

    static func currency(for code: String) -> Currency {
        all.first { $0.code == code } ?? Currency(code: code, flag: Currency.flag(forCurrencyCode: code))
    }
}
