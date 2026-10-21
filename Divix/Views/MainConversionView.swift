import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

struct MainConversionView: View {

    @State private var viewModel = ConversionViewModel()
    @State private var favorites = FavoritesViewModel.shared
    @State private var appState = AppState.shared
    @State private var showingBasePicker = false
    @State private var showingTargetPicker = false
    @State private var showingSettings = false

    var body: some View {
        NavigationStack {
            content
                .navigationTitle(Text(verbatim: ""))
                .navigationBarTitleDisplayModeInline()
                .toolbar {
                    #if os(iOS)
                    ToolbarItem(placement: .topBarLeading) { settingsButton }
                    ToolbarItem(placement: .principal) {
                        Text("app_name")
                            .font(.system(size: 22, weight: .bold))
                            .lineLimit(1)
                            .minimumScaleFactor(0.6)
                    }
                    #else
                    ToolbarItem(placement: .navigation) { settingsButton }
                    #endif
                }
                .sheet(isPresented: $showingBasePicker) {
                    CurrencyPickerView(selectedCode: $viewModel.baseCode)
                }
                .sheet(isPresented: $showingTargetPicker) {
                    CurrencyPickerView(selectedCode: $viewModel.targetCode)
                }
                .sheet(isPresented: $showingSettings) {
                    SettingsView()
                }
                .task { await viewModel.refresh() }
                .refreshable { await viewModel.refresh() }
                .onAppear {
                    applyPendingPairIfAny()
                    AdsManager.shared.preloadInterstitial()
                }
                .onChange(of: appState.pendingPair) { _, _ in applyPendingPairIfAny() }
                .safeAreaInset(edge: .bottom) {
                    // La pastilla del rewarded va justo ENCIMA del banner: es el
                    // anuncio que el vídeo elimina. Solo en el Home.
                    VStack(spacing: 0) {
                        RewardedAdPill()
                        AdBannerView()
                    }
                }
        }
    }

    private var settingsButton: some View {
        Button {
            showingSettings = true
        } label: {
            Image(systemName: "gearshape.fill")
        }
        .accessibilityLabel(Text("main_a11y_open_settings"))
    }

    private func applyPendingPairIfAny() {
        guard let pair = appState.pendingPair else { return }
        viewModel.baseCode = pair.baseCode
        viewModel.targetCode = pair.targetCode
        appState.pendingPair = nil
    }

    // MARK: - Layout

