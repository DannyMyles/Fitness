import { api } from "../lib/api"

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
  avatarColor: string
  featured: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TestimonialResponse {
  testimonials: Testimonial[]
  pagination: {
    currentPage: number
    totalPages: number
    totalTestimonials: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface CreateTestimonialRequest {
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image?: string
  avatarColor: string
  featured: boolean
}

export const testimonialService = {
  // Get all testimonials (public - no auth required)
  getAllTestimonials: async (): Promise<TestimonialResponse> => {
    try {
      const response = await api.public.testimonials.getAll()
      console.log('Get all testimonials response:', response)
      
      // Handle both wrapped ({ testimonials: [...] }) and direct responses
      const testimonialsData = (response as any).testimonials || response
      
      // If testimonials is an array, construct the proper response
      if (Array.isArray(testimonialsData)) {
        return {
          testimonials: testimonialsData,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalTestimonials: testimonialsData.length,
            hasNextPage: false,
            hasPrevPage: false
          }
        }
      }
      
      return response as TestimonialResponse
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      throw error
    }
  },

  // Get single testimonial (public - no auth required)
  getTestimonialById: async (id: string): Promise<Testimonial> => {
    try {
      const response = await api.public.testimonials.getOne(id)
      console.log('Get testimonial by ID response:', response)
      
      // Handle both wrapped ({ testimonial: ... }) and direct responses
      const testimonialData = (response as any).testimonial || response
      return testimonialData as Testimonial
    } catch (error) {
      console.error(`Error fetching testimonial ${id}:`, error)
      throw error
    }
  },

  // Create testimonial (admin only)
  createTestimonial: async (data: CreateTestimonialRequest): Promise<Testimonial> => {
    try {
      return await api.admin.testimonial.create(data)
    } catch (error) {
      console.error('Error creating testimonial:', error)
      throw error
    }
  },

  // Update testimonial (admin only)
  updateTestimonial: async (id: string, data: Partial<CreateTestimonialRequest>): Promise<Testimonial> => {
    try {
      return await api.admin.testimonial.update(id, data)
    } catch (error) {
      console.error(`Error updating testimonial ${id}:`, error)
      throw error
    }
  },

  // Delete testimonial (admin only)
  deleteTestimonial: async (id: string): Promise<void> => {
    try {
      return await api.admin.testimonial.delete(id)
    } catch (error) {
      console.error(`Error deleting testimonial ${id}:`, error)
      throw error
    }
  },

  // Toggle testimonial active status (admin only)
  toggleTestimonialStatus: async (id: string, isActive: boolean): Promise<Testimonial> => {
    try {
      return await api.admin.testimonial.updateStatus(id, { isActive })
    } catch (error) {
      console.error(`Error toggling testimonial status ${id}:`, error)
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
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  },

  // Get testimonial status
  getTestimonialStatus: (testimonial: Testimonial): 'published' | 'pending' | 'draft' | 'archived' => {
    return testimonial.isActive ? 'published' : 'archived'
  },

  // Calculate statistics
  calculateStats: (testimonials: Testimonial[]) => {
    const total = testimonials.length
    const published = testimonials.filter(t => t.isActive).length
    const featured = testimonials.filter(t => t.featured).length
    const archived = testimonials.filter(t => !t.isActive).length
    const averageRating = testimonials.length > 0 
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : '0.0'
    const topRating = testimonials.filter(t => t.rating === 5).length

    return {
      total,
      published,
      featured,
      archived,
      averageRating,
      topRating
    }
  },

  // Get unique companies
  getUniqueCompanies: (testimonials: Testimonial[]): string[] => {
    const companies = testimonials
      .map(t => t.company)
      .filter((company): company is string => !!company)
    return Array.from(new Set(companies)).sort()
  },

  // Generate initials from name
  getInitials: (name: string): string => {
    if (!name.trim()) return 'JD'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  },

  // Render stars
  renderStars: (rating: number): string => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }
}

