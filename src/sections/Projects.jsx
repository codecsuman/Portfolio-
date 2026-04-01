import { useState, useCallback, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

// ── Project images ────────────────────────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = Object.freeze([
  {
    title: "Doctor Appointment System",
    subtitle: "Full-Stack MERN Healthcare Platform",
    category: "fullstack",
    desktop: d1,
    mobile: s1,
    live: "https://full-stack-doctor-appointment-booki.vercel.app/",
    github: "https://github.com/codecsuman",
    description:
      "A production-ready healthcare booking platform connecting patients, doctors, and administrators.",
    features: [
      "JWT authentication",
      "Doctor directory & filters",
      "Real-time slots",
      "Admin dashboard",
      "Cloudinary uploads",
    ],
    stack: ["React", "Node", "MongoDB", "JWT", "Cloudinary"],
    color: "#0ea5e9",
  },
  {
    title: "Restaurant Website",
    subtitle: "Modern Responsive Business Website",
    category: "fullstack",
    desktop: f1,
    mobile: s4,
    live: null,
    github: "https://github.com/codecsuman/Restaurant-Website-",
    description:
      "A clean, modern restaurant website focused on branding and responsiveness.",
    features: ["Modern UI/UX", "Responsive design", "Optimized assets"],
    stack: ["React", "HTML", "CSS", "Tailwind"],
    color: "#10b981",
  },
  {
    title: "Job Portal",
    subtitle: "MERN Stack Recruitment Platform",
    category: "fullstack",
    desktop: j1,
    mobile: s3,
    live: "https://project-jobportal-4.onrender.com/",
    github: "https://github.com/codecsuman",
    description:
      "A full-stack job portal connecting job seekers and employers with smart filtering.",
    features: ["Authentication", "Job filtering", "Employer dashboard", "REST APIs"],
    stack: ["React", "Node", "MongoDB", "Tailwind"],
    color: "#06b6d4",
  },
  {
    title: "Instagram Clone",
    subtitle: "MERN Stack Social Media App",
    category: "fullstack",
    desktop: i1,
    mobile: s5,
    live: "https://instragram-clone-5.onrender.com/",
    github: "https://github.com/codecsuman/instragram_clone",
    description:
      "A social media app inspired by Instagram with real-time features and live updates.",
    features: [
      "JWT authentication",
      "Likes & comments",
      "Realtime updates",
      "Cloudinary uploads",
    ],
    stack: ["React", "Node", "MongoDB", "Socket.io"],
    color: "#14b8a6",
  },

  // ── Data Analyst Projects ────────────────────────────────────────────────
  {
    title: "Blinkit Sales Analysis (Excel)",
    subtitle: "Business Intelligence · Excel Dashboard",
    category: "data",
    desktop: P1,
    mobile: P1,
    live: "https://blinkit-analysis-hazel.vercel.app/",
    github: "https://github.com/codecsuman/Blinkit-Analysis",
    description:
      "Comprehensive analysis of Blinkit's grocery sales dataset using Microsoft Excel. An interactive slicer-driven dashboard lets stakeholders explore KPIs, compare outlet performance, and understand product-level demand patterns.",
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
    description:
      "A complete Exploratory Data Analysis project on a synthetic retail sales dataset — covering data generation, analysis, and visualization across revenue, profit, region, and customer segments.",
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
    subtitle: "Data Analysis · Python & SQL",
    category: "data",
    desktop: P3,
    mobile: P3,
    live: "https://blinkit-sales-analysis.vercel.app/",
    github: "https://github.com/codecsuman/Blinkit-Sales-Analysis",
    description:
      "Full-cycle data analysis on Blinkit — India's leading quick-commerce platform — covering product sales, outlet performance, inventory distribution, and geographic trends.",
    features: [
      "Item category revenue breakdown",
      "Outlet type performance comparison",
      "City-tier growth opportunity analysis",
      "Inventory distribution insights",
      "Interactive BI dashboard",
    ],
    stack: ["Python", "Pandas", "SQL", "Power BI", "Matplotlib"],
    color: "#22c55e",
  },
]);

