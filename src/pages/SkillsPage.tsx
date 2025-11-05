import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Skills } from "@/components/Skills";
import { motion } from "framer-motion"; // Import motion

// Define reusable animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "anticipate" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "anticipate" } },
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
