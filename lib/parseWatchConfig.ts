import {
  DEFAULT_CONFIG,
  type CaseMaterialId,
  type CaseSizeId,
  type ComplicationId,
  type DialColorId,
  type EngravingFontId,
  type HandColorId,
  type IndexStyleId,
  type StrapMaterialId,
  type ViewSide,
  type WatchConfig,
} from "@/lib/types";

const CASE_MATERIAL_IDS: readonly CaseMaterialId[] = [
  "steel",
  "rose-gold",
  "yellow-gold",
  "blackened",
];
const DIAL_COLOR_IDS: readonly DialColorId[] = [
  "white",
  "silver",
  "black",
  "navy",
  "cream",
];
const INDEX_STYLE_IDS: readonly IndexStyleId[] = [
  "arabic-cardinals",
  "roman",
  "sticks-only",
];
const HAND_COLOR_IDS: readonly HandColorId[] = [
  "blue",
  "black",
  "silver",
  "gold",
];
const COMPLICATION_IDS: readonly ComplicationId[] = [
  "sub-seconds-six",
  "sub-seconds-nine",
  "none",
];
const STRAP_MATERIAL_IDS: readonly StrapMaterialId[] = [
  "black-calf",
  "brown-calf",
  "tan-leather",
  "steel-bracelet",
  "nato-textile",
];
const CASE_SIZE_IDS: readonly CaseSizeId[] = ["35mm", "38mm", "41mm"];
const VIEW_IDS: readonly ViewSide[] = ["front", "back"];
const FONT_IDS: readonly EngravingFontId[] = [
  "instrument-serif",
  "jetbrains-mono",
  "inter",
  "cormorant",
];

export type RawSearchParams = Record<string, string | string[] | undefined>;

function pickFirst(
  raw: string | string[] | undefined,
): string | undefined {
  if (raw === undefined) return undefined;
  return Array.isArray(raw) ? raw[0] : raw;
}

function pick<T extends string>(
  raw: string | string[] | undefined,
  allowed: readonly T[],
  fallback: T,
  fieldName: string,
): T {
  const value = pickFirst(raw);
  if (value === undefined) return fallback;
  if ((allowed as readonly string[]).includes(value)) {
    return value as T;
  }
  console.warn(
    `[linder] invalid ${fieldName}: "${value}" — using "${fallback}"`,
  );
  return fallback;
}

const ENGRAVING_ALLOWED = /^[A-Za-z0-9 .,\-'&]*$/;
const ENGRAVING_STRIP = /[^A-Za-z0-9 .,\-'&]/g;
const ENGRAVING_MAX = 24;

// Exported so the Zustand store setter can reuse the same rules —
// sanitizing inside the store means the store is always the single
// source of truth for valid engraving text.
export function sanitizeEngraving(
  raw: string | string[] | undefined,
): string {
  const value = pickFirst(raw);
  if (!value) return "";

  let cleaned = value;
  if (!ENGRAVING_ALLOWED.test(value)) {
    cleaned = value.replace(ENGRAVING_STRIP, "");
    console.warn(
      `[linder] engraving: invalid chars removed ("${value}" → "${cleaned}")`,
    );
  }

  if (cleaned.length > ENGRAVING_MAX) {
    const truncated = cleaned.slice(0, ENGRAVING_MAX);
    console.warn(
      `[linder] engraving: truncated to ${ENGRAVING_MAX} chars ("${cleaned}" → "${truncated}")`,
    );
    return truncated;
  }

  return cleaned;
}

const CONFIG_PARAM_KEYS: readonly string[] = [
  "case",
  "dial",
  "indexes",
  "hands",
  "complication",
  "strap",
  "size",
  "view",
  "engraving",
  "font",
];

export function hasAnyConfigParams(params: RawSearchParams): boolean {
  return CONFIG_PARAM_KEYS.some((key) => params[key] !== undefined);
}

// Builds a minimal URLSearchParams — only fields that differ from
// DEFAULT_CONFIG get written, so a reset state produces an empty URL.
export function buildSearchParams(config: WatchConfig): URLSearchParams {
  const params = new URLSearchParams();
  if (config.caseMaterial !== DEFAULT_CONFIG.caseMaterial)
    params.set("case", config.caseMaterial);
  if (config.dialColor !== DEFAULT_CONFIG.dialColor)
    params.set("dial", config.dialColor);
  if (config.indexStyle !== DEFAULT_CONFIG.indexStyle)
    params.set("indexes", config.indexStyle);
  if (config.handColor !== DEFAULT_CONFIG.handColor)
    params.set("hands", config.handColor);
  if (config.complication !== DEFAULT_CONFIG.complication)
    params.set("complication", config.complication);
  if (config.strapMaterial !== DEFAULT_CONFIG.strapMaterial)
    params.set("strap", config.strapMaterial);
  if (config.caseSize !== DEFAULT_CONFIG.caseSize)
    params.set("size", config.caseSize);
  if (config.view !== DEFAULT_CONFIG.view) params.set("view", config.view);
  if (config.engraving !== DEFAULT_CONFIG.engraving)
    params.set("engraving", config.engraving);
  if (config.engravingFont !== DEFAULT_CONFIG.engravingFont)
    params.set("font", config.engravingFont);
  return params;
}

export function parseWatchConfig(params: RawSearchParams): WatchConfig {
  return {
    caseMaterial: pick(
      params.case,
      CASE_MATERIAL_IDS,
      DEFAULT_CONFIG.caseMaterial,
      "case",
    ),
    dialColor: pick(
      params.dial,
      DIAL_COLOR_IDS,
      DEFAULT_CONFIG.dialColor,
      "dial",
    ),
    indexStyle: pick(
      params.indexes,
      INDEX_STYLE_IDS,
      DEFAULT_CONFIG.indexStyle,
      "indexes",
    ),
    handColor: pick(
      params.hands,
      HAND_COLOR_IDS,
      DEFAULT_CONFIG.handColor,
      "hands",
    ),
    complication: pick(
      params.complication,
      COMPLICATION_IDS,
      DEFAULT_CONFIG.complication,
      "complication",
    ),
    strapMaterial: pick(
      params.strap,
      STRAP_MATERIAL_IDS,
      DEFAULT_CONFIG.strapMaterial,
      "strap",
    ),
    caseSize: pick(
      params.size,
      CASE_SIZE_IDS,
      DEFAULT_CONFIG.caseSize,
      "size",
    ),
    view: pick(params.view, VIEW_IDS, DEFAULT_CONFIG.view, "view"),
    engraving: sanitizeEngraving(params.engraving),
    engravingFont: pick(
      params.font,
      FONT_IDS,
      DEFAULT_CONFIG.engravingFont,
      "font",
    ),
  };
}
