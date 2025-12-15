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
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer",
    review: "Clean, scalable code and perfect design implementation.",
    image: w1,
  },
  {
    name: "Amy Jacobson",
    role: "Tech Manager",
    review: "Handled everything professionally from start to deploy.",
    image: m2,
  },
  {
    name: "Carry Smith",
    role: "CTO, Innovate Labs",
    review: "Reliable full-stack developer with modern practices.",
    image: w2,
  },
];

/* ---------- CARD ---------- */
const TestimonialCard = ({ t }) => (
  <div
    className="
      flex gap-3 p-4
      rounded-xl
      bg-white/5 backdrop-blur-xl
      border border-white/10
      hover:border-emerald-400/30
      hover:shadow-emerald-400/20
      transition
    "
  >
    <img
      src={t.image}
      alt={t.name}
      className="
        w-10 h-10 rounded-full
        object-cover
        border border-white/20
        shrink-0
      "
    />

    <div>
      <p className="text-sm text-white/80 leading-snug">
        “{t.review}”
      </p>
      <p className="mt-1 text-xs text-white/60">
        {t.name} · {t.role}
      </p>
    </div>
  </div>
);

/* ---------- SECTION ---------- */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-20 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2
            className="
              text-3xl md:text-4xl font-bold
              text-transparent bg-clip-text
              bg-gradient-to-r from-emerald-400 to-sky-400
            "
          >
            Testimonials
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Feedback from professionals I’ve worked with
          </p>
        </div>

        {/* GRID — ALL VISIBLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
