import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy API requests to backend to avoid CORS issues in development
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://istc-admin.onrender.com';
    
    return [
      {
        // Proxy all /api/v1/* requests to the backend
        // This runs on the Next.js server side, so CORS doesn't apply
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },

  // images configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'istc-admin.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

