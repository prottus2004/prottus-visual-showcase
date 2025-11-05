import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"; // Import new hooks
import { ArrowDown } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import React from "react"; // Import React

export const Hero = () => {
  // --- Start of interactive mouse-follow logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth, lagging effect
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  // Transform mouse position into a "tilt" rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);
  
  // Add a subtle parallax movement
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the element
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Normalize from -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset to center when mouse leaves
    x.set(0);
    y.set(0);
  };
  // --- End of interactive logic ---

  return (
    // Add mouse move/leave handlers to the main section
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* ... (Left side content remains unchanged) ... */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-accent text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.div>
            
            <motion.h1
              className="text-6xl md:text-8xl font-bold glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Prottus
              <br />
              <span className="gradient-text">Manna</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer & AI Enthusiast
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent rounded-full text-white font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="/projects"
                className="px-8 py-3 glass rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side (image) */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            // Apply the new interactive styles
            style={{ 
              perspective: "1000px",
              translateX,
              translateY,
            }}
          >
            <motion.div
              className="relative"
              // Apply rotation and remove the old y-axis float
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              // Remove the old animation:
              // animate={{ y: [0, -20, 0] }}
              // transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-30"
                style={{ transform: "translateZ(-50px)" }} // Push glow back
              />
              <img
                src={profileImage}
                alt="Prottus Manna"
                className="relative w-80 h-80 object-cover rounded-full border-4 border-accent/30"
                style={{ transform: "translateZ(50px)" }} // Pull image forward
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
