import { motion } from "framer-motion";
import { Github } from "lucide-react"; // Removed Linkedin, Facebook, Instagram
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.h1
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              PM
            </motion.h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={item.name} to={item.path}>
                <motion.div
                  className={`text-foreground/80 hover:text-foreground transition-colors ${
                    location.pathname === item.path ? "text-accent font-semibold" : ""
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, url: "https://github.com/Prottus-manna" },
              // Removed LinkedIn, Facebook, and Instagram
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
