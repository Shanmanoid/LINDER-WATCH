import type { ReactNode } from "react";

export interface SectionLayoutProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function SectionLayout({ number, title, children }: SectionLayoutProps) {
  return (
    <section className="py-8 border-b border-rule first:pt-0 last:border-b-0">
      <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist mb-4">
        <span className="text-graphite mr-3">
          {String(number).padStart(2, "0")}.
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
