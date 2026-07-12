import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { ERAS, PERSONA, SOCIALS } from "@/data/chronicle";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "./MagneticButton";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { DecorativeBlob } from "@/components/DecorativeBlob";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const SOCIAL_ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Instagram: Instagram,
};

const FOOTER_LINKS: [string, string][] = [
  ["About", "/about"],
  ["Work", "/projects"],
  ["Skills", "/skills"],
  ["Experience", "/experience"],
  ["Certifications", "/certifications"],
  ["Resume", "/resume"],
];

/** Shared closing section — big headline, copy-to-clipboard email, socials,
 *  availability badge, secondary nav, and copyright. */
export const Footer = () => {
  const era = ERAS.transmit;
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONA.email);
      setCopied(true);
      toast({ title: "Email copied", description: PERSONA.email });
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      toast({ title: "Couldn't copy", description: PERSONA.email, variant: "destructive" });
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden py-32 md:py-40">
      {/* Decorative blob on the left, subtle. */}
      <DecorativeBlob
        variant="purple"
        size="lg"
        position="absolute -left-40 top-1/4"
        opacity={0.3}
      />
      <DecorativeBlob
        variant="coral"
        size="md"
        position="absolute -right-32 bottom-0"
        opacity={0.25}
      />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="eyebrow mb-4 text-coral-700">
            {era.chapter} · {era.year}
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          >
            Let's build something <span className="gradient-text">together.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-foreground/60">
            {era.narration}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <button
                type="button"
                data-cursor
                onClick={copyEmail}
                className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 hover:shadow-soft transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
              >
                <span className="text-lg">{PERSONA.email}</span>
                <span className="text-coral-700">{copied ? <Check size={18} /> : <Copy size={18} />}</span>
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-medium hover:shadow-elevated transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
              >
                Start a conversation <ArrowUpRight size={18} />
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex gap-3">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              if (!Icon) return null;
              return (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/60 transition-colors hover:border-coral-200 hover:bg-coral-100 hover:text-coral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="divider my-12 max-w-4xl" />

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          >
            <AvailabilityBadge />
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/60">
              {FOOTER_LINKS.map(([name, path]) => (
                <Link key={path} to={path} data-cursor className="transition-colors hover:text-foreground">
                  {name}
                </Link>
              ))}
            </nav>
            <p className="eyebrow text-[10px] text-foreground/40">© {new Date().getFullYear()} {PERSONA.name}</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
