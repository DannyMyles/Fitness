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

This site runs on the shared backend in `../mark254-commerce-api` (MariaDB), which
also serves Source of Adventure (`../sos`). Start that first — see its README.

```bash
cp .env.example .env    # BACKEND_URL, NEXT_PUBLIC_APP_KEY=fitness, COMMERCE_ADMIN_KEY, NEXTAUTH_SECRET
npm install
npm run dev             # http://localhost:3000
```

**How it talks to the backend:** the browser only calls this site's own `/api/v1/*`,
`/api/orders`, `/api/products`, `/api/categories` and `/uploads/*`. `proxy.ts` forwards
them to `BACKEND_URL` and sets `X-App-Key: fitness`, so this site only ever sees
Fitness data. Server code uses `backendFetch` (`app/lib/backend.ts`).

## 🛒 Ordering & booking (WhatsApp)

No online payment. The cart is one page: items + name, phone and delivery location
→ **Order on WhatsApp**. The order is saved (server-priced) and WhatsApp opens with
the full summary; delivery and payment are agreed there. Events work the same way
(**Book on WhatsApp**, with a participant count). No login is needed; logged-in
customers also see their orders/bookings under **Account**.

Admins confirm orders and mark them paid in **Admin → Orders**, and confirm/cancel
bookings in **Admin → Events → Registrations**.

## 📝 Admin Access

- **URL**: `/admin` — sign in with an admin account of the `fitness` app
  (the backend seed creates `admin@marksila254.com`; change its password).

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
- Use environment variables for sensitive data

## 📄 License

Copyright © 2024 Marksila254. All rights reserved.

---

Built with ❤️ for fitness professionals
