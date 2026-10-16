import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/codecsuman", label: "GitHub", color: "#8b5cf6" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sumanjhanp/", label: "LinkedIn", color: "#06b6d4" },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/sumanjhanp1/", label: "LeetCode", color: "#f43f5e" },
  { icon: <FaEnvelope />, href: "mailto:sumanjhanp1@gmail.com", label: "Email", color: "#f59e0b" },
];

/* ── Footer ── */
export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(139,92,246,0.12)",
      background: "rgba(10,10,15,0.85)",
      marginTop: "4rem",
      backdropFilter: "blur(12px)",
      position: "relative",
    }}>
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

          {/* Resume Download only */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
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
            © {new Date().getFullYear()} Suman Jhanp · Built with React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}