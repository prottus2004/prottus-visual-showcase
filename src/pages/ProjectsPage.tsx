import { Projects } from "@/components/Projects";
import { ContentPage } from "@/components/ContentPage"; // Import new layout

const ProjectsPage = () => {
  return (
    <ContentPage shape="torus"> {/* Pass in a shape */}
      <Projects />
    </ContentPage>
  );
};

export default ProjectsPage;
