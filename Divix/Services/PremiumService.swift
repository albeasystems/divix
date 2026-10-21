import Foundation
import SwiftUI
import StoreKit

/// Single source of truth for the premium (no-ads) flag.
/// Backed by StoreKit 2 with a local UserDefaults cache so banners disappear
/// instantly after purchase — even before the transaction listener fires.
@MainActor
@Observable
final class PremiumService {

    static let shared = PremiumService()

    // MARK: - State

    private(set) var isPremium: Bool
    private(set) var isLoading  = false   // true while a purchase/restore is in-flight
    private(set) var error: String?       // last purchase/restore error, if any
    private(set) var product: Product?    // the fetched App Store product (for price display)

    // MARK: - Init

    private init() {
        self.isPremium = UserDefaults.standard.bool(
            forKey: AppConfig.StorageKeys.isPremiumUnlocked)
        Task { await self.startTransactionListener() }
        Task { await self.loadProduct() }
    }

    // MARK: - Public API

    /// Initiates the StoreKit purchase flow for `AppConfig.premiumProductID`.
    func purchase() async {
        guard !isPremium else { return }
        isLoading = true
        error = nil
        defer { isLoading = false }
        do {
            guard let product else {
                error = String(localized: "iap_product_unavailable")
                return
            }
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                let tx = try checkVerified(verification)
                await unlock()
                await tx.finish()
            case .userCancelled:
                break
            case .pending:
                break   // ask-to-buy / parental approval — unlock when approved
            @unknown default:
                break
            }
        } catch {
            self.error = error.localizedDescription
        }
    }

    /// Restores previously completed non-consumable purchases.
    func restore() async {
        isLoading = true
        error = nil
        defer { isLoading = false }
        do {
            try await AppStore.sync()
            // After sync, re-check all current entitlements.
            for await result in Transaction.currentEntitlements {
                if let tx = try? checkVerified(result),
                   tx.productID == AppConfig.premiumProductID {
                    await unlock()
                    await tx.finish()
                }
            }
        } catch {
            self.error = error.localizedDescription
        }
    }

    // MARK: - Easter-egg back-door (dev/QA only)

    func toggle() { isPremium.toggle(); persist() }

    // MARK: - Private helpers

    private func loadProduct() async {
        do {
            let products = try await Product.products(for: [AppConfig.premiumProductID])
            product = products.first
        } catch {
            // Non-fatal: price display will be missing, but purchase still works
            // once the product loads.
        }
    }

    /// Listens for transaction updates (purchase on another device, parental approval…).
    private func startTransactionListener() async {
        for await result in Transaction.updates {
            guard let tx = try? checkVerified(result),
                  tx.productID == AppConfig.premiumProductID,
                  tx.revocationDate == nil else { continue }
            await unlock()
            await tx.finish()
        }
    }

    private func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified(_, let error): throw error
        case .verified(let value):      return value
        }
    }

    private func unlock() async {
        isPremium = true
        persist()
    }

    private func persist() {
        UserDefaults.standard.set(isPremium, forKey: AppConfig.StorageKeys.isPremiumUnlocked)
    }
}
