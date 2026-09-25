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
    trace: "M 125 61 C 204 57 294 66 375 62 S 544 55 625 60 S 790 66 875 55",
    echo: "M 125 66 C 205 62 294 71 375 67 S 544 60 625 65 S 790 71 875 60",
    mobileTrace: "M39 0 C24 44 57 88 39 138 S25 229 43 278 S55 377 37 480",
  },
  "musical-expectation": {
    className: styles.routeCoral,
    trace: "M 167 58 C 265 55 405 69 500 62 S 700 53 833 49",
    echo: "M 167 63 C 265 60 405 74 500 67 S 700 58 833 54",
    mobileTrace: "M39 0 C53 48 22 91 43 139 S57 223 36 270 S24 373 42 480",
  },
  "learn-model-predict": {
    className: styles.routeTeal,
    trace: "M 167 64 C 270 54 399 58 500 60 S 700 70 833 53",
    echo: "M 167 69 C 270 59 399 63 500 65 S 700 75 833 58",
    mobileTrace: "M39 0 C24 41 51 88 40 137 S25 221 45 272 S52 374 36 419 S40 457 40 480",
  },
} satisfies Record<(typeof LEARNING_PATHS)[number]["id"], { className: string; trace: string; echo: string; mobileTrace: string }>;

type LibraryHubProps = {
  records: AnyRecord[];
  disciplines: Record<string, Discipline>;
  initialDiscipline?: string;
};

