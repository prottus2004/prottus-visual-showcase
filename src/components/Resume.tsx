import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Mail, Phone, MapPin, Globe, GraduationCap, Briefcase, FolderGit2, Award, Cpu } from "lucide-react";
import {
  CV_ACHIEVEMENTS,
  CV_KEY_PROJECT,
  CV_SKILL_LINES,
  CV_WORK,
  EDUCATION,
  PERSONA,
  SOCIALS,
} from "@/data/chronicle";
import { MagneticButton } from "@/components/MagneticButton";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

function SectionTitle({ icon: Icon, children, i }: { icon: typeof Mail; children: React.ReactNode; i: number }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-3 mb-4 mt-8 first:mt-0"
    >
      <div className="p-2 rounded-lg bg-era-soft text-era">
        <Icon size={18} />
      </div>
      <h3 className="text-xl font-bold chrono-mono text-era">{children}</h3>
      <div className="era-rule flex-1" />
    </motion.div>
  );
}

export const Resume = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      {/* Download bar */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-era rounded-2xl p-6 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="chrono-mono text-xs text-era mb-1">THE DOSSIER</p>
          <p className="text-foreground/70 text-sm">
            Full chronicle · {PERSONA.name} · {PERSONA.role}
          </p>
        </div>
        <MagneticButton>
          <motion.a
            href={PERSONA.resumePdf}
            download
            data-cursor
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Download Resume (PDF)
          </motion.a>
        </MagneticButton>
      </motion.div>

      {/* Document */}
      <motion.div
        className="glass rounded-2xl p-8 md:p-10 scanlines relative"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-era/15">
          <h2 className="text-4xl font-bold gradient-text-static mb-2">{PERSONA.name}</h2>
          <p className="text-foreground/70 mb-4">{PERSONA.role}</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-foreground/60 chrono-mono">
            <a href={`mailto:${PERSONA.email}`} className="flex items-center gap-1.5 hover:text-era">
              <Mail size={12} /> {PERSONA.email}
            </a>
            <span className="flex items-center gap-1.5">
              <Phone size={12} /> {PERSONA.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} /> {PERSONA.location}
            </span>
            <span className="flex items-center gap-1.5 text-era">
              <Globe size={12} /> {PERSONA.relocation}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs text-foreground/60">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-era transition-colors"
              >
                {s.label}
              </a>
            ))}
            <a
              href={`https://${PERSONA.portfolio}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-era transition-colors"
            >
              {PERSONA.portfolio}
            </a>
          </div>
        </div>

        {/* Education */}
        <SectionTitle icon={GraduationCap} i={1}>
          Education
        </SectionTitle>
        <div className="space-y-3">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.degree}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row sm:justify-between gap-1"
            >
              <div>
                <p className="font-semibold">{e.degree}</p>
                <p className="text-sm text-foreground/60">{e.institution}</p>
              </div>
              <div className="sm:text-right text-sm text-foreground/70 whitespace-nowrap">
                <p className="text-era">{e.grade}</p>
                <p className="chrono-mono text-xs">{e.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Work Experience */}
        <SectionTitle icon={Briefcase} i={3}>
          Work Experience
        </SectionTitle>
        <div className="space-y-6">
          {CV_WORK.map((w, i) => (
            <motion.div
              key={w.title}
              custom={i + 4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                <h4 className="font-semibold text-era">{w.title}</h4>
                <span className="chrono-mono text-xs text-foreground/60">{w.period}</span>
              </div>
              <p className="text-xs text-foreground/50 mb-2 italic">{w.stack}</p>
              <ul className="space-y-1.5">
                {w.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/75">
                    <div className="w-1 h-1 bg-era rounded-full mt-2 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Key Project */}
        <SectionTitle icon={FolderGit2} i={6}>
          Key Project
        </SectionTitle>
        <motion.div custom={7} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
            <h4 className="font-semibold text-era">{CV_KEY_PROJECT.title}</h4>
            <span className="chrono-mono text-xs text-foreground/60">{CV_KEY_PROJECT.period}</span>
          </div>
          <p className="text-xs text-foreground/50 mb-2 italic">{CV_KEY_PROJECT.stack}</p>
          <ul className="space-y-1.5">
            {CV_KEY_PROJECT.bullets.map((b, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-foreground/75">
                <div className="w-1 h-1 bg-era rounded-full mt-2 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Achievements */}
        <SectionTitle icon={Award} i={8}>
          Achievements & Recognition
        </SectionTitle>
        <ul className="space-y-2">
          {CV_ACHIEVEMENTS.map((a, i) => (
            <motion.li
              key={i}
              custom={i + 9}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-start gap-2 text-sm text-foreground/75"
            >
              <Award size={14} className="text-era mt-0.5 flex-shrink-0" />
              <span>{a}</span>
            </motion.li>
          ))}
        </ul>

        {/* Technical Skills */}
        <SectionTitle icon={Cpu} i={12}>
          Technical Skills
        </SectionTitle>
        <div className="space-y-2.5">
          {CV_SKILL_LINES.map((group, i) => (
            <motion.div
              key={group.label}
              custom={i + 13}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-sm"
            >
              <span className="font-semibold text-era">{group.label}: </span>
              <span className="text-foreground/75">{group.items.join(" · ")}</span>
            </motion.div>
          ))}
        </div>

        <p className="chrono-mono text-[10px] text-foreground/40 text-center mt-8 pt-4 border-t border-era/10">
          end of chronicle · {PERSONA.name}
        </p>
      </motion.div>
    </div>
  );
};