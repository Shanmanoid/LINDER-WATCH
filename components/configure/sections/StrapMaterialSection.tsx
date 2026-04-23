"use client";

import type { ReactNode } from "react";
import { StrapSwatch } from "@/components/ui/StrapSwatch";
import { STRAP_MATERIAL_PRICES } from "@/lib/constants";
import { STRAP_MATERIAL_LABELS } from "@/lib/labels";
import type { StrapMaterialId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

function LeatherPattern({
  leather,
  stitch,
}: {
  leather: string;
  stitch: string;
}) {
  return (
    <svg viewBox="0 0 80 44" className="block w-full h-full">
      <rect width={80} height={44} fill={leather} />
      <line
        x1={4}
        x2={76}
        y1={5}
        y2={5}
        stroke={stitch}
        strokeWidth={1}
        strokeDasharray="2 3"
      />
      <line
        x1={4}
        x2={76}
        y1={39}
        y2={39}
        stroke={stitch}
        strokeWidth={1}
        strokeDasharray="2 3"
      />
    </svg>
  );
}

function BraceletPattern() {
  return (
    <svg viewBox="0 0 80 44" className="block w-full h-full">
      <rect x={0} y={0} width={27} height={44} fill="var(--color-case-steel)" />
      <rect x={27} y={0} width={26} height={44} fill="#b0aea7" />
      <rect x={53} y={0} width={27} height={44} fill="var(--color-case-steel)" />
      <line x1={27} y1={0} x2={27} y2={44} stroke="#7a7975" strokeWidth={1} />
      <line x1={53} y1={0} x2={53} y2={44} stroke="#7a7975" strokeWidth={1} />
    </svg>
  );
}

function NatoPattern() {
  return (
    <svg viewBox="0 0 80 44" className="block w-full h-full">
      <rect width={80} height={44} fill="#3a3a3a" />
      <rect x={29} y={0} width={22} height={44} fill="var(--color-linder-blue)" />
    </svg>
  );
}

const OPTIONS: ReadonlyArray<{
  id: StrapMaterialId;
  pattern: ReactNode;
}> = [
  {
    id: "black-calf",
    pattern: <LeatherPattern leather="#1a1a1a" stitch="#6a6a68" />,
  },
  {
    id: "brown-calf",
    pattern: <LeatherPattern leather="#3e2a1f" stitch="#c9a86a" />,
  },
  {
    id: "tan-leather",
    pattern: <LeatherPattern leather="#8b5a2b" stitch="#3a2818" />,
  },
  {
    id: "steel-bracelet",
    pattern: <BraceletPattern />,
  },
  {
    id: "nato-textile",
    pattern: <NatoPattern />,
  },
];

export interface StrapMaterialSectionProps {
  number: number;
}

export function StrapMaterialSection({ number }: StrapMaterialSectionProps) {
  const selected = useWatchStore((s) => s.strapMaterial);
  const setStrapMaterial = useWatchStore((s) => s.setStrapMaterial);

  return (
    <SectionLayout number={number} title="Strap material">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {OPTIONS.map((opt) => (
          <StrapSwatch
            key={opt.id}
            label={STRAP_MATERIAL_LABELS[opt.id]}
            pattern={opt.pattern}
            selected={selected === opt.id}
            priceDelta={STRAP_MATERIAL_PRICES[opt.id]}
            onClick={() => setStrapMaterial(opt.id)}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
