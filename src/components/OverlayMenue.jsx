import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect, useRef } from "react";

export default function OverlayMenu({ isOpen, onClose }) {
  const rippleRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const audioRef = useRef(null);

  /* Disable scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  /* Click sound */
  useEffect(() => {
    audioRef.current = new Audio("/click.mp3");
    audioRef.current.volume = 0.45;
  }, []);

  const playClick = () => audioRef.current?.play();

  /* 🔥 FAST RIPPLE */
  const showRipple = (e) => {
    const r = rippleRef.current;
    if (!r) return;
    r.style.left = `${e.clientX}px`;
    r.style.top = `${e.clientY}px`;
    r.style.transition = "none";
    r.style.opacity = "0.35";
    r.style.transform = "translate(-50%, -50%) scale(0.1)";
    requestAnimationFrame(() => {
      r.style.transition = "transform .35s ease-out, opacity .35s ease-out";
      r.style.transform = "translate(-50%, -50%) scale(3)";
      r.style.opacity = "0";
    });
  };

  /* ⚡ FAST PARTICLES */
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, DPR;
    const particles = [];

    const resize = () => {
      DPR = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        dx: (Math.random() - 0.5) * 1.2, // 🔥 faster
        dy: (Math.random() - 0.5) * 1.2,
        r: Math.random() * 2 + 1,
        hue: Math.random() * 360,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.hue += 1.2;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.shadowBlur = 16;
        ctx.shadowColor = `hsla(${p.hue},80%,60%,1)`;
        ctx.fillStyle = `hsla(${p.hue},80%,60%,0.85)`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isOpen]);

  /* Faster animations */
  const gradientAnimation = {
    background: [
      "linear-gradient(135deg,#ff0080,#7928CA,#2AFADF)",
      "linear-gradient(135deg,#00c6ff,#0072ff,#00ffaa)",
      "linear-gradient(135deg,#ff7eb3,#ff758c,#ffce00)",
    ],
    transition: { duration: 8, repeat: Infinity, ease: "linear" }, // 🔥 faster
  };

  const shockwave = {
    initial: { scale: 0, opacity: 0.3 },
    animate: {
      scale: 14,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeOut" }, // 🔥 faster
    },
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Shockwave */}
          <motion.div
            className="pointer-events-none fixed inset-0 rounded-full bg-white/30 blur-3xl z-[60]"
            variants={shockwave}
            initial="initial"
            animate="animate"
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[50] backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Gradient */}
            <motion.div
              className="absolute inset-0 -z-10 opacity-70"
              animate={gradientAnimation}
            />

            {/* Particles */}
            <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

            {/* Ripple */}
            <span
              ref={rippleRef}
              className="fixed w-40 h-40 rounded-full bg-white/30 pointer-events-none -z-10"
            />

            {/* Menu */}
            <ul className="space-y-10 text-center z-20">
              {navItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { delay: i * 0.06 }, // 🔥 faster
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateX: 14,
                    rotateY: -14,
                    transition: { duration: 0.15 }, // 🔥 instant
                  }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-5xl md:text-6xl font-bold text-white hover:text-pink-400"
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
              className="absolute top-6 right-6 text-white text-4xl z-[55]"
              whileHover={{ rotate: 90, scale: 1.2 }}
              transition={{ duration: 0.15 }} // 🔥 faster
            >
              <FiX />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
