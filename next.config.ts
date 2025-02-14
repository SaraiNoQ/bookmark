import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    PORT: "3000",
  },
};

export default nextConfig;
