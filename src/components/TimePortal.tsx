import { DecorativeBlob } from "@/components/DecorativeBlob";

/**
 * Site-wide decorative background — replaces the old R3F 3D wormhole with
 * pure CSS blurred gradient blobs (the Cohesion "colorful 3D" look without
 * the WebGL cost). Sits at -z-10, behind all content and behind the grain
 * overlay (which is at z-[1] and visually multiplies into the blobs).
 */
export const TimePortal = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-card"
    >
      <DecorativeBlob
        variant="coral"
        size="xl"
        position="absolute -right-40 top-1/4"
        opacity={0.45}
      />
      <DecorativeBlob
        variant="purple"
        size="lg"
        position="absolute -left-40 -top-20"
        opacity={0.4}
      />
      <DecorativeBlob
        variant="blue"
        size="lg"
        position="absolute -right-32 bottom-0"
        opacity={0.35}
      />
      <DecorativeBlob
        variant="yellow"
        size="md"
        position="absolute left-1/3 top-2/3"
        opacity={0.3}
      />
    </div>
  );
};
