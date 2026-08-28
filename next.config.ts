import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Baseline security headers. Deliberately no Content-Security-Policy here:
 * Chakra injects inline styles and Next injects inline bootstrap scripts, so a
 * CSP needs nonce plumbing through the proxy to avoid breaking the app. See
 * DEPLOYMENT.md before adding one.
 */
const securityHeaders = [
  // Stop MIME sniffing turning an upload into an executable script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Legacy clickjacking defence for agents that ignore frame-ancestors.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Send the origin cross-site, the full path same-site.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here needs camera, microphone or geolocation.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Two years, subdomains included, preload-eligible. Requires HTTPS everywhere.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,

  // Don't advertise the framework version to scanners.
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },

  images: {
    // Modern formats first; Next falls back automatically for older clients.
    formats: ["image/avif", "image/webp"],
    // Hosts allowed through the image optimizer. Listing photography is served
    // by the Immotech backend; without this entry every `next/image` for a
    // listing throws "hostname is not configured" at request time.
    remotePatterns: [
      { protocol: "https", hostname: "ma.immotech.app", pathname: "/uploads/**" },
    ],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
