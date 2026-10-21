import SwiftUI
import StoreKit
import os

struct SettingsView: View {

    @Environment(\.dismiss) private var dismiss
    @State private var premium = PremiumService.shared
    @State private var localization = LocalizationManager.shared

    /// La fila "Opciones de privacidad" solo se muestra donde el CMP la exige
    /// (EEA/UK). Se lee una vez al aparecer, no en cada render.
    @State private var showPrivacyOptions = false

    #if DEBUG
    /// Panel de diagnóstico de la mediación. Solo DEBUG: nunca llega a la
    /// App Store. Oculto tras 10 toques en el título "Ajustes".
    @State private var showingAdDiagnostics = false
    @State private var diagnosticsTapTimestamps: [Date] = []
    #endif

    // Easter-egg state
    @State private var tapTimestamps: [Date] = []
    @State private var showingPremiumAlert = false

    private struct Lang: Identifiable {
        let code: String
        let nameKey: LocalizedStringKey
        let region: String?     // flag asset region (nil = follow system)
        var id: String { code }
    }

    private static let languages: [Lang] = [
        .init(code: "",        nameKey: "language_system",            region: nil),
        .init(code: "es",      nameKey: "language_spanish",           region: "ES"),
        .init(code: "en",      nameKey: "language_english",           region: "US"),
        .init(code: "fr",      nameKey: "language_french",            region: "FR"),
        .init(code: "it",      nameKey: "language_italian",           region: "IT"),
        .init(code: "de",      nameKey: "language_german",            region: "DE"),
        .init(code: "pt",      nameKey: "language_portuguese",        region: "PT"),
        .init(code: "ar",      nameKey: "language_arabic",            region: "SA"),
        .init(code: "zh-Hans", nameKey: "language_chinese_simplified", region: "CN"),
        .init(code: "hi",      nameKey: "language_hindi",             region: "IN"),
        .init(code: "ja",      nameKey: "language_japanese",          region: "JP"),
        .init(code: "ko",      nameKey: "language_korean",            region: "KR"),
        .init(code: "vi",      nameKey: "language_vietnamese",        region: "VN")
    ]

    private var currentLang: Lang {
        Self.languages.first { $0.code == localization.language } ?? Self.languages[0]
    }

