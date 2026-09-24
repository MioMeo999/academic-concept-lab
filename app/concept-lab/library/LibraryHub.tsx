import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { AnyRecord, RecordKind } from "@/content/types";
import { DISCIPLINES, type Discipline } from "@/content/disciplines";
import { KIND, recordHref } from "@/content/records";
import {
  DISCIPLINE_ORIENTATIONS,
  getDisciplineRecordCount,
  getPresentationGroupsForDiscipline,
  getUnbranchedRecords,
  groupRecordsByBranch,
} from "@/content/atlas/presentation";
import { LEARNING_PATHS } from "@/content/atlas/learningPaths";
import { Crumbs } from "../_components/RecordShell";
import { LibraryBrowser } from "../_components/LibraryBrowser";
import styles from "./library-hub.module.css";

const KNOWLEDGE_FORMS: readonly {
  kind: RecordKind;
  role: string;
  explanation: string;
}[] = [
  {
    kind: "theory",
    role: "A lens",
    explanation: "A way to understand why or how a phenomenon should be interpreted.",
  },
  {
    kind: "study",
    role: "An argument from evidence",
    explanation: "A specific investigation, with its design, findings and limits kept together.",
  },
  {
    kind: "method",
    role: "A practice",
    explanation: "A way of producing, interpreting or analysing research material.",
  },
  {
    kind: "mechanism",
    role: "A pathway",
    explanation: "An account of the process through which something happens.",
  },
];

const ROUTE_PRESENTATION = {
  "organise-sound": {
    className: styles.routeBlue,
    trace: "M 125 56 C 205 12 300 98 375 56 S 550 12 625 56 S 800 98 875 56",
  },
  "musical-expectation": {
    className: styles.routeCoral,
    trace: "M 167 56 C 270 4 405 108 500 56 S 740 4 833 56",
  },
  "learn-model-predict": {
    className: styles.routeTeal,
    trace: "M 167 56 C 290 56 365 22 500 56 S 710 56 833 56",
  },
} satisfies Record<(typeof LEARNING_PATHS)[number]["id"], { className: string; trace: string }>;

type LibraryHubProps = {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  initialDiscipline?: string;
};

function KnowledgeLandscape() {
  return (
    <figure className={styles.landscape} aria-labelledby="library-landscape-caption">
      <picture className={styles.landscapeArtwork}>
        <source media="(max-width: 760px)" srcSet="/visual-language/library/library-atlas-mobile.webp" type="image/webp" />
        <Image
          src="/visual-language/library/library-atlas-wide.webp"
          width={1536}
          height={1024}
          sizes="(min-width: 1040px) 62vw, (min-width: 761px) 50vw, calc(100vw - 2rem)"
          alt="A continuous coloured-pencil landscape with a mountain observatory, a research town, a workshop and connected river valleys."
          loading="eager"
          fetchPriority="high"
          unoptimized
        />
      </picture>

      <nav className={styles.landscapeLinks} aria-label="Enter a Library by knowledge form">
        {KNOWLEDGE_FORMS.map(({ kind, role }) => (
          <Link className={`${styles.landmark} ${styles[kind]}`} href={`/concept-lab/library?kind=${kind}`} key={kind}>
            <span className={styles.landmarkDot} aria-hidden="true" />
            <span><strong>{KIND[kind].nav}</strong><em>{role}</em></span>
          </Link>
        ))}
      </nav>
      <figcaption id="library-landscape-caption" className={styles.mapCaption}>
        A drawn atlas for finding a way in. Its paths are editorial orientation, not evidence or causal relations.
      </figcaption>
    </figure>
  );
}

