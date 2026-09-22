import { getArtAsset, getArtCrop, type ArtAssetId } from "./art-manifest";

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
  organisation: { ...sources.organisation, crop: getArtCrop("home-organisation-systems", "home-organisation-discipline"), alt: "A group working around a table, with organisational layers behind them." },
  music: { ...sources.atlas, crop: getArtCrop("home-atlas-head-globe", "home-music-territory"), alt: "Pencil notes and a waveform connect musical structure with sound." },
  theory: { ...sources.forms, crop: getArtCrop("home-record-forms", "home-theory-form"), alt: "A drawn lens opens a different view of a landscape." },
  mechanism: { ...sources.forms, crop: getArtCrop("home-record-forms", "home-mechanism-form"), alt: "A drawn path connects successive points through a field." },
  method: { ...sources.forms, crop: getArtCrop("home-record-forms", "home-method-form"), alt: "A magnifying glass examines layers of a model." },
  study: { ...sources.forms, crop: getArtCrop("home-record-forms", "home-study-form"), alt: "Drawn research pages bring charts and observations together." },
  books: { ...sources.sources, crop: getArtCrop("home-provenance-sources", "home-source-books"), alt: "A graphite stack of books labelled publications, research, archives, data and ideas." },
} as const;

export type ArtFragmentName = keyof typeof ART_FRAGMENTS;
