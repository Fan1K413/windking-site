import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import { faq, tutorials, type ContentDocument } from '../content'
import { resolveContentUrl } from '../lib/paths'

function MarkdownBody({ document }: { document: ContentDocument }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeSanitize]}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h3>{children}</h3>,
        h2: ({ children }) => <h3>{children}</h3>,
        a: ({ href = '', children, ...props }) => <a href={resolveContentUrl(href)} {...props}>{children}</a>,
        img: ({ src = '', alt = '', ...props }) => <img alt={alt} src={resolveContentUrl(src)} {...props} />,
      }}
    >
      {document.body}
    </ReactMarkdown>
  )
}

export function GuideRenderer() {
  return (
    <article className="tutorial-content">
      {tutorials.map((tutorial, index) => (
        <section className="tutorial-step" id={tutorial.id} key={tutorial.id}>
          <p className="step-label">STEP {String(index + 1).padStart(2, '0')}</p>
          <h2>{tutorial.title}</h2>
          <MarkdownBody document={tutorial} />
        </section>
      ))}
      <section className="tutorial-step troubleshooting" id={faq.id}>
        <p className="step-label">SHOOTING</p>
        <h2>{faq.title}</h2>
        <MarkdownBody document={faq} />
      </section>
    </article>
  )
}
