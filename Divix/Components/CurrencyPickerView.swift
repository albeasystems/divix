import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

/// Renders a currency's icon. Fiat → bundled flag image (falls back to a region
/// chip / emoji). Crypto → bundled coin logo (falls back to a brand-coloured
/// ticker badge for coins without a bundled icon).
struct CurrencyFlag: View {
    let currency: Currency
    var font: Font = .title2

    var body: some View {
        if currency.kind == .crypto {
            if Self.assetExists("crypto_\(currency.code)") {
                Image("crypto_\(currency.code)")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 30, height: 30)
                    .accessibilityHidden(true)
            } else {
                CryptoBadge(code: currency.code)
            }
        } else {
            let region = Currency.regionCode(for: currency.code)
            if Self.assetExists("flag_\(region)") {
                Image("flag_\(region)")
                    .resizable()
                    .scaledToFill()
                    .frame(width: 30, height: 22)
                    .clipShape(RoundedRectangle(cornerRadius: 4, style: .continuous))
                    .overlay(
                        RoundedRectangle(cornerRadius: 4, style: .continuous)
                            .strokeBorder(Color.primary.opacity(0.08))
                    )
                    .accessibilityHidden(true)
            } else {
                #if targetEnvironment(simulator)
                Text(region)
                    .font(.system(size: 11, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)
                    .frame(width: 30, height: 22)
                    .background(
                        RoundedRectangle(cornerRadius: 5, style: .continuous)
                            .fill(Color.accentColor.gradient)
                    )
                    .accessibilityHidden(true)
                #else
                Text(currency.flag)
                    .font(font)
                    .frame(width: 30)
                    .accessibilityHidden(true)
                #endif
            }
        }
    }

    /// Whether a named image asset is bundled (used to decide on a fallback).
    static func assetExists(_ name: String) -> Bool {
        #if canImport(UIKit)
        return UIImage(named: name) != nil
        #elseif canImport(AppKit)
        return NSImage(named: name) != nil
        #else
        return false
        #endif
    }

    /// Brand colours for the crypto badges (approximate, no asset bundle needed).
    static func cryptoColor(_ code: String) -> Color {
        cryptoColors[code] ?? .gray
    }

    private static let cryptoColors: [String: Color] = [
        "BTC":  Color(red: 0.97, green: 0.58, blue: 0.10),
        "ETH":  Color(red: 0.38, green: 0.49, blue: 0.92),
        "USDT": Color(red: 0.15, green: 0.68, blue: 0.58),
        "BNB":  Color(red: 0.95, green: 0.73, blue: 0.13),
        "SOL":  Color(red: 0.60, green: 0.25, blue: 0.95),
        "XRP":  Color(red: 0.15, green: 0.16, blue: 0.18),
        "USDC": Color(red: 0.16, green: 0.47, blue: 0.93),
        "ADA":  Color(red: 0.13, green: 0.30, blue: 0.62),
        "DOGE": Color(red: 0.76, green: 0.64, blue: 0.20),
        "TRX":  Color(red: 0.86, green: 0.18, blue: 0.18),
        "TON":  Color(red: 0.00, green: 0.53, blue: 0.80),
        "AVAX": Color(red: 0.90, green: 0.22, blue: 0.24),
        "DOT":  Color(red: 0.90, green: 0.00, blue: 0.52),
        "LINK": Color(red: 0.16, green: 0.40, blue: 0.93),
        "MATIC":Color(red: 0.51, green: 0.28, blue: 0.90),
        "LTC":  Color(red: 0.20, green: 0.47, blue: 0.78),
        "OP":   Color(red: 0.93, green: 0.00, blue: 0.16),
        "ARB":  Color(red: 0.16, green: 0.40, blue: 0.70),
        "SHIB": Color(red: 0.90, green: 0.27, blue: 0.13),
        "XLM":  Color(red: 0.10, green: 0.10, blue: 0.12)
    ]
}

/// Circular brand-coloured token showing the crypto ticker.
private struct CryptoBadge: View {
    let code: String
    var body: some View {
        Text(code)
            .font(.system(size: code.count > 3 ? 8 : 10, weight: .heavy, design: .rounded))
            .foregroundStyle(.white)
            .minimumScaleFactor(0.6)
            .lineLimit(1)
            .frame(width: 30, height: 30)
            .background(Circle().fill(CurrencyFlag.cryptoColor(code).gradient))
            .accessibilityHidden(true)
    }
}

