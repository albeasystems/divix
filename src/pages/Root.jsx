import { href, hreflang, LANGS, LANG_LABEL } from '../routes'
import { asset } from '../lib'

/** Language chooser at the site root. A tiny script in index.html redirects by browser language. */
export default function Root() {
  return (
    <main id="main" className="board root">
      <div className="wrap">
        <img src={asset('icon-512.png')} width="96" height="96" alt="" className="root-icon" />
        <h1 className="led-h1">Divix</h1>
        <p className="hero-sub">Currency converter and calculator for iPhone. Conversor de divisas y calculadora para iPhone.</p>
        <p className="root-links">
          {LANGS.map((l) => (
            <a key={l} className="btn btn-lg" href={href('home', l)} hrefLang={hreflang(l)} lang={hreflang(l)}>{LANG_LABEL[l]}</a>
          ))}
        </p>
      </div>
    </main>
  )
}
