# Divix web

Static, twelve-language site (EN, ES, FR, IT, DE, PT, AR, ZH, HI, JA, KO, VI) for the Divix iOS app, the same languages as the app. Stack: Vite + React 19 + Tailwind v4. Every page is prerendered to plain HTML at build time (so search engines and AI crawlers read the content without running JavaScript) and hydrated in the browser.

```bash
cd web
npm install
npm run dev        # http://localhost:5173/divix/en/
npm run build      # prerenders 97 pages (8 pages x 12 languages, plus the root chooser and 404) into web/dist (needs internet: it fetches today's rates)
npm run preview    # serves web/dist at http://localhost:4173/divix/
```

## Where things live

- `src/content/<lang>.js`: all copy per language (home, FAQ, three guides, privacy, terms, support). English and Spanish are the originals; the other ten are translations with the same keys, so change every file when a text changes. House rule: no em or en dashes.
- `src/pages/`: Home, guides, legal, root language chooser. `src/components/`: header, footer, rate board, converter, FAQ.
- `src/routes.js`: one entry per page and language (slugs are localised: `/es/guias/...`).
- `src/seo.js`: title, canonical, hreflang, Open Graph, Twitter, JSON-LD (WebSite, Organization, MobileApplication, FAQPage, Article, BreadcrumbList).
- `src/artifacts.js`: sitemap.xml, robots.txt, llms.txt, llms-full.txt, a Markdown twin (`index.md`) of each content page, web manifest.
- `scripts/build.mjs`: client build, SSR build, prerender, write artifacts. Old flat URLs the app links to (`privacy.html`, `terms.html`, `support.html`) are written as redirects to the English pages.
- `src/config.js`: App Store URL, contact, **site origin and base path** (`https://albeasystems.github.io` + `/divix/`). Change both, and `SITE_BASE` env, if a custom domain is used.
- `public/shots/*.webp`: real simulator screenshots (iPhone 17, status bar 9:41, ad-free window). `public/divix-happy-journey.{gif,webp}`: the Home journey (EUR to USD 250, swap, crypto picker, Bitcoin, favorites, chart). `public/og/`: social images (1200x630).
- `legacy-static/`: the previous hand-written site, kept for reference only. Delete when no longer needed.

## Updating the screenshots

Each language has its own captures in `public/shots/<lang>/` (convert, markets, picker, chart, bitcoin, cryptolist, favorites, journey), converted from `appstore/<locale>/clean/` to 600 px WebP. Each non-English language also has `favorites.webp` and `journey.webp` (the Home animation, built from that language's own captures); `swap` and the English Home journey (GIF/WebP) come from the original recording. Re-capture on an iPhone 17 simulator (`xcrun simctl status_bar booted override --time 9:41`), convert to 600 px wide WebP, replace files in `public/shots/`, and rebuild the GIF.

## Publishing

Deploy `web/dist` as the root of https://albeasystems.github.io/divix/ (repo `albeasystems/divix`, GitHub Pages via Actions). `deploy/pages.yml` is the workflow; it also rebuilds daily so the rate cells stay current.

Limits of a GitHub project site: `robots.txt` and `llms.txt` only take effect at the host root, so on `albeasystems.github.io/divix/` crawlers find them only through the sitemap and page links. With a custom domain they work as designed (set `SITE_ORIGIN` and `SITE_BASE='/'` and add a `CNAME`).

## Before publishing

- Review privacy and terms text (draft written from the app's real behaviour: no account, ads through a mediation service with AdMob, Meta and Unity networks, UMP and ATT consent).
- Confirm the ad-free price in App Store Connect before printing it; the page deliberately omits it.
- The in-app Settings links point to `.../divix/privacy.html`, `terms.html`, `support.html`; those redirect to the English pages.
