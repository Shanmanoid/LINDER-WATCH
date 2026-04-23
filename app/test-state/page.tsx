import type { Metadata } from "next";
import { Suspense } from "react";
import { TestStateClient } from "./TestStateClient";

export const metadata: Metadata = {
  title: "test-state",
  robots: { index: false, follow: false, nocache: true },
};

export default function TestStatePage() {
  return (
    <Suspense fallback={null}>
      <TestStateClient />
    </Suspense>
  );
}
