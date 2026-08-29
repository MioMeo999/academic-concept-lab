"use client";

import { useMemo, useState } from "react";
import type { AnyRecord, RecordKind } from "@/content/types";
import type { Discipline } from "@/content/disciplines";
import { KIND } from "@/content/records";
import { groupRecordsByDiscipline } from "@/content/atlas";
import { useSaved } from "@/app/concept-lab/_components/saved";
import { WmRecordCard } from "./WmRecordCard";
import { accent, solidFill, type Accent } from "./wm";

const FILTERS: readonly ["all" | RecordKind, string, Accent][] = [
  ["all", "All", "ink"],
  ["theory", "Theory", "blue"],
  ["study", "Study", "red"],
  ["method", "Method", "amber"],
  ["mechanism", "Mechanism", "violet"],
];

export function WmLibrary({
  records,
  disciplines,
  initialKind,
  initialDiscipline,
}: {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  initialKind?: RecordKind;
  initialDiscipline?: string;
}) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | RecordKind>(initialKind ?? "all");
  const [discipline, setDiscipline] = useState(initialDiscipline ?? "all");
  const { ids, ready } = useSaved();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return records.filter((record) => {
      if (kind !== "all" && record.kind !== kind) return false;
      if (discipline !== "all" && record.discipline !== discipline) return false;
      if (!needle) return true;
      return `${record.title} ${record.hook} ${record.oneSentence} ${record.topics.join(" ")}`.toLowerCase().includes(needle);
    });
  }, [records, q, kind, discipline]);

  const narrowed = Boolean(q.trim()) || kind !== "all";
  const label = q.trim() ? "Search results" : kind !== "all" ? `${KIND[kind].nav} records` : "All records";
  const groups = groupRecordsByDiscipline(list, disciplines);

  return (
    <section>
      <div className="wm-filters">
        <div className="wm-field">
          <label className="wm-label" htmlFor="wm-q">Search</label>
          <input id="wm-q" type="search" placeholder="title, topic, question…" value={q} onChange={(event) => setQ(event.target.value)} />
        </div>

        <div className="wm-field">
          <span className="wm-label" id="wm-kind-label">Kind</span>
          <div className="wm-pills" role="group" aria-labelledby="wm-kind-label">
            {FILTERS.map(([value, text, tone]) => (
              <button
                key={value}
                type="button"
                className="wm-pill"
                style={{ ["--wm-pill-c" as string]: solidFill(tone) }}
                aria-pressed={kind === value}
                onClick={() => setKind(value)}
              >
                <span className="dot" aria-hidden="true" />
                {text}
              </button>
            ))}
          </div>
        </div>

        <div className="wm-field">
          <span className="wm-label" id="wm-disc-label">Discipline</span>
          <div className="wm-pills" role="group" aria-labelledby="wm-disc-label">
            <button type="button" className="wm-pill" aria-pressed={discipline === "all"} onClick={() => setDiscipline("all")}>
              All
            </button>
            {Object.values(disciplines).map((entry) => (
              <button
                key={entry.id}
                type="button"
                className="wm-pill"
                aria-pressed={discipline === entry.id}
                onClick={() => setDiscipline(entry.id)}
              >
                {entry.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wm-resultline">
        <span className="wm-label">{narrowed ? `${label} · ` : ""}{list.length} of {records.length} records</span>
        <span className="wm-label">Saved · {ready ? ids.length : 0}</span>
      </div>

      {list.length === 0 ? (
        <p className="wm-empty">No record matches that. Try clearing the filters — the library is still small.</p>
      ) : narrowed || discipline !== "all" ? (
        <div className="wm-cards">
          {list.map((record) => <WmRecordCard record={record} key={record.id} />)}
        </div>
      ) : (
        groups.map(({ discipline: field, records: fieldRecords }, index) => (
          <div className="wm-group" key={field.id} style={accent(index % 2 ? "blue" : "green")}>
            <div className="wm-group-head">
              <h2>{field.name}</h2>
              <span className="wm-label">{fieldRecords.length} {fieldRecords.length === 1 ? "record" : "records"}</span>
            </div>
            <div className="wm-cards">
              {fieldRecords.map((record) => <WmRecordCard record={record} key={record.id} />)}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
