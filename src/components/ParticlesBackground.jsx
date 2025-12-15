import { useEffect, useRef } from "react";

/* ---------- CONFIG ---------- */
const DEFAULT_CONFIG = {
  enabledSections: ["home"], // HOME ONLY
  performance: "low", // elegance > density
};

export default function ParticlesBackground({
  section = "home",
  config = DEFAULT_CONFIG,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const lastTime = useRef(0);

  useEffect(() => {
    /* ---------- ENABLE CHECK ---------- */
    if (section !== "home") return;
    if (!config.enabledSections.includes("home")) return;

    /* ---------- MOBILE DISABLE ---------- */
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let w = 0,
      h = 0;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    /* ---------- PERFORMANCE (VERY SLOW) ---------- */
    const FPS = 18; // slower than before
    const SNOW_COUNT = 28; // more, but still safe
    const STAR_COUNT = 12;

    /* ---------- PARTICLES ---------- */
    const snow = Array.from({ length: SNOW_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 2.4 + Math.random() * 2.8, // BIGGER
      vy: 0.012 + Math.random() * 0.02, // VERY SLOW
      depth: 0.3 + Math.random() * 0.7,
    }));

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vy: 0.025 + Math.random() * 0.035, // SLOW
      a: 0.25 + Math.random() * 0.35,
      glow: 2 + Math.random() * 3,
    }));

    let shootingStar = null;
    let nextShoot = performance.now() + 26000 + Math.random() * 12000;

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

    /* ---------- MOUSE (VERY SUBTLE) ---------- */
    const onMove = (e) => {
      mouse.current.x = e.clientX / w;
      mouse.current.y = e.clientY / h;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    /* ---------- DRAW ---------- */
    const draw = (t) => {
      if (t - lastTime.current < 1000 / FPS) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime.current = t;

      const isDark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, w, h);

      const snowColor = isDark
        ? "rgba(180,220,255,0.16)"
        : "rgba(120,150,190,0.12)";

      /* ---------- SNOW (FLOATING ORBS) ---------- */
      snow.forEach((p) => {
        p.y += p.vy * p.depth;
        if (p.y > 1.15) {
          p.y = -0.15;
          p.x = Math.random();
        }

        const mx = (mouse.current.x - 0.5) * 10 * p.depth;
        const my = (mouse.current.y - 0.5) * 6 * p.depth;

        ctx.beginPath();
        ctx.fillStyle = snowColor;
        ctx.arc(
          p.x * w + mx,
          p.y * h + my,
          p.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      /* ---------- STARS (GLOWING) ---------- */
      stars.forEach((s) => {
        s.y += s.vy;
        if (s.y > 1.15) {
          s.y = -0.15;
          s.x = Math.random();
        }

        ctx.save();
        ctx.shadowBlur = s.glow;
        ctx.shadowColor = isDark
          ? "rgba(255,255,255,0.6)"
          : "rgba(0,0,0,0.4)";

        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${s.a})`
          : `rgba(0,0,0,${s.a * 0.4})`;

        ctx.fillRect(s.x * w, s.y * h, 1.6, 3.6);
        ctx.restore();
      });

      /* ---------- SHOOTING STAR (RARE & SLOW) ---------- */
      if (!shootingStar && t > nextShoot) {
        shootingStar = {
          x: Math.random() * w * 0.7,
          y: -40,
          vx: 4.5,
          vy: 3,
          life: 0,
        };
        nextShoot = t + 26000 + Math.random() * 12000;
      }

      if (shootingStar) {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life++;

        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - 70, shootingStar.y - 40);
        ctx.stroke();

        if (shootingStar.life > 38) shootingStar = null;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [section, config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
