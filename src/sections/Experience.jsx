import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import ParticlesBackground from "../components/ParticlesBackground";

/* ================================
   EXPERIENCE DATA (IMMUTABLE)
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

/* ================================
   EXPERIENCE CARD
================================ */
function ExperienceCard({ exp, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        rounded-2xl p-4
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        hover:border-emerald-400/30
        hover:shadow-emerald-400/30
        transition
      "
    >
      <h3 className="text-sm font-semibold">{exp.role}</h3>
      <p className="text-xs text-white/60">{exp.org}</p>

      {/* TECH STACK */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="
              px-2 py-0.5 text-[11px] rounded-full
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
      <ul className="mt-3 text-xs text-white/75 space-y-1 list-disc list-inside">
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

  return (
    <section
      id="experience"
      className="
        relative min-h-screen flex items-center
        bg-[#020617]
        overflow-hidden
      "
    >
      {/* PARTICLES */}
      <ParticlesBackground section="experience" />

      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/25 blur-[200px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] bg-sky-500/25 blur-[200px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2
            className="
              text-3xl md:text-4xl font-bold
              bg-gradient-to-r from-emerald-400 to-sky-400
              bg-clip-text text-transparent
            "
          >
            Experience
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Full-stack MERN development experience
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard
              key={exp.role}
              exp={exp}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-8 mt-12 text-2xl">
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
      className={`text-white/50 transition ${color}`}
    >
      {children}
    </a>
  );
}
