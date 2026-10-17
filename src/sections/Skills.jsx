import { useEffect, useRef, useState } from "react";
import { LIGHT_EFFECTS } from "../utils/perf";

const light = LIGHT_EFFECTS;

/* ───────── Icon helpers ───────── */
const icon = (id) => `https://skillicons.dev/icons?i=${id}`;
const si = (slug) => `https://cdn.simpleicons.org/${slug}/ffffff`;
const mix = (slug) => `https://api.iconify.design/simple-icons:${slug}.svg?color=%23ffffff`;
const mdi = (name) => `https://api.iconify.design/mdi:${name}.svg?color=%23ffffff`;
const devicon = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

/* ───────── Official free / open-source documentation links ───────── */
const DOCS = {
  "React.js": "https://react.dev/learn",
  TypeScript: "https://www.typescriptlang.org/docs/handbook/intro.html",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  "Tailwind CSS": "https://tailwindcss.com/docs",
  HTML5: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  CSS3: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "Redux Toolkit": "https://redux-toolkit.js.org/introduction/getting-started",
  Vite: "https://vite.dev/guide",
  "Node.js": "https://nodejs.org/docs/latest/api",
  "Express.js": "https://expressjs.com/en/starter/installing.html",
  NestJS: "https://docs.nestjs.com",
  "REST APIs": "https://developer.mozilla.org/en-US/docs/Web/HTTP",
  "JWT Auth": "https://jwt.io/introduction",
  WebSockets: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  "Socket.IO": "https://socket.io/docs/v4",
  MongoDB: "https://www.mongodb.com/docs/manual",
  Mongoose: "https://mongoosejs.com/docs/guide.html",
  MySQL: "https://dev.mysql.com/doc/refman/en",
  PostgreSQL: "https://www.postgresql.org/docs/current",
  Redis: "https://redis.io/docs/latest/develop",
  SQLite: "https://www.sqlite.org/docs.html",
  Docker: "https://docs.docker.com/get-started",
  Kubernetes: "https://kubernetes.io/docs/tutorials",
  AWS: "https://docs.aws.amazon.com/index.html",
  Vercel: "https://vercel.com/docs",
  Render: "https://render.com/docs",
  Linux: "https://www.kernel.org/doc/html/latest",
  Git: "https://git-scm.com/doc",
  "GitHub Actions": "https://docs.github.com/en/actions",
  Nginx: "https://nginx.org/en/docs",
  Jenkins: "https://www.jenkins.io/doc",
  CircleCI: "https://circleci.com/docs",
  "GitLab CI": "https://docs.gitlab.com/ci",
  "Azure DevOps": "https://learn.microsoft.com/en-us/azure/devops",
  ArgoCD: "https://argo-cd.readthedocs.io/en/stable",
  RabbitMQ: "https://www.rabbitmq.com/tutorials",
  OAuth2: "https://oauth.net/2",
  Bcrypt: "https://github.com/kelektiv/node.bcrypt.js",
  "Rate Limiting": "https://github.com/expressjs/express-rate-limit",
  Playwright: "https://playwright.dev/docs/intro",
  "React Testing Library":
    "https://testing-library.com/docs/react-testing-library/intro",
  Python: "https://docs.python.org/3/tutorial",
  Pandas: "https://pandas.pydata.org/docs/user_guide/index.html",
  NumPy: "https://numpy.org/doc/stable/user/index.html",
  Matplotlib: "https://matplotlib.org/stable/tutorials/index.html",
  Plotly: "https://plotly.com/python/getting-started",
  "Power BI":
    "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-what-is-desktop",
  Excel: "https://support.microsoft.com/en-us/excel",
  Jupyter: "https://docs.jupyter.org/en/latest",
  SQL: "https://www.sqlite.org/lang.html",
  Stripe: "https://docs.stripe.com",
  Razorpay: "https://razorpay.com/docs",
  Cloudinary: "https://cloudinary.com/documentation",
  Multer: "https://github.com/expressjs/multer",
  DSA: "https://cp-algorithms.com",
  "System Design": "https://github.com/donnemartin/system-design-primer",
  OOP: "https://docs.oracle.com/javase/tutorial/java/concepts",
  "OS & CN": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
  "Software Eng": "https://abseil.io/resources/swe-book",
  DBMS: "https://dev.mysql.com/doc/refman/en",
};

