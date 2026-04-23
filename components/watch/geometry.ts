export const VIEWBOX = "0 0 400 500";

export const CENTER = { x: 200, y: 250 } as const;

export const CASE_RADIUS = 130;
export const CASE_INNER_RADIUS = CASE_RADIUS - 14;
export const DIAL_RADIUS = CASE_INNER_RADIUS - 6;
export const MINUTE_TRACK_RADIUS = DIAL_RADIUS - 6;
export const HOUR_INDEX_RADIUS = MINUTE_TRACK_RADIUS - 16;

export const CROWN = {
  x: CENTER.x + CASE_RADIUS,
  y: CENTER.y,
  width: 8,
  height: 18,
  radius: 1,
  capRadius: 2,
  capOffset: 1,
} as const;

export const SUB_DIAL = {
  radius: 26,
  offset: 52,
} as const;

export const STRAP = {
  upperExtentY: 20,
  // Pulled slightly inward so the rounded-end curve stays within viewBox.
  lowerExtentY: 494,
} as const;

// Strap widths are derived from the effective case diameter so the
// case:strap ratio stays constant across 35/38/41mm. Ratios are the
// observed 38mm reference (140/260 near, 115/260 far).
export const STRAP_RATIOS = {
  nearCase: 140 / 260,
  far: 115 / 260,
} as const;

export const HANDS = {
  hourLength: 58,
  hourWidth: 6,
  minuteLength: 88,
  minuteWidth: 4,
  secondLength: 96,
  // Bumped from 1.5 — reads as a proper seconds hand instead of a
  // hairline once anti-aliased on the scale-transformed group.
  secondWidth: 1.8,
  pinRadius: 3,
} as const;

export const TIME_10_10_30 = {
  hourDeg: (10 + 10.5 / 60) * 30,
  minuteDeg: (10 + 30 / 60) * 6,
  secondDeg: 30 * 6,
} as const;

