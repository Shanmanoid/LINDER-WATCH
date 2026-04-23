import {
  CASE_MATERIAL_PRICES,
  CASE_SIZE_PRICES,
  COMPLICATION_PRICES,
  DIAL_COLOR_PRICES,
  HAND_COLOR_PRICES,
  INDEX_STYLE_PRICES,
  STRAP_MATERIAL_PRICES,
} from "./constants";
import {
  CASE_MATERIAL_LABELS,
  CASE_SIZE_LABELS,
  COMPLICATION_LABELS,
  DIAL_COLOR_LABELS,
  HAND_COLOR_LABELS,
  INDEX_STYLE_LABELS,
  STRAP_MATERIAL_LABELS,
} from "./labels";
import type {
  CaseMaterialId,
  CaseSizeId,
  ComplicationId,
  DialColorId,
  EngravingFontId,
  HandColorId,
  IndexStyleId,
  StrapMaterialId,
  WatchConfig,
} from "./types";

// Natural-language forms — separate register from labels.ts, used
// only for the summary subtitle sentence. Strap values DO NOT include
// the word "strap"; buildSummarySentence adds " strap" / "a steel
// bracelet" conditionally so the phrasing stays natural.

const CASE_MATERIAL_PROSE: Record<CaseMaterialId, string> = {
  steel: "steel",
  "rose-gold": "rose gold",
  "yellow-gold": "yellow gold",
  blackened: "blackened steel",
};

const DIAL_COLOR_PROSE: Record<DialColorId, string> = {
  white: "white",
  silver: "silver",
  black: "black",
  navy: "navy",
  cream: "cream",
};

const INDEX_STYLE_PROSE: Record<IndexStyleId, string> = {
  "arabic-cardinals": "arabic",
  roman: "roman",
  "sticks-only": "stick",
};

const HAND_COLOR_PROSE: Record<HandColorId, string> = {
  blue: "blue",
  black: "black",
  silver: "silver",
  gold: "gold",
};

const COMPLICATION_PROSE: Record<ComplicationId, string> = {
  "sub-seconds-six": "Small seconds at 6",
  "sub-seconds-nine": "Small seconds at 9",
  none: "No complications",
};

const STRAP_PROSE: Record<StrapMaterialId, string> = {
  "black-calf": "black calf leather",
  "brown-calf": "brown calf leather",
  "tan-leather": "tan leather",
  "steel-bracelet": "steel bracelet",
  "nato-textile": "NATO textile",
};

const SIZE_PROSE: Record<CaseSizeId, string> = {
  "35mm": "35mm",
  "38mm": "38mm",
  "41mm": "41mm",
};

export function buildSummarySentence(config: WatchConfig): string {
  const strapPhrase = strapClause(config.strapMaterial);
  const engravingPhrase = config.engraving
    ? ` Engraved "${config.engraving}".`
    : "";

  return (
    `A ${CASE_MATERIAL_PROSE[config.caseMaterial]} case ` +
    `with ${DIAL_COLOR_PROSE[config.dialColor]} dial, ` +
    `${INDEX_STYLE_PROSE[config.indexStyle]} indexes, ` +
    `and ${HAND_COLOR_PROSE[config.handColor]} hands. ` +
    `${COMPLICATION_PROSE[config.complication]}, on ${strapPhrase}. ` +
    `${SIZE_PROSE[config.caseSize]} case.${engravingPhrase}`
  );
}

function strapClause(strap: StrapMaterialId): string {
  // Bracelet is a discrete noun; leathers/textile take the word "strap".
  if (strap === "steel-bracelet") return "a steel bracelet";
  return `a ${STRAP_PROSE[strap]} strap`;
}

// ─── Breakdown groups (summary invoice view) ──────────────────────

export type BreakdownKey =
  | "caseMaterial"
  | "caseSize"
  | "dialColor"
  | "indexStyle"
  | "handColor"
  | "complication"
  | "strapMaterial";

export interface BreakdownRow {
  label: string;
  key: BreakdownKey;
}

export interface BreakdownGroup {
  id: string;
  title: string;
  rows: ReadonlyArray<BreakdownRow>;
}

export const BREAKDOWN_GROUPS: ReadonlyArray<BreakdownGroup> = [
  {
    id: "case",
    title: "Case",
    rows: [
      { label: "Material", key: "caseMaterial" },
      { label: "Size", key: "caseSize" },
    ],
  },
  {
    id: "dial",
    title: "Dial",
    rows: [
      { label: "Color", key: "dialColor" },
      { label: "Indexes", key: "indexStyle" },
      { label: "Hands", key: "handColor" },
    ],
  },
  {
    id: "movement",
    title: "Movement",
    rows: [{ label: "Complication", key: "complication" }],
  },
  {
    id: "strap",
    title: "Strap",
    rows: [{ label: "Material", key: "strapMaterial" }],
  },
];

export function getBreakdownCell(
  config: WatchConfig,
  key: BreakdownKey,
): { value: string; delta: number } {
  switch (key) {
    case "caseMaterial":
      return {
        value: CASE_MATERIAL_LABELS[config.caseMaterial],
        delta: CASE_MATERIAL_PRICES[config.caseMaterial],
      };
    case "caseSize":
      return {
        value: CASE_SIZE_LABELS[config.caseSize],
        delta: CASE_SIZE_PRICES[config.caseSize],
      };
    case "dialColor":
      return {
        value: DIAL_COLOR_LABELS[config.dialColor],
        delta: DIAL_COLOR_PRICES[config.dialColor],
      };
    case "indexStyle":
      return {
        value: INDEX_STYLE_LABELS[config.indexStyle],
        delta: INDEX_STYLE_PRICES[config.indexStyle],
      };
    case "handColor":
      return {
        value: HAND_COLOR_LABELS[config.handColor],
        delta: HAND_COLOR_PRICES[config.handColor],
      };
    case "complication":
      return {
        value: COMPLICATION_LABELS[config.complication],
        delta: COMPLICATION_PRICES[config.complication],
      };
    case "strapMaterial":
      return {
        value: STRAP_MATERIAL_LABELS[config.strapMaterial],
        delta: STRAP_MATERIAL_PRICES[config.strapMaterial],
      };
  }
}

export const ENGRAVING_FONT_NAMES: Record<EngravingFontId, string> = {
  "instrument-serif": "Instrument Serif",
  "jetbrains-mono": "JetBrains Mono",
  inter: "Inter",
  cormorant: "Cormorant Garamond",
};