/* ───────── Data ───────── */
const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    emoji: "🎨",
    color: "#06b6d4",
    items: [
      { name: "React.js", logo: icon("react") },
      { name: "TypeScript", logo: icon("ts") },
      { name: "JavaScript", logo: icon("js") },
      { name: "Tailwind CSS", logo: icon("tailwind") },
      { name: "HTML5", logo: icon("html") },
      { name: "CSS3", logo: icon("css") },
      { name: "Redux Toolkit", logo: icon("redux") },
      { name: "Vite", logo: icon("vite") },
    ],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    color: "#f43f5e",
    items: [
      { name: "Node.js", logo: icon("nodejs") },
      { name: "Express.js", logo: icon("express") },
      { name: "NestJS", logo: icon("nestjs") },
      { name: "REST APIs", logo: icon("postman") },
      { name: "JWT Auth", logo: si("jsonwebtokens") },
      { name: "WebSockets", logo: mdi("lan-connect") },
      { name: "Socket.IO", logo: si("socketdotio") },
    ],
  },
  {
    title: "Databases & Caching",
    emoji: "🗄️",
    color: "#f59e0b",
    items: [
      { name: "MongoDB", logo: icon("mongodb") },
      { name: "Mongoose", logo: si("mongoose") },
      { name: "MySQL", logo: icon("mysql") },
      { name: "PostgreSQL", logo: icon("postgresql") },
      { name: "Redis", logo: icon("redis") },
      { name: "SQLite", logo: icon("sqlite") },
    ],
  },
  {
    title: "DevOps & Cloud",
    emoji: "☁️",
    color: "#10b981",
    items: [
      { name: "Docker", logo: icon("docker") },
      { name: "Kubernetes", logo: icon("kubernetes") },
      { name: "AWS", logo: icon("aws") },
      { name: "Vercel", logo: icon("vercel") },
      { name: "Render", logo: si("render") },
      { name: "Linux", logo: icon("linux") },
      { name: "Git", logo: icon("git") },
      { name: "GitHub Actions", logo: icon("githubactions") },
      { name: "Nginx", logo: icon("nginx") },
      { name: "Jenkins", logo: si("jenkins") },
      { name: "CircleCI", logo: si("circleci") },
      { name: "GitLab CI", logo: si("gitlab") },
      { name: "Azure DevOps", logo: mix("azuredevops") },
      { name: "ArgoCD", logo: si("argo") },
    ],
  },
  {
    title: "Messaging & Security",
    emoji: "🔐",
    color: "#ec4899",
    items: [
      { name: "RabbitMQ", logo: si("rabbitmq") },
      { name: "OAuth2", logo: si("auth0") },
      { name: "Bcrypt", logo: mdi("shield-lock") },
      { name: "Rate Limiting", logo: mdi("speedometer") },
    ],
  },
  {
    title: "Testing & Quality",
    emoji: "✅",
    color: "#8b5cf6",
    items: [
      { name: "Playwright", logo: mix("playwright") },
      { name: "React Testing Library", logo: si("testinglibrary") },
    ],
  },
  {
    title: "Data Analysis",
    emoji: "📊",
    color: "#22c55e",
    items: [
      { name: "Python", logo: icon("python") },
      { name: "Pandas", logo: si("pandas") },
      { name: "NumPy", logo: si("numpy") },
      { name: "Matplotlib", logo: devicon("matplotlib") },
      { name: "Plotly", logo: si("plotly") },
      { name: "Power BI", logo: mix("powerbi") },
      { name: "Excel", logo: mix("microsoftexcel") },
      { name: "Jupyter", logo: si("jupyter") },
      { name: "SQL", logo: icon("sqlite") },
    ],
  },
  {
    title: "Payments & Media",
    emoji: "💳",
    color: "#f97316",
    items: [
      { name: "Stripe", logo: si("stripe") },
      { name: "Razorpay", logo: si("razorpay") },
      { name: "Cloudinary", logo: si("cloudinary") },
      { name: "Multer", logo: icon("nodejs") },
    ],
  },
  {
    title: "Core CS",
    emoji: "🧠",
    color: "#6366f1",
    items: [
      { name: "DSA", logo: si("leetcode") },
      { name: "System Design", logo: mdi("sitemap") },
      { name: "OOP", logo: icon("java") },
      { name: "DBMS", logo: icon("mysql") },
      { name: "OS & CN", logo: icon("linux") },
      { name: "Software Eng", logo: icon("github") },
    ],
  },
];

