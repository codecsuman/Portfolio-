import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";

const DURATION = 2200;

export default function IntroAnimation({ onFinish }) {
  const [visible, setVisible] = useState(true);

  /* ---------- PROGRESS (NO RE-RENDERS) ---------- */
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (p) => 276 * (1 - p));

  useEffect(() => {
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      progress.set(p);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 250);
      }
    };

    raf = requestAnimationFrame(tick);

    /* ---------- SOFT SKIP ---------- */
    const skip = () => setVisible(false);
    window.addEventListener("click", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-white dark:bg-black
          "
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ---------- AMBIENT GLOW ---------- */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                h-[360px] w-[360px]
                rounded-full
                bg-gradient-to-br from-indigo-500/25 to-cyan-400/20
                blur-[180px]
              "
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* ---------- CONTENT ---------- */}
          <motion.div
            className="relative flex flex-col items-center gap-10"
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* ---------- LOGO ---------- */}
            <motion.img
              src={Logo}
              alt="Logo"
              className="w-20 h-20 object-contain"
              initial={{ scale: 0.9, opacity: 0, filter: "blur(12px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* ---------- NAME ---------- */}
            <div className="flex overflow-hidden">
              {"Suman Jhanp".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="
                    text-3xl md:text-4xl
                    font-semibold tracking-tight
                    text-black dark:text-white
                  "
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.55 + i * 0.055,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* ---------- PROGRESS RING ---------- */}
            <svg className="w-14 h-14" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                stroke="url(#grad)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={276}
                style={{ strokeDashoffset: dashOffset }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* ---------- MICRO HAPTIC ---------- */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.008, 1] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
