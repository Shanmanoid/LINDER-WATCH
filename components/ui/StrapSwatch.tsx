import type { ReactNode } from "react";
import { PriceDelta } from "./PriceDelta";

export interface StrapSwatchProps {
  label: string;
  /** Inline SVG / styled markup sized to fill the 80×44 swatch area. */
  pattern: ReactNode;
  selected: boolean;
  priceDelta: number;
  onClick: () => void;
}

export function StrapSwatch({
  label,
  pattern,
  selected,
  priceDelta,
  onClick,
}: StrapSwatchProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-sm transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
    >
      <span className="relative inline-block">
        <span className="block w-20 h-11 rounded-sm overflow-hidden">
          {pattern}
        </span>
        {selected && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-3.5px] rounded-sm border-[1.5px] border-ink"
          />
        )}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mist text-center">
        {label}
      </span>
      {selected && <PriceDelta value={priceDelta} />}
    </button>
  );
}
