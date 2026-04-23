import type { WatchConfig } from "@/lib/types";
import { CENTER, SIZE_SCALE, VIEWBOX } from "./geometry";
import { BackCase } from "./BackCase";
import { Case } from "./Case";
import { Dial } from "./Dial";
import { Hands } from "./Hands";
import { Strap } from "./Strap";

export type WatchProps = WatchConfig;

export function Watch(props: WatchProps) {
  const scale = SIZE_SCALE[props.caseSize];
  const transform = `translate(${CENTER.x} ${CENTER.y}) scale(${scale}) translate(${-CENTER.x} ${-CENTER.y})`;

  const label =
    props.view === "back"
      ? `LINDER wristwatch, back view, ${props.caseMaterial} case${props.engraving ? `, engraving: ${props.engraving}` : ""}`
      : `LINDER wristwatch, ${props.caseMaterial} case, ${props.dialColor} dial, ${props.caseSize}`;

  return (
    <svg
      viewBox={VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      className="w-full h-full"
    >
      <Strap
        material={props.strapMaterial}
        size={props.caseSize}
        caseMaterial={props.caseMaterial}
      />
      <g transform={transform}>
        {props.view === "back" ? (
          <BackCase
            caseMaterial={props.caseMaterial}
            engraving={props.engraving}
            engravingFont={props.engravingFont}
          />
        ) : (
          <>
            <Case material={props.caseMaterial} size={props.caseSize} />
            <Dial
              color={props.dialColor}
              indexStyle={props.indexStyle}
              complication={props.complication}
              handColor={props.handColor}
            />
            <Hands
              color={props.handColor}
              complication={props.complication}
            />
          </>
        )}
      </g>
    </svg>
  );
}
