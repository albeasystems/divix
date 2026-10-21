import { StoreButton, Breadcrumbs } from '../components/shared'
import Faq from '../components/Faq'
import { GuideList } from './Home'
import { usePage } from '../i18n'
import { href } from '../routes'
import { fmtDate } from '../lib'
import { PUBLISHER, SITE_MODIFIED } from '../config'

export function GuidesIndex() {
  const { t, lang } = usePage()
  const g = t.guides
  return (
    <main id="main" className="page">
      <div className="wrap prose-wide">
        <Breadcrumbs items={[{ href: href('home', lang), label: t.ui.breadcrumbs.home }, { href: href('guides', lang), label: t.ui.breadcrumbs.guides }]} />
        <h1 className="page-h1">{g.h1}</h1>
        <p className="lead">{g.intro}</p>
        <GuideList />
      </div>
    </main>
  )
}

export function GuideArticle() {
  const { t, lang, routeId } = usePage()
  const g = t.guide[routeId]
  return (
    <main id="main" className="page">
      <article className="wrap prose">
        <Breadcrumbs
          items={[
            { href: href('home', lang), label: t.ui.breadcrumbs.home },
            { href: href('guides', lang), label: t.ui.breadcrumbs.guides },
            { href: href(routeId, lang), label: g.h1 },
          ]}
        />
        <h1 className="page-h1">{g.h1}</h1>
        <p className="meta">
          {t.ui.by} {PUBLISHER}. {t.ui.updated} <time dateTime={SITE_MODIFIED}>{fmtDate(SITE_MODIFIED, t.locale)}</time>
        </p>
        <p className="lead">{g.lead}</p>
        {g.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p?.map((para) => <p key={para}>{para}</p>)}
            {s.list && (
              <ul className="ticks">
                {s.list.map((li) => <li key={li}>{li}</li>)}
              </ul>
            )}
            {s.after && <p>{s.after}</p>}
          </section>
        ))}
        <section>
          <h2>FAQ</h2>
          <Faq items={g.faq} name="guide-faq" />
        </section>
        <nav className="related" aria-label={t.ui.related}>
          <h2>{t.ui.related}</h2>
          <ul className="gl">
            {t.guides.ids.filter((id) => id !== routeId).map((id) => (
              <li key={id}>
                <a href={href(id, lang)}>
                  <span className="gl-title">{t.guide[id].h1}</span>
                  <span className="gl-sum">{t.guide[id].summary}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <aside className="guide-cta">
          <p>{t.ui.ctaGuide}</p>
          <StoreButton>{t.ui.getApp}</StoreButton>
          <a className="back" href={href('guides', lang)}>{t.ui.backToGuides}</a>
        </aside>
      </article>
    </main>
  )
}
