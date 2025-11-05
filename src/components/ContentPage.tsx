import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, ScrollControls, OrbitControls } from "@react-three/drei"; // Import OrbitControls
import { Navigation } from "@/components/Navigation";
import { PageShape } from "@/components/PageShape";
import React from "react";

// New 3D page transition variants
const pageVariants = {
  initial: { opacity: 0, rotateX: -90, y: 100 },
  animate: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    rotateX: 90,
    y: -100,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
  },
};

interface ContentPageProps {
  children: React.ReactNode;
  shape: 'sphere' | 'box' | 'torus' | 'dodecahedron';
}

export const ContentPage = ({ children, shape }: ContentPageProps) => {
  return (
    <motion.div
      className="relative min-h-screen"
      style={{ perspective: "1000px" }} // Enable 3D perspective for transitions
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* 3D Scene Background */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#22d3ee" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* === ADDED THIS SECTION === */}
          {/* This makes the entire scene auto-rotate, creating the "lively" feel */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
          {/* === END ADDED SECTION === */}

          <ScrollControls pages={2} damping={0.25}>
            <PageShape shape={shape} />
          </ScrollControls>
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation />
      
      {/* 2D Page Content */}
      <main className="pt-20">{children}</main>
    </motion.div>
  );
};
