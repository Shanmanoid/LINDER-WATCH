"use client";

import { useSearchParams } from "next/navigation";
import { EditorialScreen } from "@/components/editorial/EditorialScreen";
import { Watch } from "@/components/watch/Watch";
import { useWatchConfigSync } from "@/lib/useWatchConfigSync";
import {
  type CaseMaterialId,
  type CaseSizeId,
  type ComplicationId,
  type DialColorId,
  type HandColorId,
  type IndexStyleId,
  type StrapMaterialId,
  type ViewSide,
  type WatchConfig,
} from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";

const CASE_MATERIALS: readonly CaseMaterialId[] = [
  "steel",
  "rose-gold",
  "yellow-gold",
  "blackened",
];
const DIAL_COLORS: readonly DialColorId[] = [
  "white",
  "silver",
  "black",
  "navy",
  "cream",
];
const INDEX_STYLES: readonly IndexStyleId[] = [
  "arabic-cardinals",
  "roman",
  "sticks-only",
];
const HAND_COLORS: readonly HandColorId[] = [
  "blue",
  "black",
  "silver",
  "gold",
];
const COMPLICATIONS: readonly ComplicationId[] = [
  "sub-seconds-six",
  "sub-seconds-nine",
  "none",
];
const STRAP_MATERIALS: readonly StrapMaterialId[] = [
  "black-calf",
  "brown-calf",
  "tan-leather",
  "steel-bracelet",
  "nato-textile",
];
const CASE_SIZES: readonly CaseSizeId[] = ["35mm", "38mm", "41mm"];
const VIEWS: readonly ViewSide[] = ["front", "back"];

function nextIn<T>(list: readonly T[], current: T): T {
  const i = list.indexOf(current);
  return list[(i + 1) % list.length];
}

export function TestStateClient() {
  const { ready } = useWatchConfigSync();

  // Intentional: subscribe to the whole store on this debug page so
  // every setter triggers a re-render. For production UIs we'd use
  // selectors.
  const store = useWatchStore();
  const searchParams = useSearchParams();

  if (!ready) {
    return (
      <EditorialScreen
        meta="LINDER · BERLIN · 1978"
        heading="LINDER"
        message="Loading state"
        status="loading"
      />
    );
  }

  const config: WatchConfig = {
    caseMaterial: store.caseMaterial,
    dialColor: store.dialColor,
    indexStyle: store.indexStyle,
    handColor: store.handColor,
    complication: store.complication,
    strapMaterial: store.strapMaterial,
    caseSize: store.caseSize,
    view: store.view,
    engraving: store.engraving,
    engravingFont: store.engravingFont,
  };

  const urlQuery = searchParams.toString();
  const urlDisplay = urlQuery ? `/test-state?${urlQuery}` : "/test-state";

  return (
    <main className="min-h-screen bg-paper text-ink px-6 py-10 flex flex-col items-center gap-10">
      <div className="w-full max-w-[420px]">
        <Watch {...config} />
      </div>

      <section
        aria-label="state controls"
        className="w-full max-w-[720px] grid grid-cols-2 sm:grid-cols-3 gap-2"
      >
        <CycleButton
          label="case"
          current={config.caseMaterial}
          next={nextIn(CASE_MATERIALS, config.caseMaterial)}
          onClick={() =>
            store.setCaseMaterial(
              nextIn(CASE_MATERIALS, config.caseMaterial),
            )
          }
        />
        <CycleButton
          label="dial"
          current={config.dialColor}
          next={nextIn(DIAL_COLORS, config.dialColor)}
          onClick={() =>
            store.setDialColor(nextIn(DIAL_COLORS, config.dialColor))
          }
        />
        <CycleButton
          label="indexes"
          current={config.indexStyle}
          next={nextIn(INDEX_STYLES, config.indexStyle)}
          onClick={() =>
            store.setIndexStyle(nextIn(INDEX_STYLES, config.indexStyle))
          }
        />
        <CycleButton
          label="hands"
          current={config.handColor}
          next={nextIn(HAND_COLORS, config.handColor)}
          onClick={() =>
            store.setHandColor(nextIn(HAND_COLORS, config.handColor))
          }
        />
        <CycleButton
          label="complication"
          current={config.complication}
          next={nextIn(COMPLICATIONS, config.complication)}
          onClick={() =>
            store.setComplication(nextIn(COMPLICATIONS, config.complication))
          }
        />
        <CycleButton
          label="strap"
          current={config.strapMaterial}
          next={nextIn(STRAP_MATERIALS, config.strapMaterial)}
          onClick={() =>
            store.setStrapMaterial(
              nextIn(STRAP_MATERIALS, config.strapMaterial),
            )
          }
        />
        <CycleButton
          label="size"
          current={config.caseSize}
          next={nextIn(CASE_SIZES, config.caseSize)}
          onClick={() =>
            store.setCaseSize(nextIn(CASE_SIZES, config.caseSize))
          }
        />
        <CycleButton
          label="view"
          current={config.view}
          next={nextIn(VIEWS, config.view)}
          onClick={() => store.setView(nextIn(VIEWS, config.view))}
        />

        <label className="col-span-2 sm:col-span-3 flex items-center gap-2 text-[11px] font-mono tracking-[0.12em] uppercase text-graphite border border-rule p-3">
          <span>engraving:</span>
          <input
            type="text"
            value={config.engraving}
            onChange={(e) => store.setEngraving(e.target.value)}
            placeholder="—"
            className="flex-1 bg-transparent outline-none font-mono text-[12px] tracking-normal normal-case text-ink placeholder:text-mist"
            aria-label="engraving input"
          />
        </label>

        <button
          type="button"
          onClick={() => store.reset()}
          className="col-span-2 sm:col-span-3 border border-rule px-3 py-2 font-mono text-[11px] tracking-[0.12em] uppercase text-graphite hover:bg-bone"
        >
          reset
        </button>
      </section>

      <section
        aria-label="state preview"
        className="w-full max-w-[720px] flex flex-col gap-3"
      >
        <pre className="font-mono text-[11px] text-graphite bg-bone/50 border border-rule p-3 overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(config, null, 2)}
        </pre>
        <p className="font-mono text-[10px] text-mist break-all">
          url: {urlDisplay}
        </p>
      </section>

      <p className="font-mono text-[10px] text-mist">
        priority 2 · zustand + url + localStorage
      </p>
    </main>
  );
}

interface CycleButtonProps {
  label: string;
  current: string;
  next: string;
  onClick: () => void;
}

function CycleButton({ label, current, next, onClick }: CycleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left border border-rule px-3 py-2 hover:bg-bone font-mono text-[11px] tracking-[0.08em] uppercase"
    >
      <span className="text-mist">{label}: </span>
      <span className="text-ink">{current}</span>
      <span className="text-mist"> → {next}</span>
    </button>
  );
}
