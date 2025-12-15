import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronDown,
} from "react-icons/fa";
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

/* ---------- PROJECT DATA ---------- */
const PROJECTS = [
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
      "Real-time appointment slots",
      "Admin dashboard",
      "Cloudinary uploads",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Vercel",
    ],
  },
  {
    title: "Restaurant Website",
    subtitle: "Modern Responsive Business Website",
    desktop: f1,
    mobile: s4,
    github: "https://github.com/codecsuman/Restaurant-Website-",
    description:
      "A clean and modern restaurant website focused on branding and responsiveness.",
    features: [
      "Modern UI/UX",
      "Fully responsive",
      "Optimized assets",
    ],
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
      "Job search & filtering",
      "Employer dashboard",
      "REST APIs",
    ],
    stack: ["React", "Node.js", "MongoDB", "Tailwind"],
  },
  {
    title: "Instagram Clone",
    subtitle: "MERN Stack Social Media App",
    desktop: i1,
    mobile: s5,
    live: "https://instragram-clone-5.onrender.com/",
    github: "https://github.com/codecsuman/instragram_clone",
    description:
      "A full-stack social media app inspired by Instagram.",
    features: [
      "JWT auth",
      "Like & comment system",
      "Real-time updates",
      "Cloudinary uploads",
    ],
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.io",
    ],
  },
];

/* ---------- CARD ---------- */
function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        relative rounded-3xl p-6
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        shadow-xl hover:shadow-emerald-400/30
        transition
      "
    >
      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden mb-6">
        <picture>
          <source media="(max-width: 639px)" srcSet={project.mobile} />
          <img
            src={project.desktop}
            alt={project.title}
            className="w-full h-[240px] object-cover"
            loading="lazy"
          />
        </picture>
      </div>

      <h3 className="text-2xl font-semibold">
        {project.title}
      </h3>
      <p className="text-sm text-white/60 mt-1">
        {project.subtitle}
      </p>

      <p className="mt-4 text-white/70">
        {project.description}
      </p>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-4 mt-6">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="
              flex items-center gap-2
              px-5 py-2 rounded-full
              bg-gradient-to-r from-emerald-400 to-sky-400
              text-black font-semibold text-sm
              shadow-lg shadow-emerald-400/40
              hover:shadow-emerald-400/70
              hover:scale-105 transition
            "
          >
            Live <FaExternalLinkAlt />
          </a>
        )}

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="
            flex items-center gap-2
            px-5 py-2 rounded-full
            border border-white/20
            text-sm text-white
            hover:bg-white/10 transition
          "
        >
          GitHub <FaGithub />
        </a>
      </div>

      {/* VIEW DETAILS */}
      <button
        onClick={() => setOpen(!open)}
        className="
          mt-6 flex items-center gap-2
          text-sm font-medium
          text-emerald-300
          hover:text-emerald-200
          drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]
        "
      >
        View details
        <FaChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* DETAILS */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 space-y-5 overflow-hidden"
          >
            <div>
              <h4 className="font-semibold mb-2">
                Features
              </h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="
                      px-3 py-1.5 text-xs rounded-full
                      bg-emerald-400/10
                      border border-emerald-400/30
                      text-emerald-300
                      shadow-[0_0_15px_rgba(52,211,153,0.5)]
                    "
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ---------- SECTION ---------- */
export default function Projects() {
  const PER_PAGE = 2;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(PROJECTS.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visibleProjects = PROJECTS.slice(start, start + PER_PAGE);

  return (
    <section
      id="projects"
      className="
        relative min-h-screen py-32
        overflow-hidden
      "
    >
      {/* 🌌 SAME PARTICLE BACKGROUND AS HOME */}
      <ParticlesBackground section="home" />

      {/* 🌈 SAME SOFT GLOW AS HOME */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="
          text-center text-4xl md:text-5xl font-bold
          text-transparent bg-clip-text
          bg-gradient-to-r from-emerald-400 to-sky-400
        ">
          Projects
        </h2>

        <p className="mt-4 text-center text-white/70">
          Real-world applications built with modern technologies
        </p>

        {/* PROJECTS */}
        <div className="mt-20 grid gap-12 md:grid-cols-2">
          {visibleProjects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-16 flex justify-center gap-6">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="
              px-5 py-2 rounded-full
              border border-white/20
              disabled:opacity-40
              hover:bg-white/10 transition
            "
          >
            Previous
          </button>

          <span className="text-white/60 self-center">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="
              px-5 py-2 rounded-full
              border border-white/20
              disabled:opacity-40
              hover:bg-white/10 transition
            "
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
