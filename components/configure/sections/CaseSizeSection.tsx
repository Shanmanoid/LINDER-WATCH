"use client";

import { PriceDelta } from "@/components/ui/PriceDelta";
import { RadioButton } from "@/components/ui/RadioButton";
import { CASE_SIZE_PRICES } from "@/lib/constants";
import { CASE_SIZE_LABELS } from "@/lib/labels";
import type { CaseSizeId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

const OPTIONS: ReadonlyArray<CaseSizeId> = ["35mm", "38mm", "41mm"];

export interface CaseSizeSectionProps {
  number: number;
}

export function CaseSizeSection({ number }: CaseSizeSectionProps) {
  const selected = useWatchStore((s) => s.caseSize);
  const setCaseSize = useWatchStore((s) => s.setCaseSize);

  return (
    <SectionLayout number={number} title="Case size">
      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map((id) => (
          <RadioButton
            key={id}
            label={CASE_SIZE_LABELS[id].toUpperCase()}
            selected={selected === id}
            onClick={() => setCaseSize(id)}
          />
        ))}
      </div>
      {/* Non-default deltas shown always — lets user see size pricing
          before selecting. PriceDelta renders null for 0, so 38mm is
          an empty grid cell. */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        {OPTIONS.map((id) => (
          <div key={id} className="flex justify-center">
            <PriceDelta value={CASE_SIZE_PRICES[id]} />
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}
