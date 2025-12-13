import React, { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import P from "../assets/P.jpg";

/* ---------------- COUNTER ---------------- */
const Counter = React.memo(({ value }) => {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 220, damping: 18 }); // 🔥 faster
  const rounded = useTransform(spring, v => Math.round(v));

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  return <motion.span>{rounded}</motion.span>;
});

/* ---------------- MAGNETIC BUTTON (FASTER) ---------------- */
const MagneticButton = ({ href, children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 🔥 very snappy springs
  const sx = useSpring(x, { stiffness: 400, damping: 20 });
  const sy = useSpring(y, { stiffness: 400, damping: 20 });

  const move = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.35); // 🔥 stronger pull
    y.set(dy * 0.35);
  }, [x, y]);

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.08 }} // 🔥 instant feedback
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className={className}
      aria-label={children}
    >
      {children}
    </motion.a>
  );
};

/* ---------------- ABOUT SECTION ---------------- */
export default function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 🔥 faster scroll reveal
  const y = useTransform(scrollYProgress, [0, 0.25], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[360px] h-[360px] bg-[#1cd8d2] opacity-25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-[#302b63] opacity-25 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Top */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12"
          style={{ y, opacity }}
        >
          {/* Avatar */}
          <motion.div
            className="w-[180px] h-[180px] rounded-2xl overflow-hidden border border-white/20 shadow-xl"
            whileHover={{ scale: 1.08, rotateZ: 1 }} // 🔥 snappy
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
          >
            <img
              src={P}
              alt="Suman profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Intro */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#302b63] via-[#1cd8d2] to-[#1cd8d2]">
              Suman Jhanp
            </h2>

            <p className="mt-2 text-lg font-semibold text-white/90">
              Full Stack Developer
            </p>

            <p className="mt-4 text-gray-300 max-w-3xl">
              I build fast, scalable, and visually polished web applications
              focused on performance and user experience.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Experience", value: 1, suffix: "+" },
                { label: "Projects", value: 15, suffix: "+" },
                { label: "Performance Focus", value: 100, suffix: "%" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06 }} // 🔥 fast hover
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-center"
                >
                  <p className="text-3xl font-bold">
                    <Counter value={s.value} />
                    {s.suffix}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
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
        </motion.div>

        {/* About Me */}
        <motion.div
          className="mt-24 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }} // 🔥 faster
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">About Me</h3>
          <p className="text-gray-300 mb-4">
            Passionate Full Stack Developer focused on clean architecture,
            scalability, and modern UI.
          </p>
          <p className="text-gray-400">
            I care deeply about performance, accessibility, and intuitive
            interactions while continuously learning new technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
