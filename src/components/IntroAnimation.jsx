import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-600"
      style={{
        background: "linear-gradient(135deg, #020c1b 0%, #0a2a4a 50%, #0d3b2e 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Ripple rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${i * 120}px`,
            height: `${i * 120}px`,
            borderColor: `rgba(14, 165, 233, ${0.2 - i * 0.05})`,
            animation: `ping ${1 + i * 0.3}s cubic-bezier(0,0,0.2,1) infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      {/* Logo with glow */}
      <div className="relative z-10 mb-5">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #10b981)" }}
        />
        <img
          src={Logo}
          alt="Suman logo"
          className="relative z-10 rounded-full"
          style={{
            width: "72px",
            height: "72px",
            boxShadow: "0 0 32px rgba(14,165,233,0.6), 0 0 64px rgba(16,185,129,0.3)",
            animation: "scaleIn 0.6s ease forwards",
          }}
        />
      </div>

      {/* Name */}
      <h1
        className="text-2xl font-bold tracking-widest z-10"
        style={{
          background: "linear-gradient(90deg, #38bdf8, #34d399, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "fadeUp 0.6s ease 0.3s forwards",
          opacity: 0,
        }}
      >
        Suman Jhanp
      </h1>

      {/* Role */}
      <p
        className="text-sm mt-2 z-10 tracking-widest uppercase"
        style={{
          color: "#7ecfcf",
          animation: "fadeUp 0.6s ease 0.5s forwards",
          opacity: 0,
        }}
      >
        MERN Developer &amp; Data Analyst
      </p>

      {/* Loading bar */}
      <div
        className="mt-8 z-10 rounded-full overflow-hidden"
        style={{
          width: "160px",
          height: "3px",
          background: "rgba(14,165,233,0.15)",
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #0ea5e9, #10b981)",
            animation: "loadBar 1.8s ease forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes ping {
          0%   { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}