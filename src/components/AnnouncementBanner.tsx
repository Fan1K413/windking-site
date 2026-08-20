import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import { announcement } from '../content'
import { resolveContentUrl } from '../lib/paths'

export function AnnouncementBanner() {
  if (!announcement) return null

  return (
    <aside className="announcement-banner" role="alert">
      <div>
        <strong>公告</strong>
        <ReactMarkdown
          rehypePlugins={[rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href = '', children, ...props }) => (
              <a href={resolveContentUrl(href)} {...(/^(https?:)/.test(href) ? { rel: 'noreferrer', target: '_blank' } : {})} {...props}>{children}</a>
            ),
          }}
        >
          {announcement}
        </ReactMarkdown>
      </div>
    </aside>
  )
}
