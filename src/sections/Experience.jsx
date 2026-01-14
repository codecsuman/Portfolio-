import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import ParticlesBackground from "../components/ParticlesBackground";

/* ================================
   EXPERIENCE DATA
================================ */
const EXPERIENCES = Object.freeze([
  {
    role: "Full Stack Web Developer (MERN)",
    org: "Academic & Personal Projects · 2025",
    points: [
      "Built scalable MERN applications",
      "JWT-secured REST APIs",
      "MongoDB schema optimization",
      "Vercel & Render deployment",
    ],
    tech: ["React", "Node", "Express", "MongoDB", "JWT"],
  },
  {
    role: "Doctor Appointment System",
    org: "Healthcare MERN Platform",
    points: [
      "Patient, Doctor & Admin dashboards",
      "Real-time slot booking",
      "Payment integration",
    ],
    tech: ["React", "Node", "MongoDB", "Stripe"],
  },
  {
    role: "Job Portal Application",
    org: "MERN Stack Project",
    points: [
      "Role-based authentication",
      "Recruiter dashboard",
      "Optimized APIs",
    ],
    tech: ["Node", "Express", "MongoDB", "JWT"],
  },
  {
    role: "Instagram Clone",
    org: "Real-Time MERN App",
    points: [
      "Likes & comments",
      "Socket.IO real-time updates",
      "Optimized feed loading",
    ],
    tech: ["React", "Node", "Socket.IO", "MongoDB"],
  },
  {
    role: "Restaurant Website",
    org: "Frontend Project",
    points: [
      "Responsive UI",
      "Performance-focused layout",
      "Clean design system",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
]);

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

/* ================================
   EXPERIENCE CARD
================================ */
function ExperienceCard({ exp, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        rounded-2xl p-5
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition
      "
    >
      <h3 className="text-sm sm:text-base font-semibold">
        {exp.role}
      </h3>
      <p className="text-xs sm:text-sm text-white/60">
        {exp.org}
      </p>

      {/* TECH STACK */}
      <div className="flex flex-wrap gap-2 mt-3">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="
              px-2.5 py-1 text-[11px]
              rounded-full
              bg-emerald-400/10
              border border-emerald-400/20
              text-emerald-300
            "
          >
            {t}
          </span>
        ))}
      </div>

      {/* BULLET POINTS */}
      <ul className="mt-3 text-xs sm:text-sm text-white/75 space-y-1 list-disc list-inside">
        {exp.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ================================
   EXPERIENCE SECTION
================================ */
export default function Experience() {
  const reduceMotion = useReducedMotion();
  const [particlesEnabled, setParticlesEnabled] = useState(false);

  useEffect(() => {
    setParticlesEnabled(!shouldDisableParticles());
  }, []);

  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 bg-[#020617] overflow-hidden"
    >
      {/* PARTICLES */}
      {particlesEnabled && <ParticlesBackground section="experience" />}

      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-emerald-500/25 blur-[160px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[420px] h-[420px] bg-sky-500/25 blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="
            text-3xl sm:text-4xl font-bold
            bg-gradient-to-r from-emerald-400 to-sky-400
            bg-clip-text text-transparent
          ">
            Experience
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Full-stack MERN development experience
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard
              key={exp.role}
              exp={exp}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-10 mt-14 text-3xl">
          <SocialLink
            href="https://github.com/codecsuman"
            color="hover:text-emerald-400"
            label="GitHub"
          >
            <FaGithub />
          </SocialLink>

          <SocialLink
            href="https://www.linkedin.com/in/sumanjhanp/"
            color="hover:text-sky-400"
            label="LinkedIn"
          >
            <FaLinkedin />
          </SocialLink>

          <SocialLink
            href="https://leetcode.com/u/sumanjhanp1/"
            color="hover:text-yellow-400"
            label="LeetCode"
          >
            <SiLeetcode />
          </SocialLink>
        </div>
      </div>
    </section>
  );
}

/* ================================
   SOCIAL LINK
================================ */
function SocialLink({ href, color, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`p-2 rounded-full text-white/60 transition ${color}`}
    >
      {children}
    </a>
  );
}
