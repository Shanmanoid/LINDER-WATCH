import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { sanitizeEngraving } from "./parseWatchConfig";
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
} from "./types";

interface WatchActions {
  setCaseMaterial: (v: CaseMaterialId) => void;
  setDialColor: (v: DialColorId) => void;
  setIndexStyle: (v: IndexStyleId) => void;
  setHandColor: (v: HandColorId) => void;
  setComplication: (v: ComplicationId) => void;
  setStrapMaterial: (v: StrapMaterialId) => void;
  setCaseSize: (v: CaseSizeId) => void;
  setView: (v: ViewSide) => void;
  setEngraving: (v: string) => void;
  setEngravingFont: (v: EngravingFontId) => void;
  reset: () => void;
}

export type WatchStoreState = WatchConfig & WatchActions;

export const useWatchStore = create<WatchStoreState>()(
  persist(
    (set) => ({
      ...DEFAULT_CONFIG,
      setCaseMaterial: (v) => set({ caseMaterial: v }),
      setDialColor: (v) => set({ dialColor: v }),
      setIndexStyle: (v) => set({ indexStyle: v }),
      setHandColor: (v) => set({ handColor: v }),
      setComplication: (v) => set({ complication: v }),
      setStrapMaterial: (v) => set({ strapMaterial: v }),
      setCaseSize: (v) => set({ caseSize: v }),
      setView: (v) => set({ view: v }),
      // Engraving runs through the same sanitize helper the URL parser
      // uses — the store is the single source of truth for valid text.
      setEngraving: (v) => set({ engraving: sanitizeEngraving(v) }),
      setEngravingFont: (v) => set({ engravingFont: v }),
      reset: () => set({ ...DEFAULT_CONFIG }),
    }),
    {
      name: "linder-watch-config-v1",
      version: 1,
      // Hydration is driven by useWatchConfigSync so we can enforce
      // URL > localStorage > DEFAULT_CONFIG ordering on mount.
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        caseMaterial: state.caseMaterial,
        dialColor: state.dialColor,
        indexStyle: state.indexStyle,
        handColor: state.handColor,
        complication: state.complication,
        strapMaterial: state.strapMaterial,
        caseSize: state.caseSize,
        view: state.view,
        engraving: state.engraving,
        engravingFont: state.engravingFont,
      }),
    },
  ),
);
