import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    /* ==============================
       DEPLOYMENT BASE
    ============================== */
    // "/" → Netlify / Vercel root deploy
    // "./" → works for subfolder hosting if needed
    base: "/",

    /* ==============================
       PLUGINS
    ============================== */
    plugins: [
      react({
        fastRefresh: !isProd,
      }),
      tailwindcss(),
    ],

    /* ==============================
       PATH ALIASES
    ============================== */
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    /* ==============================
       DEV SERVER
    ============================== */
    server: {
      port: 5173,
      open: true,
      strictPort: true,
    },

    /* ==============================
       PREVIEW (BUILD PREVIEW)
    ============================== */
    preview: {
      port: 4173,
      open: true,
      strictPort: true,
    },

    /* ==============================
       BUILD OPTIMIZATION
    ============================== */
    build: {
      target: "es2020",
      sourcemap: false,
      minify: "esbuild",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 800,
      reportCompressedSize: false,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "react";
              if (id.includes("framer-motion")) return "motion";
              if (id.includes("react-icons")) return "icons";
              return "vendor";
            }
          },
        },
      },
    },

    /* ==============================
       DEPENDENCY OPTIMIZATION
    ============================== */
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "framer-motion",
        "react-icons",
      ],
    },

    /* ==============================
       GLOBAL DEFINES
    ============================== */
    define: {
      __DEV__: !isProd,
    },
  };
});
