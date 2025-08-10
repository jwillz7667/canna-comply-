import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CannaComply',
  description: 'Compliance & Operations for Dispensaries',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}


