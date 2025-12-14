import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      fastRefresh: true,
    }),
    tailwindcss(),
  ],

  /* ---------- DEV ---------- */
  server: {
    port: 5173,
    open: true,
    strictPort: true,
  },

  /* ---------- BUILD ---------- */
  build: {
    target: "es2020",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          framer: ["framer-motion"],
          icons: ["react-icons"],
        },
      },
    },
  },

  /* ---------- RESOLVE ---------- */
  resolve: {
    alias: {
      "@": "/src",
    },
  },

  /* ---------- PERFORMANCE ---------- */
  esbuild: {
    drop: ["console", "debugger"],
  },
});
