import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onFinish, speed = 30 }) {
  const greetings = useMemo(
    () => [
      "Hello",
      "नमस्ते",
      "Hola",
      "Bonjour",
      "Ciao",
      "Olá",
      "Здравствуйте",
      "Merhaba",
      "Γειά",
      "Hej",
      "Hallo",
      "Salam",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(true);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  /* Watch theme */
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  /* Typing effect */
  useEffect(() => {
    let char = 0;
    const word = greetings[index];
    setText("");

    const type = setInterval(() => {
      char++;
      setText(word.slice(0, char));

      if (char === word.length) {
        clearInterval(type);
        setTimeout(() => {
          index < greetings.length - 1
            ? setIndex((i) => i + 1)
            : setVisible(false);
        }, speed * 3);
      }
    }, speed);

    return () => clearInterval(type);
  }, [index, greetings, speed]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className={`
            fixed inset-0 z-[9999] flex items-center justify-center
            backdrop-blur-xl
            ${isDark ? "text-white" : "text-black"}
          `}
          style={{
            background: isDark
              ? "linear-gradient(120deg,#000428,#004e92,#000428)"
              : "linear-gradient(120deg,#fdfbfb,#ebedee,#f5f7fa)",
            backgroundSize: "300% 300%",
          }}
          initial={{ opacity: 1 }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(25px)",
            transition: { duration: 0.9, ease: "easeInOut" },
          }}
        >
          <motion.h1
            key={index}
            className="
              text-5xl md:text-7xl lg:text-8xl font-bold
              tracking-wide drop-shadow-xl whitespace-nowrap
            "
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.45, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(12px)",
              transition: { duration: 0.35 },
            }}
          >
            {text}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
