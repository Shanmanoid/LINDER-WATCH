// Single source of truth for the production origin. Consumed by
// metadataBase, sitemap.ts, robots.ts, and OG image defaults.
//
// Env var takes precedence so preview deploys can override with their
// own origin. Fallback = real production URL so deploys work even if
// NEXT_PUBLIC_SITE_URL is misconfigured in the Vercel dashboard.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://linder-watch.vercel.app";
