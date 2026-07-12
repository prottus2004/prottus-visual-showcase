import { motion } from "framer-motion";
import { GraduationCap, Award, Heart, MapPin } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import { ACHIEVEMENTS, BIO, EDUCATION, HOBBIES, PERSONA } from "@/data/chronicle";
import { fadeUp, staggerContainer, staggerFast, viewportOnce } from "@/lib/motion";
import { DecorativeBlob } from "@/components/DecorativeBlob";
import { getAccentByIndex } from "@/lib/accent";

// Stat tiles beneath the bio. Top stripe rotates through the 7 accent colors.
const STATS = [
  { value: "9.00", label: "SGPA · Final Sem" },
  { value: "83%", label: "Best Intern · Zidio" },
  { value: "5+", label: "AI / full-stack ships" },
  { value: "3", label: "Years building" },
];

export const About = () => {
  return (
    <div className="space-y-20">
      {/* Two-column: bio + portrait */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid items-center gap-12 md:grid-cols-2"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="eyebrow text-coral-700">{PERSONA.tagline}</p>
          <h3 className="text-3xl font-bold leading-tight md:text-4xl">
            {PERSONA.name}{" "}
            <span className="text-foreground/40">—</span>{" "}
            <span className="gradient-text">{PERSONA.role}</span>
          </h3>
          <p className="max-w-xl leading-relaxed text-foreground/70">{BIO}</p>
          <p className="flex items-center gap-2 text-sm text-foreground/60">
            <MapPin size={15} className="text-coral-500" /> {PERSONA.location} · {PERSONA.relocation}
          </p>

          {/* Cohesion-style stat tiles — white card, 3px colored top stripe. */}
          <motion.div variants={staggerFast} className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
            {STATS.map((s, i) => {
              const accent = getAccentByIndex(i);
              return (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-[3px] ${accent.bg}`}
                    aria-hidden
                  />
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="eyebrow mt-1 text-foreground/60">{s.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Portrait with a pink decorative blob behind it. */}
        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-sm">
          <DecorativeBlob
            variant="pink"
            size="md"
            position="absolute -right-12 -top-8"
            opacity={0.55}
          />
          <DecorativeBlob
            variant="yellow"
            size="sm"
            position="absolute -left-8 bottom-4"
            opacity={0.45}
          />
          <img
            src={profileImage}
            alt={PERSONA.name}
            data-cursor
            className="relative aspect-[4/5] w-full rounded-2xl border border-border object-cover shadow-elevated"
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
          <div className="rounded-lg bg-coral-100 text-coral-700 p-2">
            <GraduationCap size={18} />
          </div>
          <h3 className="text-xl font-bold text-coral-700">Education</h3>
          <div className="divider flex-1" />
        </motion.div>
        <div className="space-y-3">
          {EDUCATION.map((e, i) => {
            const accent = getAccentByIndex(i);
            return (
              <motion.div
                key={e.degree}
                variants={fadeUp}
                className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:justify-between hover:shadow-elevated transition-shadow"
              >
                <div>
                  <p className="font-semibold">{e.degree}</p>
                  <p className="text-sm text-foreground/60">{e.institution}</p>
                </div>
                <div className="text-sm sm:text-right">
                  <p className={`font-medium ${accent.text}`}>{e.grade}</p>
                  <p className="eyebrow mt-1 text-foreground/60">{e.year}</p>
                </div>
              </motion.div>
            );
          })}
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
            <div className="rounded-lg bg-coral-100 text-coral-700 p-2">
              <Award size={18} />
            </div>
            <h3 className="text-xl font-bold text-coral-700">Achievements</h3>
            <div className="divider flex-1" />
          </motion.div>
          <div className="space-y-3">
            {ACHIEVEMENTS.map((a, i) => {
              const accent = getAccentByIndex(i + 2);
              return (
                <motion.p
                  key={a}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80 shadow-soft"
                >
                  <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${accent.bg}`} />
                  {a}
                </motion.p>
              );
            })}
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
            <div className="rounded-lg bg-coral-100 text-coral-700 p-2">
              <Heart size={18} />
            </div>
            <h3 className="text-xl font-bold text-coral-700">Hobbies</h3>
            <div className="divider flex-1" />
          </motion.div>
          <motion.div variants={staggerFast} className="flex flex-wrap gap-3">
            {HOBBIES.map((h, i) => {
              const accent = getAccentByIndex(i + 4);
              return (
                <motion.span
                  key={h}
                  variants={fadeUp}
                  data-cursor
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-full border ${accent.border} ${accent.soft} px-4 py-2 text-sm text-foreground transition-colors`}
                >
                  {h}
                </motion.span>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
