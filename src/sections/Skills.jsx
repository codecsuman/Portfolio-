import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import {
  FaJava,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiPostman,
  SiTailwindcss,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiVercel,
  SiNetlify,
} from "react-icons/si";

/* ---------- SKILLS ---------- */
const SKILLS = [
  {
    title: "Languages",
    items: [
      { name: "Java", icon: <FaJava className="text-orange-400" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-300" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "Python", icon: <FaPython className="text-sky-400" /> },
      { name: "C", icon: <span className="font-bold text-cyan-400">C</span> },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <span className="font-bold text-white">N</span> },
      { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <SiCss3 className="text-blue-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
      { name: "Express.js", icon: <SiExpress className="text-white" /> },
      { name: "REST APIs", icon: <span className="text-emerald-400 font-semibold">API</span> },
      { name: "JWT Auth", icon: <span className="text-pink-400 font-semibold">JWT</span> },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MongoDB", icon: <SiMongodb className="text-emerald-400" /> },
      { name: "MySQL", icon: <SiMysql className="text-sky-400" /> },
      { name: "SQL", icon: <span className="text-cyan-400 font-semibold">SQL</span> },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: <FaGitAlt className="text-orange-400" /> },
      { name: "GitHub", icon: <SiGithub className="text-white" /> },
      { name: "Docker", icon: <FaDocker className="text-sky-400" /> },
      { name: "AWS", icon: <FaAws className="text-orange-300" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
      { name: "VS Code", icon: <span className="text-blue-400 font-semibold">VS</span> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "Netlify", icon: <SiNetlify className="text-emerald-400" /> },
    ],
  },
  {
    title: "Core",
    items: [
      { name: "Full Stack", icon: "⚙️" },
      { name: "API Design", icon: "🔗" },
      { name: "Cloud", icon: "☁️" },
      { name: "CI / CD", icon: "🚀" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="
        relative min-h-screen py-28 overflow-hidden
        bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]
        text-white
      "
    >
      {/* 🌌 Particle background */}
      <ParticlesBackground section="skills" />

      {/* 🌈 BIG COLOR BLOBS */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/30 rounded-full blur-[200px]" />
        <div className="absolute top-1/3 right-[-20%] w-[600px] h-[600px] bg-sky-500/30 rounded-full blur-[200px]" />
        <div className="absolute bottom-[-30%] left-1/3 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[200px]" />
      </div>

      {/* ---------- HEADING ---------- */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          text-center text-4xl md:text-5xl font-bold
          text-transparent bg-clip-text
          bg-gradient-to-r from-emerald-400 via-green-400 to-sky-400
        "
      >
        Skills & Technologies
      </motion.h2>

      <p className="mt-4 text-center text-white/70">
        Tools I use to craft scalable, high-quality applications
      </p>

      {/* ---------- GRID ---------- */}
      <div className="mt-20 max-w-6xl mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="
              relative rounded-3xl p-6
              bg-white/5 backdrop-blur-2xl
              border border-white/10
              shadow-xl
              hover:shadow-emerald-400/30
              transition
            "
          >
            {/* Neon border glow */}
            <div
              className="
                absolute inset-0 rounded-3xl opacity-0
                hover:opacity-100 transition
                bg-gradient-to-br from-emerald-400/20 via-sky-400/20 to-transparent
                pointer-events-none
              "
            />

            <h3 className="relative mb-6 text-xl font-semibold">
              {group.title}
            </h3>

            <ul className="relative flex flex-wrap gap-3">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="
                    flex items-center gap-2
                    px-4 py-2 rounded-full
                    bg-white/10
                    border border-white/10
                    text-sm text-white/80
                    hover:text-white
                    hover:bg-gradient-to-r hover:from-emerald-400/20 hover:to-sky-400/20
                    hover:border-emerald-400/50
                    transition
                  "
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