// ── Styles ────────────────────────────────────────────────────────────────────
const S = {
  section: {
    padding: "5rem 1.5rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "3rem",
    letterSpacing: "-0.5px",
  },

  // Card
  card: (animating, direction) => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2.5rem",
    alignItems: "center",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "2rem 2.5rem",
    transition: "opacity 220ms ease, transform 220ms ease",
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateX(${direction === "next" ? "-28px" : "28px"})`
      : "translateX(0)",
  }),

  // Image
  imgWrap: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    aspectRatio: "16/9",
    background: "#0a0a0a",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  // Info column
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  // Badge
  badge: (isData) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 11px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    background: isData ? "rgba(192,132,252,0.1)" : "rgba(56,189,248,0.1)",
    color: isData ? "#c084fc" : "#38bdf8",
    border: `1px solid ${isData ? "rgba(192,132,252,0.3)" : "rgba(56,189,248,0.3)"}`,
    width: "fit-content",
  }),

  // Title
  title: {
    fontSize: "1.45rem",
    fontWeight: 700,
    margin: "0 0 2px",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "0.83rem",
    margin: 0,
    opacity: 0.5,
  },

  // Description
  desc: {
    fontSize: "0.88rem",
    lineHeight: 1.7,
    opacity: 0.7,
    margin: 0,
  },

  // Features
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.84rem",
    opacity: 0.75,
  },
  dot: (color) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
  }),

  // Stack
  stackRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  chip: (color) => ({
    padding: "3px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
    background: `${color}1a`,
    color: color,
    border: `1px solid ${color}40`,
    letterSpacing: "0.04em",
  }),

  // Link buttons
  linkRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "0.25rem",
  },
  liveBtn: (color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "9px 20px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 600,
    background: color,
    color: "#fff",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.15s",
    lineHeight: 1,
  }),
  githubBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "9px 20px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 600,
    background: "transparent",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
    lineHeight: 1,
  },

  // Navigation row
  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1.75rem",
  },

  // Prev / Next
  navBtn: (disabled) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 22px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    background: "transparent",
    border: `1px solid ${disabled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)"}`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.35 : 1,
    transition: "background 0.2s, border-color 0.2s",
  }),

  // Dots + counter
  centerNav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  dotsRow: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  dotBtn: (active, color) => ({
    width: active ? "22px" : "7px",
    height: "7px",
    borderRadius: "999px",
    background: active ? color : "rgba(255,255,255,0.2)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.3s ease",
  }),
  counter: {
    fontSize: "12px",
    opacity: 0.35,
  },
};
// ─────────────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [hovered, setHovered] = useState(null); // "live" | "gh" | "prev" | "next"

  const project = PROJECTS[index];
  const atStart = index === 0;
  const atEnd = index === PROJECTS.length - 1;
  const isData = project.category === "data";

  const navigate = useCallback(
    (dir) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) =>
          dir === "next" ? Math.min(i + 1, PROJECTS.length - 1) : Math.max(i - 1, 0)
        );
        setAnimating(false);
      }, 220);
    },
    [animating]
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

  return (
    <section id="projects" style={S.section}>
      <h2 style={S.sectionTitle}>Projects</h2>

      {/* ── Card ── */}
      <div style={S.card(animating, direction)}>

        {/* Image */}
        <div style={S.imgWrap}>
          <img src={project.desktop} alt={project.title} style={S.img} />
        </div>

        {/* Info */}
        <div style={S.info}>

          {/* Badge */}
          <span style={S.badge(isData)}>
            {isData ? "Data Analyst Project" : "Full-Stack Project"}
          </span>

          {/* Title */}
          <div>
            <h3 style={S.title}>{project.title}</h3>
            <p style={S.subtitle}>{project.subtitle}</p>
          </div>

          {/* Description */}
          <p style={S.desc}>{project.description}</p>

          {/* Features */}
          <ul style={S.featureList}>
            {project.features.map((f) => (
              <li key={f} style={S.featureItem}>
                <span style={S.dot(project.color)} />
                {f}
              </li>
            ))}
          </ul>

          {/* Stack chips */}
          <div style={S.stackRow}>
            {project.stack.map((s) => (
              <span key={s} style={S.chip(project.color)}>{s}</span>
            ))}
          </div>

          {/* ── Link buttons ── */}
          <div style={S.linkRow}>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...S.liveBtn(project.color),
                  opacity: hovered === "live" ? 0.82 : 1,
                  transform: hovered === "live" ? "translateY(-1px)" : "none",
                }}
                onMouseEnter={() => setHovered("live")}
                onMouseLeave={() => setHovered(null)}
              >
                <FaExternalLinkAlt size={11} />
                Live Demo
              </a>
            )}

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              style={{
                ...S.githubBtn,
                color: "inherit",
                background: hovered === "gh" ? "rgba(255,255,255,0.07)" : "transparent",
                borderColor: hovered === "gh" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)",
              }}
              onMouseEnter={() => setHovered("gh")}
              onMouseLeave={() => setHovered(null)}
            >
              <FaGithub size={14} />
              GitHub
            </a>
          </div>

        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={S.navRow}>

        {/* Prev */}
        <button
          onClick={() => navigate("prev")}
          disabled={atStart}
          style={{
            ...S.navBtn(atStart),
            background: hovered === "prev" && !atStart ? "rgba(255,255,255,0.07)" : "transparent",
          }}
          onMouseEnter={() => setHovered("prev")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaChevronLeft size={13} />
          Previous
        </button>

        {/* Dots + counter */}
        <div style={S.centerNav}>
          <div style={S.dotsRow}>
            {PROJECTS.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={S.dotBtn(i === index, p.color)}
                aria-label={`Go to ${p.title}`}
              />
            ))}
          </div>
          <span style={S.counter}>{index + 1} / {PROJECTS.length}</span>
        </div>

        {/* Next */}
        <button
          onClick={() => navigate("next")}
          disabled={atEnd}
          style={{
            ...S.navBtn(atEnd),
            background: hovered === "next" && !atEnd ? "rgba(255,255,255,0.07)" : "transparent",
          }}
          onMouseEnter={() => setHovered("next")}
          onMouseLeave={() => setHovered(null)}
        >
          Next
          <FaChevronRight size={13} />
        </button>

      </div>
    </section>
  );
}