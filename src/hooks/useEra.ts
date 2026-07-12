import { useLocation } from "react-router-dom";
import { ERAS, ROUTE_TO_ERA, type EraId } from "@/data/chronicle";

/**
 * Derives the active era from the current route and returns the era object.
 * The era metadata (chapter / title / year / tagline / narration) is still
 * consumed by EraSection, the Welcome screen, the Footer, and the
 * Chronometer for section labelling. The era-hue CSS variable is gone —
 * per-card color now flows from the shared 7-hue accent palette via
 * `getAccentColor()`.
 */
export function useEra() {
  const location = useLocation();
  const eraId: EraId = ROUTE_TO_ERA[location.pathname] ?? "present";
  const era = ERAS[eraId];
  return era;
}
