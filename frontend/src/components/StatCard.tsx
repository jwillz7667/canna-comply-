export default function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <div className="bg-white border rounded-2xl shadow-soft p-6">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      {subtitle && <div className="text-sm text-gray-600 mt-1">{subtitle}</div>}
    </div>
  )
}


