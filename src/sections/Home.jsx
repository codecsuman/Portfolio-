import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaDownload,
  FaEye,
  FaBriefcase,
} from "react-icons/fa6";
import avatar from "../assets/avator.png";

/* ---------- CONFIG ---------- */
const SOCIALS = [
  { Icon: FaXTwitter, href: "https://x.com/suman9785" },
  { Icon: FaInstagram, href: "https://www.instagram.com/code.csuman/" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/sumanjhanp/" },
  { Icon: FaGithub, href: "https://github.com/codecsuman" },
];

/* ---------- LOW-END DEVICE CHECK ---------- */
function shouldDisableParticles() {
  if (typeof window === "undefined") return true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const smallScreen = window.innerWidth < 768;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;

  return prefersReducedMotion || (isTouch && (smallScreen || lowMemory));
}

export default function Home() {
  const { scrollY } = useScroll();
  const glowOpacity = useTransform(scrollY, [0, 400], [0.35, 0.1]);
  const glowScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  const [particlesEnabled, setParticlesEnabled] = useState(false);

  useEffect(() => {
    setParticlesEnabled(!shouldDisableParticles());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const viewResume = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-resume"));
    }, 400);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* PARTICLES (AUTO DISABLED ON LOW-END) */}
      {particlesEnabled && <ParticlesBackground section="home" />}

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        {/* ================= LEFT ================= */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest
            text-black bg-gradient-to-r from-emerald-400 to-sky-400">
            Full-Stack Developer & Data Analyst
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Hi, I’m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-sky-400">
              Suman Jhanp
            </span>
          </h1>

          <div className="mt-6 max-w-xl mx-auto lg:mx-0 space-y-4">
            <p className="text-base sm:text-lg text-black/80 dark:text-white/80">
              I build{" "}
              <span className="font-bold text-emerald-400">modern</span>,{" "}
              <span className="font-bold text-sky-400">scalable</span>, and{" "}
              <span className="font-bold text-green-400">data-driven</span>{" "}
              web applications.
            </p>

            <p className="text-sm sm:text-base font-bold text-white">
              Alongside full-stack development, I analyze data using Python, SQL,
              Power BI, and Excel to support smart decisions.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <ActionButton
              icon={<FaBriefcase />}
              label="Projects"
              gradient="from-emerald-400 to-sky-400"
              onClick={() => scrollTo("projects")}
            />
            <ActionLink
              icon={<FaDownload />}
              label="Resume"
              gradient="from-blue-400 to-cyan-400"
              href="/Resume.pdf"
              download
            />
            <ActionButton
              icon={<FaEye />}
              label="View Resume"
              gradient="from-pink-400 to-orange-400"
              onClick={viewResume}
            />
          </div>

          {/* SOCIALS */}
          <div className="mt-8 flex gap-6 justify-center lg:justify-start text-2xl">
            {SOCIALS.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-black/70 dark:text-white/70
                  hover:text-emerald-400 hover:scale-110 transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <div className="flex justify-center relative">
          <motion.div
            style={{ opacity: glowOpacity, scale: glowScale }}
            className="absolute -inset-20 rounded-full bg-gradient-to-br
              from-emerald-400/30 via-green-400/20 to-sky-400/30 blur-3xl"
          />

          <motion.div
            className="absolute w-[260px] sm:w-[300px] h-[260px] sm:h-[300px] rounded-full
              bg-gradient-to-r from-emerald-400 via-green-500 to-sky-400 p-[2px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-[var(--bg)] backdrop-blur-xl" />
          </motion.div>

          <motion.img
            src={avatar}
            alt="Suman Jhanp"
            className="relative z-10 w-[220px] sm:w-[260px] md:w-[300px] rounded-full shadow-2xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.button
        aria-label="Scroll to about"
        onClick={() => scrollTo("about")}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2
          flex-col items-center gap-1 text-white/70 hover:text-white transition"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[2px] h-8 bg-gradient-to-b from-emerald-400 to-sky-400 rounded-full" />
      </motion.button>
    </section>
  );
}

/* ================= BUTTONS ================= */

function ActionButton({ icon, label, gradient, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2
        px-6 py-3 min-w-[160px]
        rounded-full text-sm font-bold text-black
        bg-gradient-to-r ${gradient}
        shadow-lg hover:scale-105 active:scale-95 transition`}
    >
      {icon}
      {label}
    </button>
  );
}

function ActionLink({ icon, label, gradient, ...props }) {
  return (
    <a
      {...props}
      className={`flex items-center justify-center gap-2
        px-6 py-3 min-w-[160px]
        rounded-full text-sm font-bold text-black
        bg-gradient-to-r ${gradient}
        shadow-lg hover:scale-105 active:scale-95 transition`}
    >
      {icon}
      {label}
    </a>
  );
}
