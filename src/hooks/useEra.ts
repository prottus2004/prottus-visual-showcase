import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ERAS, ROUTE_TO_ERA, type EraId } from "@/data/chronicle";

/**
 * Derives the active era from the current route, applies its hue to the
 * `--era-hue` CSS variable on :root (so the whole UI + 3D scene re-tints),
 * and returns the active era object.
 */
export function useEra() {
  const location = useLocation();
  const eraId: EraId = ROUTE_TO_ERA[location.pathname] ?? "present";
  const era = ERAS[eraId];

  useEffect(() => {
    document.documentElement.style.setProperty("--era-hue", String(era.hue));
  }, [era.hue]);

  return era;
}