import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    PORT: "3000",
  },
  images: {
    domains: ['www.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/**',
      },
    ],
    // unoptimized: true, // 可选：如果你想完全禁用图片优化
  },
};

export default nextConfig;
