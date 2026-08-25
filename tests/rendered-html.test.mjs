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
   the library — and if it never appears there, that is itself the bug.

   The path segments below must stay in step with KIND in content/records.ts.
   A kind missing from this pattern silently drops every record of that kind
   out of the suite, which is how the first mechanism record nearly shipped
   untested. The count assertion underneath is the backstop. */
const libraryHtml = await (await render("/concept-lab/library")).text();
const homeHtml = await (await render("/concept-lab")).text();
const statisticalHtml = await (await render("/concept-lab/theory/statistical-learning-of-music")).text();
const idyomHtml = await (await render("/concept-lab/theory/idyom-information-dynamics-of-music")).text();

test("IDyOM renders validated probability teaching systems", () => {
  assert.match(idyomHtml, /What did the model expect/);
  assert.match(idyomHtml, /PROBABILITY DISTRIBUTION/i);
  assert.match(idyomHtml, /Same surprise\. Different uncertainty/);
  assert.match(idyomHtml, /sum = <!-- -->1\.000/);
  assert.match(idyomHtml, /3\.321928/);
  assert.match(idyomHtml, /0\.921928/);
  assert.match(idyomHtml, /1\.368996/);
  assert.match(idyomHtml, /Old experience\. New pattern/);
  assert.match(idyomHtml, /Five configurations/);
  assert.match(idyomHtml, /The model only knows what you represent/);
  assert.match(idyomHtml, /A corpus isn’t a culture/);
  assert.match(idyomHtml, /Predictive uncertainty in auditory sequence processing/);
  assert.match(idyomHtml, /did not disprove the entire Narmour architecture/);
  assert.match(idyomHtml, /not a hierarchical cortical architecture/);
  assert.match(idyomHtml, /Where every claim came from/);
});

test("statistical learning record renders its audited teaching systems", () => {
  assert.match(statisticalHtml, /Research framework \/ mechanism family/);
  assert.match(statisticalHtml, /A hidden musical language/);
  assert.match(statisticalHtml, /Statistical structure/);
  assert.match(statisticalHtml, /P\(Y \| X\)/);
  assert.match(statisticalHtml, /0\.80 \(16\/20\)/);
  assert.match(statisticalHtml, /0\.20 \(4\/20\)/);
  assert.match(statisticalHtml, /matched marginal totals/);
  assert.match(statisticalHtml, /Y<!--[\s\S]*?--> total = <!-- -->20/);
  assert.match(statisticalHtml, /Z<!--[\s\S]*?--> total = <!-- -->20/);
  assert.match(statisticalHtml, /constructed interaction is not the Saffran experiment/);
});

test("home describes all four record kinds", () => {
  assert.match(homeHtml, /four kinds of record/);
});

const recordPaths = [...new Set([...libraryHtml.matchAll(/\/concept-lab\/(?:theory|study|method|mechanism)\/[a-z0-9-]+/g)].map((m) => m[0]))];

test("the library links to every record", () => {
  assert.ok(recordPaths.length >= 9, `library links to only ${recordPaths.length} records`);
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
    // mismatch means a block was added without a heading. Each entry renders
    // twice: once in the desktop rail, once in the mobile fold-out box.
    const sections = (html.match(/<section class="rec"/g) ?? []).length;
    const tocEntries = (html.match(/<span class="num">/g) ?? []).length;
    assert.equal(tocEntries, sections * 2, `${pathname}: ${sections} sections but ${tocEntries} contents entries`);
    // Small screens get no contents rail — the fold-out box is their only map.
    assert.match(html, /class="contents-m"/, `${pathname} renders no mobile contents box`);
  });
}

// Cross-record links (the `relatedTo` block) resolve to real pages. A wrong
// recordId renders nothing at all, so nothing else would notice.
test("every internal record link resolves", async () => {
  const seen = new Set();
  for (const pathname of recordPaths) {
    const html = await (await render(pathname)).text();
    for (const m of html.matchAll(/\/concept-lab\/(?:theory|study|method|mechanism)\/[a-z0-9-]+/g)) {
      if (m[0] !== pathname) seen.add(m[0]);
    }
  }
  for (const target of seen) {
    assert.ok(recordPaths.includes(target), `link to ${target} does not match any record page`);
  }
  assert.ok(seen.size > 0, "no cross-record links found at all");
});

// Every door on the landing page must land on a genuinely filtered library.
// A hardcoded list of kinds in the library route once accepted three of four,
// so ?kind=mechanism quietly returned everything.
test("every landing-page filter link actually filters", async () => {
  const home = await (await render("/concept-lab")).text();
  const links = [...new Set([...home.matchAll(/\/concept-lab\/library\?(kind|discipline)=([a-z-]+)/g)].map((m) => m[0]))];
  assert.ok(links.length >= 4, `expected several filter links, found ${links.length}`);

  const total = recordPaths.length;
  for (const href of links) {
    const html = await (await render(href.replace(/&amp;/g, "&"))).text();
    const m = html.match(/(\d+) of (\d+) records/);
    assert.ok(m, `${href} rendered no result count`);
    assert.ok(
      Number(m[1]) < Number(m[2]),
      `${href} returned ${m[0]} — the filter was ignored`,
    );
    assert.equal(Number(m[2]), total, `${href} reports a different library size`);
  }
});

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
