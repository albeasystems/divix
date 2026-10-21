#if os(iOS)
import Foundation
import BackgroundTasks
#if canImport(WidgetKit)
import WidgetKit
#endif

/// Schedules and handles the periodic rate-refresh background task. The
/// identifier must also be listed under `BGTaskSchedulerPermittedIdentifiers`
/// in `Info.plist`.
enum BackgroundRefreshService {

    static let taskIdentifier = AppConfig.backgroundRefreshIdentifier

    /// Call once at app launch from `AppDelegate.application(_:didFinishLaunchingWithOptions:)`.
    static func register() {
        BGTaskScheduler.shared.register(forTaskWithIdentifier: taskIdentifier,
                                        using: nil) { task in
            guard let refreshTask = task as? BGAppRefreshTask else {
                task.setTaskCompleted(success: false); return
            }
            handle(task: refreshTask)
        }
    }

    /// Schedule the next refresh. Idempotent — submitting again replaces the
    /// pending request. The earliestBeginDate is a hint to iOS, not a guarantee.
    static func schedule() {
        let request = BGAppRefreshTaskRequest(identifier: taskIdentifier)
        request.earliestBeginDate = Date(timeIntervalSinceNow: AppConfig.backgroundRefreshIntervalSeconds)
        do {
            try BGTaskScheduler.shared.submit(request)
        } catch {
            #if DEBUG
            print("[BackgroundRefresh] schedule failed: \(error)")
            #endif
        }
    }

    // MARK: - Handling

    private static func handle(task: BGAppRefreshTask) {
        // Always queue the next run so the cadence survives this execution.
        schedule()

        let work = Task { @MainActor in
            let base = UserDefaults.standard.string(forKey: AppConfig.StorageKeys.baseCurrencyCode)
                ?? AppConfig.defaultBaseCurrencyCode
            _ = await ExchangeRateService.shared.fetchRates(baseCode: base)
            #if canImport(WidgetKit)
            WidgetCenter.shared.reloadAllTimelines()
            #endif
            task.setTaskCompleted(success: true)
        }

        task.expirationHandler = {
            work.cancel()
        }
    }
}
#endif
