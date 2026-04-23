import type { ComplicationId, HandColorId } from "@/lib/types";
import { CENTER, HAND_COLORS, HANDS, TIME_10_10_30 } from "./geometry";

export interface HandsProps {
  color: HandColorId;
  complication: ComplicationId;
}

export function Hands({ color, complication }: HandsProps) {
  const fill = HAND_COLORS[color];
  const redTip = "var(--color-linder-red)";

  return (
    <g>
      {/* Hour hand — ~10:10 */}
      <g transform={`rotate(${TIME_10_10_30.hourDeg} ${CENTER.x} ${CENTER.y})`}>
        <rect
          x={CENTER.x - HANDS.hourWidth / 2}
          y={CENTER.y - HANDS.hourLength}
          width={HANDS.hourWidth}
          height={HANDS.hourLength + 8}
          fill={fill}
          rx={0.5}
        />
      </g>

      {/* Minute hand */}
      <g
        transform={`rotate(${TIME_10_10_30.minuteDeg} ${CENTER.x} ${CENTER.y})`}
      >
        <rect
          x={CENTER.x - HANDS.minuteWidth / 2}
          y={CENTER.y - HANDS.minuteLength}
          width={HANDS.minuteWidth}
          height={HANDS.minuteLength + 8}
          fill={fill}
          rx={0.5}
        />
      </g>

      {/* Central seconds — only when sub-dial complication is off */}
      {complication === "none" && (
        <g
          transform={`rotate(${TIME_10_10_30.secondDeg} ${CENTER.x} ${CENTER.y})`}
        >
          <rect
            x={CENTER.x - HANDS.secondWidth / 2}
            y={CENTER.y - HANDS.secondLength}
            width={HANDS.secondWidth}
            height={HANDS.secondLength + 12}
            fill={fill}
          />
          <rect
            x={CENTER.x - HANDS.secondWidth / 2}
            y={CENTER.y - HANDS.secondLength}
            width={HANDS.secondWidth}
            height={9}
            fill={redTip}
          />
        </g>
      )}

      {/* Central pin */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={HANDS.pinRadius}
        fill="var(--color-ink)"
      />
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={HANDS.pinRadius - 1}
        fill={fill}
      />
    </g>
  );
}
