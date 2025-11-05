import { Experience } from "@/components/Experience";
import { ContentPage } from "@/components/ContentPage"; // Import new layout

const ExperiencePage = () => {
  return (
    <ContentPage shape="dodecahedron"> {/* Pass in a shape */}
      <Experience />
    </ContentPage>
  );
};

export default ExperiencePage;
