import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react"; // Import useState
import { Welcome } from "@/components/Welcome"; // Import the Welcome component

// Import Pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// This component remains the same as before
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  // State to manage showing the welcome screen.
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  // This function will be passed to the Welcome component to call when it's done
  const handleWelcomeFinished = () => {
    setShowWelcomeScreen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* AnimatePresence will handle the exit animation of the Welcome screen */}
        <AnimatePresence>
          {showWelcomeScreen && <Welcome onFinished={handleWelcomeFinished} />}
        </AnimatePresence>
        
        {/* We render the main app simultaneously.
          The Welcome screen will overlay it using a fixed position.
          When the Welcome screen animates out, the main app is revealed.
        */}
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
