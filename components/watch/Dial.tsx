import type {
  ComplicationId,
  DialColorId,
  HandColorId,
  IndexStyleId,
} from "@/lib/types";
import { CENTER, DIAL_PALETTES, DIAL_RADIUS } from "./geometry";
import { HourIndexes } from "./HourIndexes";
import { SubDial } from "./SubDial";

export interface DialProps {
  color: DialColorId;
  indexStyle: IndexStyleId;
  complication: ComplicationId;
  handColor: HandColorId;
}

export function Dial({
  color,
  indexStyle,
  complication,
  handColor,
}: DialProps) {
  const palette = DIAL_PALETTES[color];

  const skipPositions: readonly number[] =
    complication === "sub-seconds-six"
      ? [6]
      : complication === "sub-seconds-nine"
        ? [9]
        : [];

  return (
    <g>
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={DIAL_RADIUS}
        fill={palette.background}
      />
      <HourIndexes
        style={indexStyle}
        palette={palette}
        skipPositions={skipPositions}
      />
      {complication !== "none" && (
        <SubDial
          complication={complication}
          palette={palette}
          handColor={handColor}
        />
      )}

      <text
        x={CENTER.x}
        y={CENTER.y - 70}
        fill={palette.brandTextColor}
        fontFamily="var(--font-display), serif"
        fontSize={11}
        letterSpacing="0.3em"
        textAnchor="middle"
      >
        LINDER
      </text>
    </g>
  );
}
