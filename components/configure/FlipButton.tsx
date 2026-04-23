"use client";

import { useWatchStore } from "@/lib/watchStore";

export function FlipButton() {
  const view = useWatchStore((s) => s.view);
  const engraving = useWatchStore((s) => s.engraving);
  const setView = useWatchStore((s) => s.setView);

  const disabled = engraving.length === 0;
  const label = view === "front" ? "VIEW BACK →" : "← VIEW FRONT";
  const hint = disabled
    ? "Add engraving to see back"
    : "Flip to see engraving on back";

  return (
    <>
      <button
        type="button"
        onClick={() => setView(view === "front" ? "back" : "front")}
        disabled={disabled}
        title={disabled ? hint : undefined}
        aria-describedby="flip-button-hint"
        className="inline-block mt-6 lg:mt-8 py-3 px-2 font-mono text-[11px] tracking-[0.12em] uppercase text-mist hover:text-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
      >
        {label}
      </button>
      <span id="flip-button-hint" className="sr-only">
        {hint}
      </span>
    </>
  );
}
