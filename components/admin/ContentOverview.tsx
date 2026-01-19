'use client'

import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { blogService } from '@/app/api_services/blogService'
import { testimonialService } from '@/app/api_services/testimonialService'

// Define proper types for content stats
interface ContentStat {
  type: string;
  published: number;
  draft?: number;
  pending?: number;
  totalViews?: number;
  avgRating?: number;
  growth: number;
  trend: 'up' | 'down';
}

interface BlogData {
  blogs: Array<{
    published: boolean;
    views?: number;
  }>;
}

interface TestimonialData {
  testimonials: Array<{
    isActive: boolean;
    rating: number;
  }>;
}

export default function ContentOverview() {
  const [contentStats, setContentStats] = useState<ContentStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [animatedStats, setAnimatedStats] = useState<number[]>([])

  const fetchContentStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch data from all services in parallel
      const [blogsResponse, testimonialsResponse] = await Promise.all([
        blogService.getAllBlogs().catch(() => ({ blogs: [] })),
        testimonialService.getAllTestimonials().catch(() => ({ testimonials: [] }))
      ])

      const blogs = (blogsResponse as BlogData).blogs || []
      const testimonials = (testimonialsResponse as TestimonialData).testimonials || []

      // Calculate Blog stats
      const blogPublished = blogs.filter(b => b.published).length
      const blogDraft = blogs.filter(b => !b.published).length
      const blogViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0)

      // Calculate Testimonial stats
      const testimonialPublished = testimonials.filter(t => t.isActive).length
      const testimonialPending = testimonials.filter(t => !t.isActive).length
      const avgRating = testimonials.length > 0
        ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
        : 0

      // Build stats array
      const stats: ContentStat[] = [
        {
          type: 'Blog Posts',
          published: blogPublished,
          draft: blogDraft,
          totalViews: blogViews,
          growth: 0,
          trend: 'up',
        },
        {
          type: 'Testimonials',
          published: testimonialPublished,
          pending: testimonialPending,
          avgRating: avgRating,
          growth: 0,
          trend: 'up',
        },
      ]

      setContentStats(stats)
      setAnimatedStats(stats.map(() => 0))
    } catch (err) {
      console.error('Error fetching content stats:', err)
      setError('Failed to load content stats')
      // Set default values on error
      setContentStats([
        {
          type: 'Blog Posts',
          published: 0,
          draft: 0,
          totalViews: 0,
          growth: 0,
          trend: 'up',
        },
        {
          type: 'Testimonials',
          published: 0,
          pending: 0,
          avgRating: 0,
          growth: 0,
          trend: 'up',
        },
      ])
      setAnimatedStats([0, 0])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContentStats()
  }, [])

  useEffect(() => {
    if (contentStats.length === 0) return

    const timers = contentStats.map((stat, index) => {
      // Calculate target value with proper type safety
      const target = 
        stat.totalViews || 
        (stat.avgRating ? stat.avgRating * 100 : 0) ||
        stat.published ||
        0
      
      const increment = target / 20
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedStats(prev => {
          const newStats = [...prev]
          newStats[index] = Math.floor(current)
          return newStats
        })
      }, 50)

      return timer
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [contentStats])

  if (loading) {
    return (
      <div className="adventure-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Content Overview</h2>
            <p className="text-sm text-gray-600 mt-1">Performance across all content types</p>
          </div>
          <BarChart3 className="h-6 w-6 text-accent-500 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="adventure-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Content Overview</h2>
          <p className="text-sm text-gray-600 mt-1">Performance across all content types</p>
        </div>
        <BarChart3 className="h-6 w-6 text-accent-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentStats.map((stat, index) => (
          <div key={stat.type} className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.type}</p>
              <div className="flex items-baseline mt-2">
                <p className="text-2xl font-bold text-gray-900">
                  {stat.type === 'Testimonials' 
                    ? `${((animatedStats[index] || 0) / 100).toFixed(1)}`
                    : (animatedStats[index] || 0).toLocaleString()
                  }
                </p>
                <span className={`ml-2 flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stat.growth)}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {stat.type === 'Blog Posts' && (
                <>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Published</span>
                    <span className="font-medium">{stat.published}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Draft</span>
                    <span className="font-medium">{stat.draft || 0}</span>
                  </div>
                </>
              )}
              
              {stat.type === 'Testimonials' && (
                <>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Published</span>
                    <span className="font-medium">{stat.published}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Pending</span>
                    <span className="font-medium">{stat.pending || 0}</span>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    stat.trend === 'up' ? 'bg-accent-500' : 'bg-adventure-fire'
                  } rounded-full transition-all duration-1000`}
                  style={{ 
                    width: `${Math.min(100, ((animatedStats[index] || 0) / (stat.type === 'Testimonials' ? 500 : 10000)) * 100)}%` 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

