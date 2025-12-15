import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800); // ⬅ slower
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-white dark:bg-black
          "
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Soft background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[320px] w-[320px] rounded-full bg-indigo-500/20 blur-[140px]" />
          </div>

          {/* Logo / Text */}
          <motion.h1
            className="
              relative z-10
              text-4xl md:text-5xl
              font-semibold tracking-tight
              text-black dark:text-white
            "
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.94,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Welcome
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
