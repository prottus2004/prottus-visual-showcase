import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Skills } from "@/components/Skills";
import { motion } from "framer-motion";

// New Variants: Scale/Zoom in
const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "anticipate" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeOut" } },
};

const SkillsPage = () => {
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
        <Skills />
      </motion.main>
    </div>
  );
};

export default SkillsPage;
