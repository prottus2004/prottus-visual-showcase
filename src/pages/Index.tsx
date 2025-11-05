import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion"; // Import motion

// Define reusable animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "anticipate" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "anticipate" } },
};

const Index = () => {
  return (
    <div className="relative">
      <Background3D />
      <Navigation />
      {/* Wrap main content with motion.main */}
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Hero />
      </motion.main>
      <footer className="py-8 text-center text-foreground/60 border-t border-accent/20">
        <p>© 2025 Prottus Manna. Crafted with passion and precision.</p>
      </footer>
    </div>
  );
};

export default Index;
