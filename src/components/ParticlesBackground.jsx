import { useEffect, useRef } from "react";

/* ==============================
   CONFIG (HOME ONLY)
================================ */
const CONFIG = Object.freeze({
  section: "home",
  fps: { high: 60, medium: 40, low: 24 },
  particles: { high: 120, medium: 80, low: 50 },
  mouseEase: 0.08,
});

export default function ParticlesBackground({ section = "home" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const mouse = useRef({
    x: 0.5,
    y: 0.5,
    tx: 0.5,
    ty: 0.5,
  });

  const lastTime = useRef(0);
  const visible = useRef(true);
  const isDark = useRef(false);

  useEffect(() => {
    if (section !== CONFIG.section) return;

    /* ===== Guards ===== */
    const prefersReduced = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = matchMedia("(max-width: 768px)").matches;
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const lowCPU = navigator.hardwareConcurrency <= 4;

    if (prefersReduced || isMobile) return;

    const quality = lowMemory || lowCPU ? "low" : "medium";

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = 0;
    let height = 0;

    const FPS = CONFIG.fps[quality];
    const PARTICLE_COUNT = CONFIG.particles[quality];
    const FRAME_TIME = 1000 / FPS;

    isDark.current =
      document.documentElement.classList.contains("dark");

    /* ===== Particles ===== */
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2.8,
      vx: (-0.5 + Math.random()) * 0.02,
      vy: 0.02 + Math.random() * 0.06,
      depth: 0.4 + Math.random() * 0.6,
      alpha: 0.25 + Math.random() * 0.35,
    }));

    /* ===== Resize ===== */
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    /* ===== Mouse ===== */
    const onMove = (e) => {
      mouse.current.tx = Math.min(Math.max(e.clientX / width, 0), 1);
      mouse.current.ty = Math.min(Math.max(e.clientY / height, 0), 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    /* ===== Visibility ===== */
    const onVisibility = () => {
      visible.current = !document.hidden;
      lastTime.current = performance.now();
    };

    document.addEventListener("visibilitychange", onVisibility);

    /* ===== Draw ===== */
    const draw = (time) => {
      rafRef.current = requestAnimationFrame(draw);

      if (!visible.current) return;
      if (time - lastTime.current < FRAME_TIME) return;

      lastTime.current = time;
      ctx.clearRect(0, 0, width, height);

      // Mouse easing
      mouse.current.x +=
        (mouse.current.tx - mouse.current.x) * CONFIG.mouseEase;
      mouse.current.y +=
        (mouse.current.ty - mouse.current.y) * CONFIG.mouseEase;

      for (const p of particles) {
        p.x += p.vx * p.depth;
        p.y += p.vy * p.depth;

        if (p.y > 1.2) {
          p.y = -0.2;
          p.x = Math.random();
        }
        if (p.x > 1.2) p.x = -0.2;
        if (p.x < -0.2) p.x = 1.2;

        const cx =
          p.x * width +
          (mouse.current.x - 0.5) * 18 * p.depth;
        const cy =
          p.y * height +
          (mouse.current.y - 0.5) * 14 * p.depth;

        const glow = ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          p.r * 4.5
        );

        glow.addColorStop(
          0,
          isDark.current
            ? `rgba(56,189,248,${p.alpha})`
            : `rgba(99,102,241,${p.alpha})`
        );
        glow.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, p.r * 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [section]);

  if (section !== "home") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="particles-canvas"
    />
  );
}
