import SwiftUI

extension View {
    /// Apply `transform` only when `condition` is true.
    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool,
                             transform: (Self) -> Content) -> some View {
        if condition { transform(self) } else { self }
    }

    /// Cross-platform `.navigationBarTitleDisplayMode(.inline)`.
    /// No-op on macOS where the modifier is unavailable.
    func navigationBarTitleDisplayModeInline() -> some View {
        #if os(iOS)
        self.navigationBarTitleDisplayMode(.inline)
        #else
        self
        #endif
    }

    /// Cross-platform `.keyboardType(.decimalPad)`.
    /// No-op on macOS where the modifier is unavailable.
    func decimalPadKeyboard() -> some View {
        #if os(iOS)
        self.keyboardType(.decimalPad)
        #else
        self
        #endif
    }
}
