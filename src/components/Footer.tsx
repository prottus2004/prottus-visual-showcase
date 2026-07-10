import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { ERAS, PERSONA, SOCIALS } from "@/data/chronicle";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "./MagneticButton";
import { AvailabilityBadge } from "./AvailabilityBadge";
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
    <footer id="contact" className="relative py-32 md:py-40">
      <div className="container mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="chrono-mono mb-4 text-xs text-era">
            {era.chapter} · {era.year}
          </motion.div>

          <motion.h2 variants={fadeUp} className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
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
                className="inline-flex items-center gap-3 rounded-full glass-era px-6 py-3"
              >
                <span className="text-lg">{PERSONA.email}</span>
                <span className="text-era">{copied ? <Check size={18} /> : <Copy size={18} />}</span>
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-white"
              >
                Start a conversation <ArrowUpRight size={18} />
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex gap-4">
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
                  className="grid h-11 w-11 place-items-center rounded-full glass text-foreground/60 transition-colors hover:text-era"
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="era-rule my-12 max-w-4xl" />

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          >
            <AvailabilityBadge />
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/50">
              {FOOTER_LINKS.map(([name, path]) => (
                <Link key={path} to={path} data-cursor className="transition-colors hover:text-era">
                  {name}
                </Link>
              ))}
            </nav>
            <p className="chrono-mono text-xs text-foreground/40">© {new Date().getFullYear()} {PERSONA.name}</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};