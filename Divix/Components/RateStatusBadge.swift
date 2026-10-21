import SwiftUI

struct RateStatusBadge: View {

    let result: ExchangeRateResult?

    var body: some View {
        HStack(spacing: 5) {
            Circle()
                .fill(color)
                .frame(width: 7, height: 7)
                .accessibilityHidden(true)
            Text(label)
                .font(.caption2)
                .foregroundStyle(.secondary)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(Text("badge_accessibility_prefix", bundle: .main))
        .accessibilityValue(label)
    }

    // MARK: - Resolved label & colour

    private var color: Color {
        guard let result else { return .gray }
        switch result.source {
        case .live:         return .statusLive
        case .cachedRecent: return .statusCached
        case .cachedStale:  return .statusCached
        case .offline:      return .gray   // offline → grey dot, still shows last update time
        }
    }

    private var label: String {
        guard let result else {
            return NSLocalizedString("badge_no_data", comment: "")
        }
        // Always show the absolute date + time of the last update; the dot colour
        // conveys freshness (live / cached / offline).
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        formatter.locale = .current
        let stamp = formatter.string(from: result.snapshot.fetchedAt)
        let format = NSLocalizedString("badge_updated_at", comment: "")
        return String(format: format, locale: .current, stamp)
    }
}

#Preview {
    VStack(spacing: 12) {
        RateStatusBadge(result: ExchangeRateResult(
            snapshot: ExchangeRateSnapshot(baseCode: "EUR", rates: ["USD": 1.08], fetchedAt: Date()),
            source: .live))
        RateStatusBadge(result: ExchangeRateResult(
            snapshot: ExchangeRateSnapshot(baseCode: "EUR", rates: ["USD": 1.08], fetchedAt: Date().addingTimeInterval(-6 * 3600)),
            source: .cachedRecent))
        RateStatusBadge(result: ExchangeRateResult(
            snapshot: ExchangeRateSnapshot(baseCode: "EUR", rates: ["USD": 1.08], fetchedAt: Date().addingTimeInterval(-72 * 3600)),
            source: .offline))
        RateStatusBadge(result: nil)
    }
    .padding()
}
