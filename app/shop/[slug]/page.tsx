import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { productService } from '@/app/api_services/productService';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string | string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await productService.getProduct(slug);
    return {
      title: product.name,
      description: product.description,
      alternates: { canonical: `/shop/${slug}` },
      openGraph: {
        title: `${product.name} | Marksila254`,
        description: product.description,
        url: `/shop/${slug}`,
        images: product.images[0] ? [{ url: product.images[0] }] : undefined,
      },
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { color } = await searchParams;
  return <ProductDetailClient slug={slug} initialColor={typeof color === 'string' ? color : undefined} />;
}
