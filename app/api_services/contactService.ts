// lib/services/contactService.ts
import { api } from "../lib/api"

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  category: 'general' | 'support' | 'feedback' | 'complaint' | 'partnership' | 'business' | 'other'
  company?: string
  status: 'pending' | 'read' | 'replied' | 'resolved' | 'spam'
  response?: {
    message: string
    repliedBy?: string
    repliedAt?: string
  }
  createdAt: string
  updatedAt: string
  ipAddress?: string
  userAgent?: string
}

export interface ContactResponse {
  contacts: Contact[]
  pagination: {
    currentPage: number
    totalPages: number
    totalContacts: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface CreateContactRequest {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  category?: 'general' | 'support' | 'feedback' | 'complaint' | 'partnership' | 'other'
  company?: string
}

export interface UpdateContactStatusRequest {
  status: 'pending' | 'read' | 'replied' | 'resolved' | 'spam'
  response?: {
    message: string
  }
}

export const contactService = {
  // Submit contact form (public - no auth required)
  submitContactForm: async (data: CreateContactRequest): Promise<{ message: string; contactId: string }> => {
    try {
      return await api.public.contact.submit(data)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      throw error
    }
  },

  // Get all contacts (admin only)
  getAllContacts: async (): Promise<ContactResponse> => {
    try {
      return await api.admin.contacts.getAll()
    } catch (error) {
      console.error('Error fetching contacts:', error)
      throw error
    }
  },

  // Get single contact (admin only)
  getContactById: async (id: string): Promise<Contact> => {
    try {
      return await api.admin.contacts.getOne(id)
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error)
      throw error
    }
  },

  // Update contact status (admin only)
  updateContactStatus: async (id: string, data: UpdateContactStatusRequest): Promise<Contact> => {
    try {
      return await api.admin.contacts.updateStatus(id, data)
    } catch (error) {
      console.error(`Error updating contact status ${id}:`, error)
      throw error
    }
  },

  // Delete contact (admin only)
  deleteContact: async (id: string): Promise<void> => {
    try {
      return await api.admin.contacts.delete(id)
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error)
      throw error
    }
  },

  // Format date for display
  formatDate: (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  },

  // Get status badge color
  getStatusColor: (status: Contact['status']): string => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      spam: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  },

  // Get status text
  getStatusText: (status: Contact['status']): string => {
    const texts = {
      pending: 'Pending',
      read: 'Read',
      replied: 'Replied',
      resolved: 'Resolved',
      spam: 'Spam'
    }
    return texts[status] || 'Unknown'
  },

  // Get category text
  getCategoryText: (category: Contact['category']): string => {
    const texts = {
      general: 'General Inquiry',
      support: 'Support',
      feedback: 'Feedback',
      complaint: 'Complaint',
      partnership: 'Partnership',
      business: 'Business Inquiry',
      other: 'Other'
    }
    return texts[category] || 'General Inquiry'
  },

  // Client-side rate limiting (optional - can be used in components)
  checkRateLimit: (email: string): boolean => {
    if (typeof window === 'undefined') return true

    const key = `contact_submission_${email.replace(/[^a-zA-Z0-9]/g, '_')}`
    const lastSubmission = localStorage.getItem(key)
    
    if (lastSubmission) {
      const timePassed = Date.now() - parseInt(lastSubmission)
      // 5 minutes in milliseconds
      if (timePassed < 5 * 60 * 1000) {
        return false
      }
    }
    
    return true
  },

  setRateLimit: (email: string): void => {
    if (typeof window === 'undefined') return
    
    const key = `contact_submission_${email.replace(/[^a-zA-Z0-9]/g, '_')}`
    localStorage.setItem(key, Date.now().toString())
    
    // Auto-clear after 5 minutes
    setTimeout(() => {
      localStorage.removeItem(key)
    }, 5 * 60 * 1000)
  },

  getRemainingWaitTime: (email: string): number => {
    if (typeof window === 'undefined') return 0

    const key = `contact_submission_${email.replace(/[^a-zA-Z0-9]/g, '_')}`
    const lastSubmission = localStorage.getItem(key)
    
    if (lastSubmission) {
      const timePassed = Date.now() - parseInt(lastSubmission)
      const remaining = 5 * 60 * 1000 - timePassed
      return Math.max(0, remaining)
    }
    
    return 0
  },

  // Format remaining time in minutes and seconds
  formatRemainingTime: (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  },

  // Helper to validate contact form data
  validateContactForm: (data: CreateContactRequest): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {}

    if (!data.name?.trim()) {
      errors.name = 'Name is required'
    }

    if (!data.email?.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!data.subject?.trim()) {
      errors.subject = 'Subject is required'
    }

    if (!data.message?.trim()) {
      errors.message = 'Message is required'
    }

    if (data.phone && !/^[\d\s\-\+\(\)]{10,}$/.test(data.phone.replace(/[\s\-\+\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}