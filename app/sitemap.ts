import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Only public, indexable routes.
// /configure/summary, /test-watch, /test-state are explicitly
// noindex — keeping them out of the sitemap too.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      priority: 1.0,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/configure`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
  ];
}
