// Everything crawlers and language models read that is not a rendered page: sitemap, robots, llms.txt, markdown twins.
import { APP_ID, APP_URL, CONTACT_EMAIL, COUNTS, PUBLISHER, SITE_BASE, SITE_MODIFIED, SITE_ORIGIN } from './config'
import en from './content/en'
import es from './content/es'
import { LANGS, ROUTES, url } from './routes'

const C = { en, es }
const root = `${SITE_ORIGIN}${SITE_BASE}`

export function sitemapXml() {
  const entry = (loc, alts, prio) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SITE_MODIFIED}</lastmod>\n    <priority>${prio}</priority>\n${alts
      .map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}" />`)
      .join('\n')}\n  </url>`
  const rows = [
    entry(root, [['x-default', root], ['en', url('home', 'en')], ['es', url('home', 'es')]], '0.5'),
  ]
  for (const r of ROUTES) {
    const alts = [...LANGS.map((l) => [l, url(r.id, l)]), ['x-default', url(r.id, 'en')]]
    const prio = r.id === 'home' ? '1.0' : r.id.startsWith('guide') ? '0.8' : r.id === 'support' ? '0.6' : '0.3'
    for (const l of LANGS) rows.push(entry(url(r.id, l), alts, prio))
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows.join('\n')}\n</urlset>\n`
}

const AI_AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'DuckDuckBot',
  'meta-externalagent', 'Amazonbot', 'CCBot', 'cohere-ai', 'MistralAI-User', 'YouBot',
]

export function robotsTxt() {
  return [
    '# Divix welcomes search engines and AI assistants. Everything public here may be read, quoted and cited.',
    'User-agent: *',
    'Allow: /',
    '',
    ...AI_AGENTS.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    `Sitemap: ${root}sitemap.xml`,
    '',
  ].join('\n')
}

