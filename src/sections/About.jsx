import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import P from "../assets/P.jpg";

/* ---------- CONSTANT ---------- */
const NAV_OFFSET = 120;

export default function About() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  /* ---------- LISTEN FROM HOME (View Resume) ---------- */
  useEffect(() => {
    const openResume = () => setOpen(true);
    window.addEventListener("open-resume", openResume);
    return () => window.removeEventListener("open-resume", openResume);
  }, []);

  /* ---------- ESC TO CLOSE ---------- */
  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      {/* ================= ABOUT ================= */}
      <section
        id="about"
        style={{ scrollMarginTop: NAV_OFFSET }}
        className="
          relative min-h-screen
          pt-32 pb-32
          bg-[#020617]
          overflow-hidden
        "
      >
        <ParticlesBackground section="about" />

        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/25 blur-[220px]" />
          <div className="absolute top-1/3 right-[-20%] w-[600px] h-[600px] bg-sky-500/25 blur-[220px]" />
          <div className="absolute bottom-[-30%] left-1/3 w-[600px] h-[600px] bg-cyan-500/20 blur-[220px]" />
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            {/* LEFT */}
            <div>
              <img
                src={P}
                alt="Suman Jhanp – Full Stack Developer"
                className="
                  w-[260px] h-[260px]
                  rounded-3xl object-cover
                  border border-white/20
                  shadow-2xl mb-6
                "
              />

              <h2 className="text-4xl font-bold text-white">
                Suman Jhanp
              </h2>

              <h3 className="mt-2 text-lg font-semibold text-emerald-400">
                Full Stack Developer (MERN)
              </h3>

              <p className="mt-4 text-white/70 max-w-xl leading-relaxed">
                I build modern, scalable, and user-focused web applications
                using clean architecture, REST APIs, and performance-driven
                frontend systems.
              </p>

              {/* ATS-FRIENDLY SKILLS */}
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70">
                <li>✔ React, JavaScript, TypeScript</li>
                <li>✔ Node.js, Express.js</li>
                <li>✔ MongoDB, SQL</li>
                <li>✔ REST APIs & Auth</li>
                <li>✔ Git, GitHub</li>
                <li>✔ Performance & SEO</li>
              </ul>

              {/* CTA */}
              <div className="mt-8">
                <button
                  onClick={() => setOpen(true)}
                  className="
                    px-6 py-3 rounded-full
                    bg-gradient-to-r from-emerald-400 to-sky-400
                    text-black font-semibold
                    shadow-lg hover:scale-105
                    transition
                  "
                >
                  View Resume
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:block">
              <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Professional Summary
                </h4>
                <p className="text-white/70 leading-relaxed">
                  I focus on building reliable, maintainable full-stack
                  applications with strong UX, accessibility, and scalability.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ================= RESUME MODAL (PDF) ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="
              fixed inset-0 z-[9999]
              bg-black/80 backdrop-blur-sm
              flex items-center justify-center p-4
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className={`
                relative bg-black rounded-xl
                ${fullscreen ? "w-screen h-screen" : "w-full max-w-5xl h-[90vh]"}
                overflow-hidden
              `}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER (FIXED & ALWAYS VISIBLE) */}
              <div className="
                h-14 flex items-center justify-between
                px-4 border-b border-white/10
                bg-black sticky top-0 z-10
              ">
                <span className="text-white font-semibold">
                  Resume (PDF)
                </span>

                <div className="flex gap-2">
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-white text-black rounded font-semibold"
                  >
                    Open New Tab
                  </a>

                  <button
                    onClick={() => setFullscreen((f) => !f)}
                    className="px-3 py-1 bg-white/10 text-white rounded"
                  >
                    {fullscreen ? "Exit Full" : "Full"}
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="text-white text-xl px-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* PDF VIEWER — STARTS FROM TOP ALWAYS */}
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
