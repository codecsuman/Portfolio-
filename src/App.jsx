import { useState, useEffect, Suspense, lazy } from "react";

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

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  /* ---------- THEME INIT ---------- */
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  /* ---------- INTRO ---------- */
  if (!introDone) {
    return <IntroAnimation onFinish={() => setIntroDone(true)} />;
  }

  return (
    <main
      role="main"
      className="
        relative min-h-screen
        overflow-x-hidden overflow-y-visible
        bg-[var(--bg)]
        text-[var(--text)]
        antialiased
      "
    >
      {/* ---------- GLOBAL BACKGROUND GLOW (SAFE) ---------- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-[160px]" />
        <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[160px]" />
      </div>

      {/* Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar />

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-10">
        <Home />
        <About />
        <Skills />

        <Suspense fallback={<SectionLoader />}>
          <Projects />
          <Experience />
          <Testimonials />
        </Suspense>

        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

/* ---------- LOADER ---------- */
function SectionLoader() {
  return (
    <div className="flex justify-center py-24">
      <div
        className="
          px-8 py-4
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          text-sm text-white/60
        "
      >
        Loading…
      </div>
    </div>
  );
}
