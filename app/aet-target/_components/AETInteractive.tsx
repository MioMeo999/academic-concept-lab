"use client";

import { useState } from "react";
import Image from "next/image";
import { affectiveEventsTheory as rec } from "../../../content/affective-events-theory";

type Mode = "event" | "reaction" | "routes" | "time";
type Tone = "teal" | "ochre" | "cobalt" | "coral" | "violet";

const eventMoments: Array<{ id: string; label: string; detail: string; tone: Tone; note: string }> = [
  { id: "praise", label: "unexpected praise", detail: "A manager praises a presentation in front of the team.", tone: "teal", note: "a discrete occurrence inside the same work setting" },
  { id: "interruption", label: "interruption", detail: "A colleague arrives with an urgent request while the work is underway.", tone: "ochre", note: "the plan changes inside the stable job" },
  { id: "assistance", label: "help from a colleague", detail: "Someone notices the difficulty and offers useful assistance.", tone: "cobalt", note: "the same setting can carry a different affective turn" },
  { id: "criticism", label: "unexpected criticism", detail: "A critical comment arrives later than expected.", tone: "coral", note: "the event may matter through its interpretation" },
  { id: "deadline", label: "deadline changes", detail: "A deadline moves suddenly while the task is still open.", tone: "violet", note: "one event does not prescribe one reaction" },
];

const tracePoints = [[145, 210], [302, 156], [458, 238], [600, 170], [730, 286]] as const;

function WorkdayField({ eventIndex = 0, reaction = 0, route = "both", residues = [], timeIndex }: { eventIndex?: number; reaction?: number; route?: "both" | "affect" | "judgement"; residues?: number[]; timeIndex?: number }) {
  const [x, y] = tracePoints[eventIndex] ?? tracePoints[0];
  const currentTone = eventMoments[eventIndex]?.tone ?? "teal";
  return (
    <div className={`aet-art-field tone-${currentTone} route-${route}`}>
      <Image src="/aet-target-assets/aet-workday-field.png" alt="" aria-hidden="true" width={2048} height={1152} unoptimized sizes="(max-width: 600px) 100vw, 70vw" />
      <svg className="aet-live-traces" viewBox="0 0 820 470" aria-hidden="true">
        <path className="aet-trace aet-trace-context" d="M22 370C146 344 245 382 348 340s184-30 270 10 126 18 181-17" />
        <path className="aet-trace aet-trace-quiet" d="M72 112C182 140 236 204 328 183s104-18 177 12 158 12 246-35" />
        {residues.map((index, residueIndex) => { const [rx, ry] = tracePoints[index] ?? tracePoints[0]; return <circle key={`${index}-${residueIndex}`} className="aet-residue" cx={rx} cy={ry} r={18 + residueIndex * 4} style={{ opacity: Math.max(.16, .42 - residueIndex * .06) }} />; })}
        <circle className="aet-event-halo" cx={x} cy={y} r="27" />
        <circle className={`aet-event-mark mark-${currentTone}`} cx={x} cy={y} r="9" />
        <path className={`aet-reaction-path ${reaction === 1 ? "is-first" : reaction === 2 ? "is-second" : ""}`} d={reaction === 1 ? `M${x} ${y} C${x + 74} ${y - 92} 640 104 778 116` : `M${x} ${y} C${x + 56} ${y + 88} 640 342 778 352`} />
        <path className={`aet-route-path route-affect-path ${route === "affect" ? "is-focus" : route === "judgement" ? "is-residual" : ""}`} d="M92 300 C220 256 278 244 377 224 S568 158 770 122" />
        <path className={`aet-route-path route-judgement-path ${route === "judgement" ? "is-focus" : route === "affect" ? "is-residual" : ""}`} d="M82 144 C188 164 256 185 344 246 S535 312 760 368" />
        {typeof timeIndex === "number" && <line className="aet-now-line" x1={90 + timeIndex * 205} x2={90 + timeIndex * 205} y1="48" y2="418" />}
      </svg>
      <span className="aet-field-word field-word-one">same setting</span>
      <span className="aet-field-word field-word-two">something changed</span>
      {reaction > 0 && <span className="aet-field-word field-word-three">two possible responses</span>}
      {typeof timeIndex === "number" && <span className="aet-field-word field-word-four">time leaves a trace</span>}
    </div>
  );
}

function EventNotes({ eventIndex, onChange }: { eventIndex: number; onChange: (index: number) => void }) {
  return (
    <div className="aet-event-notes" role="group" aria-label="Choose a work event">
      {eventMoments.map((item, index) => <button className={`aet-event-note note-${item.tone} ${eventIndex === index ? "is-current" : ""}`} key={item.id} type="button" aria-pressed={eventIndex === index} onClick={() => onChange(index)}><span className="aet-note-pin" aria-hidden="true" /><span>{item.label}</span></button>)}
    </div>
  );
}

