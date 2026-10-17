import { PageProvider } from './i18n'
import { Footer, Nav } from './components/shared'
import Home from './pages/Home'
import Root from './pages/Root'
import { GuideArticle, GuidesIndex } from './pages/Guides'
import { Privacy, Support, Terms } from './pages/Legal'

const PAGES = {
  root: Root,
  home: Home,
  guides: GuidesIndex,
  'guide-mid-market': GuideArticle,
  'guide-local-currency': GuideArticle,
  'guide-travel': GuideArticle,
  privacy: Privacy,
  terms: Terms,
  support: Support,
}

export default function App({ routeId, lang, board }) {
  const Page = PAGES[routeId] || Root
  return (
    <PageProvider lang={lang} routeId={routeId} board={board}>
      <a href="#main" className="skip">{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
      <Nav />
      <Page />
      <Footer />
    </PageProvider>
  )
}
