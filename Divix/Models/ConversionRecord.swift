import Foundation

/// One historical conversion the user has performed. Persisted via Core Data
/// (entity `ConversionRecordEntity`).
struct ConversionRecord: Identifiable, Hashable, Codable {
    let id: UUID
    let timestamp: Date
    let baseCode: String
    let targetCode: String
    let amount: Double
    let result: Double
    let rate: Double

    init(id: UUID = UUID(),
         timestamp: Date = Date(),
         baseCode: String,
         targetCode: String,
         amount: Double,
         result: Double,
         rate: Double) {
        self.id = id
        self.timestamp = timestamp
        self.baseCode = baseCode
        self.targetCode = targetCode
        self.amount = amount
        self.result = result
        self.rate = rate
    }
}
