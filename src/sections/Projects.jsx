import { useEffect, useState } from "react";

/* ---------- DESKTOP IMAGES ---------- */
import d1 from "../assets/d1.png";
import d2 from "../assets/d2.png";
import f1 from "../assets/f1.png";
import j1 from "../assets/j1.png";
import j2 from "../assets/j2.png";
import i1 from "../assets/i1.png";

/* ---------- MOBILE IMAGES ---------- */
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import s5 from "../assets/s5.png";

/* ---------- MOBILE CHECK ---------- */
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = e => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

/* ---------- PROJECT CARD ---------- */
const ProjectCard = ({ title, image, tag, live, github }) => (
  <div
    className="
      relative rounded-3xl p-[1px]
      bg-gradient-to-br from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
    "
  >
    <div
      className="
        h-full rounded-3xl
        bg-black/70 backdrop-blur-xl
        border border-white/10
        p-6 flex flex-col gap-5
      "
    >
      {/* Image */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        {tag && <p className="text-sm text-white/60 mt-1">{tag}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-auto">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="
              px-5 py-2 rounded-full text-sm font-semibold
              text-black
              bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
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
            text-white
            border border-white/20
            hover:bg-white hover:text-black
            transition
          "
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
);

/* ---------- PROJECTS ---------- */
export default function Projects() {
  const isMobile = useIsMobile();

  return (
    <section
      id="projects"
      className="relative w-full py-32 bg-black text-white overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[420px] h-[420px] bg-[#1cd8d2]/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-[#302b63]/20 blur-[160px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
          Projects
        </h2>
        <p className="mt-4 text-white/70">
          Real-world applications built with performance & scalability in mind
        </p>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid md:grid-cols-2 gap-14 max-w-6xl mx-auto px-6">

        {/* Doctor Appointment */}
        <ProjectCard
          title="Doctor Appointment System"
          tag="User Panel"
          image={isMobile ? s1 : d1}
          live="https://full-stack-doctor-appointment-booki.vercel.app/"
          github="https://github.com/codecsuman/instragram_clone"
        />

      
{/* Job Portal */}
        <ProjectCard
          title="Job Portal"
          tag="Job Listings"
          image={isMobile ? s3 : j1}
          live="https://project-jobportal-4.onrender.com/"
          github="https://github.com/codecsuman/instragram_clone"
        />

     

        {/* Restaurant */}
        <ProjectCard
          title="Restaurant Website"
          image={isMobile ? s4 : f1}
          github="https://github.com/codecsuman/Restaurant-Website-"
        />

        {/* Instagram */}
        <ProjectCard
          title="Instagram Clone"
          image={isMobile ? s5 : i1}
          live="https://instragram-clone-5.onrender.com/"
          github="https://github.com/codecsuman/instragram_clone"
        />
      </div>
    </section>
  );
}
