"use client";

import Image from "next/image";
import { useState } from "react";
import { affectiveEventsTheory as rec } from "../../../content/affective-events-theory";
import AETIllustratedMacrostructure, { AETRelationshipLedger } from "./AETIllustratedMacrostructure";

const moments = rec.workday?.events ?? [];
const reactions = rec.reactionContrast?.perspectives ?? [];
const routes = {
  affect: { label: "affect-driven", note: "near · quick · situated", copy: "Current affective experience can colour attention, regulation, and response before a global judgement is required." },
  both: { label: "read both currents", note: "parallel currents", copy: "A thoughtful decision can be affectively coloured, and an immediate response can still involve cognition." },
  judgement: { label: "judgement-driven", note: "slower · settled · evaluative", copy: "Work features and beliefs can contribute to an overall evaluation before more deliberate behaviour." },
} as const;
type Route = keyof typeof routes;

function LiveLabel({ children }: { children: React.ReactNode }) { return <p className="aev-live-label">{children}</p>; }

export default function AETVisualRebuildInteractive() {
  const [moment, setMoment] = useState(0);
  const [reaction, setReaction] = useState(0);
  const [route, setRoute] = useState<Route>("both");
  const [time, setTime] = useState(0);
  const [mapMode, setMapMode] = useState<"map" | "beneath">("map");
  const currentMoment = moments[moment];
  const currentReaction = reactions[reaction];

  return <div className="aev-interactions">
    <section className="aev-event" id="aev-event" aria-labelledby="aev-event-title">
      <div className="aev-event-copy"><LiveLabel>03 / THE EVENT IS A TURN</LiveLabel><h2 id="aev-event-title">The event arrives.<br /><em>The field remembers.</em></h2><p>Focus changes what you notice; the working world remains one field.</p><p className="aev-hand">condition · interruption · residue</p></div>
      <div className="aev-event-field aev-fragment-field">
        <div className="aev-event-fragments" aria-hidden="true"><span className="aev-fragment fragment-message" /><span className="aev-fragment fragment-hand" /><span className="aev-fragment fragment-chair" /></div>
        <svg viewBox="0 0 1000 420" aria-hidden="true"><path d="M34 309C174 246 275 331 391 266S630 260 958 179" className="aev-field-trace" /><path d={`M${160 + moment * 200} 116C${310 + moment * 110} 188 ${490 + moment * 80} ${100 + moment * 16} 900 ${260 - moment * 21}`} className={`aev-active-trace tone-${currentMoment?.tone ?? "steady"}`} /><circle cx={160 + moment * 200} cy="116" r="15" className={`aev-event-dot tone-${currentMoment?.tone ?? "steady"}`} /></svg>
        <span className="aev-event-fragment-note">a message lands · the room stays</span>
        <div className="aev-event-controls" role="group" aria-label="Move through the constructed workday">{moments.map((item, i) => <button key={item.time} className={`${i === moment ? "is-selected" : ""} tone-${item.tone}`} aria-pressed={i === moment} onClick={() => setMoment(i)}><span>{item.time}</span><b>{item.label}</b></button>)}</div>
        <div className="aev-event-reading" aria-live="polite"><b>{currentMoment?.time} · {currentMoment?.label}</b><p>{currentMoment?.detail}</p></div>
      </div>
    </section>

    <section className="aev-reaction" id="aev-reaction" aria-labelledby="aev-reaction-title">
      <div className="aev-reaction-copy"><LiveLabel>04 / ONE EVENT, DIFFERENT REACTION</LiveLabel><h2 id="aev-reaction-title">The same event<br /><em>does not contain one emotion.</em></h2><p>{rec.reactionContrast?.boundary}</p><p className="aev-hand">event ≠ interpretation ≠ reaction</p></div>
      <div className="aev-reaction-field"><Image src="/aet-visual-rebuild-assets/aet-event-reaction.png" alt="A shared workplace event branching into two different hand-drawn reaction paths." width={2048} height={950} unoptimized /><span className="aev-shared-event">same delayed feedback</span><div className="aev-reaction-options" role="group" aria-label="Compare two possible readings of the same event">{reactions.map((item, i) => <button key={item.label} className={`reaction-${i} ${i === reaction ? "is-selected" : ""}`} aria-pressed={i === reaction} onClick={() => setReaction(i)}><span>{item.label}</span><b>{item.reading}</b><small>{item.reaction}</small></button>)}</div><p className="aev-reaction-reading" aria-live="polite"><b>{currentReaction?.label}:</b> {currentReaction?.reaction}</p><p className="aev-reaction-boundary">Different quality of response ≠ different measured amount.</p></div>
    </section>

    <section className="aev-clocks" id="aev-clocks" aria-labelledby="aev-clocks-title">
      <div className="aev-clocks-copy"><LiveLabel>05 / ONE FEELING, TWO CLOCKS</LiveLabel><h2 id="aev-clocks-title">Affect-driven<br /><em>and judgement-driven.</em></h2><p>{rec.pathwaysLede}</p><p className="aev-hand">parallel currents · never a single scale</p></div>
      <div className="aev-clocks-field"><Image src="/aet-visual-rebuild-assets/aet-two-clocks.png" alt="An abstract coloured-pencil field with a fast coral route and a slower teal route around a shared centre." width={2048} height={1024} unoptimized /><div className={`aev-route-controls route-focus-${route}`} role="group" aria-label="Read the two behavioural routes"><button className={`route-label-affect ${route === "affect" ? "is-selected" : ""}`} aria-pressed={route === "affect"} onClick={() => setRoute("affect")}><span>affect-driven</span><small>near · quick · situated</small></button><button className={`route-label-both ${route === "both" ? "is-selected" : ""}`} aria-pressed={route === "both"} onClick={() => setRoute("both")}><span>both currents</span><small>same person · same day</small></button><button className={`route-label-judgement ${route === "judgement" ? "is-selected" : ""}`} aria-pressed={route === "judgement"} onClick={() => setRoute("judgement")}><span>judgement-driven</span><small>slower · settled · evaluative</small></button></div><svg viewBox="0 0 900 300" aria-hidden="true" className={`aev-clock-overlay route-${route}`}><path d="M54 166C200 84 300 172 428 115S690 120 844 54" className="clock-affect" /><path d="M55 213C190 238 321 229 438 206S690 252 845 232" className="clock-judgement" /><circle cx="54" cy="166" r="12" /><circle cx="55" cy="213" r="12" /></svg><div className="aev-clock-reading" aria-live="polite"><b>{routes[route].note}</b><p>{routes[route].copy}</p></div></div>
    </section>

    <section className="aev-workday" id="aev-workday" aria-labelledby="aev-workday-title">
      <div className="aev-workday-copy"><LiveLabel>06 / WITHIN-PERSON TIME</LiveLabel><h2 id="aev-workday-title">The workday<br /><em>remembers.</em></h2><p>{rec.workday?.takeaway}</p><p className="aev-hand">some marks fade · some stay</p></div>
      <div className="aev-workday-field"><Image src="/aet-visual-rebuild-assets/aet-workday-strip.png" alt="A temporal strip of workplace fragments from coffee and messages to meetings, papers, and a late working desk." width={2164} height={727} unoptimized /><div className="aev-workday-controls" role="group" aria-label="Move through one constructed workday">{moments.map((item, i) => <button key={item.time} className={`${i === time ? "is-selected" : ""} tone-${item.tone}`} aria-pressed={i === time} onClick={() => setTime(i)}><span>{item.time}</span><b>{item.label}</b></button>)}</div><div className="aev-time-reading" aria-live="polite"><b>{moments[time]?.time} · {moments[time]?.label}</b><p>{moments[time]?.detail}</p></div><p className="aev-caption"><b>▲ Teaching construction.</b> The residue is a visual prompt for within-person history, not a mood score.</p></div>
    </section>

    <section className="aev-map-interactive" aria-labelledby="aev-map-interactive-title">
      <div className="aev-map-interactive-copy"><LiveLabel>07 / WHAT LIES BENEATH</LiveLabel><h2 id="aev-map-interactive-title">Read the map.<br /><em>Then read under it.</em></h2><p>AET gives an organising macrostructure. Later process work can elaborate what happens between its arrows.</p></div>
      <div className={`aev-map-interactive-stage mode-${mapMode}`}><div className="aev-map-toggle" role="group" aria-label="Inspect the illustrated map and what lies beneath"><button className={mapMode === "map" ? "is-selected" : ""} aria-pressed={mapMode === "map"} onClick={() => setMapMode("map")}>read the map</button><button className={mapMode === "beneath" ? "is-selected" : ""} aria-pressed={mapMode === "beneath"} onClick={() => setMapMode("beneath")}>read under it</button></div><AETIllustratedMacrostructure mode={mapMode} className="aev-interactive-macro-map" /><AETRelationshipLedger /></div>
    </section>
  </div>;
}
