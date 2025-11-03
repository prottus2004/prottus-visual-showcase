import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background3D />
      <Navigation />
      <main className="pt-20">
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;
