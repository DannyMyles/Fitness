import { MetadataRoute } from 'next';
import { productService } from '@/app/api_services/productService';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${APP_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${APP_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${APP_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${APP_URL}/events`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${APP_URL}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${APP_URL}/shop`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${APP_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    const products = await productService.getProducts();
    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${APP_URL}/shop/${product.slug}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    // Commerce API unreachable at build/request time — ship the static routes rather than fail the whole sitemap.
    return staticRoutes;
  }
}
