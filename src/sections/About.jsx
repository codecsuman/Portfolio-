import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import P from "../assets/P.jpg";

/* ---------- CONSTANTS ---------- */
const NAV_OFFSET = 120;
const RESUME_EVENT = "open-resume";

/* ---------- LOW-END DEVICE CHECK ---------- */
function shouldDisableParticles() {
  if (typeof window === "undefined") return true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const smallScreen = window.innerWidth < 768;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;

  return prefersReducedMotion || (isTouch && (smallScreen || lowMemory));
}

export default function About() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(false);

  /* ---------- PARTICLES CONTROL ---------- */
  useEffect(() => {
    setParticlesEnabled(!shouldDisableParticles());
  }, []);

  /* ---------- OPEN FROM HOME ---------- */
  useEffect(() => {
    const openResume = () => setOpen(true);
    window.addEventListener(RESUME_EVENT, openResume);
    return () => window.removeEventListener(RESUME_EVENT, openResume);
  }, []);

  /* ---------- ESC TO CLOSE ---------- */
  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  /* ---------- HANDLERS ---------- */
  const closeModal = useCallback(() => {
    setOpen(false);
    setFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setFullscreen((f) => !f);
  }, []);

  /* ---------- SHARED BLUE BUTTON ---------- */
  const blueBtn = `
    w-full sm:w-auto
    px-6 py-3 rounded-full
    font-bold text-white text-sm uppercase tracking-wide
    bg-gradient-to-r from-blue-500 to-cyan-400
    hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40
    active:scale-95
    transition-all duration-300
  `;

  return (
    <>
      {/* ================= ABOUT SECTION ================= */}
      <section
        id="about"
        style={{ scrollMarginTop: NAV_OFFSET }}
        className="relative min-h-screen pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[#020617] overflow-hidden"
      >
        {/* PARTICLES (AUTO DISABLED ON LOW-END) */}
        {particlesEnabled && <ParticlesBackground section="about" />}

        {/* BACKGROUND GLOWS */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/25 blur-[200px]" />
          <div className="absolute top-1/3 right-[-20%] w-[500px] h-[500px] bg-cyan-500/25 blur-[200px]" />
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
          >
            {/* ---------- LEFT ---------- */}
            <div className="text-center lg:text-left">
              <img
                src={P}
                alt="Suman Jhanp – Full Stack Developer & Data Analyst"
                className="
                  mx-auto lg:mx-0
                  w-[220px] sm:w-[260px] h-[220px] sm:h-[260px]
                  rounded-3xl object-cover
                  border border-white/20
                  shadow-2xl mb-6
                "
              />

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Suman Jhanp
              </h2>

              <h3 className="mt-2 text-base sm:text-lg font-semibold text-cyan-400">
                Full Stack Developer & Data Analyst
              </h3>

              <p className="mt-4 text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                I build modern, scalable, and user-focused web applications using
                clean architecture, RESTful APIs, and performance-driven frontend
                systems. Alongside development, I analyze data to uncover insights
                and support data-driven decision-making.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70 max-w-xl mx-auto lg:mx-0">
                <li>✔ React, JavaScript, TypeScript</li>
                <li>✔ Node.js, Express.js</li>
                <li>✔ MongoDB, MySQL, SQL</li>
                <li>✔ REST APIs & JWT Authentication</li>
                <li>✔ Python, Pandas, NumPy</li>
                <li>✔ Data Cleaning & EDA</li>
                <li>✔ Power BI & Excel</li>
                <li>✔ Git, GitHub</li>
              </ul>

              {/* CTA */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <button onClick={() => setOpen(true)} className={blueBtn}>
                  View Resume
                </button>
              </div>
            </div>

            {/* ---------- RIGHT ---------- */}
            <div className="hidden lg:block">
              <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Professional Summary
                </h4>
                <p className="text-white/70 leading-relaxed">
                  I specialize in building reliable, maintainable full-stack
                  applications and extracting meaningful insights from data.
                  With a strong foundation in software engineering and data
                  analytics, I bridge the gap between application development
                  and data-driven solutions.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ================= RESUME MODAL ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm
              flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={`relative bg-black rounded-xl ${fullscreen
                ? "w-screen h-screen"
                : "w-full max-w-5xl h-[85vh] sm:h-[90vh]"
                } overflow-hidden`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="h-14 flex items-center justify-between px-3 sm:px-4
                border-b border-white/10 bg-black sticky top-0 z-10">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Resume (PDF)
                </span>

                <div className="flex gap-2">
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs font-bold rounded
                      bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                  >
                    New Tab
                  </a>

                  <button
                    onClick={toggleFullscreen}
                    className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    {fullscreen ? "Exit" : "Full"}
                  </button>

                  <button
                    onClick={closeModal}
                    className="text-white text-xl px-2"
                    aria-label="Close resume"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <iframe
                src="/Resume.pdf"
                title="Suman Jhanp Resume"
                className="w-full h-full bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
