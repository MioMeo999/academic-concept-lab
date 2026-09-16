"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { AnyRecord, RecordKind } from "@/content/types";
import type { Discipline } from "@/content/disciplines";
import { DISCIPLINES } from "@/content/disciplines";
import { KIND, recordHref } from "@/content/records";
import {
  getBranch,
  getDisciplineOrientation,
  getLearningPathsForDiscipline,
  getKnowledgeFormLabel,
  getPresentationGroupsForDiscipline,
  getUnbranchedRecords,
  groupRecordsByBranch,
  groupRecordsByDiscipline,
} from "@/content/atlas";
import { SaveButton } from "@/app/concept-lab/_components/SaveButton";
import { useSaved } from "@/app/concept-lab/_components/saved";

type KindFilter = "all" | RecordKind;

type Props = {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  initialKind?: RecordKind;
  initialDiscipline?: string;
  initialQuery?: string;
};

const PRIMARY_DISCIPLINES = ["ob", "music-psych"] as const;
const SECONDARY_DISCIPLINES = ["qual-methods", "psychobiology"] as const;
const KIND_ORDER: KindFilter[] = ["all", "theory", "study", "method", "mechanism"];

const KIND_QUESTIONS: Record<KindFilter, string> = {
  all: "all ways into the collection",
  theory: "what lens helps me understand this?",
  study: "what happened when someone examined it?",
  method: "how can I investigate it?",
  mechanism: "through what process might it happen?",
};

function Mark({ kind }: { kind: RecordKind }) {
  return <span className={`index-mark index-mark-${kind}`} aria-hidden="true" />;
}

function disciplineHref(id: string, q: string, kind: KindFilter) {
  const params = new URLSearchParams();
  if (id !== "all") params.set("discipline", id);
  if (kind !== "all") params.set("kind", kind);
  if (q.trim()) params.set("q", q.trim());
  const query = params.toString();
  return `/library-target${query ? `?${query}` : ""}`;
}

