/*
 * Frees the given port by killing any process LISTENING on it.
 * Runs automatically as `predev`, so a stale dev server from a
 * previous session can never block `npm run dev`.
 *
 * - Cross-stacked: matches IPv4 (0.0.0.0:5173, 127.0.0.1:5173) and
 *   IPv6 ([::]:5173, [::1]:5173) listeners.
 * - No-op (exit 0) when the port is already free — never blocks Vite.
 * - If a kill fails, we still exit 0: strictPort makes Vite fail
 *   loudly with a clear "port in use" message, which is easier to
 *   diagnose than a silent cleanup error.
 *
 * Usage: node scripts/free-port.mjs 5173
 */
import { exec } from "node:child_process";

const portArg = Number(process.argv[2]);
const port = Number.isInteger(portArg) && portArg > 0 ? portArg : 5173;

function collectListenerPids(callback) {
  exec("netstat -ano", (err, stdout) => {
    if (err) return callback([]); // netstat unavailable -> nothing to do
    const out = stdout.split(/\r?\n/);
    const pids = new Set();
    for (const line of out) {
      if (!line.replace(/\s+/g, " ").includes("LISTENING")) continue;
      const cols = line.trim().split(/\s+/);
      // netstat columns: Proto, Local Address, Foreign Address, State, PID
      const local = cols[1] ?? "";
      const pid = cols[cols.length - 1];
      if (new RegExp(`:${port}$`).test(local) && /^\d+$/.test(pid)) {
        pids.add(pid);
      }
    }
    callback([...pids]);
  });
}

collectListenerPids((pids) => {
  if (pids.length === 0) {
    console.log(`[free-port] port ${port} is already free`);
    process.exit(0);
  }
  let remaining = pids.length;
  const done = () => {
    if (--remaining <= 0) process.exit(0);
  };
  console.log(`[free-port] freeing port ${port} (PID${pids.length > 1 ? "s" : ""} ${pids.join(", ")})`);
  for (const pid of pids) {
    if (process.platform === "win32") {
      exec(`taskkill /F /PID ${pid}`, { windowsHide: true }, done);
    } else {
      exec(`kill -9 ${pid}`, { windowsHide: true }, done);
    }
  }
});
