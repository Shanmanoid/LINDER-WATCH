import type { Metadata } from "next";
import { Watch } from "@/components/watch/Watch";
import { parseWatchConfig } from "@/lib/parseWatchConfig";
import type {
  ComplicationId,
  IndexStyleId,
  WatchConfig,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "test-watch",
  robots: { index: false, follow: false, nocache: true },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const INDEX_LABEL: Record<IndexStyleId, string> = {
  "arabic-cardinals": "arabic",
  roman: "roman",
  "sticks-only": "sticks",
};

const COMPLICATION_LABEL: Record<ComplicationId, string> = {
  "sub-seconds-six": "sub@6",
  "sub-seconds-nine": "sub@9",
  none: "centre-sec",
};

function buildCaption(config: WatchConfig): string {
  const parts = [
    config.caseMaterial,
    config.dialColor,
    INDEX_LABEL[config.indexStyle],
    config.handColor,
    COMPLICATION_LABEL[config.complication],
    config.caseSize,
    config.strapMaterial,
  ];
  let caption = parts.join(" · ");
  if (config.engraving) caption += ` · "${config.engraving}"`;
  return caption;
}

export default async function TestWatchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const config = parseWatchConfig(params);
  const caption = buildCaption(config);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-paper text-ink px-6 py-10">
      <div className="w-full max-w-[420px]">
        <Watch {...config} />
      </div>
      <p className="mt-8 font-mono text-[11px] tracking-[0.12em] uppercase text-mist">
        {caption}
        {config.view === "back" && (
          <>
            {" "}
            <span className="text-ink font-medium tracking-[0.2em]">
              (BACK)
            </span>
          </>
        )}
      </p>
      <p className="mt-2 font-mono text-[10px] text-mist">
        stage 1b2-b-2 · nato complete · watch core done
      </p>
    </main>
  );
}
