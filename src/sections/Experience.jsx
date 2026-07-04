import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const EXPERIENCES = [
  {
    title: "Full Stack Developer (MERN)",
    org: "Projects · 2025",
    points: ["Built MERN applications", "Created REST APIs with JWT", "Worked with MongoDB"],
    color: "#8b5cf6",
    icon: "💻",
  },
  {
    title: "Doctor Appointment System",
    org: "MERN Project",
    points: ["Dashboard for users & admin", "Online booking system"],
    color: "#06b6d4",
    icon: "🏥",
  },
  {
    title: "Job Portal",
    org: "MERN Project",
    points: ["Authentication system", "Recruiter dashboard"],
    color: "#f43f5e",
    icon: "💼",
  },
];

const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/codecsuman", color: "#8b5cf6" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sumanjhanp/", color: "#06b6d4" },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/sumanjhanp1/", color: "#f43f5e" },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title reveal">Experience</h2>

      <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="card"
            style={{ borderColor: `${exp.color}18`, transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${exp.color}50`;
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = `0 0 24px ${exp.color}22, 0 12px 40px rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${exp.color}18`;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}28` }}>
                {exp.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight" style={{ color: "var(--text)" }}>{exp.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: exp.color }}>{exp.org}</p>
              </div>
            </div>

            <ul className="space-y-1.5">
              {exp.points.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Socials */}
      <div className="flex justify-center gap-4 mt-10 reveal">
        {SOCIALS.map(({ icon, href, color }, i) => (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-xl text-lg transition-all duration-200"
            style={{ background: `${color}10`, border: `1px solid ${color}20`, color }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${color}22`;
              e.currentTarget.style.boxShadow = `0 0 16px ${color}33`;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${color}10`;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
}