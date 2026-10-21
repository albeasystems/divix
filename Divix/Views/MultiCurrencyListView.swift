import SwiftUI

/// Unified currency list (merges the old "Multi" + "Favorites" tabs):
/// pick a base + amount and see every currency converted. Toggle ⭐︎ to favourite,
/// switch between **All** and **Favourites**, reorder, and tap a row to set base.
struct MultiCurrencyListView: View {

    @AppStorage(AppConfig.StorageKeys.baseCurrencyCode)
    private var baseCode: String = AppConfig.defaultBaseCurrencyCode

    @AppStorage(AppConfig.StorageKeys.multiOrder)
    private var orderRaw: String = ""

    @State private var favorites = FavoritesViewModel.shared
    @State private var amountText: String = "1"
    @State private var result: ExchangeRateResult?
    @State private var isLoading = false
    @State private var showingBasePicker = false
    @State private var scope: Scope = .all
    @State private var showingKeypad = false

    private enum Scope: Hashable { case all, favorites, fiat, crypto }

    private var amount: Double {
        Double(amountText.replacingOccurrences(of: ",", with: ".")) ?? 0
    }

    private var catalogOrder: [String] {
        CurrencyCatalog.supportedCodes + CurrencyCatalog.cryptoOrder
    }

    /// Codes with a rate (base excluded), in the user's saved order.
    private var allCodes: [String] {
        guard let rates = result?.snapshot.rates else { return [] }
        let available = Set(catalogOrder.filter { $0 != baseCode && rates[$0] != nil })
        let saved = orderRaw.split(separator: ",").map(String.init).filter { available.contains($0) }
        let savedSet = Set(saved)
        let rest = catalogOrder.filter { available.contains($0) && !savedSet.contains($0) }
        return saved + rest
    }

    private var displayedCodes: [String] {
        switch scope {
        case .all:       return favoritesFirst(allCodes)
        case .favorites: return favorites.codes   // show all favourites (incl. the current base)
        case .fiat:      return favoritesFirst(allCodes.filter { !CurrencyCatalog.isCrypto($0) })
        case .crypto:    return favoritesFirst(allCodes.filter { CurrencyCatalog.isCrypto($0) })
        }
    }

    /// Favourited codes first (preserving relative order), then the rest.
    private func favoritesFirst(_ codes: [String]) -> [String] {
        let favs = codes.filter { favorites.contains($0) }
        let rest = codes.filter { !favorites.contains($0) }
        return favs + rest
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 10) {
                inputRow
                RateStatusBadge(result: result)
                scopePicker
                list
            }
            .padding(.horizontal)
            .padding(.top, 8)
            .navigationTitle(Text("list_title"))
            .navigationBarTitleDisplayModeInline()
            .toolbar {
                #if os(iOS)
                ToolbarItem(placement: .topBarTrailing) { EditButton() }
                #endif
            }
            .sheet(isPresented: $showingBasePicker) {
                CurrencyPickerView(selectedCode: $baseCode)
            }
            .sheet(isPresented: $showingKeypad) {
                NumericKeypad(text: $amountText) { showingKeypad = false }
                    .presentationDetents([.height(390)])
                    .presentationDragIndicator(.visible)
            }
            .task { await refresh() }
            .onChange(of: baseCode) { _, _ in Task { await refresh() } }
            .refreshable { await refresh() }
        }
        .safeAreaInset(edge: .bottom) {
            AdBannerView()
        }
    }

    // MARK: - Header

    private var inputRow: some View {
        HStack(spacing: 12) {
            CurrencyChipButton(currency: CurrencyCatalog.currency(for: baseCode)) {
                showingBasePicker = true
            }
            Button {
                showingKeypad = true
            } label: {
                Text(amountText.isEmpty ? "0" : amountText)
                    .font(.title3.weight(.semibold))
                    .monospacedDigit()
                    .foregroundStyle(.primary)
                    .frame(maxWidth: .infinity, alignment: .trailing)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 12)
                    .background(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Color.secondarySystemBackground)
                    )
            }
            .buttonStyle(.plain)
        }
    }

    private var scopePicker: some View {
        Picker("", selection: $scope) {
            Text("filter_all").tag(Scope.all)
            Text("favorites_title").tag(Scope.favorites)
            Text("section_fiat").tag(Scope.fiat)
            Text("section_crypto").tag(Scope.crypto)
        }
        .pickerStyle(.segmented)
    }

    // MARK: - List

    private var list: some View {
        List {
            ForEach(displayedCodes, id: \.self) { code in
                row(for: code)
                    .contentShape(Rectangle())
                    .onTapGesture { promote(code) }
            }
            .onMove(perform: moveCodes)
        }
        .listStyle(.plain)
        .scrollContentBackground(.hidden)
        .contentMargins(.top, 0, for: .scrollContent)
        .scrollDismissesKeyboard(.immediately)
        .overlay {
            if displayedCodes.isEmpty {
                emptyState
            }
        }
    }

    @ViewBuilder
    private var emptyState: some View {
        if isLoading && scope != .favorites {
            ProgressView()
        } else if scope == .favorites {
            ContentUnavailableView(
                String(localized: "favorites_empty_title"),
                systemImage: "star",
                description: Text("favorites_empty_subtitle")
            )
        } else {
            ContentUnavailableView(
                String(localized: "multi_empty_title"),
                systemImage: "list.bullet",
                description: Text("multi_empty_subtitle")
            )
        }
    }

    private func row(for code: String) -> some View {
        let currency = CurrencyCatalog.currency(for: code)
        let converted = result?.snapshot.convert(amount: amount, from: baseCode, to: code)
        let isFav = favorites.contains(code)
        return HStack(spacing: 12) {
            CurrencyFlag(currency: currency)
            VStack(alignment: .leading, spacing: 2) {
                Text(currency.code).font(.body.weight(.semibold))
                Text(currency.localizedName)
                    .font(.caption).foregroundStyle(.secondary).lineLimit(1)
            }
            Spacer()
            Text(CurrencyFormat.string(converted, code: code))
                .font(.body.weight(.medium))
                .monospacedDigit()
            Button {
                favorites.toggle(code)
                #if canImport(UIKit)
                HapticService.impact(.light)
                #endif
            } label: {
                Image(systemName: isFav ? "star.fill" : "star")
                    .foregroundStyle(isFav ? Color.yellow : Color.secondary)
            }
            .buttonStyle(.borderless)
            .accessibilityLabel(Text(isFav ? "main_a11y_favorited" : "main_a11y_add_favorite"))
        }
    }

    // MARK: - Actions

    private func promote(_ code: String) {
        guard code != baseCode else { return }
        baseCode = code
    }

    private func moveCodes(from source: IndexSet, to destination: Int) {
        switch scope {
        case .favorites:
            favorites.move(from: source, to: destination)
        case .all:
            var current = displayedCodes
            current.move(fromOffsets: source, toOffset: destination)
            orderRaw = current.joined(separator: ",")
        default:
            break   // reordering not applicable to the Fiat/Crypto filtered views
        }
    }

    private func refresh() async {
        isLoading = true
        defer { isLoading = false }
        result = await ExchangeRateService.shared.fetchUnifiedSnapshot()
    }

    /// Keeps only digits and a single decimal separator (no letters/symbols).
    static func sanitizeNumeric(_ raw: String) -> String {
        var seenSeparator = false
        var out = ""
        for ch in raw {
            if ch.isNumber {
                out.append(ch)
            } else if (ch == "." || ch == ",") && !seenSeparator {
                seenSeparator = true
                out.append(ch)
            }
        }
        return out
    }
}

#Preview {
    MultiCurrencyListView()
}
