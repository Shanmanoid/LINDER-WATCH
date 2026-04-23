import { PriceDelta } from "./PriceDelta";

export interface SwatchButtonProps {
  label: string;
  mainColor: string;
  /**
   * Optional explicit rim colour. If `metallic` is true and this is
   * omitted, the rim is derived from mainColor via color-mix toward
   * black — enough darker edge for hand swatches without needing an
   * explicit shadow palette entry per hand.
   */
  rimColor?: string;
  /**
   * Metallic = three-layer inset box-shadow (top highlight, bottom
   * shadow, rim) that simulates a 3D sphere without using gradients.
   * Flat = single thin rule-colour rim for painted surfaces (dial).
   */
  metallic?: boolean;
  selected: boolean;
  priceDelta: number;
  onClick: () => void;
}

export function SwatchButton({
  label,
  mainColor,
  rimColor,
  metallic = false,
  selected,
  priceDelta,
  onClick,
}: SwatchButtonProps) {
  const effectiveRim =
    rimColor ?? `color-mix(in srgb, ${mainColor} 55%, #000)`;

  const boxShadow = metallic
    ? `inset 0 -6px 8px -4px rgba(0,0,0,0.15), inset 0 6px 8px -4px rgba(255,255,255,0.3), inset 0 0 0 1.5px ${effectiveRim}`
    : rimColor
      ? `inset 0 0 0 2px ${rimColor}`
      : `inset 0 0 0 1px var(--color-rule)`;

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-sm transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
    >
      <span className="relative inline-block">
        <span
          className="block rounded-full w-10 h-10 md:w-12 md:h-12"
          style={{ backgroundColor: mainColor, boxShadow }}
        />
        {selected && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-3.5px] rounded-full border-[1.5px] border-ink"
          />
        )}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mist">
        {label}
      </span>
      {selected && <PriceDelta value={priceDelta} />}
    </button>
  );
}
