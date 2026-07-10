import { motion } from "framer-motion";
import { useScroll, useSpring, useTransform } from "framer-motion";
import type { Era } from "@/data/chronicle";

/** Fixed HUD: era badge (top-left), era year/label (bottom-left), scroll progress (right). */
export const Chronometer = ({ era }: { era: Era }) => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <>
      {/* Top-left era badge */}
      <motion.div
        key={era.id + "-badge"}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-4 z-40 hidden sm:block"
      >
        <div className="glass-era scanlines relative overflow-hidden rounded-xl px-4 py-2.5">
          <div className="chrono-mono text-[10px] text-era/80">{era.chapter}</div>
          <div className="chrono-mono text-sm font-bold text-era leading-tight">
            {era.title}
          </div>
        </div>
      </motion.div>

      {/* Bottom-left chronometer readout */}
      <motion.div
        key={era.id + "-readout"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed bottom-5 left-4 z-40 hidden sm:block"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-era opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-era" />
          </span>
          <div className="chrono-mono">
            <div className="text-[10px] text-foreground/50">CHRONOMETER</div>
            <div className="text-sm font-bold text-foreground/90">{era.year}</div>
          </div>
        </div>
      </motion.div>

      {/* Right-side scroll progress rail */}
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 sm:block">
        <div className="h-44 w-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="w-full origin-top bg-era shadow-era"
            style={{ scaleY, height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};