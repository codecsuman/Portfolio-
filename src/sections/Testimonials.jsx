import { motion } from "framer-motion";
import { useState } from "react";

import m1 from "../assets/m1.PNG";
import m2 from "../assets/m2.PNG";
import w1 from "../assets/w1.PNG";
import w2 from "../assets/w2.PNG";

/* ---------- TESTIMONIAL DATA ---------- */
const testimonials = [
  {
    name: "Yash Sahu",
    role: "Software Engineer, HCL Technologies",
    review:
      "Suman is a highly skilled full-stack developer. His problem-solving ability and attention to detail made our project smooth and successful.",
    image: m1,
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer, PixelWorks",
    review:
      "Working with Suman was a pleasure. He perfectly translates design into scalable, high-performance code.",
    image: w1,
  },
  {
    name: "Amy Jacobson",
    role: "Tech Manager, CodeEmpire",
    review:
      "From planning to deployment, Suman handled everything professionally. His MERN stack expertise is impressive.",
    image: m2,
  },
  {
    name: "Carry Smith",
    role: "CTO, Innovate Labs",
    review:
      "Suman transformed our platform with clean architecture and modern UI. Highly reliable full-stack developer.",
    image: w2,
  },
];

const marquee = [...testimonials, ...testimonials];

/* ---------- TESTIMONIAL CARD ---------- */
const TestimonialCard = ({ t }) => (
  <motion.div
    whileHover={{ scale: 1.06, y: -6 }}
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="
      relative min-w-[320px] max-w-[320px]
      rounded-2xl bg-white/[0.06]
      backdrop-blur-xl p-6
      border border-white/[0.1]
      shadow-[0_0_40px_-15px_rgba(28,216,210,0.45)]
    "
  >
    {/* Glow */}
    <motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      animate={{ opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(circle at center, rgba(28,216,210,0.35), transparent 70%)",
      }}
    />

    <div className="relative flex flex-col gap-4">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <img
          src={t.image}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover
            border border-white/20"
        />
        <div>
          <h4 className="font-semibold text-white">{t.name}</h4>
          <p className="text-sm text-white/60">{t.role}</p>
        </div>
      </div>

      {/* Review */}
      <p className="text-sm text-white/80 leading-relaxed">
        “{t.review}”
      </p>
    </div>
  </motion.div>
);

/* ---------- TESTIMONIALS SECTION ---------- */
export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="testimonials"
      className="relative w-full py-28 bg-black text-white overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px]
          bg-cyan-400/20 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px]
          bg-purple-600/20 blur-[180px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-14 px-6">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent
          bg-gradient-to-r from-[#1cd8d2] to-[#302b63]">
          Testimonials
        </h2>
        <p className="mt-3 text-white/70">
          What professionals say about working with me
        </p>
      </div>

      {/* Auto-scroll marquee */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex gap-10 px-6 will-change-transform"
          animate={paused ? {} : { x: ["0%", "-50%"] }}
          transition={{
            duration: 42,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marquee.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