function SectionLead({ headingId, number, eyebrow, title, note }: { headingId: string; number: string; eyebrow: string; title: string; note?: string }) {
  return (
    <div className={styles.sectionLead}>
      <p className={styles.sectionEyebrow}><span>{number}</span>{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      {note && <p className={styles.sectionNote}>{note}</p>}
    </div>
  );
}

function KnowledgeForms({ records }: { records: AnyRecord[] }) {
  return (
    <section className={`${styles.section} ${styles.formsSection}`} id="knowledge-forms" aria-labelledby="knowledge-forms-heading">
      <SectionLead headingId="knowledge-forms-heading" number="01" eyebrow="A shared map of ideas" title="Four ways of knowing" />
      <div className={styles.formGrid}>
        {KNOWLEDGE_FORMS.map(({ kind, role, explanation }, index) => {
          const examples = records.filter((record) => record.kind === kind).slice(0, 2);
          const kindCount = records.filter((record) => record.kind === kind).length;
          return (
            <article className={`${styles.form} ${styles[kind]}`} key={kind}>
              <span className={styles.formIndex}>0{index + 1} <span aria-hidden="true">/</span> {kindCount} {kindCount === 1 ? "record" : "records"}</span>
              <h3><Link href={`/concept-lab/library?kind=${kind}`}>{KIND[kind].nav}</Link></h3>
              <p className={styles.formRole}>{role}</p>
              <p className={styles.formExplanation}>{explanation}</p>
              {examples.length > 0 && (
                <ul className={styles.formExamples} aria-label={`Examples in ${KIND[kind].nav}`}>
                  {examples.map((record) => <li key={record.id}><Link href={recordHref(record)}>{record.title}</Link></li>)}
                </ul>
              )}
              <Link className={styles.formAction} href={`/concept-lab/library?kind=${kind}`}>
                Explore {KIND[kind].nav.toLowerCase()} <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RecordLinks({ records }: { records: AnyRecord[] }) {
  if (!records.length) return null;
  return (
    <ul className={styles.recordLinks}>
      {records.map((record) => <li key={record.id}><Link href={recordHref(record)}>{record.title}</Link></li>)}
    </ul>
  );
}

function FieldGroups({ disciplineId, records }: { disciplineId: string; records: AnyRecord[] }) {
  if (disciplineId === "ob") {
    return (
      <div className={styles.fieldGroups}>
        {getPresentationGroupsForDiscipline(records, disciplineId).map((group) => (
          <div className={styles.fieldGroup} key={group.id}>
            <h4>{group.label}</h4>
            <p>{group.description}</p>
            <RecordLinks records={group.records} />
          </div>
        ))}
      </div>
    );
  }

  if (disciplineId === "music-psych") {
    const branches = groupRecordsByBranch(records, disciplineId)
      .map(({ branch, records: branchRecords }) => ({ branch, records: branchRecords }))
      .filter((group) => group.records.length > 0);
    const unbranched = getUnbranchedRecords(records, disciplineId);
    return (
      <div className={styles.fieldGroups}>
        {branches.map(({ branch, records: branchRecords }) => (
          <div className={styles.fieldGroup} key={branch.id}>
            <h4>{branch.label}</h4>
            <p>{branch.description}</p>
            <RecordLinks records={branchRecords} />
          </div>
        ))}
        {unbranched.length > 0 && (
          <div className={styles.fieldGroup}>
            <h4>At field level</h4>
            <p>Records in the discipline that are not assigned to one of its current branches.</p>
            <RecordLinks records={unbranched} />
          </div>
        )}
      </div>
    );
  }

  return <RecordLinks records={records.filter((record) => record.discipline === disciplineId)} />;
}

function DisciplineField({
  discipline,
  records,
  size,
}: {
  discipline: Discipline;
  records: AnyRecord[];
  size: "primary" | "secondary";
}) {
  const fieldRecords = records.filter((record) => record.discipline === discipline.id);
  const orientation = DISCIPLINE_ORIENTATIONS[discipline.id];
  const count = getDisciplineRecordCount(records, discipline.id);

  return (
    <article className={`${styles.disciplineField} ${size === "primary" ? styles.primaryField : styles.secondaryField}`}>
      <header className={styles.disciplineHeader}>
        <div>
          <span className={styles.fieldCount}>{count} {count === 1 ? "record" : "records"}</span>
          <h3>{discipline.name}</h3>
        </div>
        <Link className={styles.fieldAction} href={`/concept-lab/library?discipline=${discipline.id}#collection-browser`} aria-label={`Browse ${count} records in ${discipline.name}`}>
          Browse field <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <p className={styles.disciplineSummary}>{orientation?.summary}</p>
      <FieldGroups disciplineId={discipline.id} records={fieldRecords} />
    </article>
  );
}

function DisciplineAtlas({ disciplines, records, initialDiscipline }: { disciplines: Record<string, Discipline>; records: AnyRecord[]; initialDiscipline?: string }) {
  const fields = Object.values(disciplines);
  const primary = fields.filter((field) => field.id === "ob" || field.id === "music-psych");
  const other = fields.filter((field) => field.id !== "ob" && field.id !== "music-psych");

  return (
    <section className={`${styles.section} ${styles.browseSection}`} id="browse-fields" aria-labelledby="browse-fields-heading">
      <SectionLead
        headingId="browse-fields-heading"
        number="02"
        eyebrow="Enter through a discipline"
        title="Ideas live in fields."
        note="Each discipline brings its own questions and its own way of making connections."
      />
      <div className={styles.primaryFields}>
        {primary.map((discipline) => <DisciplineField key={discipline.id} discipline={discipline} records={records} size="primary" />)}
      </div>
      {other.length > 0 && (
        <div className={styles.otherFields}>
          {other.map((discipline) => <DisciplineField key={discipline.id} discipline={discipline} records={records} size="secondary" />)}
        </div>
      )}
      <section className={styles.collectionTools} id="collection-browser" aria-labelledby="collection-browser-heading">
        <div className={styles.searchTools}>
          <div>
            <p className={styles.collectionEyebrow}>Find something specific</p>
            <h3 id="collection-browser-heading">Search the collection.</h3>
            <p>Search titles, questions and topics, or narrow the records by knowledge form.</p>
          </div>
          <Link href="/concept-lab/saved" className={styles.savedLink}>Open saved records <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.searchBrowser}>
          <LibraryBrowser records={records} disciplines={disciplines} initialDiscipline={initialDiscipline} showDisciplineSelect={false} showUnfilteredResults={false} />
        </div>
      </section>
    </section>
  );
}

function LearningRoutes({ records }: { records: AnyRecord[] }) {
  const paths = LEARNING_PATHS.map((path) => ({
    ...path,
    pathRecords: path.recordIds
      .map((id) => records.find((record) => record.id === id))
      .filter((record): record is AnyRecord => Boolean(record)),
  }));

  return (
    <section className={`${styles.section} ${styles.routesSection}`} id="learning-paths" aria-labelledby="learning-paths-heading">
      <SectionLead
        headingId="learning-paths-heading"
        number="03"
        eyebrow="A few encoded routes"
        title="Follow a question."
        note={`${paths.length} curated sequences are encoded in the atlas, all in ${DISCIPLINES["music-psych"].name}. Each opens records in their own right.`}
      />
      <ol className={styles.pathList}>
        {paths.map((path, pathIndex) => {
          const route = ROUTE_PRESENTATION[path.id];

          return (
            <li className={`${styles.path} ${route.className}`} key={path.id}>
              <div className={styles.pathIntro}>
                <span className={styles.pathIndex}>{String(pathIndex + 1).padStart(2, "0")}</span>
                <div>
                  <span className={styles.pathField}>{DISCIPLINES[path.discipline]?.name ?? path.discipline}</span>
                  <h3>{path.question}</h3>
                  <p>{path.description}</p>
                </div>
              </div>
              {path.pathRecords.length > 0 && (
                <div className={styles.pathTrack}>
                  <svg className={styles.routeTrace} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                    <path d={route.trace} />
                  </svg>
                  <ol className={styles.pathStops} aria-label={`Records in the curated route: ${path.question}`} style={{ "--stop-count": path.pathRecords.length } as CSSProperties}>
                    {path.pathRecords.map((record, index) => (
                      <li key={record.id}>
                        <span className={styles.pathStopNode} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <Link href={recordHref(record)}>{record.title}</Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className={styles.routeNote}>The drawn lines mark curated reading sequences; each title opens its own record.</p>
    </section>
  );
}

export function LibraryHub({ records, disciplines, initialDiscipline }: LibraryHubProps) {
  const activeDisciplines = Object.values(disciplines).filter((discipline) => getDisciplineRecordCount(records, discipline.id) > 0).length;
  const activeKinds = new Set(records.map((record) => record.kind)).size;
  const statItems = [
    { value: records.length, label: records.length === 1 ? "record" : "records" },
    { value: activeDisciplines, label: activeDisciplines === 1 ? "discipline" : "disciplines" },
    { value: activeKinds, label: activeKinds === 1 ? "way of knowing" : "ways of knowing" },
  ];

  return (
    <div className={styles.page}>
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Library" }]} />

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>A living reference · an orientation across the collection</p>
          <h1>The Library</h1>
          <p className={styles.heroLede}>A place to see how theories, studies, methods and mechanisms ask different questions — and find a way into the ideas that matter to you.</p>
          <p className={styles.heroContext}>Explore by knowledge form, enter through a discipline, or follow a question across real records.</p>
          <ul className={styles.heroStats}>
            {statItems.map(({ value, label }) => (
              <li key={label}><strong>{value.toLocaleString("en-GB")}</strong><span>{label}</span></li>
            ))}
          </ul>
          <nav className={styles.heroNav} aria-label="Ways into the Library">
            <span className={styles.heroNavLabel}>Ways into the Library</span>
            <a href="#knowledge-forms">Knowledge forms <span aria-hidden="true">↓</span></a>
            <a href="#browse-fields">Browse fields <span aria-hidden="true">↓</span></a>
            <a href="#collection-browser">Search <span aria-hidden="true">↓</span></a>
          </nav>
        </div>
        <KnowledgeLandscape />
      </header>

      <KnowledgeForms records={records} />
      <DisciplineAtlas disciplines={disciplines} records={records} initialDiscipline={initialDiscipline} />
      <LearningRoutes records={records} />
    </div>
  );
}
