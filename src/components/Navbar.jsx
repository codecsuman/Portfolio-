import { useEffect, useState, useCallback } from "react";
import Logo from "../assets/Logo.png";
import OverlayMenu from "./OverlayMenue";
import { FiSun, FiMoon } from "react-icons/fi";

/* ---------- CONFIG ---------- */
const SECTIONS = ["home", "about", "skills", "projects"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  /* ---------- THEME TOGGLE ---------- */
  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  }, []);

  /* ---------- ACTIVE SECTION ---------- */
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

  return (
    <>
      <nav
        className="
          fixed top-0 left-0 w-full z-50
          px-6 py-4
          flex items-center justify-between
          bg-white/70 dark:bg-black/60
          backdrop-blur-2xl
          border-b border-black/10 dark:border-white/10
        "
      >
        {/* ---------- LOGO ---------- */}
        <a href="#home" className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-9 h-9 rounded-md" />
          <span className="hidden sm:block text-lg font-semibold tracking-tight">
            SUMAN
          </span>
        </a>

        {/* ---------- DESKTOP NAV ---------- */}
        <div className="hidden lg:flex items-center gap-8">
          {SECTIONS.map((sec) => {
            const active = activeSection === sec;
            return (
              <a
                key={sec}
                href={`#${sec}`}
                className={`
                  relative capitalize text-sm font-medium
                  transition-colors
                  ${
                    active
                      ? "text-black dark:text-white"
                      : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                  }
                `}
              >
                {sec}

                {/* Active underline */}
                {active && (
                  <span
                    className="
                      absolute -bottom-2 left-0 h-[2px] w-full
                      bg-gradient-to-r from-indigo-400 to-cyan-400
                      rounded-full
                    "
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* ---------- ACTIONS ---------- */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              w-10 h-10 rounded-full
              flex items-center justify-center
              bg-gradient-to-br
              from-yellow-300/80 to-orange-400/80
              dark:from-indigo-500/70 dark:to-cyan-400/70
              text-black dark:text-white
              shadow-md hover:shadow-lg
              hover:scale-105 transition
            "
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="
              hidden lg:inline-flex
              items-center justify-center
              px-5 py-2 rounded-full
              text-sm font-semibold text-black
              bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400
              shadow-lg shadow-cyan-400/30
              hover:shadow-cyan-400/60
              hover:scale-[1.05] transition
            "
          >
            Contact
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="
              lg:hidden w-10 h-10 rounded-full
              flex flex-col items-center justify-center gap-[5px]
              bg-black/10 dark:bg-white/10
              hover:scale-105 transition
            "
          >
            <span className="w-5 h-[2px] bg-current" />
            <span className="w-5 h-[2px] bg-current" />
            <span className="w-5 h-[2px] bg-current" />
          </button>
        </div>
      </nav>

      {/* ---------- OVERLAY MENU ---------- */}
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
