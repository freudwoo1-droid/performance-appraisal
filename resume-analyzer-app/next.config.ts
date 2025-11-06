import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
