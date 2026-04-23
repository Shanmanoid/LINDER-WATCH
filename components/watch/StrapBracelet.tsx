import type { CaseMaterialId, CaseSizeId } from "@/lib/types";
import {
  BRACELET_CRIMP_HEIGHT,
  BRACELET_CRIMP_INSET,
  BRACELET_LINK_HEIGHT,
  BRACELET_RATIOS,
  CASE_PALETTES,
  CENTER,
  getEffectiveCaseRadius,
  SIZE_SCALE,
  STRAP,
} from "./geometry";

export interface StrapBraceletProps {
  caseMaterial: CaseMaterialId;
  size: CaseSizeId;
}

type Corner = "bl" | "br" | "tl" | "tr";

function linkPath(
  leftX: number,
  rightX: number,
  topY: number,
  bottomY: number,
  crimp: Corner | null,
): string {
  const inset = BRACELET_CRIMP_INSET;
  const height = BRACELET_CRIMP_HEIGHT;

  if (crimp === "bl") {
    return `M ${leftX} ${topY}
      L ${rightX} ${topY}
      L ${rightX} ${bottomY}
      L ${leftX + inset} ${bottomY}
      Q ${leftX} ${bottomY} ${leftX} ${bottomY - height}
      Z`;
  }
  if (crimp === "br") {
    return `M ${leftX} ${topY}
      L ${rightX} ${topY}
      L ${rightX} ${bottomY - height}
      Q ${rightX} ${bottomY} ${rightX - inset} ${bottomY}
      L ${leftX} ${bottomY}
      Z`;
  }
  if (crimp === "tl") {
    return `M ${leftX} ${topY + height}
      Q ${leftX} ${topY} ${leftX + inset} ${topY}
      L ${rightX} ${topY}
      L ${rightX} ${bottomY}
      L ${leftX} ${bottomY}
      Z`;
  }
  if (crimp === "tr") {
    return `M ${leftX} ${topY}
      L ${rightX - inset} ${topY}
      Q ${rightX} ${topY} ${rightX} ${topY + height}
      L ${rightX} ${bottomY}
      L ${leftX} ${bottomY}
      Z`;
  }
  return `M ${leftX} ${topY}
    L ${rightX} ${topY}
    L ${rightX} ${bottomY}
    L ${leftX} ${bottomY}
    Z`;
}

