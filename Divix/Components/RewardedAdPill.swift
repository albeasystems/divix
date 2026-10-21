import SwiftUI

// MARK: - RewardedAdPill
//
// Punto de entrada del rewarded en el Home, justo ENCIMA del banner (el anuncio
// que elimina). Tres estados:
//   • premium                            → oculta
//   • dentro de la ventana sin anuncios  → tarjeta verde con cuenta atrás
//   • resto                              → botón "Ver un vídeo — 1 hora sin anuncios"
//
// Se muestra SIEMPRE (salvo premium o ventana activa), no solo si hay vídeo
// precargado: al tocar, `showRewardedFetchingIfNeeded` muestra el cacheado o
// lanza una carga bajo demanda, y si falla avisa "No hay vídeo disponible".

struct RewardedAdPill: View {

    @ObservedObject private var ads = AdsManager.shared

    /// Observa @AppStorage de la clave REAL de UserDefaults para ocultarse al
    /// comprar premium SIN relaunch: una propiedad computada del manager no
    /// notifica a SwiftUI y la pastilla seguiría visible tras la compra.
    @AppStorage(AppConfig.StorageKeys.isPremiumUnlocked) private var isPremium = false

    var body: some View {
        content
            .alert("ads_rewarded_unavailable_title", isPresented: $ads.rewardedUnavailable) {
                Button("common_ok", role: .cancel) {}
            } message: {
                Text("ads_rewarded_unavailable_message")
            }
    }

    @ViewBuilder
    private var content: some View {
        if isPremium {
            EmptyView()
        } else if let until = ads.adFreeUntil, until > Date() {
            adFreeCard(until: until)
        } else {
            watchButton
        }
    }

    private func adFreeCard(until: Date) -> some View {
        HStack(spacing: 10) {
            Image(systemName: "checkmark.seal.fill")
                .foregroundStyle(.white)
            VStack(alignment: .leading, spacing: 1) {
                Text("ads_rewarded_active_title")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.white)
                Text("ads_rewarded_active_ends \(Text(until, style: .relative))")
                    .font(.caption)
                    .foregroundStyle(.white.opacity(0.9))
            }
            Spacer()
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(Color.green.gradient, in: RoundedRectangle(cornerRadius: 12))
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
    }

    private var watchButton: some View {
        Button {
            ads.showRewardedFetchingIfNeeded()
        } label: {
            HStack(spacing: 10) {
                if ads.isFetchingRewarded {
                    ProgressView().tint(.white)
                } else {
                    Image(systemName: "play.rectangle.fill")
                        .foregroundStyle(.white)
                }
                Text("ads_rewarded_watch")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.white)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                Spacer()
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(Color.blue.gradient, in: RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
        .disabled(ads.isFetchingRewarded)
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
    }
}
