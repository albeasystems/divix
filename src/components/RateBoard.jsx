import { ArrowDownRight, ArrowUpRight } from '@phosphor-icons/react'
import { usePage } from '../i18n'
import { asset, FLAG, fill, fmtChange, fmtDate, fmtRate } from '../lib'

/** The hero's rate board: real mid-market rates, fetched at build time and refreshed in the browser. */
export default function RateBoard({ board }) {
  const { t } = usePage()
  const h = t.home.hero
  return (
    <section className="rates" aria-label={`${h.boardTitle} ${board.base}`}>
      <div className="rates-head">
        <h2 className="rates-title">
          {h.boardTitle} <span className="rates-base">1 {board.base}</span>
        </h2>
        <p className="rates-note">{board.live ? `${h.boardNote} ${fmtDate(board.date, t.locale)}` : fill(h.boardFallback, { date: fmtDate(board.date, t.locale) })}</p>
      </div>
      <ul className="rates-grid" role="list">
        {board.rows.map((r, i) => {
          const up = r.change > 0
          const flat = r.change === null || r.change === 0
          return (
            <li key={r.code} className="rate" style={{ '--i': i }}>
              <div className="rate-id">
                <img src={asset(`flags/${FLAG[r.code]}.svg`)} width="24" height="18" alt="" className="flag" />
                <span className="rate-code">{r.code}</span>
              </div>
              <span className="rate-val">{fmtRate(r.rate, t.locale)}</span>
              {r.change !== null && (
                <span className={`rate-chg ${flat ? '' : up ? 'up' : 'down'}`}>
                  {!flat && (up ? <ArrowUpRight size={14} weight="bold" aria-hidden="true" /> : <ArrowDownRight size={14} weight="bold" aria-hidden="true" />)}
                  {fmtChange(r.change, t.locale)}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
