import Foundation
import SwiftUI

/// Time-series state for `HistoricalChartView`.
@MainActor
@Observable
final class ExchangeRateViewModel {

    enum Range: String, CaseIterable, Identifiable {
        case week, month, quarter, year, twoYears, fiveYears

        var id: String { rawValue }

        var days: Int {
            switch self {
            case .week:      return 7
            case .month:     return 30
            case .quarter:   return 90
            case .year:      return 365
            case .twoYears:  return 730
            case .fiveYears: return 1825
            }
        }

        var localizationKey: LocalizedStringKey {
            switch self {
            case .week:      return "range_7d"
            case .month:     return "range_30d"
            case .quarter:   return "range_90d"
            case .year:      return "range_1y"
            case .twoYears:  return "range_2y"
            case .fiveYears: return "range_5y"
            }
        }
    }

    struct Point: Identifiable, Hashable {
        let date: Date
        let rate: Double
        var id: Date { date }
    }

    var range: Range = .month {
        didSet { if !suppressReload { Task { await reload() } } }
    }
    var baseCode: String {
        didSet { if !suppressReload { Task { await reload() } } }
    }
    var targetCode: String {
        didSet { if !suppressReload { Task { await reload() } } }
    }

    /// Suppresses the per-property `reload()` while we mutate several properties
    /// at once (e.g. `swapPair()`), so we only fetch once afterwards.
    private var suppressReload = false

    /// Reverses the chart pair (base ↔ target) and persists the new selection.
    func swapPair() {
        suppressReload = true
        let oldBase = baseCode
        baseCode = targetCode
        targetCode = oldBase
        suppressReload = false
        UserDefaults.standard.set(baseCode, forKey: AppConfig.StorageKeys.baseCurrencyCode)
        UserDefaults.standard.set(targetCode, forKey: AppConfig.StorageKeys.targetCurrencyCode)
        Task { await reload() }
    }

    private(set) var points: [Point] = []
    private(set) var isLoading: Bool = false
    private(set) var errorMessage: String?

    /// Percentage variation from the first point to the last.
    var variationPercent: Double? {
        guard let first = points.first?.rate, first != 0,
              let last  = points.last?.rate else { return nil }
        return ((last - first) / first) * 100
    }

    /// Absolute change (last − first) across the range.
    var absoluteChange: Double? {
        guard let first = points.first?.rate, let last = points.last?.rate else { return nil }
        return last - first
    }

    /// Lowest / highest rate in the visible range.
    var low: Double?  { points.map(\.rate).min() }
    var high: Double? { points.map(\.rate).max() }

    /// Latest rate (1 base → target).
    var currentRate: Double? { points.last?.rate }

    private let service: ExchangeRateService

    init(baseCode: String, targetCode: String, service: ExchangeRateService = .shared) {
        self.baseCode = baseCode
        self.targetCode = targetCode
        self.service = service
    }

    func reload() async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        let end = Date()
        let start = Calendar.current.date(byAdding: .day, value: -range.days, to: end) ?? end
        do {
            let series: [(date: Date, rate: Double)]
            if !CurrencyCatalog.isCrypto(baseCode), !CurrencyCatalog.isCrypto(targetCode) {
                // Fiat ↔ fiat: Frankfurter fast path.
                series = try await service.fetchTimeSeries(baseCode: baseCode,
                                                           targetCode: targetCode,
                                                           from: start, to: end)
            } else {
                // Any pair involving crypto: build via the USD pivot.
                series = try await Self.crossSeries(service: service,
                                                    from: baseCode, to: targetCode,
                                                    start: start, end: end)
            }
            self.points = series.map { Point(date: $0.date, rate: $0.rate) }
            if points.isEmpty {
                self.errorMessage = NSLocalizedString("chart_no_data_subtitle", comment: "")
            }
        } catch {
            self.points = []
            self.errorMessage = NSLocalizedString("chart_load_error", comment: "")
        }
    }

    /// Builds a `1 from → to` daily series via USD-per-unit prices for either side
    /// (fiat or crypto). `rate = pFrom / pTo`, joined on common days.
    private static func crossSeries(service: ExchangeRateService,
                                    from: String, to: String,
                                    start: Date, end: Date) async throws -> [(date: Date, rate: Double)] {
        async let fromTask = service.fetchSeriesUSD(code: from, from: start, to: end)
        async let toTask   = service.fetchSeriesUSD(code: to,   from: start, to: end)
        let fromSeries = try await fromTask   // USD per unit `from` (empty if USD)
        let toSeries   = try await toTask     // USD per unit `to`   (empty if USD)

        let fromIsUSD = (from == "USD")
        let toIsUSD   = (to == "USD")
        if fromIsUSD, toIsUSD { return [] }

        let dates: [Date]
        if fromIsUSD       { dates = Array(toSeries.keys) }
        else if toIsUSD    { dates = Array(fromSeries.keys) }
        else               { dates = Array(Set(fromSeries.keys).intersection(toSeries.keys)) }

        var out: [(date: Date, rate: Double)] = []
        for day in dates.sorted() {
            let pFrom = fromIsUSD ? 1.0 : (fromSeries[day] ?? .nan)
            let pTo   = toIsUSD   ? 1.0 : (toSeries[day]   ?? .nan)
            guard pFrom.isFinite, pTo.isFinite, pTo != 0 else { continue }
            out.append((date: day, rate: pFrom / pTo))
        }
        return out
    }
}
