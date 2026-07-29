import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const configuredBase = loadEnv(mode, '.', 'VITE_').VITE_BASE_PATH ?? '/'
  const normalizedBase = configuredBase.replaceAll('\\', '/')
  const base = normalizedBase.startsWith('/') ? normalizedBase.endsWith('/') ? normalizedBase : `${normalizedBase}/` : '/'
  return { base, plugins: [react()] }
})
