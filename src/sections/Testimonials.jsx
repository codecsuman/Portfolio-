import { motion, useReducedMotion } from "framer-motion";
import { FaStar } from "react-icons/fa";

import m1 from "../assets/m1.PNG";
import m2 from "../assets/m2.PNG";
import w1 from "../assets/w1.PNG";
import w2 from "../assets/w2.PNG";

/* ---------- DATA ---------- */
const TESTIMONIALS = [
  {
    name: "Yash Sahu",
    role: "Software Engineer, HCL",
    review: "Strong MERN skills with great problem-solving ability.",
    image: m1,
    rating: 5,
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer",
    review: "Clean, scalable code and perfect design implementation.",
    image: w1,
    rating: 5,
  },
  {
    name: "Amy Jacobson",
    role: "Tech Manager",
    review: "Handled everything professionally from start to deploy.",
    image: m2,
    rating: 4,
  },
  {
    name: "Carry Smith",
    role: "CTO, Innovate Labs",
    review: "Reliable full-stack developer with modern practices.",
    image: w2,
    rating: 5,
  },
];

/* ---------- CARD ---------- */
function TestimonialCard({ t, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
      className="
        flex gap-4 p-5
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition
      "
    >
      {/* Avatar */}
      <img
        src={t.image}
        alt={t.name}
        className="
          w-12 h-12 rounded-full
          object-cover
          border border-white/20
          shrink-0
        "
      />

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          “{t.review}”
        </p>

        {/* Stars */}
        <div className="flex gap-1 mt-2 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={14}
              className={i < t.rating ? "opacity-100" : "opacity-25"}
            />
          ))}
        </div>

        <p className="mt-2 text-xs sm:text-sm text-white/60">
          <span className="font-semibold text-white/80">
            {t.name}
          </span>{" "}
          · {t.role}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- SECTION ---------- */
export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-[#020617] text-white overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-emerald-500/20 blur-[160px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[420px] h-[420px] bg-sky-500/20 blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="
              text-3xl sm:text-4xl font-bold
              text-transparent bg-clip-text
              bg-gradient-to-r from-emerald-400 to-sky-400
            "
          >
            Testimonials
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Feedback from professionals I’ve worked with
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              t={t}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
