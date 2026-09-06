import Link from "next/link";
import type { CSSProperties } from "react";
import type { AnyRecord, RecordKind } from "@/content/types";
import { KIND } from "@/content/records";

type KindCount = { kind: RecordKind; n: number };

const KIND_COLOURS: Record<RecordKind, string> = {
  theory: "var(--blue)",
  study: "var(--coral)",
  method: "var(--gold)",
  mechanism: "var(--violet)",
};

const NOTE_POSITIONS = [
  { x: 12, y: 19, colour: "var(--blue)" },
  { x: 77, y: 14, colour: "var(--coral)" },
  { x: 10, y: 72, colour: "var(--green)" },
  { x: 79, y: 73, colour: "var(--violet)" },
];

function PencilLine({ d, colour, width = 2, dashed = false }: { d: string; colour: string; width?: number; dashed?: boolean }) {
  return (
    <>
      <path d={d} fill="none" stroke={colour} strokeWidth={width + 3.2} strokeLinecap="round" opacity=".07" transform="translate(3 2)" />
      <path d={d} fill="none" stroke={colour} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? "5 8" : undefined} opacity={dashed ? ".58" : ".82"} />
      <path d={d} fill="none" stroke={colour} strokeWidth={Math.max(0.8, width - .8)} strokeLinecap="round" opacity=".32" transform="translate(-2 1)" />
    </>
  );
}

function PencilCloud({ d, colour }: { d: string; colour: string }) {
  return (
    <g fill="none" stroke={colour} strokeLinecap="round" opacity=".14">
      <path d={d} strokeWidth="24" />
      <path d={d} strokeWidth="13" transform="translate(5 -3)" opacity=".72" />
      <path d={d} strokeWidth="4" transform="translate(-4 3)" opacity=".85" />
    </g>
  );
}

function StarMark({ x, y, colour }: { x: number; y: number; colour: string }) {
  return <path d={`M${x} ${y - 12}l3.2 8.4 8.8 1.1-6.7 5.8 2 8.5-7.3-4.5-7.3 4.5 2-8.5-6.7-5.8 8.8-1.1z`} fill="none" stroke={colour} strokeWidth="1.7" strokeLinejoin="round" opacity=".82" />;
}

/**
 * The home canvas is a drawn index rather than a hero illustration. The four
 * record kinds are treated as four sheets of work that meet around a shared
 * editorial purpose; the connections are the navigation.
 */
