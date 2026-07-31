import { faq, tutorials } from '../content'

export function GuideNavigation() {
  return (
    <aside className="toc" aria-label="本页目录">
      <p>本页目录</p>
      {tutorials.map((tutorial, index) => (
        <a href={`#${tutorial.id}`} key={tutorial.id}>{index + 1}. {tutorial.navLabel}</a>
      ))}
      <a href={`#${faq.id}`}>{faq.navLabel}</a>
    </aside>
  )
}
