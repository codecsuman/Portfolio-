import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";

import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden ocean-bg">

      {/* Animated gradient orbs in background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />

      {/* Footer */}
      <Footer />

    </main>
  );
}