"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { computeTotal } from "@/lib/pricing";
import type { WatchConfig } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";

export function PricePill() {
  // Full-store subscription is correct here — the price depends on
  // every config field, so any change must trigger a recompute.
  const store = useWatchStore();
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

  const [pulse, setPulse] = useState(false);
  const prevTotal = useRef(total);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Skip the first effect run — initial hydration of persisted
    // state would otherwise trigger a spurious pulse on page load.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      prevTotal.current = total;
      return;
    }
    if (prevTotal.current !== total) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 150);
      prevTotal.current = total;
      return () => clearTimeout(t);
    }
  }, [total]);

  const formatted = `€${total.toLocaleString("en-US")}`;

  return (
    <div
      className="fixed z-50 bg-paper left-0 right-0 bottom-0 border-t border-rule lg:left-8 lg:right-auto lg:bottom-8 lg:border lg:border-rule flex items-center justify-between lg:justify-start lg:gap-6 px-6 py-5 lg:py-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] lg:pb-4"
    >
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-mist">
          Total
        </span>
        <span
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`text-[28px] lg:text-[32px] text-ink leading-none transition-opacity duration-150 ${pulse ? "opacity-60" : "opacity-100"}`}
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {formatted}
        </span>
      </div>

      <Link
        href="/configure/summary"
        className="inline-block bg-ink text-paper px-5 py-3.5 font-mono text-[13px] lg:text-[12px] tracking-[0.12em] uppercase hover:bg-ink/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
      >
        Review →
      </Link>
    </div>
  );
}
