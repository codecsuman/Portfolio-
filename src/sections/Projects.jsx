import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ParticlesBackground from "../components/ParticlesBackground";

/* ---------- IMAGES ---------- */
import d1 from "../assets/d1.png";
import f1 from "../assets/f1.png";
import j1 from "../assets/j1.png";
import i1 from "../assets/i1.png";
import s1 from "../assets/s1.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import s5 from "../assets/s5.png";

/* ---------- PROJECT DATA (IMMUTABLE) ---------- */
const PROJECTS = Object.freeze([
  {
    title: "Doctor Appointment System",
    subtitle: "Full-Stack MERN Healthcare Platform",
    desktop: d1,
    mobile: s1,
    live: "https://full-stack-doctor-appointment-booki.vercel.app/",
    github: "https://github.com/codecsuman",
    description:
      "A production-ready healthcare booking platform connecting patients, doctors, and administrators.",
    features: [
      "JWT authentication",
      "Doctor directory & filters",
      "Real-time slots",
      "Admin dashboard",
      "Cloudinary uploads",
    ],
    stack: ["React", "Node", "MongoDB", "JWT", "Cloudinary"],
  },
  {
    title: "Restaurant Website",
    subtitle: "Modern Responsive Business Website",
    desktop: f1,
    mobile: s4,
    github: "https://github.com/codecsuman/Restaurant-Website-",
    description:
      "A clean, modern restaurant website focused on branding and responsiveness.",
    features: ["Modern UI/UX", "Responsive design", "Optimized assets"],
    stack: ["React", "HTML", "CSS", "Tailwind"],
  },
  {
    title: "Job Portal",
    subtitle: "MERN Stack Recruitment Platform",
    desktop: j1,
    mobile: s3,
    live: "https://project-jobportal-4.onrender.com/",
    github: "https://github.com/codecsuman",
    description:
      "A full-stack job portal connecting job seekers and employers.",
    features: [
      "Authentication",
      "Job filtering",
      "Employer dashboard",
      "REST APIs",
    ],
    stack: ["React", "Node", "MongoDB", "Tailwind"],
  },
  {
    title: "Instagram Clone",
    subtitle: "MERN Stack Social Media App",
    desktop: i1,
    mobile: s5,
    live: "https://instragram-clone-5.onrender.com/",
    github: "https://github.com/codecsuman/instragram_clone",
    description:
      "A social media app inspired by Instagram with real-time features.",
    features: [
      "JWT authentication",
      "Likes & comments",
      "Realtime updates",
      "Cloudinary uploads",
    ],
    stack: ["React", "Node", "MongoDB", "Socket.io"],
  },
]);

export default function Projects() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const project = PROJECTS[index];
  const atStart = index === 0;
  const atEnd = index === PROJECTS.length - 1;

  /* ---------- HANDLERS ---------- */
  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, PROJECTS.length - 1));
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center bg-[#020617] overflow-hidden"
    >
      {/* BACKGROUND */}
      <ParticlesBackground section="projects" />

      {/* GLOWS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/25 blur-[200px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] bg-sky-500/25 blur-[200px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <h2 className="text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
          Projects
        </h2>

        <p className="mt-3 text-center text-white/70">
          Carefully designed & engineered full-stack applications
        </p>

        {/* MAIN CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* IMAGE */}
            <motion.div
              initial={reduceMotion ? false : { x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <picture>
                <source media="(max-width: 639px)" srcSet={project.mobile} />
                <img
                  src={project.desktop}
                  alt={project.title}
                  className="w-full h-[260px] md:h-[380px] object-cover"
                  loading="lazy"
                />
              </picture>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={reduceMotion ? false : { y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl"
            >
              <h3 className="text-3xl font-bold">{project.title}</h3>
              <p className="text-white/60 text-sm mt-1">
                {project.subtitle}
              </p>

              <p className="mt-4 text-white/70 text-sm">
                {project.description}
              </p>

              {/* FEATURES */}
              <ul className="mt-4 grid grid-cols-2 gap-y-1 text-sm text-white/70">
                {project.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              {/* STACK */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex flex-wrap gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-semibold text-sm hover:scale-105 transition"
                  >
                    Live <FaExternalLinkAlt className="inline ml-1" />
                  </a>
                )}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"
                >
                  GitHub <FaGithub className="inline ml-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION */}
        <div className="mt-12 flex justify-center items-center gap-6">
          <NavButton disabled={atStart} onClick={prev} variant="prev">
            Previous
          </NavButton>

          <span className="text-white/60">
            {index + 1} / {PROJECTS.length}
          </span>

          <NavButton disabled={atEnd} onClick={next} variant="next">
            Next
          </NavButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- NAV BUTTON ---------- */
function NavButton({ disabled, onClick, children, variant }) {
  const base =
    "px-6 py-2 rounded-full font-semibold transition";
  const styles = disabled
    ? "border border-white/20 text-white/40 cursor-not-allowed"
    : variant === "prev"
      ? "bg-gradient-to-r from-indigo-400 to-cyan-400 text-black hover:scale-105"
      : "bg-gradient-to-r from-emerald-400 to-sky-400 text-black hover:scale-105";

  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
