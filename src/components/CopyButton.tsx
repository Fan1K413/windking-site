import { useState } from 'react'

export function CopyButton({ value }: { value: string }) {
  const [label, setLabel] = useState('复制服务器地址')

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
        const succeeded = document.execCommand('copy')
        field.remove()
        if (!succeeded) throw new Error('copy failed')
      }
      setLabel('已复制')
    } catch {
      setLabel('复制失败')
    }
    window.setTimeout(() => setLabel('复制服务器地址'), 2_000)
  }

  return <button type="button" onClick={() => void copy()}>{label}</button>
}
