import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Type for authenticated user
export interface AuthenticatedUser {
  id: string
  email: string
  name: string
  role: string
  accessToken: string
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const session = await getServerSession(authOptions)
    return session?.user as AuthenticatedUser || null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized - Please sign in')
  }
  return user
}

export async function requireAdmin(): Promise<AuthenticatedUser> {
  const user = await requireAuth()
  if (user.role !== 'admin') {
    throw new Error('Forbidden - Admin access required')
  }
  return user
}

// Server-side API client for use in server components
export async function serverFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const API_BASE_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'https://istc-admin.onrender.com'
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }

  // Add authorization if needed (for protected endpoints)
  const headersObj = options.headers as Record<string, string> | undefined
  if (!headersObj?.['Authorization']) {
    const user = await getCurrentUser()
    if (user?.accessToken) {
      headers['Authorization'] = `Bearer ${user.accessToken}`
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }
  
  return {} as T
}