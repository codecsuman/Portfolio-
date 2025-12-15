import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import P from "../assets/P.jpg";
import resumeImg from "../assets/resume.png";

/* ---------- COUNTER ---------- */
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(value / 25));
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(current);
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

export default function About() {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  /* ESC CLOSE */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <section
        id="about"
        className="relative min-h-screen overflow-hidden"
      >
        {/* 🌌 Premium Background */}
        <ParticlesBackground section="about" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/25 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-sky-500/25 blur-[160px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* ---------- LEFT ---------- */}
            <div>
              {/* Profile image */}
              <motion.div
                className="
                  w-[260px] h-[260px] rounded-3xl overflow-hidden
                  border border-white/20
                  shadow-2xl mb-6
                "
                whileHover={{ scale: 1.04 }}
              >
                <img
                  src={P}
                  alt="Suman Jhanp"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <h2 className="text-4xl font-bold text-white">
                Suman Jhanp
              </h2>

              <p className="mt-2 text-lg text-emerald-300">
                Full Stack Developer
              </p>

              <p className="mt-4 text-white/70 max-w-xl">
                I build fast, scalable, and user-focused web applications with
                strong attention to performance, UX, and clean architecture.
              </p>

              {/* ---------- STATS ---------- */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Experience", value: 1, suffix: "+" },
                  { label: "Projects", value: 15, suffix: "+" },
                  { label: "Performance", value: 100, suffix: "%" },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ scale: 1.06 }}
                    className="
                      rounded-xl
                      border border-white/10
                      bg-white/5 backdrop-blur-xl
                      px-4 py-4 text-center
                      shadow-lg
                    "
                  >
                    <p className="text-3xl font-bold text-white">
                      <Counter value={s.value} />
                      {s.suffix}
                    </p>
                    <p className="text-sm text-white/60">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* ---------- CTA ---------- */}
              <div className="mt-10 flex gap-4">
                <a
                  href="#projects"
                  className="
                    px-6 py-3 rounded-full
                    bg-gradient-to-r from-emerald-400 to-sky-400
                    text-black font-semibold
                    shadow-lg shadow-emerald-400/40
                    hover:scale-105 transition
                  "
                >
                  View Projects
                </a>

                <a
                  href="#contact"
                  className="
                    px-6 py-3 rounded-full
                    border border-white/20
                    text-white
                    hover:bg-white/10 transition
                  "
                >
                  Get In Touch
                </a>
              </div>
            </div>

            {/* ---------- RESUME CARD ---------- */}
            <motion.div
              onClick={() => {
                setZoom(1);
                setOpen(true);
              }}
              whileHover={{ scale: 1.04 }}
              className="
                cursor-pointer max-w-[420px] mx-auto
                rounded-2xl
                border border-white/20
                bg-white/5 backdrop-blur-xl
                shadow-2xl p-4
              "
            >
              <img
                src={resumeImg}
                alt="Resume Preview"
                className="rounded-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------- MODAL ---------- */}
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
              className="
                relative bg-black
                rounded-xl w-full max-w-4xl
                max-h-[90vh] overflow-hidden
              "
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between px-4 py-3 border-b border-white/10">
                <span className="text-white font-semibold">
                  Resume Preview
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
                    className="px-3 py-1 bg-white/10 text-white rounded"
                  >
                    ＋
                  </button>
                  <button
                    onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
                    className="px-3 py-1 bg-white/10 text-white rounded"
                  >
                    －
                  </button>
                  <a
                    href="/Resume.pdf"
                    download
                    className="px-4 py-1 rounded bg-white text-black font-semibold"
                  >
                    PDF
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-white text-xl px-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="overflow-y-auto p-4">
                <motion.img
                  src={resumeImg}
                  alt="Resume Full View"
                  style={{ scale: zoom }}
                  className="w-full origin-top rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
