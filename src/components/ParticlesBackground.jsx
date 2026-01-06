import { useEffect, useRef } from "react";

/* ---------- CONFIG ---------- */
const DEFAULT_CONFIG = Object.freeze({
  enabledSections: ["home"],
  performance: "auto", // auto | low | medium | high
});

export default function ParticlesBackground({
  section = "home",
  config = DEFAULT_CONFIG,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const mouse = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });
  const lastMouse = useRef({ x: 0.5, y: 0.5 });
  const lastTime = useRef(0);
  const scrollFade = useRef(1);
  const visible = useRef(true);

  useEffect(() => {
    if (!config.enabledSections.includes(section)) return;
    if (section !== "home") return;

    /* ---------- HARD PERFORMANCE GUARDS ---------- */
    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const lowCPU = navigator.hardwareConcurrency <= 4;
    const mobile = matchMedia("(max-width: 768px)").matches;

    if (prefersReduced || mobile) return;

    const ultraLow = lowMemory || lowCPU;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0;
    let h = 0;

    const DPR = ultraLow ? 1 : Math.min(devicePixelRatio || 1, 1.5);

    /* ---------- PERFORMANCE PRESETS ---------- */
    const PERF =
      ultraLow
        ? { fps: 12, particles: 30 }
        : config.performance === "high"
          ? { fps: 60, particles: 140 }
          : config.performance === "medium"
            ? { fps: 36, particles: 90 }
            : { fps: 24, particles: 60 };

    const FRAME_TIME = 1000 / PERF.fps;

    /* ---------- PARTICLES (IMMUTABLE) ---------- */
    const particles = Object.freeze(
      Array.from({ length: PERF.particles }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 1.5 + Math.random() * 2.5,
        vy: 0.02 + Math.random() * 0.05,
        vx: (-0.5 + Math.random()) * 0.01,
        depth: 0.3 + Math.random() * 0.7,
        hue: Math.floor(180 + Math.random() * 120),
        alpha: 0.25 + Math.random() * 0.4,
      }))
    );

    /* ---------- RESIZE ---------- */
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    addEventListener("resize", resize);

    /* ---------- MOUSE (ACTIVE ONLY WHEN VISIBLE) ---------- */
    const onMove = (e) => {
      const nx = e.clientX / w;
      const ny = e.clientY / h;

      mouse.current.vx = nx - lastMouse.current.x;
      mouse.current.vy = ny - lastMouse.current.y;

      mouse.current.x = nx;
      mouse.current.y = ny;
      lastMouse.current = { x: nx, y: ny };
    };

    /* ---------- SCROLL FADE ---------- */
    const onScroll = () => {
      const max = innerHeight * 0.9;
      scrollFade.current = Math.max(0, 1 - scrollY / max);
    };

    /* ---------- VISIBILITY ---------- */
    const onVisibility = () => {
      visible.current = !document.hidden;
      lastTime.current = performance.now();
    };

    document.addEventListener("visibilitychange", onVisibility);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("mousemove", onMove, { passive: true });

    /* ---------- DRAW LOOP ---------- */
    const draw = (time) => {
      if (!visible.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      if (time - lastTime.current < FRAME_TIME) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      lastTime.current = time;
      ctx.clearRect(0, 0, w, h);

      const fade = scrollFade.current;
      const isDark = document.documentElement.classList.contains("dark");

      const speed =
        Math.min(1, Math.abs(mouse.current.vx) + Math.abs(mouse.current.vy)) * 18;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.vy * p.depth;
        p.x += p.vx * p.depth;

        if (p.y > 1.2) {
          p.y = -0.2;
          p.x = Math.random();
        }

        const mx = (mouse.current.x - 0.5) * (8 + speed) * p.depth;
        const my = (mouse.current.y - 0.5) * (6 + speed) * p.depth;

        ctx.beginPath();
        ctx.fillStyle = `hsla(
          ${p.hue},
          ${isDark ? 80 : 60}%,
          ${isDark ? 70 : 40}%,
          ${p.alpha * fade}
        )`;

        ctx.arc(p.x * w + mx, p.y * h + my, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [section, config.performance]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
