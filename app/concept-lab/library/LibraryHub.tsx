import Image from "next/image";
import type { AnyRecord, RecordKind } from "@/content/types";
import type { Discipline } from "@/content/disciplines";
import { recordHref } from "@/content/records";
import {
  DISCIPLINE_ORIENTATIONS,
  getDisciplineRecordCount,
  getPresentationGroupsForDiscipline,
  getUnbranchedRecords,
  groupRecordsByBranch,
} from "@/content/atlas/presentation";
import { LEARNING_PATHS } from "@/content/atlas/learningPaths";
import { Crumbs } from "../_components/RecordShell";
import { LibraryExperience } from "./LibraryExperience";
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
    tone: "blue",
    trace: "M 125 61 C 204 57 294 66 375 62 S 544 55 625 60 S 790 66 875 55",
    echo: "M 125 66 C 205 62 294 71 375 67 S 544 60 625 65 S 790 71 875 60",
    mobileTrace: "M39 0 C24 44 57 88 39 138 S25 229 43 278 S55 377 37 480",
  },
  "musical-expectation": {
    tone: "coral",
    trace: "M 167 58 C 265 55 405 69 500 62 S 700 53 833 49",
    echo: "M 167 63 C 265 60 405 74 500 67 S 700 58 833 54",
    mobileTrace: "M39 0 C53 48 22 91 43 139 S57 223 36 270 S24 373 42 480",
  },
  "learn-model-predict": {
    tone: "teal",
    trace: "M 167 64 C 270 54 399 58 500 60 S 700 70 833 53",
    echo: "M 167 69 C 270 59 399 63 500 65 S 700 75 833 58",
    mobileTrace: "M39 0 C24 41 51 88 40 137 S25 221 45 272 S52 374 36 419 S40 457 40 480",
  },
} as const;

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
      <figcaption id="library-landscape-caption" className={styles.mapCaption}>
        One shared working field: marks to look through, evidence to inspect, methods at work and questions to follow. The drawing offers orientation, not evidence or causal relations.
      </figcaption>
    </figure>
  );
}

function reference(record: AnyRecord) {
  return {
    id: record.id,
    title: record.title,
    href: recordHref(record),
    kind: record.kind,
    oneSentence: record.oneSentence,
  };
}

export function LibraryHub({ records, disciplines, initialDiscipline }: LibraryHubProps) {
  const activeDisciplines = Object.values(disciplines).filter((discipline) => getDisciplineRecordCount(records, discipline.id) > 0).length;
  const activeKinds = new Set(records.map((record) => record.kind)).size;
  const statItems = [
    { value: records.length, label: records.length === 1 ? "record" : "records" },
    { value: activeDisciplines, label: activeDisciplines === 1 ? "discipline" : "disciplines" },
    { value: activeKinds, label: activeKinds === 1 ? "way of knowing" : "ways of knowing" },
  ];

  const forms = KNOWLEDGE_FORMS.map((form) => {
    const matching = records.filter((record) => record.kind === form.kind);
    return { ...form, count: matching.length, examples: matching.slice(0, 2).map(reference) };
  });

  const fields = Object.values(disciplines)
    .map((discipline) => {
      const fieldRecords = records.filter((record) => record.discipline === discipline.id);
      const orientation = DISCIPLINE_ORIENTATIONS[discipline.id];
      const groups = discipline.id === "ob"
        ? getPresentationGroupsForDiscipline(fieldRecords, discipline.id).map((group) => ({
          id: group.id,
          label: group.label,
          description: group.description,
          records: group.records.map(reference),
        }))
        : discipline.id === "music-psych"
          ? [
            ...groupRecordsByBranch(fieldRecords, discipline.id)
              .filter((group) => group.records.length > 0)
              .map(({ branch, records: branchRecords }) => ({
                id: branch.id,
                label: branch.label,
                description: branch.description,
                records: branchRecords.map(reference),
              })),
            ...(getUnbranchedRecords(fieldRecords, discipline.id).length > 0
              ? [{
                id: "field-level",
                label: "At field level",
                description: "Records in the discipline that are not assigned to one of its current branches.",
                records: getUnbranchedRecords(fieldRecords, discipline.id).map(reference),
              }]
              : []),
          ]
          : [];

      return {
        id: discipline.id,
        name: discipline.name,
        short: discipline.short,
        count: fieldRecords.length,
        summary: orientation?.summary ?? "",
        href: `/concept-lab/library?discipline=${discipline.id}#collection-browser`,
        records: fieldRecords.map(reference),
        groups,
      };
    })
    .filter((field) => field.count > 0);

  const paths = LEARNING_PATHS.map((path) => ({
    id: path.id,
    question: path.question,
    description: path.description,
    discipline: disciplines[path.discipline]?.name ?? path.discipline,
    ...ROUTE_PRESENTATION[path.id],
    records: path.recordIds
      .map((id) => records.find((record) => record.id === id))
      .filter((record): record is AnyRecord => Boolean(record))
      .map(reference),
  }));

  return (
    <div className={styles.page}>
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Library" }]} />

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>A living reference · an orientation across the collection</p>
          <h1>The Library</h1>
          <p className={styles.heroLede}>A place to see how theories, studies, methods and mechanisms ask different questions — and find a way into the ideas that matter to you.</p>
          <p className={styles.heroContext}>Explore by knowledge form, enter through a discipline, search for a record, or follow a question across the collection.</p>
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
            <a href="#learning-paths">Reading routes <span aria-hidden="true">↓</span></a>
          </nav>
        </div>
        <KnowledgeLandscape />
      </header>

      <LibraryExperience
        records={records}
        disciplines={disciplines}
        initialDiscipline={initialDiscipline}
        forms={forms}
        fields={fields}
        paths={paths}
      />
    </div>
  );
}
