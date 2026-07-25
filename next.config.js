/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false,
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    return [
      { source: '/api/v1/:path*', destination: `${backendUrl}/api/v1/:path*` },
    ];
  },
};

module.exports = nextConfig;
