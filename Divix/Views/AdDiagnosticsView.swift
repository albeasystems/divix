import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

// MARK: - AdDiagnosticsView
//
// Panel de diagnóstico de la mediación (solo DEBUG). Pensado para usarse en un
// iPhone REAL, que es el único sitio donde pujan todas las redes: los
// simuladores no reciben demanda de varias de ellas.
//
// Muestra qué red ha ganado cada puja, por formato, con su eCPM observado.

struct AdDiagnosticsView: View {

    @ObservedObject private var diag = AdDiagnostics.shared
    @Environment(\.dismiss) private var dismiss
    @State private var showingCopied = false

    var body: some View {
        NavigationStack {
            List {
                summarySection
                networksSection
                failuresSection
                eventsSection
                caveatSection
            }
            .navigationTitle(Text(verbatim: "Ad diagnostics"))
            .navigationBarTitleDisplayModeInline()
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("common_close") { dismiss() }
                }
                ToolbarItem(placement: .primaryAction) {
                    Menu {
                        Button {
                            UIPasteboard.general.string = diag.summaryText
                            showingCopied = true
                        } label: {
                            Label { Text(verbatim: "Copy report") } icon: { Image(systemName: "doc.on.doc") }
                        }
                        Button(role: .destructive) {
                            diag.reset()
                        } label: {
                            Label { Text(verbatim: "Reset") } icon: { Image(systemName: "trash") }
                        }
                        #if DEBUG
                        Button {
                            AdsManager.shared.launchTestSuite()
                        } label: {
                            Label { Text(verbatim: "LevelPlay Test Suite") } icon: { Image(systemName: "checklist") }
                        }
                        // El cooldown de la valoración se persiste en UserDefaults
                        // del contenedor de la app, que no se puede falsear desde
                        // fuera: sin este botón, el flujo "primer cálculo → hoja de
                        // valoración" solo se puede probar una vez por instalación.
                        Button(role: .destructive) {
                            ReviewService.shared.debugReset()
                        } label: {
                            Label { Text(verbatim: "Reset review state") } icon: { Image(systemName: "star.slash") }
                        }
                        #endif
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                }
            }
            .alert(Text(verbatim: "Report copied"), isPresented: $showingCopied) {
                Button("common_ok", role: .cancel) {}
            }
        }
    }

    // MARK: - Secciones

    private var summarySection: some View {
        Section {
            row("Impressions", "\(diag.totalImpressions)")
            row("Revenue", String(format: "%.6f", diag.totalRevenue))
            row("Networks winning", "\(diag.byNetwork.count)")
            row("Session started", diag.startedAt.formatted(date: .omitted, time: .standard))
        } header: {
            Text(verbatim: "Session")
        }
    }

    private var networksSection: some View {
        Section {
            if diag.rankedNetworks.isEmpty {
                Text(verbatim: "No network has won an auction yet.")
                    .foregroundStyle(.secondary)
            } else {
                ForEach(diag.rankedNetworks, id: \.name) { entry in
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(verbatim: entry.name)
                                .font(.body.weight(.semibold))
                            Spacer()
                            Text(verbatim: entry.stats.averageECPM.map { String(format: "eCPM %.2f", $0) } ?? "—")
                                .font(.caption.monospacedDigit())
                                .foregroundStyle(.secondary)
                        }
                        Text(verbatim: "\(entry.stats.loads) loads · \(entry.stats.impressions) impressions")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                        // Qué formatos ha ganado esta red: es lo que confirma que
                        // sus instancias están bien dadas de alta en el dashboard.
                        Text(verbatim: entry.stats.formats.sorted().joined(separator: " · "))
                            .font(.caption2)
                            .foregroundStyle(.tint)
                    }
                    .padding(.vertical, 2)
                }
            }
        } header: {
            Text(verbatim: "Networks that won at least one auction")
        }
    }

    @ViewBuilder
    private var failuresSection: some View {
        if !diag.failuresByFormat.isEmpty {
            Section {
                ForEach(diag.failuresByFormat.sorted(by: { $0.key < $1.key }), id: \.key) { fmt, count in
                    row(fmt, "\(count)")
                }
            } header: {
                Text(verbatim: "Load failures by format")
            } footer: {
                Text(verbatim: "\"No fill\" is normal — it means no network bid high enough for this request.")
            }
        }
    }

    private var eventsSection: some View {
        Section {
            if diag.events.isEmpty {
                Text(verbatim: "No events yet.")
                    .foregroundStyle(.secondary)
            } else {
                ForEach(diag.events.prefix(60)) { event in
                    HStack(alignment: .firstTextBaseline, spacing: 8) {
                        Image(systemName: icon(for: event.kind))
                            .foregroundStyle(color(for: event.kind))
                            .font(.caption)
                            .frame(width: 16)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(verbatim: "\(event.format) — \(event.network ?? event.detail ?? "—")")
                                .font(.caption)
                            if let instance = event.instance {
                                Text(verbatim: instance)
                                    .font(.caption2)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        Spacer()
                        Text(event.at, style: .time)
                            .font(.caption2.monospacedDigit())
                            .foregroundStyle(.secondary)
                    }
                }
            }
        } header: {
            Text(verbatim: "Recent events")
        }
    }

    private var caveatSection: some View {
        Section {
            Text(verbatim: """
                The SDK only reports the WINNER of each auction. There is no API that \
                exposes which networks bid and lost, or which never bid at all.

                If a network never appears above, it could be that it has no instance \
                configured, that it bids and always loses, or that it does not serve \
                this device — only the LevelPlay dashboard (Mediation) tells those apart.

                Several networks do not serve ads to the Simulator at all. Use a real \
                device to see them compete.
                """)
            .font(.caption)
            .foregroundStyle(.secondary)
        } header: {
            Text(verbatim: "What this cannot tell you")
        }
    }

    // MARK: - Helpers

    private func row(_ label: String, _ value: String) -> some View {
        HStack {
            Text(verbatim: label)
            Spacer()
            Text(verbatim: value)
                .foregroundStyle(.secondary)
                .monospacedDigit()
        }
    }

    private func icon(for kind: AdDiagnostics.Event.Kind) -> String {
        switch kind {
        case .loaded:     return "arrow.down.circle.fill"
        case .impression: return "eye.fill"
        case .failed:     return "xmark.circle.fill"
        case .shown:      return "play.circle.fill"
        }
    }

    private func color(for kind: AdDiagnostics.Event.Kind) -> Color {
        switch kind {
        case .loaded:     return .blue
        case .impression: return .green
        case .failed:     return .orange
        case .shown:      return .purple
        }
    }
}
