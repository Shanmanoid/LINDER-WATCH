import type { Metadata } from "next";
import { Suspense } from "react";
import { SummaryClient } from "./SummaryClient";

export const metadata: Metadata = {
  title: "Your configuration",
  description: "Review your LINDER wristwatch.",
  robots: { index: false, follow: false },
};

export default function SummaryPage() {
  return (
    <Suspense fallback={null}>
      <SummaryClient />
    </Suspense>
  );
}
