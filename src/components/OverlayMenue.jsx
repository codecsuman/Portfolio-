import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect, useRef, useState, useCallback } from "react";

/* ---------- CONFIG ---------- */
const PARTICLE_COUNT = 60;
const DPR_CAP = 2;

export default function OverlayMenu({ isOpen, onClose }) {
  const rippleRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const audioRef = useRef(null);

  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  /* ---------- THEME WATCH ---------- */
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  /* ---------- BODY SCROLL LOCK ---------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  /* ---------- CLICK SOUND ---------- */
  useEffect(() => {
    audioRef.current = new Audio("/click.mp3");
    audioRef.current.volume = 0.45;
  }, []);

  const playClick = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  /* ---------- RIPPLE ---------- */
  const showRipple = useCallback((e) => {
    const r = rippleRef.current;
    if (!r) return;

    r.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0.1)`;
    r.style.opacity = "0.35";
    r.style.transition = "none";

    requestAnimationFrame(() => {
      r.style.transition = "transform .4s ease-out, opacity .4s ease-out";
      r.style.transform += " scale(3)";
      r.style.opacity = "0";
    });
  }, []);

  /* ---------- PARTICLES ---------- */
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = 0,
      h = 0,
      dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 0.9,
      dy: (Math.random() - 0.5) * 0.9,
      r: Math.random() * 2 + 1,
      h: Math.random() * 360,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        p.h += 1;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.shadowBlur = 14;
        ctx.shadowColor = `hsl(${p.h},80%,${isDark ? 60 : 40}%)`;
        ctx.fillStyle = ctx.shadowColor;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isOpen, isDark]);

  /* ---------- ANIMATIONS ---------- */
  const gradient = {
    background: isDark
      ? [
          "linear-gradient(135deg,#ff0080,#7928CA,#2AFADF)",
          "linear-gradient(135deg,#00c6ff,#0072ff,#00ffaa)",
        ]
      : [
          "linear-gradient(135deg,#fdfbfb,#ebedee,#d7e1ec)",
          "linear-gradient(135deg,#e0eafc,#cfdef3,#f5f7fa)",
        ],
    transition: { duration: 8, repeat: Infinity, ease: "linear" },
  };

  const navItems = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Testimonials",
    "Contact",
  ];

  /* ---------- RENDER ---------- */
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Animated gradient */}
          <motion.div
            className="absolute inset-0 -z-10 opacity-80"
            animate={gradient}
          />

          {/* Particles */}
          <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

          {/* Ripple */}
          <span
            ref={rippleRef}
            className={`fixed w-40 h-40 rounded-full pointer-events-none -z-10
              ${isDark ? "bg-white/30" : "bg-black/20"}`}
          />

          {/* Menu */}
          <ul className="space-y-10 text-center z-10">
            {navItems.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }}
                whileHover={{ scale: 1.15 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-5xl md:text-6xl font-bold
                    ${isDark ? "text-white" : "text-black"} hover:text-pink-400`}
                  onClick={(e) => {
                    playClick();
                    showRipple(e);
                    onClose();
                  }}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Close */}
          <motion.button
            onClick={(e) => {
              playClick();
              showRipple(e);
              onClose();
            }}
            className={`absolute top-6 right-6 text-4xl
              ${isDark ? "text-white" : "text-black"}`}
            whileHover={{ rotate: 90, scale: 1.2 }}
          >
            <FiX />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
