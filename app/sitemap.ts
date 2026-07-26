import { MetadataRoute } from 'next';
import { productService } from '@/app/api_services/productService';
import { blogService } from '@/app/api_services/blogService';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${APP_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${APP_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${APP_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${APP_URL}/events`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${APP_URL}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${APP_URL}/shop`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${APP_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${APP_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${APP_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${APP_URL}/terms-and-conditions`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${APP_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${APP_URL}/refund-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await productService.getProducts();
    productRoutes = products.map((product) => ({
      url: `${APP_URL}/shop/${product.slug}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch {
    // Commerce API unreachable at build/request time — ship the static routes rather than fail the whole sitemap.
  }

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { blogs } = await blogService.getAllBlogs({ limit: 100 });
    blogRoutes = blogs.map((blog) => ({
      url: `${APP_URL}/blog/${blog.slug}`,
      changeFrequency: 'monthly',
      priority: 0.5,
    }));
  } catch {
    // Same fallback as products above.
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
