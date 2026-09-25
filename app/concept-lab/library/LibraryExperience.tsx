"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { AnyRecord, RecordKind } from "@/content/types";
import type { Discipline } from "@/content/disciplines";
import { KIND } from "@/content/records";
import { LibraryBrowser } from "../_components/LibraryBrowser";
import styles from "./library-hub.module.css";

type RecordReference = {
  id: string;
  title: string;
  href: string;
  kind: RecordKind;
  oneSentence: string;
};

type KnowledgeForm = {
  kind: RecordKind;
  role: string;
  explanation: string;
  count: number;
  examples: RecordReference[];
};

type FieldGroup = {
  id: string;
  label: string;
  description: string;
  records: RecordReference[];
};

type FieldExperience = {
  id: string;
  name: string;
  short: string;
  count: number;
  summary: string;
  href: string;
  records: RecordReference[];
  groups: FieldGroup[];
};

type ReadingPath = {
  id: string;
  question: string;
  description: string;
  discipline: string;
  tone: "blue" | "coral" | "teal";
  trace: string;
  echo: string;
  mobileTrace: string;
  records: RecordReference[];
};

type Props = {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  initialDiscipline?: string;
  forms: KnowledgeForm[];
  fields: FieldExperience[];
  paths: ReadingPath[];
};

