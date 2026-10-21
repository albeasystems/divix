import Foundation

/// 3-layer rate provider:
///   1. Frankfurter (free, no key)
///   2. ExchangeRate-API (free tier, needs key in `AdConfig.exchangeRateAPIKey`)
///   3. Local Core Data cache (`CacheService`)
final class ExchangeRateService {

    static let shared = ExchangeRateService()

    private let cache: CacheService
    private let session: URLSession

    init(cache: CacheService = .shared, session: URLSession = .shared) {
        self.cache = cache
        self.session = session
    }

    // MARK: - Public

    /// Fetch the latest rates for `baseCode`. Always returns a result — the
    /// `source` field tells the caller whether it came from the network or the
    /// cache, and how fresh the cached data is.
    @MainActor
    func fetchRates(baseCode: String) async -> ExchangeRateResult? {
        if let live = try? await fetchFromFrankfurter(baseCode: baseCode) {
            cache.saveSnapshot(live)
            return ExchangeRateResult(snapshot: live, source: .live)
        }
        if !AdConfig.exchangeRateAPIKey.isEmpty,
           let fallback = try? await fetchFromExchangeRateAPI(baseCode: baseCode) {
            cache.saveSnapshot(fallback)
            return ExchangeRateResult(snapshot: fallback, source: .live)
        }
        if let cached = cache.loadSnapshot(baseCode: baseCode) {
            return ExchangeRateResult(snapshot: cached, source: classify(cached.fetchedAt, networkFailed: true))
        }
        return nil
    }

    /// Frankfurter time series for the given pair and date range.
    /// Endpoint: `/v1/{from}..{to}?base=BASE&symbols=TARGET`
    @MainActor
    func fetchTimeSeries(baseCode: String,
                         targetCode: String,
                         from: Date,
                         to: Date) async throws -> [(date: Date, rate: Double)] {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        formatter.timeZone = TimeZone(identifier: "UTC")

        var components = URLComponents(url: AppConfig.frankfurterBaseURL, resolvingAgainstBaseURL: false)!
        components.path = "/v1/\(formatter.string(from: from))..\(formatter.string(from: to))"
        components.queryItems = [
            URLQueryItem(name: "base", value: baseCode),
            URLQueryItem(name: "symbols", value: targetCode)
        ]
        let url = components.url!

        var request = URLRequest(url: url)
        request.timeoutInterval = AppConfig.networkTimeoutSeconds

        let (data, response) = try await session.data(for: request)
        try Self.validate(response: response)

        let payload = try JSONDecoder().decode(FrankfurterTimeSeries.self, from: data)
        return payload.rates
            .compactMap { (key, value) -> (Date, Double)? in
                guard let date = formatter.date(from: key),
                      let rate = value[targetCode] else { return nil }
                return (date, rate)
            }
            .sorted { $0.0 < $1.0 }
    }

    // MARK: - Unified (fiat + crypto)

    /// Unified USD-pivot snapshot containing both fiat (Frankfurter `base=USD`)
    /// and crypto (CoinGecko, stored as "coin per USD" = 1/price). Powers the
    /// Convert / Multi / Favorites screens so any fiat↔crypto pair converts via
    /// the existing triangulation in `ExchangeRateSnapshot.convert`.
    @MainActor
    func fetchUnifiedSnapshot() async -> ExchangeRateResult? {
        var rates: [String: Double] = [:]
        var gotNetwork = false
        var gotCrypto = false

        if let fiat = try? await fetchFromFrankfurter(baseCode: "USD") {
            rates.merge(fiat.rates) { _, new in new }
            gotNetwork = true
        }
        if let prices = try? await CryptoRateService.shared.fetchPricesUSD(), !prices.isEmpty {
            for (code, price) in prices where price > 0 {
                rates[code] = 1.0 / price
            }
            gotCrypto = true
            gotNetwork = true
        }

        // Crypto prices failed (e.g. CoinGecko rate limit) → reuse the last cached
        // crypto rates so coins don't vanish from the Markets list on launch.
        if !gotCrypto, let cached = cache.loadSnapshot(baseCode: "USD") {
            for (code, rate) in cached.rates where CurrencyCatalog.isCrypto(code) {
                if rates[code] == nil { rates[code] = rate }
            }
        }

        guard gotNetwork, !rates.isEmpty else {
            if let cached = cache.loadSnapshot(baseCode: "USD") {
                return ExchangeRateResult(snapshot: cached,
                                          source: classify(cached.fetchedAt, networkFailed: true))
            }
            return nil
        }

        let snapshot = ExchangeRateSnapshot(baseCode: "USD", rates: rates, fetchedAt: Date())
        cache.saveSnapshot(snapshot)
        return ExchangeRateResult(snapshot: snapshot, source: .live)
    }

