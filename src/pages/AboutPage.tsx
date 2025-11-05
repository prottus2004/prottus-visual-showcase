import { About } from "@/components/About";
import { ContentPage } from "@/components/ContentPage"; // Import new layout

const AboutPage = () => {
  return (
    <ContentPage shape="sphere"> {/* Pass in a shape */}
      <About />
    </ContentPage>
  );
};

export default AboutPage;
