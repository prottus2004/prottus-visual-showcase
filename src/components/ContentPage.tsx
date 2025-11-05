import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, ScrollControls, Scroll } from "@react-three/drei"; // Import <Scroll>
import { Navigation } from "@/components/Navigation";
import { PageShape } from "@/components/PageShape";
import React from "react";

// Page transition variants
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
      className="relative h-screen w-screen overflow-hidden" // Use h-screen and w-screen
      style={{ perspective: "1000px" }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* 3D Scene Background */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#22d3ee" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* ScrollControls links the 3D shape to the 2D <Scroll> component */}
        {/* We'll set pages to 3 to give ample scroll room for the effect */}
        <ScrollControls pages={3} damping={0.25}>
          {/* 3D Shape */}
          <PageShape shape={shape} />
          
          {/* 2D HTML Content */}
          <Scroll html>
            {/* This div creates the space for the 3D object at the top */}
            <div style={{ paddingTop: '100vh' }}>
              <main className="relative z-10 bg-background pt-20">
                {children}
                {/* Footer to add scroll length */}
                <footer className="py-16 text-center text-foreground/60 border-t border-accent/20">
                  <p>© 2025 Prottus Manna. Crafted with passion and precision.</p>
                </footer>
              </main>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
      
      {/* Navigation sits on top of the <Canvas> */}
      <Navigation />
    </motion.div>
  );
};
