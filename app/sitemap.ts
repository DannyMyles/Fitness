import { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Only lists routes that actually exist today. Per-product pages (/shop/[slug])
// aren't built yet — add them here once that page ships.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${APP_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${APP_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${APP_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${APP_URL}/events`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${APP_URL}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${APP_URL}/shop`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${APP_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
