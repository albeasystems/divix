import SwiftUI

extension Color {
    /// Brand accent — kept overridable from Assets.xcassets if a custom
    /// colour is later added; defaults to the system tint.
    static let brandAccent  = Color.accentColor

    /// Status colours used by `RateStatusBadge`.
    static let statusLive    = Color.green
    static let statusCached  = Color.orange
    static let statusOffline = Color.red

    // MARK: - Cross-platform system colours
    // These wrap UIColor on iOS and fall back to neutral SwiftUI colours on macOS.

    /// Equivalent of UIColor.systemBackground — the primary content background.
    static var systemBackground: Color {
        #if os(iOS)
        Color(uiColor: .systemBackground)
        #else
        Color(nsColor: .windowBackgroundColor)
        #endif
    }

    /// Equivalent of UIColor.secondarySystemBackground — used for elevated cells/keys.
    static var secondarySystemBackground: Color {
        #if os(iOS)
        Color(uiColor: .secondarySystemBackground)
        #else
        Color.gray.opacity(0.12)
        #endif
    }
}
