"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

export interface EditorialScreenAction {
  label: string;
  href: string;
}

export interface EditorialScreenProps {
  meta?: string;
  heading: string;
  message: string;
  action?: EditorialScreenAction;
  children?: ReactNode;
  /**
   * Adds aria semantics to the root <main> element.
   * "loading" — role=status + aria-live=polite + aria-busy
   * "alert"   — role=alert (assertive announcement for errors)
   * omitted   — no role (plain content page, e.g. not-found)
   */
  status?: "loading" | "alert";
  /**
   * On mount, moves keyboard focus to the heading so keyboard/screen
   * reader users land on meaningful content after a route transition
   * (error boundary, 404). Loading state intentionally does NOT set
   * this — aria-live announcement is enough; stealing focus mid-task
   * is disorienting.
   */
  autoFocus?: boolean;
}

const SERIF = { fontFamily: "var(--font-display), serif" };

export function EditorialScreen({
  meta,
  heading,
  message,
  action,
  children,
  status,
  autoFocus = false,
}: EditorialScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (autoFocus && headingRef.current) {
      headingRef.current.focus();
    }
  }, [autoFocus]);

  const ariaRole =
    status === "loading" ? "status" : status === "alert" ? "alert" : undefined;
  const ariaLive = status === "loading" ? "polite" : undefined;
  const ariaBusy = status === "loading" ? true : undefined;

  return (
    <main
      role={ariaRole}
      aria-live={ariaLive}
      aria-busy={ariaBusy}
      className="min-h-screen bg-paper flex flex-col items-center justify-center px-6 lg:px-12 py-12"
    >
      {meta && (
        <p className="fixed top-6 left-0 right-0 text-center font-mono text-[10px] tracking-[0.14em] uppercase text-mist">
          {meta}
        </p>
      )}

      <h1
        ref={headingRef}
        tabIndex={autoFocus ? -1 : undefined}
        className="text-[56px] lg:text-[72px] text-ink leading-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-4"
        style={SERIF}
      >
        {heading}
      </h1>

      <div className="w-[60px] border-t border-rule mt-6" />

      <p className="mt-10 font-mono text-[12px] tracking-[0.12em] uppercase text-mist text-center">
        {message}
      </p>

      {action && (
        <Link
          href={action.href}
          className="inline-block mt-12 py-3 px-2 font-mono text-[11px] tracking-[0.12em] uppercase text-mist hover:text-ink transition-colors underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2"
        >
          {action.label}
        </Link>
      )}

      {children && <div className="mt-6">{children}</div>}
    </main>
  );
}
