import { useEffect, useRef } from "react";

/* ---------- CONFIG ---------- */
const DEFAULT_CONFIG = {
  enabledSections: ["home"],
  performance: "auto", // auto | low | medium | high
  debug: false,        // FPS overlay
};

export default function ParticlesBackground({
  section = "home",
  config = DEFAULT_CONFIG,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const lastTime = useRef(0);
  const fpsTime = useRef(0);
  const fpsCount = useRef(0);
  const fpsValue = useRef(0);
  const scrollFade = useRef(1);
  const visible = useRef(true);

  useEffect(() => {
    if (!config.enabledSections.includes(section)) return;

    /* ---------- HARD PERFORMANCE GUARDS ---------- */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const lowCPU = navigator.hardwareConcurrency <= 4;
    if (reduced || lowMem || lowCPU) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let w = 0,
      h = 0;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    /* ---------- PERFORMANCE PRESETS ---------- */
    const PERF =
      config.performance === "high"
        ? { fps: 45, count: 140, links: 120 }
        : config.performance === "medium"
          ? { fps: 30, count: 90, links: 80 }
          : config.performance === "low"
            ? { fps: 18, count: 50, links: 40 }
            : { fps: 24, count: 70, links: 60 };

    const FRAME = 1000 / PERF.fps;

    /* ---------- PARALLAX DEPTH LAYERS ---------- */
    const layers = [0.3, 0.6, 1];

    const particles = layers.flatMap((depth) =>
      Array.from({ length: PERF.count / layers.length }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 1 + Math.random() * 2,
        vx: (-0.5 + Math.random()) * 0.003,
        vy: 0.004 + Math.random() * 0.01,
        depth,
        alpha: 0.15 + Math.random() * 0.25,
        hue: 180 + Math.random() * 120,
      }))
    );

    /* ---------- RESIZE ---------- */
    const resize = () => {
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

    /* ---------- INPUT ---------- */
    const onMove = (e) => {
      mouse.current.tx = e.clientX / w;
      mouse.current.ty = e.clientY / h;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onScroll = () => {
      scrollFade.current = Math.max(0, 1 - window.scrollY / window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVisibility = () => {
      visible.current = !document.hidden;
      lastTime.current = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---------- DRAW LOOP ---------- */
    const draw = (t) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visible.current) return;

      const delta = t - lastTime.current;
      if (delta < FRAME) return;
      lastTime.current = t;

      ctx.clearRect(0, 0, w, h);

      /* FPS DEBUG */
      if (config.debug) {
        fpsCount.current++;
        if (t - fpsTime.current > 1000) {
          fpsValue.current = fpsCount.current;
          fpsCount.current = 0;
          fpsTime.current = t;
        }
      }

      /* Mouse inertia */
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.035;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.035;

      const mx = (mouse.current.x - 0.5) * 12;
      const my = (mouse.current.y - 0.5) * 10;
      const fade = scrollFade.current;
      const dark = document.documentElement.classList.contains("dark");

      /* ---------- NEBULA BACKGROUND ---------- */
      const grad = ctx.createRadialGradient(
        w * mouse.current.x,
        h * mouse.current.y,
        0,
        w * mouse.current.x,
        h * mouse.current.y,
        Math.max(w, h)
      );
      grad.addColorStop(0, dark ? "rgba(50,100,150,0.06)" : "rgba(120,180,220,0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      /* ---------- PARTICLES ---------- */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx * p.depth;
        p.y += p.vy * p.depth;

        if (p.y > 1.2) {
          p.y = -0.2;
          p.x = Math.random();
        }

        const px = p.x * w + mx * p.depth;
        const py = p.y * h + my * p.depth;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, ${dark ? 75 : 55
          }%, ${dark ? 70 : 45}%, ${p.alpha * fade})`;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();

        /* ---------- CONNECTION LINES ---------- */
        for (let j = i + 1; j < particles.length && j < i + PERF.links; j++) {
          const q = particles[j];
          const dx = px - (q.x * w);
          const dy = py - (q.y * h);
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(150,200,255,${0.04 * fade})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(q.x * w, q.y * h);
            ctx.stroke();
          }
        }
      }

      /* ---------- FPS OVERLAY ---------- */
      if (config.debug) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(10, 10, 90, 30);
        ctx.fillStyle = "#00ffcc";
        ctx.font = "12px monospace";
        ctx.fillText(`FPS: ${fpsValue.current}`, 20, 30);
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [section, config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
