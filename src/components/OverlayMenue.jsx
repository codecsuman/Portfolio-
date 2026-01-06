import { useEffect, useRef } from "react";

/* ---------- CONFIG ---------- */
const DEFAULT_CONFIG = Object.freeze({
  enabledSections: ["home"],
  performance: "auto", // low | medium | high | auto
  debug: false,
});

export default function ParticlesBackground({
  section = "home",
  config = DEFAULT_CONFIG,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const lastTime = useRef(0);
  const scrollFade = useRef(1);
  const visible = useRef(true);

  /* FPS debug */
  const fpsTime = useRef(0);
  const fpsCount = useRef(0);
  const fpsValue = useRef(0);

  /* Cached gradient */
  const nebulaGrad = useRef(null);
  const lastGradPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!config.enabledSections.includes(section)) return;

    /* ---------- HARD GUARDS ---------- */
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const lowCPU = navigator.hardwareConcurrency <= 4;
    const mobile = matchMedia("(max-width: 768px)").matches;

    if (reduced || lowMem || lowCPU || mobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0,
      h = 0;

    const DPR = Math.min(devicePixelRatio || 1, 1.5);

    /* ---------- PERFORMANCE PRESETS ---------- */
    const PERF =
      config.performance === "high"
        ? { fps: 45, count: 120, links: 80 }
        : config.performance === "medium"
          ? { fps: 30, count: 90, links: 60 }
          : config.performance === "low"
            ? { fps: 18, count: 50, links: 35 }
            : { fps: 24, count: 70, links: 50 };

    const FRAME = 1000 / PERF.fps;

    /* ---------- PARTICLES ---------- */
    const layers = [0.35, 0.7, 1];
    const perLayer = Math.floor(PERF.count / layers.length);

    const particles = layers.flatMap((depth) =>
      Array.from({ length: perLayer }, () => ({
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
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      nebulaGrad.current = null; // invalidate
    };

    resize();
    addEventListener("resize", resize);

    /* ---------- INPUT ---------- */
    const onMove = (e) => {
      mouse.current.tx = e.clientX / w;
      mouse.current.ty = e.clientY / h;
    };

    const onScroll = () => {
      scrollFade.current = Math.max(0, 1 - scrollY / innerHeight);
    };

    const onVisibility = () => {
      visible.current = !document.hidden;
      lastTime.current = performance.now();
    };

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    /* ---------- DRAW LOOP ---------- */
    const draw = (t) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visible.current) return;

      if (t - lastTime.current < FRAME) return;
      lastTime.current = t;

      ctx.clearRect(0, 0, w, h);

      /* FPS */
      if (config.debug) {
        fpsCount.current++;
        if (t - fpsTime.current > 1000) {
          fpsValue.current = fpsCount.current;
          fpsCount.current = 0;
          fpsTime.current = t;
        }
      }

      /* Mouse inertia */
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;

      const mx = (mouse.current.x - 0.5) * 12;
      const my = (mouse.current.y - 0.5) * 10;
      const fade = scrollFade.current;
      const dark = document.documentElement.classList.contains("dark");

      /* ---------- NEBULA (CACHED) ---------- */
      const gx = Math.round(mouse.current.x * w);
      const gy = Math.round(mouse.current.y * h);

      if (
        !nebulaGrad.current ||
        Math.abs(gx - lastGradPos.current.x) > 20 ||
        Math.abs(gy - lastGradPos.current.y) > 20
      ) {
        nebulaGrad.current = ctx.createRadialGradient(
          gx,
          gy,
          0,
          gx,
          gy,
          Math.max(w, h)
        );
        nebulaGrad.current.addColorStop(
          0,
          dark ? "rgba(50,100,150,0.06)" : "rgba(120,180,220,0.04)"
        );
        nebulaGrad.current.addColorStop(1, "transparent");
        lastGradPos.current = { x: gx, y: gy };
      }

      ctx.fillStyle = nebulaGrad.current;
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

        /* ---------- LIMITED CONNECTIONS ---------- */
        let linked = 0;
        for (let j = i + 1; j < particles.length && linked < PERF.links; j++) {
          const q = particles[j];
          const dx = px - q.x * w;
          const dy = py - q.y * h;
          if (dx * dx + dy * dy < 14400) {
            ctx.strokeStyle = `rgba(150,200,255,${0.04 * fade})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(q.x * w, q.y * h);
            ctx.stroke();
            linked++;
          }
        }
      }

      /* ---------- FPS OVERLAY ---------- */
      if (config.debug) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(10, 10, 90, 30);
        ctx.fillStyle = "#00ffcc";
        ctx.font = "12px monospace";
        ctx.fillText(`FPS: ${fpsValue.current}`, 18, 30);
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [section, config.performance, config.debug]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