export function polar(
  angleDeg: number,
  radius: number,
  cx: number = CENTER.x,
  cy: number = CENTER.y,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

// Precomputed cardinal-radius positions for each hour 1..12.
export interface HourPosition {
  hour: number;
  angleDeg: number;
  x: number;
  y: number;
}

export const HOUR_POSITIONS: readonly HourPosition[] = Array.from(
  { length: 12 },
  (_, i) => {
    const hour = i + 1;
    const angleDeg = hour * 30;
    const { x, y } = polar(angleDeg, HOUR_INDEX_RADIUS);
    return { hour, angleDeg, x, y };
  },
);

// ───── Material / colour palettes ─────
import type {
  CaseMaterialId,
  CaseSizeId,
  DialColorId,
  HandColorId,
  StrapMaterialId,
} from "@/lib/types";

// Case size scale factors — applied as transform on case+dial+hands.
// 35/38 ≈ 0.921 and 41/38 ≈ 1.079; these are slightly softened so the
// visual jump between sizes reads as deliberate, not a raw ratio.
export const SIZE_SCALE: Record<CaseSizeId, number> = {
  "35mm": 0.916,
  "38mm": 1.0,
  "41mm": 1.077,
};

export function getEffectiveCaseRadius(size: CaseSizeId): number {
  return CASE_RADIUS * SIZE_SCALE[size];
}

export interface CaseMaterialPalette {
  outerRing: string;
  innerRing: string;
  bevel: string;
  shadow: string;
  // Dedicated pair for BackCase engraving — disc fill + text colour.
  // Kept explicit so dark materials (blackened) can flip to light-on-dark
  // without complicating the render path.
  backMedallion: string;
  backText: string;
}

export const CASE_PALETTES: Record<CaseMaterialId, CaseMaterialPalette> = {
  steel: {
    outerRing: "var(--color-case-steel)",
    innerRing: "#a8a6a1",
    bevel: "#e8e6e1",
    shadow: "#7a7975",
    backMedallion: "#e8e6e1",
    backText: "#3a3836",
  },
  "rose-gold": {
    outerRing: "var(--color-case-rose-gold)",
    innerRing: "#a88b6f",
    bevel: "#e0c8b0",
    shadow: "#8b6f52",
    backMedallion: "#e0c8b0",
    backText: "#4a2e1c",
  },
  "yellow-gold": {
    outerRing: "var(--color-case-yellow-gold)",
    innerRing: "#b89b5c",
    bevel: "#e8d89c",
    shadow: "#9b7e40",
    backMedallion: "#e8d89c",
    backText: "#3a2c10",
  },
  blackened: {
    outerRing: "var(--color-case-blackened)",
    innerRing: "#1a1818",
    bevel: "#3a3836",
    shadow: "#0a0808",
    backMedallion: "#3a3836",
    backText: "#d0ccc0",
  },
};

export interface DialPalette {
  background: string;
  textColor: string;
  subDialBackground: string;
  subDialTextColor: string;
  brandTextColor: string;
  minuteTrackOpacity: number;
}

export const DIAL_PALETTES: Record<DialColorId, DialPalette> = {
  white: {
    background: "var(--color-dial-white)",
    textColor: "#1a1a1a",
    subDialBackground: "#f0efeb",
    subDialTextColor: "#1a1a1a",
    brandTextColor: "#1a1a1a",
    minuteTrackOpacity: 0.65,
  },
  silver: {
    background: "var(--color-dial-silver)",
    textColor: "#1a1a1a",
    subDialBackground: "#e8e5dd",
    subDialTextColor: "#1a1a1a",
    brandTextColor: "#1a1a1a",
    minuteTrackOpacity: 0.65,
  },
  black: {
    background: "var(--color-dial-black)",
    textColor: "#f5f5f0",
    subDialBackground: "#0a0a08",
    subDialTextColor: "#f5f5f0",
    brandTextColor: "#f5f5f0",
    minuteTrackOpacity: 0.45,
  },
  navy: {
    background: "var(--color-dial-navy)",
    textColor: "#f0ebe0",
    subDialBackground: "#162840",
    subDialTextColor: "#f0ebe0",
    brandTextColor: "#f0ebe0",
    minuteTrackOpacity: 0.45,
  },
  cream: {
    background: "var(--color-dial-cream)",
    textColor: "#3a2818",
    subDialBackground: "#e8dab8",
    subDialTextColor: "#3a2818",
    brandTextColor: "#3a2818",
    minuteTrackOpacity: 0.65,
  },
};

export const HAND_COLORS: Record<HandColorId, string> = {
  blue: "var(--color-linder-blue)",
  black: "#1a1a1a",
  silver: "#c8c5c0",
  gold: "#d4b87c",
};

export interface LeatherStrapPalette {
  leather: string;
  highlight: string;
  shadow: string;
  stitch: string;
  keeperStroke: string;
}

// Leather variants only; steel-bracelet / nato-textile need bespoke
// geometry and land in 1b2-b.
// Steel bracelet — 3-link structure across the strap width.
// Ratios are fractions of the effective case diameter so widths
// scale with case size (same pattern as STRAP_RATIOS).
export const BRACELET_RATIOS = {
  outerLink: 0.195,
  centreLink: 0.13,
  linkGap: 1.5 / 260, // ~0.00577 — tiny absolute gap translated to ratio
} as const;

// Individual link "row" height — the spacing between horizontal
// dividers along the bracelet length.
export const BRACELET_LINK_HEIGHT = 14;

// How far the outer corners of end-links crimp inward toward case arc.
export const BRACELET_CRIMP_INSET = 6;
export const BRACELET_CRIMP_HEIGHT = 12;

// BackCase central medallion radius — disc with engraving/fallback text.
export const BACK_CASE = {
  medallionRadius: DIAL_RADIUS * 0.85,
} as const;

// NATO textile — fixed fabric palette, does not follow case material.
export const NATO_PALETTE = {
  base: "#3a3a3a",
  stripe: "var(--color-linder-blue)",
  stitching: "#5a5a5a",
  keeperStroke: "#5a5a5a",
} as const;

// NATO width ratios: near-case matches leather so switching doesn't
// inflate the watch; far uses a lighter taper (0.07 vs leather's 0.096)
// to hint at fabric-vs-leather without a perceptible shape change.
export const NATO_RATIOS = {
  nearCase: STRAP_RATIOS.nearCase,
  far: STRAP_RATIOS.nearCase - 0.07,
} as const;

export const NATO_STRIPE_RATIO = 0.27;
export const NATO_KEEPER_POSITIONS = [0.25, 0.55] as const;
export const NATO_TAIL_LENGTH = 25;
export const NATO_TAIL_WIDTH_RATIO = 0.85;

export function getEngravingFontSize(length: number): number {
  if (length <= 8) return 26;
  if (length <= 16) return 20;
  return 15;
}

export const LEATHER_STRAP_PALETTES: Partial<
  Record<StrapMaterialId, LeatherStrapPalette>
> = {
  "black-calf": {
    leather: "var(--color-strap-black)",
    highlight: "#3a3a38",
    shadow: "#0a0a08",
    stitch: "#6a6a68",
    keeperStroke: "#4a4a48",
  },
  "brown-calf": {
    leather: "var(--color-strap-brown)",
    highlight: "#6b4a33",
    shadow: "#2a1a0a",
    stitch: "#c9a86a",
    keeperStroke: "#5a3820",
  },
  "tan-leather": {
    leather: "var(--color-strap-tan)",
    highlight: "#c48a5a",
    shadow: "#6a4018",
    stitch: "#3a2818",
    keeperStroke: "#8a5028",
  },
};
