import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Skills } from "@/components/Skills";

const SkillsPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background3D />
      <Navigation />
      <main className="pt-20">
        <Skills />
      </main>
    </div>
  );
};

export default SkillsPage;
