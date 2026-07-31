import { useState } from 'react'

type Variant = 'hero' | 'quick' | 'inline'

export function CopyButton({ value, variant = 'hero' }: { value: string; variant?: Variant }) {
  const [copied, setCopied] = useState(false)
  const labels = variant === 'quick' ? ['复制', '已复制'] : variant === 'inline' ? ['复制地址', '已复制'] : ['复制服务器地址', '已复制']

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value)
      else {
        const field = document.createElement('textarea')
        field.value = value
        field.style.position = 'fixed'
        field.style.opacity = '0'
        document.body.append(field)
        field.select()
        const success = document.execCommand('copy')
        field.remove()
        if (!success) throw new Error('copy failed')
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2_000)
    } catch {
      setCopied(false)
    }
  }

  const className = variant === 'hero' ? 'button button-secondary' : variant === 'inline' ? 'inline-copy' : undefined
  return <button className={className} type="button" onClick={() => void copy()}>{copied ? labels[1] : labels[0]}</button>
}
