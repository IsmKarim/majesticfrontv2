import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);


 

 