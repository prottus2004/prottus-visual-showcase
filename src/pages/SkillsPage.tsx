import { Skills } from "@/components/Skills";
import { ContentPage } from "@/components/ContentPage"; // Import new layout

const SkillsPage = () => {
  return (
    <ContentPage shape="box"> {/* Pass in a shape */}
      <Skills />
    </ContentPage>
  );
};

export default SkillsPage;
