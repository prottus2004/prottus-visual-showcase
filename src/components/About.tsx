import { motion } from "framer-motion";
import { GraduationCap, Award, Heart, MapPin } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import { ACHIEVEMENTS, BIO, EDUCATION, HOBBIES, PERSONA } from "@/data/chronicle";
import { fadeUp, staggerContainer, staggerFast, viewportOnce } from "@/lib/motion";

// Stat tiles beneath the bio. TODO: tweak values to match your record.
const STATS = [
  { value: "9.00", label: "SGPA · Final Sem" },
  { value: "83%", label: "Best Intern · Zidio" },
  { value: "5+", label: "AI / full-stack ships" },
  { value: "3", label: "Years building" },
];

export const About = () => {
  return (
    <div className="space-y-20">
      {/* Two-column: bio + portrait (spec). */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid items-center gap-12 md:grid-cols-2"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="chrono-mono text-sm text-era">{PERSONA.tagline}</p>
          <h3 className="text-3xl font-bold leading-tight md:text-4xl">
            {PERSONA.name} <span className="text-foreground/40">—</span>{" "}
            <span className="gradient-text">{PERSONA.role}</span>
          </h3>
          <p className="max-w-xl leading-relaxed text-foreground/70">{BIO}</p>
          <p className="flex items-center gap-2 text-sm text-foreground/60">
            <MapPin size={15} className="text-era" /> {PERSONA.location} · {PERSONA.relocation}
          </p>

          {/* Stats row — staggered fade-in. */}
          <motion.div variants={staggerFast} className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
            {STATS.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="glass-era rounded-xl p-4">
                <div className="text-2xl font-bold text-era">{s.value}</div>
                <div className="chrono-mono mt-1 text-[10px] text-foreground/60">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-sm">
          <div
            className="absolute inset-0 rounded-2xl opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(263 80% 60%), transparent 70%)" }}
          />
          <img
            src={profileImage}
            alt={PERSONA.name}
            data-cursor
            className="relative aspect-[4/5] w-full rounded-2xl border border-era/30 object-cover shadow-era"
          />
        </motion.div>
      </motion.div>

      {/* Education */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-4"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="bg-era-soft text-era rounded-lg p-2">
            <GraduationCap size={18} />
          </div>
          <h3 className="chrono-mono text-xl font-bold text-era">Education</h3>
          <div className="era-rule flex-1" />
        </motion.div>
        <div className="space-y-3">
          {EDUCATION.map((e) => (
            <motion.div
              key={e.degree}
              variants={fadeUp}
              className="glass-era flex flex-col gap-1 rounded-xl p-5 sm:flex-row sm:justify-between"
            >
              <div>
                <p className="font-semibold">{e.degree}</p>
                <p className="text-sm text-foreground/60">{e.institution}</p>
              </div>
              <div className="text-sm sm:text-right">
                <p className="text-era">{e.grade}</p>
                <p className="chrono-mono text-xs text-foreground/60">{e.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements + Hobbies */}
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="bg-era-soft text-era rounded-lg p-2">
              <Award size={18} />
            </div>
            <h3 className="chrono-mono text-xl font-bold text-era">Achievements</h3>
            <div className="era-rule flex-1" />
          </motion.div>
          <div className="space-y-3">
            {ACHIEVEMENTS.map((a) => (
              <motion.p
                key={a}
                variants={fadeUp}
                className="glass-era flex items-start gap-3 rounded-xl p-4 text-sm text-foreground/80"
              >
                <div className="bg-era shadow-era mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                {a}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="bg-era-soft text-era rounded-lg p-2">
              <Heart size={18} />
            </div>
            <h3 className="chrono-mono text-xl font-bold text-era">Hobbies</h3>
            <div className="era-rule flex-1" />
          </motion.div>
          <motion.div variants={staggerFast} className="flex flex-wrap gap-3">
            {HOBBIES.map((h) => (
              <motion.span
                key={h}
                variants={fadeUp}
                data-cursor
                whileHover={{ scale: 1.05 }}
                className="bg-era-soft border-era/20 rounded-full border px-4 py-2 text-sm"
              >
                {h}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};