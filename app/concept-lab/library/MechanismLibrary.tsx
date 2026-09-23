import Link from "next/link";
import { DISCIPLINES } from "@/content/disciplines";
import type { Cascade, TheoryRecord } from "@/content/types";
import { RECORDS, recordHref } from "@/content/records";
import { Crumbs } from "../_components/RecordShell";
import { Rich } from "../_components/Sketch";
import { SaveButton } from "../_components/SaveButton";
import styles from "./mechanism-library.module.css";

export type MechanismRecord = TheoryRecord & { kind: "mechanism" };

type Props = { records: MechanismRecord[] };

// The Library pathway changes orientation across breakpoints. Keep this
// presentation-safe caption local; the individual HPA record retains its
// canonical caption in content/hpa-axis.ts.
const LIBRARY_CASCADE_CAPTION = "Schematic, not anatomy. The sequence and direction of travel are meaningful; organ shape, position and scale are not depicted and should not be inferred. The dashed line is negative feedback — cortisol acting back on the pituitary, hypothalamus and wider brain circuitry to regulate further activity, which is what makes this a regulated system rather than a one-way chain.";

function CascadePath({ data, title }: { data: Cascade; title: string }) {
  return (
    <figure className={styles.pathFigure} aria-label={`${title} pathway schematic`}>
      <ol className={styles.stations} aria-label={`${title} sequence of structures`}>
        {data.nodes.map((node, index) => (
          <li className={styles.station} key={node.label}>
            <h3>{node.label}</h3>
            <p>{node.sub}</p>
            {data.messengers[index] && data.nodes[index + 1] && (
              <p className={styles.messenger}>
                <span className={styles.messengerArrow} aria-hidden="true">→</span>
                <span>
                  <strong>{data.messengers[index]}</strong>
                  <small>to {data.nodes[index + 1].label}</small>
                </span>
              </p>
            )}
          </li>
        ))}
      </ol>

      <div className={styles.feedback}>
        <span className={styles.feedbackLoop} aria-hidden="true">↶</span>
        <strong>{data.feedback}</strong>
        <span>Cortisol acts back on the pituitary, hypothalamus and wider brain circuitry.</span>
      </div>
      <figcaption className={styles.pathCaption}>
        <span>▲ Schematic · order and direction, not anatomy</span>
        <p>{LIBRARY_CASCADE_CAPTION}</p>
      </figcaption>
    </figure>
  );
}

function MechanismEntry({ record, index }: { record: MechanismRecord; index: number }) {
  const pathway = record.cascade;
  const discipline = record.discipline;
  const fullRecordHref = recordHref(record);
  const related = record.relatedTo?.map((item) => ({
    ...item,
    record: RECORDS.find((candidate) => candidate.id === item.recordId),
  })) ?? [];

  return (
    <article className={styles.entry} aria-labelledby={`mechanism-title-${record.id}`}>
      <header className={styles.entryHeader}>
        <div className={styles.entryIdentity}>
          <span className={styles.entryIndex}>{String(index + 1).padStart(2, "0")} · {record.statusChip ?? "mechanism"}</span>
          <h2 id={`mechanism-title-${record.id}`}>{record.title}</h2>
          <p className={styles.hook}>{record.hook}</p>
        </div>
        <div className={styles.entryOrientation}>
          <span className={styles.microLabel}>The pathway, in brief</span>
          <p>{record.oneSentence}</p>
          <ul className={styles.facts} aria-label={`${record.title} facts`}>
            {record.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          <p className={styles.routeTimingNote}>
            The messenger sequence traces the route; rhythm describes how activity unfolds over time, not another step.
          </p>
        </div>
      </header>

      {pathway ? (
        <section className={styles.pathSection} aria-labelledby={`path-title-${record.id}`}>
          <div className={styles.pathHeading}>
            <div>
              <span className={styles.microLabel}>A pathway to inspect</span>
              <h3 id={`path-title-${record.id}`}>Follow the messengers.</h3>
            </div>
            {record.cascadeLede && <p>{record.cascadeLede}</p>}
          </div>
          <CascadePath data={pathway} title={record.title} />
        </section>
      ) : (
        <p className={styles.noPathway}>This record has no explicit sequence encoded in the library. Its full account keeps the pathway and its evidence in context.</p>
      )}

      {related.map((item) => (
        <section className={styles.relation} aria-label="Editorial connection" key={item.recordId}>
          <div className={styles.relationHeading}>
            <span className={styles.microLabel}>✦ Editorial connection</span>
            <h3>Could the HPA axis be one physiological route through the JD–R health-impairment process?</h3>
            {item.record && <Link href={recordHref(item.record)}>{item.record.title}<span aria-hidden="true"> ↗</span></Link>}
          </div>
          <Rich as="p" html={item.body} />
        </section>
      ))}

      <footer className={styles.entryFooter}>
        <p>
          <span>{DISCIPLINES[discipline]?.name ?? discipline}</span>
          <span><span className={styles.readingLabel}>Reading guide:</span> {record.minimumReadingLabel ?? `${record.minimumReading.length} starting sources`}</span>
          <span>{record.fullSources.length} sources in the full record</span>
        </p>
        <div className={styles.actions}>
          <SaveButton id={record.id} />
          <Link className={styles.fullRecord} href={fullRecordHref}>Open the full mechanism record <span aria-hidden="true">↗</span></Link>
        </div>
      </footer>
    </article>
  );
}

export function MechanismLibrary({ records }: Props) {
  const total = records.length;

  return (
    <div className={`wrap ${styles.page}`}>
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Library", href: "/concept-lab/library" }, { label: "Mechanisms" }]} />

      <header className={styles.opening}>
        <div className={styles.openingCopy}>
          <span className={styles.microLabel}>The Mechanism Library · through what?</span>
          <h1>What happens <em>in between?</em></h1>
          <p>A mechanism makes the route inspectable: the structures, signals and regulation through which a process travels.</p>
        </div>
        <aside className={styles.collectionNote} aria-label="Mechanism collection scope">
          <span className={styles.microLabel}>In this collection</span>
          <strong>{String(total).padStart(2, "0")} {total === 1 ? "pathway" : "pathways"}</strong>
          <span>{total === 1 ? "One system to follow" : "Each route read on its own terms"}</span>
        </aside>
      </header>

      <nav className={styles.libraryNav} aria-label="Library navigation">
        <Link href="/concept-lab/library">← All record kinds</Link>
        <Link href="/concept-lab/saved">Saved records ↗</Link>
      </nav>

      <section className={styles.collection} aria-labelledby="collection-title">
        <div className={styles.collectionHeading}>
          <span className={styles.microLabel}>Mechanism profile</span>
          <h2 id="collection-title">Follow a route, then read its limits.</h2>
        </div>
        {records.map((record, index) => <MechanismEntry record={record} index={index} key={record.id} />)}
      </section>

      <footer className={styles.pageEnd}>
        <p>Mechanisms answer <em>through what</em>. Their pathways stay distinct from the theories that ask <em>why</em>.</p>
        <nav aria-label="Continue through the Lab">
          <Link href="/concept-lab/library">Explore the Library</Link>
          <Link href="/concept-lab/saved">Return to Saved</Link>
        </nav>
      </footer>
    </div>
  );
}
