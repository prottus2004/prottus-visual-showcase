import { PageWrapper } from "@/components/PageWrapper";
import { Hero } from "@/components/Hero";

/**
 * The Present — a single, self-contained summary of Prottus Manna.
 *
 * Intentionally trimmed down: this route is the "you have arrived" beat of the
 * chronicle, so it holds only the Hero (name, role, portrait, CTAs) and stops.
 * Everything else (about, work, skills, testimonials, footer) lives on its
 * own route or is removed from this surface entirely.
 */
const Index = () => {
  return (
    <PageWrapper>
      <Hero />
    </PageWrapper>
  );
};

export default Index;
