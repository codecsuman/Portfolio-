import { useEffect, useRef, useState, useCallback } from "react";
import Logo from "../assets/Logo.png";
import OverlayMenu from "./OverlayMenue";
import { FiSun, FiMoon } from "react-icons/fi";

/* ---------- CONFIG ---------- */
const SECTIONS = ["home", "about", "skills", "projects"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const logoRef = useRef(null);
  const rafRef = useRef(0);

  /* ---------- THEME TOGGLE ---------- */
  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  }, []);

  /* ---------- SCROLL PROGRESS ---------- */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress((window.scrollY / max) * 100 || 0);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ---------- ACTIVE SECTION OBSERVER ---------- */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* ---------- LOGO 3D TILT (GPU SAFE) ---------- */
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
        scale(1.1)
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

  const toggleMenu = useCallback(() => {
    setMenuOpen((p) => !p);
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[60]
          bg-gradient-to-r from-pink-500 to-blue-500"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className="fixed top-0 left-0 w-full z-50
        px-6 py-4 flex items-center justify-between
        backdrop-blur-xl bg-white/70 dark:bg-black/40
        border-b border-black/10 dark:border-white/10"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            ref={logoRef}
            src={Logo}
            alt="Logo"
            className="w-10 h-10 select-none will-change-transform"
          />
          <span className="hidden sm:block text-xl font-bold">
            SUMAN
          </span>
        </div>

        {/* Center Menu */}
        <div
          className="hidden lg:flex items-center gap-10
          px-10 py-3 rounded-full
          bg-black/5 dark:bg-white/5 backdrop-blur-xl
          border border-black/10 dark:border-white/10 shadow-lg"
        >
          {SECTIONS.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`relative capitalize text-lg font-medium transition
                ${
                  activeSection === sec
                    ? "text-current"
                    : "opacity-70 hover:opacity-100"
                }`}
            >
              {sec}
              <span
                className={`absolute left-0 -bottom-1 h-[2px]
                  bg-gradient-to-r from-pink-500 to-blue-500 transition-all
                  ${activeSection === sec ? "w-full" : "w-0"}`}
              />
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full
              flex items-center justify-center
              bg-black/10 dark:bg-white/10
              hover:scale-110 transition"
            aria-label="Toggle theme"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Contact */}
          <a
            href="#contact"
            className="hidden lg:flex items-center justify-center
              px-6 py-2 rounded-full font-semibold text-white
              bg-gradient-to-r from-pink-500 to-blue-500
              shadow-lg shadow-pink-500/30
              hover:scale-110 hover:shadow-pink-500/60
              transition-all"
          >
            Contact
          </a>

          {/* Hamburger */}
          <div
            onClick={toggleMenu}
            className="lg:hidden w-9 h-9 relative cursor-pointer"
          >
            <span
              className={`absolute h-[3px] w-7 bg-current transition
                ${
                  menuOpen
                    ? "rotate-45 translate-y-[6px]"
                    : "-translate-y-2"
                }`}
            />
            <span
              className={`absolute h-[3px] w-7 bg-current transition
                ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute h-[3px] w-7 bg-current transition
                ${
                  menuOpen
                    ? "-rotate-45 -translate-y-[6px]"
                    : "translate-y-2"
                }`}
            />
          </div>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={toggleMenu} />
    </>
  );
}
