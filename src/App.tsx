import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react"; // Import useState and useEffect
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
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  // State to manage if we're checking for the visit, and if we should show the welcome screen
  const [isCheckingVisit, setIsCheckingVisit] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      // If user hasn't visited, show the welcome screen
      setShowWelcomeScreen(true);
    }
    // Finished checking
    setIsCheckingVisit(false);
  }, []); // Empty dependency array means this runs once on mount

  const handleWelcomeFinished = () => {
    // Set the flag in localStorage so it doesn't show again
    localStorage.setItem("hasVisited", "true");
    // Hide the welcome screen
    setShowWelcomeScreen(false);
  };

  // While checking, we can show a blank screen or a minimal loader
  if (isCheckingVisit) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* Conditional Rendering */}
        {showWelcomeScreen ? (
          <Welcome onFinished={handleWelcomeFinished} />
        ) : (
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
