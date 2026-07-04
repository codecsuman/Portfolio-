
import { useState, useEffect, useRef } from "react";
import avatar from "../assets/avator.png";
import { FaGithub, FaLinkedin, FaArrowDown, FaCode, FaDatabase, FaChartLine, FaLightbulb } from "react-icons/fa";

const ROLES = ["Full Stack Developer", "MERN Specialist", "Data Analyst", "Problem Solver"];

// Animated counter hook
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return [count, ref];
}

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax mouse effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typewriter effect
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

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const [projectCount, projectRef] = useCountUp(25);
  const [clientCount, clientRef] = useCountUp(15);
  const [expCount, expCountRef] = useCountUp(3);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* ===== ANIMATED BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orb - follows mouse slightly */}
        <div
          className="absolute transition-transform duration-700 ease-out"
          style={{
            right: "-5%",
            top: "5%",
            width: "60vw",
            height: "75vh",
            background: "radial-gradient(ellipse at 60% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          }}
        />
        {/* Secondary gradient orb */}
        <div
          className="absolute transition-transform duration-1000 ease-out"
          style={{
            bottom: "5%",
            right: "10%",
            width: "40vw",
            height: "30vh",
            background: "radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.08), transparent 70%)",
            filter: "blur(60px)",
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: i % 2 === 0 ? "rgba(139,92,246,0.4)" : "rgba(6,182,212,0.4)",
              left: `${15 + i * 14}%`,
              top: `${20 + (i * 13) % 50}%`,
              animation: `floatParticle ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div
        className="home-grid relative z-10 mx-auto px-6"
        style={{
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          alignItems: "center",
          width: "100%",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        {/* ===== LEFT — Text Content ===== */}
        <div
          className="pr-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Available badge with pulse */}
          <div
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "var(--violet-light)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full relative"
              style={{ background: "#10b981" }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: "#10b981",
                  animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
            </span>
            Available for Work
          </div>

          {/* Name with staggered reveal */}
          <h1
            className="font-black mb-4 leading-[1.1]"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
          >
            <span style={{ color: "var(--text)" }}>Hi, I'm </span>
            <span
              className="gradient-text inline-block"
              style={{
                animation: "gradientShift 4s ease infinite",
                backgroundSize: "200% 200%",
              }}
            >
              Suman
            </span>
          </h1>

          {/* Typewriter with enhanced cursor */}
          <div
            className="flex items-center gap-2.5 mb-6"
            style={{ minHeight: "2.2rem" }}
          >
            <span
              className="font-semibold"
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              }}
            >
              {displayed}
            </span>
            <span
              className="inline-block w-[2px] h-5 rounded-full"
              style={{
                background: "linear-gradient(180deg, var(--violet), var(--cyan))",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>

          {/* Description */}
          <p
            className="mb-8 leading-relaxed"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "440px",
              fontSize: "0.95rem",
              lineHeight: "1.7",
            }}
          >
            I build scalable web applications using the MERN stack and analyze
            data to drive smart, data-informed decisions.
          </p>

          {/* Quick stats */}
          <div
            className="flex gap-6 mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            {[
              { ref: projectRef, count: projectCount, label: "Projects", icon: <FaCode /> },
              { ref: clientRef, count: clientCount, label: "Clients", icon: <FaDatabase /> },
              { ref: expCountRef, count: expCount, label: "Years Exp.", icon: <FaChartLine /> },
            ].map(({ ref, count, label, icon }) => (
              <div
                key={label}
                ref={ref}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(139,92,246,0.04)",
                  border: "1px solid rgba(139,92,246,0.1)",
                  minWidth: "80px",
                }}
              >
                <span style={{ color: "var(--violet-light)", fontSize: "0.75rem" }}>{icon}</span>
                <span
                  className="font-bold text-lg"
                  style={{ color: "var(--text)" }}
                >
                  {count}+
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons with hover effects */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => scrollTo("projects")}
              className="group relative px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, var(--violet), var(--violet-dark))",
                color: "white",
                boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(139,92,246,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(139,92,246,0.3)";
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <FaArrowDown className="text-xs transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--violet-light), var(--violet))",
                }}
              />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="group px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                color: "var(--violet-light)",
                border: "1.5px solid rgba(139,92,246,0.3)",
                background: "rgba(139,92,246,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.12)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.05)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span className="flex items-center gap-2">
                <FaLightbulb className="text-xs" />
                Get In Touch
              </span>
            </button>
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            {[
              { href: "https://github.com/codecsuman", icon: <FaGithub />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/sumanjhanp/", icon: <FaLinkedin />, label: "LinkedIn" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl transition-all duration-300"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                  e.currentTarget.style.color = "var(--violet-light)";
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ===== RIGHT — Avatar Visual ===== */}
        <div
          className="flex justify-center items-end relative"
          style={{
            height: "clamp(400px, 60vh, 580px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0) scale(1)" : "translateX(40px) scale(0.95)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          {/* Animated rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                bottom: `${i * 2}%`,
                left: "50%",
                transform: "translateX(-50%)",
                width: `clamp(${280 + i * 30}px, ${32 + i * 4}vw, ${420 + i * 40}px)`,
                height: `clamp(${280 + i * 30}px, ${32 + i * 4}vw, ${420 + i * 40}px)`,
                border: `${1 - i * 0.2}px solid ${
                  i % 2 === 0
                    ? `rgba(139,92,246,${0.15 - i * 0.04})`
                    : `rgba(6,182,212,${0.1 - i * 0.02})`
                }`,
                animation: `ringPulse ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                zIndex: 1,
              }}
            />
          ))}

          {/* Rotating dashed ring */}
          <div
            className="absolute rounded-full"
            style={{
              bottom: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(340px, 42vw, 500px)",
              height: "clamp(340px, 42vw, 500px)",
              border: "1.5px dashed rgba(139,92,246,0.1)",
              animation: "spin 30s linear infinite",
              zIndex: 1,
            }}
          />

          {/* Glow behind avatar */}
          <div
            className="absolute rounded-full"
            style={{
              bottom: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(300px, 38vw, 450px)",
              height: "clamp(300px, 38vw, 450px)",
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.12) 0%, transparent 60%)",
              filter: "blur(40px)",
              zIndex: 1,
              animation: "glowPulse 4s ease-in-out infinite",
            }}
          />

          {/* Avatar */}
          <img
            src={avatar}
            alt="Suman avatar"
            className="relative z-10"
            style={{
              height: "clamp(380px, 58vh, 560px)",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              objectPosition: "bottom",
              animation: "float 6s ease-in-out infinite",
              filter: "drop-shadow(0 20px 40px rgba(139,92,246,0.15))",
            }}
          />

          {/* Floating tech badge */}
          <div
            className="absolute z-20 px-4 py-2 rounded-xl flex items-center gap-2"
            style={{
              bottom: "clamp(50px, 8vh, 90px)",
              right: "clamp(5px, 1.5vw, 25px)",
              background: "rgba(17,17,24,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "var(--violet-light)",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              animation: "badgeFloat 5s ease-in-out infinite",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--cyan)", animation: "pulseGlow 2s ease-in-out infinite" }}
            />
            MERN + Data
          </div>

          {/* Secondary floating element */}
          <div
            className="absolute z-20 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            style={{
              top: "clamp(60px, 12vh, 120px)",
              left: "clamp(10px, 2vw, 30px)",
              background: "rgba(17,17,24,0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(6,182,212,0.15)",
              color: "var(--cyan)",
              fontWeight: 600,
              fontSize: "0.7rem",
              animation: "badgeFloat 6s ease-in-out infinite 1s",
            }}
          >
            <FaCode className="text-xs" />
            React.js
          </div>
        </div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 z-10"
        style={{
          transform: "translateX(-50%)",
          color: "var(--text-muted)",
          opacity: isVisible ? 0.5 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <span className="text-xs tracking-[0.2em] uppercase" style={{ fontSize: "0.65rem" }}>
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{
            border: "1.5px solid rgba(139,92,246,0.25)",
          }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: "var(--violet)",
              animation: "scrollBounce 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.5; }
          75% { transform: translateY(-30px) translateX(15px); opacity: 0.7; }
        }
        @keyframes ringPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.03); opacity: 0.7; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 768px) {
          .home-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
            padding-top: 20px !important;
            gap: 32px !important;
          }
          .home-grid > div:first-child {
            padding-right: 0 !important;
            order: 2;
          }
          .home-grid > div:last-child {
            order: 1;
            height: clamp(300px, 50vw, 400px) !important;
          }
        }
      `}</style>
    </section>
  );
}