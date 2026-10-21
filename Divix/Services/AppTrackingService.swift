#if canImport(AppTrackingTransparency)
import Foundation
import AppTrackingTransparency
import AdSupport

/// Wraps `AppTrackingTransparency` so the rest of the app doesn't import it
/// directly. The prompt is requested **after** onboarding (Apple's
/// recommendation: explain why first, then ask).
@MainActor
@Observable
final class AppTrackingService {

    static let shared = AppTrackingService()

    private(set) var status: ATTrackingManager.AuthorizationStatus

    private init() {
        self.status = ATTrackingManager.trackingAuthorizationStatus
    }

    var isAuthorized: Bool { status == .authorized }

    /// Idempotent: only prompts if status is `.notDetermined`. Safe to call
    /// from any post-onboarding flow.
    func requestIfNeeded() async {
        guard ATTrackingManager.trackingAuthorizationStatus == .notDetermined else {
            status = ATTrackingManager.trackingAuthorizationStatus
            return
        }
        let result = await ATTrackingManager.requestTrackingAuthorization()
        status = result
    }
}
#endif
