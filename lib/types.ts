export type CaseMaterialId =
  | "steel"
  | "rose-gold"
  | "yellow-gold"
  | "blackened";

export type DialColorId = "white" | "silver" | "black" | "navy" | "cream";

export type IndexStyleId = "arabic-cardinals" | "roman" | "sticks-only";

export type HandColorId = "blue" | "black" | "silver" | "gold";

export type ComplicationId =
  | "sub-seconds-six"
  | "sub-seconds-nine"
  | "none";

export type StrapMaterialId =
  | "black-calf"
  | "brown-calf"
  | "tan-leather"
  | "steel-bracelet"
  | "nato-textile";

export type CaseSizeId = "35mm" | "38mm" | "41mm";

export type ViewSide = "front" | "back";

export type EngravingFontId =
  | "instrument-serif"
  | "jetbrains-mono"
  | "inter"
  | "cormorant";

export interface WatchConfig {
  caseMaterial: CaseMaterialId;
  dialColor: DialColorId;
  indexStyle: IndexStyleId;
  handColor: HandColorId;
  complication: ComplicationId;
  strapMaterial: StrapMaterialId;
  caseSize: CaseSizeId;
  engraving: string;
  engravingFont: EngravingFontId;
  view: ViewSide;
}

export const DEFAULT_CONFIG: WatchConfig = {
  caseMaterial: "steel",
  dialColor: "white",
  indexStyle: "arabic-cardinals",
  handColor: "blue",
  complication: "sub-seconds-six",
  strapMaterial: "black-calf",
  caseSize: "38mm",
  engraving: "",
  engravingFont: "instrument-serif",
  view: "front",
};
