import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/* ==============================
   APP ENTRY POINT
================================ */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "❌ Root element (#root) not found. Check index.html for <div id='root'></div>"
  );
}

/**
 * NOTE:
 * StrictMode helps detect side effects in development.
 * If animations fire twice in dev, it is NORMAL.
 * Netlify / production build will behave correctly.
 */
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
