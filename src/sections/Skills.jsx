import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaJava,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
  FaChartBar,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiPostman,
  SiTailwindcss,
  SiPandas,
  SiNumpy,
  SiGithub,
} from "react-icons/si";

/* -------- SKILLS -------- */
const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Java", icon: <FaJava /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "Python", icon: <FaPython /> },
  { name: "Pandas", icon: <SiPandas /> },
  { name: "NumPy", icon: <SiNumpy /> },
  { name: "Power BI", icon: <FaChartBar /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Postman", icon: <SiPostman /> },
];

const marquee = [...skills, ...skills];

/* ---------------- SKILL CARD (FAST) ---------------- */
const SkillCard = ({ skill }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 🔥 MUCH SNAPPIER SPRINGS
  const sx = useSpring(x, { stiffness: 420, damping: 22 });
  const sy = useSpring(y, { stiffness: 420, damping: 22 });

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.25); // 🔥 stronger magnet
    y.set(dy * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.18 }} // 🔥 instant pop
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className="
        relative group min-w-[150px]
        rounded-2xl
        bg-white/[0.06]
        backdrop-blur-2xl
        p-6
        flex flex-col items-center gap-3
        shadow-[0_0_50px_-12px_rgba(28,216,210,0.55)]
        border border-white/[0.1]
      "
    >
      {/* Breathing glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 2.5, repeat: Infinity }} // 🔥 faster
        style={{
          background:
            "radial-gradient(circle at center, rgba(28,216,210,0.45), transparent 70%)",
        }}
      />

      {/* Icon */}
      <motion.span
        className="relative text-5xl text-[#1cd8d2]"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.45, ease: "easeInOut" }} // 🔥 faster spin
      >
        {skill.icon}
      </motion.span>

      {/* Label */}
      <span className="relative text-sm text-white/80 tracking-wide">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full py-32 bg-black text-white overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 left-1/3 w-[500px] h-[500px] bg-[#1cd8d2]/25 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#302b63]/25 blur-[160px] rounded-full" />
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }} // 🔥 faster
        className="relative z-10 text-center text-5xl font-bold
          bg-clip-text text-transparent
          bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
      >
        Skills & Tools
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="relative z-10 mt-4 text-center text-white/70"
      >
        Crafting elegant, scalable & modern solutions
      </motion.p>

      {/* Marquee */}
      <div className="relative mt-20 w-full overflow-hidden">
        <motion.div
          className="flex gap-12 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32, // 🔥 faster marquee
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marquee.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
