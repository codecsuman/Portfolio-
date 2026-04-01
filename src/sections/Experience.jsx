import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const EXPERIENCES = [
  {
    title: "Full Stack Developer (MERN)",
    org: "Projects · 2025",
    points: ["Built MERN applications", "Created REST APIs with JWT", "Worked with MongoDB"],
    color: "#0ea5e9",
    icon: "💻",
  },
  {
    title: "Doctor Appointment System",
    org: "MERN Project",
    points: ["Dashboard for users & admin", "Online booking system"],
    color: "#10b981",
    icon: "🏥",
  },
  {
    title: "Job Portal",
    org: "MERN Project",
    points: ["Authentication system", "Recruiter dashboard"],
    color: "#06b6d4",
    icon: "💼",
  },
];

const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/codecsuman", color: "#38bdf8" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sumanjhanp/", color: "#34d399" },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/sumanjhanp1/", color: "#06b6d4" },
];

export default function Experience() {
  return (
    <section id="experience" className="section">

      <h2 className="section-title">Experience</h2>

      <div className="grid md:grid-cols-3 gap-5">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="card"
            style={{ borderColor: `${exp.color}22`, transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${exp.color}55`;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 0 24px ${exp.color}33, 0 8px 32px rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${exp.color}22`;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
            }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                style={{ background: `${exp.color}18`, border: `1px solid ${exp.color}33` }}>
                {exp.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight" style={{ color: "#e0f2fe" }}>{exp.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: exp.color }}>{exp.org}</p>
              </div>
            </div>

            <ul className="space-y-1.5">
              {exp.points.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Socials */}
      <div className="flex justify-center gap-4 mt-10">
        {SOCIALS.map(({ icon, href, color }, i) => (
          <a key={i} href={href} target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-xl text-lg transition-all duration-200"
            style={{ background: `${color}10`, border: `1px solid ${color}25`, color }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${color}25`;
              e.currentTarget.style.boxShadow = `0 0 16px ${color}44`;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${color}10`;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
}