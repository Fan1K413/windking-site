export type ContentDocument = {
  id: string
  navLabel: string
  order: number
  title: string
  body: string
  sourcePath: string
}

type Frontmatter = Omit<ContentDocument, 'body' | 'sourcePath'>

function parseDocument(sourcePath: string, raw: string): ContentDocument {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/)
  if (!match) throw new Error(`${sourcePath}: 缺少有效的 YAML frontmatter。`)

  const data = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .filter((line) => line.trim())
      .map((line) => {
        const separator = line.indexOf(':')
        if (separator < 1) throw new Error(`${sourcePath}: frontmatter 格式无效。`)
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()]
      }),
  ) as Partial<Frontmatter>

  const order = Number(data.order)
  if (!data.id || !/^[a-z][a-z0-9-]*$/.test(data.id)) throw new Error(`${sourcePath}: id 必须是 kebab-case。`)
  if (!data.title || !data.navLabel) throw new Error(`${sourcePath}: title 和 navLabel 为必填字段。`)
  if (!Number.isInteger(order) || order < 1) throw new Error(`${sourcePath}: order 必须是正整数。`)

  return { id: data.id, title: data.title, navLabel: data.navLabel, order, body: match[2], sourcePath }
}

const tutorialModules = import.meta.glob('../../content/tutorial-01-*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const tutorials = Object.entries(tutorialModules)
  .map(([sourcePath, raw]) => parseDocument(sourcePath, raw))
  .sort((left, right) => left.order - right.order || left.sourcePath.localeCompare(right.sourcePath))

const ids = new Set<string>()
const orders = new Set<number>()
for (const tutorial of tutorials) {
  if (ids.has(tutorial.id)) throw new Error(`${tutorial.sourcePath}: id “${tutorial.id}” 重复。`)
  if (orders.has(tutorial.order)) throw new Error(`${tutorial.sourcePath}: order “${tutorial.order}” 重复。`)
  ids.add(tutorial.id)
  orders.add(tutorial.order)
}

const faqModules = import.meta.glob('../../content/faq.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
const faqEntry = Object.entries(faqModules)[0]
if (!faqEntry) throw new Error('content/faq.md 缺失。')
export const faq = parseDocument(faqEntry[0], faqEntry[1])
if (faq.id !== 'troubleshooting') throw new Error(`${faq.sourcePath}: FAQ 的 id 必须为 troubleshooting。`)
