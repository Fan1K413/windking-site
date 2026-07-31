import { useEffect, useRef, useState, type FormEvent } from 'react'
import { siteConfig } from '../lib/api'

type Props = { open: boolean; onClose: () => void }
type FormState = { username: string; uid: string; email: string; password: string; passwordConfirm: string }
const empty: FormState = { username: '', uid: '', email: '', password: '', passwordConfirm: '' }

export function RegistrationModal({ open, onClose }: Props) {
  const [form, setForm] = useState(empty)
  const [result, setResult] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previousFocus.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.focus()
    function onKey(event: KeyboardEvent) { if (event.key === 'Escape' && !submitting) onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = originalOverflow; document.removeEventListener('keydown', onKey); previousFocus.current?.focus() }
  }, [onClose, open, submitting])

  if (!open) return null
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const clearPasswords = () => setForm((current) => ({ ...current, password: '', passwordConfirm: '' }))

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setResult('')
    if (!form.username || !form.uid || !form.password || !form.passwordConfirm) { setResult('请填写所有必填项。'); return }
    if (!/^\d+$/.test(form.uid)) { setResult('Bilibili UID 必须是纯数字。'); return }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setResult('请输入有效的邮箱地址。'); return }
    if (form.password !== form.passwordConfirm) { setResult('两次输入的密码不一致。'); clearPasswords(); return }
    setSubmitting(true)
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 12_000)
    try {
      const body = new URLSearchParams({ username: form.username, uid: form.uid, email: form.email, password: form.password, password_confirm: form.passwordConfirm })
      const response = await fetch(siteConfig.registrationApiUrl, { method: 'POST', body, credentials: 'omit', signal: controller.signal })
      const data = await response.json() as { ok?: boolean; message?: string }
      if (!response.ok || !data.ok) throw new Error(data.message)
      clearPasswords(); setSuccess(true)
    } catch {
      clearPasswords(); setResult('注册暂时不可用，请稍后重试或使用外部注册页。')
    } finally { window.clearTimeout(timeout); setSubmitting(false) }
  }

  return (
    <div className="registration-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && !submitting && onClose()}>
      <div aria-labelledby="registration-title" aria-modal="true" className="registration-dialog" ref={dialog} role="dialog" tabIndex={-1}>
        {success ? <div className="registration-success"><div className="registration-success-mark">✓</div><h3>注册成功</h3><p>请使用刚设置的密码进入游戏并完成登录验证。</p><div className="registration-success-address"><span>服务器地址</span><strong>{siteConfig.serverAddress}</strong></div><div className="registration-actions"><button className="button button-primary" type="button" onClick={onClose}>完成</button></div></div> : <>
          <div className="registration-dialog-head"><div><p>CAPTAIN REGISTRATION</p><h2 id="registration-title">舰长注册</h2><span>填写信息后即可创建服务器登录账号。</span></div><button aria-label="关闭注册窗口" className="registration-close" disabled={submitting} type="button" onClick={onClose}>×</button></div>
          <form className="registration-form" onSubmit={(event) => void submit(event)}><div className="registration-grid">
            <label className="registration-field"><span>Minecraft 用户名<b>必填</b></span><input autoComplete="username" required value={form.username} onChange={(event) => update('username', event.target.value)} /><small>进入服务器时使用的游戏名。</small></label>
            <label className="registration-field"><span>Bilibili 数字 UID<b>必填</b></span><input inputMode="numeric" required value={form.uid} onChange={(event) => update('uid', event.target.value)} /><small>请填写纯数字 UID。</small></label>
            <label className="registration-field registration-field-wide"><span>邮箱<i>可选</i></span><input autoComplete="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label>
            <label className="registration-field"><span>密码<b>必填</b></span><input autoComplete="new-password" required type="password" value={form.password} onChange={(event) => update('password', event.target.value)} /></label>
            <label className="registration-field"><span>确认密码<b>必填</b></span><input autoComplete="new-password" required type="password" value={form.passwordConfirm} onChange={(event) => update('passwordConfirm', event.target.value)} /></label>
          </div><p className="registration-security-note">请不要使用 Bilibili、邮箱或其他重要账号的密码。</p>{result && <p aria-live="polite" className="registration-result registration-result-error">{result}<a href={siteConfig.registrationPageUrl}>前往外部注册页</a></p>}<div className="registration-actions"><button className="button button-secondary" disabled={submitting} type="button" onClick={onClose}>取消</button><button className="button button-primary" disabled={submitting} type="submit">{submitting ? '提交中…' : '提交注册'}</button></div></form>
        </>}
      </div>
    </div>
  )
}
