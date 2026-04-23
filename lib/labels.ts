import type {
  CaseMaterialId,
  CaseSizeId,
  ComplicationId,
  DialColorId,
  HandColorId,
  IndexStyleId,
  StrapMaterialId,
} from "./types";

// Central display labels — consumed by section UIs, WatchLabel, and
// the summary breakdown. Title case, short form, safe to use in any
// UI copy. For natural-language sentence composition (summary subtitle)
// see lib/summary.ts — those are a separate register.

export const CASE_MATERIAL_LABELS: Record<CaseMaterialId, string> = {
  steel: "Steel",
  "rose-gold": "Rose gold",
  "yellow-gold": "Yellow gold",
  blackened: "Blackened",
};

export const DIAL_COLOR_LABELS: Record<DialColorId, string> = {
  white: "White",
  silver: "Silver",
  black: "Black",
  navy: "Navy",
  cream: "Cream",
};

export const INDEX_STYLE_LABELS: Record<IndexStyleId, string> = {
  "arabic-cardinals": "Arabic",
  roman: "Roman",
  "sticks-only": "Sticks",
};

export const HAND_COLOR_LABELS: Record<HandColorId, string> = {
  blue: "Blue",
  black: "Black",
  silver: "Silver",
  gold: "Gold",
};

export const COMPLICATION_LABELS: Record<ComplicationId, string> = {
  "sub-seconds-six": "Sub @ 6",
  "sub-seconds-nine": "Sub @ 9",
  none: "Central seconds",
};

export const STRAP_MATERIAL_LABELS: Record<StrapMaterialId, string> = {
  "black-calf": "Black calf",
  "brown-calf": "Brown calf",
  "tan-leather": "Tan leather",
  "steel-bracelet": "Steel bracelet",
  "nato-textile": "NATO textile",
};

export const CASE_SIZE_LABELS: Record<CaseSizeId, string> = {
  "35mm": "35mm",
  "38mm": "38mm",
  "41mm": "41mm",
};
