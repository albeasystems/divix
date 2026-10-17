import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/doto/full.css'
import '@fontsource-variable/hanken-grotesk/wght.css'
import './styles.css'
import App from './App'
import { BOARD, fetchBoard } from './rates'
import { match } from './routes'

const root = document.getElementById('root')
const { route, lang } = match(location.pathname)
const data = document.getElementById('board-data')
const lng = root.dataset.lang || lang
const rid = root.dataset.route || route.id

async function boot() {
  let board = data ? JSON.parse(data.textContent) : null
  if (!board && rid === 'home') board = await fetchBoard(BOARD[lng].base, BOARD[lng].symbols)
  const tree = (b) => (
    <StrictMode>
      <App routeId={rid} lang={lng} board={b} />
    </StrictMode>
  )
  if (root.hasChildNodes()) hydrateRoot(root, tree(board))
  else createRoot(root).render(tree(board))
}

boot()
