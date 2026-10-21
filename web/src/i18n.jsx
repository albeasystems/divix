import { createContext, useContext } from 'react'
import en from './content/en'
import es from './content/es'

export const CONTENT = { en, es }

const Ctx = createContext(null)

/** Carries the language, the route id and the rate board (real data fetched at build time) to every component. */
export function PageProvider({ lang, routeId, board, children }) {
  return <Ctx.Provider value={{ lang, routeId, board, t: CONTENT[lang] }}>{children}</Ctx.Provider>
}

export const usePage = () => useContext(Ctx)
