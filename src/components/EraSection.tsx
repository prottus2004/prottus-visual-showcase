import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Era } from "@/data/chronicle";

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" as const },
  }),
};

interface EraSectionProps {
  era: Era;
  children: React.ReactNode;
  /** Kept for API compatibility — ignored (no more 3D motif in light theme). */
  motif?: boolean;
  id?: string;
}

const PAGE_NAMES: Record<string, string> = {
  present: "Home",
  origins: "About",
  arsenal: "Skills",
  inventions: "Projects",
  expeditions: "Experience",
  credentials: "Certifications",
  chronicle: "Resume",
  transmit: "Contact",
};

/** Shared section wrapper: page-name eyebrow + huge H1 + narration + content. */
export const EraSection = ({ era, children, motif = false, id }: EraSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const pageName = PAGE_NAMES[era.id] ?? era.title;

  return (
    <section id={id} className="relative py-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="relative mb-16">
          <motion.div
            className="eyebrow text-coral-700 mb-3"
            custom={0}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {pageName.toUpperCase()}
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.05]"
            custom={1}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {pageName}
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/70 mb-5 max-w-2xl"
            custom={2}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {era.narration}
          </motion.p>

          <motion.div
            className="divider max-w-md"
            custom={3}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
        </div>

        {/* Section content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