/* ───────── Scroll animation hook ───────── */
function useInView(threshold = 0.1, rootMargin = "0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/* ───────── Single logo ───────── */
function SkillLogo({ name, logo, animate, index }) {
  const [failed, setFailed] = useState(false);
  const showImage = logo && !failed;
  const docs = DOCS[name];

  const content = (
    <>
      <div className="skill-logo__box">
        {showImage ? (
          <img
            src={logo}
            alt={name}
            className="skill-logo__img"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="skill-logo__fallback">{name.charAt(0)}</span>
        )}
      </div>
      <span className="skill-logo__name">{name}</span>
    </>
  );

  return (
    <div
      className={`skill-logo ${animate ? "is-visible" : ""} ${
        docs ? "skill-logo--link" : ""
      }`}
      style={{ transitionDelay: `${index * 0.05}s` }}
      title={name}
    >
      {docs ? (
        <a
          href={docs}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} documentation (opens in new tab)`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

/* ───────── Category card ───────── */
function SkillCategory({ group, animate }) {
  const c = group.color;

  const vars = {
    "--accent": c,
    "--accent-bg": `${c}12`,
    "--accent-border": `${c}25`,
    "--accent-card-border": `${c}18`,
    "--accent-card-border-hover": `${c}40`,
    "--accent-glow": `${c}18`,
    "--accent-corner": `${c}12`,
    "--accent-icon-bg": `${c}15`,
    "--accent-icon-border": `${c}30`,
  };

  return (
    <div className="skill-card" style={vars}>
      <div className="skill-card__line" />
      <div className="skill-card__glow" />

      <div className="skill-card__header">
        <div className="skill-card__emoji">{group.emoji}</div>
        <div>
          <h3 className="skill-card__title">{group.title}</h3>
          <p className="skill-card__count">{group.items.length} technologies</p>
        </div>
      </div>

      <div className="skill-card__grid">
        {group.items.map((item, i) => (
          <SkillLogo
            key={item.name}
            name={item.name}
            logo={item.logo}
            animate={animate}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────── Main section ───────── */
export default function Skills() {
  const [ref, inView] = useInView(0, "0px 0px -10% 0px");

  return (
    <section id="skills" className="section skills" ref={ref}>
      {!light && (
        <div className="skills__glows">
          <div className="skills__glow skills__glow--purple" />
          <div className="skills__glow skills__glow--pink" />
          <div className="skills__glow skills__glow--cyan" />
        </div>
      )}

      <div className="skills__content">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          Technologies & tools I work with across full-stack development,
          DevOps, data analysis & system design
        </p>

        <div className="skills__grid">
          {SKILL_CATEGORIES.map((group) => (
            <SkillCategory key={group.title} group={group} animate={inView} />
          ))}
        </div>

        <p className="skills__note">
          Click any skill to open its official documentation ↗
        </p>
      </div>

      <style>{`
        .skills { position: relative; }
        .skills__content { position: relative; z-index: 1; }
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skills__note {
          margin-top: 40px;
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted, #71717a);
        }

        /* Background glows */
        .skills__glows {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 0; overflow: hidden;
        }
        .skills__glow { position: absolute; filter: blur(50px); }
        .skills__glow--purple {
          top: -60px; left: 20%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(139,92,246,0.07), transparent 70%);
        }
        .skills__glow--pink {
          bottom: -40px; right: 10%; width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(236,72,153,0.06), transparent 70%);
        }
        .skills__glow--cyan {
          top: 50%; left: 5%; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%);
        }

        /* Category card (backdrop blur skipped on phones/low-end devices) */
        .skill-card {
          position: relative; overflow: hidden;
          padding: 24px; border-radius: 18px;
          background: ${light ? "rgba(18,18,26,0.97)" : "rgba(17,17,24,0.7)"};
          border: 1px solid var(--accent-card-border);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          ${light
            ? ""
            : "-webkit-backdrop-filter: blur(12px);\n          backdrop-filter: blur(12px);"}
          transition: all 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-card-border-hover);
          box-shadow: 0 0 32px var(--accent-glow), 0 12px 40px rgba(0,0,0,0.5);
        }
        .skill-card__line {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          opacity: 0.5;
        }
        .skill-card__glow {
          position: absolute; top: -40px; right: -40px;
          width: 140px; height: 140px; border-radius: 50%;
          background: radial-gradient(circle, var(--accent-corner), transparent 70%);
          pointer-events: none;
        }
        .skill-card__header {
          position: relative;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .skill-card__emoji {
          width: 42px; height: 42px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; border-radius: 12px;
          background: var(--accent-icon-bg);
          border: 1px solid var(--accent-icon-border);
        }
        .skill-card__title {
          margin: 0; font-size: 0.85rem; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--accent);
        }
        .skill-card__count {
          margin: 1px 0 0; font-size: 0.65rem;
          color: #9d9db5;
        }
        .skill-card__grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 12px;
        }

        /* Single logo */
        .skill-logo {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; cursor: default;
          opacity: 0; transform: translateY(15px);
          transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1),
                      transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .skill-logo.is-visible { opacity: 1; transform: translateY(0); }
        .skill-logo--link { cursor: pointer; }
        .skill-logo--link > a {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; text-decoration: none; color: inherit;
          border-radius: 10px;
        }
        .skill-logo--link:hover .skill-logo__name { color: var(--accent); }
        .skill-logo--link > a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .skill-logo__box {
          position: relative; width: 60px; height: 60px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; border-radius: 14px;
          background: var(--accent-bg);
          border: 1px solid var(--accent-border);
          transition: all 0.3s ease;
        }
        .skill-logo__box::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(circle at center, var(--accent-glow), transparent 70%);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .skill-logo:hover .skill-logo__box::before { opacity: 1; }
        .skill-logo:hover .skill-logo__box { border-color: var(--accent); }
        .skill-logo__img {
          position: relative; z-index: 1;
          width: 32px; height: 32px; object-fit: contain;
          transition: transform 0.3s ease;
        }
        .skill-logo:hover .skill-logo__img { transform: scale(1.15); }
        .skill-logo__fallback {
          position: relative; z-index: 1;
          font-size: 1.1rem; font-weight: 700; color: var(--accent);
        }
        .skill-logo__name {
          max-width: 100%;
          text-align: center;
          font-size: 0.7rem; font-weight: 500;
          line-height: 1.25;
          color: #b3b3cc;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .skills__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .skills__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}