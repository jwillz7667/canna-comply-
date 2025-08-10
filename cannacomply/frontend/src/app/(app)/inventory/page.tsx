'use client'
import { useEffect, useState } from 'react'
import { useApi } from '@/lib/api'
import DataTable from '@/components/DataTable'

type InventoryItem = {
  id: number
  tenantId: number
  sku: string
  name: string
  batchId: string | null
  qty: number
  expiresAt: string | null
  status: 'OK' | 'WARN' | 'ERROR'
  updatedAt: string
}

export default function InventoryPage() {
  const api = useApi()
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchItems() {
    setLoading(true)
    try {
      const res = await api<{ items: InventoryItem[] }>('/inventory/list?limit=500')
      setItems(res.items)
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  async function syncMetrc() {
    setLoading(true)
    try {
      await api('/inventory/sync', { method: 'POST' })
      await fetchItems()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Inventory</h1>
        <button onClick={syncMetrc} disabled={loading} className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50">
          {loading ? 'Syncing…' : 'Sync METRC'}
        </button>
      </div>
      <div className="bg-white border rounded-2xl shadow-soft p-0">
        <DataTable
          columns={[
            { key: 'sku', header: 'SKU' },
            { key: 'name', header: 'Name' },
            { key: 'qty', header: 'Qty' },
            {
              key: 'status',
              header: 'Status',
              render: (row: InventoryItem) => (
                <span className={`px-2 py-1 text-xs rounded-full ${row.status === 'ERROR' ? 'bg-red-100 text-red-700' : row.status === 'WARN' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{row.status}</span>
              ),
            },
            { key: 'batchId', header: 'Batch' },
            { key: 'expiresAt', header: 'Expires' },
          ]}
          data={items}
          emptyText={loading ? 'Loading…' : 'No inventory yet. Click Sync METRC.'}
        />
      </div>
    </div>
  )
}


