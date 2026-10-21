import { APP_ID, APP_NAME, APP_URL, CONTACT_EMAIL, COUNTS, PUBLISHER, SITE_BASE, SITE_MODIFIED, SITE_ORIGIN, SITE_PUBLISHED } from './config'
import { CONTENT } from './i18n'
import { byId, hreflang, LANGS, url } from './routes'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const abs = (p) => SITE_ORIGIN + SITE_BASE + p

// Only English and Spanish have a dedicated social image; the other languages share the English one.
export const OG_IMAGE = (lang) => abs(`og/og-${lang === 'es' ? 'es' : 'en'}.png`)

/** Title, description and page type for a route. */
export function pageMeta(routeId, lang) {
  const t = CONTENT[lang]
  if (routeId === 'root') return { title: 'Divix: Currency Converter & Calculator for iPhone | Conversor de divisas', description: `${CONTENT.en.seo.home.description}`, type: 'website' }
  if (routeId === 'home') return { ...t.seo.home, type: 'website' }
  if (routeId === 'guides') return { ...t.seo.guides, type: 'website' }
  if (t.guide[routeId]) return { title: `${t.guide[routeId].title}`, description: t.guide[routeId].description, type: 'article' }
  return { ...t.seo[routeId], type: 'website' }
}

function alternates(routeId, lang) {
  if (routeId === 'root') {
    return [['x-default', url('root', 'en')], ...LANGS.map((l) => [hreflang(l), url('home', l)])]
  }
  const out = LANGS.map((l) => [hreflang(l), url(routeId, l)])
  out.push(['x-default', url(routeId, 'en')])
  return out
}

const publisher = {
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}${SITE_BASE}#publisher`,
  name: PUBLISHER,
  email: CONTACT_EMAIL,
  url: `${SITE_ORIGIN}${SITE_BASE}`,
  logo: { '@type': 'ImageObject', url: abs('icon-512.png'), width: 512, height: 512 },
  sameAs: [APP_URL],
}

function appNode(lang) {
  const t = CONTENT[lang]
  return {
    '@type': 'MobileApplication',
    '@id': `${SITE_ORIGIN}${SITE_BASE}#app`,
    name: 'Divix: Currency Exchange',
    alternateName: APP_NAME,
    description: t.seo.home.description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'iOS 17.6 or later',
    url: APP_URL,
    mainEntityOfPage: url('home', lang),
    downloadUrl: APP_URL,
    installUrl: APP_URL,
    image: abs('icon-512.png'),
    screenshot: ['convert', 'markets', 'chart'].map((n) => abs(`shots/${n}.webp`)),
    inLanguage: LANGS.map(hreflang),
    featureList: [
      `${COUNTS.fiat} fiat currencies and ${COUNTS.crypto} cryptocurrencies`,
      'Calculator built into the conversion screen',
      'Favorites and a Markets list with Fiat and Crypto filters',
      'History charts from 7 days to 5 years',
      'Live, cached and offline rate status',
      'Works offline with saved rates, no account required',
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': publisher['@id'] },
  }
}

function faqNode(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  }
}

function crumbs(list) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: list.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  }
}

export function jsonLd(routeId, lang) {
  const t = CONTENT[lang]
  const meta = pageMeta(routeId, lang)
  const graph = []
  const siteId = `${SITE_ORIGIN}${SITE_BASE}#website`
  graph.push({ '@type': 'WebSite', '@id': siteId, url: `${SITE_ORIGIN}${SITE_BASE}`, name: APP_NAME, inLanguage: LANGS.map(hreflang), publisher: { '@id': publisher['@id'] } })
  graph.push(publisher)

  if (routeId === 'home') {
    graph.push({ '@type': 'WebPage', '@id': url('home', lang) + '#webpage', url: url('home', lang), name: meta.title, description: meta.description, inLanguage: hreflang(lang), isPartOf: { '@id': siteId }, about: { '@id': `${SITE_ORIGIN}${SITE_BASE}#app` }, primaryImageOfPage: OG_IMAGE(lang), dateModified: SITE_MODIFIED })
    graph.push(appNode(lang))
    graph.push(faqNode(t.home.faq.items))
  } else if (routeId === 'guides') {
    graph.push({ '@type': 'CollectionPage', url: url('guides', lang), name: t.guides.h1, description: meta.description, inLanguage: hreflang(lang), isPartOf: { '@id': siteId } })
    graph.push(crumbs([[t.ui.breadcrumbs.home, url('home', lang)], [t.ui.breadcrumbs.guides, url('guides', lang)]]))
  } else if (t.guide[routeId]) {
    const g = t.guide[routeId]
    graph.push({
      '@type': 'Article',
      headline: g.title,
      description: g.description,
      inLanguage: hreflang(lang),
      datePublished: SITE_PUBLISHED,
      dateModified: SITE_MODIFIED,
      image: OG_IMAGE(lang),
      mainEntityOfPage: url(routeId, lang),
      author: { '@id': publisher['@id'] },
      publisher: { '@id': publisher['@id'] },
      about: { '@type': 'Thing', name: g.h1 },
    })
    graph.push(faqNode(g.faq))
    graph.push(crumbs([[t.ui.breadcrumbs.home, url('home', lang)], [t.ui.breadcrumbs.guides, url('guides', lang)], [g.h1, url(routeId, lang)]]))
  } else if (routeId === 'support') {
    graph.push({ '@type': 'ContactPage', url: url('support', lang), name: t.legal.support.h1, inLanguage: hreflang(lang), isPartOf: { '@id': siteId } })
    graph.push(faqNode(t.legal.support.items))
    graph.push(crumbs([[t.ui.breadcrumbs.home, url('home', lang)], [t.legal.support.h1, url('support', lang)]]))
  } else if (routeId === 'privacy' || routeId === 'terms') {
    graph.push({ '@type': 'WebPage', url: url(routeId, lang), name: t.legal[routeId].h1, inLanguage: hreflang(lang), isPartOf: { '@id': siteId } })
    graph.push(crumbs([[t.ui.breadcrumbs.home, url('home', lang)], [t.legal[routeId].h1, url(routeId, lang)]]))
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

/** Everything that goes inside <head> for a page, as an HTML string. */
export function headHtml(routeId, lang) {
  const meta = pageMeta(routeId, lang)
  const canonical = routeId === 'root' ? url('root', 'en') : url(routeId, lang)
  const alts = alternates(routeId, lang)
  const t = CONTENT[lang]
  const img = OG_IMAGE(routeId === 'root' ? 'en' : lang)
  const imgAlt = t.seo.imgAlt
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${canonical}" />`,
    ...alts.map(([l, u]) => `<link rel="alternate" hreflang="${l}" href="${u}" />`),
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="Divix" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="${t.ogLocale}" />`,
    ...(routeId !== 'root' ? LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${CONTENT[l].ogLocale}" />`) : []),
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(imgAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    meta.type === 'article' ? `<meta property="article:published_time" content="${SITE_PUBLISHED}" /><meta property="article:modified_time" content="${SITE_MODIFIED}" />` : '',
    `<meta name="apple-itunes-app" content="app-id=${APP_ID}" />`,
    `<meta name="theme-color" content="#0D0E0B" />`,
    `<meta name="color-scheme" content="dark" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="${SITE_BASE}favicon-32.png" />`,
    `<link rel="apple-touch-icon" href="${SITE_BASE}apple-touch-icon.png" />`,
    `<link rel="manifest" href="${SITE_BASE}site.webmanifest" />`,
    `<script type="application/ld+json">${jsonLd(routeId, lang).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}

export { byId }
