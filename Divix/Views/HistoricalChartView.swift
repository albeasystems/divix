import SwiftUI
import Charts

struct HistoricalChartView: View {

    @AppStorage(AppConfig.StorageKeys.baseCurrencyCode)
    private var baseCode: String = AppConfig.defaultBaseCurrencyCode
    @AppStorage(AppConfig.StorageKeys.targetCurrencyCode)
    private var targetCode: String = AppConfig.defaultTargetCurrencyCode

    @State private var viewModel: ExchangeRateViewModel
    @State private var showingBasePicker = false
    @State private var showingTargetPicker = false
    @State private var selectedDate: Date?

    init() {
        let base = UserDefaults.standard.string(forKey: AppConfig.StorageKeys.baseCurrencyCode)
            ?? AppConfig.defaultBaseCurrencyCode
        let target = UserDefaults.standard.string(forKey: AppConfig.StorageKeys.targetCurrencyCode)
            ?? AppConfig.defaultTargetCurrencyCode
        _viewModel = State(initialValue: ExchangeRateViewModel(baseCode: base, targetCode: target))
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 14) {
                pairRow
                header
                rangePicker
                chart
                    .frame(maxHeight: .infinity)
                    .clipped()
                if !viewModel.points.isEmpty {
                    statsCard
                }
            }
            .padding(.horizontal)
            .padding(.top, 8)
            .navigationTitle(Text("chart_title"))
            .navigationBarTitleDisplayModeInline()
            .sheet(isPresented: $showingBasePicker) {
                CurrencyPickerView(selectedCode: $baseCode)
                    .onDisappear { viewModel.baseCode = baseCode }
            }
            .sheet(isPresented: $showingTargetPicker) {
                CurrencyPickerView(selectedCode: $targetCode)
                    .onDisappear { viewModel.targetCode = targetCode }
            }
            .task { await viewModel.reload() }
            .onChange(of: viewModel.range) { _, _ in selectedDate = nil }
            .onChange(of: viewModel.baseCode) { _, _ in selectedDate = nil }
            .onChange(of: viewModel.targetCode) { _, _ in selectedDate = nil }
            .safeAreaInset(edge: .bottom) {
                AdBannerView()
            }
        }
    }

    // MARK: - Pieces

    private var pairRow: some View {
        HStack(spacing: 12) {
            CurrencyChipButton(currency: CurrencyCatalog.currency(for: viewModel.baseCode)) {
                showingBasePicker = true
            }
            Button {
                withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                    viewModel.swapPair()
                }
                baseCode = viewModel.baseCode
                targetCode = viewModel.targetCode
            } label: {
                Image(systemName: "arrow.left.arrow.right")
                    .font(.headline)
                    .padding(8)
                    .background(Circle().fill(Color.accentColor.opacity(0.15)))
            }
            .accessibilityLabel(Text("chart_a11y_reverse"))
            CurrencyChipButton(currency: CurrencyCatalog.currency(for: viewModel.targetCode)) {
                showingTargetPicker = true
            }
        }
        .frame(maxWidth: .infinity)
    }

    /// Big value + change % (Apple-Stocks style). Reflects the scrubbed point
    /// when the user touches the chart.
    private var header: some View {
        let shownRate = selectedPoint?.rate ?? viewModel.currentRate
        return VStack(alignment: .leading, spacing: 2) {
            HStack(alignment: .firstTextBaseline, spacing: 10) {
                Text(shownRate.map(formatRate) ?? "—")
                    .font(.system(size: 32, weight: .bold, design: .rounded))
                    .monospacedDigit()
                if selectedPoint == nil, let pct = viewModel.variationPercent {
                    Text(formatPercent(pct))
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(pct >= 0 ? Color.statusLive : Color.statusOffline)
                        .monospacedDigit()
                }
                Spacer()
            }
            if let sp = selectedPoint {
                Text(sp.date, format: .dateTime.day().month().year())
                    .font(.caption)
                    .foregroundStyle(.secondary)
            } else {
                Text("1 \(viewModel.baseCode) = \(viewModel.currentRate.map(formatRate) ?? "—") \(viewModel.targetCode)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    /// The data point nearest the user's touch on the chart.
    private var selectedPoint: ExchangeRateViewModel.Point? {
        guard let selectedDate else { return nil }
        return viewModel.points.min(by: {
            abs($0.date.timeIntervalSince(selectedDate)) < abs($1.date.timeIntervalSince(selectedDate))
        })
    }

    private var rangePicker: some View {
        Picker("chart_range", selection: $viewModel.range) {
            ForEach(ExchangeRateViewModel.Range.allCases) { range in
                Text(range.localizationKey).tag(range)
            }
        }
        .pickerStyle(.segmented)
    }

    @ViewBuilder
    private var chart: some View {
        if viewModel.isLoading && viewModel.points.isEmpty {
            ProgressView()
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        } else if viewModel.points.isEmpty {
            ContentUnavailableView(
                String(localized: "chart_no_data_title"),
                systemImage: "chart.xyaxis.line",
                description: Text(viewModel.errorMessage ?? String(localized: "chart_no_data_subtitle"))
            )
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        } else {
            let up = (viewModel.variationPercent ?? 0) >= 0
            let lineColor = up ? Color.statusLive : Color.statusOffline
            Chart {
                ForEach(viewModel.points) { point in
                    LineMark(
                        x: .value("chart_x_axis", point.date),
                        y: .value("chart_y_axis", point.rate)
                    )
                    .foregroundStyle(lineColor)
                    .interpolationMethod(.monotone)
                    AreaMark(
                        x: .value("chart_x_axis", point.date),
                        y: .value("chart_y_axis", point.rate)
                    )
                    .foregroundStyle(
                        LinearGradient(colors: [lineColor.opacity(0.25), .clear],
                                       startPoint: .top, endPoint: .bottom)
                    )
                    .interpolationMethod(.monotone)
                }
                if let sp = selectedPoint {
                    RuleMark(x: .value("chart_x_axis", sp.date))
                        .foregroundStyle(Color.secondary.opacity(0.4))
                    PointMark(
                        x: .value("chart_x_axis", sp.date),
                        y: .value("chart_y_axis", sp.rate)
                    )
                    .foregroundStyle(lineColor)
                    .symbolSize(90)
                }
            }
            .chartXSelection(value: $selectedDate)
            .chartYScale(domain: yDomain)
            .chartYAxis { AxisMarks(position: .trailing) }
            .chartXAxis { AxisMarks(values: .automatic(desiredCount: 4)) }
            .frame(maxHeight: .infinity)
        }
    }

    /// Tight y-domain around the data (so the line isn't a flat line near 0).
    private var yDomain: ClosedRange<Double> {
        guard let lo = viewModel.low, let hi = viewModel.high else { return 0...1 }
        if hi <= lo {
            let pad = Swift.max(Swift.abs(hi) * 0.01, 0.0001)
            return (lo - pad)...(hi + pad)
        }
        let pad = (hi - lo) * 0.15
        return (lo - pad)...(hi + pad)
    }

    /// Low / High / Change card.
    private var statsCard: some View {
        VStack(spacing: 10) {
            statRow("chart_low", value: viewModel.low.map(formatRate))
            statRow("chart_high", value: viewModel.high.map(formatRate))
            changeRow
        }
        .padding(14)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(Color.secondarySystemBackground)
        )
    }

    private func statRow(_ key: LocalizedStringKey, value: String?) -> some View {
        HStack {
            Text(key).foregroundStyle(.secondary)
            Spacer()
            Text(value ?? "—").monospacedDigit()
        }
        .font(.subheadline)
    }

    private var changeRow: some View {
        HStack {
            Text("chart_change").foregroundStyle(.secondary)
            Spacer()
            if let change = viewModel.absoluteChange, let pct = viewModel.variationPercent {
                Text("\(formatSignedRate(change)) (\(formatPercent(pct)))")
                    .foregroundStyle(change >= 0 ? Color.statusLive : Color.statusOffline)
                    .monospacedDigit()
            } else {
                Text(verbatim: "—").monospacedDigit()
            }
        }
        .font(.subheadline.weight(.medium))
    }

    // MARK: - Formatters

    private func formatRate(_ value: Double) -> String {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.maximumFractionDigits = value < 1 ? 6 : 4
        f.minimumFractionDigits = 2
        return f.string(from: NSNumber(value: value)) ?? "\(value)"
    }
    private func formatSignedRate(_ value: Double) -> String {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.positivePrefix = "+"
        f.maximumFractionDigits = abs(value) < 1 ? 6 : 4
        f.minimumFractionDigits = 2
        return f.string(from: NSNumber(value: value)) ?? "\(value)"
    }
    private func formatPercent(_ value: Double) -> String {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.positivePrefix = "+"
        f.maximumFractionDigits = 2
        f.minimumFractionDigits = 2
        let formatted = f.string(from: NSNumber(value: value)) ?? "\(value)"
        return "\(formatted)%"
    }
}

#Preview {
    HistoricalChartView()
}
