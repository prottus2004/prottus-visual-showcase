import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ERA_ORDER, ERAS, SOCIALS } from "@/data/chronicle";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/MagneticButton";
import { useTheme } from "@/hooks/useTheme";

const NAV_ITEMS = ERA_ORDER.map((id) => ({
  // "The Present" → "Present" so nav links read as clean page names.
  name: ERAS[id].title.replace(/^The\s+/, ""),
  path: ERAS[id].route,
  era: id,
}));

const SOCIAL_ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Instagram: Instagram,
};

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300",
        scrolled ? "glass border-border" : "border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex-shrink-0">
            <motion.div
              data-cursor
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Prottus<span className="text-coral-500">.</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1 relative flex-1 justify-center min-w-0">
            {NAV_ITEMS.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className="flex-shrink-0">
                  <motion.div
                    data-cursor
                    className={cn(
                      "relative px-3 py-2 text-sm whitespace-nowrap transition-colors",
                      isActive
                        ? "text-foreground font-medium"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-coral-500"
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

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={toggle}
              data-cursor
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <MagneticButton>
              <Link
                to="/contact"
                data-cursor
                className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:shadow-elevated transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                Let's talk
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile menu */}
          <div className="xl:hidden flex items-center gap-1">
            <button
              type="button"
              onClick={toggle}
              data-cursor
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-card border-l border-border"
              >
                <nav className="flex flex-col gap-6 pt-16 items-center">
                  {NAV_ITEMS.map((item, index) => (
                    <SheetClose asChild key={item.name}>
                      <Link to={item.path}>
                        <motion.div
                          className={cn(
                            "text-2xl font-medium transition-colors",
                            location.pathname === item.path
                              ? "text-foreground"
                              : "text-foreground/60 hover:text-foreground"
                          )}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.08 }}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="flex items-center justify-center gap-6 pt-12">
                    {SOCIALS.map(({ label, url }, index) => {
                      const Icon = SOCIAL_ICONS[label];
                      if (!Icon) return null;
                      return (
                        <motion.a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="text-foreground/60 hover:text-foreground transition-colors"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.08 }}
                        >
                          <Icon size={24} />
                        </motion.a>
                      );
                    })}
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
