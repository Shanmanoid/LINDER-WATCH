import {
  ENGRAVING_FONT_FAMILIES,
  ENGRAVING_FONT_TRACKING,
} from "@/lib/fonts";
import type { CaseMaterialId, EngravingFontId } from "@/lib/types";
import {
  BACK_CASE,
  CASE_INNER_RADIUS,
  CASE_PALETTES,
  CASE_RADIUS,
  CENTER,
  getEngravingFontSize,
} from "./geometry";

export interface BackCaseProps {
  caseMaterial: CaseMaterialId;
  engraving: string;
  engravingFont: EngravingFontId;
}

const FALLBACK_TEXT = "LINDER · BERLIN · 1978";

export function BackCase({
  caseMaterial,
  engraving,
  engravingFont,
}: BackCaseProps) {
  const palette = CASE_PALETTES[caseMaterial];
  const hasEngraving = engraving.length > 0;
  const fontSize = hasEngraving ? getEngravingFontSize(engraving.length) : 10;

  const hairlineHalf = BACK_CASE.medallionRadius * 0.3;
  const engravingFontFamily = ENGRAVING_FONT_FAMILIES[engravingFont];
  const engravingTracking = ENGRAVING_FONT_TRACKING[engravingFont];

  return (
    <g>
      {/* Outer case ring — same footprint as front */}
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
      {/* Central medallion disc — engraving surface */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={BACK_CASE.medallionRadius}
        fill={palette.backMedallion}
      />
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={BACK_CASE.medallionRadius}
        fill="none"
        stroke={palette.shadow}
        strokeOpacity={0.25}
        strokeWidth={0.5}
      />

      {hasEngraving ? (
        <text
          x={CENTER.x}
          y={CENTER.y}
          fill={palette.backText}
          fontFamily={engravingFontFamily}
          fontSize={fontSize}
          letterSpacing={engravingTracking}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {engraving}
        </text>
      ) : (
        <g>
          <line
            x1={CENTER.x - hairlineHalf}
            y1={CENTER.y - 9}
            x2={CENTER.x + hairlineHalf}
            y2={CENTER.y - 9}
            stroke={palette.shadow}
            strokeOpacity={0.45}
            strokeWidth={0.5}
          />
          <text
            x={CENTER.x}
            y={CENTER.y}
            fill={palette.backText}
            fillOpacity={0.55}
            fontFamily="var(--font-display), serif"
            fontSize={fontSize}
            letterSpacing="0.3em"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {FALLBACK_TEXT}
          </text>
          <line
            x1={CENTER.x - hairlineHalf}
            y1={CENTER.y + 9}
            x2={CENTER.x + hairlineHalf}
            y2={CENTER.y + 9}
            stroke={palette.shadow}
            strokeOpacity={0.45}
            strokeWidth={0.5}
          />
        </g>
      )}
    </g>
  );
}
