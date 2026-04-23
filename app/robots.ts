import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/configure"],
      disallow: [
        "/configure/summary",
        "/test-watch",
        "/test-state",
        "/api/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