    private var content: some View {
        GeometryReader { proxy in
            let isWide = proxy.size.width > 700  // iPad / landscape iPhone
            Group {
                if isWide {
                    HStack(alignment: .top, spacing: 24) {
                        conversionPanel
                            .frame(maxWidth: .infinity)
                        CalculatorKeypad(onTap: viewModel.calculatorTap)
                            .frame(maxWidth: 360)
                    }
                    .padding(.horizontal)
                } else {
                    ScrollView {
                        VStack(spacing: 24) {
                            conversionPanel
                                .padding(.horizontal)
                            CalculatorKeypad(onTap: viewModel.calculatorTap)
                                .padding(.horizontal, 4)
                        }
                        .padding(.bottom, 8)
                    }
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        }
    }

    private var conversionPanel: some View {
        VStack(spacing: 16) {
            currencyCards
            infoRow
        }
        .padding(.top, 16)
    }

    // MARK: - Currency cards

    private var currencyCards: some View {
        ZStack {
            VStack(spacing: 10) {
                currencyCard(code: viewModel.baseCode,
                             caption: "main_amount_label",
                             value: viewModel.displayExpression,
                             isSource: true,
                             a11yValueKey: "main_a11y_amount") {
                    showingBasePicker = true
                }
                currencyCard(code: viewModel.targetCode,
                             caption: "main_result_label",
                             value: formattedResult,
                             isSource: false,
                             a11yValueKey: "main_a11y_result") {
                    showingTargetPicker = true
                }
            }
            swapButton
        }
    }

    private func currencyCard(code: String,
                              caption: LocalizedStringKey,
                              value: String,
                              isSource: Bool,
                              a11yValueKey: LocalizedStringKey,
                              onPickCurrency: @escaping () -> Void) -> some View {
        let currency = CurrencyCatalog.currency(for: code)
        return HStack(spacing: 12) {
            Button(action: onPickCurrency) {
                HStack(spacing: 10) {
                    CurrencyFlag(currency: currency, font: .title)
                    VStack(alignment: .leading, spacing: 1) {
                        Text(code).font(.headline)
                        Text(currency.localizedName)
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                    }
                    Image(systemName: "chevron.down")
                        .font(.caption2.weight(.bold))
                        .foregroundStyle(.secondary)
                }
            }
            .buttonStyle(.plain)
            .accessibilityLabel(Text(currency.localizedName))

            favoriteStar(code: code)

            Spacer(minLength: 8)

            VStack(alignment: .trailing, spacing: 2) {
                Text(caption)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                Text(value)
                    .font(.system(size: 32, weight: isSource ? .light : .semibold, design: .rounded))
                    .lineLimit(1)
                    .minimumScaleFactor(0.4)
                    .monospacedDigit()
                    .contentTransition(.numericText())
                    .animation(.snappy, value: value)
                    .accessibilityLabel(Text(a11yValueKey))
                    .accessibilityValue(value)
                    .contextMenu {
                        Button {
                            copyToClipboard(value)
                        } label: {
                            Label("common_copy", systemImage: "doc.on.doc")
                        }
                    }
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 16)
        .background(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .fill(isSource ? Color.secondarySystemBackground : Color.accentColor.opacity(0.10))
        )
    }

    private var swapButton: some View {
        Button {
            withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                viewModel.swap()
            }
            #if canImport(UIKit)
            HapticService.impact(.light)
            #endif
        } label: {
            Image(systemName: "arrow.up.arrow.down")
                .font(.subheadline.weight(.bold))
                .foregroundStyle(.white)
                .frame(width: 40, height: 40)
                .background(Circle().fill(Color.accentColor))
                .overlay(Circle().stroke(Color.systemBackground, lineWidth: 3))
        }
        .accessibilityLabel(Text("main_a11y_swap"))
    }

    // MARK: - Info row (rate · timestamp · favourite)

    private var infoRow: some View {
        HStack(spacing: 10) {
            if let rate = viewModel.pairRate {
                Text(rateLine(rate))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.6)
            }
            Spacer(minLength: 4)
            RateStatusBadge(result: viewModel.result)
        }
    }

    private func favoriteStar(code: String) -> some View {
        let isFav = favorites.contains(code)
        return Button {
            favorites.toggle(code)
            #if canImport(UIKit)
            HapticService.impact(.light)
            #endif
        } label: {
            Image(systemName: isFav ? "star.fill" : "star")
                .font(.headline)
                .foregroundStyle(isFav ? Color.yellow : Color.secondary)
        }
        .buttonStyle(.borderless)
        .accessibilityLabel(Text(isFav ? "main_a11y_favorited" : "main_a11y_add_favorite"))
    }

    // MARK: - Formatting

    private var formattedResult: String {
        guard viewModel.convertedAmount != nil else {
            return NSLocalizedString("main_result_placeholder", comment: "")
        }
        return CurrencyFormat.string(viewModel.convertedAmount, code: viewModel.targetCode)
    }

    private func rateLine(_ rate: Double) -> String {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.maximumFractionDigits = rate < 1 ? 6 : 4
        f.minimumFractionDigits = 2
        let rateString = f.string(from: NSNumber(value: rate)) ?? "\(rate)"
        let format = NSLocalizedString("main_rate_line", comment: "")
        return String(format: format, locale: .current,
                      viewModel.baseCode, rateString, viewModel.targetCode)
    }

    private func copyToClipboard(_ string: String) {
        #if canImport(UIKit)
        UIPasteboard.general.string = string
        HapticService.impact(.light)
        #endif
    }
}

#Preview {
    MainConversionView()
}
