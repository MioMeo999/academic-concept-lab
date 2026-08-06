import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

for (const [pathname, expected] of [
  ["/concept-lab", "Academic Concept"],
  ["/concept-lab/library", "The library"],
  ["/concept-lab/about", "How we cite"],
]) {
  test(`server renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, new RegExp(expected));
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  });
}

/* Record coverage is derived from what the library actually links to, rather
   than a hand-kept list here. A new record is covered the moment it appears in
   the library — and if it never appears there, that is itself the bug. */
const libraryHtml = await (await render("/concept-lab/library")).text();
const recordPaths = [...new Set([...libraryHtml.matchAll(/\/concept-lab\/(?:theory|study|method)\/[a-z0-9-]+/g)].map((m) => m[0]))];

test("the library links to every record", () => {
  assert.ok(recordPaths.length >= 6, `library links to only ${recordPaths.length} records`);
});

for (const pathname of recordPaths) {
  test(`record page ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
    // Provenance is the field that makes everything else trustworthy.
    assert.match(html, /Where every claim came from/, `${pathname} renders no provenance block`);
    // Section numbering and the contents rail are generated together; a
    // mismatch means a block was added without a heading.
    const sections = (html.match(/<section class="rec"/g) ?? []).length;
    const tocEntries = (html.match(/<span class="num">/g) ?? []).length;
    assert.equal(sections, tocEntries, `${pathname}: ${sections} sections but ${tocEntries} contents entries`);
  });
}

// Regression guard. app/globals.css is imported by the root layout, so any
// generic class name it defines outranks the same name in sketchnote.css.
// That once absolutely positioned record body copy on top of the hero.
test("globals.css does not redefine class names the lab owns", async () => {
  const { readFile } = await import("node:fs/promises");
  const base = new URL("../app/", import.meta.url);
  const globals = await readFile(new URL("globals.css", base), "utf8");
  const lab = await readFile(new URL("concept-lab/sketchnote.css", base), "utf8");

  const classesIn = (css) =>
    new Set([...css.matchAll(/^\s*\.([a-zA-Z][\w-]*)/gm)].map((m) => m[1]));

  const owned = classesIn(lab);
  const collisions = [...classesIn(globals)].filter((c) => owned.has(c));
  assert.deepEqual(collisions, [], `globals.css must not redefine: ${collisions.join(", ")}`);
});
