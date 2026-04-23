import Link from "next/link";
import type { ReactNode } from "react";
import { FlipButton } from "./FlipButton";
import { PricePill } from "./PricePill";
import { WatchLabel } from "./WatchLabel";

export interface ConfigureLayoutProps {
  watch: ReactNode;
  children: ReactNode;
}

export function ConfigureLayout({ watch, children }: ConfigureLayoutProps) {
  return (
    <main className="min-h-screen lg:h-screen flex flex-col lg:flex-row bg-paper">
      <h1 className="sr-only">Configure your LINDER watch</h1>
      {/* Mobile-only back nav — scrolls away with page, acceptable */}
      <div className="lg:hidden px-6 py-4">
        <BackNav />
      </div>

      {/* Watch preview — sticky at top on mobile, full-height left column
          on desktop. Warm stone tint sets the watch on a subtly different
          surface than the controls' paper. Vertical hairline on desktop
          reads as an editorial rule between the two zones. */}
      <section
        aria-label="watch preview"
        className="relative sticky top-0 h-[50vh] lg:h-screen lg:w-[60%] flex flex-col items-center justify-center bg-stone z-10 border-b border-rule lg:border-b-0 lg:border-r lg:border-rule overflow-hidden"
      >
        <WatchLabel />
        <div className="w-full max-w-[280px] lg:max-w-[520px] px-4">
          {watch}
        </div>
        <FlipButton />
      </section>

      {/* Controls — scrolls internally on desktop (lg:overflow-y-auto),
          flows with page on mobile. */}
      <section
        aria-label="configurator"
        className="flex-1 lg:w-[40%] lg:h-screen lg:overflow-y-auto px-6 lg:px-12 pt-8 pb-24 lg:pt-12 lg:pb-12 bg-paper"
      >
        <div className="hidden lg:block mb-10">
          <BackNav />
        </div>
        {children}
      </section>

      <PricePill />
    </main>
  );
}

function BackNav() {
  return (
    <Link
      href="/"
      className="inline-block py-3 px-2 font-mono text-[11px] tracking-[0.12em] uppercase text-mist hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
    >
      ← LINDER
    </Link>
  );
}
