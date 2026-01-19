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
          primary: '#FF6B35',  // Energetic orange
          primaryDark: '#E55A2B',
          primaryLight: '#FF8C5A',
          secondary: '#2D3142', // Dark gray for contrast
          accent: '#0BA154',    // Fresh green accent
          accentDark: '#088542',
          success: '#4CAF50',
          warning: '#FFB74D',
          error: '#EF5350',
          light: '#F8F9FA',
          dark: '#1A1A2E',
        },
        // Additional fitness brand colors
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
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 2s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.8)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shine': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'slideUp': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideDown': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scaleIn': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-fitness': 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 50%, #0BA154 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1A1A2E 0%, #2D3142 50%, #4A4A5A 100%)',
        'gradient-card': 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
        'gradient-text': 'linear-gradient(90deg, #FF6B35, #0BA154)',
      },
      boxShadow: {
        'fitness': '0 10px 30px -3px rgba(255, 107, 53, 0.3)',
        'fitness-lg': '0 20px 60px -10px rgba(255, 107, 53, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config

