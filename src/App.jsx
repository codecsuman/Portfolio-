import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import ResumePage from "./sections/ResumePage";
import Intro from "./components/IntroAnimation";
import { useStaticBackground } from "./utils/perf";

/* ── IntersectionObserver for scroll reveal animations ── */
function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger").forEach((el) => observer.observe(el));
  return observer;
}

/* ── Main Page Layout (Single-page scroll) ── */
function MainPage() {
  useEffect(() => {
    const observer = initRevealObserver();
    return () => observer.disconnect();
  }, []);

  // Weak hardware / reduced-motion users get a static background (no blur
  // layers, no floating orbs) to keep the page light and smooth.
  const staticBg = useStaticBackground();

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg)" }}>

      {/* ── Background orbs — CSS-only, no JS animation loop ── */}
      {!staticBg && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div style={{
            position: "absolute", top: "-10%", left: "-5%",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
            filter: "blur(80px)",
            animation: "float 10s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", top: "30%", right: "-10%",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)",
            filter: "blur(80px)",
            animation: "float 12s ease-in-out 2s infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "-5%", left: "30%",
            width: "450px", height: "450px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)",
            filter: "blur(80px)",
            animation: "float 14s ease-in-out 4s infinite",
          }} />
          {/* Subtle grid pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 100%)",
          }} />
        </div>
      )}

      <Intro />
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}