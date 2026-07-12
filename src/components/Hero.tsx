import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import { Link } from "react-router-dom";
import { ERAS, PERSONA } from "@/data/chronicle";
import { MagneticButton } from "@/components/MagneticButton";
import { DecorativeBlob } from "@/components/DecorativeBlob";
import { wordStagger, wordChild, lineStagger, fadeUp } from "@/lib/motion";

export const Hero = () => {
  // Mouse-driven 3D tilt / parallax for the portrait.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-12px", "12px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-12px", "12px"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const era = ERAS.present;
  const nameWords = PERSONA.name.split(" ");

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative background blobs — Cohesion-style soft colorful shapes. */}
      <DecorativeBlob
        variant="coral"
        size="xl"
        position="absolute -right-40 top-1/4"
        opacity={0.35}
      />
      <DecorativeBlob
        variant="purple"
        size="lg"
        position="absolute -left-40 -top-20"
        opacity={0.3}
      />
      <DecorativeBlob
        variant="blue"
        size="md"
        position="absolute right-1/3 bottom-10"
        opacity={0.25}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Text */}
          <motion.div className="flex-1 space-y-6">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-coral-100 px-4 py-1.5 text-xs font-medium text-coral-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={13} />
              {era.tagline}
            </motion.div>

            <motion.div
              className="text-lg font-medium text-coral-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {era.chapter} · {era.year}
            </motion.div>

            {/* Staggered word-by-word name entrance. Last word uses gradient. */}
            <motion.h1
              variants={wordStagger}
              initial="hidden"
              animate="visible"
              className="text-6xl font-bold leading-[1.05] tracking-tight text-foreground md:text-8xl lg:text-9xl"
            >
              {nameWords.map((word, i) => (
                <motion.span key={i} variants={wordChild} className="mr-4 inline-block">
                  {i === nameWords.length - 1 ? <span className="gradient-text">{word}</span> : word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-xl text-foreground/70 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {PERSONA.role}
            </motion.p>

            <motion.p
              className="max-w-lg text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              {era.narration}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={lineStagger}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.div variants={fadeUp}>
                <MagneticButton>
                  <Link
                    to="/contact"
                    data-cursor
                    className="inline-block rounded-full bg-foreground text-background px-8 py-3.5 font-medium hover:shadow-elevated transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
                  >
                    Transmit a Signal
                  </Link>
                </MagneticButton>
              </motion.div>
              <motion.div variants={fadeUp}>
                <MagneticButton>
                  <Link
                    to="/projects"
                    data-cursor
                    className="inline-block rounded-full border border-foreground/15 px-8 py-3.5 font-medium hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
                  >
                    View the Inventions
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            className="flex flex-1 justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ perspective: "1000px", translateX, translateY }}
          >
            <motion.div
              className="relative"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Soft conic-gradient ring behind the portrait. */}
              <div
                className="absolute -inset-6 rounded-full opacity-60"
                style={{
                  background: `conic-gradient(from 180deg at 50% 50%, hsl(var(--coral)), hsl(var(--purple)), hsl(var(--blue)), hsl(var(--coral)))`,
                  filter: "blur(40px)",
                  transform: "translateZ(-30px)",
                }}
              />
              <img
                src={profileImage}
                alt={PERSONA.name}
                data-cursor
                className="relative h-80 w-80 rounded-full border-4 border-white object-cover shadow-elevated"
                style={{ transform: "translateZ(40px)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
