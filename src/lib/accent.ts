/**
 * Accent helper — maps a 0-360 hue number to one of the 7 named accent
 * tokens in the Cohesion-style palette. Used by Skills, Projects, and
 * Certifications to keep per-card color variety flowing from one shared
 * palette without forcing a data-layer rewrite.
 *
 * The 7 buckets are spaced 360/7 ≈ 51.4° apart around the wheel, with the
 * boundaries aligned to a sensible aesthetic split (coral/pink → warm side;
 * yellow/green/orange → mid; blue/purple → cool).
 */

export type AccentName = "coral" | "pink" | "purple" | "blue" | "yellow" | "green" | "orange";

export interface AccentClasses {
  name: AccentName;
  /** Solid color — backgrounds, icons, dots, stripes. */
  bg: string;
  /** 14% wash — tinted panel/icon-tile backgrounds. */
  soft: string;
  /** 700 shade — readable accent text on white. */
  text: string;
  /** 200 shade — light borders that still feel colored. */
  border: string;
  /** Solid color for the CSS variable (used by DecorativeBlob). */
  colorVar: string;
}

const ORDER: AccentName[] = [
  "coral",
  "pink",
  "purple",
  "blue",
  "yellow",
  "green",
  "orange",
];

/** Bucket hue (0-360) into one of the 7 named accents. */
export function getAccentColor(hue: number): AccentClasses {
  const normalized = ((hue % 360) + 360) % 360;
  const bucket = Math.floor((normalized / 360) * ORDER.length) % ORDER.length;
  const name = ORDER[bucket];
  return {
    name,
    bg: `bg-${name}-500`,
    soft: `bg-${name}-100`,
    text: `text-${name}-700`,
    border: `border-${name}-200`,
    colorVar: `var(--${name})`,
  };
}

/** Indexed variant — pass a 0-based index (e.g. loop counter) to spread
 *  the 7 accents across cards without needing a hue. */
export function getAccentByIndex(index: number): AccentClasses {
  return getAccentColor((index * 51) % 360);
}
