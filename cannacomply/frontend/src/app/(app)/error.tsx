'use client'
export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-gray-600 mt-2">{error.message}</p>
    </div>
  )
}


