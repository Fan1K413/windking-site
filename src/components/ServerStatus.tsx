import { useEffect, useState } from 'react'
import { siteConfig } from '../lib/api'

type Status = 'OPERATIONAL' | 'PARTIAL_OUTAGE' | 'OUTAGE'
type Response = { status?: Status; checkedAt?: string; stale?: boolean }

const statusClass: Record<Status, string> = {
  OPERATIONAL: 'status-operational',
  PARTIAL_OUTAGE: 'status-partial-outage',
  OUTAGE: 'status-outage',
}

const statusLabel: Record<Status, string> = {
  OPERATIONAL: '服务器运行正常',
  PARTIAL_OUTAGE: '服务器部分故障',
  OUTAGE: '服务器暂不可用',
}

export function ServerStatus() {
  const [data, setData] = useState<Response>()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let mounted = true
    async function refresh() {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 8_000)
      try {
        const response = await fetch(siteConfig.statusApiUrl, { headers: { Accept: 'application/json' }, cache: 'no-store', signal: controller.signal })
        if (!response.ok) throw new Error('状态请求失败')
        const next = await response.json() as Response
        if (mounted) { setData(next); setFailed(false) }
      } catch { if (mounted) setFailed(true) } finally { window.clearTimeout(timeout) }
    }
    void refresh()
    const timer = window.setInterval(() => void refresh(), 30_000)
    return () => { mounted = false; window.clearInterval(timer) }
  }, [])

  const status = data?.status
  const label = status ? statusLabel[status] : failed ? '暂时无法获取状态' : '正在检查服务器状态'
  return (
    <a className={`brand-status-link ${status ? statusClass[status] : ''}`} href={siteConfig.statusPageUrl}>
      <span className="status-dot" aria-hidden="true" />
      <span className="status-tooltip">{label}{data?.stale ? '（缓存）' : ''}</span>
    </a>
  )
}
