import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SKILL_CATEGORIES } from "@/data/chronicle";
import { getIcon } from "@/lib/icons";
import { staggerContainer, cardReveal, viewportOnce } from "@/lib/motion";

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
        return (
          <motion.div
            key={cat.title}
            variants={cardReveal}
            data-cursor
            className="glass-era rounded-2xl p-6 space-y-4 group hover:shadow-era transition-all duration-300"
            whileHover={{ y: -6 }}
            style={{ borderTopColor: `hsl(${cat.hue} 90% 60% / 0.5)` }}
          >
            <div
              className="w-12 h-12 rounded-lg p-3 group-hover:scale-110 transition-transform"
              style={{
                background: `linear-gradient(135deg, hsl(${cat.hue} 90% 60%), hsl(${(cat.hue + 60) % 360} 80% 55%))`,
              }}
            >
              <Icon className="text-white" size={24} />
            </div>

            <h3 className="text-xl font-bold" style={{ color: `hsl(${cat.hue} 90% 70%)` }}>
              {cat.title}
            </h3>

            <div className="space-y-2">
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: `hsl(${cat.hue} 90% 60%)` }}
                  />
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