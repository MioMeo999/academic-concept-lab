/** Authored artwork as vocabulary. Coordinates are source pixels, never data.
 * The excerpts are editorial visual analogies; live HTML carries the content.
 * Originals: Desktop/Concept Lab Home Art Assets, installed in public/visual-language/home.
 */
const sources = {
  organisation: { src: "/visual-language/home/home-organisation-systems.webp", width: 1536, height: 1024 },
  atlas: { src: "/visual-language/home/home-atlas-head-globe.webp", width: 1672, height: 941 },
  forms: { src: "/visual-language/home/home-record-forms.webp", width: 1672, height: 941 },
  sources: { src: "/visual-language/home/home-provenance-sources.webp", width: 1672, height: 941 },
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
