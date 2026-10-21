import { createContext, useContext } from 'react'

/** Copy per language, filled by loadContent. The browser loads only the page's own language; the prerender loads all of them. */
export const CONTENT = {}

const LOADERS = {
  en: () => import('./content/en'),
  es: () => import('./content/es'),
  fr: () => import('./content/fr'),
  it: () => import('./content/it'),
  de: () => import('./content/de'),
  pt: () => import('./content/pt'),
  ar: () => import('./content/ar'),
  zh: () => import('./content/zh'),
  hi: () => import('./content/hi'),
  ja: () => import('./content/ja'),
  ko: () => import('./content/ko'),
  vi: () => import('./content/vi'),
}

export async function loadContent(lang) {
  if (!CONTENT[lang]) CONTENT[lang] = (await LOADERS[lang]()).default
  return CONTENT[lang]
}

const Ctx = createContext(null)

/** Carries the language, the route id and the rate board (real data fetched at build time) to every component. */
export function PageProvider({ lang, routeId, board, children }) {
  return <Ctx.Provider value={{ lang, routeId, board, t: CONTENT[lang] }}>{children}</Ctx.Provider>
}

export const usePage = () => useContext(Ctx)
