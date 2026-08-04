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
  ["/concept-lab/theory/person-environment-fit", "Person–Environment Fit"],
  ["/concept-lab/theory/job-demands-resources", "Job Demands–Resources"],
  ["/concept-lab/study/tuned-out-or-dialed-in", "Tuned Out"],
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

// Provenance is the field that makes everything else trustworthy: every record
// page must render its marks.
for (const pathname of [
  "/concept-lab/theory/person-environment-fit",
  "/concept-lab/theory/job-demands-resources",
  "/concept-lab/study/tuned-out-or-dialed-in",
]) {
  test(`${pathname} shows provenance`, async () => {
    const html = await (await render(pathname)).text();
    assert.match(html, /Where every claim came from/);
  });
}
