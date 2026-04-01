import { useEffect, useRef, useState } from "react";

const SKILLS = [
  {
    title: "Languages", icon: "⌨️", color: "#38bdf8",
    items: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 78 },
      { name: "Python", level: 80 },
      { name: "Java", level: 70 },
      { name: "C", level: 60 },
    ],
  },
  {
    title: "Frontend", icon: "🎨", color: "#34d399",
    items: [
      { name: "React", level: 92 },
      { name: "Tailwind", level: 88 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Backend", icon: "⚙️", color: "#06b6d4",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 83 },
      { name: "REST APIs", level: 88 },
      { name: "JWT", level: 80 },
    ],
  },
  {
    title: "Databases", icon: "🗄️", color: "#2dd4bf",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 75 },
      { name: "SQL", level: 78 },
    ],
  },
  {
    title: "Data Analytics", icon: "📊", color: "#a78bfa",
    items: [
      { name: "Pandas", level: 80 },
      { name: "NumPy", level: 75 },
      { name: "Power BI", level: 70 },
      { name: "Excel", level: 82 },
    ],
  },
  {
    title: "Tools", icon: "🛠️", color: "#f472b6",
    items: [
      { name: "Git/GitHub", level: 90 },
      { name: "Postman", level: 82 },
      { name: "Vercel", level: 80 },
    ],
  },
];

/* ── animated progress bar ── */
function ProgressBar({ level, color, animate }) {
  return (
    <div style={{
      height: "5px", borderRadius: "999px",
      background: "rgba(255,255,255,0.07)",
      overflow: "hidden", flexShrink: 0, width: "80px",
    }}>
      <div style={{
        height: "100%", borderRadius: "999px",
        background: `linear-gradient(90deg, ${color}, ${color}99)`,
        width: animate ? `${level}%` : "0%",
        transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 6px ${color}66`,
      }} />
    </div>
  );
}

/* ── single skill card ── */
function SkillCard({ group, animate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "18px",
        padding: "22px",
        background: hovered
          ? `linear-gradient(135deg, rgba(13,33,55,0.95), rgba(13,40,65,0.95))`
          : "rgba(13,33,55,0.8)",
        border: `1px solid ${hovered ? group.color + "44" : group.color + "1a"}`,
        boxShadow: hovered
          ? `0 0 28px ${group.color}22, 0 12px 40px rgba(0,0,0,0.5)`
          : "0 4px 24px rgba(0,0,0,0.35)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.28s ease",
        position: "relative", overflow: "hidden",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${group.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.3s",
      }} />

      {/* corner glow */}
      <div style={{
        position: "absolute", top: "-30px", right: "-30px",
        width: "120px", height: "120px", borderRadius: "50%",
        background: `radial-gradient(circle, ${group.color}12, transparent 70%)`,
        pointerEvents: "none",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "12px", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem",
          background: `${group.color}15`,
          border: `1px solid ${group.color}30`,
          boxShadow: hovered ? `0 0 12px ${group.color}33` : "none",
          transition: "box-shadow 0.3s",
        }}>
          {group.icon}
        </div>
        <div>
          <h3 style={{
            margin: 0, fontWeight: 800, fontSize: "0.85rem",
            color: group.color, letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {group.title}
          </h3>
          <p style={{ margin: 0, fontSize: "0.68rem", color: "#7ecfcf", marginTop: "1px" }}>
            {group.items.length} technologies
          </p>
        </div>
      </div>

      {/* Skill rows with progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {group.items.map(({ name, level }, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* dot */}
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
              background: group.color,
              boxShadow: `0 0 5px ${group.color}88`,
            }} />
            {/* name */}
            <span style={{
              flex: 1, fontSize: "0.8rem", fontWeight: 500,
              color: hovered ? "#e0f2fe" : "#94a3b8",
              transition: "color 0.25s",
            }}>
              {name}
            </span>
            {/* progress bar */}
            <ProgressBar level={level} color={group.color} animate={animate} />
            {/* percent */}
            <span style={{
              fontSize: "0.65rem", fontWeight: 700,
              color: group.color, minWidth: "28px", textAlign: "right",
              opacity: animate ? 1 : 0,
              transition: "opacity 0.5s 0.8s",
            }}>
              {level}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── main section ── */
export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  /* trigger bar animation when section scrolls into view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section" ref={ref} style={{ position: "relative" }}>

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-60px", left: "20%",
          width: "420px", height: "420px",
          background: "radial-gradient(circle, rgba(14,165,233,0.07), transparent 70%)",
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-40px", right: "10%",
          width: "360px", height: "360px",
          background: "radial-gradient(circle, rgba(16,185,129,0.07), transparent 70%)",
          filter: "blur(50px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="section-title">Skills</h2>
        <p style={{ color: "#7ecfcf", fontSize: "0.88rem", marginTop: "-1.2rem", marginBottom: "2.8rem" }}>
          Technologies I work with daily
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }} className="skills-grid">
          {SKILLS.map((group, i) => (
            <SkillCard key={i} group={group} animate={animate} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}