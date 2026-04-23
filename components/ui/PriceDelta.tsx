import { formatPriceDelta } from "@/lib/constants";

export interface PriceDeltaProps {
  value: number;
  className?: string;
}

export function PriceDelta({ value, className = "" }: PriceDeltaProps) {
  const text = formatPriceDelta(value);
  if (!text) return null;
  return (
    <span
      className={`font-mono text-[9px] tracking-[0.05em] text-mist ${className}`}
    >
      {text}
    </span>
  );
}
