"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AnyRecord, RecordKind } from "@/content/types";
import type { Discipline } from "@/content/disciplines";
import { Icon } from "./Sketch";
import { RecordCard } from "./RecordCard";
import { useSaved } from "./saved";

type Props = {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  /** Saved view filters to starred records and swaps the empty state. */
  onlySaved?: boolean;
};

export function LibraryBrowser({ records, disciplines, onlySaved = false }: Props) {
  const [q, setQ] = useState("");
  // Derived from RecordKind so a new kind never needs a change here.
  const [kind, setKind] = useState<"all" | RecordKind>("all");
  const [discipline, setDiscipline] = useState("all");
  const { ids, ready } = useSaved();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return records.filter((r) => {
      if (onlySaved && !ids.includes(r.id)) return false;
      if (kind !== "all" && r.kind !== kind) return false;
      if (discipline !== "all" && r.discipline !== discipline) return false;
      if (!needle) return true;
      return `${r.title} ${r.hook} ${r.oneSentence} ${r.topics.join(" ")}`.toLowerCase().includes(needle);
    });
  }, [records, q, kind, discipline, onlySaved, ids]);

  // Before localStorage is read, the saved view has nothing truthful to show.
  const pending = onlySaved && !ready;

  return (
    <section>
      <div className="filters">
        <div className="field">
          <label className="k" htmlFor="q">Search</label>
          <input id="q" type="search" placeholder="title, topic, question…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="field">
          <label className="k" htmlFor="disc">Discipline</label>
          <select id="disc" value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
            <option value="all">All disciplines</option>
            {Object.values(disciplines).map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <span className="k">Kind</span>
          <div className="pills" role="group" aria-label="Record kind">
            {([["all", "All", ""], ["theory", "Theory", "teal"], ["study", "Empirical", "red"], ["method", "Method", "gold"]] as const).map(([v, label, cls]) => (
              <button key={v} className={`pill ${cls}`} type="button" aria-pressed={kind === v} onClick={() => setKind(v)}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="resultline">
        <span className="k">{pending ? "…" : `${list.length} of ${records.length} records`}</span>
        {!onlySaved && <Link href="/concept-lab/saved" style={{ fontSize: ".9rem" }}>Saved ({ready ? ids.length : 0}) →</Link>}
      </div>

      {pending ? null : list.length ? (
        <div className="lib">
          {list.map((r) => (
            <RecordCard record={r} key={r.id} />
          ))}
        </div>
      ) : (
        <div className="sk-box dash tilt-r2" style={{ marginTop: "1.2rem" }}>
          <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
            <Icon id={onlySaved ? "i-star" : "i-q"} style={{ width: 22, height: 22, color: "var(--pen-3)" }} />
            <p className="read" style={{ fontSize: ".92rem", color: "var(--pen-3)" }}>
              {onlySaved
                ? "Nothing saved yet. Star a record from the library and it will wait for you here."
                : "No record matches that. Try clearing the filters — the library is still small."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
