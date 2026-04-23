"use client";

import { useEffect } from "react";
import { EditorialScreen } from "@/components/editorial/EditorialScreen";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Dev-only: surface error in console for local debugging.
    // Production: Next.js/Vercel infrastructure handles logging
    // through its own pipelines; a manual console.error here would
    // duplicate entries in observability tools.
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <EditorialScreen
      meta="LINDER · BERLIN · 1978"
      heading="LINDER"
      message="An unexpected error occurred"
      action={{ label: "Return to landing", href: "/" }}
      status="alert"
      autoFocus
    >
      <button
        type="button"
        onClick={reset}
        className="inline-block py-3 px-2 font-mono text-[11px] tracking-[0.12em] uppercase text-mist hover:text-ink transition-colors underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
      >
        Try again
      </button>
    </EditorialScreen>
  );
}
