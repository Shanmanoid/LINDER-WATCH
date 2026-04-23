"use client";

import { SwatchButton } from "@/components/ui/SwatchButton";
import { DIAL_PALETTES } from "@/components/watch/geometry";
import { DIAL_COLOR_PRICES } from "@/lib/constants";
import { DIAL_COLOR_LABELS } from "@/lib/labels";
import type { DialColorId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

const IDS: readonly DialColorId[] = [
  "white",
  "silver",
  "black",
  "navy",
  "cream",
];

export interface DialColorSectionProps {
  number: number;
}

export function DialColorSection({ number }: DialColorSectionProps) {
  const selected = useWatchStore((s) => s.dialColor);
  const setDialColor = useWatchStore((s) => s.setDialColor);

  return (
    <SectionLayout number={number} title="Dial color">
      <div className="grid grid-cols-5 gap-3">
        {IDS.map((id) => (
          <SwatchButton
            key={id}
            label={DIAL_COLOR_LABELS[id]}
            mainColor={DIAL_PALETTES[id].background}
            selected={selected === id}
            priceDelta={DIAL_COLOR_PRICES[id]}
            onClick={() => setDialColor(id)}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
