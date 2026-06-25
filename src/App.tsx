import { useState, useCallback } from "react";
import { useLenis } from "./hooks/useLenis";
import CinematicLoader from "./components/CinematicLoader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scroll
  useLenis();

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loader */}
      {isLoading && <CinematicLoader onComplete={handleLoaderComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar />

      {/* Main Content - always in DOM for crawlers */}
      <main style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
