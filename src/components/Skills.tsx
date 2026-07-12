import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SKILL_CATEGORIES } from "@/data/chronicle";
import { getIcon } from "@/lib/icons";
import { staggerContainer, cardReveal, viewportOnce } from "@/lib/motion";
import { getAccentColor } from "@/lib/accent";

export const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {SKILL_CATEGORIES.map((cat) => {
        const Icon = getIcon(cat.icon);
        const accent = getAccentColor(cat.hue);
        return (
          <motion.div
            key={cat.title}
            variants={cardReveal}
            data-cursor
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all duration-300"
            whileHover={{ y: -6 }}
          >
            {/* Colored top stripe driven by hue → accent bucket. */}
            <div
              className={`absolute inset-x-0 top-0 h-1 ${accent.bg}`}
              aria-hidden
            />

            <div
              className={`w-12 h-12 rounded-lg p-3 ${accent.soft}`}
            >
              <Icon className={accent.text} size={24} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-foreground">{cat.title}</h3>

            <div className="mt-3 space-y-2">
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${accent.bg}`} />
                  <span className="text-sm text-foreground/80">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
