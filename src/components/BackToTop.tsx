import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/lib/useLenis";

/**
 * Fixed bottom-right back-to-top button. Appears after scrolling past 600px.
 * Uses Lenis for an animated scroll-to-top when available, else an instant
 * jump (so the reduced-motion fallback, where Lenis is absent, never animates).
 */
export const BackToTop = () => {
  const lenis = useLenis();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          data-cursor
          aria-label="Back to top"
          onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "auto" }))}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-card border border-border text-foreground/70 hover:text-foreground shadow-soft transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};