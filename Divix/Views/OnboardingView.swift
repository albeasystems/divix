import SwiftUI

struct OnboardingView: View {

    @Binding var hasSeenOnboarding: Bool
    @State private var pageIndex: Int = 0

    private struct Page: Identifiable {
        let id: Int
        let systemImage: String
        let titleKey: LocalizedStringKey
        let subtitleKey: LocalizedStringKey
    }

    private let pages: [Page] = [
        Page(id: 0,
             systemImage: "clock.badge.checkmark",
             titleKey: "onboarding_1_title",
             subtitleKey: "onboarding_1_subtitle"),
        Page(id: 1,
             systemImage: "plus.forwardslash.minus",
             titleKey: "onboarding_2_title",
             subtitleKey: "onboarding_2_subtitle"),
        Page(id: 2,
             systemImage: "star.circle",
             titleKey: "onboarding_3_title",
             subtitleKey: "onboarding_3_subtitle")
    ]

    var body: some View {
        VStack(spacing: 0) {
            TabView(selection: $pageIndex) {
                ForEach(pages) { page in
                    pageContent(page)
                        .tag(page.id)
                }
            }
            #if os(iOS)
            .tabViewStyle(.page(indexDisplayMode: .always))
            #endif
            .animation(.easeInOut, value: pageIndex)

            actionButton
                .padding(.horizontal, 24)
                .padding(.bottom, 32)
        }
        .background(Color.systemBackground.ignoresSafeArea())
    }

    @ViewBuilder
    private func pageContent(_ page: Page) -> some View {
        VStack(spacing: 24) {
            Spacer(minLength: 40)
            Image(systemName: page.systemImage)
                .resizable()
                .scaledToFit()
                .frame(width: 110, height: 110)
                .foregroundStyle(Color.accentColor)
                .symbolRenderingMode(.hierarchical)
                .accessibilityHidden(true)
            Text(page.titleKey)
                .font(.title.weight(.bold))
                .multilineTextAlignment(.center)
            Text(page.subtitleKey)
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            Spacer()
        }
        .padding(.horizontal)
    }

    private var actionButton: some View {
        Button {
            if pageIndex < pages.count - 1 {
                withAnimation { pageIndex += 1 }
            } else {
                withAnimation { hasSeenOnboarding = true }
            }
        } label: {
            Text(pageIndex < pages.count - 1 ? "onboarding_next" : "onboarding_start")
                .font(.headline)
                .frame(maxWidth: .infinity, minHeight: 50)
                .background(Color.accentColor)
                .foregroundStyle(.white)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    OnboardingView(hasSeenOnboarding: .constant(false))
}
