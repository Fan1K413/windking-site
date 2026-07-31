export type Layout = 'register' | 'install' | 'login' | 'faq'
export type ContentDocument = { id: string; navLabel: string; order: number; title: string; layout: Layout; body: string; sourcePath: string }
type Frontmatter = Omit<ContentDocument, 'body' | 'sourcePath'>

function parseDocument(sourcePath: string, raw: string): ContentDocument {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/)
  if (!match) throw new Error(`${sourcePath}: 缺少有效的 YAML frontmatter。`)
  const data = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map((line) => {
    const index = line.indexOf(':')
    if (index < 1) throw new Error(`${sourcePath}: frontmatter 第 ${line} 行无效。`)
    return [line.slice(0, index).trim(), line.slice(index + 1).trim()]
  })) as Partial<Frontmatter>
  const order = Number(data.order)
  if (!data.id || !/^[a-z][a-z0-9-]*$/.test(data.id)) throw new Error(`${sourcePath}: id 必须是 kebab-case。`)
  if (!data.title || !data.navLabel || !data.layout) throw new Error(`${sourcePath}: title、navLabel 和 layout 为必填字段。`)
  if (!['register', 'install', 'login', 'faq'].includes(data.layout)) throw new Error(`${sourcePath}: layout 无效。`)
  if (!Number.isInteger(order) || order < 1) throw new Error(`${sourcePath}: order 必须是正整数。`)
  return { id: data.id, title: data.title, navLabel: data.navLabel, layout: data.layout, order, body: match[2], sourcePath }
}

const tutorialModules = import.meta.glob('../../content/tutorial-01-*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
export const tutorials = Object.entries(tutorialModules).map(([path, raw]) => parseDocument(path, raw)).sort((a, b) => a.order - b.order || a.sourcePath.localeCompare(b.sourcePath))
const ids = new Set<string>(), orders = new Set<number>()
for (const tutorial of tutorials) {
  if (ids.has(tutorial.id) || orders.has(tutorial.order)) throw new Error(`${tutorial.sourcePath}: id 或 order 重复。`)
  ids.add(tutorial.id); orders.add(tutorial.order)
}
const faqModules = import.meta.glob('../../content/faq.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
const faqEntry = Object.entries(faqModules)[0]
if (!faqEntry) throw new Error('content/faq.md 缺失。')
export const faq = parseDocument(faqEntry[0], faqEntry[1])
if (faq.id !== 'troubleshooting' || faq.layout !== 'faq') throw new Error(`${faq.sourcePath}: FAQ 必须使用 id troubleshooting 和 layout faq。`)
