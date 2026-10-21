# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + Tailwind v4, in `web/` (chosen by the user; matches the app-launch playbook, phase 5). Static multi-page build for GitHub Pages at https://albeasystems.github.io/divix/ (relative paths). Languages: English and Spanish (`/en/`, `/es/`), root redirects by browser language.

## Users

Travellers and online shoppers who need to know, in seconds, what a foreign price is in their own money (and the reverse): at a market stall, a checkout, a restaurant bill. Secondary: people who also watch Bitcoin and other crypto next to fiat.

## Product Purpose

Divix is a free iOS currency converter with a real calculator on the same screen, a favourites list, a markets list and history charts. The web visitor should understand it in seconds and tap "Get the free app" (App Store id6776141769). Success = App Store click-throughs, and ranking for currency-converter searches in classic search and in LLM answers.

## Positioning

Convert while you calculate: a real calculator (+ − × ÷) built into the conversion screen, so there is no app switching. Every rate shows how fresh it is (live, cached, offline). Fiat and crypto in one picker. No sign-up. We display mid-market rates and add no fee or markup.

## Operating Context

Phone in one hand, in a shop or at a checkout, often with poor connectivity (last rates are cached). Amounts are typed, calculated and compared quickly. App is localized in 9 languages (en es de fr it pt ar hi zh-Hans).

## Capabilities and Constraints

- 55 fiat currencies and 20 cryptocurrencies (BTC, ETH, USDT, BNB, SOL, XRP, USDC, ADA, DOGE, TRX, TON, AVAX, DOT, LINK, MATIC, LTC, OP, ARB, SHIB, XLM). The old web said "150+": that is not what the app ships; do not repeat it.
- Tabs: Convert (calculator + two currency cards, swap, star to favourite), Markets (one base amount vs every currency; All / Favorites / Fiat / Crypto), Chart (7D, 30D, 90D, 1Y, 2Y, 5Y; low, high, change).
- Rates: Frankfurter, ExchangeRate-API fallback, CoinGecko for crypto. Cached offline; freshness badge. Background refresh.
- iOS 17.6+, version 3.2, bundle `com.albeasystems.Divix`. Publisher: Albea Systems, albeasystems@gmail.com.
- Free with ads; one-time purchase removes ads (old web states $5.99; confirm in App Store Connect), or a rewarded video gives 1 hour ad-free.
- Web must include privacy, terms and support pages, a non-affiliation notice, and must not name Unity/LevelPlay as the product. The app is a calculator, not a money exchange.

## Brand Commitments

Name "Divix". App icon: two coins (gold dollar, silver) on dark navy, `Divix/Resources/Assets.xcassets/AppIcon.appiconset/divix-new.png`. In-app UI is iOS-native blue (#007AFF) on white with a yellow favourite star and green/red change colours.

## Evidence on Hand

Real simulator captures (Convert, Markets, Chart, picker) and a happy-journey GIF, in `web/public/`. No testimonials, ratings, download counts or press: none may be invented. The previous web had invented testimonials: do not carry them over.

## Product Principles

1. Show the real app, never mockups of features that do not exist.
2. Lead with the checkout moment: type a price, see your money.
3. Honest about data: mid-market rates, freshness shown, not a bank.
4. One action: get the app.
5. Every claim machine-readable: structured data, plain-language answers, llms.txt.
