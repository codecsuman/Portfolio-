import { useState, useCallback, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

/* Lazy sections (performance boost) */
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Testimonials = lazy(() => import("./sections/Testimonials"));

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroFinish = useCallback(() => {
    setIntroDone(true);
  }, []);

  /* INTRO */
  if (!introDone) {
    return <IntroAnimation onFinish={handleIntroFinish} />;
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      
      {/* Desktop-only cursor (safe & smooth) */}
      <CustomCursor />

      {/* NAV */}
      <Navbar />

      {/* CORE SECTIONS */}
      <Home />
      <About />
      <Skills />

      {/* HEAVY SECTIONS */}
      <Suspense
        fallback={
          <div className="py-32 text-center text-white/60">
            Loading content…
          </div>
        }
      >
        <Projects />
        <Experience />
        <Testimonials />
      </Suspense>

      {/* CONTACT + FOOTER */}
      <Contact />
      <Footer />
    </main>
  );
}
