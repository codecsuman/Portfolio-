import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowUp,
  FaSun,
  FaMoon,
  FaFileDownload,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const [dark, setDark] = useState(true);

  /* GLOBAL THEME */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-black text-white overflow-hidden"
      >
        {/* COLORFUL BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-[#1cd8d2]/30 blur-[200px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px] bg-[#302b63]/30 blur-[220px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* TOP ACTIONS */}
          <div className="flex flex-wrap justify-center gap-6 mb-14">
            {/* Resume */}
            <a
              href="/Resume.pdf"
              download
              className="
                flex items-center gap-2 px-6 py-3 rounded-full font-semibold
                bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
                text-black hover:scale-105 transition
              "
            >
              <FaFileDownload /> Download Resume
            </a>

            {/* THEME TOGGLE */}
            <button
              onClick={() => setDark(!dark)}
              className="
                flex items-center gap-2 px-6 py-3 rounded-full
                border border-white/30
                hover:bg-white hover:text-black transition
              "
            >
              {dark ? <FaSun /> : <FaMoon />}
              {dark ? "Light" : "Dark"}
            </button>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex justify-center gap-8 mb-14 text-4xl">
            {[
              { icon: <FaGithub />, link: "https://github.com/codecsuman" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/sumanjhanp/" },
              { icon: <SiLeetcode />, link: "https://leetcode.com/u/sumanjhanp1/" },
              { icon: <FaWhatsapp />, link: "https://wa.me/918597376239" },
              { icon: <MdEmail />, link: "mailto:sumanjhanp1@gmail.com" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="
                  hover:scale-125 transition
                  hover:text-[#1cd8d2]
                "
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* CONTACT INFO */}
          <div className="text-center space-y-3 opacity-80">
            <p className="flex justify-center gap-2 items-center">
              <FaWhatsapp /> +91 85973 76239
            </p>
            <p className="flex justify-center gap-2 items-center">
              <MdEmail /> sumanjhanp1@gmail.com
            </p>
            <p className="flex justify-center gap-2 items-center">
              <MdLocationOn /> Gourhati, Arambagh, Hooghly, India
            </p>
          </div>

          {/* DIVIDER */}
          <div className="my-10 h-px bg-white/10" />

          {/* COPYRIGHT */}
          <p className="text-center text-sm opacity-60">
            © {new Date().getFullYear()} Suman Jhanp · Full Stack Developer
          </p>
        </div>
      </motion.footer>

      {/* STICKY RESUME BUTTON */}
      <a
        href="/Resume.pdf"
        download
        className="
          fixed bottom-24 right-6 z-50
          flex items-center gap-2 px-5 py-3 rounded-full
          bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
          text-black font-semibold shadow-xl
          hover:scale-110 transition
        "
      >
        <FaFileDownload /> Resume
      </a>

      {/* BACK TO TOP */}
      <button
        onClick={scrollTop}
        className="
          fixed bottom-6 right-6 z-50
          p-3 rounded-full
          bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]
          text-black shadow-lg
          hover:scale-110 transition
        "
      >
        <FaArrowUp />
      </button>
    </>
  );
}
