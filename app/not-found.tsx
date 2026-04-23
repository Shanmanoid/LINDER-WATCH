import type { Metadata } from "next";
import { EditorialScreen } from "@/components/editorial/EditorialScreen";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <EditorialScreen
      meta="LINDER · BERLIN · 1978"
      heading="LINDER"
      message="404 · Page not found"
      action={{ label: "Return to landing", href: "/" }}
      autoFocus
    />
  );
}