export function AtlasConstellation({ counts }: { counts: KindCount[] }) {
  const byKind = new Map(counts.map((item) => [item.kind, item.n]));
  const sheets = (Object.keys(KIND_COLOURS) as RecordKind[]).map((kind, index) => ({
    kind,
    n: byKind.get(kind) ?? 0,
    label: KIND[kind].nav,
    colour: KIND_COLOURS[kind],
    index: String(index + 1).padStart(2, "0"),
  }));

  return (
    <div className="atlas-field" role="group" aria-label="The four kinds of knowledge in the atlas">
      <svg className="atlas-field-drawing" viewBox="0 0 680 590" aria-hidden="true" focusable="false">
        <PencilCloud d="M116 146C160 91 222 77 294 103" colour="var(--blue)" />
        <PencilCloud d="M386 100C459 70 535 94 577 147" colour="var(--coral)" />
        <PencilCloud d="M111 454C177 495 235 497 302 470" colour="var(--green)" />
        <PencilCloud d="M390 469C469 501 532 482 582 425" colour="var(--violet)" />
        <PencilLine d="M115 147C186 56 493 52 576 148" colour="var(--blue)" dashed />
        <PencilLine d="M576 148C646 229 635 398 577 448" colour="var(--coral)" dashed />
        <PencilLine d="M577 448C474 548 199 544 111 454" colour="var(--green)" dashed />
        <PencilLine d="M111 454C40 365 43 229 115 147" colour="var(--violet)" dashed />
        <PencilLine d="M153 180C218 232 248 263 310 291" colour="var(--blue)" width={2.4} />
        <PencilLine d="M522 173C469 226 426 263 370 290" colour="var(--coral)" width={2.4} />
        <PencilLine d="M162 427C220 388 259 348 311 322" colour="var(--green)" width={2.4} />
        <PencilLine d="M518 428C464 387 424 348 370 322" colour="var(--violet)" width={2.4} />
        <path d="M340 48v187M340 357v185" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 9" opacity=".62" />
        <path d="M74 296h179M427 296h179" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 9" opacity=".62" />
        <path d="M333 280l7-12 7 12M333 353l7 12 7-12" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <StarMark x={340} y={50} colour="var(--gold)" />
        <StarMark x={603} y={296} colour="var(--coral)" />
        <StarMark x={77} y={296} colour="var(--blue)" />
      </svg>

      <div className="atlas-field-centre">
        <span className="cat">a working index</span>
        <strong>make<br /><i>ideas</i><br />visible</strong>
        <span className="hand-note">start anywhere. follow the thread.</span>
      </div>

      {sheets.map((sheet, index) => (
        <Link
          className={`atlas-field-sheet atlas-field-sheet-${sheet.kind}`}
          href={`/concept-lab/library?kind=${sheet.kind}`}
          key={sheet.kind}
          style={{ "--sheet-colour": sheet.colour, "--sheet-index": index } as CSSProperties}
        >
          <span className="atlas-sheet-number">{sheet.index}</span>
          <span className="atlas-sheet-label">{sheet.label}</span>
          <strong>{sheet.n}</strong>
          <span className="atlas-sheet-caption">{sheet.n === 1 ? "record" : "records"}</span>
          <span className="atlas-sheet-rule" aria-hidden="true" />
          <span className="atlas-sheet-question">
            {sheet.kind === "theory" ? "what lens?" : sheet.kind === "study" ? "what happened?" : sheet.kind === "method" ? "how to work?" : "through what path?"}
          </span>
        </Link>
      ))}

      <span className="atlas-field-note atlas-field-note-one">four ways of asking</span>
      <span className="atlas-field-note atlas-field-note-two">the marks keep the differences visible</span>
      <span className="atlas-field-note atlas-field-note-three">the white space is part of the argument</span>
    </div>
  );
}

function TheoryPlate({ record }: { record: AnyRecord }) {
  return (
    <>
      <PencilCloud d="M65 116C135 55 231 77 274 138" colour="var(--blue)" />
      <PencilCloud d="M350 122C422 65 491 90 512 151" colour="var(--coral)" />
      <PencilCloud d="M84 345C145 399 222 391 274 340" colour="var(--green)" />
      <PencilCloud d="M365 351C421 399 480 382 514 327" colour="var(--violet)" />
      <PencilLine d="M89 145C175 95 244 137 282 211" colour="var(--blue)" />
      <PencilLine d="M495 145C426 98 355 136 320 211" colour="var(--coral)" />
      <PencilLine d="M96 337C173 360 233 331 284 282" colour="var(--green)" />
      <PencilLine d="M493 336C421 361 359 331 319 282" colour="var(--violet)" />
      <path d="M300 42v117M300 321v105M52 253h116M431 253h111" stroke="var(--pen-3)" strokeWidth="1.2" strokeDasharray="4 8" opacity=".48" />
      <path d="M268 237c-31 11-45 28-56 51M332 237c30 10 45 27 56 51" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity=".75" />
      <StarMark x={300} y={45} colour="var(--gold)" />
      <text x="300" y="448" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--cat)" fontSize="10" letterSpacing="2">CONCEPTS IN RELATION</text>
      <text x="300" y="466" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--hand)" fontSize="15">one frame · several cues</text>
      {record.topics.slice(0, 4).map((topic, index) => {
        const p = NOTE_POSITIONS[index];
        return <circle key={topic} cx={p.x * 6.2} cy={p.y * 4.7} r="7" fill="white" stroke={p.colour} strokeWidth="2" />;
      })}
    </>
  );
}

