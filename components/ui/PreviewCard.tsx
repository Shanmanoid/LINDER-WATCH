import type { ReactNode } from "react";
import { PriceDelta } from "./PriceDelta";

export interface PreviewCardProps {
  label: string;
  preview: ReactNode;
  selected: boolean;
  priceDelta: number;
  onClick: () => void;
}

export function PreviewCard({
  label,
  preview,
  selected,
  priceDelta,
  onClick,
}: PreviewCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={
        "flex flex-col items-center gap-2 px-3 py-4 rounded-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2 " +
        (selected
          ? "bg-ink/5 border border-ink"
          : "border border-rule hover:bg-bone/60")
      }
    >
      <div className="min-h-[40px] flex items-center justify-center">
        {preview}
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mist">
        {label}
      </span>
      {selected && <PriceDelta value={priceDelta} />}
    </button>
  );
}