export default function AETInteractive({ mode }: { mode: Mode }) {
  const [eventIndex, setEventIndex] = useState(0);
  const [eventResidues, setEventResidues] = useState<number[]>([]);
  const [reaction, setReaction] = useState(0);
  const [reactionResidue, setReactionResidue] = useState(0);
  const [route, setRoute] = useState<"both" | "affect" | "judgement">("both");
  const [timeIndex, setTimeIndex] = useState(0);
  const [timeResidues, setTimeResidues] = useState<number[]>([]);
  const timeEvents = rec.workday?.events ?? [];
  const event = eventMoments[eventIndex];
  const timeEvent = timeEvents[timeIndex];

  if (mode === "event") return <div className="aet-interactive-panel"><div className="aet-control-heading"><span>event fragments in one workday</span><b>▲ constructed teaching field</b></div><p className="aet-interaction-claim"><strong>THE JOB STAYED.</strong> The event changed.</p><EventNotes eventIndex={eventIndex} onChange={(index) => { if (index !== eventIndex) setEventResidues((previous) => [...previous, eventIndex].slice(-3)); setEventIndex(index); }} /><figure className="aet-interactive-figure"><WorkdayField eventIndex={eventIndex} residues={eventResidues} /><figcaption><b>Keep the job · change the event.</b> The broad environment remains recognisable while a proximal moment enters, changes the affective field, and leaves a light residue of what came before.</figcaption></figure><div className="aet-field-reading"><span className="aet-reading-label">current moment</span><h3>{event.label}</h3><p>{event.detail}</p><p className="aet-hand-note">{event.note}</p></div></div>;

  if (mode === "reaction") {
    const perspective = rec.reactionContrast?.perspectives[reaction - 1];
    return <div className="aet-interactive-panel"><div className="aet-control-heading"><span>one event · two possible readings</span><b>▲ constructed teaching example</b></div><p className="aet-stable-event"><span className="aet-stable-pin" aria-hidden="true" />{rec.reactionContrast?.event}</p><div className="aet-response-notes" role="group" aria-label="Choose a possible reaction">{rec.reactionContrast?.perspectives.map((person, index) => <button className={`aet-response-note response-${index + 1} ${reaction === index + 1 ? "is-current" : ""}`} key={person.label} type="button" aria-pressed={reaction === index + 1} onClick={() => { if (reaction && reaction !== index + 1) setReactionResidue(reaction); setReaction(index + 1); }}><span>{person.label}</span><small>{person.reading}</small></button>)}</div><figure className="aet-interactive-figure reaction-figure"><WorkdayField eventIndex={3} reaction={reaction} residues={reactionResidue ? [3] : []} /><figcaption><b>The event stayed the same.</b> {perspective ? perspective.reaction : "Two readings can emerge from one occurrence; this teaching field does not predict a fixed response."}</figcaption></figure><p className="aet-hand-note reaction-note">same event · different pencil response</p></div>;
  }

  if (mode === "routes") return <div className="aet-interactive-panel"><div className="aet-control-heading"><span>one feeling · two routes</span><b>■ relative routes, not a scale</b></div><div className="aet-route-notes" role="group" aria-label="Focus a behavioural route">{([["both", "Both routes", "the field remains open"], ["affect", "Affect-driven", "quick · proximal · immediate"], ["judgement", "Judgement-driven", "slower · evaluative · settled"]] as const).map(([id, label, note]) => <button key={id} type="button" className={`aet-route-note route-note-${id} ${route === id ? "is-current" : ""}`} aria-pressed={route === id} onClick={() => setRoute(id)}><span>{label}</span><small>{note}</small></button>)}</div><figure className="aet-interactive-figure routes-figure"><WorkdayField route={route} /><figcaption><b>Routes have different temporal manners.</b> Affect can move quickly from a current feeling toward behaviour; judgement settles through work attitude. The work environment remains visible as a separate influence.</figcaption></figure><div className="aet-route-map"><article className={route === "affect" || route === "both" ? "is-focus" : "is-residual"}><span className="route-label route-coral">FAST / PROXIMAL</span><h3>Affect-driven behaviour</h3><p>{rec.pathways?.[0]?.blurb}</p><ol>{rec.pathways?.[0]?.steps.map((step) => <li key={step}>{step}</li>)}</ol></article><article className={route === "judgement" || route === "both" ? "is-focus" : "is-residual"}><span className="route-label route-graphite">SLOWER / EVALUATIVE</span><h3>Judgement-driven behaviour</h3><p>{rec.pathways?.[1]?.blurb}</p><ol>{rec.pathways?.[1]?.steps.map((step) => <li key={step}>{step}</li>)}</ol></article></div><p className="aet-interaction-caption">The work environment can also influence work attitudes directly. The two routes coexist; they are not opposite ends of one scale.</p></div>;

  return <div className="aet-interactive-panel aet-time-panel"><div className="aet-control-heading"><span>move through one constructed workday</span><b>▲ schematic, not a measurement</b></div><p className="aet-interaction-claim"><strong>TIME LEAVES MARKS.</strong> Some moments fade. Some remain.</p><div className="aet-time-notes" role="group" aria-label="Moments in one workday">{timeEvents.map((item, index) => <button key={item.time} type="button" className={`aet-time-note tone-${item.tone} ${timeIndex === index ? "is-current" : ""}`} aria-pressed={timeIndex === index} onClick={() => { if (index !== timeIndex) setTimeResidues((previous) => [...previous, timeIndex].slice(-3)); setTimeIndex(index); }}><span>{item.time}</span><small>{item.label}</small></button>)}</div><figure className="aet-interactive-figure time-figure"><WorkdayField eventIndex={Math.min(timeIndex + 1, eventMoments.length - 1)} timeIndex={timeIndex} residues={timeResidues.map((index) => Math.min(index + 1, eventMoments.length - 1))} /><figcaption><b>{timeEvent?.time} · {timeEvent?.label}</b> {timeEvent?.detail}</figcaption></figure><p className="aet-interaction-caption">{rec.workday?.caption}</p></div>;
}
