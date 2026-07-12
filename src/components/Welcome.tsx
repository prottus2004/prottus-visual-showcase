import { motion } from "framer-motion";
import { useEffect } from "react";
import { PERSONA } from "@/data/chronicle";
import { DecorativeBlob } from "@/components/DecorativeBlob";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeIn" as const } },
};

interface WelcomeProps {
  onFinished: () => void;
}

/** Clean light intro: name fades in centered, role follows, then dismiss.
 *  Replaces the old R3F + terminal boot with a quiet "moment" that doesn't
 *  fight the light Cohesion-style theme. */
export const Welcome = ({ onFinished }: WelcomeProps) => {
  useEffect(() => {
    const t = window.setTimeout(() => onFinished(), 1500);
    return () => window.clearTimeout(t);
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-card p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Decorative blobs — soft, blurred, no animation needed for a 1.5s intro. */}
      <DecorativeBlob
        variant="coral"
        size="xl"
        position="absolute -right-40 top-1/4"
        opacity={0.4}
        animate={false}
      />
      <DecorativeBlob
        variant="purple"
        size="lg"
        position="absolute -left-40 -top-20"
        opacity={0.35}
        animate={false}
      />
      <DecorativeBlob
        variant="blue"
        size="md"
        position="absolute right-1/3 bottom-10"
        opacity={0.3}
        animate={false}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="eyebrow text-coral-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Hi
        </motion.div>

        <motion.h1
          className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          I'm <span className="gradient-text">{PERSONA.name.split(" ")[0]}</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-base text-foreground/60 md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {PERSONA.role}
        </motion.p>
      </div>
    </motion.div>
  );
};
