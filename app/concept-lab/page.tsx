/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { RECORDS, KIND, recordHref } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import type { AnyRecord, RecordKind } from "@/content/types";
import { getBranchesForDiscipline, getDisciplineOrientation, getBranch } from "@/content/atlas";
import { SaveButton } from "./_components/SaveButton";
import styles from "./home-page.module.css";
import system from "./_design/system.module.css";
import home from "./home-sections.module.css";
import { ArtFragment, SectionHeading } from "./_design/ResearchSurface";

const KIND_ORDER: RecordKind[] = ["theory", "mechanism", "method", "study"];

const KIND_COPY: Record<RecordKind, { line: string; question: string; blurb: string }> = {
  theory: {
    line: "A lens for understanding",
    question: "What frame helps us see this?",
    blurb: "A theory organises a way of looking. It is a lens, not a report of what happened.",
  },
  mechanism: {
    line: "A pathway between things",
    question: "Through what route does it happen?",
    blurb: "A mechanism names the process something travels through, keeping the route inspectable.",
  },
  method: {
    line: "A practice for inquiry",
    question: "How can we work with the material?",
    blurb: "A method is something you do: a disciplined practice for producing or interpreting evidence.",
  },
  study: {
    line: "An argument from evidence",
    question: "What did this investigation show?",
    blurb: "A study keeps its design, finding and limitation together so the claim cannot float free.",
  },
};

const START_HERE: { id: string; why: string }[] = [
  { id: "person-environment-fit", why: "The framework three other records hang off. Start here and the rest of the library has a spine." },
  { id: "ipa", why: "The most hands-on record on the site — a method you could start using on a transcript this week." },
  { id: "tuned-out-or-dialed-in", why: "The only evidence record so far, and the clearest example of method kept welded to finding." },
  { id: "hpa-axis", why: "Where the psychology meets the body — and the one record that is a physical system rather than an idea." },
];

const MARKS: { glyph: string; colour: string; label: string; detail: string }[] = [
  { glyph: "●", colour: "var(--cobalt)", label: "Source-grounded", detail: "directly supported by a source" },
  { glyph: "■", colour: "var(--vermilion)", label: "Paraphrase", detail: "faithfully restated in our words" },
  { glyph: "▲", colour: "var(--ochre)", label: "Teaching analogy", detail: "a constructed way to see the idea" },
  { glyph: "✦", colour: "var(--violet)", label: "Editorial", detail: "Concept Lab synthesis or framing" },
  { glyph: "?", colour: "var(--teal)", label: "Contested", detail: "unresolved or debated" },
];

const HOME_ART = {
  atlas: "/visual-language/home/home-atlas-head-globe.webp",
} as const;

const DISCIPLINE_FRAGMENTS: Record<string, "organisation" | "music" | "method" | "mechanism"> = {
  ob: "organisation",
  "music-psych": "music",
  "qual-methods": "method",
  psychobiology: "mechanism",
};

