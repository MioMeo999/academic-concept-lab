import assert from "node:assert/strict";
import test from "node:test";
import { FULL_SITE_ROUTES, REQUIRED_REPRESENTATIVE_IDS, REPRESENTATIVE_ROUTES, VIEWPORTS } from "../scripts/verification-routes.mjs";

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
