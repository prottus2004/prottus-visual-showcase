import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative">
      <Background3D />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="py-8 text-center text-foreground/60 border-t border-accent/20">
        <p>© 2025 Prottus Manna. Crafted with passion and precision.</p>
      </footer>
    </div>
  );
};

export default Index;
