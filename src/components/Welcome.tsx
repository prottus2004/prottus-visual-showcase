import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, MeshWobbleMaterial } from "@react-three/drei";
import { Mesh } from "three";
import { PERSONA } from "@/data/chronicle";

/** The chrono-core that spins up during boot. */
function BootCore() {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      const t = Math.min(1, state.clock.elapsedTime / 3);
      mesh.current.rotation.x += delta * (0.2 + t * 1.4);
      mesh.current.rotation.y += delta * (0.3 + t * 1.8);
      const s = 1 + t * 0.4;
      mesh.current.scale.setScalar(s);
    }
  });
  return (
    <TorusKnot ref={mesh} args={[1.1, 0.3, 160, 28]}>
      <MeshWobbleMaterial
        color="#22d3ee"
        emissive="#7c3aed"
        emissiveIntensity={0.5}
        factor={1.4}
        speed={3}
        roughness={0.1}
        metalness={0.8}
      />
    </TorusKnot>
  );
}

const BOOT_LINES = [
  "› calibrating chronometer",
  "› folding spacetime",
  "› booting time drive",
  "› destination acquired",
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 2.4, transition: { duration: 0.9, ease: "easeIn" as const } },
};

interface WelcomeProps {
  onFinished: () => void;
}

export const Welcome = ({ onFinished }: WelcomeProps) => {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const total = 4.6; // boot lines + reveal hold
    const lineTimer = setInterval(() => {
      setLine((l) => Math.min(BOOT_LINES.length, l + 1));
    }, 520);
    const exitTimer = setTimeout(() => onFinished(), total * 1000);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background p-4 scanlines"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 3D core */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 6, 5]} intensity={1.4} />
          <pointLight position={[-6, -4, -2]} intensity={1} color="#22d3ee" />
          <BootCore />
        </Canvas>
      </div>

      {/* Boot readout */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="chrono-mono mb-6 text-[11px] text-accent/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          chrono-stream · v2026
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold glow-text mb-3"
          initial={{ opacity: 0, y: 20, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {PERSONA.name}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-foreground/60 mb-8 chrono-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {PERSONA.role}
        </motion.p>

        {/* terminal lines */}
        <div className="w-64 text-left font-mono text-xs">
          {BOOT_LINES.map((l, i) => (
            <motion.div
              key={l}
              className="text-foreground/70"
              initial={{ opacity: 0, x: -10 }}
              animate={line > i ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
            >
              {l}
              {line > i && <span className="text-accent"> ✓</span>}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};