// ============================================================================
//  Testimonials — placeholder quotes for the home "Kind words" marquee.
//  No testimonials existed in the original portfolio data, so these are
//  placeholders. TODO: replace each with a real endorsement.
// ============================================================================

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    // TODO: replace with a real testimonial
    quote:
      "Prottus shipped a production-grade ML pipeline as a solo intern and still owned the architecture end to end. Rare combination of rigor and velocity.",
    name: " placeholder name",
    role: "placeholder · Engineering Manager",
  },
  {
    // TODO: replace with a real testimonial
    quote:
      "The agentic voice assistant he built was genuinely impressive — self-healing execution, multi-provider fallback, the works. He thinks in systems.",
    name: "placeholder name",
    role: "placeholder · AI Research Collaborator",
  },
  {
    // TODO: replace with a real testimonial
    quote:
      "Calm under pressure, writes clean code, and explains the hard parts clearly. Would gladly work with him again on anything AI-adjacent.",
    name: "placeholder name",
    role: "placeholder · Team Lead",
  },
  {
    // TODO: replace with a real testimonial
    quote:
      "From real-time vision fusion to ATS-friendly PDF tooling — the range is what stands out. He can go deep on a model and still ship the UI.",
    name: "placeholder name",
    role: "placeholder · Mentor",
  },
];