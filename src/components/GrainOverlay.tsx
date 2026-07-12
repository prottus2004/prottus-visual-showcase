/**
 * Subtle film-grain overlay for the light theme. Mounted once in the
 * AppShell (sibling of route content). Provides a Cohesion-style organic
 * texture over the otherwise-flat white background.
 *
 * Implementation: an inline SVG <feTurbulence> data URI, rendered at
 * ~4% opacity with mix-blend-multiply so it darkens the underlying white
 * without affecting colored elements (those live at full opacity above it).
 */
const NOISE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>`;

const DATA_URI = `url("data:image/svg+xml;utf8,${NOISE_SVG.replace(/#/g, "%23")}")`;

export const GrainOverlay = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04] mix-blend-multiply"
      style={{
        backgroundImage: DATA_URI,
        backgroundSize: "240px 240px",
      }}
    />
  );
};
