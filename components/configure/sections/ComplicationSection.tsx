"use client";

import { PreviewCard } from "@/components/ui/PreviewCard";
import { COMPLICATION_PRICES } from "@/lib/constants";
import { COMPLICATION_LABELS } from "@/lib/labels";
import type { ComplicationId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

// Schematic icons: viewBox 0 0 56 56, rendered at 56×56. Outer dial
// r=23 + cardinal dots; sub-dial r=7 replaces its cardinal, or a
// central line suggests centre seconds.
interface SchematicProps {
  variant: ComplicationId;
}

function ComplicationSchematic({ variant }: SchematicProps) {
  const stroke = "var(--color-graphite)";
  const dotFill = "var(--color-ink)";

  // Cardinal dot positions on r=23 around (28, 28)
  const cardinals: Array<{ hour: number; cx: number; cy: number }> = [
    { hour: 12, cx: 28, cy: 5 },
    { hour: 3, cx: 51, cy: 28 },
    { hour: 6, cx: 28, cy: 51 },
    { hour: 9, cx: 5, cy: 28 },
  ];

  const skipHour =
    variant === "sub-seconds-six" ? 6 : variant === "sub-seconds-nine" ? 9 : -1;

  return (
    <svg
      viewBox="0 0 56 56"
      className="block w-14 h-14"
      aria-hidden="true"
    >
      <circle
        cx={28}
        cy={28}
        r={23}
        fill="none"
        stroke={stroke}
        strokeWidth={1.25}
      />
      {cardinals
        .filter((c) => c.hour !== skipHour)
        .map((c) => (
          <circle
            key={c.hour}
            cx={c.cx}
            cy={c.cy}
            r={2}
            fill={dotFill}
          />
        ))}
      {variant === "sub-seconds-six" && (
        <circle
          cx={28}
          cy={42}
          r={7}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
        />
      )}
      {variant === "sub-seconds-nine" && (
        <circle
          cx={14}
          cy={28}
          r={7}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
        />
      )}
      {variant === "none" && (
        <line
          x1={28}
          y1={8}
          x2={28}
          y2={48}
          stroke={stroke}
          strokeWidth={1}
        />
      )}
    </svg>
  );
}

const IDS: readonly ComplicationId[] = [
  "sub-seconds-six",
  "sub-seconds-nine",
  "none",
];

export interface ComplicationSectionProps {
  number: number;
}

export function ComplicationSection({ number }: ComplicationSectionProps) {
  const selected = useWatchStore((s) => s.complication);
  const setComplication = useWatchStore((s) => s.setComplication);

  return (
    <SectionLayout number={number} title="Complications">
      <div className="grid grid-cols-3 gap-3">
        {IDS.map((id) => (
          <PreviewCard
            key={id}
            label={COMPLICATION_LABELS[id]}
            preview={<ComplicationSchematic variant={id} />}
            selected={selected === id}
            priceDelta={COMPLICATION_PRICES[id]}
            onClick={() => setComplication(id)}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
