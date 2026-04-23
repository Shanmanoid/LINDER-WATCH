"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorialScreen } from "@/components/editorial/EditorialScreen";
import { PriceDelta } from "@/components/ui/PriceDelta";
import { Watch } from "@/components/watch/Watch";
import { ENGRAVING_PRICE_EUR } from "@/lib/constants";
import { ENGRAVING_FONT_FAMILIES } from "@/lib/fonts";
import { computeTotal } from "@/lib/pricing";
import {
  BREAKDOWN_GROUPS,
  buildSummarySentence,
  ENGRAVING_FONT_NAMES,
  getBreakdownCell,
} from "@/lib/summary";
import type { WatchConfig } from "@/lib/types";
import { useWatchConfigSync } from "@/lib/useWatchConfigSync";
import { useWatchStore } from "@/lib/watchStore";

const SERIF = { fontFamily: "var(--font-display), serif" };

export function SummaryClient() {
  const { ready } = useWatchConfigSync();
  const store = useWatchStore();
  const router = useRouter();

  if (!ready) {
    return (
      <EditorialScreen
        meta="LINDER · BERLIN · 1978"
        heading="LINDER"
        message="Loading summary"
        status="loading"
      />
    );
  }

  const config: WatchConfig = {
    caseMaterial: store.caseMaterial,
    dialColor: store.dialColor,
    indexStyle: store.indexStyle,
    handColor: store.handColor,
    complication: store.complication,
    strapMaterial: store.strapMaterial,
    caseSize: store.caseSize,
    view: store.view,
    engraving: store.engraving,
    engravingFont: store.engravingFont,
  };
  const total = computeTotal(config);
  const sentence = buildSummarySentence(config);
  const formattedTotal = `€${total.toLocaleString("en-US")}`;

  function handleStartOver() {
    // reset() → persist rewrites localStorage with DEFAULT_CONFIG;
    // router.replace (not push) so browser back doesn't return to
    // a summary with a just-reset config.
    store.reset();
    router.replace("/configure");
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* ─── Top editorial meta bar ─────────────────────────── */}
      <div className="flex justify-between px-8 lg:px-16 py-6 lg:py-8 font-mono text-[10px] tracking-[0.14em] uppercase text-mist">
        <span>LINDER · BERLIN · 1978</span>
        <span>Your configuration</span>
      </div>

      {/* ─── LINDER wordmark (caption, not hero) ────────────── */}
      <div className="flex flex-col items-center mt-4">
        <h1
          className="text-[40px] lg:text-[56px] leading-none text-ink"
          style={SERIF}
        >
          LINDER
        </h1>
      </div>

      {/* ─── Watches: hero, front + back side-by-side ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center justify-items-center max-w-[1440px] mx-auto px-8 lg:px-16 py-8 lg:py-12">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-[600px]">
            <Watch {...config} view="front" />
          </div>
          <p className="mt-10 font-mono text-[11px] tracking-[0.14em] uppercase text-mist">
            Front
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-[600px]">
            <Watch {...config} view="back" />
          </div>
          <p className="mt-10 font-mono text-[11px] tracking-[0.14em] uppercase text-mist">
            Back
          </p>
        </div>
      </div>

      {/* ─── Subtitle sentence (roman, not italic) ──────────── */}
      <p
        className="mt-10 text-[22px] lg:text-[28px] leading-[1.4] text-ink max-w-[680px] mx-auto px-8 lg:px-0 text-center"
        style={SERIF}
      >
        {sentence}
      </p>

      {/* ─── Breakdown (data-driven groups) ─────────────────── */}
      <div className="max-w-[720px] mx-auto px-8 lg:px-0 mt-10 lg:mt-14">
        {BREAKDOWN_GROUPS.map((group, groupIndex) => (
          <div
            key={group.id}
            className={
              groupIndex === 0
                ? ""
                : "mt-8 border-t border-ink/20"
            }
          >
            <h2 className="font-mono text-[10px] tracking-[0.14em] uppercase text-mist pt-6 pb-4">
              {group.title}
            </h2>
            {group.rows.map((row, rowIndex) => {
              const cell = getBreakdownCell(config, row.key);
              const isLast = rowIndex === group.rows.length - 1;
              return (
                <div
                  key={row.key}
                  className={
                    "flex justify-between items-baseline py-3 " +
                    (isLast ? "" : "border-b border-rule")
                  }
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-mist">
                      {row.label}
                    </span>
                    <span className="text-mist">·</span>
                    <span
                      className="text-[16px] leading-none text-ink"
                      style={SERIF}
                    >
                      {cell.value}
                    </span>
                  </div>
                  <span className="font-mono text-[13px] text-ink tabular-nums">
                    <PriceDelta value={cell.delta} />
                  </span>
                </div>
              );
            })}
          </div>
        ))}

        {/* Engraving — conditional group, different inner structure */}
        {config.engraving.length > 0 && (
          <div className="mt-8 border-t border-ink/20">
            <h2 className="font-mono text-[10px] tracking-[0.14em] uppercase text-mist pt-6 pb-4">
              Engraving
            </h2>
            <div className="flex justify-between items-baseline py-3 gap-6">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="text-[20px] leading-none text-ink uppercase"
                  style={{
                    fontFamily:
                      ENGRAVING_FONT_FAMILIES[config.engravingFont],
                  }}
                >
                  {`"${config.engraving}"`}
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-mist">
                  in {ENGRAVING_FONT_NAMES[config.engravingFont]}
                </span>
              </div>
              <span className="font-mono text-[13px] text-ink tabular-nums">
                +€{ENGRAVING_PRICE_EUR}
              </span>
            </div>
          </div>
        )}

        {/* ─── TOTAL — finale, dominant typography ────────── */}
        <div className="flex justify-between items-baseline mt-12 lg:mt-16 border-t border-ink pt-8 pb-4">
          <h2 className="font-mono text-[12px] tracking-[0.14em] uppercase text-ink">
            Total
          </h2>
          <span
            className="text-[56px] lg:text-[72px] leading-[0.9] text-ink tabular-nums"
            style={SERIF}
          >
            {formattedTotal}
          </span>
        </div>
      </div>

      {/* ─── CTA block ──────────────────────────────────────── */}
      <div className="flex flex-col items-center mt-12 lg:mt-16 gap-6">
        <Link
          href="/configure"
          className="inline-block bg-ink text-paper px-10 py-5 font-mono text-[13px] tracking-[0.12em] uppercase hover:bg-ink/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
        >
          ← Edit configuration
        </Link>
        <button
          type="button"
          onClick={handleStartOver}
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-mist hover:text-ink underline-offset-4 hover:underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
        >
          Start over →
        </button>
      </div>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-mist text-center mt-24 lg:mt-32 pb-12">
        Delivered in 4–6 weeks · Made in Berlin
      </p>
    </main>
  );
}