function StudyPlate() {
  return (
    <>
      <PencilLine d="M75 96C143 86 190 95 235 120" colour="var(--coral)" width={2.5} />
      <PencilLine d="M235 120C282 148 331 149 376 120" colour="var(--gold)" width={2.5} />
      <PencilLine d="M376 120C426 91 474 91 510 113" colour="var(--teal)" width={2.5} />
      <PencilLine d="M508 113C461 223 400 283 311 340" colour="var(--coral)" dashed />
      <PencilLine d="M311 340C232 290 171 233 75 204" colour="var(--blue)" dashed />
      <PencilCloud d="M65 95C115 58 173 65 228 103" colour="var(--coral)" />
      <PencilCloud d="M373 102C431 66 481 73 517 112" colour="var(--teal)" />
      <PencilCloud d="M230 337C288 380 354 378 407 337" colour="var(--gold)" />
      <path d="M76 204h55M452 204h58" stroke="var(--pen-3)" strokeWidth="1.3" strokeDasharray="4 7" opacity=".5" />
      <path d="M72 80v22M236 105v26M376 104v26M508 98v25M311 327v27M75 192v24" stroke="var(--pen-3)" strokeWidth="1.3" opacity=".6" />
      <StarMark x={311} y={348} colour="var(--gold)" />
      <text x="300" y="425" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--cat)" fontSize="10" letterSpacing="2">QUESTION → DESIGN → CLAIM</text>
      <text x="300" y="446" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--hand)" fontSize="15">the argument stays attached to its method</text>
    </>
  );
}

function MethodPlate() {
  return (
    <>
      <PencilCloud d="M70 111C135 68 199 76 255 108" colour="var(--gold)" />
      <PencilCloud d="M424 107C474 79 512 93 535 125" colour="var(--teal)" />
      <PencilLine d="M71 126C145 161 184 192 225 231" colour="var(--gold)" width={2.5} />
      <PencilLine d="M225 231C253 257 272 274 300 299" colour="var(--teal)" width={2.5} />
      <PencilLine d="M300 299C337 261 366 227 409 191" colour="var(--coral)" width={2.5} />
      <PencilLine d="M409 191C454 151 491 133 535 124" colour="var(--violet)" width={2.5} />
      <path d="M119 151c-25 14-35 35-22 54 13 17 40 14 52-5" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      <path d="M474 153c23 12 30 34 16 51-13 16-37 12-48-5" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="71" cy="126" r="8" fill="white" stroke="var(--gold)" strokeWidth="2" />
      <circle cx="225" cy="231" r="8" fill="white" stroke="var(--teal)" strokeWidth="2" />
      <circle cx="300" cy="299" r="10" fill="white" stroke="var(--coral)" strokeWidth="2" />
      <circle cx="409" cy="191" r="8" fill="white" stroke="var(--violet)" strokeWidth="2" />
      <circle cx="535" cy="124" r="8" fill="white" stroke="var(--violet)" strokeWidth="2" />
      <PencilLine d="M300 299C350 344 421 342 463 311" colour="var(--pen-3)" dashed />
      <path d="M460 307l-5 1 3 5" fill="none" stroke="var(--pen-3)" strokeWidth="1.5" />
      <text x="300" y="422" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--cat)" fontSize="10" letterSpacing="2">NOTICE · DECIDE · CHECK · REFLECT</text>
      <text x="300" y="444" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--hand)" fontSize="15">a practice gets clearer by being used</text>
    </>
  );
}

