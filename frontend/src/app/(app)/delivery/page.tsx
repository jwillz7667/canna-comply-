'use client'
import { useEffect, useState } from 'react'
import { useApi } from '@/lib/api'

type Route = { id: string; stops: number; durationMinutes: number; driverLink: string }

export default function DeliveryPage() {
  const api = useApi()
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchRoutes() {
    setLoading(true)
    try {
      const res = await api<{ items: Route[] }>('/delivery/routes')
      setRoutes(res.items)
    } catch {
      setRoutes([])
    } finally {
      setLoading(false)
    }
  }

  async function createRoute() {
    setLoading(true)
    try {
      const created = await api<Route>('/delivery/routes', { method: 'POST' })
      setRoutes(prev => [created, ...prev])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRoutes() }, [])

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Delivery</h1>
        <button onClick={createRoute} disabled={loading} className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50">{loading?'Creating…':'+ New Route'}</button>
      </div>
      <div className="bg-white border rounded-2xl shadow-soft">
        <ul className="divide-y">
          {routes.length === 0 && (
            <li className="p-4 text-sm text-gray-500">{loading? 'Loading…' : 'No routes yet.'}</li>
          )}
          {routes.map(r => (
            <li key={r.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">Route #{r.id}</div>
                <div className="text-sm text-gray-600">{r.stops} stops · {r.durationMinutes} min</div>
              </div>
              <a className="text-brand-700 hover:underline" href={r.driverLink} target="_blank" rel="noreferrer">Driver Link</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


