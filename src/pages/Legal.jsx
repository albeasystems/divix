import { Breadcrumbs } from '../components/shared'
import Faq from '../components/Faq'
import { usePage } from '../i18n'
import { href } from '../routes'
import { CONTACT_EMAIL } from '../config'

function Prose({ page }) {
  const { t, lang, routeId } = usePage()
  const d = t.legal[page]
  return (
    <main id="main" className="page">
      <article className="wrap prose">
        <Breadcrumbs items={[{ href: href('home', lang), label: t.ui.breadcrumbs.home }, { href: href(routeId, lang), label: d.h1 }]} />
        <h1 className="page-h1">{d.h1}</h1>
        <p className="meta">{t.legal.updatedOn}</p>
        <p className="lead">{d.lead}</p>
        {d.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((para) =>
              para.includes('@') && !para.includes(' ') ? (
                <p key={para}><a href={`mailto:${para}`}>{para}</a></p>
              ) : (
                <p key={para}>{para}</p>
              ),
            )}
          </section>
        ))}
      </article>
    </main>
  )
}

export const Privacy = () => <Prose page="privacy" />
export const Terms = () => <Prose page="terms" />

export function Support() {
  const { t, lang, routeId } = usePage()
  const d = t.legal.support
  return (
    <main id="main" className="page">
      <article className="wrap prose">
        <Breadcrumbs items={[{ href: href('home', lang), label: t.ui.breadcrumbs.home }, { href: href(routeId, lang), label: d.h1 }]} />
        <h1 className="page-h1">{d.h1}</h1>
        <p className="lead">{d.lead}</p>
        <Faq items={d.items} name="support-faq" />
        <section>
          <h2>{d.contactH}</h2>
          <p>{d.contactP}</p>
          <p>
            <a className="btn btn-lg" href={`mailto:${CONTACT_EMAIL}?subject=Divix`}>{d.contactCta}</a>
          </p>
        </section>
      </article>
    </main>
  )
}
