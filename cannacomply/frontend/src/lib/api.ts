const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
const TENANT = process.env.NEXT_PUBLIC_TENANT_SLUG || 'demo'

export async function api<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant': TENANT,
      ...(init?.headers as Record<string, string>),
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export function useApi() {
  return async function<T = any>(path: string, init?: RequestInit): Promise<T> {
    return api<T>(path, init)
  }
}


