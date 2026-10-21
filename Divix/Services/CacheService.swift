import Foundation
import CoreData

/// Persists the last successful exchange-rate snapshot and the conversion
/// history. The Core Data model is built programmatically so no
/// `.xcdatamodeld` bundle has to be added to the Xcode project.
final class CacheService {

    static let shared = CacheService()

    private let container: NSPersistentContainer

    private init() {
        let model = Self.makeModel()
        container = NSPersistentContainer(name: "Divix", managedObjectModel: model)
        container.loadPersistentStores { _, error in
            if let error {
                assertionFailure("Core Data store load failed: \(error)")
            }
        }
        container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
        container.viewContext.automaticallyMergesChangesFromParent = true
    }

    @MainActor private var context: NSManagedObjectContext { container.viewContext }

    // MARK: - Snapshot cache

    @MainActor func loadSnapshot(baseCode: String) -> ExchangeRateSnapshot? {
        let request = NSFetchRequest<NSManagedObject>(entityName: Entity.snapshot)
        request.predicate = NSPredicate(format: "baseCode == %@", baseCode)
        request.fetchLimit = 1

        guard let object = try? context.fetch(request).first,
              let data = object.value(forKey: "ratesData") as? Data,
              let fetchedAt = object.value(forKey: "fetchedAt") as? Date,
              let rates = try? JSONDecoder().decode([String: Double].self, from: data)
        else { return nil }

        return ExchangeRateSnapshot(baseCode: baseCode, rates: rates, fetchedAt: fetchedAt)
    }

    @MainActor func saveSnapshot(_ snapshot: ExchangeRateSnapshot) {
        let request = NSFetchRequest<NSManagedObject>(entityName: Entity.snapshot)
        request.predicate = NSPredicate(format: "baseCode == %@", snapshot.baseCode)
        request.fetchLimit = 1

        let object: NSManagedObject
        if let existing = try? context.fetch(request).first {
            object = existing
        } else {
            let entity = NSEntityDescription.entity(forEntityName: Entity.snapshot, in: context)!
            object = NSManagedObject(entity: entity, insertInto: context)
        }
        object.setValue(snapshot.baseCode, forKey: "baseCode")
        object.setValue(snapshot.fetchedAt, forKey: "fetchedAt")
        if let data = try? JSONEncoder().encode(snapshot.rates) {
            object.setValue(data, forKey: "ratesData")
        }
        save()
    }

    // MARK: - Conversion history

    @MainActor func appendHistory(_ record: ConversionRecord) {
        let entity = NSEntityDescription.entity(forEntityName: Entity.history, in: context)!
        let object = NSManagedObject(entity: entity, insertInto: context)
        object.setValue(record.id, forKey: "id")
        object.setValue(record.timestamp, forKey: "timestamp")
        object.setValue(record.baseCode, forKey: "baseCode")
        object.setValue(record.targetCode, forKey: "targetCode")
        object.setValue(record.amount, forKey: "amount")
        object.setValue(record.result, forKey: "result")
        object.setValue(record.rate, forKey: "rate")
        save()
    }

    @MainActor func fetchHistory(limit: Int = 50) -> [ConversionRecord] {
        let request = NSFetchRequest<NSManagedObject>(entityName: Entity.history)
        request.sortDescriptors = [NSSortDescriptor(key: "timestamp", ascending: false)]
        request.fetchLimit = limit
        guard let objects = try? context.fetch(request) else { return [] }
        return objects.compactMap { obj in
            guard let id = obj.value(forKey: "id") as? UUID,
                  let timestamp = obj.value(forKey: "timestamp") as? Date,
                  let baseCode = obj.value(forKey: "baseCode") as? String,
                  let targetCode = obj.value(forKey: "targetCode") as? String,
                  let amount = obj.value(forKey: "amount") as? Double,
                  let result = obj.value(forKey: "result") as? Double,
                  let rate = obj.value(forKey: "rate") as? Double
            else { return nil }
            return ConversionRecord(id: id,
                                    timestamp: timestamp,
                                    baseCode: baseCode,
                                    targetCode: targetCode,
                                    amount: amount,
                                    result: result,
                                    rate: rate)
        }
    }

    // MARK: - Internals

    @MainActor private func save() {
        guard context.hasChanges else { return }
        do { try context.save() } catch {
            assertionFailure("Core Data save failed: \(error)")
        }
    }

    private enum Entity {
        static let snapshot = "ExchangeRateCacheEntity"
        static let history  = "ConversionRecordEntity"
    }

    private static func makeModel() -> NSManagedObjectModel {
        let model = NSManagedObjectModel()

        // ExchangeRateCacheEntity
        let cacheEntity = NSEntityDescription()
        cacheEntity.name = Entity.snapshot
        cacheEntity.managedObjectClassName = NSStringFromClass(NSManagedObject.self)

        let baseCodeAttr      = attribute("baseCode", type: .stringAttributeType, optional: false)
        let ratesDataAttr     = attribute("ratesData", type: .binaryDataAttributeType, optional: false)
        let fetchedAtAttr     = attribute("fetchedAt", type: .dateAttributeType, optional: false)
        cacheEntity.properties = [baseCodeAttr, ratesDataAttr, fetchedAtAttr]

        // ConversionRecordEntity
        let historyEntity = NSEntityDescription()
        historyEntity.name = Entity.history
        historyEntity.managedObjectClassName = NSStringFromClass(NSManagedObject.self)

        historyEntity.properties = [
            attribute("id",         type: .UUIDAttributeType,    optional: false),
            attribute("timestamp",  type: .dateAttributeType,    optional: false),
            attribute("baseCode",   type: .stringAttributeType,  optional: false),
            attribute("targetCode", type: .stringAttributeType,  optional: false),
            attribute("amount",     type: .doubleAttributeType,  optional: false),
            attribute("result",     type: .doubleAttributeType,  optional: false),
            attribute("rate",       type: .doubleAttributeType,  optional: false)
        ]

        model.entities = [cacheEntity, historyEntity]
        return model
    }

    private static func attribute(_ name: String,
                                  type: NSAttributeType,
                                  optional: Bool) -> NSAttributeDescription {
        let attr = NSAttributeDescription()
        attr.name = name
        attr.attributeType = type
        attr.isOptional = optional
        return attr
    }
}
