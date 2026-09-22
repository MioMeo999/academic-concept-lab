"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import type { AnyRecord } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { recordHref } from "@/content/records";
import {
  getDisciplineOrientation,
  getPresentationGroupsForDiscipline,
  groupRecordsByBranch,
  getUnbranchedRecords,
} from "@/content/atlas";
import { SaveButton } from "../_components/SaveButton";
import { useSaved } from "../_components/saved";
import styles from "./theory-library.module.css";

type DisciplineFilter = "all" | "ob" | "music-psych";

const FIELD_META: Record<Exclude<DisciplineFilter, "all">, {
  label: string;
  short: string;
  accent: string;
}> = {
  ob: {
    label: "Organisations & work",
    short: "work, fit, motivation & exchange",
    accent: "var(--vermilion)",
  },
  "music-psych": {
    label: "Psychology of music",
    short: "perception, structure, expectation & learning",
    accent: "var(--cobalt)",
  },
};

function TheoryRecordRow({ record, index }: { record: AnyRecord; index: number }) {
  const discipline = DISCIPLINES[record.discipline];

  return (
    <article
      className={styles.recordRow}
      data-reveal="rise"
      style={{ "--row-accent": FIELD_META[record.discipline as "ob" | "music-psych"]?.accent ?? "var(--teal)" } as CSSProperties}
    >
      <span className={styles.recordNumber}>{String(index + 1).padStart(2, "0")}</span>
      <div className={styles.recordIdentity}>
        <p className={styles.recordMeta}>{discipline?.name ?? record.discipline}</p>
        <h4>
          <Link href={recordHref(record)}>{record.title}</Link>
        </h4>
        <p className={styles.recordQuestion}>{record.hook}</p>
      </div>
      <div className={styles.recordReading}>
        {record.oneSentence && <p>{record.oneSentence}</p>}
        <div className={styles.factLine} aria-label="Record facts">
          {record.facts.slice(0, 3).map((fact) => <span key={fact}>{fact}</span>)}
        </div>
        {record.statusChip && <small>{record.statusChip}</small>}
      </div>
      <div className={styles.recordActions}>
        <SaveButton id={record.id} />
        <Link href={recordHref(record)} className={styles.readLink}>
          Read theory <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

function TheoryGroup({
  eyebrow,
  title,
  description,
  records,
  order,
  indexById,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  records: AnyRecord[];
  order: number;
  indexById: Map<string, number>;
}) {
  if (!records.length) return null;

  return (
    <section className={styles.group}>
      <header className={styles.groupHeading}>
        <span>{String(order).padStart(2, "0")} · {eyebrow}</span>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </header>
      <div className={styles.groupRecords}>
        {records.map((record) => (
          <TheoryRecordRow
            key={record.id}
            record={record}
            index={indexById.get(record.id) ?? 0}
          />
        ))}
      </div>
    </section>
  );
}

function FieldSection({
  id,
  records,
  indexById,
}: {
  id: "ob" | "music-psych";
  records: AnyRecord[];
  indexById: Map<string, number>;
}) {
  if (!records.length) return null;

  const meta = FIELD_META[id];
  const orientation = getDisciplineOrientation(id);

  if (id === "ob") {
    const groups = getPresentationGroupsForDiscipline(records, id);
    return (
      <section className={styles.fieldSection} data-field={id} style={{ "--field-accent": meta.accent } as CSSProperties}>
        <header className={styles.fieldHeading}>
          <div>
            <span className={styles.fieldIndex}>Field 01</span>
            <h2>{meta.label}</h2>
          </div>
          <p>{orientation?.summary}</p>
          <strong>{records.length} theories</strong>
        </header>
        <div className={styles.fieldGroups}>
          {groups.map((group, index) => (
            <TheoryGroup
              key={group.id}
              eyebrow="question family"
              title={group.label}
              description={group.description}
              records={group.records}
              order={index + 1}
              indexById={indexById}
            />
          ))}
        </div>
      </section>
    );
  }

  const branchGroups = groupRecordsByBranch(records, id).filter((group) => group.records.length > 0);
  const unbranched = getUnbranchedRecords(records, id);

  return (
    <section className={styles.fieldSection} data-field={id} style={{ "--field-accent": meta.accent } as CSSProperties}>
      <header className={styles.fieldHeading}>
        <div>
          <span className={styles.fieldIndex}>Field 02</span>
          <h2>{meta.label}</h2>
        </div>
        <p>{orientation?.summary}</p>
        <strong>{records.length} theories</strong>
      </header>
      <div className={styles.fieldGroups}>
        {branchGroups.map((group, index) => (
          <TheoryGroup
            key={group.branch.id}
            eyebrow="branch"
            title={group.branch.label}
            description={group.branch.description}
            records={group.records}
            order={index + 1}
            indexById={indexById}
          />
        ))}
        {unbranched.length > 0 && (
          <TheoryGroup
            eyebrow="also in the field"
            title="Field frameworks"
            description="Theory records that sit in Psychology of Music without belonging to one of the current branch sequences."
            records={unbranched}
            order={branchGroups.length + 1}
            indexById={indexById}
          />
        )}
      </div>
    </section>
  );
}

export function TheoryLibrary({
  records,
  initialDiscipline,
}: {
  records: AnyRecord[];
  initialDiscipline?: string;
}) {
  const initial = initialDiscipline === "ob" || initialDiscipline === "music-psych" ? initialDiscipline : "all";
  const [discipline, setDiscipline] = useState<DisciplineFilter>(initial);
  const [query, setQuery] = useState("");
  const { ids, ready } = useSaved();

  const indexById = useMemo(() => new Map(records.map((record, index) => [record.id, index])), [records]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((record) => {
      if (discipline !== "all" && record.discipline !== discipline) return false;
      if (!needle) return true;
      return `${record.title} ${record.hook} ${record.oneSentence ?? ""} ${record.topics.join(" ")} ${record.facts.join(" ")}`
        .toLowerCase()
        .includes(needle);
    });
  }, [records, discipline, query]);

  const ob = visible.filter((record) => record.discipline === "ob");
  const music = visible.filter((record) => record.discipline === "music-psych");
  const obTotal = records.filter((record) => record.discipline === "ob").length;
  const musicTotal = records.filter((record) => record.discipline === "music-psych").length;
  const musicBranches = groupRecordsByBranch(records, "music-psych").filter((group) => group.records.length > 0).length;

  return (
    <div className={styles.page}>
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link href="/concept-lab">Home</Link><span aria-hidden="true">/</span>
        <Link href="/concept-lab/library">Library</Link><span aria-hidden="true">/</span>
        <span>Theory</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroTitle}>
          <span className={styles.eyebrow}>Knowledge form · {records.length} records</span>
          <h1>Theory<span>as a lens.</span></h1>
        </div>
        <div className={styles.heroReading}>
          <p className={styles.heroLead}>A theory organises a way of looking. It does not merely name a topic; it decides what becomes visible, what is related, and what still needs evidence.</p>
          <div className={styles.readingPrompts} aria-label="Questions to ask of a theory">
            <span>Ask of every theory</span>
            <ol>
              <li>What does this lens make visible?</li>
              <li>What relationships does it propose?</li>
              <li>Where does the explanation stop?</li>
            </ol>
          </div>
        </div>
        <div className={styles.heroStats} aria-label="Theory index summary">
          <div><b>{records.length}</b><span>theories</span></div>
          <div><b>2</b><span>fields</span></div>
          <div><b>{musicBranches}</b><span>music branches</span></div>
        </div>
      </header>

      <section className={styles.controls} aria-label="Browse theory records">
        <div className={styles.searchField}>
          <label htmlFor="theory-search">Find a theory</label>
          <input
            id="theory-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="title, question, topic…"
          />
        </div>

        <div className={styles.fieldFilter}>
          <span>Read by field</span>
          <div role="group" aria-label="Filter theories by field">
            <button type="button" aria-pressed={discipline === "all"} onClick={() => setDiscipline("all")}>
              All <small>{records.length}</small>
            </button>
            <button type="button" aria-pressed={discipline === "ob"} onClick={() => setDiscipline("ob")}>
              Organisations & work <small>{obTotal}</small>
            </button>
            <button type="button" aria-pressed={discipline === "music-psych"} onClick={() => setDiscipline("music-psych")}>
              Psychology of music <small>{musicTotal}</small>
            </button>
          </div>
        </div>

        <div className={styles.controlLinks}>
          <Link href="/concept-lab/library">All record kinds ↗</Link>
          <Link href="/concept-lab/saved">Saved ({ready ? ids.length : 0}) →</Link>
        </div>
      </section>

      <div className={styles.resultLine} aria-live="polite">
        <span>{query.trim() || discipline !== "all" ? `${visible.length} matching theories` : `${records.length} theories in the atlas`}</span>
        <span>{discipline === "all" ? "two fields · several ways of seeing" : FIELD_META[discipline].short}</span>
      </div>

      {visible.length ? (
        <div className={styles.theoryIndex}>
          {(discipline === "all" || discipline === "ob") && <FieldSection id="ob" records={ob} indexById={indexById} />}
          {(discipline === "all" || discipline === "music-psych") && <FieldSection id="music-psych" records={music} indexById={indexById} />}
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>No theory matches that search.</strong>
          <p>Try a title, topic, question, or clear the field filter.</p>
        </div>
      )}
    </div>
  );
}
