import Foundation
import SwiftUI

@MainActor
@Observable
final class ConversionViewModel {

    // MARK: - User inputs

    /// Calculator expression as the user types. Display formatting uses `×` and
    /// `÷`; evaluation normalises to `*` and `/`.
    var expression: String = "0"

    var baseCode: String {
        didSet {
            UserDefaults.standard.set(baseCode, forKey: AppConfig.StorageKeys.baseCurrencyCode)
            // No refetch: the unified snapshot already holds every code and
            // `convertedAmount` recomputes via triangulation. Avoids hitting the
            // (rate-limited) CoinGecko endpoint on each currency change.
        }
    }
    var targetCode: String {
        didSet {
            UserDefaults.standard.set(targetCode, forKey: AppConfig.StorageKeys.targetCurrencyCode)
        }
    }

    // MARK: - Output state

    private(set) var result: ExchangeRateResult?
    private(set) var isLoading: Bool = false

    /// Expression formatted for display: thousands separators and locale-aware
    /// decimal separator, e.g. "1.000.000,5+2.000" in Spanish locale.
    var displayExpression: String {
        var result = ""
        var numBuffer = ""
        for char in expression {
            if "+−×÷".contains(char) {
                result += Self.formatNumBuffer(numBuffer) + String(char)
                numBuffer = ""
            } else {
                numBuffer.append(char)
            }
        }
        result += Self.formatNumBuffer(numBuffer)
        return result
    }

    private static func formatNumBuffer(_ s: String) -> String {
        guard !s.isEmpty, s != "Error" else { return s }
        let isNeg = s.hasPrefix("-")
        let raw = isNeg ? String(s.dropFirst()) : s
        let parts = raw.split(separator: ".", maxSplits: 1, omittingEmptySubsequences: false)
        let intStr = String(parts[0])

        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.maximumFractionDigits = 0
        f.minimumFractionDigits = 0

        var formatted: String
        if !intStr.isEmpty, let intVal = Double(intStr) {
            formatted = f.string(from: NSNumber(value: intVal)) ?? intStr
        } else {
            formatted = intStr
        }

        if raw.contains(".") {
            let decSep = Locale.current.decimalSeparator ?? "."
            formatted += decSep + (parts.count > 1 ? String(parts[1]) : "")
        }
        return (isNeg ? "-" : "") + formatted
    }

    /// Numeric value of the current expression (last valid evaluation).
    var amount: Double {
        Self.evaluate(expression) ?? 0
    }

    /// Converted amount in `targetCode`, nil if no rate snapshot is available.
    var convertedAmount: Double? {
        guard let snapshot = result?.snapshot else { return nil }
        return snapshot.convert(amount: amount, from: baseCode, to: targetCode)
    }

    /// Pair rate (1 base → X target), for display and history records.
    var pairRate: Double? {
        result?.snapshot.convert(amount: 1, from: baseCode, to: targetCode)
    }

    // MARK: - Dependencies

    private let rateService: ExchangeRateService
    private let cache: CacheService

    // MARK: - Registro de conversiones (valoración / intersticial)
    //
    // POR QUÉ NO BASTA CON LA TECLA `=`.
    //
    // Aquí la conversión es EN VIVO: el resultado se recalcula con cada dígito, así
    // que el usuario normal teclea su importe, lee el resultado y se va sin tocar
    // `=` jamás. Como `=` era el único sitio que registraba una conversión, el
    // contador no se movía nunca y ni la valoración ni el intersticial llegaban a
    // dispararse. De ahí que también cuente el tecleo.
    //
    // Pero NO cada dígito: con un debounce, de forma que "122" cuente como UNA
    // conversión y, sobre todo, para que la cuenta atrás de la valoración arranque
    // cuando el usuario ha TERMINADO de teclear y no en el primer dígito (si no, la
    // hoja le caería encima a mitad del importe).

    /// Espera sin pulsaciones tras la que se considera terminado el cálculo. Corta
    /// a propósito: se suma al retardo de `AdConfig.reviewFirstActionDelay`.
    private static let conversionSettleDelay: Duration = .milliseconds(700)

    /// Cuánto se espera a que llegue la tasa antes de dar el cálculo por perdido.
    private static let rateWaitTimeout: TimeInterval = 15

    private var conversionRegistrationTask: Task<Void, Never>?

