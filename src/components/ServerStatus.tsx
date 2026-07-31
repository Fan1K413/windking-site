import { useEffect, useId, useState } from 'react'
import { siteConfig } from '../lib/api'

type Status = 'OPERATIONAL' | 'PARTIAL_OUTAGE' | 'OUTAGE'
type EndpointStatuses = { java?: Status | null; bedrock?: Status | null }
type StatusResponse = { status?: unknown; checkedAt?: unknown; stale?: unknown; endpoints?: unknown }
type StatusData = { status: Status; checkedAt?: string; stale: boolean; endpoints: EndpointStatuses }

const labels: Record<Status, string> = {
  OPERATIONAL: '运行正常',
  PARTIAL_OUTAGE: '部分故障',
  OUTAGE: '暂不可用',
}

function isStatus(value: unknown): value is Status {
  return value === 'OPERATIONAL' || value === 'PARTIAL_OUTAGE' || value === 'OUTAGE'
}

function normalize(response: StatusResponse): StatusData {
  if (!isStatus(response.status)) throw new Error('Unknown overall status')
  const endpoints = typeof response.endpoints === 'object' && response.endpoints !== null ? response.endpoints as Record<string, unknown> : {}
  return {
    status: response.status,
    checkedAt: typeof response.checkedAt === 'string' ? response.checkedAt : undefined,
    stale: response.stale === true,
    endpoints: {
      java: isStatus(endpoints.java) ? endpoints.java : null,
      bedrock: isStatus(endpoints.bedrock) ? endpoints.bedrock : null,
    },
  }
}

export function ServerStatus() {
  const [data, setData] = useState<StatusData>()
  const [failed, setFailed] = useState(false)
  const tooltipId = useId()

  useEffect(() => {
    let mounted = true
    async function refresh() {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 8_000)
      try {
        const response = await fetch(siteConfig.statusApiUrl, { headers: { Accept: 'application/json' }, cache: 'no-store', signal: controller.signal })
        if (!response.ok) throw new Error(`Status request failed: ${response.status}`)
        const next = normalize(await response.json() as StatusResponse)
        if (mounted) { setData(next); setFailed(false) }
      } catch {
        if (mounted) setFailed(true)
      } finally {
        window.clearTimeout(timeout)
      }
    }
    void refresh()
    const timer = window.setInterval(() => void refresh(), 30_000)
    return () => { mounted = false; window.clearInterval(timer) }
  }, [])

  const label = data ? `整体：${labels[data.status]}` : failed ? '整体：暂时无法获取状态' : '整体：正在检查服务器状态'
  const checkedAt = data?.checkedAt && !Number.isNaN(new Date(data.checkedAt).valueOf())
    ? new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(data.checkedAt))
    : undefined

  return (
    <a
      aria-describedby={tooltipId}
      aria-label={label}
      className="brand-status-link"
      href={siteConfig.statusPageUrl}
      rel="noreferrer"
      target="_blank"
    >
      <span className={`status-dot ${data ? `status-${data.status.toLowerCase().replace('_', '-')}` : ''}`} aria-hidden="true" />
      <span className="status-tooltip" id={tooltipId} role="tooltip">
        <strong>{label}</strong>
        {data?.endpoints.java && <span>Java：{labels[data.endpoints.java]}</span>}
        {data?.endpoints.bedrock && <span>基岩版：{labels[data.endpoints.bedrock]}</span>}
        <small>{data?.stale ? '状态数据可能已过期' : checkedAt ? `检测时间：${checkedAt}` : failed ? '状态服务暂不可用' : '正在连接状态服务'}</small>
      </span>
    </a>
  )
}
