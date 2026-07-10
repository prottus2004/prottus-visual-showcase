import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Infinite linear auto-scroller. Children are duplicated and the row is
 * translated from 0 → -50% forever, so the two copies form a seamless loop.
 * `duration` is seconds for one full loop; `reverse` scrolls right-to-left.
 */
export const Marquee = ({
  children,
  duration = 28,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) => (
  <div className={cn("overflow-hidden", className)}>
    <motion.div
      className="flex w-max"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div className="flex shrink-0">{children}</div>
      <div className="flex shrink-0" aria-hidden>
        {children}
      </div>
    </motion.div>
  </div>
);