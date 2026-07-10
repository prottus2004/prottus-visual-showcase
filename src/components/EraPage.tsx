import { EraSection } from "@/components/EraSection";
import { PageWrapper } from "@/components/PageWrapper";
import { useEra } from "@/hooks/useEra";

/** A standard era page: derives the active era from the route and wraps content
 *  in the shared EraSection (HUD header + 3D motif + narration). */
export const EraPage = ({
  children,
  motif = true,
  id,
}: {
  children: React.ReactNode;
  motif?: boolean;
  id?: string;
}) => {
  const era = useEra();
  return (
    <PageWrapper>
      <EraSection era={era} motif={motif} id={id}>
        {children}
      </EraSection>
    </PageWrapper>
  );
};