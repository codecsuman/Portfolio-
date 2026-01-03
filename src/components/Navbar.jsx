import { useEffect, useState, useCallback, memo, useRef } from "react";
import Logo from "../assets/Logo.png";
import OverlayMenu from "./OverlayMenue";
import { FiSun, FiMoon } from "react-icons/fi";

/* ---------- NAV CONFIG ---------- */
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const activeRef = useRef("home");

  /* ---------- THEME TOGGLE ---------- */
  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, [setTheme]);

  /* ---------- ACTIVE SECTION TRACKING ---------- */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = activeRef.current;
        let maxRatio = 0;

        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > maxRatio) {
            maxRatio = e.intersectionRatio;
            mostVisible = e.target.id;
          }
        });

        if (mostVisible !== activeRef.current) {
          activeRef.current = mostVisible;
          setActiveSection(mostVisible);
        }
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className="
          fixed top-0 left-0 w-full z-50
          px-6 py-4 flex items-center justify-between
          bg-white/70 dark:bg-black/60
          backdrop-blur-2xl
          border-b border-black/10 dark:border-white/10
        "
      >
        {/* LOGO */}
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src={Logo}
            alt="Logo"
            className="w-9 h-9 rounded-md transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:block text-lg font-semibold tracking-tight">
            SUMAN
          </span>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-4">
          {NAV_ITEMS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`
                  nav-btn text-sm
                  ${active ? "scale-105 shadow-lg" : "opacity-80"}
                `}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
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
              shadow-md
              hover:shadow-xl hover:scale-110
              active:scale-95
              transition
            "
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* CONTACT CTA */}
          <a
            href="#contact"
            className="
              hidden lg:inline-flex
              items-center justify-center
              px-5 py-2 rounded-full
              text-sm font-semibold text-black
              bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400
              shadow-lg shadow-cyan-400/30
              hover:shadow-cyan-400/70 hover:scale-105
              active:scale-95
              transition
            "
          >
            Contact
          </a>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="
              lg:hidden w-10 h-10 rounded-full
              flex flex-col items-center justify-center gap-[5px]
              bg-black/10 dark:bg-white/10
              hover:scale-110 active:scale-95
              transition
            "
          >
            <span className="w-5 h-[2px] bg-current" />
            <span className="w-5 h-[2px] bg-current" />
            <span className="w-5 h-[2px] bg-current" />
          </button>
        </div>
      </nav>

      {/* OVERLAY MENU */}
      <OverlayMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={NAV_ITEMS.map((i) => i.label)}
      />
    </>
  );
}

export default memo(Navbar);