function EditorialRecordEntry({ record, index }: { record: AnyRecord; index: number }) {
  const kind = KIND[record.kind];
  const discipline = DISCIPLINES[record.discipline];
  const branch = record.primaryBranch ? getBranch(record.primaryBranch, record.discipline) : undefined;
  const form = record.knowledgeForm ? getKnowledgeFormLabel(record.knowledgeForm) : undefined;

  return (
    <article className={`index-entry index-entry-${record.kind}`}>
      <div className="index-entry-number" aria-hidden="true">{String(index).padStart(2, "0")}</div>
      <Mark kind={record.kind} />
      <div className="index-entry-body">
        <div className="index-entry-meta">
          <span className={`index-kind index-kind-${record.kind}`}>{kind.label}</span>
          <span>{discipline?.name ?? record.discipline}</span>
          {branch && <><span aria-hidden="true">·</span><span>{branch.label}</span></>}
        </div>
        <h3><Link href={recordHref(record)}>{record.title}</Link></h3>
        <p className="index-entry-hook">{record.hook}</p>
        {record.statusChip && <p className="index-entry-note">{record.statusChip}</p>}
        <div className="index-entry-footer">
          <span className="index-entry-form">{form ?? "working record"}</span>
          <SaveButton id={record.id} />
          <Link className="index-open" href={recordHref(record)}>Open <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}

function IndexEntries({ records }: { records: AnyRecord[] }) {
  return <div className="index-entries">{records.map((record, index) => <EditorialRecordEntry key={record.id} record={record} index={index + 1} />)}</div>;
}

function DisciplineTerritoriesWithCounts({ disciplines, records, current, q, kind }: { disciplines: Record<string, Discipline>; records: AnyRecord[]; current: string; q: string; kind: KindFilter }) {
  const count = (id: string) => records.filter((record) => record.discipline === id).length;
  return (
    <div className="territory-layout">
      <div className="territory-primary">
        {PRIMARY_DISCIPLINES.map((id, index) => {
          const discipline = disciplines[id];
          return (
            <Link key={id} className={`territory-entry territory-entry-${index + 1}${current === id ? " is-current" : ""}`} href={disciplineHref(id, q, kind)} aria-current={current === id ? "page" : undefined}>
              <span className="territory-number">0{index + 1}</span>
              <span className="territory-mark" aria-hidden="true" />
              <span className="territory-copy"><strong>{discipline.name}</strong><small>{getDisciplineOrientation(id)?.summary}</small><em>{count(id)} records · enter field →</em></span>
            </Link>
          );
        })}
      </div>
      <div className="territory-secondary">
        <span className="section-kicker">also in the lab</span>
        {SECONDARY_DISCIPLINES.map((id) => { const discipline = disciplines[id]; return <Link key={id} className={current === id ? "is-current" : ""} href={disciplineHref(id, q, kind)} aria-current={current === id ? "page" : undefined}><span className="small-territory-mark" aria-hidden="true" />{discipline.name}<small>{count(id)} records</small><span aria-hidden="true">→</span></Link>; })}
      </div>
    </div>
  );
}

function FieldHeading({ disciplineId, title, description, count }: { disciplineId: string; title: string; description: string; count: number }) {
  return <div className="field-heading"><div><Link className="field-back" href="/library-target">← back to all fields</Link><span className="section-kicker">entered field</span><h2><Link className="field-title-link" href={disciplineHref(disciplineId, "", "all")} aria-current="page">{title}</Link></h2><p>{description}</p></div><span className="field-count"><strong>{count}</strong> records</span></div>;
}

function MusicField({ records }: { records: AnyRecord[] }) {
  const orientation = getDisciplineOrientation("music-psych");
  const branches = groupRecordsByBranch(records, "music-psych").filter((group) => group.records.length > 0);
  const paths = getLearningPathsForDiscipline("music-psych");
  const unbranched = getUnbranchedRecords(records, "music-psych");
  return (
    <div className="field-view field-view-music">
      <FieldHeading disciplineId="music-psych" title="Psychology of Music" description={orientation?.summary ?? "A field for perception, structure and expectation."} count={records.length} />
      <nav className="branch-index" aria-label="Psychology of Music research threads"><div className="section-kicker">research threads</div><ol>{branches.map(({ branch, records: branchRecords }) => <li key={branch.id}><a href={`#library-${branch.id}`}><span>{String(branch.order).padStart(2, "0")}</span><strong>{branch.label}</strong><small>{branchRecords.length} records</small></a></li>)}</ol></nav>
      <div className="learning-paths"><div className="subheading-row"><span className="section-kicker">reading paths</span><span>follow a question through the field</span></div>{paths.map((path) => <article className="learning-path" key={path.id}><div><h3>{path.question}</h3><p>{path.description}</p></div><ol>{path.recordIds.map((id, index) => { const record = records.find((item) => item.id === id); return record ? <li key={record.id}><span>{String(index + 1).padStart(2, "0")}</span><Link href={recordHref(record)}>{record.title}</Link></li> : null; })}</ol></article>)}</div>
      <div className="field-sections">{branches.map(({ branch, records: branchRecords }) => <section className="index-family" id={`library-${branch.id}`} key={branch.id}><div className="family-heading"><span className="family-number">{String(branch.order).padStart(2, "0")}</span><div><h3>{branch.label}</h3><p>{branch.description}</p></div><span>{branchRecords.length} records</span></div><IndexEntries records={branchRecords} /></section>)}{unbranched.length > 0 && <section className="index-family"><div className="family-heading"><span className="family-number">—</span><div><h3>Also in Psychology of Music</h3><p>Records that belong to the field without a current research thread.</p></div><span>{unbranched.length} records</span></div><IndexEntries records={unbranched} /></section>}</div>
    </div>
  );
}

function OrganisationalField({ records }: { records: AnyRecord[] }) {
  const orientation = getDisciplineOrientation("ob");
  const groups = getPresentationGroupsForDiscipline(records, "ob");
  return <div className="field-view field-view-ob"><FieldHeading disciplineId="ob" title="Organizational Behaviour" description={orientation?.summary ?? "How people fit work and how work shapes experience."} count={records.length} /><div className="field-sections">{groups.map((group, index) => <section className="index-family" key={group.id}><div className="family-heading"><span className="family-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{group.label}</h3><p>{group.description}</p></div><span>{group.records.length} records</span></div><IndexEntries records={group.records} /></section>)}</div></div>;
}

function SimpleField({ discipline, records }: { discipline: string; records: AnyRecord[] }) {
  const info = DISCIPLINES[discipline];
  const orientation = getDisciplineOrientation(discipline);
  return <div className="field-view"><FieldHeading disciplineId={discipline} title={info.name} description={orientation?.summary ?? "A smaller field in the working index."} count={records.length} /><section className="index-family"><div className="family-heading"><span className="family-number">—</span><div><h3>Working records</h3><p>Browse this collection as a clean editorial index.</p></div><span>{records.length} records</span></div><IndexEntries records={records} /></section></div>;
}

function AllLibrary({ records, disciplines }: { records: AnyRecord[]; disciplines: Record<string, Discipline> }) {
  return <div className="all-library">{groupRecordsByDiscipline(records, disciplines).map(({ discipline, records: fieldRecords }, index) => { const orientation = getDisciplineOrientation(discipline.id); return <section className={`index-discipline index-discipline-${discipline.id}`} id={`discipline-${discipline.id}`} key={discipline.id}><div className="discipline-heading"><div><span className="section-kicker">{String(index + 1).padStart(2, "0")} · knowledge territory</span><h2>{discipline.name}</h2><p>{orientation?.summary}</p></div><span><strong>{fieldRecords.length}</strong> records</span></div><IndexEntries records={fieldRecords} /></section>; })}</div>;
}

function NarrowedResults({ records, total, label, onClear }: { records: AnyRecord[]; total: number; label: string; onClear: () => void }) {
  return <section className="narrowed-results" aria-labelledby="results-title"><div className="narrowed-heading"><div><span className="section-kicker">{label}</span><h2 id="results-title">A compact reading list.</h2></div><span>{records.length} of {total} records</span></div>{records.length ? <IndexEntries records={records} /> : <div className="empty-index"><span className="empty-mark" aria-hidden="true">?</span><h3>No record matches that thread.</h3><p><button className="empty-clear" type="button" onClick={onClear}>Clear the search</button><span> or choose another way into the collection.</span></p></div>}</section>;
}

function OpeningKnowledgeForms({ kind, onChange, onReset }: { kind: KindFilter; onChange: (next: KindFilter) => void; onReset: () => void }) {
  const values = KIND_ORDER.filter((value): value is Exclude<KindFilter, "all"> => value !== "all");
  return <aside className="index-orientation" aria-label="Ways into the working index"><span className="section-kicker">four ways in</span><ol>{values.map((value) => <li key={value}><button type="button" className={`orientation-control orientation-control-${value}${kind === value ? " is-selected" : ""}`} aria-pressed={kind === value} onClick={() => onChange(value)}><i className={`orientation-mark orientation-${value}`} aria-hidden="true" /><span><strong>{value === "method" ? "Method" : KIND[value].nav}</strong><small>{KIND_QUESTIONS[value]}</small></span></button></li>)}</ol><button className="orientation-reset" type="button" onClick={onReset} aria-pressed={kind === "all"}><span aria-hidden="true">↺</span> All records</button><span className="hand-note">start anywhere.<br />follow the thread.</span></aside>;
}

export function LibraryTarget({ records, disciplines, initialKind, initialDiscipline, initialQuery = "" }: Props) {
  const [q, setQ] = useState(initialQuery);
  const [kind, setKind] = useState<KindFilter>(initialKind ?? "all");
  const [discipline] = useState(initialDiscipline ?? "all");
  const searchRef = useRef<HTMLInputElement>(null);
  const { ids, ready } = useSaved();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return records.filter((record) => {
      if (kind !== "all" && record.kind !== kind) return false;
      if (discipline !== "all" && record.discipline !== discipline) return false;
      if (!needle) return true;
      return `${record.title} ${record.hook} ${record.oneSentence} ${record.topics.join(" ")}`.toLowerCase().includes(needle);
    });
  }, [discipline, kind, q, records]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (discipline !== "all") params.set("discipline", discipline);
    if (kind !== "all") params.set("kind", kind);
    if (q.trim()) params.set("q", q.trim());
    const query = params.toString();
    window.history.replaceState(null, "", `/library-target${query ? `?${query}` : ""}`);
  }, [discipline, kind, q]);

  const utilityNarrowing = Boolean(q.trim()) || kind !== "all";
  const fieldMode = !utilityNarrowing && discipline !== "all";
  const selectedRecords = discipline === "all" ? [] : list;
  const statusLabel = utilityNarrowing ? (q.trim() ? "search results" : `${KIND[kind as RecordKind].nav} records`) : discipline === "all" ? "current atlas" : "entered field";
  const resetToExplore = () => { setQ(""); setKind("all"); requestAnimationFrame(() => searchRef.current?.focus()); };

  return (
    <div className="library-page-shell">
      <section className={`library-opening${utilityNarrowing || fieldMode ? " is-compact" : ""}`} aria-labelledby="library-title">
        <div className="library-opening-copy"><span className="section-kicker">the library · a working index</span><h1 id="library-title">Find a question.<br /><em>Follow a thread.</em></h1><p>Every idea in the lab, kept in one working index. Enter by discipline, knowledge form, or the question that has brought you here.</p><div className="opening-facts"><span><strong>{records.length}</strong><small>records in the atlas</small></span><span><strong>{Object.keys(disciplines).length}</strong><small>knowledge territories</small></span><span><strong>4</strong><small>ways into a record</small></span></div></div>
        <OpeningKnowledgeForms kind={kind} onChange={setKind} onReset={resetToExplore} />
      </section>

      <section className="library-search-section" id="find" aria-labelledby="find-title">
        <div className="search-intro"><span className="section-kicker">01 · find a thread</span><h2 id="find-title">What do you want to read?</h2><p>Searches titles, questions, explanations and topics already indexed in the atlas.</p></div>
        <div className="search-workbench"><label htmlFor="library-query">Search the working index</label><input ref={searchRef} id="library-query" type="search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="theory, topic, question…" /><span className="search-rule" aria-hidden="true" /></div>
        <div className="collection-status" aria-live="polite"><span><strong>{list.length}</strong> {statusLabel}{utilityNarrowing || discipline !== "all" ? ` of ${records.length}` : ""}</span><Link href="/concept-lab/saved">Saved ({ready ? ids.length : 0}) →</Link></div>
      </section>

      {!utilityNarrowing && !fieldMode && <section className="library-browse-section" id="territories" aria-labelledby="territories-title"><div className="browse-heading"><div><span className="section-kicker">02 · where in the landscape?</span><h2 id="territories-title">Browse by discipline.</h2></div><span className="hand-note">enter a field<br />then look around</span></div><DisciplineTerritoriesWithCounts disciplines={disciplines} records={records} current={discipline} q={q} kind={kind} /></section>}

      <section className={`library-results-section ${utilityNarrowing ? "is-find" : fieldMode ? "is-field" : "is-explore"}`} aria-labelledby="results-heading"><div className="results-topline"><span className="section-kicker">{utilityNarrowing ? "02 · find results" : fieldMode ? "02 · entered field" : "03 · the working index"}</span><span>{list.length} records currently visible</span></div>{utilityNarrowing ? <NarrowedResults records={list} total={records.length} label={q.trim() ? "search results" : `${KIND[kind as RecordKind].nav} records`} onClear={resetToExplore} /> : discipline === "all" ? <AllLibrary records={list} disciplines={disciplines} /> : discipline === "music-psych" ? <MusicField records={selectedRecords} /> : discipline === "ob" ? <OrganisationalField records={selectedRecords} /> : <SimpleField discipline={discipline} records={selectedRecords} />}</section>
    </div>
  );
}
