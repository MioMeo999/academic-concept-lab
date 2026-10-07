/**
 * Render authored pencil scenes to web artwork.
 *
 *   node scripts/art/render.mjs <scene-name> [more scenes…] [--preview]
 *
 * Each scene lives in scripts/art/scenes/<name>.js and exports a default
 * object: { width, height, scale?, seed?, crop?: [x, y, w, h], outputs: [{ file, width, quality?, rotate?, flop?, stack? }],
 * draw(hand, PIGMENT) }. The scene is drawn by pencil.js inside headless
 * Edge/Chromium and written as WebP under public/. --preview also writes a PNG
 * beside the scratch output for review. This is an authoring tool: its
 * output is committed artwork, and nothing here runs on a reader's page.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const args = process.argv.slice(2);
const preview = args.includes("--preview");
const names = args.filter((a) => !a.startsWith("--"));
if (!names.length) {
  console.error("usage: node scripts/art/render.mjs <scene> [scene…] [--preview]");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/runner.html") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<!doctype html><meta charset=utf-8><body></body>");
    return;
  }
  const file = path.join(here, url.pathname.replace(/^\/+/, ""));
  if (!file.startsWith(here) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": "text/javascript" });
  res.end(fs.readFileSync(file));
});
await new Promise((ok) => server.listen(0, ok));
const port = server.address().port;

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CONCEPT_LAB_BROWSER_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
});
const page = await browser.newPage();
page.on("console", (m) => { if (m.type() === "error") console.error("[scene]", m.text()); });
page.on("pageerror", (e) => console.error("[scene]", e.message));
await page.goto(`http://localhost:${port}/runner.html`);

for (const name of names) {
  const t0 = Date.now();
  const result = await page.evaluate(async (scene) => {
    const { createHand, PIGMENT } = await import(`/pencil.js?${Date.now()}`);
    const mod = await import(`/scenes/${scene}.js?${Date.now()}`);
    const s = mod.default;
    const hand = createHand(s.width, s.height, { seed: s.seed ?? 1, scale: s.scale ?? 2, tooth: s.tooth ?? 1 });
    await s.draw(hand, PIGMENT);
    return { data: hand.export({ background: s.background === undefined ? "#ffffff" : s.background }), outputs: s.outputs, crop: s.crop ?? null, scale: s.scale ?? 2 };
  }, name);
  let png = Buffer.from(result.data.split(",")[1], "base64");
  // Optional crop, given in drawing units: [x, y, width, height].
  if (result.crop) {
    const [cx, cy, cw, ch] = result.crop.map((v) => Math.round(v * result.scale));
    png = await sharp(png).extract({ left: cx, top: cy, width: cw, height: ch }).png().toBuffer();
  }
  for (const out of result.outputs) {
    const target = path.join(root, out.file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    // `rotate` (degrees) recomposes a wide field for a narrow screen: a panorama read left-to-right becomes a vertical stack.
    let pipeline = sharp(png);
    // `stack` recomposes a wide field for a narrow screen without turning it: each crop (in drawing units) is cut out, and the crops are laid one under another.
    if (out.stack) {
      const sc = result.scale;
      const tiles = await Promise.all(out.stack.map(([x, y, w, h]) => sharp(png).extract({ left: Math.round(x * sc), top: Math.round(y * sc), width: Math.round(w * sc), height: Math.round(h * sc) }).png().toBuffer()));
      const meta = await sharp(tiles[0]).metadata();
      const composed = await sharp({ create: { width: meta.width, height: meta.height * tiles.length, channels: 3, background: "#ffffff" } })
        .composite(tiles.map((input, i) => ({ input, top: i * meta.height, left: 0 })))
        .png()
        .toBuffer();
      pipeline = sharp(composed);
    }
    if (out.rotate) pipeline = sharp(await pipeline.rotate(out.rotate).png().toBuffer());
    // `flop` mirrors left-to-right, so a turned panorama keeps actor A on the left.
    if (out.flop) pipeline = sharp(await pipeline.flop().png().toBuffer());
    await pipeline.resize({ width: out.width }).webp({ quality: out.quality ?? 84, effort: 6 }).toFile(target);
    const kb = Math.round(fs.statSync(target).size / 1024);
    console.log(`${name} → ${out.file} (${out.width}px, ${kb} KB)`);
  }
  if (preview) {
    const dir = process.env.ART_PREVIEW_DIR || path.join(root, ".art-preview");
    fs.mkdirSync(dir, { recursive: true });
    await sharp(png).resize({ width: 1400 }).png().toFile(path.join(dir, `${name}.png`));
  }
  console.log(`${name} drawn in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

await browser.close();
server.close();
