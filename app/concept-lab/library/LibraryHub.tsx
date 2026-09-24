import Link from "next/link";
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

type LibraryHubProps = {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  initialDiscipline?: string;
};

function KnowledgeLandscape() {
  return (
    <figure className={styles.landscape} aria-labelledby="library-landscape-caption">
      <svg className={styles.landscapeDesktop} viewBox="0 0 960 540" aria-hidden="true" focusable="false">
        <path className={styles.mapBoundary} d="M35 275C28 158 127 45 276 39c77-3 124 38 190 26 78-14 113-44 220-28 137 20 242 96 244 211 2 116-113 225-260 239-85 8-133-34-221-20-116 18-237 41-333-31C61 397 39 337 35 275Z" />
        <path className={styles.mapWater} d="M444 68c-11 62 32 89 18 145s-50 69-37 132c12 55 62 73 54 133" />
        <path className={styles.theoryLand} d="M82 153c18-72 93-105 171-85 34 9 54 37 86 45 45 12 89-10 121 21 34 33 18 90-17 116-42 31-91 13-131 36-40 23-72 53-126 35-70-23-126-89-104-168Z" />
        <path className={styles.theoryContour} d="M111 158c21-49 66-67 113-52 35 11 54 38 91 42 43 5 91-8 115 21 22 26 6 64-25 78-40 18-76 3-118 23-37 18-67 39-108 22-51-21-88-81-68-134Z" />
        <path className={styles.studyLand} d="M540 78c62-31 161-12 203 30 37 37 79 40 94 88 17 54-15 112-72 125-45 10-70-14-117-5-57 11-100 37-150 6-44-27-67-90-47-144 16-44 46-81 89-100Z" />
        <path className={styles.studyContour} d="M560 104c53-25 132-9 167 24 34 32 66 38 78 73 14 39-11 79-52 89-36 9-64-12-104-2-49 12-83 29-122 4-34-22-47-67-32-109 12-34 36-64 65-79Z" />
        <path className={styles.methodLand} d="M76 332c32-52 87-72 143-52 40 14 61 42 103 41 52-1 99-21 133 14 31 32 22 84-16 112-38 27-87 15-124 38-45 28-63 70-131 52-72-18-139-86-125-152 4-20 8-36 17-53Z" />
        <path className={styles.methodContour} d="M104 347c25-34 68-47 107-31 36 14 57 43 102 42 43-1 80-17 108 10 24 23 14 60-17 76-35 18-71 4-111 28-38 24-54 49-105 34-52-15-101-64-93-112 2-18 4-32 9-47Z" />
        <path className={styles.mechanismLand} d="M522 319c34-46 87-57 140-41 41 12 73 2 114 20 50 22 81 68 66 114-14 45-58 55-102 49-48-7-79 8-122 23-60 21-127-4-147-54-17-40 22-88 51-111Z" />
        <path className={styles.mechanismContour} d="M552 336c28-30 65-39 105-27 37 12 69 5 104 20 35 15 58 48 47 79-10 29-42 38-76 34-42-6-71 7-112 21-44 15-93 0-107-35-13-30 16-71 39-92Z" />

        <path className={styles.routeUnderlay} d="M154 238C258 287 328 292 453 269s192-74 303-40c80 25 102 85 82 141-20 59-87 72-159 43-80-32-151-35-228-12-105 31-187 23-275-25" />
        <path className={styles.routeLine} d="M154 238C258 287 328 292 453 269s192-74 303-40c80 25 102 85 82 141-20 59-87 72-159 43-80-32-151-35-228-12-105 31-187 23-275-25" />
        <path className={styles.routeBranch} d="M470 269c-34-53-65-88-113-116M470 269c39 43 69 72 114 106" />

        <path className={styles.bridge} d="M461 263v18m18-18v18m-23-10h28m-24-6c1-8 17-8 18 0" />
        <path className={styles.theoryMark} d="M199 156a27 27 0 1 0 54 0a27 27 0 1 0-54 0Zm27-27v54m-27-27h54m-15 17 31 25" />
        <path className={styles.studyMark} d="M676 129h69v82h-69zM687 145h45m-45 13h45m-45 13h22m8 24v-14m12 14v-25m12 25v-34" />
        <path className={styles.methodMark} d="M166 387h75m-65-11 20-18 20 18m-28-12v20m20-20v20m31-20v31m0-31 20 12m-20-12 19-13" />
        <path className={styles.mechanismMark} d="M622 390c22-28 43-28 65 0 19 24 37 24 56 0m-121 0h-14m137 0h13" />
        <circle className={styles.theoryNode} cx="154" cy="238" r="7" />
        <circle className={styles.studyNode} cx="756" cy="229" r="7" />
        <circle className={styles.methodNode} cx="279" cy="416" r="7" />
        <circle className={styles.mechanismNode} cx="808" cy="369" r="7" />
        <circle className={styles.centreNode} cx="470" cy="269" r="8" />
        <circle className={styles.centreCore} cx="470" cy="269" r="2.5" />
      </svg>

      <svg className={styles.landscapeMobile} viewBox="0 0 380 760" aria-hidden="true" focusable="false">
        <path className={styles.mapBoundary} d="M190 18C286 23 345 76 342 166c-2 69-54 94-45 155 8 55 48 78 43 158-4 84-66 145-150 155C101 646 38 595 37 517c-1-59 38-88 32-147-6-57-36-89-30-165C45 103 99 20 190 18Z" />
        <path className={styles.mobileRouteUnderlay} d="M115 73C237 116 275 169 176 232S90 328 210 383s91 126-22 186" />
        <path className={styles.mobileRoute} d="M115 73C237 116 275 169 176 232S90 328 210 383s91 126-22 186" />
        <path className={styles.mobileTheory} d="M57 52c29-32 99-37 130-4 25 27 12 68-17 84-36 19-81 8-108-12-24-18-23-47-5-68Z" />
        <path className={styles.mobileStudy} d="M191 165c31-30 100-30 127 3 21 25 8 65-21 81-35 20-78 9-103-10-23-18-22-51-3-74Z" />
        <path className={styles.mobileMethod} d="M52 310c26-31 95-34 128-4 27 24 17 67-12 86-34 22-83 17-110-3-24-18-24-56-6-79Z" />
        <path className={styles.mobileMechanism} d="M187 464c32-29 98-28 125 5 20 25 5 67-24 82-35 19-79 7-103-12-22-19-18-54 2-75Z" />
        <path className={styles.mobileTheoryMark} d="M102 82a20 20 0 1 0 40 0a20 20 0 1 0-40 0Zm20-20v40m-20-20h40" />
        <path className={styles.mobileStudyMark} d="M232 188h48v48h-48zm9 11h30m-30 10h30m-30 10h14m13 10v-11m9 11v-21" />
        <path className={styles.mobileMethodMark} d="M89 348h52m-43-9 17-15 17 15m-24-9v18m18-18v18" />
        <path className={styles.mobileMechanismMark} d="M222 502c14-18 27-18 41 0 13 16 26 16 39 0m-80 0h-11m91 0h11" />
        <circle className={styles.theoryNode} cx="115" cy="73" r="6" />
        <circle className={styles.studyNode} cx="260" cy="213" r="6" />
        <circle className={styles.methodNode} cx="115" cy="350" r="6" />
        <circle className={styles.mechanismNode} cx="280" cy="506" r="6" />
      </svg>

      <nav className={styles.landscapeLinks} aria-label="Enter a Library by knowledge form">
        {KNOWLEDGE_FORMS.map(({ kind, role }) => (
          <Link className={`${styles.landmark} ${styles[kind]}`} href={`/concept-lab/library?kind=${kind}`} key={kind}>
            <span className={styles.landmarkDot} aria-hidden="true" />
            <span><strong>{KIND[kind].nav}</strong><em>{role}</em></span>
          </Link>
        ))}
      </nav>
      <figcaption id="library-landscape-caption" className={styles.mapCaption}>
        An editorial map for finding a way in. Its paths show navigation across the collection, not evidence or causal relations.
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
        {paths.map((path, pathIndex) => (
          <li className={styles.path} key={path.id}>
            <span className={styles.pathIndex}>{String(pathIndex + 1).padStart(2, "0")}</span>
            <div className={styles.pathBody}>
              <span className={styles.pathField}>{DISCIPLINES[path.discipline]?.name ?? path.discipline}</span>
              <h3>{path.question}</h3>
              <p>{path.description}</p>
              {path.pathRecords.length > 0 && (
                <ol className={styles.pathStops} aria-label={`Records in the route: ${path.question}`}>
                  {path.pathRecords.map((record, index) => (
                    <li key={record.id}>
                      <Link href={recordHref(record)}>{record.title}</Link>
                      {index < path.pathRecords.length - 1 && <span className={styles.pathConnector} aria-hidden="true">→</span>}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LibraryHub({ records, disciplines, initialDiscipline }: LibraryHubProps) {
  const activeDisciplines = Object.values(disciplines).filter((discipline) => getDisciplineRecordCount(records, discipline.id) > 0).length;
  const activeKinds = new Set(records.map((record) => record.kind)).size;
  const statItems = [
    { value: records.length, label: records.length === 1 ? "record" : "records" },
    { value: activeDisciplines, label: activeDisciplines === 1 ? "discipline" : "disciplines" },
    { value: activeKinds, label: activeKinds === 1 ? "knowledge form" : "knowledge forms" },
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
          <dl className={styles.heroStats}>
            {statItems.map(({ value, label }) => (
              <div key={label}><dt>{label}</dt><dd>{value.toLocaleString("en-GB")}</dd></div>
            ))}
          </dl>
          <nav className={styles.heroNav} aria-label="Explore the Library">
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
