import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import P from "../assets/P.jpg";
import {
  FaDownload,
  FaGraduationCap,
  FaDatabase,
  FaLightbulb,
  FaFileAlt,
} from "react-icons/fa";

/* ───────── Data ───────── */
const STATS = [
  { value: "12+", label: "Projects Built" },
  { value: "1+", label: "Years Exp." },
  { value: "8+", label: "Tech Stacks" },
  { value: "240+", label: "DSA Solved" },
];

const EDUCATION = [
  {
    degree: "B.Tech in Information Technology",
    school: "RCC Institute of Information Technology, Kolkata",
    period: "2022 – 2026",
    grade: "CGPA: 6.80/10",
    color: "#8b5cf6",
  },
  {
    degree: "Higher Secondary (WBCHSE)",
    school: "Gourhati Haradas Institution, Kolkata",
    period: "2020 – 2022",
    grade: "88%",
    color: "#06b6d4",
  },
  {
    degree: "Secondary (WBBSE)",
    school: "Gourhati Haradas Institution, Kolkata",
    period: "2018 – 2020",
    grade: "87%",
    color: "#f43f5e",
  },
];

const SKILL_ITEMS = [
  "React.js & Next.js",
  "Node.js & Express.js",
  "TypeScript & JavaScript",
  "MongoDB & MySQL",
  "Redis & RabbitMQ",
  "Socket.IO & WebSockets",
  "Docker & CI/CD",
  "Stripe & Razorpay",
  "JWT & OAuth2",
  "Playwright & Jest",
  "AWS & Linux",
  "System Design",
];

const badgeClass = (i) =>
  `badge ${
    i % 4 === 1
      ? "badge-cyan"
      : i % 4 === 2
        ? "badge-rose"
        : i % 4 === 3
          ? "badge-amber"
          : ""
  }`;

/* ───────── Small heading used in every block ───────── */
function BlockTitle({ icon, children }) {
  return (
    <h3 className="about-block-title">
      {icon}
      <span>{children}</span>
      <span className="about-block-line" />
    </h3>
  );
}

