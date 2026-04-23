import { CaseMaterialSection } from "./sections/CaseMaterialSection";
import { CaseSizeSection } from "./sections/CaseSizeSection";
import { ComplicationSection } from "./sections/ComplicationSection";
import { DialColorSection } from "./sections/DialColorSection";
import { EngravingSection } from "./sections/EngravingSection";
import { HandColorSection } from "./sections/HandColorSection";
import { IndexStyleSection } from "./sections/IndexStyleSection";
import { StrapMaterialSection } from "./sections/StrapMaterialSection";

export function ControlSections() {
  return (
    <div>
      <CaseMaterialSection number={1} />
      <DialColorSection number={2} />
      <IndexStyleSection number={3} />
      <HandColorSection number={4} />
      <ComplicationSection number={5} />
      <StrapMaterialSection number={6} />
      <CaseSizeSection number={7} />
      <EngravingSection number={8} />
    </div>
  );
}
