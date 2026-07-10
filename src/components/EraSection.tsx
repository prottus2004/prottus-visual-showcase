import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  Box,
  Torus,
  Dodecahedron,
  Icosahedron,
  TorusKnot,
  Cone,
  MeshDistortMaterial,
  Float,
} from "@react-three/drei";
import { Group } from "three";
import type { Era } from "@/data/chronicle";

/** Maps an era shape to a <mesh> geometry. */
function MotifGeometry({ shape, hue }: { shape: Era["shape"]; hue: number }) {
  const color = `hsl(${hue}, 90%, 62%)`;
  const emissive = `hsl(${hue}, 90%, 45%)`;
  const material = (
    <MeshDistortMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.35}
      roughness={0.12}
      metalness={0.75}
      distort={0.32}
      speed={1.6}
    />
  );

  switch (shape) {
    case "orb":
      return (
        <Sphere args={[1.3, 48, 48]}>
          {material}
        </Sphere>
      );
    case "cube":
      return (
        <Box args={[1.9, 1.9, 1.9]}>
          {material}
        </Box>
      );
    case "torus":
      return (
        <Torus args={[1.1, 0.42, 24, 90]}>
          {material}
        </Torus>
      );
    case "crystal":
      return (
        <Dodecahedron args={[1.4, 0]}>
          {material}
        </Dodecahedron>
      );
    case "portal":
      return (
        <TorusKnot args={[1, 0.32, 150, 28]}>
          {material}
        </TorusKnot>
      );
    case "scroll":
      return (
        <Icosahedron args={[1.4, 1]}>
          {material}
        </Icosahedron>
      );
    case "beacon":
      return (
        <group>
          <Cone args={[1, 2, 6]}>
            {material}
          </Cone>
        </group>
      );
    default:
      return (
        <Sphere args={[1.3, 48, 48]}>
          {material}
        </Sphere>
      );
  }
}

function MotifMesh({ shape, hue }: { shape: Era["shape"]; hue: number }) {
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    }
  });
  return (
    <group ref={ref}>
      <MotifGeometry shape={shape} hue={hue} />
    </group>
  );
}

/** Small decorative 3D canvas rendering the era's motif. */
export function EraMotif({ era, className = "" }: { era: Era; className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.6]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 4]} intensity={1.4} />
        <pointLight position={[-5, -3, -2]} intensity={1.2} color={`hsl(${era.hue},90%,60%)`} />
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
          <MotifMesh shape={era.shape} hue={era.hue} />
        </Float>
      </Canvas>
    </div>
  );
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" as const },
  }),
};

interface EraSectionProps {
  era: Era;
  children: React.ReactNode;
  /** show the floating 3D motif beside the header (default true) */
  motif?: boolean;
  id?: string;
}

/** Shared era wrapper: HUD-style chapter header + story narration + content. */
export const EraSection = ({ era, children, motif = true, id }: EraSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} className="relative py-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Era header */}
        <div className="relative mb-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <motion.div
                className="chrono-mono mb-3 text-xs text-era"
                custom={0}
                variants={headerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {era.chapter} · {era.year}
              </motion.div>

              <motion.h2
                className="text-5xl md:text-6xl font-bold gradient-text mb-4 leading-tight"
                custom={1}
                variants={headerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {era.title}
              </motion.h2>

              <motion.p
                className="text-lg text-foreground/70 mb-5 max-w-2xl"
                custom={2}
                variants={headerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {era.narration}
              </motion.p>

              <motion.div
                className="era-rule max-w-md"
                custom={3}
                variants={headerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              />
            </div>

            {motif && (
              <motion.div
                className="relative mx-auto hidden h-48 w-48 md:block lg:h-60 lg:w-60"
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1, rotate: 0 }
                    : { opacity: 0, scale: 0.6, rotate: -20 }
                }
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <EraMotif era={era} className="h-full w-full" />
              </motion.div>
            )}
          </div>

          <motion.p
            className="mt-6 chrono-mono text-sm text-era/80"
            custom={4}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            “{era.tagline}”
          </motion.p>
        </div>

        {/* Section content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};