import SwiftUI

/// Quick-view: pick a base + amount and see it converted into your curated list
/// of favourite currencies (fiat + crypto). Tap a row to make it the new base.
struct FavoritesView: View {

    @AppStorage(AppConfig.StorageKeys.baseCurrencyCode)
    private var baseCode: String = AppConfig.defaultBaseCurrencyCode

    @State private var favorites = FavoritesViewModel.shared
    @State private var amountText: String = "1"
    @State private var result: ExchangeRateResult?
    @State private var isLoading = false
    @State private var showingBasePicker = false
    @State private var showingAddPicker = false
    @State private var newCode = ""
    @FocusState private var amountFocused: Bool

    private var amount: Double {
        Double(amountText.replacingOccurrences(of: ",", with: ".")) ?? 0
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 12) {
                inputRow
                RateStatusBadge(result: result)
                list
            }
            .padding(.horizontal)
            .padding(.top, 8)
            .navigationTitle(Text("favorites_title"))
            .navigationBarTitleDisplayModeInline()
            .toolbar {
                #if os(iOS)
                ToolbarItem(placement: .topBarLeading) { EditButton() }
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showingAddPicker = true } label: {
                        Image(systemName: "plus")
                    }
                    .accessibilityLabel(Text("multi_add_currency"))
                }
                #else
                ToolbarItem(placement: .automatic) {
                    Button { showingAddPicker = true } label: {
                        Label("multi_add_currency", systemImage: "plus")
                    }
                }
                #endif
            }
            .sheet(isPresented: $showingBasePicker) {
                CurrencyPickerView(selectedCode: $baseCode)
            }
            .sheet(isPresented: $showingAddPicker) {
                CurrencyPickerView(selectedCode: $newCode)
                    .onDisappear { addIfNeeded() }
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
            TextField("multi_amount_placeholder", text: $amountText)
                .decimalPadKeyboard()
                .focused($amountFocused)
                .font(.title3.weight(.semibold))
                .multilineTextAlignment(.trailing)
                .onChange(of: amountText) { _, newValue in
                    let cleaned = MultiCurrencyListView.sanitizeNumeric(newValue)
                    if cleaned != newValue { amountText = cleaned }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 10)
                .background(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(Color.secondarySystemBackground)
                )
        }
    }

    // MARK: - List

    private var list: some View {
        List {
            ForEach(favorites.codes, id: \.self) { code in
                row(for: code)
                    .contentShape(Rectangle())
                    .onTapGesture { promote(code) }
            }
            .onDelete(perform: favorites.remove)
            .onMove(perform: favorites.move)
        }
        .listStyle(.plain)
        .scrollDismissesKeyboard(.immediately)
        .overlay {
            if favorites.codes.isEmpty {
                ContentUnavailableView(
                    String(localized: "favorites_empty_title"),
                    systemImage: "star",
                    description: Text("favorites_empty_subtitle")
                )
            }
        }
    }

    private func row(for code: String) -> some View {
        let currency = CurrencyCatalog.currency(for: code)
        let converted = result?.snapshot.convert(amount: amount, from: baseCode, to: code)
        let unitRate = result?.snapshot.convert(amount: 1, from: baseCode, to: code)
        return HStack(spacing: 12) {
            CurrencyFlag(currency: currency)
            VStack(alignment: .leading, spacing: 2) {
                Text(currency.code).font(.body.weight(.semibold))
                Text(currency.localizedName)
                    .font(.caption).foregroundStyle(.secondary).lineLimit(1)
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 2) {
                Text(CurrencyFormat.string(converted, code: code))
                    .font(.body.weight(.medium))
                    .monospacedDigit()
                if let unitRate {
                    Text(unitLine(unitRate, code: code))
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .monospacedDigit()
                }
            }
        }
    }

    private func unitLine(_ rate: Double, code: String) -> String {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.maximumFractionDigits = rate < 1 ? 6 : 4
        f.minimumFractionDigits = 2
        let r = f.string(from: NSNumber(value: rate)) ?? "\(rate)"
        return "1 \(baseCode) = \(r) \(code)"
    }

    // MARK: - Actions

    private func promote(_ code: String) {
        guard code != baseCode else { return }
        baseCode = code
    }

    private func addIfNeeded() {
        favorites.add(newCode)
        newCode = ""
    }

    private func refresh() async {
        isLoading = true
        defer { isLoading = false }
        result = await ExchangeRateService.shared.fetchUnifiedSnapshot()
    }
}

#Preview {
    FavoritesView()
}
