import { api } from '@/lib/api'
import HealthGauge from '@/components/HealthGauge'
import StatCard from '@/components/StatCard'

export default async function DashboardPage() {
  async function safeFetch<T>(path: string, fallback: T): Promise<T> {
    try {
      return await api<T>(path)
    } catch (e) {
      return fallback
    }
  }

  const [health, alerts, deliverySummary, revenue] = await Promise.all([
    safeFetch<{ score: number }>('/compliance/health', { score: 78 }),
    safeFetch<{ total: number; error: number; warn: number; items: any[] }>(
      '/compliance/alerts?limit=5',
      { total: 0, error: 0, warn: 0, items: [] },
    ),
    safeFetch<{ totalRoutes?: number; completed?: number }>(
      '/delivery/summary/today',
      { totalRoutes: 0, completed: 0 },
    ),
    safeFetch<{ amount?: number }>(
      '/reports/revenue?range=7d',
      { amount: 0 },
    ),
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-1">
          <div className="bg-white border rounded-2xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Compliance Health</h2>
              <span className="text-sm text-gray-500">Today</span>
            </div>
            <div className="mt-4 flex justify-center">
              <HealthGauge score={health.score} />
            </div>
          </div>
        </div>
        <StatCard title="Alerts" value={String(alerts.total)} subtitle={`${alerts.error} error · ${alerts.warn} warn`} />
        <StatCard title="Revenue (7d)" value={`$${(revenue.amount ?? 0).toLocaleString()}`} subtitle="Demo" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold">Recent Alerts</h3>
          <ul className="mt-4 divide-y">
            {alerts.items.length === 0 ? (
              <li className="py-3 text-sm text-gray-500">No recent alerts.</li>
            ) : (
              alerts.items.map((a, idx) => (
                <li key={idx} className="py-3 flex items-start justify-between">
                  <div>
                    <div className="font-medium">{a.code}</div>
                    <div className="text-sm text-gray-600">{a.message}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${a.severity === 'ERROR' ? 'bg-red-100 text-red-700' : a.severity === 'WARN' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>{a.severity}</span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="bg-white border rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold">Today’s Deliveries</h3>
          <div className="mt-4 text-sm text-gray-700">Routes: {deliverySummary.totalRoutes ?? 0} · Completed: {deliverySummary.completed ?? 0}</div>
        </div>
      </div>
    </div>
  )
}


