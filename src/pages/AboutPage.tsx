import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background3D />
      <Navigation />
      <main className="pt-20">
        <About />
      </main>
    </div>
  );
};

export default AboutPage;
