import { useEffect, useRef, useState, useCallback } from "react";
import Logo from "../assets/Logo.png";
import OverlayMenu from "./OverlayMenue";

/* ==============================
   NAV CONFIG
================================ */
const CENTER_ITEMS = ["home", "about", "skills", "projects"];
const CONTACT_ITEM = "contact";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const logoRef = useRef(null);
  const rafRef = useRef(null);

  /* ==============================
     SCROLL PROGRESS BAR
  ============================== */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / total) * 100;
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ==============================
     ACTIVE SECTION TRACK
  ============================== */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ==============================
     LOGO 3D TILT
  ============================== */
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const move = (e) => {
      const r = logo.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);

      logo.style.transform = `
        perspective(600px)
        rotateY(${x / 18}deg)
        rotateX(${-y / 18}deg)
        scale(1.08)
      `;
    };

    const reset = () => {
      logo.style.transform =
        "perspective(600px) rotateX(0) rotateY(0) scale(1)";
    };

    logo.addEventListener("pointermove", move);
    logo.addEventListener("pointerleave", reset);

    return () => {
      logo.removeEventListener("pointermove", move);
      logo.removeEventListener("pointerleave", reset);
    };
  }, []);

  /* ==============================
     HANDLERS
  ============================== */
  const toggleMenu = useCallback(() => {
    setMenuOpen((p) => !p);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ==============================
     BLUE BUTTON STYLES
  ============================== */
  const blueBtnBase = `
    px-5 py-2 rounded-full
    font-bold text-white text-sm uppercase tracking-wide
    bg-gradient-to-r from-blue-500 to-cyan-400
    transition-all duration-300
    hover:scale-105
    hover:shadow-lg hover:shadow-blue-500/40
    active:scale-95
  `;

  const blueBtnActive = `
    scale-105
    shadow-lg shadow-blue-500/50
    ring-2 ring-blue-400/50
  `;

  return (
    <>
      {/* ==============================
         SCROLL PROGRESS BAR
      ============================== */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px]
        bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ==============================
         NAVBAR
      ============================== */}
      <nav
        className="
          fixed top-0 left-0 z-50 w-full
          backdrop-blur-xl bg-black/50
          border-b border-white/10
          shadow-lg shadow-black/20
        "
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-6">

          {/* ==============================
             LEFT — LOGO
          ============================== */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <img
              ref={logoRef}
              src={Logo}
              alt="Logo"
              className="w-10 h-10 select-none"
            />
            <span className="hidden sm:block text-lg font-extrabold tracking-wide text-white">
              SUMAN
            </span>
          </div>

          {/* ==============================
             CENTER — BLUE NAV BUTTONS
          ============================== */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 lg:flex items-center gap-4">
            {CENTER_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`${blueBtnBase} ${activeSection === item ? blueBtnActive : ""
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* ==============================
             RIGHT — CONTACT (UNCHANGED)
          ============================== */}
          <div className="ml-auto hidden lg:flex">
            <button
              onClick={() => handleNavClick(CONTACT_ITEM)}
              className="
                px-5 py-2 rounded-full
                font-bold text-white text-sm
                bg-gradient-to-r from-pink-500 to-blue-500
                hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30
                transition-all duration-300
              "
            >
              Contact
            </button>
          </div>

          {/* ==============================
             MOBILE — HAMBURGER
          ============================== */}
          <button
            onClick={toggleMenu}
            aria-label="Open menu"
            className="
              lg:hidden ml-auto
              w-10 h-10
              flex items-center justify-center
              relative
            "
          >
            <span
              className={`absolute h-[3px] w-7 bg-white transition-all
                ${menuOpen ? "rotate-45 translate-y-[6px]" : "-translate-y-2"}
              `}
            />
            <span
              className={`absolute h-[3px] w-7 bg-white transition-all
                ${menuOpen ? "opacity-0" : ""}
              `}
            />
            <span
              className={`absolute h-[3px] w-7 bg-white transition-all
                ${menuOpen ? "-rotate-45 -translate-y-[6px]" : "translate-y-2"}
              `}
            />
          </button>
        </div>
      </nav>

      {/* ==============================
         MOBILE OVERLAY MENU
      ============================== */}
      <OverlayMenu
        isOpen={menuOpen}
        onClose={toggleMenu}
        onNavigate={handleNavClick}
        items={[...CENTER_ITEMS, CONTACT_ITEM]}
      />
    </>
  );
}
