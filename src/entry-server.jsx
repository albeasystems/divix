import { renderToString } from 'react-dom/server'
import App from './App'
import { headHtml } from './seo'
import * as artifactsMod from './artifacts'
import { BOARD, fetchBoard } from './rates'
import { LANGS, ROUTES, url } from './routes'

export function render({ routeId, lang, board }) {
  return {
    html: renderToString(<App routeId={routeId} lang={lang} board={board} />),
    head: headHtml(routeId, lang),
  }
}

export const artifacts = artifactsMod
export const routes = { list: ROUTES, langs: LANGS, urlFor: (id, lang) => new URL(url(id, lang)).pathname }
export const boards = { en: () => fetchBoard(BOARD.en.base, BOARD.en.symbols), es: () => fetchBoard(BOARD.es.base, BOARD.es.symbols) }
