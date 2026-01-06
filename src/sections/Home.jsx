import { motion, useScroll, useTransform } from "framer-motion";
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

export default function Home() {
  /* ---------- SCROLL EFFECT ---------- */
  const { scrollY } = useScroll();
  const glowOpacity = useTransform(scrollY, [0, 400], [0.45, 0.1]);
  const glowScale = useTransform(scrollY, [0, 400], [1, 0.88]);

  /* ---------- HANDLERS ---------- */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // View Resume
  const viewResume = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-resume"));
    }, 400);
  };

  return (
    <section
      id="home"
      className="
        relative min-h-screen
        flex items-center justify-center
        overflow-hidden
      "
    >
      {/* ---------- BACKGROUND ---------- */}
      <ParticlesBackground section="home" />

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-10 max-w-6xl w-full px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* ================= LEFT ================= */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* ROLE BADGE */}
          <span
            className="
              inline-block w-fit
              px-4 py-1 rounded-full
              text-xs font-semibold uppercase tracking-widest
              text-black
              bg-gradient-to-r from-emerald-400 via-green-400 to-sky-400
              shadow-md shadow-emerald-400/30
            "
          >
            Full-Stack Developer & Data Analyst
          </span>

          {/* HEADING */}
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Hi, I’m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-sky-400">
              Suman Jhanp
            </span>
          </h1>

          {/* DESCRIPTION */}
          <div className="mt-6 max-w-xl mx-auto lg:mx-0 space-y-2">
            <p className="text-lg font-medium text-black/80 dark:text-white/80">
              I build{" "}
              <span className="font-semibold text-emerald-400">modern</span>,{" "}
              <span className="font-semibold text-sky-400">scalable</span>, and{" "}
              <span className="font-semibold text-green-400">
                data-driven
              </span>{" "}
              web applications.
            </p>

            <p className="text-sm text-black/70 dark:text-white/70">
              Alongside full-stack development, I analyze data using{" "}
              <span className="font-semibold text-indigo-400">Python</span>,{" "}
              <span className="font-semibold text-emerald-400">SQL</span>,{" "}
              <span className="font-semibold text-sky-400">Power BI</span>, and{" "}
              <span className="font-semibold text-pink-400">Excel</span>{" "}
              to extract insights and support data-driven decisions.
            </p>

            <p className="text-sm uppercase tracking-widest text-black/50 dark:text-white/50">
              Full Stack · Data Analytics · Clean Architecture · Performance-First
            </p>
          </div>

          {/* ---------- ACTION BUTTONS ---------- */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <ActionButton
              icon={<FaBriefcase />}
              label="View My Projects"
              gradient="from-emerald-400 to-sky-400"
              onClick={() => scrollTo("projects")}
            />

            <ActionLink
              icon={<FaDownload />}
              label="Download Resume"
              gradient="from-indigo-400 via-cyan-400 to-blue-500"
              href="/Resume.pdf"
              download
            />

            <ActionButton
              icon={<FaEye />}
              label="View Resume"
              gradient="from-pink-400 via-rose-400 to-orange-400"
              onClick={viewResume}
            />
          </div>

          {/* ---------- SOCIALS ---------- */}
          <div className="mt-7 flex gap-5 justify-center lg:justify-start text-xl">
            {SOCIALS.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social link"
                className="
                  text-black/60 dark:text-white/60
                  hover:text-emerald-400
                  transition
                "
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <div className="hidden lg:flex justify-center relative">
          {/* SCROLL GLOW */}
          <motion.div
            style={{ opacity: glowOpacity, scale: glowScale }}
            className="
              absolute -inset-24
              rounded-full
              bg-gradient-to-br
              from-emerald-400/35
              via-green-500/25
              to-sky-400/30
              blur-3xl
            "
          />

          {/* ROTATING RING */}
          <motion.div
            className="
              absolute w-[320px] h-[320px]
              rounded-full
              bg-gradient-to-r from-emerald-400 via-green-500 to-sky-400
              p-[2px]
            "
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-[var(--bg)] backdrop-blur-xl" />
          </motion.div>

          {/* AVATAR */}
          <motion.img
            src={avatar}
            alt="Suman Jhanp"
            className="
              relative z-10
              w-[280px] xl:w-[320px]
              rounded-full
              shadow-2xl
            "
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: [0, -14, 0] }}
            whileHover={{ scale: 1.06, rotateX: 6, rotateY: -6 }}
            transition={{
              opacity: { duration: 0.6 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   REUSABLE UI COMPONENTS
===================================================== */

function ActionButton({ icon, label, gradient, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2
        px-6 py-3 rounded-full
        text-sm font-semibold text-black
        bg-gradient-to-r ${gradient}
        shadow-lg shadow-black/20
        hover:shadow-xl hover:scale-105
        active:scale-95
        transition
      `}
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
      className={`
        flex items-center gap-2
        px-6 py-3 rounded-full
        text-sm font-semibold text-black
        bg-gradient-to-r ${gradient}
        shadow-lg shadow-black/20
        hover:shadow-xl hover:scale-105
        active:scale-95
        transition
      `}
    >
      {icon}
      {label}
    </a>
  );
}
