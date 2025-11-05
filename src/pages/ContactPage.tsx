import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";

// New Variants: Slide in from bottom
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "anticipate" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeOut" } },
};

const ContactPage = () => {
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
        <Contact />
      </motion.main>
    </div>
  );
};

export default ContactPage;
