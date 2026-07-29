import { useEffect, useState } from 'react'
import { siteConfig } from '../lib/api'

type ServiceStatus = 'OPERATIONAL' | 'PARTIAL_OUTAGE' | 'OUTAGE'

type StatusResponse = {
  status?: ServiceStatus
  checkedAt?: string
  stale?: boolean
  endpoints?: Array<{ name?: string; status?: ServiceStatus }>
}

const labels: Record<ServiceStatus, string> = {
  OPERATIONAL: '服务正常',
  PARTIAL_OUTAGE: '部分故障',
  OUTAGE: '服务异常',
}

export function ServerStatus() {
  const [data, setData] = useState<StatusResponse>()
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function refresh() {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 8_000)
      try {
        const response = await fetch(siteConfig.statusApiUrl, {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Status request failed: ${response.status}`)
        const next = (await response.json()) as StatusResponse
        if (active) {
          setData(next)
          setError(false)
        }
      } catch {
        if (active) setError(true)
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void refresh()
    const interval = window.setInterval(() => void refresh(), 30_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  const status = data?.status
  const label = status ? labels[status] : error ? '暂时无法获取状态' : '正在检查状态'

  return (
    <a className={`server-status ${status ? status.toLowerCase() : ''}`} href={siteConfig.statusPageUrl}>
      <span className="status-dot" aria-hidden="true" />
      <span>
        <strong>{label}</strong>
        {data?.stale && <small>（缓存数据）</small>}
      </span>
    </a>
  )
}
