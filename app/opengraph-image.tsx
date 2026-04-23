import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LINDER — Quiet watches, made slowly.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colours pulled straight from globals.css — Satori doesn't read
// CSS vars, so we inline the hex values.
const PAPER = "#f9f7f2";
const INK = "#131312";
const MIST = "#7a7975";

export default async function OpengraphImage() {
  // Instrument Serif is colocated in app/_fonts/ (underscore = Next.js
  // private folder, won't be treated as a route). `new URL(..., import.meta.url)`
  // resolves to a bundled asset at build time — works in edge runtime.
  const fontData = await fetch(
    new URL("./_fonts/InstrumentSerif-Regular.ttf", import.meta.url),
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: PAPER,
          color: INK,
        }}
      >
        {/* Top editorial meta */}
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: MIST,
          }}
        >
          LINDER · BERLIN · 1978
        </div>

        {/* Wordmark + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "InstrumentSerif",
              fontSize: 180,
              lineHeight: 0.9,
              color: INK,
            }}
          >
            LINDER
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "InstrumentSerif",
              fontSize: 44,
              lineHeight: 1.1,
              color: INK,
            }}
          >
            Quiet watches, made slowly.
          </div>
        </div>

        {/* Bottom editorial meta */}
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 16,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: MIST,
          }}
        >
          From €1,450 · Configure yours
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "InstrumentSerif",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