    /// USD-per-unit daily series for any code, used to chart arbitrary pairs.
    /// - fiat (non-USD): Frankfurter `base=USD` gives "code per USD"; inverted here.
    /// - crypto: CoinGecko price is already "USD per coin".
    /// - "USD": returns an empty map; callers treat USD as a constant 1.
    @MainActor
    func fetchSeriesUSD(code: String, from: Date, to: Date) async throws -> [Date: Double] {
        if code == "USD" { return [:] }
        if CurrencyCatalog.isCrypto(code) {
            let days = max(1, Calendar.current.dateComponents([.day], from: from, to: to).day ?? 1)
            return try await CryptoRateService.shared.fetchSeriesUSD(code: code, days: days)
        }
        let series = try await fetchTimeSeries(baseCode: "USD", targetCode: code, from: from, to: to)
        var out: [Date: Double] = [:]
        for (date, rate) in series where rate != 0 {
            out[Calendar.current.startOfDay(for: date)] = 1.0 / rate
        }
        return out
    }

    // MARK: - Freshness

    private func classify(_ fetchedAt: Date, networkFailed: Bool) -> RateSource {
        // If the network failed we are offline — surface that (grey dot) and keep
        // showing the cached snapshot's last-update time, regardless of age.
        if networkFailed { return .offline }
        let age = Date().timeIntervalSince(fetchedAt)
        if age < AppConfig.liveThresholdSeconds {
            return .live
        } else if age < AppConfig.staleThresholdSeconds {
            return .cachedRecent
        } else {
            return .cachedStale
        }
    }

    // MARK: - Layer 1: Frankfurter

    private func fetchFromFrankfurter(baseCode: String) async throws -> ExchangeRateSnapshot {
        var components = URLComponents(url: AppConfig.frankfurterBaseURL, resolvingAgainstBaseURL: false)!
        components.path = "/v1/latest"
        components.queryItems = [URLQueryItem(name: "base", value: baseCode)]

        var request = URLRequest(url: components.url!)
        request.timeoutInterval = AppConfig.networkTimeoutSeconds

        let (data, response) = try await session.data(for: request)
        try Self.validate(response: response)

        let payload = try JSONDecoder().decode(FrankfurterLatest.self, from: data)
        return ExchangeRateSnapshot(baseCode: payload.base,
                                    rates: payload.rates,
                                    fetchedAt: Date())
    }

    // MARK: - Layer 2: ExchangeRate-API

    private func fetchFromExchangeRateAPI(baseCode: String) async throws -> ExchangeRateSnapshot {
        let key = AdConfig.exchangeRateAPIKey
        let urlString = "\(AppConfig.exchangeRateAPIBase)/\(key)/latest/\(baseCode)"
        guard let url = URL(string: urlString) else {
            throw ServiceError.invalidURL
        }
        var request = URLRequest(url: url)
        request.timeoutInterval = AppConfig.networkTimeoutSeconds

        let (data, response) = try await session.data(for: request)
        try Self.validate(response: response)

        let payload = try JSONDecoder().decode(ExchangeRateAPIResponse.self, from: data)
        guard payload.result == "success" else {
            throw ServiceError.providerError(payload.errorType ?? "unknown")
        }
        return ExchangeRateSnapshot(baseCode: payload.baseCode,
                                    rates: payload.conversionRates,
                                    fetchedAt: Date())
    }

    // MARK: - Helpers

    private static func validate(response: URLResponse) throws {
        guard let http = response as? HTTPURLResponse else { throw ServiceError.invalidResponse }
        guard (200..<300).contains(http.statusCode) else {
            throw ServiceError.httpStatus(http.statusCode)
        }
    }

    enum ServiceError: Error {
        case invalidURL
        case invalidResponse
        case httpStatus(Int)
        case providerError(String)
    }

    // MARK: - DTOs

