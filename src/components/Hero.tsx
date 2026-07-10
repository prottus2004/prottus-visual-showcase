import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import { Link } from "react-router-dom";
import { ERAS, PERSONA } from "@/data/chronicle";
import { MagneticButton } from "@/components/MagneticButton";
import { wordStagger, wordChild, lineStagger, fadeUp } from "@/lib/motion";

export const Hero = () => {
  // Mouse-driven 3D tilt / parallax for the portrait (kept from the Chronicle).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-18px", "18px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-18px", "18px"]);

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
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Text */}
          <motion.div className="flex-1 space-y-6">
            <motion.div
              className="glass-era chrono-mono inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-era"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={13} />
              {era.chapter} · {era.year}
            </motion.div>

            <motion.div
              className="chrono-mono text-era text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {era.tagline}
            </motion.div>

            {/* Staggered word-by-word name entrance (spec: staggered headline). */}
            <motion.h1
              variants={wordStagger}
              initial="hidden"
              animate="visible"
              className="glow-text text-6xl font-bold leading-none md:text-8xl"
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
              className="max-w-lg text-foreground/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              {era.narration}
            </motion.p>

            {/* Magnetic CTAs (spec: magnetic hover + scale/translate micro-interactions). */}
            <motion.div
              variants={lineStagger}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <motion.div variants={fadeUp}>
                <MagneticButton>
                  <Link
                    to="/contact"
                    data-cursor
                    className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 font-medium text-white transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
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
                    className="glass inline-block rounded-full px-8 py-3 font-medium transition-colors hover:text-era"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ perspective: "1000px", translateX, translateY }}
          >
            <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              <div
                className="absolute inset-0 rounded-full opacity-40 blur-3xl"
                style={{
                  background: `radial-gradient(circle, hsl(${era.hue} 90% 60%), transparent 70%)`,
                  transform: "translateZ(-50px)",
                }}
              />
              {/* rotating orbit ring around the portrait */}
              <motion.div
                className="border-era/30 absolute -inset-6 rounded-full border"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ z: 20 }}
              />
              <img
                src={profileImage}
                alt={PERSONA.name}
                data-cursor
                className="border-era/40 shadow-era relative h-80 w-80 rounded-full border-4 object-cover"
                style={{ transform: "translateZ(50px)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};