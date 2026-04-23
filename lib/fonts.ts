import type { EngravingFontId } from "./types";

export const ENGRAVING_FONT_FAMILIES: Record<EngravingFontId, string> = {
  "instrument-serif": "var(--font-display), serif",
  "jetbrains-mono": "var(--font-mono), ui-monospace, monospace",
  inter: "var(--font-sans), sans-serif",
  cormorant: "var(--font-cormorant), serif",
};

export const ENGRAVING_FONT_TRACKING: Record<EngravingFontId, string> = {
  "instrument-serif": "0.12em",
  cormorant: "0.12em",
  inter: "0.08em",
  "jetbrains-mono": "0.04em",
};
