import Foundation
import SwiftUI

/// Curated quick-view list of favourite **currencies** (fiat + crypto). Stored as
/// an ordered list of codes; seeded with `AppConfig.defaultFavoriteCodes`.
@MainActor
@Observable
final class FavoritesViewModel {

    /// Shared instance so every screen (Convert, Markets) sees the same live
    /// favourites — favouriting on one updates the others immediately.
    static let shared = FavoritesViewModel()

    private(set) var codes: [String] = []

    init() {
        load()
    }

    // MARK: - Persistence

    private func load() {
        if let data = UserDefaults.standard.data(forKey: AppConfig.StorageKeys.favoriteCodesData),
           let decoded = try? JSONDecoder().decode([String].self, from: data) {
            codes = decoded
        } else {
            codes = AppConfig.defaultFavoriteCodes
        }
    }

    private func persist() {
        if let data = try? JSONEncoder().encode(codes) {
            UserDefaults.standard.set(data, forKey: AppConfig.StorageKeys.favoriteCodesData)
        }
    }

    // MARK: - Mutations

    func contains(_ code: String) -> Bool { codes.contains(code) }

    /// Toggle a currency in/out of favourites. Returns the new membership state.
    @discardableResult
    func toggle(_ code: String) -> Bool {
        if let idx = codes.firstIndex(of: code) {
            codes.remove(at: idx)
            persist()
            return false
        }
        codes.append(code)
        persist()
        return true
    }

    func add(_ code: String) {
        guard !code.isEmpty, !codes.contains(code) else { return }
        codes.append(code)
        persist()
    }

    func remove(at offsets: IndexSet) {
        codes.remove(atOffsets: offsets)
        persist()
    }

    func move(from source: IndexSet, to destination: Int) {
        codes.move(fromOffsets: source, toOffset: destination)
        persist()
    }
}
