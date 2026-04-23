"use client";

import {
  CASE_MATERIAL_LABELS,
  CASE_SIZE_LABELS,
  DIAL_COLOR_LABELS,
} from "@/lib/labels";
import { useWatchStore } from "@/lib/watchStore";

export function WatchLabel() {
  // Selective selectors — component re-renders only when one of
  // these three fields changes, not on every store update.
  const caseMaterial = useWatchStore((s) => s.caseMaterial);
  const caseSize = useWatchStore((s) => s.caseSize);
  const dialColor = useWatchStore((s) => s.dialColor);

  const summary = [
    CASE_MATERIAL_LABELS[caseMaterial],
    CASE_SIZE_LABELS[caseSize],
    `${DIAL_COLOR_LABELS[dialColor]} dial`,
  ].join(" · ");

  return (
    // aria-hidden — Watch SVG (role="img") carries the canonical
    // accessible description of the current configuration. This label
    // is an editorial overlay for sighted users; announcing it would
    // double up the same config info for screen readers.
    <div
      aria-hidden="true"
      className="absolute top-8 left-8 hidden lg:block z-20 pointer-events-none select-none"
    >
      <div
        className="text-[20px] text-ink leading-none"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        LINDER
      </div>
      <div className="w-[30px] h-px bg-graphite mt-3 mb-3" />
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist mb-2">
        Model N° 001
      </div>
      <div className="font-mono text-[11px] tracking-[0.12em] text-graphite">
        {summary}
      </div>
    </div>
  );
}
