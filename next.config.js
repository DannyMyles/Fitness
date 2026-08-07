/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false,
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    return [
      { source: '/api/v1/:path*', destination: `${backendUrl}/api/v1/:path*` },
      { source: '/api/orders/:path*', destination: `${backendUrl}/api/orders/:path*` },
      // Uploaded product images are stored as backend-relative paths
      // (/uploads/products/<file>, unlike blog/event images which go
      // through a dedicated /api/v1/... route) — proxy them the same way.
      { source: '/uploads/:path*', destination: `${backendUrl}/uploads/:path*` },
    ];
  },
};

module.exports = nextConfig;
