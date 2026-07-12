import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AccentName } from "@/lib/accent";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<Size, number> = {
  sm: 200,
  md: 320,
  lg: 480,
  xl: 640,
};

const SIZE_BLOBS: Record<Size, string> = {
  sm: "h-[200px] w-[200px]",
  md: "h-[320px] w-[320px]",
  lg: "h-[480px] w-[480px]",
  xl: "h-[640px] w-[640px]",
};

const ANIMATIONS = ["animate-blob-drift-a", "animate-blob-drift-b", "animate-blob-drift-c"] as const;

interface DecorativeBlobProps {
  variant: AccentName;
  size?: Size;
  /** Tailwind absolute positioning classes, e.g. "-right-40 top-1/4". */
  position?: string;
  /** Run the framer-motion drift loop (default true). */
  animate?: boolean;
  /** 0-1 — defaults to 0.5. Lower = more subtle. */
  opacity?: number;
  /** Optional extra classes. */
  className?: string;
}

/**
 * A soft, blurry, colorful shape — Cohesion's "3D" decorative objects, built
 * with pure CSS (conic-gradient + blur) instead of WebGL. Use 1-3 per page
 * to suggest depth without real 3D cost.
 */
export const DecorativeBlob = ({
  variant,
  size = "md",
  position = "absolute",
  animate = true,
  opacity = 0.5,
  className,
}: DecorativeBlobProps) => {
  const dim = SIZE_PX[size];
  // Pick a stable animation per component instance via indexOf on the variant.
  const animClass = ANIMATIONS[
    ["coral", "pink", "purple", "blue", "yellow", "green", "orange"].indexOf(variant) % ANIMATIONS.length
  ];

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none rounded-full",
        SIZE_BLOBS[size],
        position,
        animate && animClass,
        className,
      )}
      style={{
        // Conic gradient → blurred → looks like a soft 3D ball.
        background: `conic-gradient(from 180deg at 50% 50%, hsl(var(--${variant})), transparent 60%)`,
        filter: `blur(80px)`,
        opacity,
        willChange: "transform",
      }}
    />
  );
};
