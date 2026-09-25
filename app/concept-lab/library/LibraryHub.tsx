import Image from "next/image";
import type { AnyRecord, MethodRecord, PaperRecord, RecordKind } from "@/content/types";
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
import { LibraryExperience, type KnowledgeForm } from "./LibraryExperience";
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

const FORM_ART = {
  theory: {
    description: "An unfinished graphite viewing frame with a blue pencil arc, suggesting a perspective brought to a phenomenon.",
    caption: "A lens does not contain the phenomenon; it changes what can be brought into view.",
  },
  study: {
    description: "Three red pencil evidence marks and graphite traces, held as a set of observations rather than a scale.",
    caption: "Evidence enters through a design; a claim remains bounded by what that design can show.",
  },
  method: {
    description: "Graphite construction lines, unfinished scaffolding and a small gold pencil circle around working material.",
    caption: "A method is a practice of working with material, not a decorative sequence of steps.",
  },
  mechanism: {
    description: "A branching and converging field of teal and plum pencil lines, with visible joins and unfinished paths.",
    caption: "Follow the components and return paths; the drawing is a schematic, not a measurement.",
  },
} as const;

// These short method orientations are Library-only paraphrases of each record's
// oneSentence. The complete canonical explanations stay on their own records.
const HUB_METHOD_SUMMARIES = {
  ipa: "A close, case-by-case reading of how a person makes sense of a significant experience.",
  "reflexive-thematic-analysis": "Interpretation develops patterns of shared meaning; themes are made, and researcher subjectivity is part of the analysis.",
} as const;

// Display labels shorten the canonical RTA procedure titles for this overview;
// the record retains the complete phase descriptions and their detail.
const HUB_RTA_PHASE_LABELS = [
  "Familiarise",
  "Code",
  "Generate themes",
  "Review themes",
  "Define / name",
  "Write up",
] as const;

function buildFormReading(kind: RecordKind, records: AnyRecord[]): KnowledgeForm["reading"] {
  if (kind === "theory") {
    const theories = records.filter((record) => record.kind === "theory");
    const preferred = ["person-environment-fit", "job-demands-resources"]
      .map((id) => theories.find((record) => record.id === id))
      .filter((record): record is AnyRecord => Boolean(record));
    return {
      kind,
      question: "What does this perspective bring into focus — and what remains outside its frame?",
      examples: (preferred.length > 0 ? preferred : theories.slice(0, 2)).map(reference),
    };
  }

  if (kind === "study") {
    const record = records.find((candidate): candidate is PaperRecord => candidate.kind === "study");
    if (!record) return { kind, studies: [] };
    const supportedClaim = record.claimEvidencePairs.find((pair) => pair.status === "CONVERGENT EVIDENCE");
    return {
      kind,
      record: reference(record),
      question: record.researchQuestion,
      // Keep the record's study-level findings verbatim; design and full limits
      // remain on the individual Study page for readers who continue inward.
      studies: record.studies.map(({ label, result }) => ({ label, result })),
      supportedClaim: supportedClaim ? {
        claim: supportedClaim.claim,
        status: supportedClaim.status,
      } : undefined,
      // Keep one concise boundary in the Hub; detailed limitations remain on
      // the Study record. This selects the canonical limitation by its wording.
      boundary: record.limitations.find((limit) => limit.startsWith("Observer perception")),
    };
  }

  if (kind === "method") {
    const methods = records.filter((candidate): candidate is MethodRecord => candidate.kind === "method");
    const ipa = methods.find((record) => record.id === "ipa");
    const rta = methods.find((record) => record.id === "reflexive-thematic-analysis");
    const practices: Extract<KnowledgeForm["reading"], { kind: "method" }>["practices"] = [];
    if (ipa) practices.push({
      movement: "close-reading",
      record: reference(ipa),
      summary: HUB_METHOD_SUMMARIES.ipa,
      columns: (ipa.craft ?? []).map(({ title }) => ({ title })),
    });
    if (rta) practices.push({
      movement: "recursive",
      record: reference(rta),
      summary: HUB_METHOD_SUMMARIES["reflexive-thematic-analysis"],
      phases: (rta.procedure ?? []).map(({ n, title }, index) => ({
        n,
        title: HUB_RTA_PHASE_LABELS[index] ?? title,
      })),
      recursionNote: "The phases are recursive, not sequential.",
    });
    return {
      kind,
      practices,
      distinction: "Two different practices; the shared label “method” does not make their commitments interchangeable.",
    };
  }

  const mechanism = records.find((candidate) => candidate.kind === "mechanism" && candidate.id === "hpa-axis");
  const cascade = mechanism?.kind === "mechanism" ? mechanism.cascade : undefined;
  return {
    kind,
    record: mechanism ? reference(mechanism) : undefined,
    nodes: cascade?.nodes.map(({ label, sub }) => ({ label, sub })) ?? [],
    messengers: cascade?.messengers ?? [],
    feedbackLabel: cascade?.feedback ?? "negative feedback",
    // This Library-only wording stays valid when the pathway changes from
    // horizontal desktop layout to vertical mobile layout; canonical caption
    // in content/hpa-axis.ts is unchanged.
    caption: "The sequence and direction of travel are meaningful; organ shape, position and scale are not depicted and should not be inferred. The dashed return marks negative feedback: cortisol acts back on the pituitary, hypothalamus and wider brain circuitry to regulate further activity.",
  };
}

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

  const forms: KnowledgeForm[] = KNOWLEDGE_FORMS.map((form) => {
    const matching = records.filter((record) => record.kind === form.kind);
    return {
      ...form,
      count: matching.length,
      examples: matching.slice(0, 2).map(reference),
      art: FORM_ART[form.kind],
      reading: buildFormReading(form.kind, records),
    };
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
