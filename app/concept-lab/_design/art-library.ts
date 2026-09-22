import { getArtAsset, type ArtAssetId } from "./art-manifest";

/**
 * Authored artwork as vocabulary. Coordinates are source pixels, never data.
 * The excerpts are editorial visual analogies; live HTML carries the content.
 * The manifest owns source identity and dimensions; this compatibility layer
 * preserves the Home fragment names and exact crop values used by the page.
 */
function source(id: ArtAssetId) {
  const asset = getArtAsset(id);
  return { src: asset.src, width: asset.dimensions.width, height: asset.dimensions.height };
}

const sources = {
  organisation: source("home-organisation-systems"),
  atlas: source("home-atlas-head-globe"),
  forms: source("home-record-forms"),
  sources: source("home-provenance-sources"),
} as const;

export const ART_FRAGMENTS = {
  organisation: { ...sources.organisation, crop: [310, 340, 590, 330], alt: "A group working around a table, with organisational layers behind them." },
  music: { ...sources.atlas, crop: [165, 284, 367, 240], alt: "Pencil notes and a waveform connect musical structure with sound." },
  theory: { ...sources.forms, crop: [65, 245, 390, 315], alt: "A drawn lens opens a different view of a landscape." },
  mechanism: { ...sources.forms, crop: [480, 270, 365, 300], alt: "A drawn path connects successive points through a field." },
  method: { ...sources.forms, crop: [925, 285, 290, 300], alt: "A magnifying glass examines layers of a model." },
  study: { ...sources.forms, crop: [1315, 210, 325, 380], alt: "Drawn research pages bring charts and observations together." },
  books: { ...sources.sources, crop: [15, 279, 355, 258], alt: "A graphite stack of books labelled publications, research, archives, data and ideas." },
} as const;

export type ArtFragmentName = keyof typeof ART_FRAGMENTS;
