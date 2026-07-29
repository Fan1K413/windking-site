import { useId, useState, type ReactNode } from 'react'

export function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <section className="accordion">
      <h3>
        <button aria-controls={id} aria-expanded={open} type="button" onClick={() => setOpen(!open)}>
          {title}
          <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </h3>
      <div hidden={!open} id={id}>
        {children}
      </div>
    </section>
  )
}
