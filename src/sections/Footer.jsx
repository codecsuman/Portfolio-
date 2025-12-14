import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowUp,
  FaFileDownload,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdEmail, MdLocationOn } from "react-icons/md";

/* ---------- DATA ---------- */
const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/codecsuman" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sumanjhanp/" },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/sumanjhanp1/" },
  { icon: <FaWhatsapp />, href: "https://wa.me/918597376239" },
  { icon: <MdEmail />, href: "mailto:sumanjhanp1@gmail.com" },
];

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-black text-white overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/4 w-[520px] h-[520px]
            bg-[#1cd8d2]/25 blur-[200px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px]
            bg-[#302b63]/25 blur-[220px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* Primary actions */}
          <div className="flex flex-wrap justify-center gap-6 mb-14">
            <a
              href="/Resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-full
                font-semibold text-black
                bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
                hover:scale-105 transition"
            >
              <FaFileDownload /> Resume
            </a>
          </div>

          {/* Social */}
          <div className="flex justify-center gap-8 mb-14 text-4xl">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Social link"
                className="hover:scale-125 hover:text-[#1cd8d2] transition"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Contact info */}
          <div className="text-center space-y-3 text-white/80">
            <p className="flex justify-center items-center gap-2">
              <FaWhatsapp /> +91 85973 76239
            </p>
            <p className="flex justify-center items-center gap-2">
              <MdEmail /> sumanjhanp1@gmail.com
            </p>
            <p className="flex justify-center items-center gap-2">
              <MdLocationOn /> Gourhati, Arambagh, Hooghly, India
            </p>
          </div>

          <div className="my-10 h-px bg-white/10" />

          <p className="text-center text-sm text-white/60">
            © {new Date().getFullYear()} Suman Jhanp · Full Stack Developer
          </p>
        </div>
      </motion.footer>

      {/* Floating Resume */}
      <a
        href="/Resume.pdf"
        download
        className="fixed bottom-24 right-6 z-50
          flex items-center gap-2 px-5 py-3 rounded-full
          bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
          text-black font-semibold shadow-xl
          hover:scale-110 transition"
      >
        <FaFileDownload /> Resume
      </a>

      {/* Back to top */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50
          p-3 rounded-full
          bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
          text-black shadow-lg
          hover:scale-110 transition"
      >
        <FaArrowUp />
      </button>
    </>
  );
}
