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

/* ── Resume Modal ─────────────────────────────────────────────────────────── */
function ResumeModal({ onClose }) {

  /* close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(2,12,27,0.93)",
        backdropFilter: "blur(14px)",
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        animation: "modalIn 0.25s ease forwards",
      }}
    >

      {/* ── Toolbar ── */}
      <div style={{
        width: "100%", maxWidth: "920px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
        padding: "10px 16px",
        borderRadius: "14px",
        background: "rgba(13,33,55,0.95)",
        border: "1px solid rgba(14,165,233,0.2)",
        backdropFilter: "blur(8px)",
        flexWrap: "wrap", gap: "8px",
      }}>

        {/* Title */}
        <span style={{
          fontWeight: 700, fontSize: "0.9rem",
          background: "linear-gradient(90deg, #38bdf8, #34d399)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          📄 Suman Jhanp — Resume
        </span>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

          {/* Download */}
          <a
            href="/Resume.pdf"
            download
            title="Download PDF"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "7px 16px", borderRadius: "9px",
              background: "linear-gradient(135deg, #0ea5e9, #10b981)",
              color: "white", fontWeight: 700, fontSize: "0.8rem",
              textDecoration: "none",
              boxShadow: "0 2px 14px rgba(14,165,233,0.4)",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <FaDownload size={12} /> Download
          </a>

          {/* Close */}
          <button
            onClick={onClose}
            title="Close"
            style={{
              width: "34px", height: "34px",
              borderRadius: "9px", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              background: "rgba(248,113,113,0.12)",
              color: "#f87171",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.28)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(248,113,113,0.12)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* ── PDF iframe — browser handles zoom/scroll natively ── */}
      <div style={{
        width: "100%", maxWidth: "920px",
        flex: 1,
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(14,165,233,0.18)",
        boxShadow: "0 0 48px rgba(14,165,233,0.12), 0 24px 64px rgba(0,0,0,0.6)",
      }}>
        <iframe
          src="/Resume.pdf"
          title="Suman Jhanp Resume"
          style={{
            width: "100%",
            height: "calc(100vh - 130px)",
            minHeight: "500px",
            border: "none",
            display: "block",
            borderRadius: "16px",
          }}
        />
      </div>

      {/* hint */}
      <p style={{ color: "#1e3a5f", fontSize: "0.7rem", marginTop: "8px" }}>
        Press{" "}
        <kbd style={{
          padding: "1px 6px", borderRadius: "4px",
          background: "#0d2137", color: "#7ecfcf",
          border: "1px solid rgba(14,165,233,0.25)",
          fontSize: "0.68rem",
        }}>Esc</kbd>{" "}
        or click outside to close · Use browser controls to zoom
      </p>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── About Section ────────────────────────────────────────────────────────── */
export default function About() {
  const [showResume, setShowResume] = useState(false);

  return (
    <section id="about" className="section">

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      <h2 className="section-title">About Me</h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT — image + stats */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r",
            ].map((cls, i) => (
              <div key={i} className={`absolute w-5 h-5 ${cls}`}
                style={{ borderColor: "#0ea5e9", borderWidth: "2px" }} />
            ))}
            <img
              src={P}
              alt="Suman Jhanp"
              className="rounded-xl object-cover"
              style={{
                width: "220px", height: "220px",
                border: "1px solid rgba(14,165,233,0.25)",
                boxShadow: "0 0 32px rgba(14,165,233,0.2), 0 0 64px rgba(16,185,129,0.1)",
                margin: "8px",
              }}
            />
          </div>

          {/* Stats */}
          <div className="flex gap-4 w-full justify-center">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center px-4 py-3 rounded-xl flex-1"
                style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.18)" }}>
                <div className="text-xl font-black" style={{
                  background: "linear-gradient(90deg, #38bdf8, #34d399)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "#7ecfcf" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — content */}
        <div>
          <p className="mb-4 leading-relaxed" style={{ color: "#94a3b8" }}>
            I am a <span style={{ color: "#38bdf8", fontWeight: 600 }}>Full Stack Developer</span> and{" "}
            <span style={{ color: "#34d399", fontWeight: 600 }}>Data Analyst</span> focused on building
            clean, scalable web applications and extracting meaningful insights from data.
          </p>

          <p className="mb-6 leading-relaxed" style={{ color: "#94a3b8" }}>
            I work with modern technologies like React, Node.js, and MongoDB,
            along with data tools such as Python, Pandas, and Power BI.
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2 mb-7">
            {SKILL_ITEMS.map((skill, i) => (
              <span key={i} className="badge"
                style={i % 3 === 1 ? {
                  background: "rgba(16,185,129,0.12)", color: "#34d399", borderColor: "rgba(16,185,129,0.3)",
                } : i % 3 === 2 ? {
                  background: "rgba(20,184,166,0.12)", color: "#2dd4bf", borderColor: "rgba(20,184,166,0.3)",
                } : {}}>
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