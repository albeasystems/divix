import { useEffect, useState } from 'react'
import { AppleLogo, ArrowUpRight, CaretRight, List, Translate } from '@phosphor-icons/react'
import { APP_URL, CONTACT_EMAIL, PUBLISHER, YEAR } from '../config'
import { usePage } from '../i18n'
import { href, LANGS, LANG_LABEL, hreflang } from '../routes'
import { asset } from '../lib'

export function StoreButton({ children, className = '', id, size = 'lg' }) {
  return (
    <a id={id} href={APP_URL} className={`btn btn-${size} ${className}`} rel="noopener">
      <AppleLogo size={size === 'sm' ? 18 : 22} weight="fill" aria-hidden="true" />
      {children}
    </a>
  )
}

/** Every language but English has its own in-app captures under public/shots/<lang>/; shots missing there fall back to the English ones. */
const LOCALIZED_SHOTS = ['convert', 'markets', 'picker', 'chart', 'bitcoin', 'cryptolist']

/** Real simulator screenshot inside a thin device frame. */
export function Phone({ src, alt, priority = false, className = '', width = 600, height = 1304 }) {
  const { lang } = usePage()
  const dir = lang !== 'en' && LOCALIZED_SHOTS.includes(src) ? `${lang}/` : ''
  return (
    <figure className={`phone ${className}`}>
      <img
        src={asset(`shots/${dir}${src}.webp`)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </figure>
  )
}

/** The CTA in the header only appears once the hero CTA has scrolled out of view on the home page. */
function useHeroCtaGone(enabled) {
  const [gone, setGone] = useState(!enabled)
  useEffect(() => {
    if (!enabled) return
    const el = document.getElementById('hero-cta')
    if (!el || !('IntersectionObserver' in window)) {
      setGone(true)
      return
    }
    const io = new IntersectionObserver(([e]) => setGone(!e.isIntersecting && e.boundingClientRect.top < 0), { rootMargin: '-56px 0px 0px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [enabled])
  return gone
}

/** One link per language, to the same page (or to the home page from the root chooser). */
function LangLinks({ current, routeId }) {
  return LANGS.map((l) => (
    <a key={l} href={href(routeId === 'root' ? 'home' : routeId, l)} hrefLang={hreflang(l)} lang={hreflang(l)} dir="auto" aria-current={l === current ? 'true' : undefined}>
      {LANG_LABEL[l]}
    </a>
  ))
}

export function Nav() {
  const { t, lang, routeId } = usePage()
  const ctaVisible = useHeroCtaGone(routeId === 'home')
  return (
    <header className="sign">
      <div className="wrap sign-row">
        <a className="sign-brand" href={href('home', lang)} aria-label={t.ui.home}>
          <img src={asset('icon-64.png')} width="32" height="32" alt="" />
          <span className="sign-name">Divix</span>
          <span className="sign-tag">{t.ui.sign}</span>
        </a>
        <nav className="sign-nav" aria-label="Main">
          <details className="sign-menu">
            <summary aria-label={t.ui.menu}><List size={24} weight="bold" aria-hidden="true" /></summary>
            <div className="sign-drop">
              <a href={href('home', lang) + '#faq'}>{t.ui.nav.faq}</a>
              <a href={href('guides', lang)}>{t.ui.nav.guides}</a>
              <a href={href('support', lang)}>{t.ui.nav.support}</a>
              <LangLinks current={lang} routeId={routeId} />
            </div>
          </details>
          <a href={href('home', lang) + '#faq'} className="hide-sm">{t.ui.nav.faq}</a>
          <a href={href('guides', lang)} className="hide-sm">{t.ui.nav.guides}</a>
          <a href={href('support', lang)} className="hide-sm">{t.ui.nav.support}</a>
          <details className="lang-menu hide-sm">
            <summary className="sign-lang" aria-label={t.ui.langMenu}>
              <Translate size={16} aria-hidden="true" />
              {LANG_LABEL[lang]}
            </summary>
            <div className="lang-drop">
              <LangLinks current={lang} routeId={routeId} />
            </div>
          </details>
          <a
            href={APP_URL}
            className="sign-cta"
            data-visible={ctaVisible ? 'true' : 'false'}
            tabIndex={ctaVisible ? 0 : -1}
            aria-hidden={ctaVisible ? undefined : true}
          >
            {t.ui.getAppShort}
          </a>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  const { t, lang, routeId } = usePage()
  const f = t.ui.footer
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a className="sign-brand" href={href('home', lang)} aria-label={t.ui.home}>
            <img src={asset('icon-64.png')} width="32" height="32" alt="" />
            <span className="sign-name sign-name-foot">Divix</span>
          </a>
          <p>{t.tagline}</p>
          <a className="foot-store" href={APP_URL} rel="noopener">
            <AppleLogo size={20} weight="fill" aria-hidden="true" />
            {f.appStore}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <nav aria-label={f.learn}>
          <h2 className="foot-h">{f.learn}</h2>
          <ul>
            <li><a href={href('home', lang)}>{f.links.home}</a></li>
            <li><a href={href('guides', lang)}>{f.links.guides}</a></li>
            <li><a href={href('guide-mid-market', lang)}>{t.guide['guide-mid-market'].h1}</a></li>
            <li><a href={href('guide-local-currency', lang)}>{t.guide['guide-local-currency'].h1}</a></li>
          </ul>
        </nav>
        <nav aria-label={f.legal}>
          <h2 className="foot-h">{f.legal}</h2>
          <ul>
            <li><a href={href('support', lang)}>{f.links.support}</a></li>
            <li><a href={href('privacy', lang)}>{f.links.privacy}</a></li>
            <li><a href={href('terms', lang)}>{f.links.terms}</a></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          </ul>
        </nav>
      </div>
      <nav className="wrap foot-langs" aria-label={t.ui.langMenu}>
        <LangLinks current={lang} routeId={routeId} />
      </nav>
      <div className="wrap foot-notice">
        <p>{f.notice}</p>
        <p>
          &copy; {YEAR} {PUBLISHER}. {f.rights.replace(`${PUBLISHER}. `, '')}
        </p>
      </div>
    </footer>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.href}>
            {i < items.length - 1 ? (
              <>
                <a href={it.href}>{it.label}</a>
                <CaretRight size={12} aria-hidden="true" />
              </>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
