"use client";

import { SwatchButton } from "@/components/ui/SwatchButton";
import { HAND_COLORS } from "@/components/watch/geometry";
import { HAND_COLOR_PRICES } from "@/lib/constants";
import { HAND_COLOR_LABELS } from "@/lib/labels";
import type { HandColorId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

const IDS: readonly HandColorId[] = ["blue", "black", "silver", "gold"];

export interface HandColorSectionProps {
  number: number;
}

export function HandColorSection({ number }: HandColorSectionProps) {
  const selected = useWatchStore((s) => s.handColor);
  const setHandColor = useWatchStore((s) => s.setHandColor);

  return (
    <SectionLayout number={number} title="Hand color">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {IDS.map((id) => (
          <SwatchButton
            key={id}
            label={HAND_COLOR_LABELS[id]}
            mainColor={HAND_COLORS[id]}
            metallic
            selected={selected === id}
            priceDelta={HAND_COLOR_PRICES[id]}
            onClick={() => setHandColor(id)}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
