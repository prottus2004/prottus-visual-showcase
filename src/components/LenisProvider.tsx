import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { LenisContext } from "@/lib/useLenis";

/**
 * Owns a single Lenis smooth-scroll instance for the whole app and drives its
 * rAF loop. Sits above <BrowserRouter> in main.tsx so the loop survives route
 * transitions. Provides the instance via context for anchor scrolls,
 * back-to-top, and route-change scroll resets.
 */
export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Respect reduced-motion + touch-only devices: skip smooth scrolling.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};