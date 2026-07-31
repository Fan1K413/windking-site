import { faq, tutorials } from '../content'
import { GuideBlocks } from './GuideBlocks'

export function GuideRenderer() {
  return (
    <article className="tutorial-content">
      {tutorials.map((tutorial, index) => (
        <section className="tutorial-step" id={tutorial.id} key={tutorial.id}>
          <p className="step-label">STEP {String(index + 1).padStart(2, '0')}</p>
          <h2>{tutorial.title}</h2>
          <GuideBlocks document={tutorial} />
        </section>
      ))}
      <section className="tutorial-step troubleshooting" id={faq.id}>
        <p className="step-label">SHOOTING</p>
        <h2>{faq.title}</h2>
        <GuideBlocks document={faq} />
      </section>
    </article>
  )
}
