import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaDownload } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/codecsuman", label: "GitHub", color: "#38bdf8" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sumanjhanp/", label: "LinkedIn", color: "#34d399" },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/sumanjhanp1/", label: "LeetCode", color: "#06b6d4" },
  { icon: <FaEnvelope />, href: "mailto:sumanjhanp1@gmail.com", label: "Email", color: "#2dd4bf" },
];

/* ── Resume Modal ─────────────────────────────────────────────────────────── */
function ResumeModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(2,12,27,0.93)",
        backdropFilter: "blur(14px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", padding: "16px",
        animation: "modalIn 0.25s ease forwards",
      }}
    >
      {/* Toolbar */}
      <div style={{
        width: "100%", maxWidth: "920px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px", padding: "10px 16px",
        borderRadius: "14px",
        background: "rgba(13,33,55,0.95)",
        border: "1px solid rgba(14,165,233,0.2)",
        backdropFilter: "blur(8px)",
        flexWrap: "wrap", gap: "8px",
      }}>
        <span style={{
          fontWeight: 700, fontSize: "0.9rem",
          background: "linear-gradient(90deg, #38bdf8, #34d399)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          📄 Suman Jhanp — Resume
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a href="/Resume.pdf" download
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

          <button onClick={onClose}
            style={{
              width: "34px", height: "34px", borderRadius: "9px", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              background: "rgba(248,113,113,0.12)", color: "#f87171",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.28)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(248,113,113,0.12)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* PDF iframe */}
      <div style={{
        width: "100%", maxWidth: "920px", flex: 1,
        borderRadius: "16px", overflow: "hidden",
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
            border: "none", display: "block", borderRadius: "16px",
          }}
        />
      </div>

      <p style={{ color: "#1e3a5f", fontSize: "0.7rem", marginTop: "8px" }}>
        Press{" "}
        <kbd style={{
          padding: "1px 6px", borderRadius: "4px",
          background: "#0d2137", color: "#7ecfcf",
          border: "1px solid rgba(14,165,233,0.25)", fontSize: "0.68rem",
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

/* ── Footer ───────────────────────────────────────────────────────────────── */
export default function Footer() {
  const [showResume, setShowResume] = useState(false);

  return (
    <footer style={{
      borderTop: "1px solid rgba(14,165,233,0.15)",
      background: "rgba(2,12,27,0.8)",
      marginTop: "4rem",
      backdropFilter: "blur(12px)",
    }}>
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top divider glow */}
        <div className="w-full h-px mb-8 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.4), rgba(16,185,129,0.4), transparent)" }} />

        <div className="flex flex-col items-center gap-6">

          {/* Brand */}
          <div className="text-center">
            <p className="text-lg font-black tracking-wider"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #34d399, #06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
              Suman Jhanp
            </p>
            <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "#7ecfcf" }}>
              MERN Developer · Data Analyst
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {SOCIALS.map(({ icon, href, label, color }) => (
              <a key={label} href={href} target="_blank"
                title={label}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-base transition-all duration-200"
                style={{ background: `${color}10`, border: `1px solid ${color}25`, color }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${color}25`;
                  e.currentTarget.style.boxShadow = `0 0 14px ${color}44`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${color}10`;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                {icon}
              </a>
            ))}
          </div>

          {/* Resume buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            {/* View inline — opens modal */}
            <button
              onClick={() => setShowResume(true)}
              className="btn-outline text-sm"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              📄 View Resume
            </button>

            {/* Direct download */}
            <a href="/Resume.pdf" download
              className="btn text-sm"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <FaDownload size={11} /> Download CV
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: "#334155" }}>
            © {new Date().getFullYear()} Suman Jhanp · Built with React &amp; Tailwind
          </p>

        </div>
      </div>
    </footer>
  );
}