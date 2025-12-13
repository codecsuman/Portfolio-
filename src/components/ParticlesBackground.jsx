import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, DPR;

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

    const blobs = [];
    const stars = [];
    const particles = [];
    const P_COUNT = 70; // 🔥 slightly more

    /* ---------- BLOBS (FASTER) ---------- */
    for (let i = 0; i < 4; i++) {
      blobs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 220 + Math.random() * 200,
        dx: (Math.random() - 0.5) * 0.25, // 🔥 faster
        dy: (Math.random() - 0.5) * 0.25,
        color: `hsla(${Math.random() * 360},70%,60%,0.25)`
      });
    }

    /* ---------- STARS (FASTER FALL) ---------- */
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 3 + 1,
        r: Math.random() * 1.2 + 0.5
      });
    }

    /* ---------- PARTICLES (FASTER ORBIT) ---------- */
    for (let i = 0; i < P_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1.5,
        angle: Math.random() * Math.PI * 2,
        speed: 0.7 + Math.random() * 0.9, // 🔥 much faster
        hue: Math.random() * 360
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      /* BLOBS */
      ctx.filter = "blur(100px)";
      blobs.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        b.x += b.dx;
        b.y += b.dy;

        if (b.x - b.r > w) b.x = -b.r;
        if (b.x + b.r < 0) b.x = w + b.r;
        if (b.y - b.r > h) b.y = -b.r;
        if (b.y + b.r < 0) b.y = h + b.r;
      });
      ctx.filter = "none";

      /* STARS */
      stars.forEach(s => {
        ctx.fillStyle = `rgba(255,255,255,${0.3 + s.z * 0.2})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z * 0.7, 0, Math.PI * 2);
        ctx.fill();

        s.y += 0.15 * s.z; // 🔥 faster
        if (s.y > h) s.y = -10;
      });

      /* PARTICLES */
      particles.forEach(p => {
        p.hue += 0.9;        // 🔥 faster color cycle
        p.angle += 0.035;   // 🔥 faster spin

        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.shadowBlur = 22;
        ctx.shadowColor = `hsl(${p.hue},80%,60%)`;
        ctx.fillStyle = ctx.shadowColor;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      /* LINES (MORE RESPONSIVE) */
      for (let i = 0; i < P_COUNT; i++) {
        for (let j = i + 1; j < P_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 140) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 140) * 0.45})`;
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
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
