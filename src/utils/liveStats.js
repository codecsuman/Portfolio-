/*
 * Dev behavior: no network calls by default. A local ad-blocker/
 * privacy extension keeps showing ERR_BLOCKED_BY_CLIENT noise and
 * users read it as an app bug, so dev simply uses FALLBACK values
 * (instant, offline, zero requests).
 *
 * To live-test stats locally, run this once in the browser console
 * and reload:
 *   localStorage.setItem("liveStatsDebug", "1")
 * (set to "0" — or remove the key — to go back to default)
 *
 * In production everything works exactly as before: live fetches
 * with graceful FALLBACK on failure.
 */
import { useState, useEffect } from "react";

const GH_USER = "codecsuman";
const LC_USER = "sumanjhanp1";
const CACHE_KEY = "liveStatsCache";
const TTL = 3600_000; // 1 hour
const DEBUG_KEY = "liveStatsDebug";

const IS_DEV = import.meta.env.DEV;
const LIVE_IN_DEV = (() => {
  try {
    return IS_DEV && localStorage.getItem(DEBUG_KEY) === "1";
  } catch { return false; }
})();

/*
 * Same-origin proxy base in dev (avoids ad-blocker ERR_BLOCKED_BY_CLIENT),
 * direct URLs in production.
 */
const GH_API =
  IS_DEV
    ? "/dev-api/gh"
    : "https://api.github.com";

/* Multiple endpoints — if one is blocked/slow, the next is tried */
const LC_ENDPOINTS =
  import.meta.env.DEV
    ? [`/dev-api/lc/userProfile/${LC_USER}`]
    : [
      `https://alfa-leetcode-api.onrender.com/userProfile/${LC_USER}`,
      `https://leetcode-api-faisalshohag.vercel.app/${LC_USER}`,
    ];

const FALLBACK = { repos: 14, followers: 3, solved: 244, years: 1 };

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.t < TTL) {
      return { ...cached.v, loaded: true };
    }
  } catch { /* storage unavailable */ }
  return null;
}

function writeCache(v) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v }));
  } catch { /* ignore */ }
}

async function fetchLCUser() {
  for (const url of LC_ENDPOINTS) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        const j = await r.json();
        if (j?.totalSolved) return j;
      }
    } catch { /* next endpoint */ }
  }
  return null;
}

let cache = readCache();
let inflight = null;

function fetchStats() {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  if (IS_DEV && !LIVE_IN_DEV) {
    // Dev default: zero network, instant fallback values
    return Promise.resolve({ ...FALLBACK, loaded: true });
  }

  inflight = Promise.all([
    fetch(`${GH_API}/users/${GH_USER}`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    fetchLCUser(),
  ]).then(([gh, lc]) => {
    const next = { ...FALLBACK, loaded: true };
    if (gh) {
      next.repos = gh.public_repos ?? FALLBACK.repos;
      next.followers = gh.followers ?? FALLBACK.followers;
    }
    if (lc?.totalSolved) {
      next.solved = lc.totalSolved;
    }
    writeCache(next);
    cache = next;
    return cache;
  });
  return inflight;
}

export function useLiveStats() {
  const [stats, setStats] = useState(cache ?? { ...FALLBACK, loaded: false });

  useEffect(() => {
    let alive = true;
    fetchStats().then((v) => { if (alive) setStats(v); });
    return () => { alive = false; };
  }, []);

  return stats;
}
