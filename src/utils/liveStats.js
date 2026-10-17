/*
 * Live stats from public GitHub & LeetCode APIs.
 * Shared module-level cache so Home & About never double-fetch.
 * Falls back to static values on failure; response cached 1 hour.
 */
import { useState, useEffect } from "react";

const GH_USER = "codecsuman";
const LC_USER = "sumanjhanp1";
const CACHE_KEY = "liveStatsCache";
const TTL = 3600_000; // 1 hour

/* Multiple endpoints — if one is blocked/slow, the next is tried */
const LC_ENDPOINTS = [
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

  inflight = Promise.all([
    fetch(`https://api.github.com/users/${GH_USER}`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
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
