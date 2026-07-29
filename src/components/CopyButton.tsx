import { useState } from 'react'

export function CopyButton({ value }: { value: string }) {
  const [message, setMessage] = useState('复制服务器地址')

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const input = document.createElement('textarea')
        input.value = value
        input.style.position = 'fixed'
        input.style.opacity = '0'
        document.body.append(input)
        input.select()
        const succeeded = document.execCommand('copy')
        input.remove()
        if (!succeeded) throw new Error('Copy command failed')
      }
      setMessage('已复制！')
    } catch {
      setMessage('复制失败，请手动复制')
    }
    window.setTimeout(() => setMessage('复制服务器地址'), 2_500)
  }

  return (
    <button className="button button-secondary" type="button" onClick={() => void copy()}>
      {message}
    </button>
  )
}