    private struct FrankfurterLatest: Decodable {
        let base: String
        let date: String
        let rates: [String: Double]
    }

    private struct FrankfurterTimeSeries: Decodable {
        let base: String
        let start_date: String
        let end_date: String
        let rates: [String: [String: Double]]
    }

    private struct ExchangeRateAPIResponse: Decodable {
        let result: String
        let baseCode: String
        let conversionRates: [String: Double]
        let errorType: String?

        enum CodingKeys: String, CodingKey {
            case result
            case baseCode        = "base_code"
            case conversionRates = "conversion_rates"
            case errorType       = "error-type"
        }
    }
}

// MARK: - CoinGecko (crypto) client

/// Free CoinGecko API client for crypto prices and history. No key required;
/// an optional demo key (`AppConfig.coinGeckoAPIKey`) raises the rate limits.
final class CryptoRateService {

    static let shared = CryptoRateService()

    private let session: URLSession
    init(session: URLSession = .shared) { self.session = session }

    /// Current USD price per crypto code (e.g. `["BTC": 69420.0]`).
    @MainActor
    func fetchPricesUSD() async throws -> [String: Double] {
        let ids = CurrencyCatalog.cryptoOrder.compactMap { CurrencyCatalog.geckoID(for: $0) }
        var components = URLComponents(
            url: AppConfig.coinGeckoBaseURL.appendingPathComponent("simple/price"),
            resolvingAgainstBaseURL: false)!
        var items = [URLQueryItem(name: "ids", value: ids.joined(separator: ",")),
                     URLQueryItem(name: "vs_currencies", value: "usd")]
        if !AppConfig.coinGeckoAPIKey.isEmpty {
            items.append(URLQueryItem(name: "x_cg_demo_api_key", value: AppConfig.coinGeckoAPIKey))
        }
        components.queryItems = items

        var request = URLRequest(url: components.url!)
        request.timeoutInterval = AppConfig.networkTimeoutSeconds

        let (data, response) = try await session.data(for: request)
        try Self.validate(response: response)

        // Response shape: geckoID -> ["usd": price]
        let payload = try JSONDecoder().decode([String: [String: Double]].self, from: data)
        var out: [String: Double] = [:]
        for code in CurrencyCatalog.cryptoOrder {
            if let gid = CurrencyCatalog.geckoID(for: code), let price = payload[gid]?["usd"] {
                out[code] = price
            }
        }
        return out
    }

    /// Daily USD price series for a crypto code over roughly the last `days` days.
    @MainActor
    func fetchSeriesUSD(code: String, days: Int) async throws -> [Date: Double] {
        guard let gid = CurrencyCatalog.geckoID(for: code) else { return [:] }
        var components = URLComponents(
            url: AppConfig.coinGeckoBaseURL.appendingPathComponent("coins/\(gid)/market_chart"),
            resolvingAgainstBaseURL: false)!
        var items = [URLQueryItem(name: "vs_currency", value: "usd"),
                     URLQueryItem(name: "days", value: String(days))]
        if !AppConfig.coinGeckoAPIKey.isEmpty {
            items.append(URLQueryItem(name: "x_cg_demo_api_key", value: AppConfig.coinGeckoAPIKey))
        }
        components.queryItems = items

        var request = URLRequest(url: components.url!)
        request.timeoutInterval = AppConfig.networkTimeoutSeconds

        let (data, response) = try await session.data(for: request)
        try Self.validate(response: response)

        let payload = try JSONDecoder().decode(CoinGeckoMarketChart.self, from: data)
        let calendar = Calendar(identifier: .gregorian)
        var byDay: [Date: Double] = [:]
        for point in payload.prices where point.count == 2 {
            let date = Date(timeIntervalSince1970: point[0] / 1000.0)
            byDay[calendar.startOfDay(for: date)] = point[1]   // last sample of each day wins
        }
        return byDay
    }

    private static func validate(response: URLResponse) throws {
        guard let http = response as? HTTPURLResponse else {
            throw ExchangeRateService.ServiceError.invalidResponse
        }
        guard (200..<300).contains(http.statusCode) else {
            throw ExchangeRateService.ServiceError.httpStatus(http.statusCode)
        }
    }
}

private struct CoinGeckoMarketChart: Decodable {
    let prices: [[Double]]
}
