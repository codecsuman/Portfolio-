import { useEffect, useRef } from "react";

const CONFIG = {
  BLOBS: 4,
  STARS: 140,
  PARTICLES: 60,
  LINE_DIST: 140,
};

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let w = 0,
      h = 0,
      dpr = 1;

    let isDark = document.documentElement.classList.contains("dark");

    /* ---------- RESIZE ---------- */
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    /* ---------- THEME OBSERVER ---------- */
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /* ---------- DATA ---------- */
    const blobs = Array.from({ length: CONFIG.BLOBS }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 200 + Math.random() * 200,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      hue: Math.random() * 360,
    }));

    const stars = Array.from({ length: CONFIG.STARS }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 3 + 1,
      r: Math.random() * 1.2 + 0.5,
    }));

    const particles = Array.from({ length: CONFIG.PARTICLES }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1.5,
      a: Math.random() * Math.PI * 2,
      s: 0.6 + Math.random(),
      h: Math.random() * 360,
    }));

    /* ---------- LOOP ---------- */
    const animate = () => {
      ctx.fillStyle = isDark ? "#020617" : "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      /* BLOBS */
      ctx.filter = "blur(90px)";
      for (const b of blobs) {
        ctx.fillStyle = `hsla(${b.hue},70%,${isDark ? 60 : 45}%,0.22)`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        b.x += b.dx;
        b.y += b.dy;
      }
      ctx.filter = "none";

      /* STARS */
      for (const s of stars) {
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${0.25 + s.z * 0.15})`
          : `rgba(0,0,0,${0.12 + s.z * 0.08})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z * 0.6, 0, Math.PI * 2);
        ctx.fill();

        s.y += 0.12 * s.z;
        if (s.y > h) s.y = -10;
      }

      /* PARTICLES */
      for (const p of particles) {
        p.h += 0.8;
        p.a += 0.03;
        p.x += Math.cos(p.a) * p.s;
        p.y += Math.sin(p.a) * p.s;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsl(${p.h},80%,${isDark ? 60 : 40}%)`;
        ctx.fillStyle = ctx.shadowColor;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      /* CONNECTION LINES */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);

          if (d < CONFIG.LINE_DIST) {
            ctx.strokeStyle = isDark
              ? `rgba(255,255,255,${(1 - d / CONFIG.LINE_DIST) * 0.35})`
              : `rgba(0,0,0,${(1 - d / CONFIG.LINE_DIST) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
