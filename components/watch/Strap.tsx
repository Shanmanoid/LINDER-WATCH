import type {
  CaseMaterialId,
  CaseSizeId,
  StrapMaterialId,
} from "@/lib/types";
import { StrapBracelet } from "./StrapBracelet";
import { StrapLeather } from "./StrapLeather";
import { StrapNato } from "./StrapNato";

export interface StrapProps {
  material: StrapMaterialId;
  size: CaseSizeId;
  caseMaterial: CaseMaterialId;
}

export function Strap({ material, size, caseMaterial }: StrapProps) {
  if (material === "steel-bracelet") {
    return <StrapBracelet caseMaterial={caseMaterial} size={size} />;
  }
  if (material === "nato-textile") {
    return <StrapNato size={size} />;
  }
  return <StrapLeather material={material} size={size} />;
}
