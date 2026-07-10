import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { createPortal } from "react-dom";

/**
 * Desktop-only custom cursor: a soft ring + a snappy dot that follow the
 * mouse. The ring scales up and the dot collapses over interactive elements
 * (anything matching [data-cursor], a, button, [role=button], inputs). Touch /
 * coarse-pointer devices get nothing. The native cursor is hidden via the
 * `.cursor-none` class (gated by a hover/fine media query in index.css).
 */
export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.2 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const recompute = () => setEnabled(mq.matches && window.innerWidth >= 768);
    recompute();
    mq.addEventListener("change", recompute);
    window.addEventListener("resize", recompute);
    return () => {
      mq.removeEventListener("change", recompute);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("[data-cursor], a, button, [role='button'], input, textarea, select"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return createPortal(
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground mix-blend-difference"
          animate={{ width: hovering ? 56 : 32, height: hovering ? 56 : 32, opacity: hovering ? 0.5 : 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference"
          animate={{ width: hovering ? 0 : 6, height: hovering ? 0 : 6, opacity: hovering ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </>,
    document.body
  );
};