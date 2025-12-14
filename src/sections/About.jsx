import { useRef, useEffect, useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
  useInView,
} from "framer-motion";
import P from "../assets/P.jpg";
import resumeImg from "../assets/resume.png";

/* ---------------- COUNTER ---------------- */
const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 180, damping: 22 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
};

/* ---------------- MAGNETIC BUTTON ---------------- */
const MagneticButton = ({ href, children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 320, damping: 22 });
  const sy = useSpring(y, { stiffness: 320, damping: 22 });

  const move = useCallback(
    (e) => {
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
    },
    [x, y]
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.06 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

/* ---------------- ABOUT ---------------- */
export default function About() {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  /* ESC CLOSE */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="relative min-h-screen bg-neutral-950 overflow-hidden"
      >
        {/* BACKGROUND BLOBS */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-40 -left-40 w-[600px] h-[600px]
              bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
              opacity-20 blur-[200px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[600px] h-[600px]
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600
              opacity-20 blur-[200px]"
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{ y, opacity }}
          >
            {/* LEFT */}
            <div>
              <motion.div
                className="w-[260px] h-[260px] rounded-3xl overflow-hidden
                  border border-white/20 shadow-2xl mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <img src={P} alt="Suman Jhanp" className="w-full h-full object-cover" />
              </motion.div>

              <h2 className="text-5xl font-extrabold text-white">
                Suman Jhanp
              </h2>

              <p className="mt-2 text-lg font-semibold text-gray-300">
                Full Stack Developer
              </p>

              <p className="mt-4 text-gray-400 max-w-xl">
                I build fast, scalable, and visually polished web applications
                with a strong focus on performance and user experience.
              </p>

              {/* STATS */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Experience", value: 1, suffix: "+" },
                  { label: "Projects", value: 15, suffix: "+" },
                  { label: "Performance", value: 100, suffix: "%" },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl border border-white/10
                      bg-white/5 backdrop-blur-md px-4 py-4 text-center"
                  >
                    <p className="text-3xl font-bold text-white">
                      <Counter value={s.value} />
                      {s.suffix}
                    </p>
                    <p className="text-sm text-gray-400">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex gap-4">
                <MagneticButton
                  href="#projects"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold"
                >
                  View Projects
                </MagneticButton>

                <MagneticButton
                  href="#contact"
                  className="px-6 py-3 rounded-xl border border-white/20 text-white"
                >
                  Get In Touch
                </MagneticButton>
              </div>
            </div>

            {/* RESUME CARD */}
            <motion.div
              onClick={() => {
                setZoom(1);
                setOpen(true);
              }}
              className="cursor-pointer max-w-[420px] mx-auto
                rounded-2xl border border-white/20
                bg-white/5 backdrop-blur-xl shadow-2xl p-4"
              whileHover={{ scale: 1.04 }}
            >
              <img src={resumeImg} alt="Resume Preview" className="rounded-xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80
              backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative bg-black rounded-2xl w-full max-w-4xl
                max-h-[90vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="sticky top-0 z-10 flex justify-between
                px-4 py-3 bg-black border-b border-white/10">
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
                  <button
                    onClick={() => setZoom(1)}
                    className="px-3 py-1 bg-white/10 text-white rounded"
                  >
                    Reset
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
              <div className="overflow-y-auto max-h-[calc(90vh-60px)] p-4">
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
