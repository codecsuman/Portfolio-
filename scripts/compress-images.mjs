/*
 * One-off asset optimizer: converts large PNG/JPG assets to WebP.
 * Run: node scripts/compress-images.mjs
 */
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const DIR = join(process.cwd(), "src", "assets");

// Per-file max dimensions (display sizes are much smaller, this is generous)
const STANDALONE = [
  { file: "Logo.png", max: 160 },   // navbar 34px + intro logo
  { file: "avator.png", max: 900 }, // hero avatar
];
const SHOTS_MAX = 1000; // project screenshots & others

const fmt = (b) => `${(b / 1024).toFixed(0)} KB`;

const entries = readdirSync(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
let beforeTotal = 0, afterTotal = 0;

for (const f of entries) {
  const src = join(DIR, f);
  const out = join(DIR, f.replace(/\.(png|jpe?g)$/i, ".webp"));
  const before = statSync(src).size;
  let max = SHOTS_MAX;
  const hit = STANDALONE.find((s) => s.file === f);
  if (hit) max = hit.max;

  await sharp(src)
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 4 })
    .toFile(out);

  const after = statSync(out).size;
  beforeTotal += before;
  afterTotal += after;
  console.log(`${f.padEnd(14)} -> ${f.replace(/\.(png|jpe?g)$/i, ".webp")}`.padEnd(40) + `${fmt(before)} -> ${fmt(after)}`);
}

console.log(`\nTOTAL: ${fmt(beforeTotal)} -> ${fmt(afterTotal)}  (${(((afterTotal - beforeTotal) / beforeTotal) * 100).toFixed(1)}% saved)`);
