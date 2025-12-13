import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

/* ---------- EXPERIENCE DATA (2025 | FULL STACK) ---------- */
const experiences = [
  {
    role: "Full Stack Web Developer (MERN)",
    org: "Academic & Personal Projects",
    points: [
      "Built scalable MERN applications with clean architecture",
      "Developed REST APIs with JWT authentication & RBAC",
      "Designed MongoDB schemas and optimized queries",
      "Deployed apps using Vercel, Render & CI/CD pipelines",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    role: "Doctor Appointment Booking System",
    org: "Healthcare MERN Project",
    points: [
      "Patient, Doctor & Admin dashboards",
      "Stripe & Razorpay payment integration",
      "Appointment analytics & management",
      "Production deployment (Vercel + Render)",
    ],
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Razorpay"],
  },
  {
    role: "Full Stack Job Portal Application",
    org: "MERN Application",
    points: [
      "Authentication & role-based authorization",
      "Job search, filtering & recruiter dashboard",
      "RESTful APIs for jobs & applications",
      "Optimized backend performance",
    ],
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    role: "Instagram Clone (Real-Time App)",
    org: "Socket.IO Based Project",
    points: [
      "Real-time notifications using Socket.IO",
      "Posts, likes, comments & profiles",
      "Optimized feed & media loading",
      "Responsive Tailwind UI",
    ],
    tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
  },
  {
    role: "Restaurant Website",
    org: "Frontend + Deployment Project",
    points: [
      "Modern responsive UI/UX",
      "Clean layout & animations",
      "Performance-focused design",
      "GitHub version control",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

/* Duplicate for infinite scroll */
const marquee = [...experiences, ...experiences];

/* ---------- EXPERIENCE CARD ---------- */
const ExperienceCard = ({ exp }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    className="
      relative min-w-[340px] max-w-[340px]
      rounded-2xl bg-white/[0.06] backdrop-blur-xl
      p-6 border border-white/[0.08]
      shadow-[0_0_40px_-15px_rgba(28,216,210,0.4)]
    "
  >
    {/* Glow */}
    <motion.div
      className="absolute inset-0 rounded-2xl"
      animate={{ opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{
        background:
          "radial-gradient(circle at center, rgba(28,216,210,0.35), transparent 70%)",
      }}
    />

    <div className="relative">
      <h3 className="text-lg font-semibold">{exp.role}</h3>
      <p className="text-sm text-white/70">{exp.org}</p>

      {/* Tech */}
      <div className="flex flex-wrap gap-2 mt-3">
        {exp.tech.map(t => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs rounded-full bg-white/10"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Points */}
      <ul className="mt-4 space-y-1 text-sm text-white/80 list-disc list-inside">
        {exp.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

/* ---------- EXPERIENCE SECTION ---------- */
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full py-28 bg-black text-white overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] to-[#302b63]">
          Full-Stack Experience
        </h2>
        <p className="mt-3 text-white/70 max-w-2xl mx-auto">
          End-to-end MERN development — APIs, databases, authentication, UI & deployment (2025)
        </p>
      </div>

      {/* Auto Scroll (Skills-Style) */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10 will-change-transform px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {marquee.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} />
          ))}
        </motion.div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-8 mt-16 text-2xl text-white/70">
        <a
          href="https://github.com/codecsuman"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#1cd8d2]"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sumanjhanp/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#1cd8d2]"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://leetcode.com/u/sumanjhanp1/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#1cd8d2]"
        >
          <SiLeetcode />
        </a>
      </div>
    </section>
  );
}
