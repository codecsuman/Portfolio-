import { useEffect, useState } from "react";
import avatar from "../assets/avator.png";
import { FaGithub, FaLinkedin, FaTimes, FaDownload } from "react-icons/fa";

const ROLES = ["Full Stack Developer", "MERN Specialist", "Data Analyst", "Problem Solver"];

/* ── Resume Modal (same as About.jsx) ───────────────────────────────────── */
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

/* ── Home Section ─────────────────────────────────────────────────────────── */
export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let i = typing ? displayed.length : displayed.length - 1;
    if (typing && i >= current.length) {
      setTimeout(() => setTyping(false), 1800);
      return;
    }
    if (!typing && i < 0) {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      setTyping(true);
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayed(typing ? current.slice(0, i + 1) : current.slice(0, i));
    }, typing ? 60 : 35);
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="min-h-screen flex items-center"
      style={{ paddingTop: "80px", position: "relative", overflow: "hidden" }}
    >
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      {/* ── Background layers ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", right: "-5%", top: "5%",
          width: "65vw", height: "90vh",
          background: "radial-gradient(ellipse at 60% 50%, rgba(14,165,233,0.13) 0%, rgba(16,185,129,0.07) 40%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "10%",
          width: "50vw", height: "30vh",
          background: "radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.12), transparent 70%)",
          filter: "blur(30px)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(14,165,233,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />
      </div>

      {/* ── Main grid ── */}
      <div
        className="home-grid"
        style={{
          maxWidth: "1100px", margin: "0 auto", padding: "0 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "0", alignItems: "center", width: "100%",
          position: "relative", zIndex: 1,
          minHeight: "calc(100vh - 80px)",
        }}
      >

        {/* ── LEFT ── */}
        <div style={{ animation: "fadeUp 0.8s ease forwards", opacity: 0, paddingRight: "24px" }}>

          {/* Available badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.3)",
              color: "#38bdf8",
            }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
            Available for Work
          </div>

          {/* Name */}
          <h1 className="font-black mb-3 leading-tight"
            style={{ fontSize: "clamp(2.6rem, 4.5vw, 4rem)" }}>
            <span style={{ color: "#e0f2fe" }}>Hi, I'm </span>
            <span style={{
              background: "linear-gradient(90deg, #38bdf8, #34d399, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Suman</span>
          </h1>

          {/* Typewriter */}
          <div className="flex items-center gap-2 mb-5" style={{ minHeight: "2.2rem" }}>
            <span className="font-semibold" style={{ color: "#7ecfcf", fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}>
              {displayed}
            </span>
            <span className="inline-block w-0.5 h-5 animate-pulse rounded"
              style={{ background: "#0ea5e9" }} />
          </div>

          <p className="mb-8 leading-relaxed" style={{ color: "#94a3b8", maxWidth: "420px", fontSize: "0.95rem" }}>
            I build scalable web applications using the MERN stack and analyze
            data to drive smart decisions. Clean code, thoughtful design.
          </p>

          {/* ── Buttons row ── */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => scrollTo("projects")} className="btn">
              View Projects
            </button>

            {/* View Resume — opens modal */}
            <button
              onClick={() => setShowResume(true)}
              className="btn-outline"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              📄 View Resume
            </button>
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              { href: "https://github.com/codecsuman", icon: <FaGithub />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/sumanjhanp/", icon: <FaLinkedin />, label: "LinkedIn" },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  color: "#7ecfcf",
                  border: "1px solid rgba(20,184,166,0.25)",
                  background: "rgba(20,184,166,0.07)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(20,184,166,0.18)";
                  e.currentTarget.style.color = "#2dd4bf";
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(20,184,166,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(20,184,166,0.07)";
                  e.currentTarget.style.color = "#7ecfcf";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Robot ── */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "flex-end",
          animation: "fadeUp 0.9s ease 0.15s forwards", opacity: 0,
          position: "relative",
          height: "clamp(460px, 72vh, 680px)",
        }}>
          {/* Spinning conic ring */}
          <div style={{
            position: "absolute",
            bottom: "0", left: "50%", transform: "translateX(-50%)",
            width: "clamp(340px, 44vw, 520px)",
            height: "clamp(340px, 44vw, 520px)",
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, #0ea5e9, #10b981, #06b6d4, #14b8a6, #0ea5e9)",
            animation: "spinRing 8s linear infinite",
            filter: "blur(2px)", opacity: 0.55, zIndex: 1,
          }} />

          {/* Inner dark mask */}
          <div style={{
            position: "absolute",
            bottom: "8px", left: "50%", transform: "translateX(-50%)",
            width: "clamp(326px, 42.5vw, 506px)",
            height: "clamp(326px, 42.5vw, 506px)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 40%, #0a2a4a 0%, #020c1b 80%)",
            zIndex: 2,
          }} />

          {/* Glow halo */}
          <div style={{
            position: "absolute",
            bottom: "0", left: "50%", transform: "translateX(-50%)",
            width: "clamp(380px, 48vw, 560px)",
            height: "clamp(380px, 48vw, 560px)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 60%, rgba(14,165,233,0.22) 0%, rgba(16,185,129,0.12) 40%, transparent 70%)",
            filter: "blur(24px)", zIndex: 1,
          }} />

          {/* Floor reflection */}
          <div style={{
            position: "absolute",
            bottom: "-12px", left: "50%", transform: "translateX(-50%)",
            width: "clamp(260px, 34vw, 420px)", height: "40px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(14,165,233,0.35) 0%, transparent 70%)",
            filter: "blur(16px)", zIndex: 1,
          }} />

          {/* Robot image */}
          <img
            src={avatar}
            alt="Suman avatar"
            style={{
              position: "relative", zIndex: 3,
              height: "clamp(420px, 66vh, 640px)",
              width: "auto", maxWidth: "100%",
              objectFit: "contain", objectPosition: "bottom",
              filter: "drop-shadow(0 0 32px rgba(14,165,233,0.5)) drop-shadow(0 0 64px rgba(16,185,129,0.25))",
              animation: "floatRobot 5s ease-in-out infinite",
            }}
          />

          {/* MERN + Data badge */}
          <div style={{
            position: "absolute",
            bottom: "clamp(60px, 9vh, 110px)",
            right: "clamp(0px, 3vw, 40px)",
            zIndex: 4, padding: "8px 16px", borderRadius: "12px",
            background: "linear-gradient(135deg, #0ea5e9, #10b981)",
            boxShadow: "0 4px 20px rgba(14,165,233,0.55)",
            color: "white", fontWeight: 800, fontSize: "0.78rem",
            letterSpacing: "0.04em",
            animation: "floatBadge 4s ease-in-out infinite",
          }}>
            MERN + Data
          </div>

          {/* Open to Roles badge */}
          <div style={{
            position: "absolute",
            top: "clamp(20px, 4vh, 50px)",
            left: "clamp(0px, 2vw, 30px)",
            zIndex: 4, padding: "6px 14px", borderRadius: "10px",
            background: "rgba(13,33,55,0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(14,165,233,0.3)",
            color: "#38bdf8", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.05em",
            animation: "floatBadge 4s ease-in-out 1s infinite",
          }}>
            ⚡ Open to Roles
          </div>
        </div>

      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "#7ecfcf", opacity: 0.45, zIndex: 2 }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(180deg, #0ea5e9, transparent)", animation: "scrollPulse 1.5s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { transform: translateY(28px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes spinRing {
          from { transform: translateX(-50%) rotate(0deg);   }
          to   { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes floatRobot {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-18px); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1);    }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .home-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
            padding-top: 16px !important;
            gap: 0 !important;
          }
          .home-grid > div:first-child {
            padding-right: 0 !important;
            order: 2;
          }
          .home-grid > div:last-child {
            order: 1;
            height: clamp(300px, 52vw, 420px) !important;
          }
        }
      `}</style>
    </section>
  );
}