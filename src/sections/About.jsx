import { useState, useEffect } from "react";
import P from "../assets/P.jpg";
import { FaTimes, FaDownload } from "react-icons/fa";

const SKILL_ITEMS = [
  "React & JavaScript",
  "Node.js & Express",
  "MongoDB & SQL",
  "REST APIs",
  "Python & Pandas",
  "Power BI",
];

const STATS = [
  { value: "10+", label: "Projects Built" },
  { value: "2+", label: "Years Coding" },
  { value: "5+", label: "Tech Stacks" },
];

/* ── Resume Modal ── */
function ResumeModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,15,0.94)",
        backdropFilter: "blur(16px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", padding: "16px",
        animation: "revealScale 0.25s ease forwards",
      }}
    >
      {/* Toolbar */}
      <div style={{
        width: "100%", maxWidth: "920px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "12px", padding: "10px 16px",
        borderRadius: "14px",
        background: "rgba(17,17,24,0.95)",
        border: "1px solid rgba(139,92,246,0.15)",
        backdropFilter: "blur(8px)",
        flexWrap: "wrap", gap: "8px",
      }}>
        <span className="gradient-text" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
          📄 Suman Jhanp — Resume
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a href="/Resume.pdf" download
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "7px 16px", borderRadius: "9px",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              color: "white", fontWeight: 700, fontSize: "0.8rem",
              textDecoration: "none",
              boxShadow: "0 2px 14px rgba(139,92,246,0.4)",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <FaDownload size={12} /> Download
          </a>
          <button onClick={onClose}
            style={{
              width: "34px", height: "34px", borderRadius: "9px", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              background: "rgba(244,63,94,0.12)", color: "var(--rose-light)",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(244,63,94,0.28)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(244,63,94,0.12)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* PDF iframe */}
      <div style={{
        width: "100%", maxWidth: "920px", flex: 1,
        borderRadius: "16px", overflow: "hidden",
        border: "1px solid rgba(139,92,246,0.15)",
        boxShadow: "0 0 48px rgba(139,92,246,0.1), 0 24px 64px rgba(0,0,0,0.6)",
      }}>
        <iframe
          src="/Resume.pdf"
          title="Suman Jhanp Resume"
          style={{
            width: "100%",
            height: "calc(100vh - 130px)",
            minHeight: "500px",
            border: "none", display: "block", borderRadius: "16px",
          }}
        />
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "0.7rem", marginTop: "8px" }}>
        Press <kbd style={{
          padding: "1px 6px", borderRadius: "4px",
          background: "var(--bg-card)", color: "var(--text-secondary)",
          border: "1px solid rgba(139,92,246,0.2)", fontSize: "0.68rem",
        }}>Esc</kbd> or click outside to close
      </p>
    </div>
  );
}

/* ── About Section ── */
export default function About() {
  const [showResume, setShowResume] = useState(false);

  return (
    <section id="about" className="section">
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      <h2 className="section-title reveal">About Me</h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT — image + stats */}
        <div className="flex flex-col items-center gap-6 reveal-left">
          <div className="relative">
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r",
            ].map((cls, i) => (
              <div key={i} className={`absolute w-5 h-5 ${cls}`}
                style={{ borderColor: "var(--violet)", borderWidth: "2px" }} />
            ))}
            <img src={P} alt="Suman Jhanp" className="rounded-xl object-cover"
              style={{
                width: "220px", height: "220px",
                border: "1px solid rgba(139,92,246,0.2)",
                boxShadow: "0 0 32px rgba(139,92,246,0.15), 0 0 64px rgba(6,182,212,0.08)",
                margin: "8px",
              }}
            />
          </div>

          {/* Stats */}
          <div className="flex gap-4 w-full justify-center reveal-stagger">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center px-4 py-3 rounded-xl flex-1"
                style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.12)" }}>
                <div className="text-xl font-black gradient-text">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — content */}
        <div className="reveal-right">
          <p className="mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            I am a <span style={{ color: "var(--violet-light)", fontWeight: 600 }}>Full Stack Developer</span> and{" "}
            <span style={{ color: "var(--cyan-light)", fontWeight: 600 }}>Data Analyst</span> focused on building
            clean, scalable web applications and extracting meaningful insights from data.
          </p>

          <p className="mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            I work with modern technologies like React, Node.js, and MongoDB,
            along with data tools such as Python, Pandas, and Power BI.
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2 mb-7 reveal-stagger">
            {SKILL_ITEMS.map((skill, i) => (
              <span key={i} className={`badge ${i % 3 === 1 ? "badge-cyan" : i % 3 === 2 ? "badge-rose" : ""}`}>
                {skill}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowResume(true)} className="btn">
              View Resume ↗
            </button>
            <a href="/Resume.pdf" download className="btn-outline">
              Download PDF ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}