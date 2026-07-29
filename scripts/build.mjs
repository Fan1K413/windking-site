import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'

const base = process.env.VITE_BASE_PATH ?? '/'
const normalizedBase = base.startsWith('/') ? base.replace(/\/+$/, '/') : '/'

await rm('dist', { recursive: true, force: true })
await mkdir('dist', { recursive: true })
await cp('public', 'dist', { recursive: true })

const indexPath = 'dist/index.html'
const index = await readFile(indexPath, 'utf8')
const withBase = index
  .replaceAll('href="/favicon.svg"', `href="${normalizedBase}favicon.svg"`)
  .replaceAll('src="/assets/', `src="${normalizedBase}assets/`)
  .replaceAll('href="/assets/', `href="${normalizedBase}assets/`)
await writeFile(indexPath, withBase)
