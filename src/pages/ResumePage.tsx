import { Resume } from "@/components/Resume";
import { PageWrapper } from "@/components/PageWrapper";

/**
 * The Chronicle — full resume, rebuilt in the Cohesion template language.
 *
 * Unlike the other era routes, this page intentionally bypasses <EraPage> /
 * <EraSection> so it can open with the Cohesion-style hero (availability badge
 * + huge name + skill pills + CTAs) instead of the shared "Resume" H1 header —
 * matching the single-page template's flow. The Chronometer + Navigation still
 * resolve the active era from the route independently, so the HUD stays in sync.
 */
const ResumePage = () => (
  <PageWrapper>
    <Resume />
  </PageWrapper>
);

export default ResumePage;