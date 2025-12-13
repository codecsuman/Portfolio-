import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Astra from "../assets/Astra.png";

/* ENV */
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    jobRole: "",
    budget: "",
    idea: "",
  });

  const [status, setStatus] = useState("");

  const update = (e) => {
    const { name, value } = e.target;

    // Budget: allow only numbers + ₹ $
    if (name === "budget" && !/^[₹$]?\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          type: form.type,
          job_role: form.jobRole || "N/A",
          budget: form.budget || "N/A",
          idea: form.idea || "N/A",
        },
        PUBLIC_KEY
      );

      setStatus("success");

      // 🔄 Auto refresh after success
      setTimeout(() => window.location.reload(), 1800);
    } catch {
      setStatus("error");
    }
  };

  /* Dynamic Astra glow */
  const glow =
    form.type === "Hire Me"
      ? "from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
      : "from-[#7f00ff] via-[#e100ff] to-[#ff6ec7]";

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-[#1cd8d2]/20 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#302b63]/30 blur-[220px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT – ASTRA */}
        <motion.div
          className="relative flex justify-center"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className={`absolute w-[520px] h-[520px] rounded-full bg-gradient-to-r ${glow} blur-[160px] opacity-40 transition-all duration-700`}
          />
          <img
            src={Astra}
            alt="Astra"
            className="relative max-w-[380px] drop-shadow-[0_0_80px_rgba(28,216,210,0.45)] select-none"
          />
        </motion.div>

        {/* RIGHT – FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] to-[#302b63]">
            Let’s Connect
          </h2>
          <p className="mt-4 mb-10 text-white/70">
            Hire me or discuss your next big idea.
          </p>

          <form
            onSubmit={submit}
            className="
              space-y-6 p-10 rounded-3xl
              bg-black/60 backdrop-blur-2xl
              border border-white/10
              shadow-[0_0_40px_rgba(0,0,0,0.6)]
            "
          >
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={update}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/20 focus:border-[#1cd8d2] outline-none"
            />

            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={update}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/20 focus:border-[#1cd8d2] outline-none"
            />

            {/* TYPE */}
            <div className="grid grid-cols-2 gap-4">
              {["Hire Me", "Discuss Project"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={`py-3 rounded-xl font-semibold transition
                    ${
                      form.type === t
                        ? "bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] text-black"
                        : "border border-white/20 hover:bg-white hover:text-black"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* CONDITIONAL */}
            <AnimatePresence>
              {form.type === "Hire Me" && (
                <motion.input
                  key="job"
                  name="jobRole"
                  placeholder="Job Role (e.g. Full Stack Developer)"
                  value={form.jobRole}
                  onChange={update}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/20"
                />
              )}

              {form.type === "Discuss Project" && (
                <motion.div
                  key="project"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <input
                    name="budget"
                    placeholder="Estimated Budget (₹ / $)"
                    value={form.budget}
                    onChange={update}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/20"
                  />
                  <textarea
                    name="idea"
                    rows="4"
                    placeholder="Describe your project idea"
                    value={form.idea}
                    onChange={update}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/20 resize-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={status === "sending"}
              className="
                w-full py-4 rounded-full font-semibold text-black
                bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
                hover:scale-[1.04] transition
              "
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-center">
                Message sent successfully 🚀
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center">
                Something went wrong ❌
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