function ArtFigure({
  src,
  alt,
  className,
  caption,
  note,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  caption: string;
  note?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`${styles.artFigure} ${className}`}>
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
      {note && <span className={styles.artNote}>{note}</span>}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function HomeStarter({ record, why, index }: { record: AnyRecord; why: string; index: number }) {
  const kind = KIND[record.kind];
  const discipline = DISCIPLINES[record.discipline];
  const branch = record.primaryBranch ? getBranch(record.primaryBranch, record.discipline) : undefined;
  return (
    <li className={home.starter}>
      <span className={home.recordNumber}>{String(index + 1).padStart(2, "0")}</span>
      <div className={home.recordCopy}>
        <p className={[system.meta, home.recordKind].join(" ")} style={{ borderLeftColor: kind.colour }}>{kind.label}</p>
        <h3><Link href={recordHref(record)} className={system.recordTitle}>{record.title}</Link></h3>
        <p className={home.recordHook}>{record.hook}</p>
        <details className={home.recordContext}>
          <summary>Record context</summary>
          {record.oneSentence && <p>{record.oneSentence}</p>}
          <p>{discipline?.name ?? record.discipline}{branch ? " · " + branch.label : ""} · {record.facts.slice(0, 2).join(" · ")}</p>
        </details>
      </div>
      <aside className={home.readingNote}>
        <span className={system.meta}>Why begin here</span>
        <p>{why}</p>
      </aside>
      <div className={[system.actions, home.recordActions].join(" ")}>
        <SaveButton id={record.id} />
        <Link href={recordHref(record)} className={system.link}>{kind.cta} <span aria-hidden="true">↗</span></Link>
      </div>
    </li>
  );
}

export default function ConceptLabHome() {
  const counts = KIND_ORDER.map((kind) => ({ kind, n: RECORDS.filter((record) => record.kind === kind).length }));
  const disciplineCounts = Object.values(DISCIPLINES)
    .map((d) => ({ d, n: RECORDS.filter((record) => record.discipline === d.id).length }))
    .filter(({ n }) => n > 0);
  const disciplineCards = disciplineCounts.map(({ d, n }) => ({ d, n, orientation: getDisciplineOrientation(d.id) }));
  const starters = START_HERE.map((start) => ({ ...start, record: RECORDS.find((record) => record.id === start.id) })).filter((start): start is { id: string; why: string; record: AnyRecord } => Boolean(start.record));

  return (
    <div className={`${styles.homePage} home-page-root wrap`}>
      <section className={styles.opening} data-reveal="hl">
        <ArtFigure
          src={HOME_ART.atlas}
          alt="A coloured-pencil atlas field with a human head, brain, globe, music and connected disciplines."
          className={styles.heroArt}
          caption="A shared canvas for theories, people, methods and connections."
          note="see the relations"
          priority
        />
        <div className={styles.openingCopy}>
          <span className={styles.eyebrow}>a living atlas of theories, evidence, methods and people</span>
          <h1>Academic<br /><span>Concept <em>Lab</em></span></h1>
          <p className={styles.thesis}>Theory, evidence and method — <span className={styles.underlineGold}>drawn out</span> until you can actually see them.</p>
          <p className={styles.openingLede}>Academic work explained without being flattened. Every claim carries a mark saying where it came from — and where it does not, the page says so.</p>
          <div className={styles.statLedger} aria-label="What is in the atlas">
            <div><b>{RECORDS.length}</b><span>records</span></div>
            <div><b>{counts.length}</b><span>kinds</span></div>
            <div><b>{disciplineCounts.length}</b><span>disciplines</span></div>
          </div>
          <Link className={styles.enterAtlas} href="/concept-lab/library"><span className={styles.enterArrow} aria-hidden="true">↗</span><span><b>Enter the atlas</b><small>follow an idea, then follow its evidence</small></span></Link>
        </div>
      </section>

      <div className={"acl-system " + home.sections}>
        <section className={[system.section, home.disciplines].join(" ")} id="disciplines" aria-labelledby="discipline-heading" data-art-level="2" data-archetype="intellectual-territory">
          <SectionHeading id="discipline-heading" number="01" eyebrow="Explore the atlas" title={<>Explore by <em>discipline.</em></>}>
            <p>Start with the field that frames your question. Each surface opens the live library, where records remain traceable to their kind and evidence.</p>
            <Link href="/concept-lab/library" className={system.link}>Browse the whole atlas <span aria-hidden="true">→</span></Link>
          </SectionHeading>
          <div className={home.territories}>
            {disciplineCards.map(({ d, n, orientation }, index) => (
              <article className={home.territory} data-discipline={d.id} key={d.id}>
                <div className={home.territoryArt}>
                  <ArtFragment name={DISCIPLINE_FRAGMENTS[d.id]} decorative className={home.groupFragment} />
                </div>
                <p className={system.meta}>{String(index + 1).padStart(2, "0")} <span className={home.count}>{n} {n === 1 ? "record" : "records"}</span></p>
                <h3 className={system.subject}>{d.name}</h3>
                <div className={home.territoryCopy}>
                  <p className={system.prose}>{orientation?.summary}</p>
                  {orientation?.themes.length ? <ul className={home.themes}>{orientation.themes.slice(0, 3).map(theme => <li key={theme}>{theme}</li>)}</ul> : null}
                  {d.id === "music-psych" && <p className={system.meta}>{getBranchesForDiscipline(d.id).length} current branches</p>}
                  <Link href={"/concept-lab/library?discipline=" + d.id} className={system.link}>Explore <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={system.section} id="record-kinds" aria-label="four kinds of record" data-art-level="2" data-archetype="comparison">
          <SectionHeading id="kinds-heading" number="02" eyebrow="Different ways in" title={<>Four kinds of record.</>}>
            <p>The same ideas can be seen as theories, mechanisms, methods or studies. Choose the form that makes the question clearest.</p>
          </SectionHeading>
          <ol className={home.knowledgeForms}>
            {counts.map(({ kind, n }) => <li data-kind={kind} key={kind}>
              <div className={home.formIdentity}>
                <h3 className={system.subject}>{KIND[kind].nav === "Research method" ? "Method" : KIND[kind].nav}</h3>
                <ArtFragment name={kind} decorative className={home.formFragment} />
              </div>
              <p className={home.formLine}>{KIND_COPY[kind].line}</p>
              <p className={home.formDescription}>{KIND_COPY[kind].blurb}</p>
              <p className={home.formQuestion}>{KIND_COPY[kind].question}</p>
              <Link href={"/concept-lab/library?kind=" + kind} className={[system.link, home.formLink].join(" ")}><span><b>{n}</b> {n === 1 ? "record" : "records"}</span><span>Explore <span aria-hidden="true">↗</span></span></Link>
            </li>)}
          </ol>
        </section>

        <section className={system.section} id="start-here" aria-labelledby="start-heading" data-art-level="0" data-archetype="editorial-record-list">
          <SectionHeading id="start-heading" number="03" eyebrow="A few places to begin" title={<>Start here.</>}>
            <p>Four hand-picked records to get you exploring. Each one opens a different responsibility in the atlas.</p>
            <Link href="/concept-lab/library" className={system.link}>See all {RECORDS.length} records <span aria-hidden="true">→</span></Link>
          </SectionHeading>
          <ol className={[system.ledger, home.starterLedger].join(" ")}>{starters.map((start, index) => <HomeStarter key={start.id} record={start.record} why={start.why} index={index} />)}</ol>
        </section>

        <section className={system.section} id="provenance" aria-labelledby="provenance-heading" data-art-level="1" data-archetype="quiet-scholarship">
          <SectionHeading id="provenance-heading" number="04" eyebrow="Trust & provenance" title={<>Why you can <em>check it.</em></>} />
          <div className={home.sourceLedger}>
            <div className={home.sourceIntro}>
              <p className={system.prose}>Nothing here is written from memory. Every claim carries one of five marks, so you can always see whether you are reading the source, our paraphrase of it, a teaching device, our own reading, or an open question the literature has not settled.</p>
              <div className={home.sourceDetail}>
                <ArtFragment name="books" />
                <div><p className={system.note}>Sources stay visible at the point where understanding is made.</p><Link href="/concept-lab/about" className={system.link}>How we cite <span aria-hidden="true">→</span></Link></div>
              </div>
            </div>
            <dl className={home.provenanceMarks} aria-label="The five provenance marks">
              {MARKS.map(mark => <div key={mark.label}><dt><span className={home.mark} style={{ color: mark.colour }} aria-hidden="true">{mark.glyph}</span>{mark.label}</dt><dd>{mark.detail}</dd></div>)}
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
