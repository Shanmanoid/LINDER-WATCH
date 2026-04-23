import type { CaseMaterialId, CaseSizeId } from "@/lib/types";
import {
  CASE_INNER_RADIUS,
  CASE_PALETTES,
  CASE_RADIUS,
  CENTER,
  CROWN,
} from "./geometry";

export interface CaseProps {
  material: CaseMaterialId;
  size: CaseSizeId;
}

export function Case({ material }: CaseProps) {
  const palette = CASE_PALETTES[material];

  return (
    <g>
      {/* Crown stem — tight against case */}
      <rect
        x={CROWN.x}
        y={CROWN.y - CROWN.height / 2}
        width={CROWN.width}
        height={CROWN.height}
        rx={CROWN.radius}
        ry={CROWN.radius}
        fill={palette.outerRing}
        stroke={palette.shadow}
        strokeWidth={0.5}
      />
      {/* Crown cap */}
      <circle
        cx={CROWN.x + CROWN.width + CROWN.capOffset + CROWN.capRadius}
        cy={CROWN.y}
        r={CROWN.capRadius}
        fill={palette.outerRing}
        stroke={palette.shadow}
        strokeWidth={0.5}
      />

      {/* Outer case ring */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={CASE_RADIUS}
        fill={palette.outerRing}
      />
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={CASE_RADIUS}
        fill="none"
        stroke={palette.shadow}
        strokeOpacity={0.3}
        strokeWidth={0.75}
      />
      {/* Inner bezel */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={CASE_INNER_RADIUS}
        fill={palette.innerRing}
      />
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={CASE_INNER_RADIUS}
        fill="none"
        stroke={palette.shadow}
        strokeOpacity={0.3}
        strokeWidth={0.5}
      />
    </g>
  );
}
