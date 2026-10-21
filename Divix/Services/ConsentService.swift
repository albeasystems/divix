import UserMessagingPlatform
import Foundation
import os
#if canImport(UIKit)
import UIKit
#endif

// MARK: - ConsentService (Google UMP / CMP)
//
// Resuelve el consentimiento GDPR (obligatorio para tráfico EEA/UK) ANTES de
// inicializar la mediación, para que el SDK de anuncios arranque con el
// consentimiento ya decidido. No lanza: si algo falla, la app sigue funcionando.
//
// Nombres Swift sin prefijo (el importador los refina): `ConsentInformation`,
// `ConsentForm`, `RequestParameters`, y los enums `ConsentStatus` / `FormStatus`
// / `PrivacyOptionsRequirementStatus`.

@MainActor
final class ConsentService {

    static let shared = ConsentService()
    private init() {}

    /// `true` solo donde hay que ofrecer la fila "Opciones de privacidad".
    var privacyOptionsRequired: Bool {
        ConsentInformation.shared.privacyOptionsRequirementStatus == .required
    }

    /// Orden de arranque: prompt de ATT → `resolve()` (espera) → `AdsManager.initialize()`.
    func resolve() async {
        let parameters = RequestParameters()
        // Para probar el formulario EEA desde fuera del EEA, en un dispositivo
        // concreto:
        //   let debug = DebugSettings()
        //   debug.geography = .EEA
        //   debug.testDeviceIdentifiers = ["<hash>"]
        //   parameters.debugSettings = debug

        // 1. Actualizar el estado de consentimiento (va a red).
        await withCheckedContinuation { (cont: CheckedContinuation<Void, Never>) in
            ConsentInformation.shared.requestConsentInfoUpdate(with: parameters) { error in
                if let error {
                    AdsLog.consent.error("consent update error: \(error.localizedDescription, privacy: .public)")
                }
                cont.resume()
            }
        }

        // 2. Exigir un VC ESTABLE antes de presentar. Presentar contra un VC en
        //    plena transición (p.ej. compitiendo con la hoja de onboarding) da
        //    "The provided view controller is not being presented".
        guard let vc = await stableTopViewController(timeout: 5) else {
            AdsLog.consent.info("no stable view controller after 5s — skipping consent form")
            return
        }

        // 3. Leer formStatus PRIMERO: si el formulario no está disponible o está
        //    mal configurado, esto evita bloquear el arranque el timeout entero.
        let expectsForm = ConsentInformation.shared.consentStatus == .required
            && ConsentInformation.shared.formStatus == .available

        // 4. Presentar el formulario si hace falta.
        var presented = false
        await withCheckedContinuation { (cont: CheckedContinuation<Void, Never>) in
            ConsentForm.loadAndPresentIfRequired(from: vc) { error in
                if let error {
                    AdsLog.consent.error("consent form error: \(error.localizedDescription, privacy: .public)")
                } else {
                    presented = true
                }
                cont.resume()
            }
        }

        // 5. GOTCHA de carrera: UMP llama al completion ~1s tras MOSTRAR el
        //    formulario, con él aún en pantalla → la mediación arrancaría antes
        //    de que el usuario elija. Si esperábamos formulario Y se presentó,
        //    sondear consentStatus cada 200ms hasta que salga de .required.
        //    Si el present FALLÓ no se sondea: así un fallo de presentación no
        //    bloquea el arranque 60s enteros por un consentimiento que nadie
        //    está decidiendo.
        if expectsForm && presented {
            let deadline = Date().addingTimeInterval(60)
            while Date() < deadline {
                if ConsentInformation.shared.consentStatus != .required { break }
                try? await Task.sleep(nanoseconds: 200_000_000)
            }
        }

        AdsLog.consent.info("consent resolved — status \(ConsentInformation.shared.consentStatus.rawValue, privacy: .public), canRequestAds \(ConsentInformation.shared.canRequestAds, privacy: .public)")
    }

    /// Presenta el formulario de opciones de privacidad (fila de Ajustes).
    func presentPrivacyOptions() async {
        guard let vc = await stableTopViewController(timeout: 5) else { return }
        await withCheckedContinuation { (cont: CheckedContinuation<Void, Never>) in
            ConsentForm.presentPrivacyOptionsForm(from: vc) { error in
                if let error {
                    AdsLog.consent.error("privacy options error: \(error.localizedDescription, privacy: .public)")
                }
                cont.resume()
            }
        }
    }

    // MARK: - Helpers

    /// El VC más alto que sea PRESENTABLE de forma estable: en una ventana real y
    /// sin estar en plena transición. Sondea hasta `timeout` antes de rendirse.
    private func stableTopViewController(timeout: TimeInterval) async -> UIViewController? {
        let deadline = Date().addingTimeInterval(timeout)
        while Date() < deadline {
            if let vc = UIApplication.shared.topViewController,
               vc.viewIfLoaded?.window != nil,
               !vc.isBeingPresented, !vc.isBeingDismissed {
                return vc
            }
            try? await Task.sleep(nanoseconds: 200_000_000)
        }
        return UIApplication.shared.topViewController
    }
}
