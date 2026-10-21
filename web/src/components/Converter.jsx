import { useEffect, useState } from 'react'
import { ArrowsDownUp, CaretDown } from '@phosphor-icons/react'
import { usePage } from '../i18n'
import { convert } from '../rates'
import { asset, currencyName, FLAG, fill, fmtDate, fmtMoney, fmtRate } from '../lib'

const OPTIONS = ['EUR', 'USD', 'GBP', 'JPY', 'MXN', 'CAD', 'CHF', 'AUD', 'CNY', 'TRY', 'BRL', 'INR']

function Select({ id, value, onChange, label, locale }) {
  return (
    <label className="conv-select" htmlFor={id}>
      <span className="sr-only">{label}</span>
      <img src={asset(`flags/${FLAG[value]}.svg`)} width="28" height="21" alt="" className="flag" />
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {OPTIONS.map((c) => (
          <option key={c} value={c}>
            {c} {currencyName(c, locale)}
          </option>
        ))}
      </select>
      <CaretDown size={16} aria-hidden="true" className="conv-caret" />
    </label>
  )
}

/** The real mechanism: type an amount, pick two currencies, read the result at today's mid-market rate. */
export default function Converter() {
  const { t, lang, board } = usePage()
  const c = t.home.calc.try
  const initTo = lang === 'en' ? 'EUR' : 'USD'
  const [amount, setAmount] = useState('250')
  const [from, setFrom] = useState(board.base)
  const [to, setTo] = useState(initTo)
  const [quote, setQuote] = useState({ pair: `${board.base}${initTo}`, rate: board.rows.find((r) => r.code === initTo)?.rate ?? null, date: board.date })
  const [status, setStatus] = useState('ready')
  const [turns, setTurns] = useState(0)

  useEffect(() => {
    const pair = `${from}${to}`
    if (quote.pair === pair) return
    let live = true
    setStatus('loading')
    convert(1, from, to).then((q) => {
      if (!live) return
      if (!q) return setStatus('error')
      setQuote({ pair, rate: q.rate, date: q.date })
      setStatus('ready')
    })
    return () => {
      live = false
    }
  }, [from, to, quote.pair])

  const num = Number(amount.replace(/\s/g, '').replace(',', '.'))
  const valid = Number.isFinite(num) && amount.trim() !== ''
  const result = valid && quote.rate != null && quote.pair === `${from}${to}` ? num * quote.rate : null

  const swap = () => {
    setFrom(to)
    setTo(from)
    setTurns((n) => n + 1)
  }

  return (
    <div className="conv" role="group" aria-labelledby="try-h">
      <h3 id="try-h" className="conv-h">
        {c.h}
      </h3>
      <div className="conv-row">
        <Select id="conv-from" value={from} onChange={setFrom} label={c.from} locale={t.locale} />
        <label className="conv-amount" htmlFor="conv-amount">
          <span className="sr-only">{c.amount}</span>
          <input id="conv-amount" inputMode="decimal" autoComplete="off" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
      </div>
      <button type="button" className="conv-swap" onClick={swap} aria-label={c.swap}>
        <ArrowsDownUp size={20} weight="bold" aria-hidden="true" className="conv-swap-icon" style={{ transform: `rotate(${turns * 180}deg)` }} />
      </button>
      <div className="conv-row conv-row-out">
        <Select id="conv-to" value={to} onChange={setTo} label={c.to} locale={t.locale} />
        <p className="conv-result" aria-live="polite" aria-label={c.result}>
          {status === 'error' ? <span className="conv-err">{c.error}</span> : result == null ? <span className="conv-load">{c.loading}</span> : <>{fmtMoney(result, t.locale, to)}</>}
        </p>
      </div>
      <p className="conv-foot">
        {quote.rate != null && quote.pair === `${from}${to}` && (
          <span className="conv-pair">
            1 {from} = {fmtRate(quote.rate, t.locale)} {to}
          </span>
        )}
        <span>{fill(c.source, { date: fmtDate(quote.date, t.locale) })}</span>
      </p>
    </div>
  )
}
