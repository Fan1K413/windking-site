import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import guide from '../content/guide.md?raw'
import { resolveContentUrl } from '../lib/paths'

const headingIds: Record<string, string> = {
  '注册舰长服账号': 'register',
  '安装游戏与整合包': 'install',
  '登录服务器': 'login',
  '常见问题': 'troubleshooting',
}

export function GuideRenderer() {
  return (
    <article className="guide prose">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }) => <h2 id={headingIds[String(children)]} {...props}>{children}</h2>,
          a: ({ href = '', children, ...props }) => (
            <a href={resolveContentUrl(href)} {...props}>{children}</a>
          ),
          img: ({ src = '', alt = '', ...props }) => (
            <img alt={alt} src={resolveContentUrl(src)} {...props} />
          ),
        }}
      >
        {guide.replace(/ \{#[^}]+\}/g, '')}
      </ReactMarkdown>
    </article>
  )
}
