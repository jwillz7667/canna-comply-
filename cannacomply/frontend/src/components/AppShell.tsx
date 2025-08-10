import Link from 'next/link'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-semibold">CannaComply</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/inventory" className="hover:underline">Inventory</Link>
            <Link href="/compliance" className="hover:underline">Compliance</Link>
            <Link href="/delivery" className="hover:underline">Delivery</Link>
            <Link href="/reports" className="hover:underline">Reports</Link>
            <Link href="/settings" className="hover:underline">Settings</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  )
}


