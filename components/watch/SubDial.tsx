import type { ComplicationId, HandColorId } from "@/lib/types";
import {
  CENTER,
  type DialPalette,
  HAND_COLORS,
  SUB_DIAL,
  polar,
} from "./geometry";

export interface SubDialProps {
  complication: ComplicationId;
  palette: DialPalette;
  handColor: HandColorId;
}

export function SubDial({ complication, palette, handColor }: SubDialProps) {
  // Complication "none" is filtered out by Dial; here we only handle
  // sub-seconds-six / sub-seconds-nine.
  const cx =
    complication === "sub-seconds-nine"
      ? CENTER.x - SUB_DIAL.offset
      : CENTER.x;
  const cy =
    complication === "sub-seconds-nine"
      ? CENTER.y
      : CENTER.y + SUB_DIAL.offset;
  const r = SUB_DIAL.radius;
  const handColorValue = HAND_COLORS[handColor];

  // Sub-hand points "down" relative to the sub-dial (30-mark) — for
  // both positions this reads as a frozen 30-second mark.
  const handAngle = complication === "sub-seconds-nine" ? 90 : 180;

  const ticks: React.ReactNode[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = i * 30;
    const outer = polar(angle, r - 2, cx, cy);
    const inner = polar(angle, r - (i % 3 === 0 ? 5 : 3.5), cx, cy);
    ticks.push(
      <line
        key={`sub-tick-${i}`}
        x1={outer.x}
        y1={outer.y}
        x2={inner.x}
        y2={inner.y}
        stroke={palette.subDialTextColor}
        strokeOpacity={0.5}
        strokeWidth={0.5}
      />,
    );
  }

  const hand = polar(handAngle, r - 6, cx, cy);

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={palette.subDialBackground}
        stroke={palette.subDialTextColor}
        strokeOpacity={0.3}
        strokeWidth={0.75}
      />
      {ticks}
      <line
        x1={cx}
        y1={cy}
        x2={hand.x}
        y2={hand.y}
        stroke={handColorValue}
        strokeWidth={0.8}
      />
      <circle
        cx={cx}
        cy={cy}
        r={1.1}
        fill={palette.subDialTextColor}
      />
    </g>
  );
}
