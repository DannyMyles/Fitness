# Marksila254 - Fitness Instructor Website

A modern, responsive website for Marksila254, a professional fitness instructor and personal trainer in Kenya.

## 🚀 Features

### Public Pages
- **Home** - Hero section with call-to-action, stats, and featured content
- **About** - Trainer profile, experience, and certifications
- **Services** - Training programs, pricing and packages, bookable online (saved + WhatsApp)
- **Corporate** - Corporate wellness, team-building, hikes, office fitness and group memberships, with corporate booking and tailored quote requests
- **Gallery** - Photo gallery with filtering by category
- **Events** - Upcoming fitness events with registration
- **Shop** - E-commerce store for fitness products and merchandise
- **Cart** - Shopping cart with checkout flow
- **Contact** - Contact form and business information

### Admin Dashboard
- **Dashboard** - Bookings/enquiries by status, recent activity, upcoming capacity, email health
- **Bookings** - Every event booking with search, filters, pagination; confirm / complete / cancel (customer emailed), send reminders
- **Enquiries & quotes** - Contact messages, service & corporate bookings, quote requests; set status, quote amount, notes, email the customer
- **Services & packages** - Individual and corporate offerings, categories, pricing (fixed / per person / quotation), packages, availability
- **FAQs & banners** - FAQ entries and homepage/corporate banners with optional date windows
- **Settings** - Contact details, WhatsApp number, hours, social links, hero/about copy, stats, steps, email branding, test email
- **Email log** - Delivery status of every email (sent / failed / not sent)
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

This site runs on the shared backend in `../marksila_api` (MariaDB), which
also serves Source of Adventure (`../sos`). Start that first — see its README.

```bash
cp .env.example .env.local   # BACKEND_URL, NEXT_PUBLIC_APP_KEY=fitness, NEXTAUTH_URL, NEXTAUTH_SECRET
npm install
npm run dev                  # http://localhost:3000 (port pinned; SOS uses 3001)
```

Contact details, social links, hours and page copy come from the database
(**Admin → Settings**), not from env vars. `app/lib/site.ts` loads them once per
minute in the root layout; client components read them with `useSite()`.

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

Services and corporate packages use the same pattern: the booking form saves an
enquiry (reference like `MKE-7KQ2ZD`) and opens WhatsApp with the service, package,
group size, date and contact details prefilled. Opening WhatsApp does not confirm
anything — the team confirms or sends a quote from **Admin → Enquiries**. Retried
submissions (double taps, flaky networks) are de-duplicated with a request id.

Admins confirm orders and mark them paid in **Admin → Orders**, and confirm/complete/cancel
bookings in **Admin → Bookings** (or per event under **Events → Registrations**).

## 📝 Admin Access

- **URL**: `/admin` — sign in with an admin account of the `fitness` app.
  Set or reset a password from the backend:
  `ADMIN_PASSWORD='…' npm run app -- set-password --key fitness --email admin@marksila254.com`
- Admin API calls go through `app/api/commerce/admin/[...path]`, which checks the
  NextAuth admin session and forwards that admin's own backend token (no shared key needed).
- `NEXT_PUBLIC_PARTNER_ADMIN_URL` adds a "Switch to Source of Adventure admin" link.

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
