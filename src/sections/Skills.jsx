import { useEffect, useRef, useState } from "react";

const icon = (id) => `https://skillicons.dev/icons?i=${id}`;

const SKILLS = [
  {
    title: "Languages",
    emoji: "⌨️",
    color: "#8b5cf6",
    items: [
      { name: "JavaScript", level: 90, logo: icon("js") },
      { name: "TypeScript", level: 78, logo: icon("ts") },
      { name: "Python",     level: 80, logo: icon("python") },
      { name: "Java",       level: 70, logo: icon("java") },
      { name: "C",          level: 60, logo: icon("c") },
    ],
  },
  {
    title: "Frontend",
    emoji: "🎨",
    color: "#06b6d4",
    items: [
      { name: "React",       level: 92, logo: icon("react") },
      { name: "Tailwind",    level: 88, logo: icon("tailwind") },
      { name: "HTML",        level: 95, logo: icon("html") },
      { name: "CSS",         level: 92, logo: icon("css") },
    ],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    color: "#f43f5e",
    items: [
      { name: "Node.js",  level: 85, logo: icon("nodejs") },
      { name: "Express",  level: 83, logo: icon("express") },
      { name: "REST API", level: 88, logo: icon("postman") },
      { name: "JWT",      level: 80, logo: icon("nodejs") },
    ],
  },
  {
    title: "Databases",
    emoji: "🗄️",
    color: "#f59e0b",
    items: [
      { name: "MongoDB", level: 85, logo: icon("mongodb") },
      { name: "MySQL",   level: 75, logo: icon("mysql") },
      { name: "SQL",     level: 78, logo: icon("sqlite") },
    ],
  },
  {
    title: "Cloud & DevOps",
    emoji: "☁️",
    color: "#10b981",
    items: [
      { name: "Docker", level: 70, logo: icon("docker") },
      { name: "AWS",    level: 65, logo: icon("aws") },
      { name: "Git",    level: 90, logo: icon("git") },
      { name: "GitHub", level: 90, logo: icon("github") },
      { name: "Vercel", level: 82, logo: icon("vercel") },
    ],
  },
  {
    title: "Data & Analytics",
    emoji: "📊",
    color: "#ec4899",
    items: [
      { name: "Pandas",   level: 80, logo: icon("python") },
      { name: "NumPy",    level: 75, logo: icon("python") },
      { name: "Power BI", level: 70, logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
      { name: "Excel",    level: 82, logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019–present%29.svg" },
      { name: "Jupyter",  level: 78, logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" },
    ],
  },
];

/* ── Animated progress bar ── */
function Bar({ level, color, animate }) {
  return (
    <div style={{
      flex: 1, height: "4px", borderRadius: "999px",
      background: "rgba(255,255,255,0.06)", overflow: "hidden",
    }}>
      <div style={{
        height: "100%", borderRadius: "999px",
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
        width: animate ? `${level}%` : "0%",
        transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 6px ${color}44`,
      }} />
    </div>
  );
}

/* ── Single skill row ── */
function SkillRow({ name, level, logo, color, animate, index }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      opacity: animate ? 1 : 0,
      transform: animate ? "translateX(0)" : "translateX(-10px)",
      transition: `opacity 0.4s ease ${index * 0.07}s, transform 0.4s ease ${index * 0.07}s`,
    }}>
      <img src={logo} alt={name}
        style={{ width: "22px", height: "22px", objectFit: "contain", flexShrink: 0, borderRadius: "4px" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)", minWidth: "68px", whiteSpace: "nowrap" }}>
        {name}
      </span>
      <Bar level={level} color={color} animate={animate} />
      <span style={{
        fontSize: "0.65rem", fontWeight: 700,
        color, minWidth: "30px", textAlign: "right",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${0.8 + index * 0.05}s`,
      }}>
        {level}%
      </span>
    </div>
  );
}

/* ── Skill card ── */
function SkillCard({ group, animate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "18px",
        padding: "22px",
        background: hovered ? "rgba(17,17,24,0.98)" : "rgba(17,17,24,0.7)",
        border: `1px solid ${hovered ? group.color + "40" : group.color + "15"}`,
        boxShadow: hovered
          ? `0 0 32px ${group.color}18, 0 12px 40px rgba(0,0,0,0.5)`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.28s ease",
        position: "relative", overflow: "hidden",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${group.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.3s",
      }} />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: "-30px", right: "-30px",
        width: "120px", height: "120px", borderRadius: "50%",
        background: `radial-gradient(circle, ${group.color}12, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s", pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{
          width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem",
          background: `${group.color}15`,
          border: `1px solid ${group.color}30`,
          boxShadow: hovered ? `0 0 12px ${group.color}28` : "none",
          transition: "box-shadow 0.3s",
        }}>
          {group.emoji}
        </div>
        <div>
          <h3 style={{
            margin: 0, fontWeight: 800, fontSize: "0.82rem",
            color: group.color, letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {group.title}
          </h3>
          <p style={{ margin: 0, fontSize: "0.65rem", color: "var(--text-secondary)", marginTop: "1px" }}>
            {group.items.length} technologies
          </p>
        </div>
      </div>

      {/* Skill rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {group.items.map((item, i) => (
          <SkillRow key={i} index={i} name={item.name} level={item.level} logo={item.logo} color={group.color} animate={animate} />
        ))}
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
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
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(139,92,246,0.07), transparent 70%)",
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-40px", right: "10%",
          width: "360px", height: "360px",
          background: "radial-gradient(circle, rgba(236,72,153,0.06), transparent 70%)",
          filter: "blur(50px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="section-title reveal">Skills</h2>
        <p className="section-subtitle reveal" style={{ transitionDelay: "0.1s" }}>
          Technologies I work with — including cloud & DevOps
        </p>

        <div className="skills-grid reveal-stagger"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}
        >
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