import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
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
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden bg-[#020617] text-white"
    >
      {/* 🌌 MULTI-COLOR BACKGROUND EFFECT */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-sky-500/20 blur-[180px]" />
        <div className="absolute top-1/3 right-[-20%] w-[520px] h-[520px] rounded-full bg-emerald-500/25 blur-[180px]" />
        <div className="absolute bottom-[-30%] left-1/3 w-[520px] h-[520px] rounded-full bg-purple-500/20 blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* ---------- LEFT : VISUAL ---------- */}
        <div className="relative flex justify-center">
          <div
            className="
              absolute w-[480px] h-[480px]
              rounded-full
              bg-gradient-to-br
              from-sky-400/30
              via-emerald-400/25
              to-purple-500/30
              blur-[160px]
            "
          />
          <img
            src={Astra}
            alt="Contact Illustration"
            className="relative max-w-[380px] select-none"
          />
        </div>

        {/* ---------- RIGHT : FORM ---------- */}
        <div>
          <h2
            className="
              text-4xl md:text-5xl font-bold
              text-transparent bg-clip-text
              bg-gradient-to-r from-sky-400 via-emerald-400 to-purple-400
            "
          >
            Let’s Connect
          </h2>

          <p className="mt-4 text-white/70 max-w-md">
            Hire me or discuss your next product or business idea.
          </p>

          <form
            onSubmit={submit}
            className="
              mt-10 space-y-5
              p-8
              bg-[#020617]/90
              border border-white/15
              shadow-2xl
            "
          >
            {/* Name */}
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={update}
              required
              className="
                w-full px-4 py-3
                bg-black/60
                border border-white/20
                outline-none
              "
            />

            {/* Email */}
            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={update}
              required
              className={`
                w-full px-4 py-3
                bg-black/60
                border outline-none
                ${form.email && !isEmailValid ? "border-red-500" : "border-white/20"}
              `}
            />

            {/* TYPE */}
            <div className="grid grid-cols-2 gap-3">
              {["Hire Me", "Discuss Project"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: t }))}
                  className={`
                    py-2.5 font-semibold text-sm
                    border transition
                    ${
                      form.type === t
                        ? "bg-gradient-to-r from-sky-400 to-emerald-400 text-black"
                        : "border-white/20 hover:bg-white hover:text-black"
                    }
                  `}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* CONDITIONAL */}
            {form.type === "Hire Me" && (
              <input
                name="jobRole"
                placeholder="Job Role (e.g. Frontend Developer)"
                value={form.jobRole}
                onChange={update}
                className="
                  w-full px-4 py-3
                  bg-black/60
                  border border-white/20
                "
              />
            )}

            {form.type === "Discuss Project" && (
              <>
                <input
                  name="budget"
                  placeholder="Estimated Budget (optional)"
                  value={form.budget}
                  onChange={update}
                  className="
                    w-full px-4 py-3
                    bg-black/60
                    border border-white/20
                  "
                />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Briefly describe your project"
                  value={form.message}
                  onChange={update}
                  className="
                    w-full px-4 py-3
                    bg-black/60
                    border border-white/20
                    resize-none
                  "
                />
              </>
            )}

            {/* SUBMIT */}
            <button
              disabled={!canSubmit}
              className="
                w-full py-3 font-semibold
                text-black
                bg-gradient-to-r from-sky-400 via-emerald-400 to-purple-400
                hover:opacity-90 transition
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {/* STATUS */}
            {status === "success" && (
              <p className="text-emerald-400 text-center text-sm">
                Message sent successfully 🚀
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm">
                Something went wrong. Try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
