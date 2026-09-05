import Link from "next/link";
import type { CSSProperties } from "react";
import type { AnyRecord, RecordKind } from "@/content/types";
import { KIND } from "@/content/records";

type KindCount = { kind: RecordKind; n: number };

const KIND_POSITIONS: Record<RecordKind, { x: number; y: number }> = {
  theory: { x: 19, y: 22 },
  study: { x: 76, y: 19 },
  method: { x: 23, y: 75 },
  mechanism: { x: 77, y: 73 },
};

const TOPIC_POSITIONS = [
  { x: 18, y: 18, colour: "var(--blue)" },
  { x: 82, y: 22, colour: "var(--red)" },
  { x: 17, y: 77, colour: "var(--green)" },
  { x: 82, y: 78, colour: "var(--violet)" },
];

function ScribblePath({ d, colour, dashed = false }: { d: string; colour: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={colour}
      strokeWidth={dashed ? 1.3 : 2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "4 7" : undefined}
      opacity={dashed ? 0.55 : 0.75}
    />
  );
}

function PencilWash({ d, colour }: { d: string; colour: string }) {
  return (
    <g fill="none" stroke={colour} strokeLinecap="round" opacity=".12">
      <path d={d} strokeWidth="19" />
      <path d={d} strokeWidth="8" transform="translate(7 5)" opacity=".72" />
      <path d={d} strokeWidth="3" transform="translate(-5 -4)" opacity=".8" />
    </g>
  );
}

/** A reusable home-page map: four kinds orbit the editorial reason the atlas exists. */
export function AtlasConstellation({ counts }: { counts: KindCount[] }) {
  const byKind = new Map(counts.map((item) => [item.kind, item.n]));
  const nodes = (Object.keys(KIND_POSITIONS) as RecordKind[]).map((kind) => ({
    kind,
    ...KIND[kind],
    n: byKind.get(kind) ?? 0,
    position: KIND_POSITIONS[kind],
  }));

  return (
    <div className="atlas-constellation" role="group" aria-label="The four kinds of knowledge in the atlas">
      <svg className="atlas-constellation-drawing" viewBox="0 0 640 560" aria-hidden="true" focusable="false">
        <PencilWash d="M83 154C142 92 221 80 294 104" colour="var(--blue)" />
        <PencilWash d="M350 103C430 76 510 101 550 160" colour="var(--red)" />
        <PencilWash d="M91 423C155 476 233 486 292 467" colour="var(--green)" />
        <PencilWash d="M353 468C433 492 515 467 559 407" colour="var(--violet)" />
        <ScribblePath d="M120 154C185 58 450 48 525 151" colour="var(--blue)" dashed />
        <ScribblePath d="M514 165C587 252 570 419 470 470" colour="var(--red)" dashed />
        <ScribblePath d="M465 475C350 538 168 521 112 429" colour="var(--green)" dashed />
        <ScribblePath d="M108 422C44 330 54 231 120 154" colour="var(--violet)" dashed />
        <ScribblePath d="M144 177C242 222 350 185 482 162" colour="var(--red)" />
        <ScribblePath d="M479 170C424 254 430 337 473 449" colour="var(--gold)" />
        <ScribblePath d="M468 448C350 380 278 382 151 435" colour="var(--green)" />
        <ScribblePath d="M155 425C214 347 214 273 145 185" colour="var(--blue)" />
        <ScribblePath d="M320 82C313 168 319 225 320 274" colour="var(--gold)" dashed />
        <ScribblePath d="M319 302C321 365 328 418 323 490" colour="var(--gold)" dashed />
        <path d="M311 279l9-13 9 13M311 301l9 13 9-13" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M320 244c21-14 34-12 48 2" fill="none" stroke="var(--pen-3)" strokeWidth="1.2" opacity=".45" />
        <path d="M320 335c-18 12-33 10-46-2" fill="none" stroke="var(--pen-3)" strokeWidth="1.2" opacity=".45" />
      </svg>

      <div className="atlas-constellation-centre">
        <span className="cat">the atlas is a set of relationships</span>
        <strong>make ideas<br />visible</strong>
        <span className="hand-note">not interchangeable cards</span>
      </div>

      {nodes.map((node) => (
        <Link
          className={`atlas-constellation-node ${node.cls}`}
          href={`/concept-lab/library?kind=${node.kind}`}
          key={node.kind}
          style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
        >
          <span className="cat">{node.label}</span>
          <strong>{node.n}</strong>
          <span>{node.nav}</span>
        </Link>
      ))}

      <span className="atlas-constellation-note note-one">four ways of knowing</span>
      <span className="atlas-constellation-note note-two">each keeps its evidence attached</span>
    </div>
  );
}

