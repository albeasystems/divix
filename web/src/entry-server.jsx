import { renderToString } from 'react-dom/server'
import { loadContent } from './i18n'
import App from './App'
import { headHtml } from './seo'
import * as artifactsMod from './artifacts'
import { BOARD, fetchBoard } from './rates'
import { LANGS, ROUTES, url } from './routes'

// The prerender needs every language in memory.
await Promise.all(LANGS.map(loadContent))

export function render({ routeId, lang, board }) {
  return {
    html: renderToString(<App routeId={routeId} lang={lang} board={board} />),
    head: headHtml(routeId, lang),
  }
}

export const artifacts = artifactsMod
export const routes = { list: ROUTES, langs: LANGS, urlFor: (id, lang) => new URL(url(id, lang)).pathname }
export const boards = Object.fromEntries(LANGS.map((l) => [l, () => fetchBoard(BOARD[l].base, BOARD[l].symbols)]))
