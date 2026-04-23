import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const PAPER = "#f9f7f2";
const INK = "#131312";

export default async function AppleIcon() {
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAPER,
          color: INK,
          fontFamily: "InstrumentSerif",
          fontSize: 140,
          lineHeight: 1,
        }}
      >
        L
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
