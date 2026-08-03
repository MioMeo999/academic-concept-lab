import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

for (const [pathname, expected] of [
  ["/concept-lab", "How should rigorous research"],
  ["/concept-lab/theory/person-environment-fit", "Person–Environment Fit"],
  ["/concept-lab/paper/tuned-out-or-dialed-in", "Tuned Out"],
  ["/concept-lab/prototypes", "Three visual arguments"],
  ["/concept-lab/prototypes/editorial-atlas/theory", "Person–Environment Fit"],
  ["/concept-lab/prototypes/editorial-atlas/study", "Tuned Out or Dialed In"],
  ["/concept-lab/prototypes/analytical-studio/theory", "Person–Environment Fit"],
  ["/concept-lab/prototypes/analytical-studio/study", "Tuned Out or Dialed In"],
  ["/concept-lab/prototypes/illustrated-journal/theory", "Person–Environment Fit"],
  ["/concept-lab/prototypes/illustrated-journal/study", "Tuned Out or Dialed In"],
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
