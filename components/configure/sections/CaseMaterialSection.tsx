"use client";

import { SwatchButton } from "@/components/ui/SwatchButton";
import { CASE_PALETTES } from "@/components/watch/geometry";
import { CASE_MATERIAL_PRICES } from "@/lib/constants";
import { CASE_MATERIAL_LABELS } from "@/lib/labels";
import type { CaseMaterialId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

const IDS: readonly CaseMaterialId[] = [
  "steel",
  "rose-gold",
  "yellow-gold",
  "blackened",
];

export interface CaseMaterialSectionProps {
  number: number;
}

export function CaseMaterialSection({ number }: CaseMaterialSectionProps) {
  const selected = useWatchStore((s) => s.caseMaterial);
  const setCaseMaterial = useWatchStore((s) => s.setCaseMaterial);

  return (
    <SectionLayout number={number} title="Case material">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {IDS.map((id) => {
          const palette = CASE_PALETTES[id];
          return (
            <SwatchButton
              key={id}
              label={CASE_MATERIAL_LABELS[id]}
              mainColor={palette.bevel}
              rimColor={palette.shadow}
              metallic
              selected={selected === id}
              priceDelta={CASE_MATERIAL_PRICES[id]}
              onClick={() => setCaseMaterial(id)}
            />
          );
        })}
      </div>
    </SectionLayout>
  );
}
