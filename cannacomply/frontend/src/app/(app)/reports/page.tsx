import { api } from '@/lib/api'

export default async function ReportsPage() {
  let revenue = { amount: 0 }
  try {
    revenue = await api<{ amount: number }>(`/reports/revenue?range=30d`)
  } catch {}
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Reports</h1>
      <div className="bg-white border rounded-2xl shadow-soft p-6">
        <div className="text-sm text-gray-500">Revenue (30d)</div>
        <div className="mt-2 text-3xl font-semibold">${revenue.amount.toLocaleString()}</div>
      </div>
    </div>
  )
}


