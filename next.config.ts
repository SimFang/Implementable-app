import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  eslint: {
    // This allows your app to build even if ESLint reports errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
