import { useMemo } from "react";
import React from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import avatar from "../assets/avator.png";

// Custom LeetCode Icon
const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M15.42 2.29a1 1 0 0 1 1.41 0l1.88 1.88a1 1 0 0 1 0 1.41l-7.78 7.79 7.78 7.78a1 1 0 0 1 0 1.42l-1.88 1.88a1 1 0 0 1-1.41 0L5.7 12l9.72-9.71z"></path>
  </svg>
);

// Social links
const social = [
  { Icon: FaXTwitter, label: "X", href: "https://x.com/suman9785" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/code.csuman/" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sumanjhanp/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/codecsuman" },
  { Icon: LeetCodeIcon, label: "LeetCode", href: "https://leetcode.com/u/sumanjhanp1/" }
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 transparent)" },
  hover: {
    scale: 1.2,
    y: -3,
    filter: "drop-shadow(0 0 10px #00eaff) drop-shadow(0 0 20px #6a5af9)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Home() {
  const roles = useMemo(
    () => [
      "Web Developer",
      "MERN Stack Developer",
      "Frontend Developer",
      "AI Enthusiast",
      "Data Analytics",
    ],
    []
  );

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden">

      <ParticlesBackground />

      {/* 🔥 BACKGROUND GLOW TOP LEFT */}
      <div className="absolute -top-32 -left-32 w-[70vw] h-[70vw]
        sm:w-[40vw] sm:h-[40vw] md:w-[35vw] md:h-[35vw] rounded-full
        bg-gradient-to-r from-[#302b63] via-[#24243e] to-[#00bf8f]
        opacity-30 blur-[120px] pointer-events-none"></div>

      {/* 🔥 BACKGROUND GLOW BOTTOM RIGHT */}
      <div className="absolute bottom-0 right-20 w-[70vw] h-[70vw]
        sm:w-[40vw] sm:h-[40vw] md:w-[35vw] md:h-[35vw] rounded-full
        bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
        opacity-30 blur-[120px] pointer-events-none"></div>

      {/* MAIN CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">

        {/* Typing text */}
        <motion.div
          className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-gray-200 min-h-[1.6em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {roles[index].substring(0, subIndex)}
          <span className="inline-block w-[2px] ml-1 bg-white animate-pulse"></span>
        </motion.div>

        {/* Hero Name */}
        <motion.h1
          className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello, I'm
          <br />
          <span
            className="
              font-extrabold text-transparent bg-clip-text animate-gradient
              bg-gradient-to-r from-[#00eaff] via-[#6a5af9] via-[#ff2e97] to-[#00eaff]
              text-5xl sm:text-6xl md:text-7xl
            "
          >
            Suman Jhanp
          </span>
        </motion.h1>

        {/* Bio */}
        <motion.p
          className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Full Stack MERN Developer passionate about building modern,
          scalable and user-focused applications.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex gap-6 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-[#00eaff] via-[#6a5af9] to-[#ff2e97] hover:scale-105 transition-all"
          >
            View My Work
          </a>

          <a
            href="/Resume.pdf"
            download
            className="px-6 py-3 rounded-full text-black bg-white hover:bg-gray-200 hover:scale-105 transition-all"
          >
            Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="mt-8 flex gap-6 text-2xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {social.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              rel="noopener noreferrer"
              target="_blank"
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={glowVariants}
              className="hover:text-white transition-all"
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>

        {/* 🔥 AVATAR + GLOW BACKGROUND */}
        <div className="absolute hidden lg:block right-10 top-1/2 -translate-y-1/2">

          {/* Glow Behind Avatar */}
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-full blur-[45px]"
            style={{
              right: "-30px",
              width: "min(28vw, 420px)",
              height: "min(28vw, 420px)",
              background:
                "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
              opacity: 0.35,
            }}
          />

          {/* Avatar */}
          <motion.img
            src={avatar}
            alt="Suman Jhanp"
            className="object-contain select-none pointer-events-none relative"
            style={{ width: "min(40vw, 520px)", maxHeight: "80vh" }}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

      </div>
    </section>
  );
}
