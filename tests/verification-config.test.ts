import assert from "node:assert/strict";
import test from "node:test";
import { CONCEPTUAL_PROBES, FULL_SITE_ROUTES, REQUIRED_REPRESENTATIVE_IDS, REPRESENTATIVE_ROUTES, VIEWPORTS } from "../scripts/verification-routes.mjs";
import { contactSheetFilename, deriveStatuses, exitCodeForSummary, screenshotSource } from "../scripts/verification-model.mjs";

test("verification harness keeps the required route and viewport contract", () => {
  assert.deepEqual(REPRESENTATIVE_ROUTES.map((route) => route.id), REQUIRED_REPRESENTATIVE_IDS);
  assert.equal(new Set(FULL_SITE_ROUTES.map((route) => route.id)).size, FULL_SITE_ROUTES.length);
  assert.ok(FULL_SITE_ROUTES.length >= REPRESENTATIVE_ROUTES.length);
  assert.deepEqual(VIEWPORTS.map((viewport) => viewport.width), [1440, 1024, 768, 390, 360]);
  for (const route of FULL_SITE_ROUTES) {
    assert.match(route.route, /^\/concept-lab(?:\/|$)/, route.id);
    assert.ok(route.reason.length > 0, `${route.id} needs route rationale`);
  }
});

test("conceptual probes resolve to representative routes with an explicit policy", () => {
  const routeIds = new Set(REPRESENTATIVE_ROUTES.map((route) => route.id));
  for (const route of REPRESENTATIVE_ROUTES) {
    assert.ok(Array.isArray(route.probes), `${route.id} needs a probe list, even when empty`);
    assert.ok(route.probes.length > 0 || ["none", "record"].includes(route.interaction), `${route.id} needs a configured probe or explicit NOT_APPLICABLE interaction policy`);
    for (const probe of route.probes) {
      assert.ok(probe.id && probe.selector && probe.accessibleTarget, `${route.id} probe needs identity, selector, and target`);
      assert.ok(["toggle", "link", "save"].includes(probe.kind), `${probe.id} has a known probe type`);
      assert.ok(routeIds.has(route.id), `${probe.id} is attached to a representative route`);
    }
  }
  assert.equal(CONCEPTUAL_PROBES.aetMap.reducedMotion, true);
  assert.equal(CONCEPTUAL_PROBES.gestaltListening.reducedMotion, true);
  assert.equal(CONCEPTUAL_PROBES.rtaPhase.reducedMotion, false);
  assert.equal(CONCEPTUAL_PROBES.tunedOutAttribution.reducedMotion, true);
  assert.equal(CONCEPTUAL_PROBES.tunedOutStudy.reducedMotion, true);
  assert.equal(CONCEPTUAL_PROBES.tunedOutClaim.reducedMotion, true);
  const tunedOut = REPRESENTATIVE_ROUTES.find((route) => route.id === "tuned-out");
  assert.deepEqual(tunedOut?.probes.map((probe) => probe.id), [
    "tuned-out-attribution-reading",
    "tuned-out-study-selection",
    "tuned-out-claim-evidence",
    "save-restore",
  ]);
});

test("contact-sheet modes preserve their distinct screenshot sources", () => {
  const result = { viewportScreenshotPath: "fold.png", screenshotPath: "ecology.png" };
  assert.equal(screenshotSource(result, "fold"), "fold.png");
  assert.equal(screenshotSource(result, "ecology"), "ecology.png");
  assert.equal(contactSheetFilename("desktop", "fold"), "desktop-fold-contact-sheet.png");
  assert.equal(contactSheetFilename("mobile", "ecology"), "mobile-ecology-contact-sheet.png");
});

test("review warnings do not turn a healthy structural gate into a failure", () => {
  const statuses = deriveStatuses({ reviewWarnings: ["axe-findings"] });
  assert.deepEqual(statuses, {
    gateStatus: "PASS",
    reviewStatus: "WARN",
    gateFailures: [],
    reviewWarnings: ["axe-findings"],
  });
  assert.equal(exitCodeForSummary({ gateFail: 0 }), 0);
  assert.equal(exitCodeForSummary({ gateFail: 1 }), 1);
});
