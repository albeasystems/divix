import Foundation

/// A base→target currency pair. Used by favorites and the multi-currency list.
struct CurrencyPair: Codable, Hashable, Identifiable {
    let baseCode: String
    let targetCode: String

    var id: String { "\(baseCode)-\(targetCode)" }
}
