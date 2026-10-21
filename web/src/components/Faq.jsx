import { Plus } from '@phosphor-icons/react'

/** Native details/summary: works without JavaScript, keyboard accessible, exclusive via the name attribute. */
export default function Faq({ items, name = 'faq' }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q} name={name} className="faq-item">
          <summary>
            <span>{it.q}</span>
            <Plus size={20} weight="bold" aria-hidden="true" className="faq-plus" />
          </summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  )
}
