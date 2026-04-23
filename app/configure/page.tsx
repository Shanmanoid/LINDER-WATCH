import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfigureClient } from "./ConfigureClient";

export const metadata: Metadata = {
  // Template in root layout prepends " — LINDER" automatically.
  title: "Configure",
  description: "Design your wristwatch.",
};

export default function ConfigurePage() {
  return (
    <Suspense fallback={null}>
      <ConfigureClient />
    </Suspense>
  );
}
