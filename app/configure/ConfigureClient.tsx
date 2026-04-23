"use client";

import { Watch } from "@/components/watch/Watch";
import { ConfigureLayout } from "@/components/configure/ConfigureLayout";
import { ControlSections } from "@/components/configure/ControlSections";
import { EditorialScreen } from "@/components/editorial/EditorialScreen";
import { useWatchConfigSync } from "@/lib/useWatchConfigSync";
import type { WatchConfig } from "@/lib/types";
import { useWatchStore } from "@/lib/watchStore";

export function ConfigureClient() {
  const { ready } = useWatchConfigSync();
  const store = useWatchStore();

  if (!ready) {
    return (
      <EditorialScreen
        meta="LINDER · BERLIN · 1978"
        heading="LINDER"
        message="Loading configuration"
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

  return (
    <ConfigureLayout watch={<Watch {...config} />}>
      <ControlSections />
    </ConfigureLayout>
  );
}
