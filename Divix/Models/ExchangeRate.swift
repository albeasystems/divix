import Foundation

/// Source of a quoted rate, used by `RateStatusBadge` to colour the indicator.
enum RateSource: String, Codable {
    case live           // fresh network response (<4h)
    case cachedRecent   // local cache, 4h–24h old
    case cachedStale    // local cache, >24h old
    case offline        // network failed and only stale cache exists
}

/// One snapshot of rates for a given base currency.
struct ExchangeRateSnapshot: Codable, Equatable {
    let baseCode: String
    let rates: [String: Double]     // ISO code → rate
    let fetchedAt: Date

    func rate(for code: String) -> Double? {
        if code == baseCode { return 1.0 }
        return rates[code]
    }

    /// Convert `amount` of `baseCode` to `targetCode` using this snapshot, or
    /// triangulate via the base if `from` ≠ `baseCode`.
    func convert(amount: Double, from: String, to: String) -> Double? {
        if from == to { return amount }
        if from == baseCode {
            guard let r = rate(for: to) else { return nil }
            return amount * r
        }
        if to == baseCode {
            guard let r = rate(for: from), r != 0 else { return nil }
            return amount / r
        }
        // Triangulate through base currency.
        guard let rFrom = rate(for: from), rFrom != 0,
              let rTo = rate(for: to) else { return nil }
        return amount * (rTo / rFrom)
    }
}

/// Returned by `ExchangeRateService` — pairs the snapshot with the freshness
/// classification so the UI can show the right badge.
struct ExchangeRateResult {
    let snapshot: ExchangeRateSnapshot
    let source: RateSource
}
