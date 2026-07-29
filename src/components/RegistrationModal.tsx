import { useEffect, useRef, useState, type FormEvent } from 'react'
import { siteConfig } from '../lib/api'

type Props = { open: boolean; onClose: () => void }
type FormState = { username: string; uid: string; email: string; password: string; passwordConfirm: string }

const initialForm: FormState = { username: '', uid: '', email: '', password: '', passwordConfirm: '' }

export function RegistrationModal({ open, onClose }: Props) {
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previousFocus.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialog.current) return
      const focusable = dialog.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href]',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus.current?.focus()
    }
  }, [onClose, open])

  if (!open) return null

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function clearPasswords() {
    setForm((current) => ({ ...current, password: '', passwordConfirm: '' }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    if (!form.username || !form.uid || !form.password || !form.passwordConfirm) {
      setMessage('请填写所有必填项。')
      return
    }
    if (!/^\d+$/.test(form.uid)) {
      setMessage('Bilibili UID 必须是纯数字。')
      return
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage('请输入有效的邮箱地址。')
      return
    }
    if (form.password !== form.passwordConfirm) {
      setMessage('两次输入的密码不一致。')
      clearPasswords()
      return
    }

    setSubmitting(true)
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12_000)
    try {
      const body = new URLSearchParams({
        username: form.username,
        uid: form.uid,
        email: form.email,
        password: form.password,
        password_confirm: form.passwordConfirm,
      })
      const response = await fetch(siteConfig.registrationApiUrl, {
        method: 'POST',
        body,
        credentials: 'omit',
        signal: controller.signal,
      })
      const data = (await response.json()) as { ok?: boolean; message?: string }
      if (!response.ok || !data.ok) throw new Error(data.message || '注册请求未成功')
      setMessage('注册成功，请返回游戏内登录。')
      clearPasswords()
    } catch (error) {
      setMessage(error instanceof Error && error.name === 'AbortError' ? '请求超时，请稍后重试。' : '注册暂时不可用，请稍后重试或访问外部注册页。')
      clearPasswords()
    } finally {
      window.clearTimeout(timeout)
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div aria-labelledby="registration-title" aria-modal="true" className="modal" ref={dialog} role="dialog" tabIndex={-1}>
        <button aria-label="关闭注册窗口" className="close-button" type="button" onClick={onClose}>×</button>
        <p className="eyebrow">WINDKING ACCOUNT</p>
        <h2 id="registration-title">注册舰长服账号</h2>
        <p>密码只会提交到注册服务，请勿使用其他重要账号的密码。</p>
        <form onSubmit={(event) => void submit(event)}>
          <label>Minecraft 用户名<input autoComplete="username" required value={form.username} onChange={(event) => update('username', event.target.value)} /></label>
          <label>Bilibili 数字 UID<input inputMode="numeric" required value={form.uid} onChange={(event) => update('uid', event.target.value)} /></label>
          <label>邮箱（可选）<input autoComplete="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label>
          <label>密码<input autoComplete="new-password" required type="password" value={form.password} onChange={(event) => update('password', event.target.value)} /></label>
          <label>确认密码<input autoComplete="new-password" required type="password" value={form.passwordConfirm} onChange={(event) => update('passwordConfirm', event.target.value)} /></label>
          {message && <p aria-live="polite" className="form-message">{message}</p>}
          <button className="button button-primary" disabled={submitting} type="submit">{submitting ? '正在提交…' : '提交注册'}</button>
        </form>
        <a className="text-link" href={siteConfig.registrationPageUrl}>前往外部注册页</a>
      </div>
    </div>
  )
}