/// Shared amount formatting for both fiat and crypto.
enum CurrencyFormat {
    /// Display `value` in `code`. Fiat uses the currency style; crypto (unknown
    /// to ISO formatters) uses a decimal with the ticker suffix and adaptive
    /// precision (more digits for small values). `nil` → an em-dash.
    static func string(_ value: Double?, code: String) -> String {
        guard let value else { return "—" }
        if CurrencyCatalog.isCrypto(code) { return cryptoString(value, code: code) }
        let f = NumberFormatter()
        f.numberStyle = .currency
        f.currencyCode = code
        f.locale = .current
        f.maximumFractionDigits = 2
        f.minimumFractionDigits = 2
        return f.string(from: NSNumber(value: value)) ?? "\(value)"
    }

    static func cryptoString(_ value: Double, code: String) -> String {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.locale = .current
        let magnitude = Swift.abs(value)
        let maxFrac: Int
        switch magnitude {
        case 0:           maxFrac = 2
        case ..<0.0001:   maxFrac = 8
        case ..<1:        maxFrac = 6
        case ..<1000:     maxFrac = 4
        default:          maxFrac = 2
        }
        f.maximumFractionDigits = maxFrac
        f.minimumFractionDigits = 2
        let num = f.string(from: NSNumber(value: value)) ?? "\(value)"
        return "\(num) \(code)"
    }
}

struct CurrencyPickerView: View {

    @Binding var selectedCode: String
    @Environment(\.dismiss) private var dismiss
    @State private var searchText: String = ""
    @State private var kind: KindFilter = .all

    private enum KindFilter: Hashable { case all, fiat, crypto }

    private var filtered: [Currency] {
        var all = CurrencyCatalog.all
        switch kind {
        case .all:    break
        case .fiat:   all = all.filter { $0.kind == .fiat }
        case .crypto: all = all.filter { $0.kind == .crypto }
        }
        let trimmed = searchText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return all }
        let q = trimmed.lowercased()
        return all.filter {
            $0.code.lowercased().contains(q) ||
            $0.localizedName.lowercased().contains(q)
        }
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                Picker("", selection: $kind) {
                    Text("filter_all").tag(KindFilter.all)
                    Text("section_fiat").tag(KindFilter.fiat)
                    Text("section_crypto").tag(KindFilter.crypto)
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                .padding(.bottom, 8)

                List {
                    let fiat = filtered.filter { $0.kind == .fiat }
                    let crypto = filtered.filter { $0.kind == .crypto }
                    if !fiat.isEmpty {
                        Section(header: Text("section_fiat")) {
                            ForEach(fiat) { row(for: $0) }
                        }
                    }
                    if !crypto.isEmpty {
                        Section(header: Text("section_crypto")) {
                            ForEach(crypto) { row(for: $0) }
                        }
                    }
                }
                .listStyle(.plain)
            }
            .searchable(text: $searchText,
                        prompt: Text("currency_picker_search_placeholder"))
            .navigationTitle(Text("currency_picker_title"))
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "common_cancel")) { dismiss() }
                }
            }
        }
    }

    private func row(for currency: Currency) -> some View {
        Button {
            selectedCode = currency.code
            dismiss()
        } label: {
            HStack(spacing: 12) {
                CurrencyFlag(currency: currency)
                VStack(alignment: .leading, spacing: 2) {
                    Text(currency.code).font(.body.weight(.semibold))
                    Text(currency.localizedName)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                if currency.code == selectedCode {
                    Image(systemName: "checkmark")
                        .foregroundStyle(.tint)
                        .accessibilityHidden(true)
                }
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}

struct CurrencyChipButton: View {
    let currency: Currency
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                CurrencyFlag(currency: currency, font: .title3)
                Text(currency.code).font(.headline)
                Image(systemName: "chevron.down")
                    .font(.caption2.weight(.bold))
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(
                Capsule().fill(Color.secondarySystemBackground)
            )
            .foregroundStyle(.primary)
        }
        .accessibilityLabel(Text(currency.localizedName))
    }
}

#Preview {
    CurrencyPickerView(selectedCode: .constant("EUR"))
}
