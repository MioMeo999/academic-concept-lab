import Image from "next/image";
import { DISCIPLINES } from "@/content/disciplines";
import type { TheoryRecord } from "@/content/types";
import { KIND } from "@/content/records";
import { getArtAsset } from "@/app/concept-lab/_design/art-manifest";
import { SaveButton } from "../SaveButton";
import { MeyerInteractiveField } from "./MeyerInteractiveField";
import styles from "./batch2-record-heroes.module.css";

function Identity({ record }: { record: TheoryRecord }) {
  const kind = KIND[record.kind];
  return (
    <div className={styles.identity}>
      <div className={styles.chips}>
        <span className={`chip ${kind.cls}`}>{kind.label}</span>
        <span className="chip grey">{DISCIPLINES[record.discipline]?.name}</span>
      </div>
      <SaveButton id={record.id} />
    </div>
  );
}

function Index({ record }: { record: TheoryRecord }) {
  const kind = KIND[record.kind];
  return <span className={styles.index}>{kind.nav} · {record.statusChip ?? "a working record"}</span>;
}

function Topics({ record }: { record: TheoryRecord }) {
  return (
    <div className={styles.topics} role="list" aria-label="Key terms">
      {record.topics.slice(0, 5).map((topic, index) => <span role="listitem" key={topic} data-tone={index % 2 ? "red" : "blue"}>{topic}</span>)}
    </div>
  );
}

export function MeyerPageHero({ record, opening }: { record: TheoryRecord; opening: NonNullable<TheoryRecord["meyer"]>["opening"] }) {
  return (
    <section className={styles.meyer} aria-labelledby="record-title">
      <div className={styles.meyerHeading}>
        <Identity record={record} />
        <Index record={record} />
        <h1 className="title" id="record-title">{record.title}</h1>
        <p className="hook">{record.hook}</p>
      </div>
      <MeyerInteractiveField opening={opening} />
      <div className={styles.meyerReading}>
        <p className="lede">{record.oneSentence}</p>
        <p className={styles.openingLede}>{opening.lede}</p>
        <p className={styles.marginQuestion}>What might follow — and what might it make the earlier moment mean?</p>
        <p className={styles.constructedNote}><b>▲</b> Constructed tonal teaching examples. They illustrate expectation inside one learned tonal style; they are not a test of the listener and not empirical evidence.</p>
        <p className={styles.meyerCallout}>You were already listening to music that had not happened yet.</p>
        <p className={styles.openingNote}>{opening.note}</p>
        <Topics record={record} />
      </div>
    </section>
  );
}

export function HuronPageHero({ record }: { record: TheoryRecord }) {
  const art = getArtAsset("huron-outcome-hinge");
  return (
    <section className={styles.huron} aria-labelledby="record-title">
      <div className={styles.huronTop}>
        <Identity record={record} />
        <Index record={record} />
      </div>
      <div className={styles.huronHeading}>
        <h1 className="title" id="record-title">{record.title}</h1>
        <p className="hook">{record.hook}</p>
      </div>
      <figure className={styles.huronField}>
        <Image src={art.src} alt={art.baseDescription} width={art.dimensions.width} height={art.dimensions.height} priority unoptimized sizes="(max-width: 760px) 100vw, 92vw" />
        <figcaption><span>before · anticipation</span><b>the outcome</b><span>after · response</span></figcaption>
      </figure>
      <div className={styles.huronReading}>
        <p className="lede">{record.oneSentence}</p>
        <p className={styles.marginQuestion}>The same arrival can meet distinct questions, on different temporal reaches.</p>
        <Topics record={record} />
      </div>
    </section>
  );
}

export function IdyomPageHero({ record }: { record: TheoryRecord }) {
  const art = getArtAsset("idyom-context-field");
  return (
    <section className={styles.idyom} aria-labelledby="record-title">
      <div className={styles.idyomField}>
        <figure>
          <Image src={art.src} alt={art.baseDescription} width={art.dimensions.width} height={art.dimensions.height} priority unoptimized sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption><span>learned history</span><b>current context</b><span>possible events</span></figcaption>
        </figure>
      </div>
      <div className={styles.idyomCopy}>
        <Identity record={record} />
        <Index record={record} />
        <h1 className="title" id="record-title">{record.title}</h1>
        <p className="hook">{record.hook}</p>
        <p className="lede">{record.oneSentence}</p>
        <div className={styles.measureNote} aria-label="Three distinct parts of the model explanation">
          <span>context</span><b aria-hidden="true">→</b><span>distribution</span><b aria-hidden="true">→</b><span>event information</span>
        </div>
        <Topics record={record} />
      </div>
    </section>
  );
}
