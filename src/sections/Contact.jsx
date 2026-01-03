import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Astra from "../assets/Astra.png";

/* ---------- ENV ---------- */
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

/* ---------- HELPERS ---------- */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = {
  name: "",
  email: "",
  type: "",
  jobRole: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const isEmailValid = emailRegex.test(form.email);

  const canSubmit = useMemo(() => {
    if (!form.name || !isEmailValid || !form.type) return false;
    if (form.type === "Hire Me" && !form.jobRole) return false;
    return status !== "sending";
  }, [form, isEmailValid, status]);

  /* ---------- HANDLERS ---------- */
  const update = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          inquiry_type: form.type,
          job_role: form.jobRole || "N/A",
          budget: form.budget || "N/A",
          message: form.message || "N/A",
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setTimeout(() => {
        setForm(INITIAL_FORM);
        setStatus("idle");
      }, 2500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden bg-[#020617] text-white"
    >
      {/* 🌌 BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-sky-500/20 blur-[180px]" />
        <div className="absolute top-1/3 right-[-20%] w-[520px] h-[520px] bg-emerald-500/25 blur-[180px]" />
        <div className="absolute bottom-[-30%] left-1/3 w-[520px] h-[520px] bg-purple-500/20 blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="relative flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="
              absolute w-[480px] h-[480px] rounded-full
              bg-gradient-to-br from-sky-400/30 via-emerald-400/25 to-purple-500/30
              blur-[160px]
            "
          />
          <img
            src={Astra}
            alt="Contact"
            className="relative max-w-[380px] select-none"
          />
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="
            text-4xl md:text-5xl font-bold
            text-transparent bg-clip-text
            bg-gradient-to-r from-sky-400 via-emerald-400 to-purple-400
          ">
            Let’s Connect
          </h2>

          <p className="mt-4 text-white/70 max-w-md">
            Hire me or discuss your next product or business idea.
          </p>

          <form
            onSubmit={submit}
            className="mt-10 space-y-5 p-8 bg-[#020617]/90 border border-white/15 shadow-2xl"
          >
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={update}
              required
              className="w-full px-4 py-3 bg-black/60 border border-white/20"
            />

            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={update}
              required
              className={`w-full px-4 py-3 bg-black/60 border ${form.email && !isEmailValid
                ? "border-red-500"
                : "border-white/20"
                }`}
            />

            {/* TYPE BUTTONS */}
            <div className="grid grid-cols-2 gap-3">
              {["Hire Me", "Discuss Project"].map((t) => (
                <motion.button
                  key={t}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setForm((p) => ({ ...p, type: t }))}
                  className={`py-2.5 font-semibold border transition ${form.type === t
                    ? "bg-gradient-to-r from-sky-400 to-emerald-400 text-black"
                    : "border-white/20 hover:bg-white hover:text-black"
                    }`}
                >
                  {t}
                </motion.button>
              ))}
            </div>

            {form.type === "Hire Me" && (
              <input
                name="jobRole"
                placeholder="Job Role"
                value={form.jobRole}
                onChange={update}
                className="w-full px-4 py-3 bg-black/60 border border-white/20"
              />
            )}

            {form.type === "Discuss Project" && (
              <>
                <input
                  name="budget"
                  placeholder="Estimated Budget"
                  value={form.budget}
                  onChange={update}
                  className="w-full px-4 py-3 bg-black/60 border border-white/20"
                />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Describe your project"
                  value={form.message}
                  onChange={update}
                  className="w-full px-4 py-3 bg-black/60 border border-white/20 resize-none"
                />
              </>
            )}

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={!canSubmit}
              className="
                w-full py-3 font-semibold text-black
                bg-gradient-to-r from-sky-400 via-emerald-400 to-purple-400
                shadow-lg hover:shadow-emerald-400/40
                disabled:opacity-40
              "
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>

            {/* LOADING */}
            {status === "sending" && (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* SUCCESS */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-400 text-center text-3xl"
                >
                  ✔ Message Sent
                </motion.div>
              )}
            </AnimatePresence>

            {status === "error" && (
              <p className="text-red-400 text-center text-sm">
                Something went wrong. Try again.
              </p>
            )}
          </form>

          {/* WHATSAPP CTA */}
          <motion.a
            href="https://wa.me/918597376239"
            target="_blank"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              mt-6 inline-flex items-center gap-2
              px-6 py-3 rounded-full
              bg-green-500 text-black font-semibold
              shadow-lg shadow-green-500/40
            "
          >
            <FaWhatsapp size={18} /> Chat on WhatsApp
          </motion.a>
        </div>
      </div>
    </section>
  );
}
