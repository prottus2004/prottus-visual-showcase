import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { useLenis } from "@/lib/useLenis";

/**
 * Wraps a route so AnimatePresence (in AppShell) has a keyed element with an
 * `exit` variant to animate against. Without this, route exits never fire.
 * Use as the root of every page.
 *
 * The scroll-to-top reset lives here (in a layout effect, before paint) rather
 * than in AppShell's pathname effect so that, under AnimatePresence mode="wait",
 * the *exiting* page fades out in place at its current scroll offset instead of
 * snapping to the top mid-exit. The new page mounts only after the old one
 * finishes exiting, and this layout effect resets scroll to 0 before the new
 * page paints — no jank.
 */
export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "auto" });
  }, [lenis]);

  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
};