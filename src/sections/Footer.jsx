import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaDownload } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/codecsuman", label: "GitHub", color: "#8b5cf6" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sumanjhanp/", label: "LinkedIn", color: "#06b6d4" },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/sumanjhanp1/", label: "LeetCode", color: "#f43f5e" },
  { icon: <FaEnvelope />, href: "mailto:sumanjhanp1@gmail.com", label: "Email", color: "#f59e0b" },
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
        position: "fixed", inset: 0, zIndex: 2000,
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
        Press{" "}
        <kbd style={{
          padding: "1px 6px", borderRadius: "4px",
          background: "var(--bg-card)", color: "var(--text-secondary)",
          border: "1px solid rgba(139,92,246,0.2)", fontSize: "0.68rem",
        }}>Esc</kbd>{" "}
        or click outside to close
      </p>
    </div>
  );
}

/* ── Footer ── */
export default function Footer() {
  const [showResume, setShowResume] = useState(false);

  return (
    <footer style={{
      borderTop: "1px solid rgba(139,92,246,0.12)",
      background: "rgba(10,10,15,0.85)",
      marginTop: "4rem",
      backdropFilter: "blur(12px)",
      position: "relative",
    }}>
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      {/* Top gradient line */}
      <div style={{
        width: "100%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>

          {/* Brand */}
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontSize: "1.125rem", fontWeight: 900, letterSpacing: "0.06em",
              background: "linear-gradient(90deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              margin: 0,
            }}>
              Suman Jhanp
            </p>
            <p style={{
              fontSize: "0.7rem", marginTop: "4px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--text-secondary)", fontWeight: 500,
            }}>
              MERN Developer · Data Analyst
            </p>
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {SOCIALS.map(({ icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                title={label}
                style={{
                  width: "40px", height: "40px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "12px", fontSize: "1rem",
                  background: `${color}10`,
                  border: `1px solid ${color}20`,
                  color,
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${color}22`;
                  e.currentTarget.style.boxShadow = `0 0 14px ${color}33`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${color}10`;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Resume buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setShowResume(true)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "9px 20px", borderRadius: "10px",
                fontSize: "0.82rem", fontWeight: 600,
                background: "transparent", color: "var(--violet-light)",
                border: "1.5px solid rgba(139,92,246,0.3)",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                e.currentTarget.style.borderColor = "var(--violet)";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(139,92,246,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              📄 View Resume
            </button>
            <a href="/Resume.pdf" download
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "9px 20px", borderRadius: "10px",
                fontSize: "0.82rem", fontWeight: 700,
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "white", textDecoration: "none",
                boxShadow: "0 2px 14px rgba(139,92,246,0.35)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <FaDownload size={11} /> Download CV
            </a>
          </div>

          {/* Copyright */}
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", margin: 0 }}>
            © {new Date().getFullYear()} Suman Jhanp · Built with React &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}