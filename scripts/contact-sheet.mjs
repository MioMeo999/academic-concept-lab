import { readFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import sharp from "sharp";

const reportPath = resolve(process.argv[2] || process.env.CONCEPT_LAB_VERIFY_REPORT || "D:/OpenAI/CodexHome/visualizations/latest/concept-lab-verification/representative-report.json");
const report = JSON.parse(await readFile(reportPath, "utf8"));
const outDir = resolve(process.argv[3] || join(dirname(reportPath), "contact-sheets"));
await mkdir(outDir, { recursive: true });

const tileWidth = 400;
const tileHeight = 250;
const labelHeight = 38;
const gap = 18;

function labelSvg(text) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return Buffer.from(`<svg width="${tileWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#ffffff"/><text x="14" y="25" font-family="Arial, sans-serif" font-size="16" fill="#18253f">${escaped}</text></svg>`);
}

async function buildSheet(kind, results) {
  const columns = kind === "desktop" ? 3 : 2;
  const rows = Math.ceil(results.length / columns);
  const width = columns * tileWidth + (columns - 1) * gap;
  const height = rows * (tileHeight + labelHeight) + (rows - 1) * gap;
  const composite = [];
  for (let index = 0; index < results.length; index += 1) {
    const result = results[index];
    const x = (index % columns) * (tileWidth + gap);
    const y = Math.floor(index / columns) * (tileHeight + labelHeight + gap);
    const image = await sharp(result.viewportScreenshotPath || result.screenshotPath).resize({ width: tileWidth, height: tileHeight, fit: "contain", background: "#ffffff" }).png().toBuffer();
    composite.push({ input: image, left: x, top: y + labelHeight });
    composite.push({ input: labelSvg(`${result.routeId} · ${result.viewport.label}px · ${result.status}`), left: x, top: y });
  }
  const outputPath = join(outDir, `${kind}-contact-sheet.png`);
  await sharp({ create: { width, height, channels: 4, background: "#f8f9fb" } }).composite(composite).png().toFile(outputPath);
  return outputPath;
}

const desktop = report.results.filter((result) => result.viewport.tier === "desktop");
const mobile = report.results.filter((result) => result.viewport.tier === "mobile");
const outputs = [await buildSheet("desktop", desktop), await buildSheet("mobile", mobile)];
console.log(JSON.stringify({ outputs }, null, 2));
