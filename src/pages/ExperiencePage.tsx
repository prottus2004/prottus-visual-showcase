import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Experience } from "@/components/Experience";

const ExperiencePage = () => {
  return (
    <div className="relative min-h-screen">
      <Background3D />
      <Navigation />
      <main className="pt-20">
        <Experience />
      </main>
    </div>
  );
};

export default ExperiencePage;
