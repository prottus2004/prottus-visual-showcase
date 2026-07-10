// ============================================================================
//  Shared Framer Motion variants — used across the Chronicle refit so every
//  section, card, hero line and page transition shares one easing language.
//  Spec easing: "expo out" ≈ [0.22, 1, 0.36, 1].
// ============================================================================

import type { Variants } from "framer-motion";

/** Expo-out ease — the spec's signature ease for entrances + transitions. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Reused whileInView viewport config — fire once, when ~20% visible. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Container that staggers its children in by 0.1s (with a small head-start). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** Faster stagger for dense grids / tag rows. */
export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/** Hero word-by-word entrance container. */
export const wordStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

/** Each word/line child of a staggered hero headline. */
export const wordChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Line-by-line stagger for the delayed hero subheading. */
export const lineStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

/** Fade + slight vertical slide used by the keyed page <PageWrapper>. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE } },
};