import { useEffect, useRef } from "react";

/* ---------- CONFIG ---------- */
const DEFAULT_CONFIG = Object.freeze({
  enabledSections: ["home"],
  performance: "auto", // low | medium | high | auto
  debug: false,
  mouseEase: 0.04,
  nebulaRefresh: 24, // px threshold
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
  const isDark = useRef(false);

  /* FPS debug */
  const fpsTime = useRef(0);
  const fpsCount = useRef(0);
  const fpsValue = useRef(0);

  /* Cached nebula */
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

    isDark.current =
      document.documentElement.classList.contains("dark");

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
        alpha: 0.18 + Math.random() * 0.22,
        hue: 190 + Math.random() * 100,
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
      nebulaGrad.current = null;
    };

    resize();
    addEventListener("resize", resize);

    /* ---------- INPUT ---------- */
    const onMove = (e) => {
      mouse.current.tx = Math.min(Math.max(e.clientX / w, 0), 1);
      mouse.current.ty = Math.min(Math.max(e.clientY / h, 0), 1);
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

    /* ---------- DRAW ---------- */
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
      mouse.current.x +=
        (mouse.current.tx - mouse.current.x) * config.mouseEase;
      mouse.current.y +=
        (mouse.current.ty - mouse.current.y) * config.mouseEase;

      const mx = (mouse.current.x - 0.5) * 12;
      const my = (mouse.current.y - 0.5) * 10;
      const fade = scrollFade.current;

      /* ---------- NEBULA ---------- */
      const gx = Math.round(mouse.current.x * w);
      const gy = Math.round(mouse.current.y * h);

      if (
        !nebulaGrad.current ||
        Math.abs(gx - lastGradPos.current.x) > config.nebulaRefresh ||
        Math.abs(gy - lastGradPos.current.y) > config.nebulaRefresh
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
          isDark.current
            ? "rgba(60,120,180,0.07)"
            : "rgba(120,190,230,0.05)"
        );
        nebulaGrad.current.addColorStop(1, "transparent");
        lastGradPos.current = { x: gx, y: gy };
      }

      ctx.fillStyle = nebulaGrad.current;
      ctx.fillRect(0, 0, w, h);

      /* ---------- PARTICLES & LINKS ---------- */
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
        ctx.fillStyle = `hsla(${p.hue}, ${isDark.current ? 75 : 55
          }%, ${isDark.current ? 70 : 45}%, ${p.alpha * fade})`;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();

        let linked = 0;
        for (let j = i + 1; j < particles.length && linked < PERF.links; j++) {
          const q = particles[j];
          const qx = q.x * w + mx * q.depth;
          const qy = q.y * h + my * q.depth;

          const dx = px - qx;
          const dy = py - qy;

          if (dx * dx + dy * dy < 14400) {
            ctx.strokeStyle = `rgba(150,200,255,${0.03 * fade})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(qx, qy);
            ctx.stroke();
            linked++;
          }
        }
      }

      /* ---------- FPS HUD ---------- */
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
