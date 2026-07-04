import { useState, useCallback, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import d1 from "../assets/d1.png";
import f1 from "../assets/f1.png";
import j1 from "../assets/j1.png";
import i1 from "../assets/i1.png";
import s1 from "../assets/s1.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import s5 from "../assets/s5.png";
import P1 from "../assets/P1.png";
import P2 from "../assets/P2.png";
import P3 from "../assets/P3.png";

const PROJECTS = Object.freeze([
  {
    title: "Doctor Appointment System",
    subtitle: "Full-Stack MERN Healthcare Platform",
    category: "fullstack",
    desktop: d1,
    mobile: s1,
    live: "https://doctor-appointment-booking-roan.vercel.app/",
    github: "https://github.com/codecsuman/Doctor-Appointment-Booking",
    description: "A production-ready healthcare booking platform connecting patients, doctors, and administrators with real-time slot management and a powerful admin dashboard.",
    features: [
      "JWT authentication & role-based access",
      "Doctor directory with search & filters",
      "Real-time appointment slots",
      "Admin dashboard with analytics",
      "Cloudinary image uploads",
    ],
    stack: ["React", "Node.js", "MongoDB", "JWT", "Cloudinary"],
    color: "#8b5cf6",
  },
  {
    title: "Restaurant Website",
    subtitle: "Modern Responsive Business Website",
    category: "fullstack",
    desktop: f1,
    mobile: s4,
    live: null,
    github: "https://github.com/codecsuman/Restaurant-Website-",
    description: "A clean, modern restaurant website focused on branding, responsive design, and optimized performance — built to convert visitors into customers.",
    features: [
      "Pixel-perfect responsive UI",
      "Modern design system",
      "Optimized asset loading",
      "Mobile-first layout",
    ],
    stack: ["React", "HTML", "CSS", "Tailwind"],
    color: "#06b6d4",
  },
  {
    title: "Job Portal",
    subtitle: "MERN Stack Recruitment Platform",
    category: "fullstack",
    desktop: j1,
    mobile: s3,
    live: "https://suman-job-portal.vercel.app/",
    github: "https://github.com/codecsuman/suman_job_portal",
    description: "A full-stack job portal connecting job seekers and employers with smart filtering, authentication, and a dedicated recruiter dashboard.",
    features: [
      "Secure authentication system",
      "Advanced job filtering & search",
      "Recruiter & applicant dashboards",
      "REST API with Express",
    ],
    stack: ["React", "Node.js", "MongoDB", "Tailwind"],
    color: "#f43f5e",
  },
  {
    title: "Instagram Clone",
    subtitle: "MERN Stack Social Media App",
    category: "fullstack",
    desktop: i1,
    mobile: s5,
    live: "https://instagram-ohuy.vercel.app/",
    github: "https://github.com/codecsuman/instagram",
    description: "A social media app inspired by Instagram featuring real-time updates, post interactions, and live notifications powered by Socket.io.",
    features: [
      "JWT authentication",
      "Likes, comments & follows",
      "Real-time notifications via Socket.io",
      "Cloudinary media uploads",
    ],
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "Cloudinary"],
    color: "#10b981",
  },
  {
    title: "Blinkit Sales Analysis (Excel)",
    subtitle: "Business Intelligence · Excel Dashboard",
    category: "data",
    desktop: P1,
    mobile: P1,
    live: "https://blinkit-analysis-hazel.vercel.app/",
    github: "https://github.com/codecsuman/Blinkit-Analysis",
    description: "Comprehensive analysis of Blinkit's grocery sales dataset using Microsoft Excel — featuring an interactive slicer-driven dashboard for stakeholders to explore KPIs and outlet performance.",
    features: [
      "Total & average sales KPIs",
      "Fat content impact on revenue",
      "Outlet performance by size & tier",
      "Sales growth by establishment year",
      "Top-performing item categories",
    ],
    stack: ["Excel", "Power Query", "Pivot Tables", "Data Visualization"],
    color: "#f59e0b",
  },
  {
    title: "Sales Data EDA",
    subtitle: "Exploratory Data Analysis · Python",
    category: "data",
    desktop: P2,
    mobile: P2,
    live: "https://eda-data-analysis.vercel.app/",
    github: "https://github.com/codecsuman/EDA-Data-Analysis",
    description: "A complete EDA project on a synthetic retail sales dataset — covering data generation, analysis, and interactive visualization across revenue, profit, region, and customer segments.",
    features: [
      "1,000-order synthetic dataset",
      "Revenue, profit & discount analysis",
      "Regional & category-wise breakdown",
      "Customer segmentation insights",
      "Interactive Plotly visualizations",
    ],
    stack: ["Python", "Pandas", "NumPy", "Plotly", "Jupyter"],
    color: "#ec4899",
  },
  {
    title: "Blinkit Sales Analysis (Python)",
    subtitle: "Data Analysis · Python & Power BI",
    category: "data",
    desktop: P3,
    mobile: P3,
    live: "https://blinkit-sales-analysis.vercel.app/",
    github: "https://github.com/codecsuman/Blinkit-Sales-Analysis",
    description: "Full-cycle data analysis on Blinkit — India's leading quick-commerce platform — covering product sales, outlet performance, inventory distribution, and geographic trends.",
    features: [
      "Item category revenue breakdown",
      "Outlet type performance comparison",
      "City-tier growth opportunity analysis",
      "Inventory distribution insights",
      "Interactive Power BI dashboard",
    ],
    stack: ["Python", "Pandas", "SQL", "Power BI", "Matplotlib"],
    color: "#22c55e",
  },
]);

