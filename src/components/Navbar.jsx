import { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.png";
import OverlayMenu from "./OverlayMenue";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const logoRef = useRef(null);
  const rafRef = useRef(null);

  /* ---------- SCROLL PROGRESS ---------- */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress((window.scrollY / total) * 100);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ---------- ACTIVE SECTION ---------- */
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

  /* ---------- LOGO 3D TILT ---------- */
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const move = (e) => {
      const r = logo.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);

      logo.style.transform = `
        perspective(600px)
        rotateY(${x / 14}deg)
        rotateX(${-y / 14}deg)
        scale(1.12)
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

  const toggleMenu = () => {
    setHamburgerOpen((p) => !p);
    setMenuOpen((p) => !p);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[60]
          bg-gradient-to-r from-pink-500 to-blue-500"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="fixed top-0 left-0 w-full z-50
        px-6 py-4 flex items-center justify-between
        backdrop-blur-xl bg-black/40
        border-b border-white/10">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            ref={logoRef}
            src={Logo}
            alt="Logo"
            className="w-10 h-10 select-none"
          />
          <span className="hidden sm:block text-xl font-bold text-white">
            SUMAN
          </span>
        </div>

        {/* Center Menu */}
        <div className="hidden lg:flex items-center gap-10
          px-10 py-3 rounded-full
          bg-white/5 backdrop-blur-xl
          border border-white/10 shadow-lg">
          {["home", "about", "skills", "projects"].map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`relative capitalize text-lg font-medium transition
                ${
                  activeSection === sec
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
            >
              {sec}
              <span
                className={`absolute left-0 -bottom-1 h-[2px]
                  bg-gradient-to-r from-pink-500 to-blue-500
                  transition-all
                  ${activeSection === sec ? "w-full" : "w-0"}`}
              />
            </a>
          ))}
        </div>

        {/* Contact Button */}
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
          className="lg:hidden w-9 h-9 relative
            cursor-pointer flex items-center justify-center"
        >
          <span
            className={`absolute h-[3px] w-7 bg-white transition
              ${
                hamburgerOpen
                  ? "rotate-45 translate-y-[6px]"
                  : "-translate-y-2"
              }`}
          />
          <span
            className={`absolute h-[3px] w-7 bg-white transition
              ${hamburgerOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute h-[3px] w-7 bg-white transition
              ${
                hamburgerOpen
                  ? "-rotate-45 -translate-y-[6px]"
                  : "translate-y-2"
              }`}
          />
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={toggleMenu} />
    </>
  );
}