/* ───────── Resume Page Navigation ───────── */
function ResumeButton({ className = "" }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/resume");
  };
  return (
    <button onClick={handleClick} className={`btn ${className}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <FaFileAlt size={14} /> View Resume ↗
    </button>
  );
}

/* ───────── About Section ───────── */
export default function About() {
  return (
    <section id="about" className="section about">

      <h2 className="section-title reveal">About Me</h2>

      {/* ═════════ ROW 1: Photo + Summary ═════════ */}
      <div className="about-top">
        {/* Photo */}
        <div className="about-photo reveal-left">
          <div className="relative inline-block">
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-5 h-5 ${cls}`}
                style={{ borderColor: "var(--violet)", borderWidth: "2px" }}
              />
            ))}
            <img
              src={P}
              alt="Suman Jhanp"
              className="rounded-xl object-cover"
              style={{
                width: "240px",
                height: "240px",
                border: "1px solid rgba(139,92,246,0.2)",
                boxShadow:
                  "0 0 32px rgba(139,92,246,0.15), 0 0 64px rgba(6,182,212,0.08)",
                margin: "8px",
              }}
            />
          </div>
          <h3 className="about-name">Suman Jhanp</h3>
          <p className="about-role">MERN Stack Developer</p>
        </div>

        {/* Summary + Stats + Buttons */}
        <div className="about-intro reveal-right">
          <div className="about-summary">
            <BlockTitle icon={<FaLightbulb size={16} />}>
              Professional Summary
            </BlockTitle>
            <p>
              Full-Stack Developer with backend-focused experience building web
              applications using{" "}
              <strong>
                MongoDB, Express.js, React.js, Node.js, and TypeScript
              </strong>
              . Skilled in RESTful API development, JWT authentication,
              role-based authorization, database design, real-time
              communication, payment integration, and cloud deployment. Strong
              foundation in Data Structures & Algorithms (240+ LeetCode), OOP,
              SQL, DBMS, Operating Systems, Computer Networks, Software
              Engineering, Docker, Linux, Git, and System Design.
            </p>
          </div>

          <div className="about-stats reveal-stagger">
            {STATS.map(({ value, label }) => (
              <div key={label} className="about-stat">
                <div className="text-xl font-black gradient-text">{value}</div>
                <div className="about-stat__label">{label}</div>
              </div>
            ))}
          </div>

          <div className="about-buttons">
            <ResumeButton />
            <a href="/Resume.pdf" download className="btn-outline">
              <FaDownload size={12} /> Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* ═════════ ROW 2: Education ═════════ */}
      <div className="about-block reveal">
        <BlockTitle icon={<FaGraduationCap size={16} />}>Education</BlockTitle>

        <div className="about-edu-grid reveal-stagger">
          {EDUCATION.map((edu) => (
            <div
              key={edu.degree}
              className="about-card"
              style={{ "--c": edu.color }}
            >
              <div className="about-card__line" />
              <div className="about-card__icon">
                <FaGraduationCap />
              </div>
              <h4 className="about-card__title">{edu.degree}</h4>
              <p className="about-card__school">{edu.school}</p>
              <div className="about-card__meta">
                <span className="about-card__period">{edu.period}</span>
                <span className="about-card__grade">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═════════ ROW 3: Tech Stack ═════════ */}
      <div className="about-block reveal">
        <BlockTitle icon={<FaDatabase size={16} />}>Tech Stack</BlockTitle>
        <div className="flex flex-wrap gap-2 reveal-stagger">
          {SKILL_ITEMS.map((skill, i) => (
            <span key={skill} className={badgeClass(i)}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ───────── Styles for this section ───────── */}
      <style>{`
        /* Row 1 */
        .about-top {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          align-items: start;
          margin-bottom: 48px;
        }
        .about-photo {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .about-name {
          margin: 16px 0 2px;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text);
        }
        .about-role {
          margin: 0;
          font-size: 0.8rem;
          color: var(--violet-light);
        }
        .about-intro {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about-summary {
          background: rgba(139,92,246,0.04);
          border: 1px solid rgba(139,92,246,0.1);
          border-radius: 16px;
          padding: 22px;
        }
        .about-summary p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        /* Stats */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .about-stat {
          text-align: center;
          padding: 14px 8px;
          border-radius: 14px;
          background: rgba(139,92,246,0.06);
          border: 1px solid rgba(139,92,246,0.12);
        }
        .about-stat__label {
          margin-top: 2px;
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        /* Buttons */
        .about-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Blocks (Education, Tech Stack) */
        .about-block {
          margin-bottom: 48px;
        }
        .about-block:last-of-type {
          margin-bottom: 0;
        }
        .about-block-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--violet-light);
        }
        .about-block-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(139,92,246,0.25), transparent);
        }

        /* Education cards */
        .about-edu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .about-card {
          position: relative;
          overflow: hidden;
          padding: 22px;
          border-radius: 16px;
          background: rgba(17,17,24,0.7);
          border: 1px solid color-mix(in srgb, var(--c) 12%, transparent);
          border: 1px solid var(--c);
          border-color: rgba(255,255,255,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
          transition: all 0.3s ease;
        }
        .about-card:hover {
          transform: translateY(-5px);
          border-color: var(--c);
          box-shadow: 0 0 24px rgba(0,0,0,0.5), 0 12px 40px rgba(0,0,0,0.5);
        }
        .about-card__line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--c), transparent);
        }
        .about-card__icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          border-radius: 10px;
          font-size: 1.1rem;
          color: var(--c);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--c);
        }
        .about-card__title {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.35;
          color: var(--text);
        }
        .about-card__school {
          margin: 6px 0 0;
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }
        .about-card__meta {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .about-card__period { color: var(--c); }
        .about-card__grade { color: var(--text-muted); }

        /* Responsive */
        @media (max-width: 900px) {
          .about-top { grid-template-columns: 1fr; gap: 32px; }
          .about-edu-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .about-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
