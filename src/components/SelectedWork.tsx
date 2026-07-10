import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SELECTED_PROJECTS } from "@/data/chronicle";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { ProjectPreviewCursor } from "./ProjectPreviewCursor";

/**
 * Home "Selected Work" section — a vertical row list where hovering a row
 * surfaces a floating, cursor-following preview image (desktop only). Each
 * row links to the full /projects page. Row hover also lifts + diagonally
 * translates the arrow.
 */
export const SelectedWork = () => {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div onMouseMove={onMove} className="relative">
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="divide-y divide-white/5 border-y border-white/5"
      >
        {SELECTED_PROJECTS.map((p, i) => {
          const Icon = getIcon(p.icon);
          return (
            <motion.li
              key={p.title}
              variants={fadeUp}
              data-cursor
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative"
            >
              <Link to="/projects" className="flex items-center gap-5 px-1 py-7 md:px-4">
                <span className="chrono-mono w-8 text-xs text-era/60">0{i + 1}</span>
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white",
                    p.gradient
                  )}
                >
                  <Icon size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-bold leading-tight transition-colors group-hover:text-era md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 truncate text-sm text-foreground/50">{p.summary}</p>
                </div>
                <div className="hidden shrink-0 gap-2 lg:flex">
                  {p.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="shrink-0 text-foreground/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-era" />
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
      <ProjectPreviewCursor project={active !== null ? SELECTED_PROJECTS[active] : null} x={sx} y={sy} />
    </div>
  );
};