    var body: some View {
        NavigationStack {
            Form {
                if premium.isPremium {
                    premiumActiveSection
                } else {
                    purchaseSection
                }
                languageSection
                linksSection
                feedbackSection
                aboutSection
            }
            .navigationTitle(Text(verbatim: ""))
            .navigationBarTitleDisplayModeInline()
            .toolbar {
                ToolbarItem(placement: .principal) {
                    // El título es el disparador oculto del panel de
                    // diagnóstico: 10 toques seguidos lo abren (solo DEBUG).
                    Text("settings_title")
                        .font(.headline)
                        .onTapGesture { registerDiagnosticsTap() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("common_close") { dismiss() }
                }
            }
            .onAppear { showPrivacyOptions = ConsentService.shared.privacyOptionsRequired }
            #if DEBUG
            .sheet(isPresented: $showingAdDiagnostics) { AdDiagnosticsView() }
            #endif
            .alert(premiumAlertTitle, isPresented: $showingPremiumAlert) {
                Button("common_ok", role: .cancel) { }
            } message: {
                premiumAlertMessage
            }
        }
        .environment(\.locale, localization.locale)
    }

    // MARK: - Sections

    /// Shown when the user has already purchased — simple confirmation row.
    private var premiumActiveSection: some View {
        Section {
            HStack(spacing: 12) {
                icon("checkmark.seal.fill", .green)
                Text("settings_premium_active").font(.body.weight(.medium))
            }
        }
    }

    /// Buy/restore row for free users.
    private var purchaseSection: some View {
        Section {
            Button {
                Task { await premium.purchase() }
            } label: {
                HStack(spacing: 12) {
                    icon("nosign", .red)
                    VStack(alignment: .leading, spacing: 2) {
                        Text("iap_remove_ads")
                            .font(.body.weight(.semibold))
                            .foregroundStyle(.primary)
                        Text("iap_one_time")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer()
                    if premium.isLoading {
                        ProgressView().scaleEffect(0.8)
                    } else if let product = premium.product {
                        Text(product.displayPrice)
                            .font(.body.weight(.semibold))
                            .foregroundStyle(.tint)
                    } else {
                        Image(systemName: "arrow.up.circle")
                            .foregroundStyle(.tint)
                    }
                }
            }
            .disabled(premium.isLoading)

            Button {
                Task { await premium.restore() }
            } label: {
                HStack(spacing: 12) {
                    icon("arrow.clockwise", .green)
                    Text("iap_restore").foregroundStyle(.tint)
                    Spacer()
                    if premium.isLoading { ProgressView().scaleEffect(0.8) }
                }
            }
            .disabled(premium.isLoading)

            if let err = premium.error {
                Text(err)
                    .font(.caption)
                    .foregroundStyle(.red)
            }
        }
    }

    private var languageSection: some View {
        Section {
            Menu {
                Picker(selection: $localization.language) {
                    ForEach(Self.languages) { lang in
                        Text(lang.nameKey).tag(lang.code)
                    }
                } label: { EmptyView() }
            } label: {
                HStack(spacing: 12) {
                    icon("globe", .blue)
                    Text("settings_language").foregroundStyle(.tint)
                    Spacer()
                    if let region = currentLang.region { flagImage(region) }
                    Text(currentLang.nameKey).foregroundStyle(.secondary)
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.caption2.weight(.semibold))
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    private var linksSection: some View {
        Section {
            linkRow("settings_visit_website",  "globe",               .blue,   url: AppConfig.marketingURL)
            linkRow("settings_privacy_policy", "lock.shield",         .purple, url: AppConfig.privacyPolicyURL)
            if showPrivacyOptions {
                Button {
                    Task { await ConsentService.shared.presentPrivacyOptions() }
                } label: {
                    HStack(spacing: 12) {
                        icon("hand.raised.fill", .indigo)
                        Text("settings_privacy_options").foregroundStyle(.tint)
                        Spacer()
                    }
                }
            }
            linkRow("settings_terms_of_use",   "doc.text",            .orange, url: AppConfig.termsOfUseURL)
            linkRow("settings_support",        "questionmark.circle", .green,  url: AppConfig.supportURL)
        }
    }

    private var feedbackSection: some View {
        Section {
            if let mail = makeMailURL() {
                linkRow("settings_send_suggestion", "envelope", .orange, url: mail)
            }
            Button {
                // Vía ReviewService para que la solicitud manual quede registrada:
                // aplica el cooldown normal y libera los intersticiales (si el
                // usuario ya ha venido a valorar, no hay valoración que proteger).
                ReviewService.shared.requestReviewFromSettings()
            } label: {
                HStack(spacing: 12) {
                    icon("star.fill", .yellow)
                    Text("settings_rate_app").foregroundStyle(.tint)
                    Spacer()
                }
            }
            ShareLink(item: AppConfig.marketingURL,
                      subject: Text("app_name"),
                      message: Text("settings_share_message")) {
                HStack(spacing: 12) {
                    icon("square.and.arrow.up", .green)
                    Text("settings_share_app").foregroundStyle(.tint)
                    Spacer()
                }
            }
        }
    }

    private var aboutSection: some View {
        Section {
            // Easter-egg cell: an invisible button over the version text fires the
            // hidden premium toggle (20 taps in 10s).
            ZStack {
                HStack(spacing: 12) {
                    icon("info.circle", .gray)
                    Text("settings_version")
                    Spacer()
                    Text(versionString).foregroundStyle(.secondary).monospacedDigit()
                }
                HStack {
                    Spacer()
                    Color.clear
                        .frame(width: 90, height: 30)
                        .contentShape(Rectangle())
                        .onTapGesture { registerEasterEggTap() }
                        .accessibilityHidden(true)
                }
            }
        }
    }

    // MARK: - Row helpers

    private func icon(_ name: String, _ color: Color) -> some View {
        Image(systemName: name)
            .font(.body)
            .foregroundStyle(color)
            .frame(width: 26, alignment: .center)
    }

    private func flagImage(_ region: String) -> some View {
        Image("flag_\(region)")
            .resizable()
            .scaledToFit()
            .frame(width: 22, height: 16)
            .clipShape(RoundedRectangle(cornerRadius: 3, style: .continuous))
    }

    private func linkRow(_ titleKey: LocalizedStringKey,
                         _ systemImage: String,
                         _ color: Color,
                         url: URL) -> some View {
        Link(destination: url) {
            HStack(spacing: 12) {
                icon(systemImage, color)
                Text(titleKey).foregroundStyle(.tint)
                Spacer()
                Image(systemName: "arrow.up.right")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
            }
        }
    }

    // MARK: - Disparador oculto del panel de diagnóstico

    /// 10 toques en el título de Ajustes dentro de la ventana de tiempo abren
    /// el panel de diagnóstico de anuncios. En Release es un no-op: el panel
    /// no existe fuera de DEBUG.
    private func registerDiagnosticsTap() {
        #if DEBUG
        let now = Date()
        diagnosticsTapTimestamps = diagnosticsTapTimestamps.filter {
            now.timeIntervalSince($0) <= AppConfig.adDiagnosticsTapWindowSeconds
        }
        diagnosticsTapTimestamps.append(now)
        AdsLog.sdk.info("diagnostics tap \(self.diagnosticsTapTimestamps.count)/\(AppConfig.adDiagnosticsRequiredTaps)")
        if diagnosticsTapTimestamps.count >= AppConfig.adDiagnosticsRequiredTaps {
            diagnosticsTapTimestamps.removeAll()
            #if canImport(UIKit)
            HapticService.impact(.heavy)
            #endif
            showingAdDiagnostics = true
        }
        #endif
    }

    // MARK: - Easter egg

    private func registerEasterEggTap() {
        let now = Date()
        tapTimestamps = tapTimestamps.filter {
            now.timeIntervalSince($0) <= AppConfig.easterEggTimeWindowSeconds
        }
        tapTimestamps.append(now)
        if tapTimestamps.count >= AppConfig.easterEggRequiredTaps {
            tapTimestamps.removeAll()
            premium.toggle()
            #if canImport(UIKit)
            HapticService.impact(.heavy)
            #endif
            showingPremiumAlert = true
        }
    }

    private var premiumAlertTitle: Text {
        Text(premium.isPremium ? "premium_unlocked_title" : "premium_locked_title")
    }
    private var premiumAlertMessage: Text {
        Text(premium.isPremium ? "premium_unlocked_message" : "premium_locked_message")
    }

    // MARK: - Helpers

    private var versionString: String {
        let info = Bundle.main.infoDictionary
        let version = info?["CFBundleShortVersionString"] as? String ?? "1.0"
        let build   = info?["CFBundleVersion"] as? String ?? "1"
        return "\(version) (\(build))"
    }

    private func makeMailURL() -> URL? {
        let subject = String(localized: "settings_suggestion_subject")
        let encoded = subject.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? subject
        return URL(string: "mailto:\(AppConfig.supportEmail)?subject=\(encoded)")
    }


}

#Preview {
    SettingsView()
}
