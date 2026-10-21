import Foundation
import SwiftUI

/// Shared router state. Held at the root scene and injected into the
/// `TabView`. Lets one screen (e.g. Favorites) request a deep-link into
/// another (the main converter pre-loaded with a pair).
@MainActor
@Observable
final class AppState {

    static let shared = AppState()

    enum Tab: Hashable { case convert, multi, chart, favorites }

    var selectedTab: Tab = .convert

    /// When non-nil, the main converter should adopt this pair and clear the
    /// field on read.
    var pendingPair: CurrencyPair?

    nonisolated private init() {}

    func openInConverter(_ pair: CurrencyPair) {
        pendingPair = pair
        selectedTab = .convert
    }
}
