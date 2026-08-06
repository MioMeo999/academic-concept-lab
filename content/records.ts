import type { AnyRecord, RecordKind } from "./types";
import { personEnvironmentFit, jobDemandsResources } from "./theory";
import { musicPreference } from "./music-preference";
import { workplaceDesign } from "./workplace-design";
import { personOrganisationFit } from "./person-organisation-fit";
import { ipa } from "./ipa";
import { rta } from "./rta";
import { tunedOutPaper } from "./paper";

/**
 * The registry. Adding a record means appending one entry here — it then
 * appears in the library, in search, in the filters, in saved, and in the
 * "elsewhere" block on every other record, with no route or template change.
 */
export const RECORDS: AnyRecord[] = [personEnvironmentFit, personOrganisationFit, jobDemandsResources, workplaceDesign, musicPreference, ipa, rta, tunedOutPaper];

export const KIND: Record<RecordKind, {
  label: string; nav: string; colour: string; fill: string; stroke: string; cls: string; path: string; cta: string;
}> = {
  theory: {
    label: "Theory record", nav: "Theory", colour: "var(--teal)",
    fill: "#2E7D8F", stroke: "#22606E", cls: "teal", path: "theory", cta: "Read the theory",
  },
  study: {
    label: "Evidence record", nav: "Empirical study", colour: "var(--red)",
    fill: "#E24E1B", stroke: "#B23C10", cls: "red", path: "study", cta: "Read the evidence",
  },
  method: {
    label: "Method record", nav: "Research method", colour: "var(--gold-deep)",
    fill: "#C9922A", stroke: "#9C7018", cls: "gold", path: "method", cta: "Learn the method",
  },
};

export function recordHref(r: AnyRecord) {
  return `/concept-lab/${KIND[r.kind].path}/${r.slug}`;
}

export function findRecord(kind: RecordKind, slug: string) {
  return RECORDS.find((r) => r.kind === kind && r.slug === slug);
}

export function otherRecords(r: AnyRecord) {
  return RECORDS.filter((x) => x.id !== r.id);
}
