import Link from "next/link";
import type { AnyRecord } from "@/content/types";
import { KIND, recordHref } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import { accent, type Accent } from "./wm";

/* Only one record has been retypeset. Everything else keeps working by
   pointing at the live record, and says so rather than pretending. */
export const STUDIED = "gestalt-principles-in-music";

export function studyHref(record: AnyRecord) {
  return record.id === STUDIED ? "/experiments/gestalt-visual-study" : recordHref(record);
}

const KIND_ACCENT: Record<string, Accent> = {
  theory: "blue",
  study: "red",
  method: "amber",
  mechanism: "violet",
};

export function WmRecordCard({ record, why }: { record: AnyRecord; why?: string }) {
  const inStudy = record.id === STUDIED;
  return (
    <div style={accent(KIND_ACCENT[record.kind] ?? "ink")}>
      <Link className="wm-card" href={studyHref(record)}>
        <span className="wm-card-kind">{KIND[record.kind].nav}</span>
        <h3>{record.title}</h3>
        <p className="h">{record.hook}</p>
        <p className="m">
          {DISCIPLINES[record.discipline]?.short ?? record.discipline}
          {" · "}
          {inStudy ? "retypeset in this study" : "opens the live record ↗"}
        </p>
      </Link>
      {why && <p className="wm-why">{why}</p>}
    </div>
  );
}
