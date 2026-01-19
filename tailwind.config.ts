import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fitness-themed color palette - Orange/Red for energy
        fitness: {
          primary: '#FF6B35',
          primaryDark: '#E55A2B',
          primaryLight: '#FF8C5A',
          secondary: '#2D3142',
          accent: '#0BA154',
          accentDark: '#088542',
          accentLight: '#33B863',
          success: '#4CAF50',
          warning: '#FFB74D',
          error: '#EF5350',
          light: '#F8F9FA',
          dark: '#1A1A2E',
        },
        // Additional brand colors
        brand: {
          orange: '#FF6B35',
          green: '#0BA154',
          teal: '#4ECDC4',
          dark: '#1A1A2E',
          gray: '#4A4A5A',
          light: '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 2s',
        'shine': 'shine 2s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-down': 'slide-down 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.6s ease-out',
        'rotate': 'rotate 10s linear infinite',
        'rotate-reverse': 'rotate-reversed 10s linear infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 1.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)'
          },
          '50%': { 
            opacity: '0.85',
            boxShadow: '0 0 25px rgba(255, 107, 53, 0.8)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(2deg)' },
          '50%': { transform: 'translateY(0px) rotate(0deg)' },
          '75%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        'shine': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'rotate': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'rotate-reversed': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'scroll-indicator': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-fitness': 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 50%, #0BA154 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1A1A2E 0%, #2D3142 50%, #4A4A5A 100%)',
        'gradient-card': 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
        'gradient-text': 'linear-gradient(90deg, #FF6B35, #0BA154)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'fitness': '0 10px 40px -10px rgba(255, 107, 53, 0.3)',
        'fitness-lg': '0 20px 60px -15px rgba(255, 107, 53, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'accent': '0 10px 40px -10px rgba(11, 161, 84, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config