    init(rateService: ExchangeRateService = .shared,
         cache: CacheService = .shared) {
        self.rateService = rateService
        self.cache = cache
        let defaults = UserDefaults.standard
        self.baseCode   = defaults.string(forKey: AppConfig.StorageKeys.baseCurrencyCode)
            ?? AppConfig.defaultBaseCurrencyCode
        self.targetCode = defaults.string(forKey: AppConfig.StorageKeys.targetCurrencyCode)
            ?? AppConfig.defaultTargetCurrencyCode
    }

    // MARK: - Network

    func refresh() async {
        isLoading = true
        defer { isLoading = false }
        result = await rateService.fetchUnifiedSnapshot()
    }

    // MARK: - Currency actions

    func swap() {
        let oldBase = baseCode
        baseCode = targetCode
        targetCode = oldBase
    }

    func saveCurrentToHistory() {
        guard let rate = pairRate, let value = convertedAmount else { return }
        let record = ConversionRecord(baseCode: baseCode,
                                      targetCode: targetCode,
                                      amount: amount,
                                      result: value,
                                      rate: rate)
        cache.appendHistory(record)
    }

    // MARK: - Calculator

    func calculatorTap(_ key: CalculatorKey) {
        switch key {
        case .digit(let d):
            if expression == "0" { expression = String(d) }
            else if expression == "Error" { expression = String(d) }
            else { expression += String(d) }
            scheduleConversionRegistration()
        case .decimal:
            if !currentNumberContainsDecimal() {
                if endsWithOperator() || expression == "Error" {
                    expression += "0."
                } else {
                    expression += "."
                }
            }
        case .op(let symbol):
            if expression == "Error" { return }
            if endsWithOperator() {
                expression.removeLast()
                expression += symbol
            } else {
                expression += symbol
            }
        case .equals:
            if let value = Self.evaluate(expression) {
                expression = Self.formatForExpression(value)
                // A conversion just completed — the natural transition point.
                // AdsManager decides whether this one earns an interstitial.
                registerConversionNow()
            } else {
                expression = "Error"
                cancelPendingConversionRegistration()
            }
        case .clear:
            expression = "0"
            cancelPendingConversionRegistration()
        case .backspace:
            if expression == "Error" { expression = "0"; return }
            expression.removeLast()
            if expression.isEmpty { expression = "0" }
            scheduleConversionRegistration()
        }
    }

    // MARK: - Registro de conversiones

    /// Reinicia el debounce: la conversión se apunta cuando el usuario deja de
    /// teclear, no en cada pulsación.
    private func scheduleConversionRegistration() {
        guard hasEnteredAmount else {
            cancelPendingConversionRegistration()
            return
        }
        conversionRegistrationTask?.cancel()
        conversionRegistrationTask = Task { @MainActor [weak self] in
            try? await Task.sleep(for: Self.conversionSettleDelay)
            guard !Task.isCancelled, let self, self.hasEnteredAmount else { return }
            await self.awaitRateAndRegister()
        }
    }

    /// `=` cierra el cálculo de forma explícita: no hay nada que esperar al tecleo.
    /// La tasa sí puede faltar, así que pasa por la misma espera.
    private func registerConversionNow() {
        cancelPendingConversionRegistration()
        guard hasEnteredAmount else { return }
        conversionRegistrationTask = Task { @MainActor [weak self] in
            guard let self else { return }
            await self.awaitRateAndRegister()
        }
    }

    /// Espera a que haya tasa antes de apuntar la conversión.
    ///
    /// POR QUÉ ESTA ESPERA. El importe lo pone el usuario; la tasa la ponemos
    /// nosotros, y en un arranque en frío el snapshot llega DESPUÉS de que haya
    /// tecleado. La versión anterior comprobaba `convertedAmount != nil` justo al
    /// vencer el debounce y, si aún no estaba, descartaba la conversión para
    /// siempre: sin más pulsaciones no había nada que reevaluar, así que la
    /// primera sesión se quedaba sin valoración y sin intersticial. Que nuestra
    /// red vaya lenta no puede costarle al usuario su cálculo.
    private func awaitRateAndRegister() async {
        let deadline = Date().addingTimeInterval(Self.rateWaitTimeout)
        while convertedAmount == nil, Date() < deadline {
            try? await Task.sleep(for: .milliseconds(250))
            guard !Task.isCancelled, hasEnteredAmount else { return }
        }
        guard !Task.isCancelled, convertedAmount != nil else { return }
        conversionRegistrationTask = nil
        AdsManager.shared.registerSuccessfulConversion()
    }

