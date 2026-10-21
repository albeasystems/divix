/** Site-relative URL for a file in /public, honouring the Vite base. */
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')

export const FLAG = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', MXN: 'mx', CAD: 'ca', CHF: 'ch', AUD: 'au', CNY: 'cn', TRY: 'tr', BRL: 'br', INR: 'in',
}

/** 5 significant digits keeps 0.88865, 18.384 and 158.02 readable in any locale. */
export function fmtRate(value, locale) {
  return new Intl.NumberFormat(locale, { maximumSignificantDigits: 5 }).format(value)
}

export function fmtMoney(value, locale, code) {
  const digits = code === 'JPY' ? 0 : 2
  return new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
}

export function fmtChange(pct, locale) {
  return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' }).format(pct / 100)
}

export function fmtDate(iso, locale) {
  if (!iso) return ''
  return new Date(iso + 'T12:00:00Z').toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function currencyName(code, locale) {
  try {
    return new Intl.DisplayNames([locale], { type: 'currency' }).of(code)
  } catch {
    return code
  }
}

export const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
