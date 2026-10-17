import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.webp";

/* ───────── Settings (easy to change) ───────── */
const NAME = "Suman Jhanp";
const ROLE = "MERN Developer & Data Analyst";
const SHOW_ONCE_PER_SESSION = true; // set false to show on every refresh
const FADE_START = 2400; // ms: when the exit starts
const FADE_TIME = 700; // ms: how long the exit takes
const STORAGE_KEY = "intro-seen";

/* ───────── Helpers ───────── */
// Mix two colors so the name goes from violet to cyan
const FROM = [167, 139, 250]; // #a78bfa
const TO = [103, 232, 249]; // #67e8f9
const letterColor = (t) =>
  `rgb(${FROM.map((v, i) => Math.round(v + (TO[i] - v) * t)).join(",")})`;

const alreadySeen = () => {
  if (!SHOW_ONCE_PER_SESSION) return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

// Small floating dots in the background (fixed positions = no random re-render)
const DOTS = [
  { x: 12, y: 22, s: 4, d: 0.0 },
  { x: 24, y: 70, s: 3, d: 0.4 },
  { x: 38, y: 14, s: 3, d: 0.8 },
  { x: 62, y: 82, s: 4, d: 0.2 },
  { x: 78, y: 18, s: 3, d: 0.6 },
  { x: 88, y: 62, s: 4, d: 1.0 },
  { x: 8, y: 52, s: 3, d: 1.2 },
  { x: 92, y: 36, s: 3, d: 0.3 },
];

export default function Intro() {
  const [visible, setVisible] = useState(() => !alreadySeen());
  const [fadeOut, setFadeOut] = useState(false);
  const timers = useRef([]);

  const finish = useCallback(() => {
    setFadeOut((already) => {
      if (already) return already;
      timers.current.push(
        setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        }, FADE_TIME),
      );
      return true;
    });
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Lock page scroll while the intro is on screen
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Shorter intro if the user prefers less motion
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    timers.current.push(setTimeout(finish, reduce ? 600 : FADE_START));

    return () => {
      document.body.style.overflow = previous;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [visible, finish]);

  if (!visible) return null;

  const letters = NAME.split("");

  return (
    <div
      className={`intro ${fadeOut ? "intro--out" : ""}`}
      onClick={finish}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Soft background glows */}
      <div className="intro__bg intro__bg--violet" />
      <div className="intro__bg intro__bg--cyan" />

      {/* Floating dots */}
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="intro__dot"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            animationDelay: `${d.d}s`,
          }}
        />
      ))}

      {/* Center content */}
      <div className="intro__center">
        {/* Logo area */}
        <div className="intro__logo-wrap">
          <span className="intro__ring intro__ring--1" />
          <span className="intro__ring intro__ring--2" />
          <span className="intro__ring intro__ring--3" />
          <span className="intro__glow" />
          <span className="intro__spinner" />
          <img src={Logo} alt="Suman logo" className="intro__logo" />
        </div>

        {/* Name: letter by letter */}
        <h1 className="intro__name" aria-label={NAME}>
          {letters.map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="intro__letter"
              style={{
                color: letterColor(i / (letters.length - 1)),
                animationDelay: `${0.45 + i * 0.045}s`,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        {/* Role */}
        <p className="intro__role">{ROLE}</p>

        {/* Loading bar */}
        <div className="intro__bar">
          <div className="intro__bar-fill" />
        </div>
      </div>

      <p className="intro__skip">Click anywhere to skip</p>

      <style>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0a0a0f;
          opacity: 1;
          cursor: pointer;
          transition: opacity ${FADE_TIME}ms ease, transform ${FADE_TIME}ms ease;
        }
        .intro--out {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        /* Background glows (static gradients = cheap to draw) */
        .intro__bg {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: introDrift 6s ease-in-out infinite alternate;
          will-change: transform;
        }
        .intro__bg--violet {
          top: -20%;
          left: 15%;
          width: 70vmax;
          height: 70vmax;
          background: radial-gradient(circle, rgba(139,92,246,0.16), transparent 60%);
        }
        .intro__bg--cyan {
          bottom: -25%;
          right: 5%;
          width: 60vmax;
          height: 60vmax;
          background: radial-gradient(circle, rgba(6,182,212,0.13), transparent 60%);
          animation-delay: -3s;
        }

        /* Floating dots */
        .intro__dot {
          position: absolute;
          border-radius: 50%;
          background: #a78bfa;
          opacity: 0;
          animation: introFloat 3s ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* Center column */
        .intro__center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 20px;
        }

        /* Logo */
        .intro__logo-wrap {
          position: relative;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 26px;
        }
        .intro__logo {
          position: relative;
          z-index: 3;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 32px rgba(139,92,246,0.5), 0 0 64px rgba(6,182,212,0.25);
          animation: introPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .intro__glow {
          position: absolute;
          inset: -30px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.55), rgba(6,182,212,0.2) 55%, transparent 72%);
          animation: introPulse 2s ease-in-out infinite;
          will-change: transform, opacity;
        }
        /* Rotating gradient ring around the logo */
        .intro__spinner {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0 55%, #8b5cf6 80%, #06b6d4 100%);
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
                  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
          animation: introSpin 1.4s linear infinite;
          will-change: transform;
        }
        /* Expanding rings */
        .intro__ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(139,92,246,0.35);
          opacity: 0;
          animation: introRing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
          will-change: transform, opacity;
        }
        .intro__ring--2 { animation-delay: 0.6s; }
        .intro__ring--3 { animation-delay: 1.2s; }

        /* Name */
        .intro__name {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin: 0;
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          font-weight: 800;
          letter-spacing: 0.12em;
        }
        .intro__letter {
          display: inline-block;
          opacity: 0;
          animation: introLetter 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        /* Role */
        .intro__role {
          margin: 10px 0 0;
          font-size: 0.78rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-secondary, #a1a1aa);
          opacity: 0;
          animation: introFadeUp 0.7s ease 1.1s forwards;
        }

        /* Loading bar (uses scaleX = smooth, no layout work) */
        .intro__bar {
          width: 170px;
          height: 3px;
          margin-top: 32px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(139,92,246,0.14);
          opacity: 0;
          animation: introFadeUp 0.5s ease 0.8s forwards;
        }
        .intro__bar-fill {
          width: 100%;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #8b5cf6, #06b6d4);
          transform: scaleX(0);
          transform-origin: left;
          animation: introBar 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.8s forwards;
          will-change: transform;
        }

        /* Skip hint */
        .intro__skip {
          position: absolute;
          bottom: 28px;
          left: 0;
          right: 0;
          margin: 0;
          text-align: center;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--text-muted, #71717a);
          opacity: 0;
          animation: introFadeUp 0.6s ease 1.4s forwards;
        }

        /* Keyframes (only transform + opacity = GPU friendly) */
        @keyframes introPop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes introLetter {
          from { transform: translateY(22px) scale(0.9); opacity: 0; }
          to   { transform: translateY(0)    scale(1);   opacity: 1; }
        }
        @keyframes introFadeUp {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes introBar {
          to { transform: scaleX(1); }
        }
        @keyframes introSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes introPulse {
          0%, 100% { transform: scale(0.9); opacity: 0.6; }
          50%      { transform: scale(1.1); opacity: 1; }
        }
        @keyframes introRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes introFloat {
          0%   { transform: translateY(0);     opacity: 0; }
          30%  { opacity: 0.7; }
          100% { transform: translateY(-40px); opacity: 0; }
        }
        @keyframes introDrift {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(30px, 20px, 0); }
        }

        /* Respect "reduce motion" setting */
        @media (prefers-reduced-motion: reduce) {
          .intro__bg, .intro__dot, .intro__ring,
          .intro__glow, .intro__spinner {
            animation: none;
          }
          .intro__dot, .intro__ring { display: none; }
        }
      `}</style>
    </div>
  );
}
