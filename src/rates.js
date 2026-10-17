// Mid-market rates from Frankfurter (public, CORS enabled, no key). Same source the app uses first.
// Works in the browser and in Node (build time), so the prerendered HTML already carries real numbers.
const API = 'https://api.frankfurter.dev/v1'

export const BOARD = {
  en: { base: 'USD', symbols: ['EUR', 'GBP', 'JPY', 'MXN', 'CAD', 'CHF'] },
  es: { base: 'EUR', symbols: ['USD', 'GBP', 'JPY', 'MXN', 'CHF', 'CAD'] },
}

// Last known values (16 Oct 2026), only used when the network call fails. No change figure is shown for them.
const FALLBACK = {
  USD: { date: '2026-10-16', rates: { EUR: 0.88865, GBP: 0.74989, JPY: 158.02, MXN: 18.3835, CAD: 1.4161, CHF: 0.82396 } },
  EUR: { date: '2026-10-16', rates: { USD: 1.1253, GBP: 0.8439, JPY: 177.83, MXN: 20.688, CHF: 0.9272, CAD: 1.5936 } },
}

function isoDaysAgo(days) {
  const d = new Date(Date.now() - days * 86400000)
  return d.toISOString().slice(0, 10)
}

/** Latest rate plus 30-day change for each symbol. Never throws. */
export async function fetchBoard(base, symbols) {
  try {
    const q = `base=${base}&symbols=${symbols.join(',')}`
    const [latest, series] = await Promise.all([
      fetch(`${API}/latest?${q}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
      fetch(`${API}/${isoDaysAgo(30)}..?${q}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    ])
    const days = Object.keys(series.rates).sort()
    const first = series.rates[days[0]]
    return {
      base,
      date: latest.date,
      live: true,
      rows: symbols.map((code) => ({
        code,
        rate: latest.rates[code],
        change: first && first[code] ? ((latest.rates[code] - first[code]) / first[code]) * 100 : 0,
      })),
    }
  } catch {
    const f = FALLBACK[base]
    return {
      base,
      date: f.date,
      live: false,
      rows: symbols.map((code) => ({ code, rate: f.rates[code], change: null })),
    }
  }
}

/** One conversion for the interactive demo. Returns null when the pair is unavailable. */
export async function convert(amount, from, to) {
  if (from === to) return { rate: 1, date: null }
  try {
    const r = await fetch(`${API}/latest?base=${from}&symbols=${to}`).then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    return { rate: r.rates[to], date: r.date }
  } catch {
    return null
  }
}
