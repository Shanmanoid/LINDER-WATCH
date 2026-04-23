// Single source of truth for the production origin. Consumed by
// metadataBase, sitemap.ts, robots.ts, and OG image defaults.
//
// TODO: replace placeholder with the real Vercel URL once deployed.
// Prefer reading from process.env.NEXT_PUBLIC_SITE_URL so env-based
// preview deploys pick up their own origin automatically.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://linder-watches.vercel.app";
