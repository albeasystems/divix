import SwiftUI

struct CalculatorKeypad: View {

    let onTap: (CalculatorKey) -> Void

    private let rows: [[KeyDescriptor]] = [
        [.clear,      .backspace,    .op("÷"), .op("×")],
        [.digit(7),   .digit(8),     .digit(9), .op("−")],
        [.digit(4),   .digit(5),     .digit(6), .op("+")],
        [.digit(1),   .digit(2),     .digit(3), .equals],
        [.digit(0, wide: true),      .decimal,  .equalsContinued]
    ]

    var body: some View {
        VStack(spacing: 8) {
            ForEach(rows.indices, id: \.self) { rowIndex in
                HStack(spacing: 8) {
                    ForEach(rows[rowIndex].indices, id: \.self) { colIndex in
                        keyView(rows[rowIndex][colIndex])
                    }
                }
            }
        }
        .padding(8)
    }

    @ViewBuilder
    private func keyView(_ descriptor: KeyDescriptor) -> some View {
        switch descriptor {
        case .digit(let value, let wide):
            button(label: String(value),
                   style: .number,
                   wide: wide) { onTap(.digit(value)) }
        case .decimal:
            button(label: Locale.current.decimalSeparator ?? ".",
                   style: .number) { onTap(.decimal) }
        case .op(let symbol):
            button(label: symbol, style: .operator) { onTap(.op(symbol)) }
        case .equals:
            button(label: "=", style: .equals) { onTap(.equals) }
        case .equalsContinued:
            // Empty cell to keep grid aligned when the "0" key spans 2 columns.
            Color.clear.frame(maxWidth: .infinity, maxHeight: 0)
        case .clear:
            button(label: "C", style: .destructive) { onTap(.clear) }
        case .backspace:
            button(label: "⌫", style: .destructive,
                   accessibilityKey: LocalizedStringKey("calc_a11y_backspace")) { onTap(.backspace) }
        }
    }

    private func button(label: String,
                        style: KeyStyle,
                        wide: Bool = false,
                        accessibilityKey: LocalizedStringKey? = nil,
                        action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(label)
                .font(.title2.weight(.medium))
                .frame(maxWidth: .infinity, minHeight: 66)
                .background(style.background)
                .foregroundStyle(style.foreground)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .if(wide) { $0.frame(maxWidth: .infinity) }
        }
        .buttonStyle(.plain)
        .if(accessibilityKey != nil) {
            $0.accessibilityLabel(Text(accessibilityKey!))
        }
    }

    private enum KeyDescriptor {
        case digit(Int, wide: Bool = false)
        case decimal
        case op(String)
        case equals
        case equalsContinued
        case clear
        case backspace
    }

    private enum KeyStyle {
        case number
        case `operator`
        case equals
        case destructive

        var background: Color {
            switch self {
            case .number:
                #if os(iOS)
                return Color.secondarySystemBackground
                #else
                return Color.gray.opacity(0.12)
                #endif
            case .operator:    return Color.accentColor.opacity(0.15)
            case .equals:      return Color.accentColor
            case .destructive: return Color.red.opacity(0.15)
            }
        }
        var foreground: Color {
            switch self {
            case .equals:      return .white
            case .destructive: return .red
            default:           return .primary
            }
        }
    }
}

/// Simple numeric keypad (no operators) for plain amount entry. Guarantees a
/// keypad on every device **and** the Simulator, regardless of the system
/// keyboard setting (the long-standing "no keyboard on tap" issue).
struct NumericKeypad: View {
    @Binding var text: String
    var onDone: () -> Void = {}

    private let rows: [[String]] = [
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        [".", "0", "⌫"]
    ]

    var body: some View {
        VStack(spacing: 12) {
            Text(text.isEmpty ? "0" : text)
                .font(.system(size: 40, weight: .semibold, design: .rounded))
                .monospacedDigit()
                .lineLimit(1)
                .minimumScaleFactor(0.4)
                .frame(maxWidth: .infinity, alignment: .trailing)
                .padding(.horizontal, 8)

            ForEach(rows.indices, id: \.self) { r in
                HStack(spacing: 10) {
                    ForEach(rows[r], id: \.self) { key in
                        Button { tap(key) } label: {
                            Group {
                                if key == "⌫" {
                                    Image(systemName: "delete.left")
                                } else {
                                    Text(key)
                                }
                            }
                            .font(.title2.weight(.medium))
                            .frame(maxWidth: .infinity, minHeight: 56)
                            .background(Color.secondarySystemBackground)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        }
                        .buttonStyle(.plain)
                    }
                }
            }

            Button(action: onDone) {
                Text("common_done")
                    .font(.headline)
                    .frame(maxWidth: .infinity, minHeight: 48)
                    .background(Color.accentColor)
                    .foregroundStyle(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            }
        }
        .padding()
    }

    private func tap(_ key: String) {
        switch key {
        case "⌫":
            if !text.isEmpty { text.removeLast() }
        case ".":
            if text.isEmpty { text = "0." }
            else if !text.contains(".") { text += "." }
        default:
            if text == "0" { text = key } else { text += key }
        }
        #if canImport(UIKit)
        HapticService.impact(.light)
        #endif
    }
}

#Preview {
    CalculatorKeypad { _ in }
        .padding()
}
