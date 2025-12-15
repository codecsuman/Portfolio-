import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

/* ---------- DATA ---------- */
const EXPERIENCES = [
  {
    role: "Full Stack Web Developer (MERN)",
    org: "Academic & Personal Projects · 2025",
    points: [
      "Built scalable MERN apps",
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
      "Socket.IO updates",
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
      "Clean design",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

/* ---------- CARD ---------- */
const ExperienceCard = ({ exp }) => (
  <div
    className="
      rounded-xl p-4
      bg-white/5 backdrop-blur-xl
      border border-white/10
      hover:border-emerald-400/30
      hover:shadow-emerald-400/20
      transition
    "
  >
    <h3 className="text-sm font-semibold">{exp.role}</h3>
    <p className="text-xs text-white/60">{exp.org}</p>

    {/* Tech */}
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

    {/* Points */}
    <ul className="mt-3 text-xs text-white/75 space-y-1 list-disc list-inside">
      {exp.points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

/* ---------- SECTION ---------- */
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2
            className="
              text-3xl md:text-4xl font-bold
              text-transparent bg-clip-text
              bg-gradient-to-r from-emerald-400 to-sky-400
            "
          >
            Experience
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Full-stack MERN development experience
          </p>
        </div>

        {/* GRID — ALL VISIBLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.role} exp={exp} />
          ))}
        </div>

        {/* SOCIAL */}
        <div className="flex justify-center gap-6 mt-10 text-xl text-white/50">
          <a
            href="https://github.com/codecsuman"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sumanjhanp/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://leetcode.com/u/sumanjhanp1/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <SiLeetcode />
          </a>
        </div>
      </div>
    </section>
  );
}
