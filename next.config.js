/** @type {import('next').NextConfig} */
const nextConfig = {
  // Backend calls (/api/v1, /api/orders, /api/products, /api/categories,
  // /uploads) are forwarded to the shared API by proxy.ts, which also adds
  // this app's X-App-Key header — a plain rewrite can't set headers.
};

module.exports = nextConfig;
