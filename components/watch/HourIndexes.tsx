import type { IndexStyleId } from "@/lib/types";
import {
  type DialPalette,
  HOUR_POSITIONS,
  MINUTE_TRACK_RADIUS,
  polar,
} from "./geometry";

export interface HourIndexesProps {
  style: IndexStyleId;
  palette: DialPalette;
  skipPositions: readonly number[];
}

const ROMAN: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  11: "XI",
  12: "XII",
};

const CARDINALS = new Set<number>([12, 3, 6, 9]);
const isCardinal = (hour: number) => CARDINALS.has(hour);

export function HourIndexes({
  style,
  palette,
  skipPositions,
}: HourIndexesProps) {
  const skip = new Set(skipPositions);
  const elements: React.ReactNode[] = [];

  for (const { hour, angleDeg, x, y } of HOUR_POSITIONS) {
    if (skip.has(hour)) continue;

    if (style === "arabic-cardinals") {
      if (isCardinal(hour)) {
        elements.push(
          <text
            key={`num-${hour}`}
            x={x}
            y={y}
            fill={palette.textColor}
            fontFamily="var(--font-display), serif"
            fontSize={18}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {hour}
          </text>,
        );
      } else {
        const outer = polar(angleDeg, MINUTE_TRACK_RADIUS - 2);
        const inner = polar(angleDeg, MINUTE_TRACK_RADIUS - 10);
        elements.push(
          <line
            key={`stick-${hour}`}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke={palette.textColor}
            strokeWidth={1.5}
          />,
        );
      }
    } else if (style === "roman") {
      elements.push(
        <text
          key={`roman-${hour}`}
          x={x}
          y={y}
          fill={palette.textColor}
          fontFamily="var(--font-display), serif"
          fontSize={14}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {ROMAN[hour]}
        </text>,
      );
    } else {
      // sticks-only — long sticks on cardinals, short on the rest
      const outer = polar(angleDeg, MINUTE_TRACK_RADIUS - 2);
      const innerDepth = isCardinal(hour) ? 12 : 8;
      const inner = polar(angleDeg, MINUTE_TRACK_RADIUS - innerDepth);
      elements.push(
        <line
          key={`stick-${hour}`}
          x1={outer.x}
          y1={outer.y}
          x2={inner.x}
          y2={inner.y}
          stroke={palette.textColor}
          strokeWidth={isCardinal(hour) ? 2 : 1.5}
        />,
      );
    }
  }

  const minuteTicks: React.ReactNode[] = [];
  for (let m = 0; m < 60; m++) {
    const angle = m * 6;
    const isHour = m % 5 === 0;
    const outer = polar(angle, MINUTE_TRACK_RADIUS);
    const inner = polar(angle, MINUTE_TRACK_RADIUS - (isHour ? 3 : 1.5));
    minuteTicks.push(
      <line
        key={`min-${m}`}
        x1={outer.x}
        y1={outer.y}
        x2={inner.x}
        y2={inner.y}
        stroke={palette.textColor}
        strokeOpacity={palette.minuteTrackOpacity}
        strokeWidth={isHour ? 0.8 : 0.4}
      />,
    );
  }

  return (
    <g>
      {minuteTicks}
      {elements}
    </g>
  );
}
