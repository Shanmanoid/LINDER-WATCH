import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "500",
});

const SITE_TITLE = "LINDER — Quiet watches, made slowly.";
const SITE_DESCRIPTION =
  "Design your LINDER wristwatch. Bauhaus precision, made in Berlin since 1978.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — LINDER",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "LINDER",
    "watch configurator",
    "Bauhaus",
    "German watch",
    "minimalist watch",
    "Berlin",
  ],
  authors: [{ name: "LINDER" }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "LINDER",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // Explicit image over implicit og:image fallback — Twitter's
    // crawler is less predictable than other platforms.
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      {/*
        suppressHydrationWarning on <body> only. Browser extensions
        (ColorZilla, Compose AI, etc.) inject attributes like
        cz-shortcut-listen on body after SSR but before React hydration.
        This is a React 19 / Next.js recommended pattern for this
        specific case. Does NOT cascade to children.
      */}
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