function SectionLead({ headingId, number, eyebrow, title, note }: { headingId: string; number: string; eyebrow: string; title: string; note: string }) {
  return (
    <div className={styles.sectionLead}>
      <p className={styles.sectionEyebrow}><span>{number}</span>{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      <p className={styles.sectionNote}>{note}</p>
    </div>
  );
}

function KnowledgeFormExplorer({ forms }: { forms: KnowledgeForm[] }) {
  const [activeKind, setActiveKind] = useState<RecordKind>("theory");
  const selected = forms.find((form) => form.kind === activeKind) ?? forms[0];

  if (!selected) return null;

  return (
    <section className={`${styles.section} ${styles.formExplorer}`} id="knowledge-forms" aria-labelledby="knowledge-forms-heading" data-kind={selected.kind}>
      <SectionLead
        headingId="knowledge-forms-heading"
        number="01"
        eyebrow="Choose how to read"
        title="Four ways of knowing."
        note="The same collection holds different kinds of knowledge. Choose one to see what it can explain and where to begin."
      />

      <div className={styles.formExplorerBody}>
        <span className={styles.srOnly} aria-live="polite">{KIND[selected.kind].nav} selected, {selected.count} {selected.count === 1 ? "record" : "records"}.</span>
        <div className={styles.formSelector} role="group" aria-label="Choose a knowledge form">
          {forms.map((form, index) => (
            <button
              aria-pressed={form.kind === selected.kind}
              className={`${styles.formChoice} ${styles[`formTone_${form.kind}`]}`}
              key={form.kind}
              onClick={() => setActiveKind(form.kind)}
              type="button"
            >
              <span className={styles.formChoiceIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.formChoiceName}>{KIND[form.kind].nav}</span>
              <span className={styles.formChoiceRole}>{form.role}</span>
              <span className={styles.formChoiceCount}>{form.count} {form.count === 1 ? "record" : "records"}</span>
            </button>
          ))}
        </div>

        <article className={styles.formReading}>
          <div className={styles.formReadingHeading}>
            <span className={styles.formReadingMark} aria-hidden="true" />
            <div>
              <p className={styles.formReadingMeta}>{selected.count} {selected.count === 1 ? "record" : "records"} · {selected.role}</p>
              <h3>{KIND[selected.kind].nav}</h3>
            </div>
          </div>
          <p className={styles.formReadingExplanation}>{selected.explanation}</p>
          {selected.examples.length > 0 && (
            <div className={styles.formExampleField}>
              <p className={styles.fieldLabel}>Begin with</p>
              <ul>
                {selected.examples.map((record) => (
                  <li key={record.id}><Link href={record.href}>{record.title}</Link></li>
                ))}
              </ul>
            </div>
          )}
          <Link className={styles.formBrowseLink} href={`/concept-lab/library?kind=${selected.kind}`}>
            Browse {KIND[selected.kind].nav.toLowerCase()} records <span aria-hidden="true">→</span>
          </Link>
        </article>
      </div>
      <p className={styles.formEvidenceNote}>The distinctions name what kind of account a record offers; they do not rank the records or their evidence.</p>
    </section>
  );
}

function DisciplineExplorer({ fields, initialDiscipline }: { fields: FieldExperience[]; initialDiscipline?: string }) {
  const [activeFieldId, setActiveFieldId] = useState(initialDiscipline ?? fields[0]?.id ?? "");
  const selected = fields.find((field) => field.id === activeFieldId) ?? fields[0];

  if (!selected) return null;

  return (
    <section className={`${styles.section} ${styles.disciplineExplorer}`} id="browse-fields" aria-labelledby="browse-fields-heading">
      <SectionLead
        headingId="browse-fields-heading"
        number="02"
        eyebrow="Enter through a discipline"
        title="Ideas live in fields."
        note="Choose a field to see the questions and groupings already used to organise its records."
      />

      <div className={styles.fieldExperience}>
        <span className={styles.srOnly} aria-live="polite">{selected.name} selected, {selected.count} {selected.count === 1 ? "record" : "records"}.</span>
        <div className={styles.fieldSelector} role="group" aria-label="Choose a discipline">
          {fields.map((field) => (
            <button
              aria-current={field.id === selected.id ? "true" : undefined}
              aria-pressed={field.id === selected.id}
              className={styles.fieldChoice}
              key={field.id}
              onClick={() => setActiveFieldId(field.id)}
              type="button"
            >
              <span className={styles.fieldChoiceCount}>{String(field.count).padStart(2, "0")}</span>
              <span>{field.name}</span>
            </button>
          ))}
        </div>

        <article className={styles.fieldReading}>
          <header className={styles.fieldReadingHeader}>
            <div>
              <p className={styles.fieldReadingMeta}>{selected.count} {selected.count === 1 ? "record" : "records"} · selected field</p>
              <h3>{selected.name}</h3>
              <p className={styles.fieldReadingSummary}>{selected.summary}</p>
            </div>
            <Link className={styles.fieldBrowseLink} href={selected.href}>Browse field <span aria-hidden="true">↗</span></Link>
          </header>

          {selected.groups.length > 0 ? (
            <div className={styles.fieldGroupList}>
              {selected.groups.map((group, index) => (
                <section className={styles.fieldGroupReading} key={group.id}>
                  <p className={styles.fieldGroupIndex}>{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h4>{group.label}</h4>
                    <p>{group.description}</p>
                    <ul>{group.records.map((record) => <li key={record.id}><Link href={record.href}>{record.title}</Link></li>)}</ul>
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className={styles.fieldRecordList}>
              <p className={styles.fieldLabel}>Records in this field</p>
              <ul>{selected.records.map((record) => <li key={record.id}><Link href={record.href}>{record.title}</Link></li>)}</ul>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

function SearchExperience({ records, disciplines, initialDiscipline }: Pick<Props, "records" | "disciplines" | "initialDiscipline">) {
  return (
    <section className={`${styles.section} ${styles.searchExperience}`} id="collection-browser" aria-labelledby="collection-browser-heading">
      <div className={styles.searchLead}>
        <div>
          <p className={styles.sectionEyebrow}><span>03</span>Search as inquiry</p>
          <h2 id="collection-browser-heading">Begin with a question. Find its record.</h2>
          <p>Search titles, questions and topics, then narrow the collection by knowledge form. Each result leads to its own account and sources.</p>
        </div>
        <Link href="/concept-lab/saved" className={styles.savedLink}>Return to saved records <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.searchBrowser}>
        <LibraryBrowser records={records} disciplines={disciplines} initialDiscipline={initialDiscipline} showDisciplineSelect={false} showUnfilteredResults={false} />
      </div>
    </section>
  );
}

function ReadingPathExplorer({ paths }: { paths: ReadingPath[] }) {
  const [activePathId, setActivePathId] = useState(paths[0]?.id ?? "");
  const [activeStep, setActiveStep] = useState(0);
  const selectedPath = paths.find((path) => path.id === activePathId) ?? paths[0];

  if (!selectedPath || selectedPath.records.length === 0) return null;

  const selectedRecord = selectedPath.records[Math.min(activeStep, selectedPath.records.length - 1)];
  if (!selectedRecord) return null;
  const previousRecord = activeStep > 0 ? selectedPath.records[activeStep - 1] : undefined;
  const nextRecord = selectedPath.records[activeStep + 1];
  const stepListStyle: CSSProperties & { "--stop-count": number } = { "--stop-count": selectedPath.records.length };

  return (
    <section className={`${styles.section} ${styles.routesSection}`} id="learning-paths" aria-labelledby="learning-paths-heading">
      <SectionLead
        headingId="learning-paths-heading"
        number="04"
        eyebrow="Follow a question"
        title="Follow a question."
        note="Curated reading sequences cross real records. Choose a question, then inspect what each stop says in its own terms."
      />

      <span className={styles.srOnly} aria-live="polite">Reading question selected: {selectedPath.question}. {selectedPath.records.length} records.</span>
      <div className={styles.pathSelector} role="group" aria-label="Choose a curated reading question">
        {paths.map((path, index) => (
          <button
            aria-pressed={path.id === selectedPath.id}
            className={`${styles.pathChoice} ${styles[`pathTone_${path.tone}`]}`}
            key={path.id}
            onClick={() => { setActivePathId(path.id); setActiveStep(0); }}
            type="button"
          >
            <span className={styles.pathChoiceNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span>{path.question}</span>
          </button>
        ))}
      </div>

      <article className={`${styles.pathReading} ${styles[`pathTone_${selectedPath.tone}`]}`} aria-live="polite" aria-atomic="false">
        <header className={styles.pathReadingHeader}>
          <span className={styles.pathField}>{selectedPath.discipline}</span>
          <h3>{selectedPath.question}</h3>
          <p>{selectedPath.description}</p>
        </header>

        <div className={styles.pathReadingBody}>
          <div className={styles.pathStepField}>
            <svg className={styles.pathReadingTrace} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path className={styles.routeEcho} d={selectedPath.echo} />
              <path className={styles.routeLine} d={selectedPath.trace} />
            </svg>
            <svg className={styles.pathReadingTraceMobile} viewBox="0 0 80 480" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path className={styles.routeEcho} d={selectedPath.mobileTrace} transform="translate(2 0)" />
              <path className={styles.routeLine} d={selectedPath.mobileTrace} />
            </svg>
            <ol className={styles.pathStepList} aria-label={`Reading sequence for ${selectedPath.question}`} style={stepListStyle}>
              {selectedPath.records.map((record, index) => (
                <li key={record.id}>
                  <button aria-pressed={activeStep === index} className={styles.pathStepChoice} onClick={() => setActiveStep(index)} type="button">
                    <span className={styles.pathStopNode}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.pathStepTitle}>{record.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.pathStepDetail} aria-live="polite" aria-atomic="true">
            <p className={styles.pathStepMeta}>Stop {String(activeStep + 1).padStart(2, "0")} of {String(selectedPath.records.length).padStart(2, "0")} · {KIND[selectedRecord.kind].nav}</p>
            <h4><Link href={selectedRecord.href}>{selectedRecord.title}</Link></h4>
            <p>{selectedRecord.oneSentence}</p>
            <dl className={styles.pathSequencePosition}>
              <div><dt>Previous stop</dt><dd>{previousRecord?.title ?? "First in this route"}</dd></div>
              <div><dt>Next stop</dt><dd>{nextRecord?.title ?? "Last in this route"}</dd></div>
            </dl>
            <span className={styles.pathStepBoundary}>The route gives a reading order; it does not claim that one record causes or historically produces the next.</span>
          </div>
        </div>
      </article>
    </section>
  );
}

export function LibraryExperience({ records, disciplines, initialDiscipline, forms, fields, paths }: Props) {
  return (
    <>
      <KnowledgeFormExplorer forms={forms} />
      <DisciplineExplorer fields={fields} initialDiscipline={initialDiscipline} />
      <SearchExperience records={records} disciplines={disciplines} initialDiscipline={initialDiscipline} />
      <ReadingPathExplorer paths={paths} />
      <noscript>
        <div className={styles.staticFallback}>
          <h2>Browse the Library without interaction</h2>
          <p>The selectors need JavaScript. These links keep every form, field and reading route available as a plain index.</p>
          <h3>Knowledge forms</h3>
          <ul>{forms.map((form) => <li key={form.kind}><a href={`/concept-lab/library?kind=${form.kind}`}>{KIND[form.kind].nav}</a> · {form.role}: {form.explanation}</li>)}</ul>
          <h3>Disciplines</h3>
          {fields.map((field) => (
            <section key={field.id}>
              <h4><a href={field.href}>{field.name}</a></h4>
              <p>{field.summary}</p>
              {field.groups.length > 0 ? field.groups.map((group) => (
                <div key={group.id}>
                  <h5>{group.label}</h5>
                  <p>{group.description}</p>
                  <ul>{group.records.map((record) => <li key={record.id}><a href={record.href}>{record.title}</a></li>)}</ul>
                </div>
              )) : <ul>{field.records.map((record) => <li key={record.id}><a href={record.href}>{record.title}</a></li>)}</ul>}
            </section>
          ))}
          <h3>Curated reading routes</h3>
          {paths.map((path) => (
            <section key={path.id}>
              <h4>{path.question}</h4>
              <p>{path.description}</p>
              <ol>{path.records.map((record) => <li key={record.id}><a href={record.href}>{record.title}</a></li>)}</ol>
            </section>
          ))}
        </div>
      </noscript>
    </>
  );
}
