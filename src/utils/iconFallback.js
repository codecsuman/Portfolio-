/*
 * Builds a fallback source for third-party logo images.
 * If a CDN is blocked by an ad-blocker / firewall (ERR_BLOCKED_BY_CLIENT),
 * the logo quietly swaps to the next source, then to the letter fallback.
 */

/* skillicons id → simple-icons slug */
const SKILLICONS_TO_SI = {
  react: "react",
  ts: "typescript",
  js: "javascript",
  tailwind: "tailwindcss",
  html: "html5",
  css: "css3",
  redux: "redux",
  vite: "vite",
  nodejs: "nodedotjs",
  express: "express",
  nestjs: "nestjs",
  postman: "postman",
  mongodb: "mongodb",
  mysql: "mysql",
  postgresql: "postgresql",
  redis: "redis",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "amazonwebservices",
  vercel: "vercel",
  linux: "linux",
  git: "git",
  githubactions: "githubactions",
  nginx: "nginx",
  playwright: "playwright",
  python: "python",
  java: "openjdk",
  github: "github",
  sqlite: "sqlite",
};

const FALLBACK_SUFFIX = "?color=%23ffffff";
const ICONIFY = (slug) =>
  `https://api.iconify.design/simple-icons:${slug}.svg${FALLBACK_SUFFIX}`;

export function iconFallback(src) {
  if (!src) return null;

  const sk = src.match(/skillicons\.dev\/icons\?i=([a-z0-9]+)/i);
  if (sk && SKILLICONS_TO_SI[sk[1]]) {
    return ICONIFY(SKILLICONS_TO_SI[sk[1]]);
  }

  const si = src.match(/simpleicons\.org\/([a-z0-9.-]+)\//i);
  if (si) {
    return ICONIFY(si[1]);
  }

  /* api.iconify / devicon / local assets → letter fallback */
  return null;
}
