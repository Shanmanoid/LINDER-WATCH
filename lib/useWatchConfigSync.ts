"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  buildSearchParams,
  hasAnyConfigParams,
  parseWatchConfig,
} from "./parseWatchConfig";
import { useWatchStore } from "./watchStore";

export interface WatchConfigSyncResult {
  ready: boolean;
}

/**
 * Orchestrates hydration of the Zustand watch store on mount and
 * writes subsequent state changes back to the URL.
 *
 * Source-of-truth priority on mount:
 *   URL params > localStorage > DEFAULT_CONFIG
 *
 * After the first mount pass, URL → store is NOT re-read; only
 * store → URL is synced (debounced). This single-shot URL read
 * prevents a feedback loop where router.replace triggers
 * useSearchParams → re-hydrate → router.replace.
 */
export function useWatchConfigSync(): WatchConfigSyncResult {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const urlParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      urlParams[key] = value;
    });

    if (hasAnyConfigParams(urlParams)) {
      const config = parseWatchConfig(urlParams);
      useWatchStore.setState(config);
    } else {
      void useWatchStore.persist.rehydrate();
    }

    setReady(true);
    // Intentionally empty deps — URL is read exactly once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const unsubscribe = useWatchStore.subscribe((state) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const qs = buildSearchParams(state).toString();
        const target =
          typeof window === "undefined"
            ? qs
              ? `?${qs}`
              : "/"
            : qs
              ? `${window.location.pathname}?${qs}`
              : window.location.pathname;
        router.replace(target, { scroll: false });
      }, 300);
    });

    return () => {
      if (timeout) clearTimeout(timeout);
      unsubscribe();
    };
  }, [ready, router]);

  return { ready };
}
