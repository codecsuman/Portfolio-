import { motion, useScroll, useTransform } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import avatar from "../assets/avator.png";

/* ---------- SOCIALS ---------- */
const social = [
  { Icon: FaXTwitter, href: "https://x.com/suman9785" },
  { Icon: FaInstagram, href: "https://www.instagram.com/code.csuman/" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/sumanjhanp/" },
  { Icon: FaGithub, href: "https://github.com/codecsuman" },
];

export default function Home() {
  /* ---------- SCROLL GLOW ---------- */
  const { scrollY } = useScroll();
  const glowOpacity = useTransform(scrollY, [0, 400], [0.5, 0.12]);
  const glowScale = useTransform(scrollY, [0, 400], [1, 0.85]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <ParticlesBackground section="home" />

      <div className="relative z-10 max-w-6xl w-full px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* ---------- LEFT : TEXT ---------- */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-widest text-black/60 dark:text-white/60">
            Full Stack Developer
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Hi, I’m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-sky-400">
              Suman Jhanp
            </span>
          </h1>

          <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-black/70 dark:text-white/70">
            I build modern, scalable, and user-focused web applications using
            clean architecture and modern stacks.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              className="
                px-6 py-3 rounded-full text-sm font-semibold
                text-black
                bg-gradient-to-r from-emerald-400 to-sky-400
                shadow-lg shadow-emerald-400/30
                hover:shadow-emerald-400/60
                hover:scale-105 transition
              "
            >
              View Work
            </a>

            <a
              href="/Resume.pdf"
              download
              className="
                px-6 py-3 rounded-full text-sm font-semibold
                border border-black/20 dark:border-white/20
                hover:bg-black/5 dark:hover:bg-white/10 transition
              "
            >
              Resume
            </a>
          </div>

          {/* Socials */}
          <div className="mt-6 flex gap-5 justify-center lg:justify-start text-xl">
            {social.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-black/60 dark:text-white/60
                  hover:text-emerald-400 transition
                "
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ---------- RIGHT : AVATAR ---------- */}
        <div className="hidden lg:flex justify-center relative">
          {/* Scroll-reactive glow */}
          <motion.div
            style={{ opacity: glowOpacity, scale: glowScale }}
            className="
              absolute -inset-20
              rounded-full
              bg-gradient-to-br
              from-emerald-400/35
              via-green-500/25
              to-sky-400/30
              blur-3xl
            "
          />

          {/* Animated gradient border */}
          <motion.div
            className="
              absolute w-[320px] h-[320px]
              rounded-full
              bg-gradient-to-r from-emerald-400 via-green-500 to-sky-400
              p-[2px]
            "
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-[var(--bg)] backdrop-blur-xl" />
          </motion.div>

          {/* Avatar */}
          <motion.img
            src={avatar}
            alt="Suman Jhanp"
            className="
              relative z-10
              w-[280px] xl:w-[320px]
              rounded-full
              shadow-2xl
              cursor-pointer
            "
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            whileHover={{
              scale: 1.06,
              rotateX: 6,
              rotateY: -6,
            }}
            transition={{
              opacity: { duration: 0.6 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              hover: { duration: 0.4 },
            }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      </div>
    </section>
  );
}
