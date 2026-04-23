import type { CaseSizeId } from "@/lib/types";
import {
  CENTER,
  getEffectiveCaseRadius,
  NATO_KEEPER_POSITIONS,
  NATO_PALETTE,
  NATO_RATIOS,
  NATO_STRIPE_RATIO,
  NATO_TAIL_LENGTH,
  NATO_TAIL_WIDTH_RATIO,
  SIZE_SCALE,
  STRAP,
} from "./geometry";

export interface StrapNatoProps {
  size: CaseSizeId;
}

export function StrapNato({ size }: StrapNatoProps) {
  const effectiveRadius = getEffectiveCaseRadius(size);
  const effectiveDiameter = effectiveRadius * 2;
  const effectiveOverlap = 5 * SIZE_SCALE[size];

  const topY = CENTER.y - effectiveRadius + effectiveOverlap;
  const bottomY = CENTER.y + effectiveRadius - effectiveOverlap;

  const widthNear = effectiveDiameter * NATO_RATIOS.nearCase;
  const widthFar = effectiveDiameter * NATO_RATIOS.far;

  const leftNearUpper = CENTER.x - widthNear / 2;
  const rightNearUpper = CENTER.x + widthNear / 2;
  const leftFarUpper = CENTER.x - widthFar / 2;
  const rightFarUpper = CENTER.x + widthFar / 2;

  const leftNearLower = CENTER.x - widthNear / 2;
  const rightNearLower = CENTER.x + widthNear / 2;
  const leftFarLower = CENTER.x - widthFar / 2;
  const rightFarLower = CENTER.x + widthFar / 2;

  // Flat ends (no Bezier curve) — fabric, not leather.
  const upperPath = `
    M ${leftNearUpper} ${topY}
    L ${leftFarUpper} ${STRAP.upperExtentY}
    L ${rightFarUpper} ${STRAP.upperExtentY}
    L ${rightNearUpper} ${topY}
    Z
  `;
  const lowerPath = `
    M ${leftNearLower} ${bottomY}
    L ${rightNearLower} ${bottomY}
    L ${rightFarLower} ${STRAP.lowerExtentY}
    L ${leftFarLower} ${STRAP.lowerExtentY}
    Z
  `;

  // Single stripeX variable — same value used on both halves, so the
  // two stripe rectangles line up exactly and read as one continuous
  // line passing behind the case.
  const stripeWidth = widthNear * NATO_STRIPE_RATIO;
  const stripeX = CENTER.x - stripeWidth / 2;

  // Stitching along slanted side edges — same pattern as leather but
  // NATO_PALETTE.stitching colour.
  const stitchInset = 3;

  // Keepers on lower strap at NATO_KEEPER_POSITIONS fractions of
  // (lowerExtentY − bottomY).
  const lowerLength = STRAP.lowerExtentY - bottomY;
  const keeperHeight = 7;

  function widthAtLowerY(y: number): number {
    const t = (y - bottomY) / lowerLength;
    return widthNear + (widthFar - widthNear) * t;
  }

  const keepers = NATO_KEEPER_POSITIONS.map((frac) => {
    const y = bottomY + lowerLength * frac;
    const strapWidthHere = widthAtLowerY(y);
    return {
      y,
      width: strapWidthHere + 6,
    };
  });

  // Tail below keeper 2 — extra strap tongue fed through the keepers.
  const keeper2 = keepers[1];
  const tailStartY = keeper2.y + keeperHeight / 2;
  const tailMidY = tailStartY + NATO_TAIL_LENGTH / 2;
  const tailWidth = widthAtLowerY(tailMidY) * NATO_TAIL_WIDTH_RATIO;

  return (
    <g>
      {/* Base fabric bands */}
      <path d={upperPath} fill={NATO_PALETTE.base} />
      <path d={lowerPath} fill={NATO_PALETTE.base} />

      {/* Continuous two-tone stripe — upper and lower aligned at stripeX */}
      <rect
        x={stripeX}
        y={STRAP.upperExtentY}
        width={stripeWidth}
        height={topY - STRAP.upperExtentY}
        fill={NATO_PALETTE.stripe}
      />
      <rect
        x={stripeX}
        y={bottomY}
        width={stripeWidth}
        height={STRAP.lowerExtentY - bottomY}
        fill={NATO_PALETTE.stripe}
      />

      {/* Edge stitching — slanted along the tapered side edges */}
      <line
        x1={leftNearUpper + stitchInset}
        y1={topY}
        x2={leftFarUpper + stitchInset}
        y2={STRAP.upperExtentY}
        stroke={NATO_PALETTE.stitching}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />
      <line
        x1={rightNearUpper - stitchInset}
        y1={topY}
        x2={rightFarUpper - stitchInset}
        y2={STRAP.upperExtentY}
        stroke={NATO_PALETTE.stitching}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />
      <line
        x1={leftNearLower + stitchInset}
        y1={bottomY}
        x2={leftFarLower + stitchInset}
        y2={STRAP.lowerExtentY}
        stroke={NATO_PALETTE.stitching}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />
      <line
        x1={rightNearLower - stitchInset}
        y1={bottomY}
        x2={rightFarLower - stitchInset}
        y2={STRAP.lowerExtentY}
        stroke={NATO_PALETTE.stitching}
        strokeWidth={0.6}
        strokeDasharray="2 3"
      />

      {/* Two keepers — render after stitching so they cover it locally */}
      {keepers.map((k, i) => (
        <rect
          key={`keeper-${i}`}
          x={CENTER.x - k.width / 2}
          y={k.y - keeperHeight / 2}
          width={k.width}
          height={keeperHeight}
          rx={2}
          ry={2}
          fill={NATO_PALETTE.base}
          stroke={NATO_PALETTE.keeperStroke}
          strokeWidth={1}
        />
      ))}

      {/* Tail — small strap tongue emerging from keeper 2 */}
      <rect
        x={CENTER.x - tailWidth / 2}
        y={tailStartY}
        width={tailWidth}
        height={NATO_TAIL_LENGTH}
        rx={2}
        ry={2}
        fill={NATO_PALETTE.base}
        stroke={NATO_PALETTE.keeperStroke}
        strokeWidth={0.6}
      />
    </g>
  );
}
