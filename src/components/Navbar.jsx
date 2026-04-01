import { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";

const NAV_ITEMS = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  /* ── scroll effects ── */
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(sy > 20);
      setScrollPct(max > 0 ? (sy / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── scroll-spy: highlight nav item based on which section is in view ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* close mobile menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background: scrolled ? "rgba(2,12,27,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(14,165,233,0.12)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.45)" : "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* ── scroll progress bar ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, height: "2px",
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #0ea5e9, #10b981, #06b6d4)",
          transition: "width 0.1s linear",
          zIndex: 10,
        }} />

        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px", height: "64px",
        }}>

          {/* ── Logo ── */}
          <div
            onClick={() => handleNavClick("home")}
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              {/* glow ring */}
              <div style={{
                position: "absolute", inset: "-3px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                filter: "blur(6px)", opacity: 0.5,
                transition: "opacity 0.3s",
              }} />
              <img src={Logo} alt="Logo"
                style={{ width: "34px", height: "34px", borderRadius: "50%", position: "relative", zIndex: 1 }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{
                fontSize: "1rem", fontWeight: 800, letterSpacing: "0.02em",
                background: "linear-gradient(90deg, #38bdf8, #34d399)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Suman
              </span>
              <span style={{ fontSize: "0.6rem", color: "#7ecfcf", letterSpacing: "0.12em", fontWeight: 500 }}>
                MERN · DATA
              </span>
            </div>
          </div>

          {/* ── Desktop Nav ── */}
          <ul style={{ display: "flex", gap: "2px", listStyle: "none", margin: 0, padding: 0 }}
            className="hidden md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item;
              return (
                <li key={item}
                  onClick={() => handleNavClick(item)}
                  style={{
                    cursor: "pointer",
                    padding: "6px 16px",
                    borderRadius: "10px",
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: isActive ? "0.04em" : "0.02em",
                    textTransform: "capitalize",
                    position: "relative",
                    color: isActive ? "#38bdf8" : "#94a3b8",
                    background: isActive ? "rgba(14,165,233,0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(14,165,233,0.2)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                    userSelect: "none",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#e0f2fe";
                      e.currentTarget.style.background = "rgba(14,165,233,0.06)";
                      e.currentTarget.style.borderColor = "rgba(14,165,233,0.12)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  {item}
                  {/* active underline dot */}
                  {isActive && (
                    <span style={{
                      position: "absolute", bottom: "4px",
                      left: "50%", transform: "translateX(-50%)",
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "linear-gradient(90deg, #0ea5e9, #10b981)",
                    }} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <a
            href="mailto:sumanjhanp1@gmail.com"
            className="hidden md:flex"
            style={{
              alignItems: "center", gap: "6px",
              padding: "7px 18px", borderRadius: "10px",
              background: "linear-gradient(135deg, #0ea5e9, #10b981)",
              color: "white", fontWeight: 700, fontSize: "0.8rem",
              textDecoration: "none", letterSpacing: "0.03em",
              boxShadow: "0 2px 16px rgba(14,165,233,0.35)",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.87"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Hire Me ✦
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "rgba(14,165,233,0.08)",
              border: "1px solid rgba(14,165,233,0.2)",
              borderRadius: "10px",
              padding: "8px 10px",
              cursor: "pointer",
              display: "flex", flexDirection: "column",
              gap: "4px", alignItems: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", height: "2px", borderRadius: "2px",
                transition: "all 0.3s ease",
                background: "linear-gradient(90deg, #0ea5e9, #10b981)",
                width: menuOpen
                  ? i === 1 ? "0px" : "20px"
                  : i === 1 ? "14px" : "20px",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                    : i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                      : "none"
                  : "none",
              }} />
            ))}
          </button>

        </div>

        {/* ── Mobile dropdown menu ── */}
        <div style={{
          maxHeight: menuOpen ? "320px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          background: "rgba(2,12,27,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(14,165,233,0.1)" : "none",
        }}>
          <div style={{ padding: "12px 20px 16px" }}>
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item;
              return (
                <div
                  key={item}
                  onClick={() => handleNavClick(item)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    marginBottom: "4px",
                    cursor: "pointer",
                    background: isActive ? "rgba(14,165,233,0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(14,165,233,0.2)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(14,165,233,0.06)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  {/* numbered index */}
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 700,
                    color: isActive ? "#38bdf8" : "#334155",
                    minWidth: "18px",
                  }}>
                    0{i + 1}
                  </span>
                  <span style={{
                    fontSize: "0.9rem", fontWeight: isActive ? 700 : 400,
                    textTransform: "capitalize",
                    color: isActive ? "#38bdf8" : "#94a3b8",
                    letterSpacing: "0.02em",
                  }}>
                    {item}
                  </span>
                  {isActive && (
                    <span style={{
                      marginLeft: "auto", width: "6px", height: "6px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                    }} />
                  )}
                </div>
              );
            })}

            {/* mobile hire me */}
            <a
              href="mailto:sumanjhanp1@gmail.com"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "6px", marginTop: "8px",
                padding: "12px", borderRadius: "12px",
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                color: "white", fontWeight: 700, fontSize: "0.85rem",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(14,165,233,0.3)",
              }}
            >
              Hire Me ✦
            </a>
          </div>
        </div>

      </nav>
    </>
  );
}