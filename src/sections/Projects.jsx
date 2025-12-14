import React from "react";

/* ---------- DESKTOP IMAGES ---------- */
import d1 from "../assets/d1.png";
import f1 from "../assets/f1.png";
import j1 from "../assets/j1.png";
import i1 from "../assets/i1.png";

/* ---------- MOBILE IMAGES ---------- */
import s1 from "../assets/s1.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import s5 from "../assets/s5.png";

/* ---------- DATA ---------- */
const PROJECTS = [
  {
    title: "Doctor Appointment System",
    tag: "User Panel",
    desktop: d1,
    mobile: s1,
    live: "https://full-stack-doctor-appointment-booki.vercel.app/",
    github: "https://github.com/codecsuman/instragram_clone",
  },
  {
    title: "Job Portal",
    tag: "Job Listings",
    desktop: j1,
    mobile: s3,
    live: "https://project-jobportal-4.onrender.com/",
    github: "https://github.com/codecsuman/instragram_clone",
  },
  {
    title: "Restaurant Website",
    desktop: f1,
    mobile: s4,
    github: "https://github.com/codecsuman/Restaurant-Website-",
  },
  {
    title: "Instagram Clone",
    desktop: i1,
    mobile: s5,
    live: "https://instragram-clone-5.onrender.com/",
    github: "https://github.com/codecsuman/instragram_clone",
  },
];

/* ---------- CARD ---------- */
const ProjectCard = ({ title, tag, desktop, mobile, live, github }) => (
  <article
    className="
      group relative rounded-3xl p-[1px]
      bg-gradient-to-br from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
      hover:-translate-y-2 transition-transform
    "
  >
    <div
      className="
        h-full rounded-3xl bg-black/70 backdrop-blur-xl
        border border-white/10 p-6 flex flex-col gap-5
      "
    >
      {/* Image (CSS handles mobile swap) */}
      <div className="overflow-hidden rounded-2xl">
        <picture>
          <source media="(max-width: 639px)" srcSet={mobile} />
          <img
            src={desktop}
            alt={title}
            loading="lazy"
            className="
              w-full h-[220px] object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
          />
        </picture>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        {tag && <p className="text-sm text-white/60 mt-1">{tag}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-auto">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="
              px-5 py-2 rounded-full text-sm font-semibold
              text-black bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
              hover:scale-105 transition
            "
          >
            Live
          </a>
        )}
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="
            px-5 py-2 rounded-full text-sm font-semibold
            text-white border border-white/20
            hover:bg-white hover:text-black transition
          "
        >
          GitHub
        </a>
      </div>
    </div>
  </article>
);

/* ---------- SECTION ---------- */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full py-32 bg-black text-white overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[420px] h-[420px]
          bg-[#1cd8d2]/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px]
          bg-[#302b63]/20 blur-[160px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-20 px-6">
        <h2
          className="
            text-5xl font-bold bg-clip-text text-transparent
            bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
          "
        >
          Projects
        </h2>
        <p className="mt-4 text-white/70">
          Real-world applications built with performance & scalability
        </p>
      </div>

      {/* Grid */}
      <div
        className="
          relative z-10 grid md:grid-cols-2 gap-14
          max-w-6xl mx-auto px-6
        "
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
