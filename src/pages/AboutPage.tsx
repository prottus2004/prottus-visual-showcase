import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { motion } from "framer-motion";

// New Variants: Slide in from right
const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "anticipate" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeOut" } },
};

const AboutPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background3D />
      <Navigation />
      <motion.main 
        className="pt-20"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <About />
      </motion.main>
    </div>
  );
};

export default AboutPage;
