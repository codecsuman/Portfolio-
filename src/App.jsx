import { useState, useCallback, lazy, Suspense, useEffect, memo } from "react";

/* ---------- CORE ---------- */
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

/* ---------- SECTIONS ---------- */
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

/* ---------- LAZY ---------- */
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Testimonials = lazy(() => import("./sections/Testimonials"));

/* ---------- CONFIG (SCALE HERE) ---------- */
const CORE_SECTIONS = [Home, About, Skills];
const HEAVY_SECTIONS = [Projects, Experience, Testimonials];

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  /* ---------- THEME BOOTSTRAP ---------- */
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  /* ---------- PRELOAD HEAVY SECTIONS ---------- */
  useEffect(() => {
    if (!introDone) return;
    import("./sections/Projects");
    import("./sections/Experience");
    import("./sections/Testimonials");
  }, [introDone]);

  const handleIntroFinish = useCallback(() => {
    setIntroDone(true);
  }, []);

  /* ---------- INTRO GATE ---------- */
  if (!introDone) {
    return <IntroAnimation onFinish={handleIntroFinish} />;
  }

  return (
    <main
      className="relative min-h-screen overflow-x-hidden scroll-smooth"
      role="main"
    >
      <CustomCursor />

      <Navbar />

      {/* CORE (IMMEDIATE) */}
      {CORE_SECTIONS.map((Section, i) => (
        <Section key={i} />
      ))}

      {/* HEAVY (DEFERRED) */}
      <Suspense fallback={<SectionLoader />}>
        {HEAVY_SECTIONS.map((Section, i) => (
          <Section key={i} />
        ))}
      </Suspense>

      <Contact />
      <Footer />
    </main>
  );
}

/* ---------- FALLBACK ---------- */
const SectionLoader = memo(() => (
  <div
    className="py-32 text-center text-sm opacity-60"
    aria-live="polite"
  >
    Loading content…
  </div>
));
