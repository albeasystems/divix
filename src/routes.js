import { SITE_BASE, SITE_ORIGIN } from './config'

export const LANGS = ['en', 'es']
export const LANG_LABEL = { en: 'English', es: 'Español' }
export const LANG_HREFLANG = { en: 'en', es: 'es' }

// One entry per page. `path` is relative to SITE_BASE and always ends with '/'.
export const ROUTES = [
  { id: 'home', path: { en: 'en/', es: 'es/' } },
  { id: 'guides', path: { en: 'en/guides/', es: 'es/guias/' } },
  { id: 'guide-mid-market', path: { en: 'en/guides/mid-market-rate/', es: 'es/guias/tipo-de-cambio-medio/' } },
  { id: 'guide-local-currency', path: { en: 'en/guides/pay-in-local-currency/', es: 'es/guias/pagar-en-moneda-local/' } },
  { id: 'guide-travel', path: { en: 'en/guides/convert-currency-while-traveling/', es: 'es/guias/convertir-divisas-viajando/' } },
  { id: 'privacy', path: { en: 'en/privacy/', es: 'es/privacidad/' } },
  { id: 'terms', path: { en: 'en/terms/', es: 'es/terminos/' } },
  { id: 'support', path: { en: 'en/support/', es: 'es/soporte/' } },
]

export const ROOT = { id: 'root', path: { en: '', es: '' } }

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
