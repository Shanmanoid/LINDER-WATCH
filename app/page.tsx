import type { Metadata } from "next";
import Link from "next/link";
import { Watch } from "@/components/watch/Watch";
import type { WatchConfig } from "@/lib/types";

export const metadata: Metadata = {
  title: "LINDER — Handbuilt in Berlin since 1978",
  description:
    "Configure your LINDER wristwatch. Swiss movement, Bauhaus design, hand-finished in Berlin.",
};

const HERO_CONFIG: WatchConfig = {
  caseMaterial: "steel",
  dialColor: "navy",
  indexStyle: "arabic-cardinals",
  handColor: "gold",
  complication: "sub-seconds-six",
  // Tan-leather picks up the amber accent and "1978" backdrop —
  // black-calf disappeared against the ink-deep dark zone.
  strapMaterial: "tan-leather",
  caseSize: "38mm",
  engraving: "",
  engravingFont: "instrument-serif",
  view: "front",
};

const SERIF_STYLE = { fontFamily: "var(--font-display), serif" };

// Desktop: diagonal from (55%, 0) at top edge down to (40%, 100%) at
// bottom. Narrow trapezoidal dark zone on the right — watch sits
// inside it at max-w-[520px]; LINDER, story and CTA stay on paper.
// 55% (not 60%) at top because watch's top-left corner at x≈784 would
// bleed onto paper with 60% (line_x=816 at y=149).
const DARK_ZONE_DESKTOP = {
  clipPath: "polygon(100% 0%, 100% 100%, 40% 100%, 55% 0%)",
} as const;

// Mobile: flat band covering the top 55% where the hero watch lives.
const DARK_ZONE_MOBILE = {
  clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 55%)",
} as const;

export default function LandingPage() {
  return (
    <main className="relative min-h-screen md:h-screen flex flex-col bg-paper overflow-hidden">
      {/* Dark zone — mobile (horizontal top band) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink-deep md:hidden z-0"
        style={DARK_ZONE_MOBILE}
      />
      {/* Dark zone — desktop (diagonal) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink-deep hidden md:block z-0"
        style={DARK_ZONE_DESKTOP}
      />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Editorial front-matter bar — crosses both zones on desktop;
            text-mist has enough contrast on both paper and ink-deep. */}
        {/* Split meta bar: left lands on paper (desktop) / dark (mobile),
            right always lands on dark zone. Two different mist tones
            keep WCAG AA on both backgrounds without a single "safe" grey
            that would pass only ~3:1 on each. */}
        <div className="flex justify-between px-6 md:px-14 py-6 font-mono text-[10px] tracking-[0.3em] uppercase">
          <span className="text-mist-on-dark md:text-mist">
            N° 001 — LINDER · BERLIN
          </span>
          <span className="text-mist-on-dark">EST. 1978</span>
        </div>

        <div className="flex-1 flex flex-col md:flex-row">
          {/* Story column — DOM-first for reading order, visually
              second on mobile so the hero watch sits above. */}
          <section className="relative w-full md:w-[45%] flex flex-col justify-center px-6 md:px-14 py-8 md:py-0 order-2 md:order-1 bg-paper">
            <h1
              className="text-[72px] md:text-[120px] leading-[0.9] text-ink"
              style={SERIF_STYLE}
            >
              LINDER
            </h1>

            <div className="mt-[18px] md:mt-[24px] w-[60px] h-px bg-graphite" />

            <p className="mt-[9px] md:mt-[12px] font-mono text-[10px] tracking-[0.3em] uppercase text-mist">
              Berlin · 1978
            </p>

            <h2
              className="mt-[48px] md:mt-[64px] text-[42px] md:text-[72px] leading-[1.05] text-ink"
              style={SERIF_STYLE}
            >
              Bauhaus meets <span className="text-amber">horology</span>.
            </h2>

            <p
              className="mt-[18px] md:mt-[24px] text-[16px] md:text-[18px] leading-[1.6] text-graphite max-w-[380px]"
              style={SERIF_STYLE}
            >
              Quiet watches, made slowly. Each LINDER is built in-house in
              Berlin, from Swiss movement to hand-stitched leather.
            </p>

            <div className="mt-[36px] md:mt-[48px]">
              <Link
                href="/configure"
                className="inline-block bg-ink text-paper rounded-none px-12 py-6 text-[20px] tracking-[0.02em] hover:bg-amber hover:text-ink transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
                style={SERIF_STYLE}
              >
                Design your watch <span className="ml-2">→</span>
              </Link>
            </div>

            <p className="mt-[12px] md:mt-[16px] font-mono text-[12px] text-mist">
              From €1,450
            </p>
          </section>

          {/* Watch column — lives on the dark zone in both layouts. */}
          <section className="relative w-full md:w-[55%] flex items-center justify-center px-6 py-6 md:py-0 order-1 md:order-2 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center text-[220px] md:text-[420px] leading-none text-amber-dark select-none pointer-events-none z-0"
              style={SERIF_STYLE}
            >
              1978
            </span>
            <div className="relative z-10 w-full max-w-[320px] md:max-w-[520px]">
              <Watch {...HERO_CONFIG} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
