import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'

await rm('dist', { recursive: true, force: true })
await mkdir('dist', { recursive: true })
await cp('public', 'dist', { recursive: true })

const indexPath = 'dist/index.html'
const index = await readFile(indexPath, 'utf8')
await writeFile(
  indexPath,
  index
    .replace('href="/favicon.svg"', 'href="./favicon.svg"')
    .replace('src="/assets/index-4r9nLhkC.js"', 'src="./assets/index-4r9nLhkC.js"')
    .replace('href="/assets/index-B-3b_oxy.css"', 'href="./assets/index-B-3b_oxy.css"'),
)

const bundlePath = 'dist/assets/index-4r9nLhkC.js'
const bundle = await readFile(bundlePath, 'utf8')
const pageRelativeBundle = bundle
  .replaceAll('"/feng-avatar.jpg"', '"feng-avatar.jpg"')
  .replaceAll('"/authme-login-screen.png"', '"authme-login-screen.png"')
  .replaceAll('"/tutorial/multiplayer-server-list.png"', '"tutorial/multiplayer-server-list.png"')
  .replaceAll('"/tutorial/official-launcher-select-windrealm.png"', '"tutorial/official-launcher-select-windrealm.png"')
  .replaceAll('"/downloads/WindRealm-official-launcher-installer-windows-v2.0.1.zip"', '"downloads/WindRealm-official-launcher-installer-windows-v2.0.1.zip"')
  .replaceAll('"/downloads/WindRealm-26.2.mrpack"', '"downloads/WindRealm-26.2.mrpack"')
await writeFile(bundlePath, pageRelativeBundle)
