import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, Menu } from "lucide-react"; // Import Menu icon
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react"; // Import useState
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Import Sheet components
import { Button } from "@/components/ui/button"; // Import Button for the trigger

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const socialIcons = [
    { icon: Github, url: "https://github.com/prottus2004" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/prottus-manna-6b39b2268" },
    { icon: Facebook, url: "https://www.facebook.com/share/1ZXfdDUd1g/" },
    { icon: Instagram, url: "https://www.instagram.com/__pratyush_manna__?igsh=ZWVremdtZHRvaHph" },
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
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.h1
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              PM
            </motion.h1>
          </Link>

          {/* === Desktop Navigation (Hidden on mobile) === */}
          <div className="hidden md:flex items-center gap-8 relative">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    className={`relative px-1 py-1 text-foreground/80 hover:text-foreground transition-colors ${
                      isActive ? "text-accent font-semibold" : ""
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.name}
                    
                    {isActive && (
                      <motion.div
                        className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-accent"
                        layoutId="active-nav-link"
                        initial={false}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* === Desktop Social Icons (Hidden on mobile) === */}
          <div className="hidden md:flex items-center gap-4">
            {socialIcons.map(({ icon: Icon, url }, index) => (
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

          {/* === Mobile Menu Trigger (Hidden on desktop) === */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-accent transition-colors">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] glass border-l border-accent/20">
                <nav className="flex flex-col gap-6 pt-16 items-center">
                  {/* Mobile Nav Links */}
                  {navItems.map((item, index) => (
                    <SheetClose asChild key={item.name}>
                      <Link to={item.path}>
                        <motion.div
                          className={`text-2xl text-foreground/80 hover:text-foreground transition-colors ${
                            location.pathname === item.path ? "text-accent font-semibold" : ""
                          }`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    </SheetClose>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <div className="flex items-center justify-center gap-6 pt-12">
                    {socialIcons.map(({ icon: Icon, url }, index) => (
                      <motion.a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-accent transition-colors"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </motion.nav>
  );
};
