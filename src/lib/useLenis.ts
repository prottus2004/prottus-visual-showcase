import { createContext, useContext } from "react";
import type Lenis from "lenis";

/**
 * Shared Lenis instance provided by <LenisProvider>. Components use
 * useLenis() to call lenis.scrollTo(...) for anchors / back-to-top / route
 * scroll resets. Null before the provider mounts or on touch-only setups.
 */
export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = (): Lenis | null => useContext(LenisContext);