export function StrapBracelet({ caseMaterial, size }: StrapBraceletProps) {
  const palette = CASE_PALETTES[caseMaterial];

  const effectiveRadius = getEffectiveCaseRadius(size);
  const effectiveDiameter = effectiveRadius * 2;
  const effectiveOverlap = 5 * SIZE_SCALE[size];

  const topY = CENTER.y - effectiveRadius + effectiveOverlap;
  const bottomY = CENTER.y + effectiveRadius - effectiveOverlap;

  const outerLinkWidth = effectiveDiameter * BRACELET_RATIOS.outerLink;
  const centreLinkWidth = effectiveDiameter * BRACELET_RATIOS.centreLink;
  const gap = effectiveDiameter * BRACELET_RATIOS.linkGap;

  const halfWidth = outerLinkWidth + gap + centreLinkWidth / 2;

  const leftOuterL = CENTER.x - halfWidth;
  const leftOuterR = leftOuterL + outerLinkWidth;
  const centreL = leftOuterR + gap;
  const centreR = centreL + centreLinkWidth;
  const rightOuterL = centreR + gap;
  const rightOuterR = CENTER.x + halfWidth;

  const upperTop = STRAP.upperExtentY;
  const upperBottom = topY;
  const lowerTop = bottomY;
  const lowerBottom = STRAP.lowerExtentY;

  const upperPaths: { d: string; isCentre: boolean }[] = [
    { d: linkPath(leftOuterL, leftOuterR, upperTop, upperBottom, "bl"), isCentre: false },
    { d: linkPath(centreL, centreR, upperTop, upperBottom, null), isCentre: true },
    { d: linkPath(rightOuterL, rightOuterR, upperTop, upperBottom, "br"), isCentre: false },
  ];
  const lowerPaths: { d: string; isCentre: boolean }[] = [
    { d: linkPath(leftOuterL, leftOuterR, lowerTop, lowerBottom, "tl"), isCentre: false },
    { d: linkPath(centreL, centreR, lowerTop, lowerBottom, null), isCentre: true },
    { d: linkPath(rightOuterL, rightOuterR, lowerTop, lowerBottom, "tr"), isCentre: false },
  ];

  const stripes: {
    leftX: number;
    rightX: number;
    isCentre: boolean;
  }[] = [
    { leftX: leftOuterL, rightX: leftOuterR, isCentre: false },
    { leftX: centreL, rightX: centreR, isCentre: true },
    { leftX: rightOuterL, rightX: rightOuterR, isCentre: false },
  ];

  // Horizontal dividers every BRACELET_LINK_HEIGHT — per-stripe lines.
  function dividersFor(
    stripeLeft: number,
    stripeRight: number,
    bandTop: number,
    bandBottom: number,
  ): React.ReactNode[] {
    const out: React.ReactNode[] = [];
    let y = bandTop + BRACELET_LINK_HEIGHT;
    while (y < bandBottom - 1) {
      out.push(
        <line
          key={`div-${stripeLeft}-${y}`}
          x1={stripeLeft + 0.5}
          y1={y}
          x2={stripeRight - 0.5}
          y2={y}
          stroke={palette.shadow}
          strokeOpacity={0.55}
          strokeWidth={0.6}
        />,
      );
      y += BRACELET_LINK_HEIGHT;
    }
    return out;
  }

  return (
    <g>
      {/* Base fills — three link columns on each half */}
      {upperPaths.map((p, i) => (
        <path key={`u-${i}`} d={p.d} fill={palette.outerRing} />
      ))}
      {lowerPaths.map((p, i) => (
        <path key={`l-${i}`} d={p.d} fill={palette.outerRing} />
      ))}

      {/* Side highlight / shadow stripes — polished faceting */}
      {stripes.flatMap((s, i) => [
        <line
          key={`hl-u-${i}`}
          x1={s.leftX + 1}
          y1={upperTop + 1}
          x2={s.leftX + 1}
          y2={upperBottom - (i === 0 ? BRACELET_CRIMP_HEIGHT : 0)}
          stroke={palette.bevel}
          strokeWidth={1}
          strokeOpacity={s.isCentre ? 0.9 : 0.55}
        />,
        <line
          key={`sh-u-${i}`}
          x1={s.rightX - 1}
          y1={upperTop + 1}
          x2={s.rightX - 1}
          y2={upperBottom - (i === 2 ? BRACELET_CRIMP_HEIGHT : 0)}
          stroke={palette.shadow}
          strokeWidth={1}
          strokeOpacity={s.isCentre ? 0.9 : 0.55}
        />,
        <line
          key={`hl-l-${i}`}
          x1={s.leftX + 1}
          y1={lowerTop + (i === 0 ? BRACELET_CRIMP_HEIGHT : 0)}
          x2={s.leftX + 1}
          y2={lowerBottom - 1}
          stroke={palette.bevel}
          strokeWidth={1}
          strokeOpacity={s.isCentre ? 0.9 : 0.55}
        />,
        <line
          key={`sh-l-${i}`}
          x1={s.rightX - 1}
          y1={lowerTop + (i === 2 ? BRACELET_CRIMP_HEIGHT : 0)}
          x2={s.rightX - 1}
          y2={lowerBottom - 1}
          stroke={palette.shadow}
          strokeWidth={1}
          strokeOpacity={s.isCentre ? 0.9 : 0.55}
        />,
      ])}

      {/* Horizontal link dividers per stripe */}
      {stripes.flatMap((s) => [
        ...dividersFor(s.leftX, s.rightX, upperTop, upperBottom),
        ...dividersFor(s.leftX, s.rightX, lowerTop, lowerBottom),
      ])}
    </g>
  );
}
