import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Cloud,
  Download,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  CV_ACHIEVEMENTS,
  CV_SKILL_LINES,
  ERA_ORDER,
  ERAS,
  PERSONA,
  SOCIALS,
} from "@/data/chronicle";
import { MagneticButton } from "@/components/MagneticButton";
import { DecorativeBlob } from "@/components/DecorativeBlob";
import { PdfLightbox } from "@/components/PdfLightbox";
import { getAccentByIndex } from "@/lib/accent";
import {
  cardReveal,
  fadeUp,
  staggerContainer,
  staggerFast,
  viewportOnce,
  wordChild,
  wordStagger,
} from "@/lib/motion";

// ============================================================================
//  THE CHRONICLE — resume page, rebuilt in the Cohesion template language.
//  Section flow:
//    Hero → Testimonials → Capabilities → Footer/Contact.
//  Every CV datum is rendered; nothing from chronicle.ts is omitted.
// ============================================================================

/* Stat pill for the hero — Cohesion's "80+ Happy Clients" pill. */
const HERO_STAT = { value: "5+", label: "AI & full-stack ships" };

/* Testimonial cards — Cohesion's 3-up "Kind words" grid, repurposed for the
   three CV achievements (award / study visit / problem-solving). */
const TESTIMONIALS = CV_ACHIEVEMENTS.map((quote, i) => {
  const card = [
    {
      name: "Best Intern Award",
      title: "Zidio Developments · Aug 2025",
      quote,
    },
    {
      name: "NUS Study Visit",
      title: "AI & ML · IEM Kolkata",
      quote,
    },
    {
      name: "Real-Time Problem Solving",
      title: "CodeChef & LeetCode",
      quote,
    },
  ][i];
  return card;
});

/* Capabilities — Cohesion's 3-tier "Subscription Plans" card layout,
   repurposed as three core focus areas from the CV. */
const CAPABILITIES = [
  {
    name: "AI / ML & LLM Engineering",
    blurb:
      "Designing and deploying production AI systems — multi-model vision pipelines, agentic voice assistants, RAG retrieval, and self-retraining models.",
    items: ["PyTorch", "LLMs (NIM/Ollama)", "RAG Pipelines", "CNN · LSTM · U-Net", "Transformers"],
    featured: true,
  },
  {
    name: "Full-Stack Development",
    blurb:
      "Building end-to-end web apps with React, Node and Express — from live-preview editors to real-time mission-control dashboards.",
    items: ["React.js", "Node.js", "Express.js", "REST API Design", "Streamlit"],
    featured: false,
  },
  {
    name: "System & Integration",
    blurb:
      "Wiring third-party APIs, automated retraining pipelines, and CI/CD-oriented delivery across the full SDLC with cross-functional teams.",
    items: ["REST API", "Third-Party APIs", "CI/CD Pipelines", "Agile / Scrum", "System Design"],
    featured: false,
  },
];

/* Section heading — Cohesion pattern: eyebrow + big H2. */
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow text-coral-700 mb-3">{eyebrow}</p>
      <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h2>
    </div>
  );
}

