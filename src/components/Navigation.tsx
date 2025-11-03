import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram } from "lucide-react";

export const Navigation = () => {
  const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.h1
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            PM
          </motion.h1>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground/80 hover:text-foreground transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, url: "https://github.com/prottus2004" },
              { icon: Linkedin, url: "https://www.linkedin.com/in/prottus-manna-6b39b2268" },
              { icon: Facebook, url: "https://www.facebook.com/share/1ZXfdDUd1g/" },
              { icon: Instagram, url: "https://www.instagram.com/__pratyush_manna__" },
            ].map(({ icon: Icon, url }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-accent transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
