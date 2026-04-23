"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { PriceDelta } from "@/components/ui/PriceDelta";
import { ENGRAVING_PRICE_EUR } from "@/lib/constants";
import {
  ENGRAVING_FONT_FAMILIES,
  ENGRAVING_FONT_TRACKING,
} from "@/lib/fonts";
import type { EngravingFontId } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";
import { SectionLayout } from "./SectionLayout";

const HELP_TEXT = "a–z · 0–9 · . , − ' &";

interface FontOption {
  id: EngravingFontId;
  category: string;
}

const FONT_OPTIONS: ReadonlyArray<FontOption> = [
  { id: "instrument-serif", category: "SERIF" },
  { id: "jetbrains-mono", category: "MONO" },
  { id: "inter", category: "SANS" },
  { id: "cormorant", category: "CLASSIC" },
];

export interface EngravingSectionProps {
  number: number;
}

export function EngravingSection({ number }: EngravingSectionProps) {
  const engraving = useWatchStore((s) => s.engraving);
  const engravingFont = useWatchStore((s) => s.engravingFont);
  const setEngraving = useWatchStore((s) => s.setEngraving);
  const setEngravingFont = useWatchStore((s) => s.setEngravingFont);

  const [warn, setWarn] = useState<string | null>(null);
  const warnTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setEngraving(raw);
    const stored = useWatchStore.getState().engraving;
    if (stored !== raw) {
      setWarn("Some characters were removed");
      if (warnTimeout.current) clearTimeout(warnTimeout.current);
      warnTimeout.current = setTimeout(() => setWarn(null), 1500);
    }
  }

  const previewFontFamily = ENGRAVING_FONT_FAMILIES[engravingFont];
  const previewTracking = ENGRAVING_FONT_TRACKING[engravingFont];

  return (
    <SectionLayout number={number} title="Engraving">
      <label
        htmlFor="engraving-input"
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist block mb-2"
      >
        Text
      </label>
      <input
        id="engraving-input"
        type="text"
        maxLength={24}
        value={engraving}
        onChange={handleChange}
        placeholder="Max 24 characters"
        aria-describedby="engraving-help"
        className="w-full py-3 px-4 border border-rule focus:border-ink bg-paper font-mono text-[14px] tracking-wider uppercase transition-colors outline-none placeholder:text-mist/60 placeholder:normal-case placeholder:tracking-normal"
      />
      <div
        id="engraving-help"
        className="mt-2 flex items-center justify-between gap-3"
      >
        <span
          role="status"
          aria-live="polite"
          className={
            "font-mono text-[10px] " +
            (warn ? "text-linder-red/80" : "text-mist")
          }
        >
          {warn ?? HELP_TEXT}
        </span>
        <span className="font-mono text-[10px] text-mist">
          {engraving.length}/24
        </span>
      </div>

      <div
        className="mt-6 flex items-center justify-center py-6 bg-stone border border-rule"
        aria-label="Engraving preview"
      >
        <span
          className="text-[18px] uppercase text-ink"
          style={{
            fontFamily: previewFontFamily,
            letterSpacing: previewTracking,
          }}
        >
          {engraving || "—"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
        {FONT_OPTIONS.map((opt) => (
          <FontSwatch
            key={opt.id}
            option={opt}
            selected={engravingFont === opt.id}
            onClick={() => setEngravingFont(opt.id)}
          />
        ))}
      </div>

      {engraving.length > 0 && (
        <div className="mt-4">
          <PriceDelta value={ENGRAVING_PRICE_EUR} />
        </div>
      )}
    </SectionLayout>
  );
}

interface FontSwatchProps {
  option: FontOption;
  selected: boolean;
  onClick: () => void;
}

function FontSwatch({ option, selected, onClick }: FontSwatchProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={
        "flex flex-col items-center gap-1 py-3 px-2 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2 border " +
        (selected
          ? "border-ink bg-ink/[0.02]"
          : "border-rule bg-paper hover:border-ink/40")
      }
    >
      <span
        className="text-[20px] text-ink leading-none"
        style={{
          fontFamily: ENGRAVING_FONT_FAMILIES[option.id],
          letterSpacing: ENGRAVING_FONT_TRACKING[option.id],
        }}
      >
        Abc
      </span>
      <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-mist mt-1">
        {option.category}
      </span>
    </button>
  );
}
