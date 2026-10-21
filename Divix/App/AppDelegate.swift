#if canImport(UIKit)
import UIKit

final class AppDelegate: NSObject, UIApplicationDelegate {

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {

        BackgroundRefreshService.register()

        // Shrink the large navigation title so the long app name ("Divix:
        // Currency Exchange") fits on one line without truncation.
        UINavigationBar.appearance().largeTitleTextAttributes = [
            .font: UIFont.systemFont(ofSize: 22, weight: .bold)
        ]
        // Inline nav titles (Markets, History) ~10% larger than the 17pt default.
        UINavigationBar.appearance().titleTextAttributes = [
            .font: UIFont.systemFont(ofSize: 18.5, weight: .semibold)
        ]

        // Audience Network is initialized in DivixApp, after the ATT prompt
        // is resolved — never here — so tracking consent is respected before
        // any ad request goes out.

        return true
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        BackgroundRefreshService.schedule()
    }
}
#endif
