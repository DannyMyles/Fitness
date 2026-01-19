import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Marksila254 | Professional Fitness Instructor & Personal Trainer",
  description: "Transform your fitness journey with Marksila254. Expert personal training, group fitness classes, nutrition guidance, and professional workout programs tailored to your goals.",
  keywords: "fitness trainer, personal trainer, gym, workout, weight loss, muscle building, fitness classes, nutrition, Kenya",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-fitness-light font-sans">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}

