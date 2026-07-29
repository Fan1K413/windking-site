import { faq, tutorials } from '../content'

export function GuideNavigation() {
  return (
    <aside className="toc" aria-label="本页目录">
      <p>本页目录</p>
      {tutorials.map((tutorial, index) => (
        <a href={`#${tutorial.id}`} key={tutorial.id}>
          <span>{String(index + 1).padStart(2, '0')}</span>{tutorial.navLabel}
        </a>
      ))}
      <a href={`#${faq.id}`}><span>FAQ</span>{faq.navLabel}</a>
    </aside>
  )
}
