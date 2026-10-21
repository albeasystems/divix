import SwiftUI

struct RootTabView: View {

    @State private var appState = AppState.shared

    var body: some View {
        TabView(selection: $appState.selectedTab) {
            MainConversionView()
                .tabItem {
                    Label("tab_convert", systemImage: "arrow.left.arrow.right.circle")
                }
                .tag(AppState.Tab.convert)

            MultiCurrencyListView()
                .tabItem {
                    Label("list_title", systemImage: "dollarsign.circle")
                }
                .tag(AppState.Tab.multi)

            HistoricalChartView()
                .tabItem {
                    Label("tab_chart", systemImage: "chart.xyaxis.line")
                }
                .tag(AppState.Tab.chart)
        }
    }
}

#Preview {
    RootTabView()
}
