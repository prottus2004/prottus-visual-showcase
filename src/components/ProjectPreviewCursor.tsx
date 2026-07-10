import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { type Project } from "@/data/chronicle";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Fixed, spring-smoothed floating preview card that tracks the cursor while a
 * Selected Work row is hovered. Uses the parent's springed motion values for
 * x/y so it lags slightly behind the cursor (the common Framer portfolio
 * pattern). Renders the project's real image if it has one, else a gradient
 * tile with the project's lucide icon.
 *
 * TODO: add real screenshots for Vision AI Suite, Fraud Guard AI, Optimus AI
 * (only Resume Builder + Helplink AI ship images today).
 */
export const ProjectPreviewCursor = ({
  project,
  x,
  y,
}: {
  project: Project | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) => (
  <AnimatePresence>
    {project && (
      <motion.div
        style={{ x, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
      >
        <div className="-translate-x-1/2 translate-y-6">
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="relative h-48 w-72 overflow-hidden rounded-xl border border-white/10 shadow-2xl"
          >
            {project.image ? (
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            ) : (
              <div className={cn("flex h-full w-full items-center justify-center bg-gradient-to-br", project.gradient)}>
                {(() => {
                  const Icon = getIcon(project.icon);
                  return <Icon className="text-white/90" size={48} />;
                })()}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);