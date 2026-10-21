import { SITE_BASE, SITE_ORIGIN } from './config'

// Same order as the app's language picker. English and Spanish are the originals; the rest are translations.
export const LANGS = ['en', 'es', 'fr', 'it', 'de', 'pt', 'ar', 'zh', 'hi', 'ja', 'ko', 'vi']
export const LANG_LABEL = {
  en: 'English', es: 'Español', fr: 'Français', it: 'Italiano', de: 'Deutsch', pt: 'Português',
  ar: 'العربية', zh: '简体中文', hi: 'हिन्दी', ja: '日本語', ko: '한국어', vi: 'Tiếng Việt',
}
export const LANG_HREFLANG = { zh: 'zh-Hans' }
export const hreflang = (l) => LANG_HREFLANG[l] || l
export const RTL = ['ar']

// Spanish keeps localised slugs; every other language reuses the English ones under its own folder.
const SPANISH = {
  home: 'es/', guides: 'es/guias/', 'guide-mid-market': 'es/guias/tipo-de-cambio-medio/',
  'guide-local-currency': 'es/guias/pagar-en-moneda-local/', 'guide-travel': 'es/guias/convertir-divisas-viajando/',
  privacy: 'es/privacidad/', terms: 'es/terminos/', support: 'es/soporte/',
}
const ENGLISH = {
  home: '', guides: 'guides/', 'guide-mid-market': 'guides/mid-market-rate/', 'guide-local-currency': 'guides/pay-in-local-currency/',
  'guide-travel': 'guides/convert-currency-while-traveling/', privacy: 'privacy/', terms: 'terms/', support: 'support/',
}
const paths = (id) => Object.fromEntries(LANGS.map((l) => [l, l === 'es' ? SPANISH[id] : `${l}/${ENGLISH[id]}`]))

// One entry per page. `path` is relative to SITE_BASE and always ends with '/'.
export const ROUTES = ['home', 'guides', 'guide-mid-market', 'guide-local-currency', 'guide-travel', 'privacy', 'terms', 'support'].map((id) => ({ id, path: paths(id) }))

export const ROOT = { id: 'root', path: Object.fromEntries(LANGS.map((l) => [l, ''])) }

export const byId = (id) => (id === 'root' ? ROOT : ROUTES.find((r) => r.id === id))

/** Site-relative href, e.g. /divix/en/privacy/ */
export const href = (id, lang) => SITE_BASE + byId(id).path[lang]
export const url = (id, lang) => SITE_ORIGIN + href(id, lang)

/** Resolve a browser pathname to { route, lang } (used by the client entry and dev server). */
export function match(pathname) {
  const rel = pathname.startsWith(SITE_BASE) ? pathname.slice(SITE_BASE.length) : pathname.replace(/^\//, '')
  const norm = rel && !rel.endsWith('/') ? rel + '/' : rel
  for (const r of ROUTES) for (const l of LANGS) if (r.path[l] === norm) return { route: r, lang: l }
  return { route: ROOT, lang: 'en' }
}
