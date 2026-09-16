"use client";

import Link from "next/link";
import type { AnyRecord } from "@/content/types";
import type { Discipline } from "@/content/disciplines";
import { KIND, recordHref } from "@/content/records";
import { getBranch, getKnowledgeFormLabel } from "@/content/atlas";
import { SaveButton } from "@/app/concept-lab/_components/SaveButton";
import { useEffect, useRef, type RefObject } from "react";
import { useSaved } from "@/app/concept-lab/_components/saved";

type Props = { records: AnyRecord[]; disciplines: Record<string, Discipline> };

function KindMark({ kind }: { kind: AnyRecord["kind"] }) {
  return <span className={`saved-kind-mark saved-kind-${kind}`} aria-hidden="true" />;
}

function SavedRecordEntry({ record, index, disciplines }: { record: AnyRecord; index: number; disciplines: Record<string, Discipline> }) {
  const kind = KIND[record.kind];
  const discipline = disciplines[record.discipline];
  const branch = record.primaryBranch ? getBranch(record.primaryBranch, record.discipline) : undefined;
  const form = record.knowledgeForm ? getKnowledgeFormLabel(record.knowledgeForm) : undefined;

  return (
    <article className="saved-entry">
      <span className="saved-entry-number" aria-hidden="true">{String(index).padStart(2, "0")}</span>
      <KindMark kind={record.kind} />
      <div className="saved-entry-body">
        <div className="saved-entry-meta">
          <span className={`saved-entry-kind saved-entry-kind-${record.kind}`}>{kind.label}</span>
          <span>{discipline?.name ?? record.discipline}</span>
          {branch && <><span aria-hidden="true">·</span><span>{branch.label}</span></>}
        </div>
        <h3><Link href={recordHref(record)}>{record.title}</Link></h3>
        <p className="saved-entry-hook">{record.hook}</p>
        {record.statusChip && <p className="saved-entry-note">{record.statusChip}</p>}
        <div className="saved-entry-footer">
          <span className="saved-entry-form">{form ?? "working record"}</span>
          <SaveButton id={record.id} />
          <Link className="saved-entry-open" href={recordHref(record)}>Return to record <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}

function Pile({ records, disciplines }: Props) {
  return <div className="saved-pile-list">{records.map((record, index) => <SavedRecordEntry key={record.id} record={record} index={index + 1} disciplines={disciplines} />)}</div>;
}

function GroupedPile({ records, disciplines }: Props) {
  const groups = Object.values(disciplines).map((discipline) => ({ discipline, records: records.filter((record) => record.discipline === discipline.id) })).filter((group) => group.records.length > 0);
  return <div className="saved-pile-groups">{groups.map((group) => <section className="saved-pile-group" key={group.discipline.id} aria-labelledby={`saved-group-${group.discipline.id}`}><div className="saved-group-heading"><div><span className="saved-kicker">{group.discipline.name}</span><h2 id={`saved-group-${group.discipline.id}`}>{group.records.length} {group.records.length === 1 ? "record" : "records"} kept</h2></div><span className="saved-group-note">return to this field</span></div><Pile records={group.records} disciplines={disciplines} /></section>)}</div>;
}

function EmptyState({ browseRef }: { browseRef: RefObject<HTMLAnchorElement | null> }) {
  return <section className="saved-empty" aria-labelledby="saved-empty-title"><span className="saved-empty-mark" aria-hidden="true">✦</span><div><span className="saved-kicker">the pile is quiet</span><h2 id="saved-empty-title">Nothing saved yet.</h2><p>Keep a question close by saving a record from the Library.</p><Link ref={browseRef} className="saved-primary-link" href="/library-target">Browse the Library <span aria-hidden="true">→</span></Link></div><span className="saved-hand-note">star something worth<br />returning to</span></section>;
}

export function SavedTarget({ records, disciplines }: Props) {
  const { ids, ready } = useSaved();
  const previousCount = useRef<number | null>(null);
  const browseRef = useRef<HTMLAnchorElement>(null);
  const savedRecords = records.filter((record) => ids.includes(record.id));
  const distinctDisciplines = new Set(savedRecords.map((record) => record.discipline)).size;
  const grouped = savedRecords.length >= 6 && distinctDisciplines > 1;

  useEffect(() => {
    if (ready && previousCount.current !== null && previousCount.current > 0 && savedRecords.length === 0) {
      requestAnimationFrame(() => browseRef.current?.focus());
    }
    previousCount.current = ready ? savedRecords.length : previousCount.current;
  }, [ready, savedRecords.length]);

  return (
    <div className="saved-page-shell">
      <section className="saved-opening" aria-labelledby="saved-title">
        <div className="saved-opening-copy">
          <span className="saved-kicker">your working pile</span>
          <h1 id="saved-title">Keep a thought <em>close.</em></h1>
          <p>Records you chose to return to, held together as a small working set.</p>
          <div className="saved-opening-rule" aria-hidden="true" />
          <div className="saved-count-row">
            <strong>{ready ? savedRecords.length : "—"}</strong>
            <span>{ready ? `${savedRecords.length === 1 ? "record" : "records"} kept close` : "reading your pile"}</span>
          </div>
          <p className="saved-device-note">Saved records stay on this device only.</p>
        </div>
        <div className="saved-opening-aside" aria-hidden="true"><span className="saved-star">✦</span><span className="saved-hand-note">come back to<br />a question</span></div>
      </section>

      <div className={`saved-subnav${ready && savedRecords.length === 0 ? " is-empty" : ""}`}><span className="saved-kicker">saved / return / continue</span>{(!ready || savedRecords.length > 0) && <Link href="/library-target">Browse the Library <span aria-hidden="true">→</span></Link>}</div>

      {!ready ? <section className="saved-loading" aria-live="polite">Reading your working pile…</section> : savedRecords.length === 0 ? <EmptyState browseRef={browseRef} /> : (
        <section className="saved-working-section" aria-labelledby="saved-working-title">
          <div className="saved-working-heading"><div><span className="saved-kicker">{grouped ? "lightly grouped by field" : "one continuous pile"}</span><h2 id="saved-working-title">What you kept.</h2></div><span className="saved-working-count" aria-live="polite">{savedRecords.length} {savedRecords.length === 1 ? "record" : "records"}</span></div>
          <p className="saved-working-intro">A quiet place to recognise the questions still in motion.</p>
          {grouped ? <GroupedPile records={savedRecords} disciplines={disciplines} /> : <Pile records={savedRecords} disciplines={disciplines} />}
        </section>
      )}

      <p className="saved-live-region" aria-live="polite" aria-atomic="true">{ready ? `${savedRecords.length} ${savedRecords.length === 1 ? "record" : "records"} kept close on this device.` : ""}</p>
    </div>
  );
}
