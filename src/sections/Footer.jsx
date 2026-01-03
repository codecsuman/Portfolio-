import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowUp,
  FaFileDownload,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";

/* ---------- SOCIAL LINKS ---------- */
const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/codecsuman", label: "GitHub" },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/sumanjhanp/",
    label: "LinkedIn",
  },
  {
    icon: <SiLeetcode />,
    href: "https://leetcode.com/u/sumanjhanp1/",
    label: "LeetCode",
  },
  {
    icon: <FaWhatsapp />,
    href: "https://wa.me/918597376239",
    label: "WhatsApp",
  },
  {
    icon: <MdEmail />,
    href: "mailto:sumanjhanp1@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ---------- FOOTER ---------- */}
      <footer className="relative bg-[#020617] text-white border-t border-white/10">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 -top-32 w-[360px] h-[360px] bg-emerald-500/10 blur-[160px]" />
          <div className="absolute right-1/4 -top-32 w-[360px] h-[360px] bg-sky-500/10 blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-14">
          {/* Resume CTA */}
          <div className="flex justify-center mb-10">
            <motion.a
              href="/Resume.pdf"
              download
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="
                inline-flex items-center gap-2
                px-6 py-2.5 rounded-full
                font-semibold text-black
                bg-gradient-to-r from-sky-400 to-emerald-400
                shadow-lg shadow-emerald-400/40
              "
            >
              <FaFileDownload /> Download Resume
            </motion.a>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-6 mb-8 text-xl">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{
                  scale: 1.25,
                  color: "#34d399",
                  textShadow: "0px 0px 12px rgba(52,211,153,0.8)",
                }}
                whileTap={{ scale: 0.9 }}
                className="text-white/60 transition"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-2 text-sm text-white/60">
            <p className="flex justify-center items-center gap-2">
              <FaWhatsapp /> +91 85973 76239
            </p>
            <p className="flex justify-center items-center gap-2">
              <MdEmail /> sumanjhanp1@gmail.com
            </p>
            <p className="flex justify-center items-center gap-2">
              <MdLocationOn /> Hooghly, West Bengal, India
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-white/10" />

          {/* Copyright */}
          <p className="text-center text-xs text-white/50">
            © {new Date().getFullYear()} Suman Jhanp · Full Stack Developer
          </p>
        </div>
      </footer>

      {/* ---------- FLOATING RESUME ---------- */}
      <motion.a
        href="/Resume.pdf"
        download
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        whileHover={{ scale: 1.12 }}
        className="
          fixed bottom-20 right-6 z-50
          flex items-center gap-2
          px-4 py-2 rounded-full
          text-sm font-semibold text-black
          bg-gradient-to-r from-sky-400 to-emerald-400
          shadow-xl shadow-emerald-400/40
        "
      >
        <FaFileDownload /> Resume
      </motion.a>

      {/* ---------- BACK TO TOP ---------- */}
      <motion.button
        onClick={scrollTop}
        aria-label="Back to top"
        whileHover={{ y: -4, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="
          fixed bottom-6 right-6 z-50
          p-3 rounded-full
          text-black bg-white
          shadow-xl
        "
      >
        <FaArrowUp />
      </motion.button>
    </>
  );
}
