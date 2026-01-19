# Marksila254 - Fitness Instructor Website

A modern, responsive website for Marksila254, a professional fitness instructor and personal trainer in Kenya.

## 🚀 Features

### Public Pages
- **Home** - Hero section with call-to-action, stats, and featured content
- **About** - Trainer profile, experience, and certifications
- **Services** - Training programs, pricing, and service details
- **Gallery** - Photo gallery with filtering by category
- **Events** - Upcoming fitness events with registration
- **Shop** - E-commerce store for fitness products and merchandise
- **Cart** - Shopping cart with checkout flow
- **Contact** - Contact form and business information

### Admin Dashboard
- **Dashboard** - Overview with stats, recent orders, upcoming events
- **User Management** - Manage registered users
- **Product Management** - Add, edit, delete products
- **Order Management** - View and process orders
- **Event Management** - Schedule and manage events
- **Gallery Management** - Upload and organize photos

### Technical Features
- Responsive design (mobile-first)
- Dark theme with orange/teal accents
- Smooth animations and transitions
- WhatsApp integration for quick contact
- SEO optimized
- Fast loading with Next.js

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: CSS animations & Framer Motion
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
marksila254/
├── app/
│   ├── about/           # About page
│   ├── admin/           # Admin dashboard
│   │   ├── layout.tsx   # Admin layout with sidebar
│   │   └── page.tsx     # Dashboard home
│   ├── cart/            # Shopping cart
│   ├── contact/         # Contact page
│   ├── events/          # Events page
│   ├── gallery/         # Gallery page
│   ├── login/           # Admin login
│   ├── services/        # Services page
│   ├── shop/            # E-commerce shop
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   └── ui/              # Reusable UI components
│       ├── Footer.tsx
│       ├── Hero.tsx
│       ├── Navigation.tsx
│       └── WhatsAppWidget.tsx
├── public/              # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   cd marksila254
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Admin Access

- **URL**: `/admin`
- **Email**: admin@marksila254.com
- **Password**: admin123

## 🎨 Design System

### Colors
- Primary: `#FF6B35` (Energetic Orange)
- Secondary: `#2D3142` (Dark Gray)
- Accent: `#4ECDC4` (Teal)

### Typography
- Headings: Montserrat
- Body: Inter

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security Notes

- Change default admin credentials in production
- Implement proper authentication (NextAuth.js recommended)
- Add rate limiting to contact forms
- Use environment variables for sensitive data

## 📄 License

Copyright © 2024 Marksila254. All rights reserved.

---

Built with ❤️ for fitness professionals

# Fitness