    private func cancelPendingConversionRegistration() {
        conversionRegistrationTask?.cancel()
        conversionRegistrationTask = nil
    }

    /// El usuario ha puesto un importe de verdad: la expresión evalúa a algo
    /// distinto de cero. No mira la tasa — de eso se encarga `awaitRateAndRegister`.
    private var hasEnteredAmount: Bool {
        expression != "Error" && amount != 0
    }

    // MARK: - Calculator helpers

    private func endsWithOperator() -> Bool {
        guard let last = expression.last else { return false }
        return "+−×÷".contains(last)
    }

    private func currentNumberContainsDecimal() -> Bool {
        for ch in expression.reversed() {
            if "+−×÷".contains(ch) { return false }
            if ch == "." { return true }
        }
        return expression.contains(".")
    }

    /// Safely evaluate the calculator expression. A hand-written tokenizer +
    /// two-pass (×÷ then +−) evaluator — deliberately NOT `NSExpression(format:)`,
    /// which is a predicate parser that throws an uncatchable Obj-C exception on
    /// inputs like `"36."`. Returns nil for invalid input or division by zero.
    static func evaluate(_ expression: String) -> Double? {
        if expression == "Error" { return nil }
        let normalised = expression
            .replacingOccurrences(of: "×", with: "*")
            .replacingOccurrences(of: "÷", with: "/")
            .replacingOccurrences(of: "−", with: "-")
        guard let tokens = tokenize(normalised), !tokens.isEmpty,
              case .number = tokens[0] else { return nil }

        // Pass 1: × and ÷
        var pass: [Token] = [tokens[0]]
        var i = 1
        while i + 1 < tokens.count {
            guard case .op(let o) = tokens[i], case .number(let n) = tokens[i + 1] else { return nil }
            if o == "*" || o == "/" {
                guard case .number(let prev) = pass.removeLast() else { return nil }
                if o == "/" && n == 0 { return nil }
                pass.append(.number(o == "*" ? prev * n : prev / n))
            } else {
                pass.append(.op(o)); pass.append(.number(n))
            }
            i += 2
        }

        // Pass 2: + and −
        guard case .number(var acc) = pass[0] else { return nil }
        var j = 1
        while j + 1 < pass.count {
            guard case .op(let o) = pass[j], case .number(let n) = pass[j + 1] else { return nil }
            acc = (o == "+") ? acc + n : acc - n
            j += 2
        }
        return acc.isFinite ? acc : nil
    }

    private enum Token { case number(Double); case op(Character) }

    /// Tokenize a normalised expression. Tolerates a trailing operator or a
    /// trailing/lone decimal point (drops them), and a leading unary minus.
    private static func tokenize(_ s: String) -> [Token]? {
        var tokens: [Token] = []
        var num = ""
        func flush() -> Bool {
            if num.isEmpty { return true }
            var t = num
            if t.hasSuffix(".") { t.removeLast() }
            if t.isEmpty || t == "-" { return false }
            guard let d = Double(t) else { return false }
            tokens.append(.number(d)); num = ""
            return true
        }
        for ch in s {
            if ch.isNumber || ch == "." {
                num.append(ch)
            } else if "+-*/".contains(ch) {
                if num.isEmpty {
                    if ch == "-" && tokens.isEmpty { num = "-"; continue }  // leading unary minus
                    return nil
                }
                if !flush() { return nil }
                tokens.append(.op(ch))
            } else {
                return nil   // unexpected character
            }
        }
        if !flush() { return nil }
        if case .op = tokens.last { tokens.removeLast() }   // drop a dangling operator
        return tokens
    }

    /// Format a double back into an expression-friendly string (no thousands
    /// separators, decimal point).
    private static func formatForExpression(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.usesGroupingSeparator = false
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.maximumFractionDigits = 8
        formatter.minimumFractionDigits = 0
        return formatter.string(from: NSNumber(value: value)) ?? "0"
    }
}

// MARK: - Calculator key model

enum CalculatorKey: Equatable {
    case digit(Int)
    case decimal
    case op(String)      // "+", "−", "×", "÷"
    case equals
    case clear
    case backspace
}
