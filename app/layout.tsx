import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/ui/SiteChrome";
import AuthProvider from "./providers/AuthProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-display",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const SITE_NAME = "Marksila254";
const DEFAULT_DESCRIPTION =
  "Transform your fitness journey with Marksila254. Expert personal training, group fitness classes, nutrition guidance, and professional workout programs tailored to your goals in Nairobi, Kenya.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${SITE_NAME} | Professional Fitness Instructor & Personal Trainer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: "fitness trainer, personal trainer, gym, workout, weight loss, muscle building, fitness classes, nutrition, Kenya",
  icons: {
    icon: '/images/logo.svg',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Professional Fitness Instructor & Personal Trainer`,
    description: DEFAULT_DESCRIPTION,
    url: APP_URL,
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Professional Fitness Instructor & Personal Trainer`,
    description: DEFAULT_DESCRIPTION,
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: APP_URL,
  image: `${APP_URL}/images/logo.svg`,
  telephone: process.env.NEXT_PUBLIC_PHONE,
  email: process.env.NEXT_PUBLIC_EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  sameAs: [
    process.env.NEXT_PUBLIC_INSTAGRAM,
    process.env.NEXT_PUBLIC_FACEBOOK,
    process.env.NEXT_PUBLIC_TWITTER,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-fitness-light font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}

