"use client";

import { Fragment, useState, type CSSProperties } from "react";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import { Rich } from "../../_components/Sketch";
import { WORKED_PASS, WORKED_STATEMENTS, WORKED_PET, VOICE_SENSE, type AttendFeature } from "./worked-pass";
import s from "./ipa.module.css";

/* ------------------------------------------------------------------------
   Three commitments, held together. Lift one out and see what the analysis
   collapses into. The consequences are our synthesis of the record's own
   commitments and misuses, marked ✦.
   --------------------------------------------------------------------- */

type Commitment = { title: string; body: string };
const WITHOUT: Record<string, string> = {
  Phenomenology: "Without phenomenology, the account is checked for accuracy — what really happened — rather than read for how it appeared to and mattered for the person.",
  Hermeneutics: "Without hermeneutics, the account is reported, tidied and returned: giving voice without making sense. Paraphrase.",
  Idiography: "Without idiography, every transcript is coded at once and merged into group themes — the most common way a study stops being IPA.",
};

export function CommitmentLenses({ commitments }: { commitments: Commitment[] }) {
  const [dropped, setDropped] = useState<string | null>(null);
  const pos = [
    { cx: 175, cy: 150 },
    { cx: 305, cy: 150 },
    { cx: 240, cy: 255 },
  ];
  const tone = ["var(--teal)", "var(--gold-deep)", "var(--vermilion)"];
  return (
    <div className={s.lenses}>
      <figure className={s.lensFigure} data-dropped={dropped ?? undefined}>
        <svg viewBox="0 0 480 400" aria-hidden="true">
          {commitments.map((c, i) => (
            <g key={c.title} className={s.lens} data-off={dropped === c.title || undefined} style={{ "--lens": tone[i] } as CSSProperties}>
              <ellipse cx={pos[i].cx} cy={pos[i].cy} rx="118" ry="112" filter="url(#folio-pencil)" />
              <ellipse cx={pos[i].cx + 3} cy={pos[i].cy - 2} rx="112" ry="108" className={s.lensSecond} filter="url(#folio-graphite)" />
              <text x={pos[i].cx + [-70, 70, 0][i]} y={pos[i].cy + [-40, -40, 70][i]} textAnchor="middle">{c.title}</text>
            </g>
          ))}
          <text className={s.lensCentre} x="240" y="196" textAnchor="middle">{dropped ? "thematic coding" : "IPA"}</text>
        </svg>
      </figure>
      <div className={s.lensPanel}>
        <p className={s.lensPrompt} id="ipa-lens-prompt">Lift one commitment out.</p>
        <div className={s.lensButtons} role="group" aria-labelledby="ipa-lens-prompt">
          {commitments.map((c, i) => (
            <button key={c.title} type="button" aria-pressed={dropped === c.title} onClick={() => setDropped(dropped === c.title ? null : c.title)} style={{ "--lens": tone[i] } as CSSProperties}>
              <span className={s.lensSwatch} aria-hidden="true" />
              <span>
                <b>{c.title}</b>
                <small>{c.body}</small>
              </span>
            </button>
          ))}
        </div>
        <p className={s.lensReading} aria-live="polite">
          {dropped ? <><Glyph g="✦" /> {WITHOUT[dropped]}</> : "Held together, the three commitments produce one relationship: a reading of someone else's reading."}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Giving voice ↔ making sense. One constructed line read three ways; the
   drawing moves the researcher's loop toward or away from the participant's.
   --------------------------------------------------------------------- */

type VS = keyof typeof VOICE_SENSE.readings;

export function VoiceAndSense() {
  const [mode, setMode] = useState<VS>("both");
  const r = VOICE_SENSE.readings[mode];
  return (
    <div className={s.vs} data-mode={mode}>
      <figure className={s.vsFigure} aria-hidden="true">
        <svg viewBox="0 0 360 260">
          <ellipse className={s.vsExperience} cx="170" cy="134" rx="42" ry="34" filter="url(#folio-pencil)" />
          <ellipse className={s.vsParticipant} cx="170" cy="134" rx="84" ry="70" filter="url(#folio-pencil)" />
          <ellipse className={s.vsResearcher} filter="url(#folio-pencil)" />
        </svg>
      </figure>
      <div className={s.vsPanel}>
        <p className={s.vsLine}><span aria-hidden="true">“</span>{VOICE_SENSE.line}<span aria-hidden="true">”</span></p>
        <Choices<VS>
          label="How the researcher reads the line"
          value={mode}
          onChange={setMode}
          options={[
            { value: "voice", label: "Only giving voice" },
            { value: "both", label: "Both" },
            { value: "theory", label: "Only making sense" },
          ]}
        />
        <div className={s.vsReading} aria-live="polite">
          <p className={s.vsText}>{r.reading}</p>
          <p className={s.vsVerdict}>{r.verdict}</p>
        </div>
        <p className={s.teachingNote}><Glyph g="▲" /> Constructed line and readings, written for this page — not data from any study.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Is it an IPA question? A sieve: each question is judged on its own.
   --------------------------------------------------------------------- */

type Q = { question: string; fits: boolean; why: string };

export function QuestionSieve({ items }: { items: Q[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setOpen((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  const judged = open.size;
  return (
    <div className={s.sieve}>
      <p className={s.sieveCount} aria-live="polite">{judged} of {items.length} judged</p>
      <ol className={s.sieveList}>
        {items.map((q, i) => {
          const isOpen = open.has(i);
          return (
            <li key={q.question} data-open={isOpen || undefined} data-fits={isOpen ? String(q.fits) : undefined}>
              <button type="button" aria-expanded={isOpen} aria-controls={`ipa-q-${i}`} onClick={() => toggle(i)}>
                <span className={s.sieveNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className={s.sieveQ}>{q.question}</span>
                <span className={s.sieveHint} aria-hidden="true">{isOpen ? (q.fits ? "an IPA question" : "better elsewhere") : "judge"}</span>
              </button>
              <div id={`ipa-q-${i}`} className={s.sieveWhy} hidden={!isOpen}>
                <p><b>{q.fits ? "Fits IPA." : "Not an IPA question."}</b> {q.why}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------------
   One case at a time. The procedure's eight steps are played on a small
   stack of case sheets; the idiographic rule is what the stack enforces.
   The shortcut shows what happens when it is broken.
   --------------------------------------------------------------------- */

type Step = { n: string; title: string; body: string };

export function OneCaseAtATime({ steps, rule }: { steps: Step[]; rule: string }) {
  const [i, setI] = useState(0);
  const [shortcut, setShortcut] = useState(false);
  const step = steps[i];
  // Which sheet is on top and how marked it is.
  const stage = i + 1; // 1..8
  const marks = Math.min(5, stage); // steps 1–5 build up the first case
  return (
    <div className={s.cases} data-stage={stage} data-shortcut={shortcut || undefined}>
      <figure className={s.stack} aria-hidden="true">
        <div className={s.sheet} data-sheet="1">
          <span className={s.sheetLabel}>case 1</span>
          <span className={s.lines} />
          {marks >= 2 && <span className={s.notes} />}
          {marks >= 3 && <span className={s.statements}><i /><i /><i /></span>}
          {marks >= 4 && <span className={s.links} />}
          {marks >= 5 && <span className={s.pet}>PETs</span>}
        </div>
        <div className={s.sheet} data-sheet="2"><span className={s.sheetLabel}>case 2</span><span className={s.lines} />{stage >= 7 && <span className={s.pet}>PETs</span>}</div>
        <div className={s.sheet} data-sheet="3"><span className={s.sheetLabel}>case 3</span><span className={s.lines} />{stage >= 7 && <span className={s.pet}>PETs</span>}</div>
        {stage >= 7 && !shortcut && (
          <svg className={s.across} viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M60 150 C 140 110, 260 110, 340 150" filter="url(#folio-pencil)" />
            <path className={s.diverge} d="M60 160 C 150 190, 250 60, 340 160" filter="url(#folio-pencil)" />
          </svg>
        )}
        {stage === 8 && !shortcut && <div className={s.account}>account<br /><small>traceable to extracts</small></div>}
        {shortcut && <div className={s.merged}>one merged pile<br /><small>no case finished</small></div>}
      </figure>

      <div className={s.casesPanel}>
        <ol className={s.stepTicks} aria-label="Procedure steps">
          {steps.map((st, k) => (
            <li key={st.n}>
              <button type="button" aria-current={k === i ? "step" : undefined} aria-label={`Step ${st.n}: ${st.title}`} onClick={() => { setI(k); setShortcut(false); }}>
                <span>{st.n}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className={s.stepRead} aria-live="polite">
          <p className={s.stepScope}>{stage <= 6 ? "one participant" : "across cases"}</p>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </div>
        <div className={s.stepNav}>
          <button type="button" onClick={() => { setI(Math.max(0, i - 1)); setShortcut(false); }} disabled={i === 0}>← previous</button>
          <button type="button" onClick={() => { setI(Math.min(steps.length - 1, i + 1)); setShortcut(false); }} disabled={i === steps.length - 1}>next →</button>
        </div>
        <div className={s.shortcut}>
          <button type="button" aria-pressed={shortcut} onClick={() => setShortcut((v) => !v)}>
            {shortcut ? "Undo the shortcut" : "Try the shortcut: code every transcript at once"}
          </button>
          {shortcut && <p className={s.shortcutRule} aria-live="polite">{rule}</p>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   The close pass: four columns on one short constructed extract. Choose the
   column to foreground (the others stay, quieter), or a feature to attend to.
   --------------------------------------------------------------------- */

type Col = "descriptive" | "linguistic" | "conceptual";

function renderLine(text: string, feature: AttendFeature | null) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[\[([^|]+)\|([^\]]+)\]\]$/);
    if (!m) return <Fragment key={i}>{p}</Fragment>;
    const [, t, f] = m;
    return <mark key={i} data-feature={f} data-on={feature === f || undefined}>{t === "laughs" ? <i>[{t}]</i> : t}</mark>;
  });
}

export function ClosePass({ columns, attendTo }: { columns: { title: string; asks: string }[]; attendTo: string[] }) {
  const [col, setCol] = useState<Col>("descriptive");
  const [feature, setFeature] = useState<AttendFeature | null>(null);
  const present = new Set(WORKED_PASS.flatMap((l) => [...l.text.matchAll(/\|([^\]]+)\]\]/g)].map((m) => m[1])));
  return (
    <div className={s.pass} data-col={col}>
      <div className={s.passControls}>
        <Choices<Col>
          label="Which column to foreground"
          value={col}
          onChange={setCol}
          options={columns.slice(1).map((c) => ({ value: c.title.toLowerCase() as Col, label: c.title, hint: c.asks }))}
        />
      </div>

      <div className={s.passTable} role="table" aria-label="Four-column close pass on a constructed extract">
        <div className={s.passHead} role="row">
          {columns.map((c) => (
            <span role="columnheader" key={c.title} data-col={c.title.toLowerCase()}>{c.title}<small>{c.asks}</small></span>
          ))}
        </div>
        {WORKED_PASS.map((l) => (
          <div className={s.passRow} role="row" key={l.n}>
            <span role="cell" className={s.passText} data-label="Transcript"><b aria-hidden="true">{l.n}</b>{renderLine(l.text, feature)}</span>
            <span role="cell" data-col="descriptive" data-label="Descriptive">{l.descriptive}</span>
            <span role="cell" data-col="linguistic" data-label="Linguistic">{l.linguistic}</span>
            <span role="cell" data-col="conceptual" data-label="Conceptual">{l.conceptual}</span>
          </div>
        ))}
      </div>

      <div className={s.attend}>
        <p className={s.attendHead} id="ipa-attend">Attend to</p>
        <div className={s.attendList} role="group" aria-labelledby="ipa-attend">
          {attendTo.map((f) => {
            const has = present.has(f);
            return (
              <button key={f} type="button" aria-pressed={feature === f} disabled={!has} onClick={() => setFeature(feature === f ? null : (f as AttendFeature))} title={has ? undefined : "Not in this short extract"}>
                {f}
              </button>
            );
          })}
        </div>
        <p className={s.attendRead} aria-live="polite">
          {feature ? `Marked in the extract: ${feature}.` : "Choose a feature to find it in the participant's words."}
        </p>
      </div>

      <div className={s.distil}>
        <div>
          <p className={s.distilHead}>Experiential statements</p>
          <ul>
            {WORKED_STATEMENTS.map((st) => <li key={st.text}>{st.text} <span>lines {st.lines.join(", ")}</span></li>)}
          </ul>
        </div>
        <svg className={s.distilArrow} viewBox="0 0 60 120" aria-hidden="true"><path d="M8 10 C 40 30, 44 80, 30 108" filter="url(#folio-pencil)" /><path d="M20 98 L30 110 L40 96" filter="url(#folio-pencil)" /></svg>
        <div>
          <p className={s.distilHead}>A Personal Experiential Theme, for this case</p>
          <p className={s.petText}>{WORKED_PET}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------
   Four markers, as an audit you can run on your own draft. Nothing is stored.
   --------------------------------------------------------------------- */

export function MarkerAudit({ markers }: { markers: { n: string; title: string; body: string }[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  return (
    <div className={s.audit}>
      <ul>
        {markers.map((m) => (
          <li key={m.n} data-on={checked.has(m.n) || undefined}>
            <label>
              <input
                type="checkbox"
                checked={checked.has(m.n)}
                onChange={() => setChecked((prev) => { const n = new Set(prev); if (n.has(m.n)) n.delete(m.n); else n.add(m.n); return n; })}
              />
              <span className={s.auditBox} aria-hidden="true" />
              <span className={s.auditText}>
                <span className={s.auditNum}>{m.n}</span>
                <b>{m.title}</b>
                <Rich as="small" html={m.body} />
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className={s.auditRead} aria-live="polite">
        {checked.size === markers.length ? "All four present in your draft — now ask whether a reader would agree." : `${checked.size} of ${markers.length} checked against your draft. This page keeps nothing.`}
      </p>
    </div>
  );
}
