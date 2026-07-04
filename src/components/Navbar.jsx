import { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";

const NAV_ITEMS = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

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
          background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
          borderBottom: scrolled ? "1px solid rgba(139,92,246,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "64px" }}>

          {/* Logo */}
          <div onClick={() => handleNavClick("home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                position: "absolute", inset: "-4px", borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                filter: "blur(8px)", opacity: 0.5,
              }} />
              <img src={Logo} alt="Logo" style={{ width: "34px", height: "34px", borderRadius: "50%", position: "relative", zIndex: 1 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span className="gradient-text" style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "0.02em" }}>Suman</span>
              <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)", letterSpacing: "0.12em", fontWeight: 500 }}>MERN · DATA</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex" style={{ display: "flex", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = active === item;
              return (
                <li key={item}
                  onClick={() => handleNavClick(item)}
                  style={{
                    cursor: "pointer",
                    padding: "7px 18px",
                    borderRadius: "10px",
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: isActive ? "0.04em" : "0.02em",
                    textTransform: "capitalize",
                    position: "relative",
                    color: isActive ? "var(--violet-light)" : "var(--text-secondary)",
                    background: isActive ? "rgba(139,92,246,0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "rgba(139,92,246,0.06)"; }}}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}}
                >
                  {item}
                  {isActive && (
                    <span style={{
                      position: "absolute", bottom: "4px", left: "50%", transform: "translateX(-50%)",
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                    }} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a href="mailto:sumanjhanp1@gmail.com" className="hidden md:flex"
            style={{
              alignItems: "center", gap: "6px",
              padding: "8px 20px", borderRadius: "10px",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              color: "white", fontWeight: 700, fontSize: "0.8rem",
              textDecoration: "none", letterSpacing: "0.03em",
              boxShadow: "0 2px 16px rgba(139,92,246,0.35)",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Hire Me ✦
          </a>

          {/* Mobile hamburger */}
          <button className="md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "10px", padding: "8px 10px", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: "4px", alignItems: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", height: "2px", borderRadius: "2px",
                background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                transition: "all 0.3s ease",
                width: menuOpen ? (i === 1 ? "0px" : "20px") : (i === 1 ? "14px" : "20px"),
                transform: menuOpen
                  ? (i === 0 ? "rotate(45deg) translate(4px, 4px)" : i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none")
                  : "none",
              }} />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div style={{
          maxHeight: menuOpen ? "340px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          background: "rgba(10,10,15,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(139,92,246,0.1)" : "none",
        }}>
          <div style={{ padding: "12px 20px 16px" }}>
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item;
              return (
                <div key={item} onClick={() => handleNavClick(item)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 16px", borderRadius: "12px", marginBottom: "4px",
                    cursor: "pointer",
                    background: isActive ? "rgba(139,92,246,0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: isActive ? "var(--violet-light)" : "var(--text-muted)", minWidth: "18px" }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: isActive ? 700 : 400, textTransform: "capitalize", color: isActive ? "var(--violet-light)" : "var(--text-secondary)", letterSpacing: "0.02em" }}>
                    {item}
                  </span>
                  {isActive && (
                    <span style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #06b6d4)" }} />
                  )}
                </div>
              );
            })}
            <a href="mailto:sumanjhanp1@gmail.com"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "6px", marginTop: "8px", padding: "12px", borderRadius: "12px",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "white", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none",
                boxShadow: "0 4px 16px rgba(139,92,246,0.3)",
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