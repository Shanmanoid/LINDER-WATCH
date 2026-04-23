import type { CaseSizeId, StrapMaterialId } from "@/lib/types";
import {
  CENTER,
  getEffectiveCaseRadius,
  LEATHER_STRAP_PALETTES,
  SIZE_SCALE,
  STRAP,
  STRAP_RATIOS,
} from "./geometry";

export interface StrapLeatherProps {
  material: StrapMaterialId;
  size: CaseSizeId;
}

export function StrapLeather({ material, size }: StrapLeatherProps) {
  const palette =
    LEATHER_STRAP_PALETTES[material] ??
    LEATHER_STRAP_PALETTES["black-calf"]!;

  const effectiveRadius = getEffectiveCaseRadius(size);
  const effectiveDiameter = effectiveRadius * 2;
  const effectiveOverlap = 5 * SIZE_SCALE[size];
  const topY = CENTER.y - effectiveRadius + effectiveOverlap;
  const bottomY = CENTER.y + effectiveRadius - effectiveOverlap;

  const upperWidthNear = effectiveDiameter * STRAP_RATIOS.nearCase;
  const upperWidthFar = effectiveDiameter * STRAP_RATIOS.far;
  const lowerWidthNear = effectiveDiameter * STRAP_RATIOS.nearCase;
  const lowerWidthFar = effectiveDiameter * STRAP_RATIOS.far;

  const leftNearUpper = CENTER.x - upperWidthNear / 2;
  const rightNearUpper = CENTER.x + upperWidthNear / 2;
  const leftFarUpper = CENTER.x - upperWidthFar / 2;
  const rightFarUpper = CENTER.x + upperWidthFar / 2;

  const leftNearLower = CENTER.x - lowerWidthNear / 2;
  const rightNearLower = CENTER.x + lowerWidthNear / 2;
  const leftFarLower = CENTER.x - lowerWidthFar / 2;
  const rightFarLower = CENTER.x + lowerWidthFar / 2;

  const upperFarCornerY = STRAP.upperExtentY + 2;
  const upperFarCtrlY = STRAP.upperExtentY - 4;
  const lowerFarCornerY = STRAP.lowerExtentY - 2;
  const lowerFarCtrlY = STRAP.lowerExtentY + 4;

  const upperPath = `
    M ${leftNearUpper} ${topY}
    L ${leftFarUpper} ${upperFarCornerY}
    Q ${CENTER.x} ${upperFarCtrlY} ${rightFarUpper} ${upperFarCornerY}
    L ${rightNearUpper} ${topY}
    Z
  `;
  const lowerPath = `
    M ${leftNearLower} ${bottomY}
    L ${rightNearLower} ${bottomY}
    L ${rightFarLower} ${lowerFarCornerY}
    Q ${CENTER.x} ${lowerFarCtrlY} ${leftFarLower} ${lowerFarCornerY}
    Z
  `;

  const bevelInset = 2;
  const upperHighlightPath = `
    M ${leftFarUpper + bevelInset} ${upperFarCornerY + bevelInset}
    Q ${CENTER.x} ${upperFarCtrlY + bevelInset}
      ${rightFarUpper - bevelInset} ${upperFarCornerY + bevelInset}
  `;
  const lowerShadowPath = `
    M ${leftFarLower + bevelInset} ${lowerFarCornerY - bevelInset}
    Q ${CENTER.x} ${lowerFarCtrlY - bevelInset}
      ${rightFarLower - bevelInset} ${lowerFarCornerY - bevelInset}
  `;

  const stitchInset = 3;

  const keeperFrac = 0.33;
  const keeperY = bottomY + (STRAP.lowerExtentY - bottomY) * keeperFrac;
  const strapWidthAtKeeperY =
    lowerWidthNear +
    (lowerWidthFar - lowerWidthNear) *
      ((keeperY - bottomY) / (STRAP.lowerExtentY - bottomY));
  const keeperWidth = strapWidthAtKeeperY + 6;
  const keeperHeight = 7;

  return (
    <g>
      <path d={upperPath} fill={palette.leather} />
      <path d={lowerPath} fill={palette.leather} />

      <path
        d={upperHighlightPath}
        fill="none"
        stroke={palette.highlight}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <path
        d={lowerShadowPath}
        fill="none"
        stroke={palette.shadow}
        strokeWidth={1.2}
        strokeLinecap="round"
      />

      <line
        x1={leftNearUpper + stitchInset}
        y1={topY}
        x2={leftFarUpper + stitchInset}
        y2={upperFarCornerY}
        stroke={palette.stitch}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />
      <line
        x1={rightNearUpper - stitchInset}
        y1={topY}
        x2={rightFarUpper - stitchInset}
        y2={upperFarCornerY}
        stroke={palette.stitch}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />
      <line
        x1={leftNearLower + stitchInset}
        y1={bottomY}
        x2={leftFarLower + stitchInset}
        y2={lowerFarCornerY}
        stroke={palette.stitch}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />
      <line
        x1={rightNearLower - stitchInset}
        y1={bottomY}
        x2={rightFarLower - stitchInset}
        y2={lowerFarCornerY}
        stroke={palette.stitch}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />

      <rect
        x={CENTER.x - keeperWidth / 2}
        y={keeperY - keeperHeight / 2}
        width={keeperWidth}
        height={keeperHeight}
        rx={2}
        ry={2}
        fill={palette.leather}
        stroke={palette.keeperStroke}
        strokeWidth={1}
      />
    </g>
  );
}
