import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'CannaComply',
  description: 'Compliance & Operations for Cannabis Dispensaries',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}


