import { ArrowRight } from '@phosphor-icons/react'
import { StoreButton, Phone } from '../components/shared'
import RateBoard from '../components/RateBoard'
import Converter from '../components/Converter'
import Faq from '../components/Faq'
import { usePage } from '../i18n'
import { href } from '../routes'
import { asset } from '../lib'

function Hero() {
  const { t, board, lang } = usePage()
  const h = t.home.hero
  // English keeps the original recording; every other language has its own journey built from its own captures.
  const dir = lang === 'en' ? '' : `shots/${lang}/`
  const journey = lang === 'en' ? 'divix-happy-journey.webp' : `${dir}journey.webp`
  return (
    <section className="board hero">
      <div className="wrap hero-copy">
        <h1 className="led-h1" aria-label={h.h1}>
          {h.h1Lines.map((l, i) => (
            <span key={l} className="led-line" aria-hidden="true">{l}{i < h.h1Lines.length - 1 ? ' ' : ''}</span>
          ))}
        </h1>
        <p className="hero-sub">{h.sub}</p>
        <StoreButton id="hero-cta">{t.ui.getApp}</StoreButton>
      </div>
      <div className="wrap hero-stage">
        <RateBoard board={board} />
        <figure className="phone phone-hero">
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet={asset(`${lang === 'en' ? 'shots/' : dir}convert.webp`)} type="image/webp" />
            <source srcSet={asset(journey)} type="image/webp" />
            <img src={asset(lang === 'en' ? 'divix-happy-journey.gif' : journey)} width="360" height="783" alt={h.phoneAlt} fetchPriority="high" decoding="async" />
          </picture>
        </figure>
      </div>
    </section>
  )
}

function Calculator() {
  const { t } = usePage()
  const c = t.home.calc
  return (
    <section className="sec" id="calculator" aria-labelledby="calc-h">
      <div className="wrap calc">
        <Phone src="convert" alt={c.shotAlt} className="calc-phone" />
        <div className="calc-copy">
          <h2 id="calc-h">{c.h2}</h2>
          <p className="lead">{c.p}</p>
          <dl className="points">
            {c.points.map((pt) => (
              <div key={pt.h}>
                <dt>{pt.h}</dt>
                <dd>{pt.p}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="wrap">
        <Converter />
      </div>
    </section>
  )
}

function Markets() {
  const { t } = usePage()
  const m = t.home.markets
  return (
    <section className="sec" aria-labelledby="markets-h">
      <div className="wrap markets">
        <div className="markets-copy">
          <h2 id="markets-h">{m.h2}</h2>
          <p className="lead">{m.p}</p>
          <p>{m.p2}</p>
        </div>
        <div className="markets-shots">
          <Phone src="markets" alt={m.marketsAlt} />
          <Phone src="favorites" alt={m.favoritesAlt} className="shift" />
        </div>
      </div>
    </section>
  )
}

function Crypto() {
  const { t } = usePage()
  const c = t.home.crypto
  return (
    <section className="sec" aria-labelledby="crypto-h">
      <div className="wrap crypto">
        <div className="crypto-shots">
          <Phone src="picker" alt={c.pickerAlt} />
          <Phone src="bitcoin" alt={c.btcAlt} />
        </div>
        <div className="crypto-copy">
          <h2 id="crypto-h">{c.h2}</h2>
          <p className="lead">{c.p}</p>
        </div>
      </div>
    </section>
  )
}

function Charts() {
  const { t } = usePage()
  const c = t.home.charts
  return (
    <section className="sec" aria-labelledby="charts-h">
      <div className="wrap charts">
        <div className="charts-copy">
          <h2 id="charts-h">{c.h2}</h2>
          <p className="lead">{c.p}</p>
          <h3>{c.fresh.h}</h3>
          <ul className="states">
            <li><span className="lamp lamp-live" aria-hidden="true" />{c.fresh.live}</li>
            <li><span className="lamp lamp-cached" aria-hidden="true" />{c.fresh.cached}</li>
            <li><span className="lamp lamp-off" aria-hidden="true" />{c.fresh.offline}</li>
          </ul>
        </div>
        <Phone src="chart" alt={c.alt} className="charts-phone" />
      </div>
    </section>
  )
}

function Checkout() {
  const { t } = usePage()
  const c = t.home.checkout
  return (
    <section className="sec" aria-labelledby="checkout-h">
      <div className="wrap">
        <h2 id="checkout-h">{c.h2}</h2>
        <div className="lightbox">
          {c.items.map((it) => (
            <div key={it.h}>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const { t } = usePage()
  const p = t.home.pricing
  return (
    <section className="board band" aria-labelledby="pricing-h">
      <div className="wrap">
        <h2 id="pricing-h" className="led-h2">{p.h2}</h2>
        <p className="lead">{p.p}</p>
      </div>
    </section>
  )
}

function FaqSection() {
  const { t } = usePage()
  const f = t.home.faq
  return (
    <section className="sec" id="faq" aria-labelledby="faq-h">
      <div className="wrap prose-wide">
        <h2 id="faq-h">{f.h2}</h2>
        <Faq items={f.items} />
      </div>
    </section>
  )
}

export function GuideList({ compact = false }) {
  const { t, lang } = usePage()
  return (
    <ul className="gl">
      {t.guides.ids.map((id) => (
        <li key={id}>
          <a href={href(id, lang)}>
            <span className="gl-title">{t.guide[id].h1}</span>
            {!compact && <span className="gl-sum">{t.guide[id].summary}</span>}
            <ArrowRight size={20} aria-hidden="true" className="gl-arrow" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function Guides() {
  const { t } = usePage()
  const g = t.home.guides
  return (
    <section className="sec" aria-labelledby="guides-h">
      <div className="wrap prose-wide">
        <h2 id="guides-h">{g.h2}</h2>
        <p className="lead">{g.p}</p>
        <GuideList />
      </div>
    </section>
  )
}

function Final() {
  const { t } = usePage()
  const f = t.home.final
  return (
    <section className="board final" aria-labelledby="final-h">
      <div className="wrap">
        <h2 id="final-h" className="led-h2">{f.h2}</h2>
        <p>{f.p}</p>
        <StoreButton>{t.ui.getApp}</StoreButton>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Calculator />
      <Markets />
      <Checkout />
      <Crypto />
      <Charts />
      <Pricing />
      <FaqSection />
      <Guides />
      <Final />
    </main>
  )
}
