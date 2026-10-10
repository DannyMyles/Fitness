/**
 * Resized, compressed (WebP/AVIF) version of an image in /public/images via
 * Next's built-in optimiser, cached after the first request. Other sources
 * (admin uploads, external URLs) are returned unchanged.
 * `width` must be one of Next's configured image sizes.
 */
export type ImageWidth = 384 | 640 | 828 | 1080 | 1200 | 1920;

export function optimizedSrc(src: string | null | undefined, width: ImageWidth = 640): string {
  if (!src) return '';
  if (!src.startsWith('/images/')) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}
