import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Dodecahedron, MeshWobbleMaterial } from "@react-three/drei";
import { Mesh } from "three";

// --- 3D Scene for Welcome Screen ---
function WelcomeObject() {
  const meshRef = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });
  return (
    // Using a new shape
    <Dodecahedron ref={meshRef} args={[1.5, 0]} scale={1.2}>
      {/* Using a fun, wobbly material */}
      <MeshWobbleMaterial
        color="#22d3ee" // Use the accent color
        attach="material"
        factor={2} // Wobble intensity
        speed={2}
        roughness={0.1}
      />
    </Dodecahedron>
  );
}
// --- End 3D Scene ---

// Animation for the whole screen
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  // This is the "zoom" exit animation
  exit: {
    opacity: 0,
    scale: 2.5, // Zoom out
    transition: { duration: 1, ease: "easeIn" },
  },
};

// Animation for each word
const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.5 + i * 0.1, // Staggered delay
    },
  }),
};

const welcomeText = "Welcome to the Land of an AI Innovator & Full-Stack Problem Solver";
const words = welcomeText.split(" ");
// Calculate how long the text animation takes
const totalAnimationTime = 0.5 + words.length * 0.1; // Initial delay + stagger

interface WelcomeProps {
  onFinished: () => void;
}

export const Welcome = ({ onFinished }: WelcomeProps) => {
  // This effect will run once. After the text animation finishes,
  // it waits 2 seconds, then calls onFinished, which triggers the exit animation.
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      onFinished();
    }, (totalAnimationTime + 2) * 1000); // (Text animation + 2s pause) * 1000ms

    // Clear the timer if the component unmounts
    return () => clearTimeout(exitTimer);
  }, [onFinished]); // Only run when onFinished changes (which it won't, but it's good practice)

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <WelcomeObject />
        </Canvas>
      </div>

      {/* Text Content */}
      <h1 className="relative z-10 flex max-w-2xl flex-wrap justify-center gap-x-2 gap-y-1 text-center text-3xl font-bold md:text-5xl">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            custom={i}
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
  );
};
