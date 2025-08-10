'use client'
import { useEffect, useMemo, useState } from 'react'
import { useApi } from '@/lib/api'

type Alert = {
  id: string
  code: string
  severity: 'ERROR' | 'WARN' | 'INFO'
  message: string
  sku?: string
  quickFix?: { label: string; endpoint: string }
}

export default function CompliancePage() {
  const api = useApi()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filter, setFilter] = useState<'ALL' | 'ERROR' | 'WARN' | 'INFO'>('ALL')
  const [loading, setLoading] = useState(false)

  async function fetchAlerts() {
    setLoading(true)
    try {
      const res = await api<{ items: Alert[]; total: number; error: number; warn: number }>("/compliance/alerts")
      setAlerts(res.items)
    } finally {
      setLoading(false)
    }
  }

  async function revalidate() {
    setLoading(true)
    try {
      await api('/compliance/revalidate', { method: 'POST' })
      await fetchAlerts()
    } finally {
      setLoading(false)
    }
  }

  async function applyFix(a: Alert) {
    if (!a.quickFix) return
    setLoading(true)
    try {
      await api(a.quickFix.endpoint as any, { method: 'POST' })
      await fetchAlerts()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  const filtered = useMemo(() => alerts.filter(a => filter === 'ALL' ? true : a.severity === filter), [alerts, filter])

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Compliance</h1>
        <div className="flex items-center gap-2">
          {(['ALL','ERROR','WARN','INFO'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full border ${filter===f?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-700'}`}>{f}</button>
          ))}
          <button onClick={revalidate} disabled={loading} className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50">{loading?'Working…':'Re-validate'}</button>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-soft">
        <ul className="divide-y">
          {filtered.length === 0 && (
            <li className="p-4 text-sm text-gray-500">{loading ? 'Loading…' : 'No alerts'}</li>
          )}
          {filtered.map((a) => (
            <li key={a.id} className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium truncate">{a.code}</div>
                <div className="text-sm text-gray-600 truncate">{a.message}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs rounded-full ${a.severity === 'ERROR' ? 'bg-red-100 text-red-700' : a.severity === 'WARN' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>{a.severity}</span>
                {a.quickFix && (
                  <button onClick={() => applyFix(a)} className="px-3 py-1 rounded-full border bg-white hover:bg-gray-50">Apply Fix</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


