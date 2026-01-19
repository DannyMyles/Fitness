'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { getSession, signOut, useSession } from "next-auth/react"

// Use relative paths to leverage Next.js rewrites/proxy in next.config.ts
// This avoids CORS issues by making requests go through the same origin
const API_BASE_URL = ''

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  category?: 'general' | 'support' | 'feedback' | 'complaint' | 'partnership' | 'other';
  company?: string;
}

interface ContactResponse {
  message: string;
  contactId: string;
}

interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

// Extended session user type
interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  accessToken?: string;
}

// Hook to get authentication status with loading state
export function useAuth() {
  const { data: session, status, update } = useSession()
  
  const getAccessToken = useCallback(async (): Promise<string | null> => {
    // First try to get from current session
    const token = (session?.user as SessionUser)?.accessToken
    if (token) {
      return token
    }
    
    // If not in current session, try to fetch fresh session
    const freshSession = await getSession()
    const freshToken = (freshSession?.user as SessionUser)?.accessToken
    if (freshToken) {
      return freshToken
    }
    
    return null
  }, [session])

  return {
    session,
    status,
    getAccessToken,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    updateSession: update,
  }
}

// Utility to extract token from any session format
async function getAuthToken(): Promise<string | null> {
  try {
    const session = await getSession()
    
    if (!session?.user) {
      return null
    }

    // Try different ways to access the token
    const user = session.user as SessionUser
    
    // Check for direct accessToken property
    if (user.accessToken) {
      return user.accessToken
    }
    
    // Check if it's in the session directly (not nested in user)
    const sessionAny = session as any
    if (sessionAny.accessToken) {
      return sessionAny.accessToken
    }
    
    // Check in jwt token
    if (sessionAny.token) {
      return sessionAny.token
    }
    
    return null
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}

// API client for client-side components
class ApiClient {
  private refreshTokenPromise: Promise<string> | null = null

  private async getAuthHeaders(options?: ApiOptions): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    }

    // Don't set Content-Type for FormData - browser sets it automatically with boundary
    // Setting it manually breaks multipart/form-data requests
    if (!(options?.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    try {
      const token = await getAuthToken()
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Error getting auth headers:', error)
    }

    return headers
  }

  private async request<T = any>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options

    const headers = await this.getAuthHeaders(options)

    // Add additional headers from options
    const allHeaders: Record<string, string> = {
      ...headers,
      ...(fetchOptions.headers as Record<string, string> || {}),
    }

    // For authenticated requests, verify we have a token
    if (requiresAuth) {
      const authHeader = allHeaders['Authorization']
      
      if (!authHeader) {
        // Try one more time to get session
        const token = await getAuthToken()
        
        if (!token) {
          // No token available - redirect to login
          signOut({ callbackUrl: '/login' })
          throw new Error('No authentication token found. Please log in again.')
        }
        
        allHeaders['Authorization'] = `Bearer ${token}`
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: allHeaders,
      credentials: 'include',
    })

    // Handle 401 Unauthorized
    if (response.status === 401) {
      // Try to refresh token
      try {
        const newToken = await this.refreshAccessToken()
        if (newToken) {
          // Retry the request with new token
          allHeaders['Authorization'] = `Bearer ${newToken}`
          const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...fetchOptions,
            headers: allHeaders,
            credentials: 'include',
          })
          
          if (retryResponse.ok) {
            const data = await retryResponse.json()
            return data as T
          }
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        signOut({ callbackUrl: '/login' })
        throw new Error('Session expired. Please sign in again.')
      }
      
      // If we got here, refresh didn't work or wasn't attempted
      signOut({ callbackUrl: '/login' })
      throw new Error('Session expired. Please sign in again.')
    }

    let data: T | ApiError;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error('Invalid JSON response from server');
    }

    if (!response.ok) {
      const errorData = data as ApiError;
      
      // Handle specific HTTP errors
      if (response.status === 403) {
        throw new Error('You do not have permission to perform this action.')
      }
      
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.')
      }
      
      if (response.status === 404) {
        throw new Error('The requested resource was not found.')
      }
      
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.')
      }
      
      throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`)
    }

    return data as T;
  }

  // Token refresh mechanism
  private async refreshAccessToken(): Promise<string | null> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise
    }

    this.refreshTokenPromise = (async () => {
      try {
        const refreshToken = await getAuthToken()
        
        if (!refreshToken) {
          return null
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        })

        if (!response.ok) {
          return null
        }

        const data = await response.json()
        
        if (data.accessToken || data.token) {
          return data.accessToken || data.token
        }
        
        return null
      } catch (error) {
        console.error('Token refresh failed:', error)
        return null
      } finally {
        this.refreshTokenPromise = null
      }
    })()

    return this.refreshTokenPromise
  }

  // Public endpoints (no auth required)
  public = {
    auth: {
      login: (email: string, password: string) => 
        this.request('/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          requiresAuth: false,
        }),
      
      register: (data: {
        name: string;
        username: string;
        email: string;
        password: string;
        roleName?: string;
      }) =>
        this.request('/api/v1/auth/register', {
          method: 'POST',
          body: JSON.stringify(data),
          requiresAuth: false,
        }),

      forgotPassword: (email: string) =>
        this.request('/api/v1/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email }),
          requiresAuth: false,
        }),

      resetPassword: (data: {
        token: string;
        newPassword: string;
        confirmPassword: string;
      }) =>
        this.request('/api/v1/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify(data),
          requiresAuth: false,
        }),

      verifyResetToken: (token: string) =>
        this.request(`/api/v1/auth/verify-reset-token/${token}`, {
          requiresAuth: false,
        }),
    },
    
    contact: {
      submit: (data: ContactFormData): Promise<ContactResponse> =>
        this.request('/api/v1/auth/contact', {
          method: 'POST',
          body: JSON.stringify(data),
          requiresAuth: false,
        }),
    },
    
    blog: {
      getAll: (params?: {
        page?: number;
        limit?: number;
        category?: string;
        featured?: boolean;
        search?: string;
        sort?: string;
      }) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        const queryString = queryParams.toString();
        const url = `/api/v1/blogs${queryString ? `?${queryString}` : ''}`;
        return this.request(url, { requiresAuth: false });
      },
      
      getBySlug: (slug: string) => 
        this.request(`/api/v1/blogs/slug/${slug}`, { requiresAuth: false }),
      
      getById: (id: string) => 
        this.request(`/api/v1/blogs/${id}`, { requiresAuth: false }),
      
      getFeatured: () => 
        this.request('/api/v1/blogs/featured', { requiresAuth: false }),
      
      getCategories: () => 
        this.request('/api/v1/blogs/categories', { requiresAuth: false }),
      
      getStats: () => 
        this.request('/api/v1/blogs/stats', { requiresAuth: false }),
      
      like: (id: string) => 
        this.request(`/api/v1/blogs/${id}/like`, {
          method: 'POST',
          requiresAuth: false,
        }),
      
      getImage: (id: string) => 
        this.request(`/api/v1/blogs/${id}/image`, { requiresAuth: false }),
      
      getImageInfo: (id: string) => 
        this.request(`/api/v1/blogs/${id}/image-info`, { requiresAuth: false }),
    },
    
    trainings: {
      getAll: () => 
        this.request('/api/v1/trainings', { requiresAuth: false }),
      
      getOne: (id: string) => 
        this.request(`/api/v1/trainings/${id}`, { requiresAuth: false }),
    },

    testimonials: {
      getAll: () => 
        this.request('/api/v1/testimonials', { requiresAuth: false }),
      
      getOne: (id: string) => 
        this.request(`/api/v1/testimonials/${id}`, { requiresAuth: false }),
    },
  }

  // Protected endpoints (requires auth)
  protected = {
    auth: {
      logout: () => 
        this.request('/api/v1/auth/logout', {
          method: 'POST',
        }),

      getCurrentUser: () => 
        this.request('/api/v1/auth/me'),

      updateProfile: (data: {
        name?: string;
        username?: string;
        email?: string;
      }) =>
        this.request('/api/v1/auth/profile', {
          method: 'PUT',
          body: JSON.stringify(data),
        }),

      changePassword: (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
      }) =>
        this.request('/api/v1/auth/change-password', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
    },

    user: {
      getProfile: () => 
        this.request('/api/v1/users/profile'),
      
      updateProfile: (data: any) =>
        this.request('/api/v1/users/profile', {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
    },
  }

  // Admin endpoints (requires admin role)
  admin = {
    users: {
      getAll: () => 
        this.request('/api/v1/users'),
      
      getById: (id: string) => 
        this.request(`/api/v1/users/${id}`),
      
      create: (data: {
        name: string;
        username: string;
        email: string;
        password: string;
        roleId: string;
      }) =>
        this.request('/api/v1/users', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      
      update: (id: string, data: {
        name?: string;
        username?: string;
        email?: string;
        password?: string;
        roleId?: string;
        isActive?: boolean;
      }) =>
        this.request(`/api/v1/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/users/${id}`, {
          method: 'DELETE',
        }),
    },
    
    blog: {
      create: (data: FormData) => 
        this.request('/api/v1/blogs', {
          method: 'POST',
          body: data,
          headers: {},
        }),
      
      update: (id: string, data: FormData) =>
        this.request(`/api/v1/blogs/${id}`, {
          method: 'PUT',
          body: data,
          headers: {},
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/blogs/${id}`, {
          method: 'DELETE',
        }),
    },
    
    training: {
      create: (data: any) =>
        this.request('/api/v1/trainings', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      
      update: (id: string, data: any) =>
        this.request(`/api/v1/trainings/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/trainings/${id}`, {
          method: 'DELETE',
        }),
    },
    
    testimonial: {
      create: (data: any) =>
        this.request('/api/v1/testimonials', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      
      update: (id: string, data: any) =>
        this.request(`/api/v1/testimonials/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/testimonials/${id}`, {
          method: 'DELETE',
        }),
      
      updateStatus: (id: string, data: { isActive: boolean }) =>
        this.request(`/api/v1/testimonials/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        }),
    },

    contacts: {
      getAll: () =>
        this.request('/api/v1/contacts'),
      
      getOne: (id: string) =>
        this.request(`/api/v1/contacts/${id}`),
      
      updateStatus: (id: string, data: {
        status: 'pending' | 'read' | 'replied' | 'resolved' | 'spam';
        response?: {
          message: string;
        };
      }) =>
        this.request(`/api/v1/contacts/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/contacts/${id}`, {
          method: 'DELETE',
        }),
    },
  }
}

export const api = new ApiClient();

