import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  /**
   * Cache Components / Partial Prefetching are intentionally disabled.
   *
   * Every route here is fully static content (local data modules), so the
   * static shell is already instantaneous. Enabling Cache Components would
   * require wrapping prefilled `params` access in Suspense purely to satisfy
   * navigation validation, which would trade real page architecture for no
   * user-visible benefit.
   */
  cacheComponents: false,
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Locally generated SVG artwork is served through next/image.
    // Allow the optimiser to process SVG and keep the response locked down.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