function MechanismPlate() {
  return (
    <>
      <PencilCloud d="M70 125C127 74 193 88 237 126" colour="var(--violet)" />
      <PencilCloud d="M366 127C426 83 485 91 526 136" colour="var(--coral)" />
      <PencilLine d="M78 136C142 176 194 205 248 230" colour="var(--violet)" width={2.6} />
      <PencilLine d="M248 230C283 247 322 248 357 230" colour="var(--coral)" width={2.6} />
      <PencilLine d="M357 230C418 199 466 174 525 136" colour="var(--gold)" width={2.6} />
      <PencilLine d="M522 286C457 332 404 341 350 312" colour="var(--teal)" dashed width={2.1} />
      <PencilLine d="M350 312C295 344 231 340 177 295" colour="var(--teal)" dashed width={2.1} />
      <path d="M505 279l13 5-9 9M180 292l-13 1 7 10" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="78" cy="136" r="8" fill="white" stroke="var(--violet)" strokeWidth="2" />
      <circle cx="248" cy="230" r="11" fill="white" stroke="var(--coral)" strokeWidth="2" />
      <circle cx="357" cy="230" r="8" fill="white" stroke="var(--gold)" strokeWidth="2" />
      <circle cx="525" cy="136" r="8" fill="white" stroke="var(--gold)" strokeWidth="2" />
      <StarMark x={248} y={231} colour="var(--coral)" />
      <text x="300" y="422" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--cat)" fontSize="10" letterSpacing="2">COMPONENTS → PATHWAY → OUTCOME</text>
      <text x="300" y="444" textAnchor="middle" fill="var(--pen-3)" fontFamily="var(--hand)" fontSize="15">the route is the thing to inspect</text>
    </>
  );
}

/** A record-specific teaching plate. Its labels come from the record itself. */
export function RecordKnowledgeOrbit({ record }: { record: AnyRecord }) {
  const kind = KIND[record.kind];
  const topics = record.topics.slice(0, 4);
  const plateParts = record.kind === "study" ? <StudyPlate /> : record.kind === "method" ? <MethodPlate /> : record.kind === "mechanism" ? <MechanismPlate /> : <TheoryPlate record={record} />;

  return (
    <figure className={`knowledge-plate plate-${record.kind}`} aria-labelledby={`plate-caption-${record.id}`}>
      <svg className="knowledge-plate-drawing" viewBox="0 0 600 480" aria-hidden="true" focusable="false">
        {plateParts}
      </svg>
      <div className="knowledge-plate-paper" style={{ "--plate-colour": kind.colour } as CSSProperties}>
        <span className="cat">{kind.nav.toLowerCase()} · teaching plate</span>
        <strong>{record.title}</strong>
        <span className="plate-paper-rule" aria-hidden="true" />
        <span className="hand-note">{record.hook}</span>
      </div>
      {topics.map((topic, index) => {
        const position = NOTE_POSITIONS[index];
        return (
          <span className="knowledge-plate-topic" key={topic} style={{ left: `${position.x}%`, top: `${position.y}%`, "--topic-colour": position.colour } as CSSProperties}>
            <i aria-hidden="true" />
            {topic}
          </span>
        );
      })}
      <figcaption id={`plate-caption-${record.id}`}>
        <span style={{ color: kind.colour }}>✦</span> a teaching reconstruction of this record’s vocabulary — the sources and caveats remain below
      </figcaption>
    </figure>
  );
}

export function ReadingCompass() {
  return (
    <div className="reading-compass" role="img" aria-label="How to read the atlas">
      <svg viewBox="0 0 170 170" aria-hidden="true" focusable="false">
        <circle cx="85" cy="85" r="64" fill="none" stroke="var(--blue)" strokeWidth="1.8" />
        <circle cx="85" cy="85" r="46" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="3 7" />
        <path d="M85 17v136M17 85h136" stroke="var(--pen-3)" strokeWidth="1" opacity=".38" />
        <path d="M85 25l8 59-8 61-8-61z" fill="rgba(197,68,26,.12)" stroke="var(--coral)" strokeWidth="1.8" />
        <path d="M85 85l52-23M85 85l-39 39" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="85" cy="85" r="4" fill="var(--pen)" />
      </svg>
      <span className="compass-label compass-top">claim</span>
      <span className="compass-label compass-right">evidence</span>
      <span className="compass-label compass-bottom">limit</span>
      <span className="compass-label compass-left">question</span>
    </div>
  );
}
