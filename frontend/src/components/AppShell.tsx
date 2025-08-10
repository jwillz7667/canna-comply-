"use client"
import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname?.startsWith(href)
  return (
    <Link href={href} className={`px-3 py-2 rounded-lg text-sm font-medium ${active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
      {label}
    </Link>
  )
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="font-semibold">CannaComply</Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/dashboard" label="Dashboard" />
            <NavLink href="/inventory" label="Inventory" />
            <NavLink href="/compliance" label="Compliance" />
            <NavLink href="/delivery" label="Delivery" />
            <NavLink href="/reports" label="Reports" />
            <NavLink href="/settings" label="Settings" />
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/inventory" className="px-3 py-1 rounded-full border">Sync METRC</Link>
            <Link href="/delivery" className="px-3 py-1 rounded-full bg-brand-600 text-white">+ Delivery</Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  )
}