/** A compact record map. Topics are taken directly from the record, so the drawing changes with the knowledge. */
export function RecordKnowledgeOrbit({ record }: { record: AnyRecord }) {
  const kind = KIND[record.kind];
  const topics = record.topics.slice(0, 4);
  const points = topics.map((topic, index) => ({
    topic,
    ...TOPIC_POSITIONS[index],
  }));

  return (
    <figure className={`record-orbit orbit-${record.kind}`} aria-labelledby={`orbit-caption-${record.id}`}>
      <svg className="record-orbit-drawing" viewBox="0 0 540 470" aria-hidden="true" focusable="false">
        <PencilWash d="M65 118C117 69 174 58 224 82" colour="var(--blue)" />
        <PencilWash d="M316 81C378 57 438 75 476 122" colour="var(--red)" />
        <PencilWash d="M64 365C120 412 177 423 225 397" colour="var(--green)" />
        <PencilWash d="M316 398C380 422 437 404 476 355" colour="var(--violet)" />
        <ScribblePath d="M102 104C171 36 364 38 440 107" colour="var(--blue)" dashed />
        <ScribblePath d="M437 115C500 185 493 338 426 388" colour="var(--red)" dashed />
        <ScribblePath d="M418 390C329 446 181 444 111 382" colour="var(--green)" dashed />
        <ScribblePath d="M108 370C49 295 51 177 102 104" colour="var(--violet)" dashed />
        <ScribblePath d="M111 118C172 166 213 187 250 206" colour="var(--blue)" />
        <ScribblePath d="M429 119C368 166 331 184 292 206" colour="var(--red)" />
        <ScribblePath d="M113 362C174 316 210 289 249 270" colour="var(--green)" />
        <ScribblePath d="M425 362C367 318 332 291 292 270" colour="var(--violet)" />
        <path d="M270 52v64M270 352v65" stroke={kind.colour} strokeWidth="1.5" strokeDasharray="5 8" opacity=".55" />
        <path d="M81 235h65M394 235h65" stroke={kind.colour} strokeWidth="1.5" strokeDasharray="5 8" opacity=".55" />
      </svg>
      <div className="record-orbit-centre" style={{ "--orbit-colour": kind.colour } as CSSProperties}>
        <span className="cat">{kind.label}</span>
        <strong>{record.title}</strong>
        <span className="record-orbit-caption">one question, held in a field of related ideas</span>
      </div>
      {points.map((point) => (
        <span
          className="record-orbit-topic"
          key={point.topic}
          style={{ left: `${point.x}%`, top: `${point.y}%`, "--topic-colour": point.colour } as CSSProperties}
        >
          <i aria-hidden="true" />
          {point.topic}
        </span>
      ))}
      <figcaption id={`orbit-caption-${record.id}`}>
        <span style={{ color: kind.colour }}>✦</span> a teaching map of this record’s vocabulary — not a published figure
      </figcaption>
    </figure>
  );
}

export function ReadingCompass() {
  return (
    <div className="reading-compass" role="img" aria-label="How to read the atlas">
      <svg viewBox="0 0 150 150" aria-hidden="true" focusable="false">
        <circle cx="75" cy="75" r="57" fill="none" stroke="var(--blue)" strokeWidth="2" />
        <circle cx="75" cy="75" r="40" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="4 6" />
        <path d="M75 17v116M17 75h116" stroke="var(--pen-3)" strokeWidth="1" opacity=".4" />
        <path d="M75 26l6 48-6 50-6-50z" fill="rgba(226,78,27,.18)" stroke="var(--red)" strokeWidth="1.8" />
        <path d="M75 75l49-20M75 75l-34 34" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="75" cy="75" r="4" fill="var(--pen)" />
      </svg>
      <span className="compass-label compass-top">claim</span>
      <span className="compass-label compass-right">evidence</span>
      <span className="compass-label compass-bottom">limit</span>
      <span className="compass-label compass-left">question</span>
    </div>
  );
}
