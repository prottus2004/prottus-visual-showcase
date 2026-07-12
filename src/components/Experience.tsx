import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, MapPin, Briefcase, ExternalLink } from "lucide-react";
import { EXPEDITIONS } from "@/data/chronicle";
import { getAccentByIndex } from "@/lib/accent";
import { PdfLightbox } from "@/components/PdfLightbox";

export const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [activeCert, setActiveCert] = useState<{ url: string; label: string } | null>(null);

  return (
    <div className="mx-auto max-w-4xl" ref={ref}>
      <div className="relative border-l-2 border-foreground/15 pl-8">
        {EXPEDITIONS.map((exp, i) => {
          const accent = getAccentByIndex(i);
          return (
            <motion.div
              key={exp.org}
              className="relative mb-10 last:mb-0"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, type: "spring", stiffness: 80, damping: 16 }}
            >
              {/* Timeline node */}
              <motion.div
                className={`absolute -left-[2.6rem] top-0 flex h-6 w-6 items-center justify-center rounded-full ${accent.bg} shadow-soft`}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <Briefcase size={12} className="text-white" />
              </motion.div>

              <div className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-elevated transition-shadow">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className={`mb-1 text-2xl font-bold ${accent.text}`}>{exp.role}</h3>
                    <h4 className="text-lg font-semibold">{exp.org}</h4>
                  </div>
                  <div className="eyebrow flex flex-col gap-1.5 text-foreground/60">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={13} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-foreground/75">{exp.summary}</p>

                <div className="space-y-2.5">
                  {exp.details.map((d, j) => (
                    <motion.div
                      key={j}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.2 + j * 0.08 }}
                    >
                      <div className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg}`} />
                      <p className="text-sm text-foreground/80">{d}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <p className="eyebrow mb-3 text-foreground/50">capabilities gained</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((s, k) => (
                      <motion.span
                        key={s}
                        data-cursor
                        className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-foreground/80 hover:border-coral-300 hover:text-coral-700 transition-colors"
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
                  <div className="border-t border-border pt-4">
                    <p className="eyebrow mb-3 text-foreground/50">certificates</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.certificates.map((cert) => (
                        <motion.button
                          type="button"
                          key={cert.url}
                          onClick={() => setActiveCert({ url: cert.url, label: cert.label })}
                          data-cursor
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-foreground/80 hover:border-coral-300 hover:text-coral-700 transition-colors"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <span>{cert.label}</span>
                          <ExternalLink size={11} className="text-coral-500" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <PdfLightbox
        open={!!activeCert}
        url={activeCert?.url ?? null}
        title={activeCert?.label}
        onClose={() => setActiveCert(null)}
      />
    </div>
  );
};
