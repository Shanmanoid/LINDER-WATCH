"use client";

import { PreviewCard } from "@/components/ui/PreviewCard";
import { INDEX_STYLE_PRICES } from "@/lib/constants";
import { INDEX_STYLE_LABELS } from "@/lib/labels";
import type { IndexStyleId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

const SERIF_STYLE = { fontFamily: "var(--font-display), serif" };

const OPTIONS: ReadonlyArray<{
  id: IndexStyleId;
  preview: React.ReactNode;
}> = [
  {
    id: "arabic-cardinals",
    preview: (
      <span
        style={SERIF_STYLE}
        className="text-[16px] text-ink tracking-[0.25em]"
      >
        12 · 3 · 6 · 9
      </span>
    ),
  },
  {
    id: "roman",
    preview: (
      <span
        style={SERIF_STYLE}
        className="text-[14px] text-ink tracking-[0.18em]"
      >
        XII · III · VI · IX
      </span>
    ),
  },
  {
    id: "sticks-only",
    preview: (
      <span className="font-mono text-[16px] text-ink tracking-[0.3em]">
        — · — · — · —
      </span>
    ),
  },
];

export interface IndexStyleSectionProps {
  number: number;
}

export function IndexStyleSection({ number }: IndexStyleSectionProps) {
  const selected = useWatchStore((s) => s.indexStyle);
  const setIndexStyle = useWatchStore((s) => s.setIndexStyle);

  return (
    <SectionLayout number={number} title="Index style">
      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map((opt) => (
          <PreviewCard
            key={opt.id}
            label={INDEX_STYLE_LABELS[opt.id]}
            preview={opt.preview}
            selected={selected === opt.id}
            priceDelta={INDEX_STYLE_PRICES[opt.id]}
            onClick={() => setIndexStyle(opt.id)}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
