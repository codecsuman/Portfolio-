import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Intro from "./components/IntroAnimation";

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

export default function App() {
  useEffect(() => {
    const observer = initRevealObserver();
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg)" }}>

      {/* ── Background orbs — CSS-only, no JS animation loop ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
          filter: "blur(80px)",
          animation: "float 10s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)",
          filter: "blur(80px)",
          animation: "float 12s ease-in-out 2s infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-5%", left: "30%",
          width: "450px", height: "450px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,63,94,0.08), transparent 70%)",
          filter: "blur(80px)",
          animation: "float 14s ease-in-out 4s infinite",
        }} />
        {/* Subtle grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(139,92,246,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 100%)",
        }} />
      </div>

      <Intro />        {/* ← ADD THIS LINE */}
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}