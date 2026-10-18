import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  // Root base by default: works for local dev (localhost:5173/),
  // Netlify and Vercel (all serve at "/"). GitHub Pages (which needs
  // the "/Portfolio-/" sub-path) is built via `npm run build:pages`
  // which overrides this with --base, so nothing is hardcoded.
  base: "/",

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    host: true, // listen on IPv4 (127.0.0.1) AND IPv6 (::1) so Chrome connects
    strictPort: true, // never silently jump to another port
    open: true,
    // Same-origin proxies to the stats APIs so ad-blocker extensions
    // (ERR_BLOCKED_BY_CLIENT) don't kill liveStats.js fetches in dev.
    proxy: {
      "/dev-api/gh": {
        target: "https://api.github.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api\/gh/, ""),
      },
      "/dev-api/lc": {
        target: "https://alfa-leetcode-api.onrender.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api\/lc/, ""),
      },
    },
  },

  preview: {
    port: 4173,
    open: true,
  },

  build: {
    target: "es2020",
    minify: "esbuild",
    outDir: "dist",
    emptyOutDir: true,
  },
});