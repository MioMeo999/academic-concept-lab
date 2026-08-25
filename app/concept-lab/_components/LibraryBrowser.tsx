"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AnyRecord, RecordKind } from "@/content/types";
import type { Discipline } from "@/content/disciplines";
import { KIND } from "@/content/records";
import { getUnbranchedRecords, getPresentationGroupsForDiscipline, groupRecordsByBranch, groupRecordsByDiscipline } from "@/content/atlas";
import { Icon } from "./Sketch";
import { RecordCard } from "./RecordCard";
import { AtlasRecordGroup } from "./AtlasRecordGroup";
import { BranchSection } from "./BranchSection";
import { DisciplineOrientation } from "./DisciplineOrientation";
import { useSaved } from "./saved";

type Props = {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  /** Saved view filters to starred records and swaps the empty state. */
  onlySaved?: boolean;
  /** Seeded from the URL, so a filtered library is linkable and shareable. */
  initialKind?: "all" | RecordKind;
  initialDiscipline?: string;
  /** The main Library page has visible editorial discipline navigation. */
  showDisciplineSelect?: boolean;
};

const KIND_FILTERS: readonly ["all" | RecordKind, string, string][] = [
  ["all", "All", ""],
  ["theory", "Theory", "teal"],
  ["study", "Study", "red"],
  ["method", "Method", "gold"],
  ["mechanism", "Mechanism", "plum"],
];

function FlatRecords({ records }: { records: AnyRecord[] }) {
  return <div className="lib">{records.map((record) => <RecordCard record={record} key={record.id} />)}</div>;
}

function SelectedDisciplineRecords({ discipline, records, disciplines }: { discipline: string; records: AnyRecord[]; disciplines: Record<string, Discipline> }) {
  const branchGroups = groupRecordsByBranch(records, discipline);
  const presentationGroups = getPresentationGroupsForDiscipline(records, discipline);
  const unbranched = getUnbranchedRecords(records, discipline);

  if (discipline === "music-psych") {
    return (
      <>
        <DisciplineOrientation disciplineId={discipline} records={records} />
        <div className="atlas-branch-sections">
          {branchGroups.map((group) => <BranchSection group={group} key={group.branch.id} />)}
        </div>
        {unbranched.length > 0 && (
          <AtlasRecordGroup
            id="also-in-psychology-of-music"
            title="Also in Psychology of Music"
            description="These records sit in the discipline but are not assigned to the current branches. Music Preference is a field-level framework about person–music fit and preference."
            records={unbranched}
          />
        )}
      </>
    );
  }

  if (discipline === "ob") {
    return (
      <>
        <DisciplineOrientation disciplineId={discipline} records={records} />
        <div className="atlas-record-sections">
          {presentationGroups.map((group) => <AtlasRecordGroup key={group.id} title={group.label} description={group.description} records={group.records} />)}
        </div>
      </>
    );
  }

  const label = disciplines[discipline]?.name ?? discipline;
  return (
    <>
      <DisciplineOrientation disciplineId={discipline} records={records} />
      <AtlasRecordGroup title={label} records={records} />
    </>
  );
}

export function LibraryBrowser({ records, disciplines, onlySaved = false, initialKind, initialDiscipline, showDisciplineSelect = true }: Props) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | RecordKind>(initialKind ?? "all");
  const [discipline, setDiscipline] = useState(initialDiscipline ?? "all");
  const { ids, ready } = useSaved();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return records.filter((record) => {
      if (onlySaved && !ids.includes(record.id)) return false;
      if (kind !== "all" && record.kind !== kind) return false;
      if (discipline !== "all" && record.discipline !== discipline) return false;
      if (!needle) return true;
      return `${record.title} ${record.hook} ${record.oneSentence} ${record.topics.join(" ")}`.toLowerCase().includes(needle);
    });
  }, [records, q, kind, discipline, onlySaved, ids]);

  const pending = onlySaved && !ready;
  const utilityNarrowing = Boolean(q.trim()) || onlySaved || kind !== "all";
  const selectedDiscipline = discipline !== "all" ? discipline : undefined;
  const utilityLabel = q.trim() ? "Search results" : onlySaved ? "Saved records" : kind !== "all" ? `${KIND[kind].nav} records` : "Filtered results";
  const resultCount = `${list.length} of ${records.length} records`;

  return (
    <section>
      <div className="filters">
        <div className="field field-search">
          <label className="k" htmlFor="q">Search</label>
          <input id="q" type="search" placeholder="title, topic, question…" value={q} onChange={(event) => setQ(event.target.value)} />
        </div>
        {showDisciplineSelect && (
          <div className="field">
            <label className="k" htmlFor="disc">Discipline</label>
            <select id="disc" value={discipline} onChange={(event) => setDiscipline(event.target.value)}>
              <option value="all">All disciplines</option>
              {Object.values(disciplines).map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        )}
        <div className="field">
          <span className="k">Kind</span>
          <div className="pills" role="group" aria-label="Record kind">
            {KIND_FILTERS.map(([value, label, cls]) => (
              <button key={value} className={`pill ${cls}`} type="button" aria-pressed={kind === value} onClick={() => setKind(value)}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="resultline">
        <span className="k">{pending ? "…" : utilityNarrowing ? `${utilityLabel} · ${resultCount}` : resultCount}</span>
        {!onlySaved && <Link className="quiet-link" href="/concept-lab/saved" style={{ fontSize: ".9rem" }}>Saved ({ready ? ids.length : 0}) →</Link>}
      </div>

      {pending ? null : list.length ? (
        utilityNarrowing ? (
          <FlatRecords records={list} />
        ) : selectedDiscipline ? (
          <SelectedDisciplineRecords discipline={selectedDiscipline} records={list} disciplines={disciplines} />
        ) : (
          <div className="atlas-discipline-sections">
            {groupRecordsByDiscipline(list, disciplines).map(({ discipline: field, records: fieldRecords }) => (
              <AtlasRecordGroup key={field.id} id={`discipline-${field.id}`} title={field.name} records={fieldRecords} />
            ))}
          </div>
        )
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
