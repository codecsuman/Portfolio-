import { useState, useEffect, Suspense, lazy, useCallback } from "react";

/* ---------- CORE ---------- */
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

/* ---------- SECTIONS (EAGER) ---------- */
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

/* ---------- SECTIONS (LAZY / HEAVY) ---------- */
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Testimonials = lazy(() => import("./sections/Testimonials"));

/* ---------- SECTION LOADER ---------- */
const SectionLoader = () => (
  <div
    className="flex justify-center py-28"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-white/60">
      Loading section…
    </div>
  </div>
);

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [theme, setTheme] = useState("dark");

  /* ---------- LOAD THEME (ONCE) ---------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  /* ---------- APPLY THEME ---------- */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ---------- STABLE HANDLERS ---------- */
  const handleIntroFinish = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <main
      role="main"
      className="
        relative min-h-screen
        overflow-x-hidden
        bg-[var(--bg)]
        text-[var(--text)]
        antialiased
        transition-colors duration-300
      "
    >
      {/* ---------- INTRO OVERLAY ---------- */}
      {!introDone && (
        <IntroAnimation onFinish={handleIntroFinish} />
      )}

      {/* ---------- GLOBAL BACKGROUND ---------- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-[160px]" />
        <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[160px]" />
      </div>

      {/* ---------- CUSTOM CURSOR ---------- */}
      <CustomCursor />

      {/* ---------- NAVBAR ---------- */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* ---------- PAGE CONTENT ---------- */}
      <div className="relative z-10">
        {/* Critical / Above the fold */}
        <Home />
        <About />
        <Skills />

        {/* Heavy sections load AFTER intro */}
        {introDone && (
          <Suspense fallback={<SectionLoader />}>
            <Projects />
            <Experience />
            <Testimonials />
          </Suspense>
        )}

        <Contact />
      </div>

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </main>
  );
}