function KnowledgeLandscape() {
  return (
    <figure className={styles.landscape} aria-labelledby="library-landscape-caption">
      <picture className={styles.landscapeArtwork}>
        <source media="(max-width: 760px)" srcSet="/visual-language/library/library-sketch-mobile-v2.webp" type="image/webp" />
        <Image
          src="/visual-language/library/library-sketch-wide.webp"
          width={1536}
          height={1024}
          sizes="(min-width: 1040px) 62vw, (min-width: 761px) 50vw, calc(100vw - 2rem)"
          alt="An open graphite research sketch: an incomplete viewing frame, evidence traces, a working scaffold and a branching pencil pathway, accented with restrained colour."
          loading="eager"
          fetchPriority="high"
          unoptimized
        />
      </picture>

      <nav className={styles.landscapeLinks} aria-label="Enter a Library by knowledge form">
        {KNOWLEDGE_FORMS.map(({ kind, role }) => (
          <Link className={`${styles.landmark} ${styles[kind]}`} href={`/concept-lab/library?kind=${kind}`} key={kind}>
            <span className={styles.landmarkText}><strong>{KIND[kind].nav}</strong><em>{role}</em></span>
            <span className={styles.landmarkStroke} aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <figcaption id="library-landscape-caption" className={styles.mapCaption}>
        Four ways in, drawn as working marks rather than territories. The sketch offers orientation, not evidence or causal relations.
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

function KnowledgeGesture({ kind }: { kind: RecordKind }) {
  return (
    <svg className={styles.formGesture} viewBox="0 0 220 94" aria-hidden="true" focusable="false">
      {kind === "theory" && (
        <>
          <path className={styles.gestureGraphite} d="M13 73 C28 47 53 23 85 17 C113 11 146 20 180 42 M26 83 C45 57 65 38 91 32 C118 26 143 35 164 51" />
          <path className={styles.gestureGhost} d="M23 59 C47 25 73 15 102 18 C128 21 153 36 171 61 M53 15 C73 30 93 49 104 80" />
          <path className={styles.gestureAccent} d="M40 68 C63 45 86 36 113 37" />
          <circle className={styles.gesturePoint} cx="105" cy="37" r="3.2" />
        </>
      )}
      {kind === "study" && (
        <>
          <path className={styles.gestureGraphite} d="M19 29 H95 M27 48 H76 M34 68 H104 M115 34 C136 30 151 43 173 37 S195 25 207 29" />
          <path className={styles.gestureGhost} d="M18 33 H99 M28 52 H72 M111 40 C137 36 152 48 176 42 S196 31 208 34" />
          <path className={styles.gestureAccent} d="M119 67 H184" />
          <circle className={styles.gesturePoint} cx="147" cy="37" r="3" />
          <circle className={styles.gesturePoint} cx="177" cy="40" r="3" />
          <circle className={styles.gesturePoint} cx="197" cy="29" r="3" />
        </>
      )}
      {kind === "method" && (
        <>
          <path className={styles.gestureGraphite} d="M29 78 V24 M30 27 H179 M62 28 V60 M100 27 V72 M140 28 V52 M62 60 H100 M100 72 H179" />
          <path className={styles.gestureGhost} d="M25 82 V29 M35 22 H174 M67 31 V63 M105 30 V69 M145 31 V55" />
          <path className={styles.gestureAccent} d="M58 64 H104 M137 48 H181" />
        </>
      )}
      {kind === "mechanism" && (
        <>
          <path className={styles.gestureGraphite} d="M15 47 C47 47 55 25 83 25 C105 25 112 51 137 51 C159 51 167 33 204 33 M83 25 C103 25 106 72 132 72 C159 72 167 52 204 52" />
          <path className={styles.gestureGhost} d="M13 52 C47 52 60 31 83 30 C106 30 115 56 137 56 C164 56 172 39 207 39" />
          <path className={styles.gestureAccent} d="M82 23 C106 23 108 69 133 69 C159 69 170 49 202 49" />
          <circle className={styles.gesturePoint} cx="83" cy="27" r="3.2" />
          <circle className={styles.gesturePoint} cx="137" cy="53" r="3.2" />
        </>
      )}
    </svg>
  );
}

function KnowledgeForms({ records }: { records: AnyRecord[] }) {
  return (
    <section className={`${styles.section} ${styles.formsSection}`} id="knowledge-forms" aria-labelledby="knowledge-forms-heading">
      <SectionLead headingId="knowledge-forms-heading" number="01" eyebrow="A shared map of ideas" title="Four ways of knowing" note="One collection, entered through different kinds of explanation, evidence and practice." />
      <div className={styles.formGrid}>
        {KNOWLEDGE_FORMS.map(({ kind, role, explanation }, index) => {
          const examples = records.filter((record) => record.kind === kind).slice(0, 2);
          const kindCount = records.filter((record) => record.kind === kind).length;
          return (
            <article className={`${styles.form} ${styles[kind]}`} data-kind={kind} key={kind}>
              <span className={styles.formIndex}>0{index + 1} <span aria-hidden="true">/</span> {kindCount} {kindCount === 1 ? "record" : "records"}</span>
              <KnowledgeGesture kind={kind} />
              <div className={styles.formCopy}>
                <h3><Link href={`/concept-lab/library?kind=${kind}`}>{KIND[kind].nav}</Link></h3>
                <p className={styles.formRole}>{role}</p>
                <p className={styles.formExplanation}>{explanation}</p>
              </div>
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
      <div className={`${styles.fieldGroups} ${styles.workGroups}`}>
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
      <div className={`${styles.fieldGroups} ${styles.musicGroups}`}>
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

function DisciplineGesture({ disciplineId }: { disciplineId: string }) {
  if (disciplineId === "ob") {
    return (
      <svg className={styles.disciplineGesture} viewBox="0 0 184 72" aria-hidden="true" focusable="false">
        <path d="M8 18 C38 16 60 20 89 18 S143 18 175 16 M10 36 C41 34 66 39 95 36 S145 34 173 37 M8 55 C39 53 67 57 96 54 S145 55 176 53" />
        <path className={styles.disciplineGhost} d="M9 21 C41 19 62 23 89 21 M10 39 C40 37 65 42 95 39 M9 58 C39 56 65 60 95 57" />
        <circle cx="39" cy="18" r="2.8" /><circle cx="91" cy="36" r="2.8" /><circle cx="145" cy="54" r="2.8" />
      </svg>
    );
  }
  if (disciplineId === "music-psych") {
    return (
      <svg className={styles.disciplineGesture} viewBox="0 0 184 72" aria-hidden="true" focusable="false">
        <path d="M8 18 C49 16 94 21 176 17 M8 27 C48 25 102 30 176 26 M8 36 C48 34 100 39 176 35 M8 45 C48 43 100 48 176 44 M8 54 C48 52 100 57 176 53" />
        <path className={styles.disciplineAccent} d="M29 46 C48 41 61 26 79 27 S109 48 128 45 S151 30 169 28" />
        <circle cx="29" cy="46" r="2.5" /><circle cx="79" cy="27" r="2.5" /><circle cx="128" cy="45" r="2.5" /><circle cx="169" cy="28" r="2.5" />
      </svg>
    );
  }
  return null;
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
    <article className={`${styles.disciplineField} ${size === "primary" ? styles.primaryField : styles.secondaryField}`} data-discipline={discipline.id}>
      <header className={styles.disciplineHeader}>
        <div>
          <span className={styles.fieldCount}>{count} {count === 1 ? "record" : "records"}</span>
          <h3>{discipline.name}</h3>
        </div>
        <DisciplineGesture disciplineId={discipline.id} />
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
        eyebrow="Follow a question"
        title="Follow a question."
        note={`${paths.length} curated reading routes cross ${DISCIPLINES["music-psych"].name}. Each record remains a separate way in.`}
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
                    <path className={styles.routeEcho} d={route.echo} />
                    <path className={styles.routeLine} d={route.trace} />
                  </svg>
                  <svg className={styles.routeTraceMobile} viewBox="0 0 80 480" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                    <path className={styles.routeEcho} d={route.mobileTrace} transform="translate(2 0)" />
                    <path className={styles.routeLine} d={route.mobileTrace} />
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
      <p className={styles.routeNote}>The drawn lines suggest a reading sequence; each title opens its own record.</p>
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
