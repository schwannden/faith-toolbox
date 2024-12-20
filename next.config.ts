import type { NextConfig } from "next";

const output = process.env.EXPORT ? "export" : undefined;
const basePath = process.env.BASE_PATH || undefined;
const unoptimized = process.env.UNOPTIMIZED ? true : undefined;

const nextConfig: NextConfig = {
  output,
  basePath,
  images: {
    unoptimized,
  },
};

export default nextConfig;
