import {
  BASE_PRICE_EUR,
  CASE_MATERIAL_PRICES,
  CASE_SIZE_PRICES,
  COMPLICATION_PRICES,
  DIAL_COLOR_PRICES,
  ENGRAVING_PRICE_EUR,
  HAND_COLOR_PRICES,
  INDEX_STYLE_PRICES,
  STRAP_MATERIAL_PRICES,
} from "./constants";
import type { WatchConfig } from "./types";

export { BASE_PRICE_EUR } from "./constants";

// Pure aggregation — readable, testable, no React dependency. The
// price pill, summary breakdown, and any future invoice / share
// card all pipe through this function.
export function computeTotal(config: WatchConfig): number {
  let total = BASE_PRICE_EUR;
  total += CASE_MATERIAL_PRICES[config.caseMaterial];
  total += DIAL_COLOR_PRICES[config.dialColor];
  total += INDEX_STYLE_PRICES[config.indexStyle];
  total += HAND_COLOR_PRICES[config.handColor];
  total += COMPLICATION_PRICES[config.complication];
  total += STRAP_MATERIAL_PRICES[config.strapMaterial];
  total += CASE_SIZE_PRICES[config.caseSize];
  if (config.engraving.length > 0) {
    total += ENGRAVING_PRICE_EUR;
  }
  return total;
}
