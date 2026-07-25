import { api } from "../lib/api"

export interface EventItem {
  id: string
  title: string
  slug: string
  description: string
  date: string
  time: string
  location: string
  trainer: string
  image: string
  price: number
  maxSpots: number
  spotsRemaining: number
  popular: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface EventResponse {
  events: EventItem[]
}

export interface EventRegistration {
  id: string
  ticketNumber: string
  attendeeName: string
  attendeePhone: string
  attendeeEmail?: string
  status: 'pending_payment' | 'confirmed' | 'cancelled'
  paymentRef?: string
  createdAt: string
}

export interface RegistrationResponse {
  registration: EventRegistration
  payment: { status: string; reference: string; message: string } | null
}

export interface CreateEventRequest {
  title: string
  description: string
  date: string
  time: string
  location: string
  trainer: string
  image: string
  price: number
  maxSpots: number
  popular?: boolean
  published?: boolean
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {}

export const eventService = {
  getAllEvents: async (params?: { upcoming?: boolean }): Promise<EventResponse> => {
    try {
      const response = await api.public.events.getAll(params)
      const eventsData = (response as any).events || response
      return { events: Array.isArray(eventsData) ? eventsData : [] }
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  },

  getEventBySlug: async (slug: string): Promise<EventItem> => {
    try {
      const response = await api.public.events.getBySlug(slug)
      return ((response as any).event || response) as EventItem
    } catch (error) {
      console.error(`Error fetching event ${slug}:`, error)
      throw error
    }
  },

  register: async (slug: string, data: { attendeeName: string; attendeePhone: string }): Promise<RegistrationResponse> => {
    try {
      return await api.protected.events.register(slug, data)
    } catch (error) {
      console.error(`Error registering for event ${slug}:`, error)
      throw error
    }
  },

  createEvent: async (data: CreateEventRequest): Promise<EventItem> => {
    try {
      const response = await api.admin.events.create(data)
      return ((response as any).event || response) as EventItem
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  },

  updateEvent: async (id: string, data: UpdateEventRequest): Promise<EventItem> => {
    try {
      const response = await api.admin.events.update(id, data)
      return ((response as any).event || response) as EventItem
    } catch (error) {
      console.error(`Error updating event ${id}:`, error)
      throw error
    }
  },

  deleteEvent: async (id: string): Promise<void> => {
    try {
      return await api.admin.events.delete(id)
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error)
      throw error
    }
  },

  getRegistrations: async (id: string): Promise<{ registrations: EventRegistration[] }> => {
    try {
      const response = await api.admin.events.getRegistrations(id)
      const data = (response as any).registrations || response
      return { registrations: Array.isArray(data) ? data : [] }
    } catch (error) {
      console.error(`Error fetching registrations for event ${id}:`, error)
      throw error
    }
  },

  updateRegistrationStatus: async (id: string, status: 'pending_payment' | 'confirmed' | 'cancelled'): Promise<EventRegistration> => {
    try {
      const response = await api.admin.events.updateRegistrationStatus(id, status)
      return ((response as any).registration || response) as EventRegistration
    } catch (error) {
      console.error(`Error updating registration ${id}:`, error)
      throw error
    }
  },

  formatDate: (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  },

  isUpcoming: (dateString: string): boolean => {
    return new Date(dateString) >= new Date()
  },

  statusDisplayName: (status: string): string => {
    switch (status) {
      case 'confirmed': return 'Confirmed'
      case 'cancelled': return 'Cancelled'
      default: return 'Pending Payment'
    }
  },
}
