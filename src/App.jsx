import {
  useState,
  useEffect,
  Suspense,
  lazy,
  useCallback,
  memo,
} from "react";

/* ==============================
   CORE COMPONENTS
================================ */
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

/* ==============================
   SECTIONS (EAGER)
================================ */
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

/* ==============================
   SECTIONS (LAZY / HEAVY)
================================ */
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Testimonials = lazy(() => import("./sections/Testimonials"));

/* ==============================
   FALLBACK LOADER
================================ */
const SectionLoader = memo(function SectionLoader() {
  return (
    <div
      className="flex justify-center py-20 px-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-sm text-center px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-white/60">
        Loading section…
      </div>
    </div>
  );
});

/* ==============================
   UTILS
================================ */
const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

/* ==============================
   APP
================================ */
export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [mobile, setMobile] = useState(false);

  /* ---------- DETECT MOBILE ---------- */
  useEffect(() => {
    setMobile(isMobile());
  }, []);

  /* ---------- LOAD THEME ---------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  /* ---------- APPLY THEME ---------- */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ---------- LOCK SCROLL DURING INTRO ---------- */
  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [introDone]);

  /* ---------- STABLE HANDLER ---------- */
  const handleIntroFinish = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <main
      role="main"
      className="
        relative min-h-screen overflow-x-hidden
        bg-[var(--bg)] text-[var(--text)]
        antialiased transition-colors duration-300
      "
    >
      {/* ==============================
           INTRO OVERLAY
      ============================== */}
      {!introDone && (
        <IntroAnimation
          onFinish={handleIntroFinish}
          skipOnMobile={mobile}
        />
      )}

      {/* ==============================
           GLOBAL BACKGROUND
      ============================== */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[300px] w-[300px] rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 h-[300px] w-[300px] rounded-full bg-cyan-500/15 blur-[140px]" />
      </div>

      {/* ==============================
           CUSTOM CURSOR (DESKTOP ONLY)
      ============================== */}
      {!mobile && <CustomCursor />}

      {/* ==============================
           NAVBAR
      ============================== */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* ==============================
           PAGE CONTENT
      ============================== */}
      <div className="relative z-10">
        {/* Above the fold */}
        <Home />
        <About />
        <Skills />

        {/* Heavy sections */}
        {introDone && (
          <Suspense fallback={<SectionLoader />}>
            <Projects />
            <Experience />
            <Testimonials />
          </Suspense>
        )}

        <Contact />
      </div>

      {/* ==============================
           FOOTER
      ============================== */}
      <Footer />
    </main>
  );
}
