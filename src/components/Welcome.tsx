import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Animation for the container (fade in/out)
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 1, delay: 1.5 } }, // Stay for 1.5s, then fade out
};

// Animation for each word
const wordVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.5 + i * 0.1, // Staggered delay + initial delay
    },
  }),
};

// The text to display
const welcomeText = "Welcome to the Land of an AI Innovator & Full-Stack Problem Solver";
const words = welcomeText.split(" ");

interface WelcomeProps {
  onFinished: () => void;
}

export const Welcome = ({ onFinished }: WelcomeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // This will be called when the exit animation is complete
  const handleAnimationComplete = () => {
    onFinished();
  };

  // This triggers the exit animation after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // Total time visible before fading out

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h1 className="flex max-w-2xl flex-wrap justify-center gap-x-2 gap-y-1 text-center text-3xl font-bold md:text-5xl">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                custom={i} // Pass index for staggered delay
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block whitespace-nowrap"
                style={
                  // Make "AI Innovator" and "Full-Stack Problem Solver" stand out
                  word.includes("AI") ||
                  word.includes("Innovator") ||
                  word.includes("Full-Stack") ||
                  word.includes("Problem") ||
                  word.includes("Solver")
                    ? {
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : {}
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