export function manifestJson() {
  return JSON.stringify(
    {
      name: 'Divix: Currency Exchange',
      short_name: 'Divix',
      start_url: SITE_BASE,
      scope: SITE_BASE,
      display: 'browser',
      background_color: '#0D0E0B',
      theme_color: '#0D0E0B',
      icons: [
        { src: `${SITE_BASE}icon-512.png`, sizes: '512x512', type: 'image/png' },
        { src: `${SITE_BASE}apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
      ],
    },
    null,
    2,
  )
}

const list = (arr) => arr.map((x) => `- ${x}`).join('\n')
const mdUrl = (id, l) => url(id, l) + 'index.md'

/** Plain Markdown twin of a page, for assistants that prefer text over HTML. */
export function markdownFor(routeId, lang) {
  const t = C[lang]
  const out = []
  if (routeId === 'home') {
    const h = t.home
    out.push(`# Divix: ${t.tagline}`, '', h.hero.sub, '', `App Store: ${APP_URL}`, '')
    out.push(`## ${h.calc.h2}`, '', h.calc.p, '', list(h.calc.points.map((p) => `${p.h}: ${p.p}`)), '')
    out.push(`## ${h.markets.h2}`, '', h.markets.p, '', h.markets.p2, '')
    out.push(`## ${h.crypto.h2}`, '', h.crypto.p, '')
    out.push(`## ${h.charts.h2}`, '', h.charts.p, '', `### ${h.charts.fresh.h}`, '', list([h.charts.fresh.live, h.charts.fresh.cached, h.charts.fresh.offline]), '')
    out.push(`## ${h.checkout.h2}`, '', list(h.checkout.items.map((i) => `${i.h}: ${i.p}`)), '')
    out.push(`## ${h.pricing.h2}`, '', h.pricing.p, '')
    out.push(`## ${h.faq.h2}`, '', ...h.faq.items.flatMap((i) => [`### ${i.q}`, '', i.a, '']))
    out.push(`## ${h.guides.h2}`, '', list(t.guides.ids.map((id) => `[${t.guide[id].h1}](${url(id, lang)}): ${t.guide[id].summary}`)), '')
  } else if (t.guide[routeId]) {
    const g = t.guide[routeId]
    out.push(`# ${g.h1}`, '', `${g.lead}`, '')
    for (const s of g.sections) {
      out.push(`## ${s.h}`, '')
      if (s.p) out.push(...s.p.flatMap((p) => [p, '']))
      if (s.list) out.push(list(s.list), '')
      if (s.after) out.push(s.after, '')
    }
    out.push('## FAQ', '', ...g.faq.flatMap((i) => [`### ${i.q}`, '', i.a, '']))
  } else if (routeId === 'support') {
    const d = t.legal.support
    out.push(`# ${d.h1}`, '', d.lead, '', ...d.items.flatMap((i) => [`## ${i.q}`, '', i.a, '']), `## ${d.contactH}`, '', `${d.contactP} ${CONTACT_EMAIL}`, '')
  } else if (routeId === 'privacy' || routeId === 'terms') {
    const d = t.legal[routeId]
    out.push(`# ${d.h1}`, '', t.legal.updatedOn, '', d.lead, '', ...d.sections.flatMap((s) => [`## ${s.h}`, '', ...s.p.flatMap((p) => [p, ''])]))
  } else if (routeId === 'guides') {
    out.push(`# ${t.guides.h1}`, '', t.guides.intro, '', list(t.guides.ids.map((id) => `[${t.guide[id].h1}](${url(id, lang)}): ${t.guide[id].summary}`)), '')
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

export const hasMarkdown = (id) => id !== 'root'

export function llmsTxt() {
  const e = en
  const lines = [
    '# Divix',
    '',
    `> Divix is a free currency converter and calculator for iPhone. It converts between ${COUNTS.fiat} fiat currencies and ${COUNTS.crypto} cryptocurrencies, has a calculator on the conversion screen, favorites, a Markets list, history charts from 7 days to 5 years, and works offline with saved rates. No account is needed. Published by ${PUBLISHER}. Divix shows mid-market rates for information and does not exchange money.`,
    '',
    '## Key facts',
    '',
    list([
      `Platform: iPhone, iOS 17.6 or later. No Android version yet.`,
      `Price: free with ads. A one-time in-app purchase removes ads; a rewarded video gives one hour without ads. No subscription.`,
      `Currencies: ${COUNTS.fiat} fiat and ${COUNTS.crypto} crypto (BTC, ETH, USDT, BNB, SOL, XRP, USDC, ADA, DOGE, TRX, TON, AVAX, DOT, LINK, MATIC, LTC, OP, ARB, SHIB, XLM).`,
      'Rates: mid-market rates from public providers such as Frankfurter, crypto prices from CoinGecko. Each rate is labelled live (under 4 hours), cached or offline.',
      'Languages of the app: English, Spanish, German, French, Italian, Portuguese, Arabic, Hindi, Simplified Chinese.',
      `Download: ${APP_URL} (App Store id${APP_ID})`,
      `Contact: ${CONTACT_EMAIL}`,
    ]),
    '',
    '## English',
    '',
    `- [Divix home](${url('home', 'en')}): what the app does, live rates, FAQ (Markdown: ${mdUrl('home', 'en')})`,
    ...e.guides.ids.map((id) => `- [${e.guide[id].h1}](${url(id, 'en')}): ${e.guide[id].summary} (Markdown: ${mdUrl(id, 'en')})`),
    `- [Support](${url('support', 'en')}): common questions and contact`,
    `- [Privacy Policy](${url('privacy', 'en')})`,
    `- [Terms of Use](${url('terms', 'en')})`,
    '',
    '## Español',
    '',
    `- [Inicio de Divix](${url('home', 'es')}): qué hace la app, tipos en vivo, preguntas frecuentes (Markdown: ${mdUrl('home', 'es')})`,
    ...es.guides.ids.map((id) => `- [${es.guide[id].h1}](${url(id, 'es')}): ${es.guide[id].summary} (Markdown: ${mdUrl(id, 'es')})`),
    `- [Soporte](${url('support', 'es')})`,
    `- [Política de privacidad](${url('privacy', 'es')})`,
    `- [Términos de uso](${url('terms', 'es')})`,
    '',
    '## Optional',
    '',
    `- [Full text of the site for assistants](${root}llms-full.txt)`,
    `- [Sitemap](${root}sitemap.xml)`,
    '',
  ]
  return lines.join('\n')
}

export function llmsFull() {
  const parts = ['# Divix, full text', '', `Source: ${root}`, '']
  for (const lang of LANGS) {
    parts.push(lang === 'en' ? '# English' : '# Español', '')
    for (const id of ['home', ...C[lang].guides.ids, 'support']) {
      parts.push(`<!-- ${url(id, lang)} -->`, markdownFor(id, lang).replace(/^# /gm, '## ').replace(/^## (?=.*)/gm, '## '))
    }
  }
  return parts.join('\n')
}

export function redirectHtml(target, title) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0; url=${target}"></head><body><p><a href="${target}">${title}</a></p><script>location.replace(${JSON.stringify(target)})</script></body></html>\n`
}