const CATEGORIES = [
  { key: "all", label: "All Projects", count: PROJECTS.length },
  { key: "fullstack", label: "Full Stack", count: PROJECTS.filter(p => p.category === "fullstack").length },
  { key: "data", label: "Data Analytics", count: PROJECTS.filter(p => p.category === "data").length },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const filtered = PROJECTS.filter((p) => activeCategory === "all" || p.category === activeCategory);
  const project = filtered[index] ?? filtered[0];
  const atStart = index === 0;
  const atEnd = index === filtered.length - 1;
  const isData = project?.category === "data";

  const handleCategory = (key) => {
    if (key === activeCategory) return;
    setActiveCategory(key);
    setIndex(0);
  };

  const navigate = useCallback(
    (dir) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) =>
          dir === "next" ? Math.min(i + 1, filtered.length - 1) : Math.max(i - 1, 0)
        );
        setAnimating(false);
      }, 220);
    },
    [animating, filtered.length]
  );

  const goTo = useCallback(
    (i) => {
      if (animating || i === index) return;
      setDirection(i > index ? "next" : "prev");
      setAnimating(true);
      setTimeout(() => { setIndex(i); setAnimating(false); }, 220);
    },
    [animating, index]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" && !atEnd) navigate("next");
      if (e.key === "ArrowLeft" && !atStart) navigate("prev");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [atStart, atEnd, navigate]);

  if (!project) return null;

  return (
    <section id="projects" className="section" style={{ position: "relative" }}>

      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(139,92,246,0.07), transparent 70%)",
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-40px", left: "5%",
          width: "360px", height: "360px",
          background: "radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)",
          filter: "blur(50px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="section-title reveal">Projects</h2>
        <p className="section-subtitle reveal" style={{ transitionDelay: "0.1s" }}>
          A selection of things I've built
        </p>

        {/* Category Filter Tabs */}
        <div className="reveal" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "2rem" }}>
          {CATEGORIES.map(({ key, label, count }) => {
            const isActive = activeCategory === key;
            return (
              <button key={key} onClick={() => handleCategory(key)}
                style={{
                  padding: "8px 18px", borderRadius: "10px",
                  fontSize: "0.82rem", fontWeight: isActive ? 700 : 500,
                  border: isActive ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  background: isActive ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "var(--violet-light)" : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", gap: "7px",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--text)"; }}}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
              >
                {label}
                <span style={{
                  fontSize: "0.68rem", fontWeight: 700,
                  padding: "1px 7px", borderRadius: "999px",
                  background: isActive ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.06)",
                  color: isActive ? "var(--violet-light)" : "var(--text-muted)",
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Card */}
        <div className="project-card reveal-scale"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            alignItems: "center",
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${project.color}20`,
            borderRadius: "20px",
            padding: "2rem 2.5rem",
            transition: "opacity 220ms ease, transform 220ms ease, border-color 0.3s ease",
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "next" ? "-24px" : "24px"})`
              : "translateX(0)",
            boxShadow: `0 0 40px ${project.color}08, 0 8px 40px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Image */}
          <div style={{
            borderRadius: "12px", overflow: "hidden",
            border: `1px solid ${project.color}18`,
            aspectRatio: "16/9", background: "#0a0a0f",
            position: "relative",
          }}>
            <img src={project.desktop} alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", top: "10px", left: "10px",
              padding: "4px 10px", borderRadius: "6px",
              fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              background: isData ? "rgba(236,72,153,0.85)" : "rgba(139,92,246,0.85)",
              color: "white", backdropFilter: "blur(4px)",
            }}>
              {isData ? "Data Analytics" : "Full Stack"}
            </div>
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.2, color: "var(--text)" }}>
                {project.title}
              </h3>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
                {project.subtitle}
              </p>
            </div>

            <p style={{ margin: 0, fontSize: "0.87rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
              {project.description}
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {project.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.83rem", color: "var(--text-secondary)" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: project.color, flexShrink: 0, boxShadow: `0 0 4px ${project.color}` }} />
                  {f}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.stack.map((s) => (
                <span key={s} style={{
                  padding: "3px 10px", borderRadius: "6px",
                  fontSize: "0.72rem", fontWeight: 600,
                  background: `${project.color}12`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                  letterSpacing: "0.03em",
                }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    padding: "9px 20px", borderRadius: "10px",
                    fontSize: "0.83rem", fontWeight: 700,
                    background: project.color,
                    color: "#fff", textDecoration: "none",
                    transition: "opacity 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <FaExternalLinkAlt size={11} /> Live Demo
                </a>
              )}
              <a href={project.github} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "9px 20px", borderRadius: "10px",
                  fontSize: "0.83rem", fontWeight: 600,
                  background: "transparent",
                  color: "var(--text-secondary)", textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <FaGithub size={14} /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.75rem" }}>
          <button onClick={() => navigate("prev")} disabled={atStart}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "10px",
              fontSize: "0.83rem", fontWeight: 600,
              background: "transparent",
              border: `1px solid ${atStart ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)"}`,
              color: atStart ? "var(--text-muted)" : "var(--text-secondary)",
              cursor: atStart ? "not-allowed" : "pointer",
              opacity: atStart ? 0.4 : 1,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { if (!atStart) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <FaChevronLeft size={12} /> Previous
          </button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {filtered.map((p, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Go to ${p.title}`}
                  style={{
                    width: i === index ? "22px" : "7px",
                    height: "7px", borderRadius: "999px",
                    background: i === index ? p.color : "rgba(255,255,255,0.12)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all 0.3s ease",
                    boxShadow: i === index ? `0 0 6px ${p.color}` : "none",
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {index + 1} / {filtered.length}
            </span>
          </div>

          <button onClick={() => navigate("next")} disabled={atEnd}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "10px",
              fontSize: "0.83rem", fontWeight: 600,
              background: "transparent",
              border: `1px solid ${atEnd ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)"}`,
              color: atEnd ? "var(--text-muted)" : "var(--text-secondary)",
              cursor: atEnd ? "not-allowed" : "pointer",
              opacity: atEnd ? 0.4 : 1,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { if (!atEnd) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            Next <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-card {
            grid-template-columns: 1fr !important;
            padding: 1.25rem !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}