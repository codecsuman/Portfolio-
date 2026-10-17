import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import Logo from "../assets/Logo.webp";
import { LIGHT_EFFECTS as lightFx } from "../utils/perf";

const NAV_ITEMS = ["home", "about", "skills", "projects", "experience", "contact"];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e, id) => {
    const isOnMainPage = location.pathname === "/";
    
    if (isOnMainPage) {
      // On main page - prevent NavLink navigation, just scroll
      e.preventDefault();
      scrollToSection(id);
    } else {
      // On other page - let NavLink navigate, but pass scroll state
      // The NavLink will handle navigation, we just ensure state is passed
    }
    setMenuOpen(false);
  };

  // Handle scroll restoration after navigation to home page
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      setTimeout(() => scrollToSection(location.state.scrollTo), 100);
    }
  }, [location.pathname, location.state]);

  // For NavLinks on main page, we need to pass state when NOT on main page
  const getNavLinkProps = (item) => {
    const isOnMainPage = location.pathname === "/";
    if (isOnMainPage) {
      return {
        onClick: (e) => handleNavClick(e, item),
        // Don't set 'to' on main page, we handle scroll manually
      };
    } else {
      return {
        to: `/${item}`,
        state: { scrollTo: item },
        onClick: () => setMenuOpen(false),
      };
    }
  };

  const isActiveSection = (item) => {
    if (item === "home") return location.pathname === "/";
    return location.pathname === `/${item}`;
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background: scrolled
            ? isLight ? "rgba(255,255,255,0.95)" : "rgba(10,10,15,0.96)"
            : "transparent",
          backdropFilter: scrolled && !lightFx ? "blur(20px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled && !lightFx ? "blur(20px) saturate(1.2)" : "none",
          borderBottom: scrolled
            ? isLight ? "1px solid rgba(15,23,42,0.06)" : "1px solid rgba(139,92,246,0.1)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? isLight ? "0 4px 40px rgba(15,23,42,0.08)" : "0 4px 40px rgba(0,0,0,0.5)"
            : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "64px" }}>

          {/* Logo */}
          <div onClick={() => {
            const isOnMainPage = location.pathname === "/";
            if (isOnMainPage) {
              scrollToSection("home");
            } else {
              navigate("/", { state: { scrollTo: "home" } });
            }
            setMenuOpen(false);
          }} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: "-4px", borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", filter: "blur(8px)", opacity: 0.5 }} />
              <img src={Logo} alt="Logo" style={{ width: "34px", height: "34px", borderRadius: "50%", position: "relative", zIndex: 1 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span className="gradient-text" style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "0.02em" }}>Suman</span>
              <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)", letterSpacing: "0.12em", fontWeight: 500 }}>MERN · DATA</span>
            </div>
          </div>

          {/* Desktop Nav — only ≥1024px. Below that: hamburger only.
              No inline `display` here — it would override the hidden/flex classes. */}
          <ul className="hidden lg:flex" style={{ gap: "2px", listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = isActiveSection(item);
              const navProps = getNavLinkProps(item);
              
              return (
                <NavLink
                  key={item}
                  {...navProps}
                  style={({ isActive: active }) => ({
                    cursor: "pointer",
                    padding: "7px 12px",
                    borderRadius: "10px",
                    fontSize: "0.8rem",
                    fontWeight: (active || isActive) ? 700 : 400,
                    letterSpacing: (active || isActive) ? "0.04em" : "0.02em",
                    textTransform: "capitalize",
                    position: "relative",
                    color: (active || isActive) ? "var(--violet-light)" : "var(--text-secondary)",
                    background: (active || isActive) ? "rgba(139,92,246,0.1)" : "transparent",
                    border: (active || isActive) ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                    userSelect: "none",
                    textDecoration: "none",
                  })}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "rgba(139,92,246,0.06)"; }}}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}}
                >
                  {item}
                  {isActive && (
                    <span style={{ position: "absolute", bottom: "4px", left: "50%", transform: "translateX(-50%)", width: "4px", height: "4px", borderRadius: "50%", background: "linear-gradient(90deg, #8b5cf6, #06b6d4)" }} />
                  )}
                </NavLink>
              );
            })}
            {/* Resume Link - always navigates to /resume route */}
            <NavLink
              to="/resume"
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                padding: "7px 12px",
                borderRadius: "10px",
                fontSize: "0.82rem",
                fontWeight: isActive ? 700 : 600,
                letterSpacing: "0.03em",
                textTransform: "capitalize",
                position: "relative",
                color: isActive ? "white" : "var(--violet-light)",
                background: isActive ? "linear-gradient(135deg, #8b5cf6, #06b6d4)" : "rgba(139,92,246,0.1)",
                border: isActive ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(139,92,246,0.2)",
                transition: "all 0.2s ease",
                textDecoration: "none",
                userSelect: "none",
                boxShadow: isActive ? "0 2px 16px rgba(139,92,246,0.4)" : "none",
              })}
              onMouseEnter={(e) => {
                if (!location.pathname.includes("resume")) {
                  e.currentTarget.style.background = "rgba(139,92,246,0.18)";
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!location.pathname.includes("resume")) {
                  e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                }
              }}
            >
              📄 Resume
            </NavLink>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              onMouseDown={(e) => e.preventDefault()} // Prevent focus styles on mousedown
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                border: "1px solid rgba(139,92,246,0.2)",
                background: "rgba(139,92,246,0.1)",
                color: "var(--violet-light)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.2)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </ul>

          {/* Desktop CTA */}
          <a href="https://www.linkedin.com/in/sumanjhanp/" target="_blank" rel="noopener noreferrer" className="hidden lg:flex"
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

          {/* Mobile hamburger — the ONLY nav control below 1024px.
              `flex flex-col` comes from classes: an inline display:flex
              here would override md:hidden/lg:hidden and clash. */}
          <button className="lg:hidden flex flex-col items-center"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "10px", padding: "8px 10px", cursor: "pointer",
              gap: "4px",
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
          maxHeight: menuOpen ? "640px" : "0px",
          overflow: "auto",
          transition: "max-height 0.35s ease",
          background: isLight ? "rgba(255,255,255,0.98)" : "rgba(10,10,15,0.97)",
          backdropFilter: lightFx ? "none" : "blur(20px)",
          WebkitBackdropFilter: lightFx ? "none" : "blur(20px)",
          borderTop: menuOpen
            ? isLight ? "1px solid rgba(15,23,42,0.06)" : "1px solid rgba(139,92,246,0.1)"
            : "none",
          boxShadow: menuOpen
            ? isLight ? "0 12px 32px rgba(15,23,42,0.1)" : "0 12px 32px rgba(0,0,0,0.5)"
            : "none",
        }}>
          <div style={{ padding: "16px 20px 20px" }}>
            {NAV_ITEMS.map((item, i) => {
              const isActive = isActiveSection(item);
              const navProps = getNavLinkProps(item);
              
              return (
                <NavLink
                  key={item}
                  {...navProps}
                  style={({ isActive: active }) => ({
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 16px", borderRadius: "12px", marginBottom: "4px",
                    cursor: "pointer",
                    background: (active || isActive) ? "rgba(139,92,246,0.1)" : "transparent",
                    border: (active || isActive) ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  })}
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
                </NavLink>
              );
            })}
            {/* Mobile Resume Link */}
            <NavLink
              to="/resume"
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                marginTop: "8px", padding: "12px", borderRadius: "12px",
                background: isActive ? "linear-gradient(135deg, #8b5cf6, #06b6d4)" : "rgba(139,92,246,0.15)",
                color: isActive ? "white" : "var(--violet-light)",
                fontWeight: 700, fontSize: "0.85rem", textDecoration: "none",
                boxShadow: isActive ? "0 4px 16px rgba(139,92,246,0.4)" : "0 2px 10px rgba(139,92,246,0.2)",
                border: isActive ? "none" : "1px solid rgba(139,92,246,0.2)",
                transition: "all 0.2s ease",
              })}
            >
              📄 Resume
            </NavLink>
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                marginTop: "8px", padding: "12px", borderRadius: "12px",
                background: "rgba(139,92,246,0.15)",
                color: "var(--violet-light)",
                fontWeight: 600, fontSize: "0.85rem",
                border: "1px solid rgba(139,92,246,0.2)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.25)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.15)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
              }}
            >
              {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <a href="https://www.linkedin.com/in/sumanjhanp/" target="_blank" rel="noopener noreferrer"
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