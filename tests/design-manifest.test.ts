import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { ART_ASSETS, ART_ASSET_IDS, getArtCrop } from "../app/concept-lab/_design/art-manifest";
import { ART_FRAGMENTS } from "../app/concept-lab/_design/art-library";
import { EXPERIENCE_MANIFEST } from "../app/concept-lab/_design/experience-manifest";

test("art asset ids are unique and every registered source exists", () => {
  const ids = ART_ASSETS.map((asset) => asset.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(new Set(ids), new Set(ART_ASSET_IDS));

  for (const asset of ART_ASSETS) {
    const source = join(process.cwd(), "public", asset.src.slice(1));
    assert.ok(existsSync(source), `${asset.id} source is missing: ${source}`);
    assert.ok(asset.baseDescription.length > 0, `${asset.id} needs a base description`);
  }
});

test("documented crop candidates stay inside their source dimensions", () => {
  for (const asset of ART_ASSETS) {
    for (const crop of asset.cropCandidates) {
      const [x, y, width, height] = crop.bounds;
      assert.ok(x >= 0 && y >= 0, `${asset.id}/${crop.id} starts outside the source`);
      assert.ok(width > 0 && height > 0, `${asset.id}/${crop.id} must have positive dimensions`);
      assert.ok(x + width <= asset.dimensions.width, `${asset.id}/${crop.id} exceeds source width`);
      assert.ok(y + height <= asset.dimensions.height, `${asset.id}/${crop.id} exceeds source height`);
    }
  }
});

test("experience art references resolve to registered assets", () => {
  const assets = new Set(ART_ASSETS.map((asset) => asset.id));
  const experiences = new Set(EXPERIENCE_MANIFEST.map((experience) => experience.experienceId));
  assert.equal(experiences.size, EXPERIENCE_MANIFEST.length);

  for (const experience of EXPERIENCE_MANIFEST) {
    for (const assetId of experience.artAssetIds) {
      assert.ok(assets.has(assetId), `${experience.experienceId} references unknown art ${assetId}`);
    }
  }
});

test("canonical routes stay distinct from historical benchmark routes", () => {
  for (const experience of EXPERIENCE_MANIFEST) {
    assert.ok(experience.route.startsWith("/"));
    if (experience.historicalBenchmarkRoute) {
      assert.notEqual(experience.route, experience.historicalBenchmarkRoute);
      assert.ok(experience.historicalBenchmarkRoute.startsWith("/"));
    }
  }
  assert.equal("benchmarkRoute" in EXPERIENCE_MANIFEST[0], false);
});

test("Home fragments resolve every crop through the art manifest", () => {
  const cropRefs = {
    organisation: ["home-organisation-systems", "home-organisation-discipline"],
    music: ["home-atlas-head-globe", "home-music-territory"],
    theory: ["home-record-forms", "home-theory-form"],
    mechanism: ["home-record-forms", "home-mechanism-form"],
    method: ["home-record-forms", "home-method-form"],
    study: ["home-record-forms", "home-study-form"],
    books: ["home-provenance-sources", "home-source-books"],
  } as const;

  for (const [name, [assetId, cropId]] of Object.entries(cropRefs)) {
    assert.deepEqual(ART_FRAGMENTS[name as keyof typeof ART_FRAGMENTS].crop, getArtCrop(assetId, cropId));
  }
});

test("frozen benchmark experiences point only to frozen artwork", () => {
  const assets = new Map(ART_ASSETS.map((asset) => [asset.id, asset] as const));
  for (const experience of EXPERIENCE_MANIFEST.filter((entry) => entry.status === "frozen")) {
    for (const assetId of experience.artAssetIds) {
      assert.equal(assets.get(assetId)?.status, "frozen", `${experience.experienceId} uses non-frozen art ${assetId}`);
    }
  }
});
