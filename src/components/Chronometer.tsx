import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Era } from "@/data/chronicle";

/**
 * A small top-left page-name chip + a thin scroll-progress dot on the right
 * edge. The dark-HUD look didn't fit the light Cohesion-style theme, so
 * this is much simpler than the original.
 */
export const Chronometer = ({ era }: { era: Era }) => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <>
      {/* Top-left page-name chip */}
      <motion.div
        key={era.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-20 left-4 z-40 hidden sm:block"
      >
        <div className="rounded-full border border-border bg-card/80 backdrop-blur-md px-3.5 py-1.5 shadow-soft">
          <div className="eyebrow text-coral-700">
            {/* "The Present" → "Present" */}
            {era.title.replace(/^The\s+/, "")}
          </div>
        </div>
      </motion.div>

      {/* Right-side scroll progress — a single traveling dot on a hairline rail. */}
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 sm:flex flex-col items-center">
        <div className="relative h-44 w-px bg-border">
          <motion.div
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-coral-500 shadow-soft"
            style={{ translateY: useTransform(progress, (v) => `${v * (44 * 4 - 8)}px`) }}
          />
        </div>
      </div>
    </>
  );
};
