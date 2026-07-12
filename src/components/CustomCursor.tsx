import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------ *
 *  Color resolution
 *
 *  The cursor should be the opposite luminance of whatever is rendered
 *  under the pointer. We don't sample pixels — the DOM IS the source of
 *  truth for paint in this app (solid `hsl(var(--card))` panels with
 *  decorative gradient blobs and a noise overlay sitting behind/over
 *  them). `document.elementFromPoint` + a parent walk gives us the
 *  exact CSS `background-color` of the painted surface.
 * ------------------------------------------------------------------ */

type RGBA = { r: number; g: number; b: number; a: number };

/** Parse "rgb(r, g, b)" / "rgba(r, g, b, a)" into 0–1 sRGB channels. */
const parseColor = (raw: string): RGBA | null => {
  const m = raw.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i,
  );
  if (!m) return null;
  return {
    r: parseFloat(m[1]) / 255,
    g: parseFloat(m[2]) / 255,
    b: parseFloat(m[3]) / 255,
    a: m[4] !== undefined ? parseFloat(m[4]) : 1,
  };
};

/** WCAG relative luminance from 0–1 sRGB. */
const relativeLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
};

/**
 * Return the cursor color that contrasts with a surface of `luminance`:
 * light surface → black cursor, dark surface → white cursor. The threshold
 * is the standard WCAG 0.5 midpoint, snapped to pure #000 / #fff for the
 * starkest possible contrast (matches the design intent of "invert").
 */
const contrastColor = (luminance: number): "#000000" | "#ffffff" =>
  luminance >= 0.5 ? "#000000" : "#ffffff";

/** Walk up the DOM from `start` until we find a non-transparent bg-color. */
const resolveBg = (start: Element | null): string => {
  let el: Element | null = start ?? document.body;
  // Hard cap: never walk more than 25 ancestors. The app is <10 deep.
  for (let i = 0; i < 25 && el; i++, el = el.parentElement) {
    const raw = getComputedStyle(el).backgroundColor;
    const c = parseColor(raw);
    if (c && c.a > 0) return raw;
  }
  return (
    getComputedStyle(document.documentElement).backgroundColor || "rgb(255,255,255)"
  );
};

/**
 * Per-element cache — hovering the same card reuses the same answer.
 *
 * The cache is invalidated on theme change (the `dark` class on
 * <html>), because the resolved background-color of any cached element
 * flips when the theme switches. We reassign the module-level reference
 * to a fresh WeakMap; the old one is GC'd once all in-flight reads finish.
 */
let colorCache: WeakMap<Element, "#000000" | "#ffffff"> = new WeakMap();

/** Sample the cursor color at (x, y). */
const getColorAtPoint = (x: number, y: number): "#000000" | "#ffffff" => {
  const hit = document.elementFromPoint(x, y);
  const resolveFromBg = (bg: string): "#000000" | "#ffffff" => {
    const parsed = parseColor(bg);
    const lum = parsed ? relativeLuminance(parsed) : 1;
    return contrastColor(lum);
  };
  if (hit) {
    const cached = colorCache.get(hit);
    if (cached) return cached;
    const bg = resolveBg(hit);
    const fg = resolveFromBg(bg);
    colorCache.set(hit, fg);
    return fg;
  }
  // elementFromPoint returned null (iframe edge, detached subtree).
  return resolveFromBg(resolveBg(document.body));
};

/** Clear the cache when the theme changes. */
const observeThemeChanges = () => {
  const target = document.documentElement;
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && m.attributeName === "class") {
        // Reassigning the module-level reference drops the old WeakMap
        // (held only by the closure of getColorAtPoint calls in flight).
        colorCache = new WeakMap();
        break;
      }
    }
  });
  observer.observe(target, { attributes: true, attributeFilter: ["class"] });
  return observer;
};

/* ------------------------------------------------------------------ *
 *  Component
 * ------------------------------------------------------------------ */

/**
 * Desktop-only custom cursor: a soft ring + a snappy dot that follow the
 * mouse. The ring scales up and the dot collapses over interactive elements
 * (anything matching [data-cursor], a, button, [role=button], inputs). Touch
 * / coarse-pointer devices get nothing. The native cursor is hidden via the
 * `.cursor-none` class (gated by a hover/fine media query in index.css).
 *
 * The cursor's color is *explicitly* resolved from the painted surface
 * under the pointer — black on white-ish, white on black-ish — irrespective
 * of the active theme. Sampling is rAF-throttled and 2px-distance-gated,
 * with a WeakMap cache keyed by the element under the pointer.
 */
export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState<string>("#000000");

  // Position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.2 });

  // Capability gate — fine pointer + ≥768px.
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

  // Main effect — listeners + rAF sampler.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none");

    // Seed the cursor color from the body bg so the first frame after
    // enable is correct (the cursor is offscreen at -100,-100 until the
    // first mousemove, but this keeps the state honest from t=0).
    setCursorColor(getColorAtPoint(0, 0));

    const themeObserver = observeThemeChanges();

    let lastX = -1000;
    let lastY = -1000;
    let dirty = false;
    let lx = 0;
    let ly = 0;
    let raf: number | null = null;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      lx = e.clientX;
      ly = e.clientY;
      dirty = true;
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(
        !!t?.closest(
          "[data-cursor], a, button, [role='button'], input, textarea, select",
        ),
      );
    };

    const tick = () => {
      if (dirty) {
        dirty = false;
        const dx = lx - lastX;
        const dy = ly - lastY;
        // 2px distance threshold (squared = 4) before re-sampling.
        if (dx * dx + dy * dy >= 4) {
          lastX = lx;
          lastY = ly;
          setCursorColor(getColorAtPoint(lx, ly));
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      if (raf !== null) cancelAnimationFrame(raf);
      themeObserver.disconnect();
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return createPortal(
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, color: cursorColor }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-colors duration-150 ease-out"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-current"
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            opacity: hovering ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, color: cursorColor }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-colors duration-150 ease-out"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
          animate={{
            width: hovering ? 0 : 6,
            height: hovering ? 0 : 6,
            opacity: hovering ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </>,
    document.body,
  );
};
