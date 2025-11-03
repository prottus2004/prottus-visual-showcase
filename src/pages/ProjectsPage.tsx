import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Projects";

const ProjectsPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background3D />
      <Navigation />
      <main className="pt-20">
        <Projects />
      </main>
    </div>
  );
};

export default ProjectsPage;
