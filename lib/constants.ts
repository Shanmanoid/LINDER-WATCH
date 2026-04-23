import type {
  CaseMaterialId,
  CaseSizeId,
  ComplicationId,
  DialColorId,
  HandColorId,
  IndexStyleId,
  StrapMaterialId,
} from "./types";

// Base price from CLAUDE.md §5. All deltas are offsets from this base.
export const BASE_PRICE_EUR = 1450;

// Separate records per category so the shared "black" / "silver" ids
// across dial and hand don't collide under a single string keyspace.

export const CASE_MATERIAL_PRICES: Record<CaseMaterialId, number> = {
  steel: 0,
  "rose-gold": 800,
  "yellow-gold": 950,
  blackened: 200,
};

export const DIAL_COLOR_PRICES: Record<DialColorId, number> = {
  white: 0,
  silver: 0,
  black: 100,
  navy: 150,
  cream: 80,
};

export const INDEX_STYLE_PRICES: Record<IndexStyleId, number> = {
  "arabic-cardinals": 0,
  roman: 180,
  "sticks-only": -50,
};

export const HAND_COLOR_PRICES: Record<HandColorId, number> = {
  blue: 0,
  black: 0,
  silver: 0,
  gold: 120,
};

export const COMPLICATION_PRICES: Record<ComplicationId, number> = {
  "sub-seconds-six": 0,
  "sub-seconds-nine": 0,
  none: -100,
};

export const STRAP_MATERIAL_PRICES: Record<StrapMaterialId, number> = {
  "black-calf": 0,
  "brown-calf": 0,
  "tan-leather": 50,
  "steel-bracelet": 380,
  "nato-textile": -80,
};

export const CASE_SIZE_PRICES: Record<CaseSizeId, number> = {
  "35mm": -50,
  "38mm": 0,
  "41mm": 80,
};

export const ENGRAVING_PRICE_EUR = 200;

export function formatPriceDelta(delta: number): string {
  if (delta === 0) return "";
  const sign = delta > 0 ? "+" : "−"; // proper minus sign, not hyphen
  return `${sign}${Math.abs(delta)}`;
}
