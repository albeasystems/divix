import Foundation
import Combine
import os

// MARK: - AdDiagnostics
//
// Registro de qué red gana cada puja, por formato. Alimenta el panel de
// diagnóstico (Ajustes → Diagnóstico de anuncios, solo en DEBUG) y la consola.
//
// AGNÓSTICO DE RED: los nombres de red ("ironsourceads", "admob", "unityads",
// "facebook"…) llegan como STRINGS desde el SDK en tiempo de ejecución. Aquí no
// se referencia ni se lista ninguna red concreta, así que añadir o quitar redes
// en el Podfile no obliga a tocar este fichero: las nuevas aparecen solas.
//
// LÍMITE IMPORTANTE, no es un fallo de este código:
// el SDK solo expone el GANADOR de cada subasta. NO hay forma de saber desde la
// app qué redes pujaron y perdieron, ni cuáles no llegaron a pujar. Si una red
// no aparece nunca aquí, puede ser porque (a) no tiene instancia configurada,
// (b) puja y pierde siempre, o (c) no rellena en este dispositivo — y solo el
// dashboard de LevelPlay (Mediation → tabla de redes con eCPM/Imps/SOW)
// distingue entre los tres casos.

@MainActor
final class AdDiagnostics: ObservableObject {

    static let shared = AdDiagnostics()

    /// Tope de eventos guardados en memoria (los más antiguos se descartan).
    private static let maxEvents = 300

    // MARK: - Tipos

    struct Event: Identifiable {
        enum Kind {
            case loaded       // el SDK entregó un anuncio (hay ganador)
            case impression   // el anuncio se mostró de verdad
            case failed       // no fill / error de carga
            case shown        // se pidió presentar
        }
        let id = UUID()
        let at: Date
        let kind: Kind
        let format: String
        let network: String?
        let instance: String?
        let revenue: Double?
        let precision: String?
        let country: String?
        let detail: String?
    }

    /// Agregado por red. `formats` acumula en qué formatos ha ganado esa red,
    /// que es justo lo que hay que comprobar tras configurar las instancias.
    struct NetworkStats {
        var loads = 0
        var impressions = 0
        var revenue: Double = 0
        var formats: Set<String> = []
        var lastSeen: Date?

        /// eCPM medio observado (ingreso medio por impresión × 1000).
        var averageECPM: Double? {
            guard impressions > 0 else { return nil }
            return revenue / Double(impressions) * 1000
        }
    }

    // MARK: - Estado publicado

    /// Eventos, del más reciente al más antiguo.
    @Published private(set) var events: [Event] = []
    /// Estadísticas acumuladas por nombre de red.
    @Published private(set) var byNetwork: [String: NetworkStats] = [:]
    /// Fallos de carga por formato (típicamente "Mediation No fill").
    @Published private(set) var failuresByFormat: [String: Int] = [:]
    /// Instante en que arrancó la sesión de diagnóstico.
    @Published private(set) var startedAt = Date()

    private init() {}

    // MARK: - Registro (llamado desde AdsManager)

    /// Carga exitosa: `AuctionInfo` ya identifica la red ganadora de la puja,
    /// antes incluso de que el anuncio llegue a mostrarse. Esto capta ganadores
    /// que nunca llegan a convertirse en impresión.
    func record(load info: AuctionInfo) {
        append(Event(at: Date(), kind: .loaded, format: info.format, network: info.network,
                     instance: info.instance, revenue: info.revenue, precision: info.precision,
                     country: info.country, detail: nil))
        guard let network = info.network else { return }
        var stats = byNetwork[network] ?? NetworkStats()
        stats.loads += 1
        stats.formats.insert(info.format)
        stats.lastSeen = Date()
        byNetwork[network] = stats
        AdsLog.auction.info("auction won (load) — \(info.format, privacy: .public) / \(network, privacy: .public) / \(info.instance ?? "?", privacy: .public)")
    }

    /// Impresión servida. Es la única señal con ingreso confirmado.
    func record(impression info: AuctionInfo, auctionId: String?) {
        append(Event(at: Date(), kind: .impression, format: info.format, network: info.network,
                     instance: info.instance, revenue: info.revenue, precision: info.precision,
                     country: info.country, detail: auctionId))
        guard let network = info.network else { return }
        var stats = byNetwork[network] ?? NetworkStats()
        stats.impressions += 1
        stats.revenue += info.revenue ?? 0
        stats.formats.insert(info.format)
        stats.lastSeen = Date()
        byNetwork[network] = stats
    }

    func recordFailure(format: String, message: String) {
        append(Event(at: Date(), kind: .failed, format: format, network: nil,
                     instance: nil, revenue: nil, precision: nil, country: nil,
                     detail: message))
        failuresByFormat[format, default: 0] += 1
    }

    func recordShow(format: String) {
        append(Event(at: Date(), kind: .shown, format: format, network: nil,
                     instance: nil, revenue: nil, precision: nil, country: nil,
                     detail: nil))
    }

    func reset() {
        events.removeAll()
        byNetwork.removeAll()
        failuresByFormat.removeAll()
        startedAt = Date()
    }

    // MARK: - Resumen

    /// Redes que han ganado al menos una puja, ordenadas por ingreso.
    var rankedNetworks: [(name: String, stats: NetworkStats)] {
        byNetwork
            .map { (name: $0.key, stats: $0.value) }
            .sorted { lhs, rhs in
                if lhs.stats.revenue != rhs.stats.revenue { return lhs.stats.revenue > rhs.stats.revenue }
                return lhs.stats.impressions > rhs.stats.impressions
            }
    }

    var totalRevenue: Double { byNetwork.values.reduce(0) { $0 + $1.revenue } }
    var totalImpressions: Int { byNetwork.values.reduce(0) { $0 + $1.impressions } }

    /// Volcado en texto plano — para pegar en un informe o compartir.
    var summaryText: String {
        var lines: [String] = []
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd HH:mm:ss"
        lines.append("Diagnóstico de anuncios — sesión iniciada \(fmt.string(from: startedAt))")
        lines.append("Impresiones: \(totalImpressions) · Ingreso: \(String(format: "%.6f", totalRevenue))")
        lines.append("")
        lines.append("Redes que han GANADO alguna puja:")
        if rankedNetworks.isEmpty {
            lines.append("  (ninguna todavía)")
        } else {
            for (name, s) in rankedNetworks {
                let ecpm = s.averageECPM.map { String(format: "%.2f", $0) } ?? "—"
                lines.append("  \(name): \(s.loads) cargas, \(s.impressions) impresiones, "
                             + "eCPM medio \(ecpm), formatos [\(s.formats.sorted().joined(separator: ", "))]")
            }
        }
        if !failuresByFormat.isEmpty {
            lines.append("")
            lines.append("Fallos de carga por formato:")
            for (f, n) in failuresByFormat.sorted(by: { $0.key < $1.key }) {
                lines.append("  \(f): \(n)")
            }
        }
        lines.append("")
        lines.append("NOTA: el SDK solo reporta el GANADOR. Una red ausente puede no tener")
        lines.append("instancia configurada, o pujar y perder — eso solo se distingue en el")
        lines.append("dashboard de LevelPlay (Mediation).")
        return lines.joined(separator: "\n")
    }

    /// Imprime el resumen en consola. Se llama al pasar la app a segundo plano.
    func logSummary() {
        AdsLog.auction.info("\(self.summaryText, privacy: .public)")
    }

    // MARK: - Privado

    private func append(_ event: Event) {
        events.insert(event, at: 0)
        if events.count > Self.maxEvents { events.removeLast(events.count - Self.maxEvents) }
    }
}
