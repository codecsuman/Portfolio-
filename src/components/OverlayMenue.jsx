import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";

/* ---------- NAV ITEMS ---------- */
const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Testimonials",
  "Contact",
];

export default function OverlayMenu({ isOpen, onClose }) {
  /* ---------- BODY SCROLL LOCK + ESC ---------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70 backdrop-blur-2xl
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Subtle gradient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[160px]" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute top-6 right-6
              rounded-full p-2
              text-3xl text-white/70
              hover:text-white
              hover:bg-white/10
              transition
            "
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* Menu */}
          <nav className="relative z-10">
            <ul className="space-y-8 text-center">
              {navItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.08,
                      duration: 0.55,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 24,
                    transition: { duration: 0.25 },
                  }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className="
                      group relative inline-block
                      text-4xl md:text-5xl
                      font-semibold
                      text-white/90
                      tracking-tight
                      transition
                    "
                  >
                    {item}

                    {/* Premium underline */}
                    <span
                      className="
                        absolute left-1/2 -bottom-3
                        h-[2px] w-0
                        bg-gradient-to-r from-indigo-400 to-cyan-400
                        transition-all duration-500 ease-out
                        group-hover:w-full group-hover:left-0
                      "
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
