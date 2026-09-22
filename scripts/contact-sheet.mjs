import { readFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import sharp from "sharp";
import { contactSheetFilename, resultLabel, screenshotSource } from "./verification-model.mjs";

const reportPath = resolve(process.argv[2] || process.env.CONCEPT_LAB_VERIFY_REPORT || "D:/OpenAI/CodexHome/visualizations/latest/concept-lab-verification/representative-report.json");
const outDir = resolve(process.argv[3] || join(dirname(reportPath), "contact-sheets"));
const requestedMode = process.env.CONCEPT_LAB_CONTACT_SHEET_MODE || "both";
const report = JSON.parse(await readFile(reportPath, "utf8"));
await mkdir(outDir, { recursive: true });

const tileWidth = 400;
const foldTileHeight = 250;
const labelHeight = 42;
const gap = 18;
const ecologyMaxHeight = 1600;

function labelSvg(text) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return Buffer.from(`<svg width="${tileWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#ffffff"/><text x="14" y="27" font-family="Arial, sans-serif" font-size="15" fill="#18253f">${escaped}</text></svg>`);
}

async function tileFor(result, kind) {
  const source = screenshotSource(result, kind);
  const image = sharp(source);
  if (kind === "fold") {
    return { input: await image.resize({ width: tileWidth, height: foldTileHeight, fit: "contain", background: "#ffffff" }).png().toBuffer(), height: foldTileHeight };
  }
  const metadata = await image.metadata();
  const sourceWidth = metadata.width || tileWidth;
  const sourceHeight = metadata.height || foldTileHeight;
  const proportionalHeight = Math.round(tileWidth * sourceHeight / sourceWidth);
  const height = Math.max(180, Math.min(ecologyMaxHeight, proportionalHeight));
  return { input: await image.resize({ width: tileWidth, height, fit: "contain", background: "#ffffff" }).png().toBuffer(), height };
}

async function buildSheet(tier, kind, results) {
  const columns = tier === "desktop" ? 3 : 2;
  const tiles = [];
  for (const result of results) tiles.push({ result, ...(await tileFor(result, kind)) });
  const rows = Math.ceil(tiles.length / columns);
  const width = columns * tileWidth + (columns - 1) * gap;
  const rowHeights = Array.from({ length: rows }, (_, row) => Math.max(...tiles.slice(row * columns, (row + 1) * columns).map((tile) => tile.height + labelHeight)));
  const height = rowHeights.reduce((total, rowHeight) => total + rowHeight, 0) + (rows - 1) * gap;
  const composite = [];
  let y = 0;
  for (let index = 0; index < tiles.length; index += 1) {
    const tile = tiles[index];
    const x = (index % columns) * (tileWidth + gap);
    const row = Math.floor(index / columns);
    composite.push({ input: tile.input, left: x, top: y + labelHeight });
    composite.push({ input: labelSvg(`${tile.result.routeId} · ${tile.result.viewport.label}px · ${resultLabel(tile.result)}`), left: x, top: y });
    if (index % columns === columns - 1 || index === tiles.length - 1) y += rowHeights[row] + gap;
  }
  const outputPath = join(outDir, contactSheetFilename(tier, kind));
  await sharp({ create: { width, height, channels: 4, background: "#f8f9fb" } }).composite(composite).png().toFile(outputPath);
  return outputPath;
}

const outputs = [];
for (const kind of requestedMode === "fold" || requestedMode === "ecology" ? [requestedMode] : ["fold", "ecology"]) {
  for (const tier of ["desktop", "mobile"]) {
    const ecologyViewport = tier === "desktop" ? "desktop-1440" : "mobile-390";
    const results = report.results.filter((result) => result.viewport.tier === tier && (kind === "fold" || result.viewport.id === ecologyViewport));
    outputs.push(await buildSheet(tier, kind, results));
  }
}
console.log(JSON.stringify({ outputs }, null, 2));
