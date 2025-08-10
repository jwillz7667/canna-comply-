type Column<T> = { key: keyof T; header: string; render?: (row: T) => React.ReactNode }

export default function DataTable<T extends Record<string, any>>({ columns, data, emptyText }: { columns: Column<T>[]; data: T[]; emptyText?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className="text-left px-4 py-2 font-medium text-gray-700">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-6 text-gray-500">{emptyText || 'No data'}</td></tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-4 py-2">{c.render ? c.render(row) : String(row[c.key] ?? '')}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}


