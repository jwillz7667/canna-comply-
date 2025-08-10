import { ReactNode } from 'react'

type Column<Row> = {
  key: keyof Row & string
  header: string
  render?: (row: Row) => ReactNode
}

export default function DataTable<Row extends Record<string, any>>({ columns, data, emptyText }: { columns: Column<Row>[]; data: Row[]; emptyText?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3 font-semibold text-gray-700 border-b">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={columns.length}>{emptyText ?? 'No data'}</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 border-b">
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}


