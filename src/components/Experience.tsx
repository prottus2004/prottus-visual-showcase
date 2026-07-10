import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase, Award, ExternalLink } from "lucide-react";
import { EXPEDITIONS } from "@/data/chronicle";

export const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="max-w-4xl mx-auto" ref={ref}>
      <div className="relative pl-8 border-l-2 border-era/30">
        {EXPEDITIONS.map((exp, i) => (
          <motion.div
            key={exp.org}
            className="relative mb-10 last:mb-0"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.2, type: "spring", stiffness: 80, damping: 16 }}
          >
            {/* node */}
            <motion.div
              className="absolute -left-[2.6rem] top-0 w-6 h-6 rounded-full bg-era shadow-era flex items-center justify-center"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Briefcase size={12} className="text-background" />
            </motion.div>

            <div className="glass-era rounded-2xl p-8 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-era mb-1">{exp.role}</h3>
                  <h4 className="text-lg font-semibold">{exp.org}</h4>
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-foreground/70 chrono-mono">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-foreground/75 text-sm">{exp.summary}</p>

              <div className="space-y-2.5">
                {exp.details.map((d, j) => (
                  <motion.div
                    key={j}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.2 + j * 0.08 }}
                  >
                    <div className="w-1.5 h-1.5 bg-era rounded-full mt-2 flex-shrink-0" />
                    <p className="text-foreground/80 text-sm">{d}</p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-era/15">
                <p className="text-xs text-foreground/50 mb-3 chrono-mono">capabilities gained</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s, k) => (
                    <motion.span
                      key={s}
                      data-cursor
                      className="px-3 py-1.5 bg-era-soft rounded-full text-xs border border-era/20"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.2 + k * 0.05 }}
                      whileHover={{ scale: 1.08 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>

              {exp.certificates && exp.certificates.length > 0 && (
                <div className="pt-4 border-t border-era/15">
                  <p className="text-xs text-foreground/50 mb-3 chrono-mono flex items-center gap-1.5">
                    <Award size={12} className="text-era" />
                    certificates
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.certificates.map((cert) => (
                      <motion.a
                        key={cert.url}
                        href={cert.url}
                        target="_blank"
                        rel="noopener,noreferrer"
                        data-cursor
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-era-soft rounded-full text-xs border border-era/20 hover:border-era/60 hover:bg-era/10 transition-colors"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="text-foreground/80">{cert.label}</span>
                        <ExternalLink size={11} className="text-era" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};