export const Resume = () => {
  /* "Hi, I'm Prottus Manna!" — split into words for the staggered entrance,
     last word gets the coral→pink→purple gradient. */
  const nameWords = "Hi, I'm Prottus Manna!".split(" ");
  const era = ERAS.chronicle;

  /* In-page PDF viewer for the expedition certificate links. */
  const [activeCert, setActiveCert] = useState<{ url: string; label: string } | null>(null);

  /* Era nav links for the footer (skip the current /resume era). */
  const footerNav = ERA_ORDER.filter((id) => id !== "chronicle").map((id) => ({
    id,
    label: ERAS[id].title,
    route: ERAS[id].route,
  }));

  return (
    <div className="relative overflow-hidden">
      {/* =========================================================================
          1. HERO — stat pill · "Hi, I'm <Name>!" · skill tags · single CTA
          (Cohesion hero: "80+ Happy Clients" → "Hi, I'm Larry!" → tags → CTA)
          ========================================================================= */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
        <DecorativeBlob variant="coral" size="xl" position="absolute -right-48 top-10" opacity={0.32} />
        <DecorativeBlob variant="purple" size="lg" position="absolute -left-40 -top-10" opacity={0.28} />
        <DecorativeBlob variant="blue" size="md" position="absolute right-1/3 bottom-0" opacity={0.22} />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            {/* Stat pill — Cohesion's "80+ Happy Clients" */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-coral-100 px-4 py-1.5 text-xs font-medium text-coral-700"
            >
              <Sparkles size={13} />
              {HERO_STAT.value} {HERO_STAT.label}
            </motion.div>

            {/* Huge "Hi, I'm Prottus Manna!" — last word gradient, word-by-word entrance */}
            <motion.h1
              variants={wordStagger}
              className="mt-6 text-5xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              {nameWords.map((word, i) => (
                <motion.span key={i} variants={wordChild} className="mr-4 inline-block">
                  {i === nameWords.length - 1 ? <span className="gradient-text">{word}</span> : word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Role subtitle */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-xl text-foreground/70 md:text-2xl"
            >
              {PERSONA.role}
            </motion.p>

            {/* Skill-domain tag row — Cohesion's hero skill list, as pills */}
            <motion.div
              variants={staggerFast}
              className="mt-7 flex flex-wrap justify-center gap-2.5"
            >
              {CV_SKILL_LINES.map((group, i) => {
                const accent = getAccentByIndex(i);
                return (
                  <motion.span
                    key={group.label}
                    variants={fadeUp}
                    className={`rounded-full border ${accent.border} ${accent.soft} px-3.5 py-1.5 text-xs font-medium text-foreground/80`}
                  >
                    {group.label}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* Single CTA — Cohesion's "Let's Work Together!" + "Read My CV" below */}
            <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-3">
              <MagneticButton>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block"
                >
                  <Link
                    to="/contact"
                    data-cursor
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground text-background px-8 py-4 text-base font-medium hover:shadow-elevated transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
                  >
                    Let's Work Together!
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </MagneticButton>
              <MagneticButton>
                <motion.button
                  type="button"
                  onClick={() =>
                    setActiveCert({
                      url: PERSONA.resumePdf,
                      label: `Resume — ${PERSONA.name}`,
                    })
                  }
                  data-cursor
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-foreground/15 px-7 py-3 text-sm font-medium hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <FileText size={16} />
                  Read My CV
                </motion.button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          2. TESTIMONIALS — Cohesion's "Kind words from Clients" 3-up card grid,
          repurposed for the three CV achievements.
          ========================================================================= */}
      <section className="relative py-24">
        <DecorativeBlob variant="pink" size="lg" position="absolute -left-40 top-1/4" opacity={0.18} />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHead eyebrow="Testimonials" title="Kind words & recognition" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t, i) => {
              const accent = getAccentByIndex(i + 1);
              return (
                <motion.figure
                  key={t.name}
                  variants={cardReveal}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <div className={`absolute inset-x-0 top-0 h-[3px] ${accent.bg}`} aria-hidden />
                  <Award size={26} className={accent.text} />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-border pt-4">
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="eyebrow mt-1 text-foreground/60">{t.title}</p>
                  </figcaption>
                </motion.figure>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          3. CAPABILITIES — Cohesion's 3-tier "Subscription Plans" card layout,
          repurposed as three core focus areas. Middle card is featured.
          ========================================================================= */}
      <section className="relative py-24">
        <DecorativeBlob variant="blue" size="lg" position="absolute -right-40 top-1/3" opacity={0.16} />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHead eyebrow="Capabilities" title="How I can help your team" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-3"
          >
            {CAPABILITIES.map((c, i) => {
              const accent = getAccentByIndex(i + 2);
              return (
                <motion.div
                  key={c.name}
                  variants={cardReveal}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-soft hover:shadow-elevated transition-shadow md:p-8 ${
                    c.featured
                      ? "border-coral-300 bg-card ring-1 ring-coral-200 md:scale-[1.03]"
                      : "border-border bg-card"
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-[3px] ${accent.bg}`} aria-hidden />
                  {c.featured && (
                    <span className="absolute right-5 top-5 rounded-full bg-coral-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Core Focus
                    </span>
                  )}
                  <h3 className={`text-xl font-bold ${accent.text}`}>{c.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{c.blurb}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <div className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border">
                    <MagneticButton>
                      <Link
                        to="/contact"
                        data-cursor
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-coral-700 transition-colors"
                      >
                        Let's talk
                        <ArrowRight size={15} />
                      </Link>
                    </MagneticButton>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          4. FOOTER / CONTACT — transmit CTA, contact, socials, era nav, download
          ========================================================================= */}
      <footer className="relative overflow-hidden border-t border-border bg-foreground py-20 text-background">
        <DecorativeBlob variant="coral" size="xl" position="absolute -left-40 -bottom-40" opacity={0.25} />
        <DecorativeBlob variant="purple" size="lg" position="absolute -right-40 -top-20" opacity={0.22} />

        <div className="container relative z-10 mx-auto px-6">
          {/* Big transmit CTA */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4 text-coral-300">
              {ERAS.transmit.title} · {ERAS.transmit.chapter}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold tracking-tight md:text-6xl">
              Let's build something <span className="gradient-text">worth shipping.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-background/70">
              {ERAS.transmit.narration}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <motion.a
                  href={`mailto:${PERSONA.email}`}
                  data-cursor
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 font-medium text-white hover:bg-coral-600 transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Mail size={18} />
                  {PERSONA.email}
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href={PERSONA.resumePdf}
                  download
                  data-cursor
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-background/25 px-7 py-3.5 font-medium hover:bg-background/10 transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Download size={18} />
                  Download Resume
                </motion.a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Contact + socials + nav grid */}
          <div className="grid gap-10 border-t border-background/15 pt-12 md:grid-cols-3">
            <div className="space-y-3">
              <p className="eyebrow text-background/50">Contact</p>
              <a href={`mailto:${PERSONA.email}`} className="flex items-center gap-2 text-sm hover:text-coral-300 transition-colors">
                <Mail size={15} /> {PERSONA.email}
              </a>
              <p className="flex items-center gap-2 text-sm text-background/70">
                <Phone size={15} /> {PERSONA.phone}
              </p>
              <p className="flex items-center gap-2 text-sm text-background/70">
                <MapPin size={15} /> {PERSONA.location}
              </p>
              <p className="flex items-center gap-2 text-sm text-coral-300">
                <Globe size={15} /> {PERSONA.relocation}
              </p>
            </div>

            <div className="space-y-3">
              <p className="eyebrow text-background/50">Socials</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm hover:text-coral-300 transition-colors"
                  >
                    {s.label} <ArrowUpRight size={13} />
                  </a>
                ))}
                <a
                  href={`https://${PERSONA.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm hover:text-coral-300 transition-colors"
                >
                  Portfolio <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="eyebrow text-background/50">The Chronicle</p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                {footerNav.map((n) => (
                  <Link
                    key={n.id}
                    to={n.route}
                    data-cursor
                    className="inline-flex items-center gap-1.5 text-sm text-background/70 hover:text-coral-300 transition-colors"
                  >
                    {n.label} <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-6 sm:flex-row">
            <p className="eyebrow text-background/40">
              {era.title} · {PERSONA.name} · {era.year}
            </p>
            <p className="eyebrow text-background/40">end of chronicle</p>
          </div>
        </div>
      </footer>

      {/* In-page PDF viewer for expedition certificates */}
      <PdfLightbox
        open={!!activeCert}
        url={activeCert?.url ?? null}
        title={activeCert?.label}
        onClose={() => setActiveCert(null)}
      />
    </div>
  );
};