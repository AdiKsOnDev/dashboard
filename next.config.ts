import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  basePath: '/dashboard',
};

export default nextConfig;
