import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const output = process.env.EXPORT ? "export" : undefined;
const basePath = process.env.BASE_PATH || undefined;
const unoptimized = process.env.UNOPTIMIZED ? true : undefined;

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output,
  basePath,
  images: {
    unoptimized,
  },
};

export default withNextIntl(nextConfig);
