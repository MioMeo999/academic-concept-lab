"use client";

import Image from "next/image";
import { useState } from "react";
import { affectiveEventsTheory as rec } from "../../../content/affective-events-theory";

type EventTone = "steady" | "sharp" | "warm" | "heavy";

const moments: Array<{ time: string; label: string; detail: string; tone: EventTone }> = [
  { time: "09:05", label: "routine begins", detail: "The work environment is recognisable. Nothing has to be dramatic for the day to be affectively quiet.", tone: "steady" },
  { time: "10:43", label: "unexpected criticism", detail: "An occurrence interrupts the current episode. Its emotional meaning is not contained in the event alone.", tone: "sharp" },
  { time: "12:15", label: "supportive exchange", detail: "A conversation changes what is being experienced. It may help recovery, attention, or engagement.", tone: "warm" },
  { time: "15:20", label: "deadline changes", detail: "A new demand arrives inside the same job. The field remembers earlier marks while a new one enters.", tone: "heavy" },
];

const reactions = [
  { name: "Person A", reading: "useful guidance, late", body: "Concern may become constructive engagement. The person’s history and goals make this reading possible.", colour: "teal" },
  { name: "Person B", reading: "threat to competence", body: "Anger or anxiety may pull attention toward status and perceived threat. The same event has a different felt turn.", colour: "coral" },
];

const routeNotes = {
  both: { title: "both can be true", copy: "Current affect and an overall evaluation can colour one another. Real behaviour is rarely a clean choice between two boxes." },
  affect: { title: "near · quick · situated", copy: "An affect-driven route stays close to the current episode: attention, regulation, and response move before a global judgement is required." },
  judgement: { title: "slower · settled · evaluative", copy: "A judgement-driven route travels through work features, beliefs, and job satisfaction toward more deliberate behaviour." },
};

function Dot({ colour = "cobalt" }: { colour?: string }) {
  return <span className={`aetr-dot aetr-dot-${colour}`} aria-hidden="true" />;
}

function EventField({ index, residue }: { index: number; residue: number[] }) {
  const colours = ["cobalt", "coral", "teal", "ochre"];
  const current = colours[index];
  return (
    <figure className="aetr-event-field">
      <div className="aetr-field-image">
        <Image src="/aet-rebuild-assets/aet-workday-field.png" alt="A lightly drawn workplace with a person working at a desk." width={2048} height={1152} unoptimized />
        <svg viewBox="0 0 900 420" role="img" aria-label="A stable workplace field with an event arriving and leaving a visible trace">
          <path className="aetr-field-structure" d="M35 330C155 280 246 330 346 292s166-44 256-6 168 48 260-22" />
          <path className="aetr-field-structure faint" d="M50 112C154 154 248 125 336 156s170 8 252-30 166 13 253 6" />
          {residue.map((r) => <circle key={r} className="aetr-residue-dot" cx={120 + r * 210} cy={295 - r * 18} r={9 + r * 2} />)}
          <circle className={`aetr-event-puncture aetr-puncture-${current}`} cx={150 + index * 210} cy={205 - index * 17} r="14" />
          <circle className={`aetr-event-ring aetr-ring-${current}`} cx={150 + index * 210} cy={205 - index * 17} r="38" />
          <path className={`aetr-event-trace aetr-trace-${current}`} d={`M${150 + index * 210} 205 C${275 + index * 80} ${150 + index * 2} ${420 + index * 50} 300 ${760 - index * 32} 188`} />
        </svg>
        <span className="aetr-field-note aetr-field-note-left">the job stays</span>
        <span className="aetr-field-note aetr-field-note-event">{moments[index].label}</span>
        <span className="aetr-field-note aetr-field-note-right">the moment turns</span>
      </div>
      <figcaption><b>Teaching field.</b> The environment remains broadly recognisable; the event is proximal, and the affective meaning remains open.</figcaption>
    </figure>
  );
}

function RouteField({ route }: { route: keyof typeof routeNotes }) {
  return (
    <div className={`aetr-route-field route-${route}`} aria-label="Two possible behavioural routes">
      <svg viewBox="0 0 900 250" role="img" aria-label="Affect-driven and judgement-driven routes run in parallel">
        <path className="aetr-route-line route-line-affect" d="M30 93 C220 44 282 91 420 88 S695 60 868 42" />
        <path className="aetr-route-line route-line-judgement" d="M30 169 C190 145 300 202 438 165 S690 163 868 204" />
        <circle className="aetr-route-node route-node-coral" cx="30" cy="93" r="9" /><circle className="aetr-route-node route-node-teal" cx="30" cy="169" r="9" />
        <circle className="aetr-route-node route-node-coral" cx="868" cy="42" r="9" /><circle className="aetr-route-node route-node-teal" cx="868" cy="204" r="9" />
        <text x="48" y="78">current affect</text><text x="48" y="194">work attitude</text><text x="700" y="30">affect-driven</text><text x="670" y="232">judgement-driven</text>
      </svg>
      <div className="aetr-route-label route-label-top">near · quick · situated</div>
      <div className="aetr-route-label route-label-bottom">slower · settled · evaluative</div>
      <p className="aetr-route-middle">same person · same day · two clocks</p>
    </div>
  );
}

export function AETMapSection() {
  const [mapMode, setMapMode] = useState<"map" | "beneath">("map");
  return (
    <section className="aetr-map-block" id="aetr-map-field" aria-labelledby="aetr-map-title">
      <div className="aetr-map-heading"><p className="aetr-live-label">08 / THE MAP · WHAT LIES BENEATH</p><h2 id="aetr-map-title">A macrostructure,<br /><em>not every mechanism.</em></h2><p>AET gives a map of relationships. It does not quietly supply every appraisal, attention, regulation, motivational, contextual, or event-taxonomy mechanism under its arrows.</p></div>
      <div className="aetr-map-stage"><div className="aetr-map-controls" role="group" aria-label="Switch between the macrostructure and what lies beneath"><button className={mapMode === "map" ? "is-selected" : ""} aria-pressed={mapMode === "map"} onClick={() => setMapMode("map")}>the map</button><button className={mapMode === "beneath" ? "is-selected" : ""} aria-pressed={mapMode === "beneath"} onClick={() => setMapMode("beneath")}>what lies beneath</button></div>{mapMode === "map" ? <div className="aetr-map-visual" role="img" aria-label="Work environment features lead to work events and affective reactions; affective reactions connect to attitudes and affect-driven behaviour; work attitudes connect to judgement-driven behaviour"><div className="map-node node-features">work-environment<br />features</div><div className="map-node node-events">work<br />events</div><div className="map-node node-affect">affective<br />reactions</div><div className="map-node node-attitude">work<br />attitudes</div><div className="map-node node-affect-behaviour">affect-driven<br />behaviour</div><div className="map-node node-judgement">judgement-driven<br />behaviour</div><svg viewBox="0 0 820 340" aria-hidden="true"><path d="M154 87L290 87M357 88L452 88M520 88L637 88M495 112L414 223M479 223L370 112M610 120L679 216M211 111L300 220" /><path d="M150 286C320 334 524 322 697 277" className="map-context" /></svg><span className="map-note map-note-time">time / cycles</span><span className="map-note map-note-disposition">dispositions enter the field</span></div> : <div className="aetr-beneath-field"><p className="aetr-beneath-claim">What happens between the arrows?</p><ul><li>appraisal may shape what is noticed and what it means;</li><li>attention and regulation can alter an episode;</li><li>motivation and context can change the route;</li><li>event histories may accumulate into broader attitudes.</li></ul><p className="aetr-caption"><b>■ Faithful explanation.</b> Weiss &amp; Beal (2005) and Ashton-James &amp; Ashkanasy (2005) help distinguish AET’s organising role from a complete process account.</p></div>}</div>
    </section>
  );
}

export default function AETRebuildInteractive() {
  const [eventIndex, setEventIndex] = useState(0);
  const [eventResidue, setEventResidue] = useState<number[]>([]);
  const [reaction, setReaction] = useState(0);
  const [route, setRoute] = useState<keyof typeof routeNotes>("both");
  const [timeIndex, setTimeIndex] = useState(0);
  const markEvent = (next: number) => {
    if (next !== eventIndex) setEventResidue((items) => [...items, eventIndex].slice(-3));
    setEventIndex(next);
  };

  return (
    <div className="aetr-interactions">
      <section className="aetr-live-block" id="aetr-event-field" aria-labelledby="aetr-event-field-title">
        <div className="aetr-live-intro"><p className="aetr-live-label">03 / AN EVENT IS A TURN</p><h2 id="aetr-event-field-title">The event arrives.<br /><em>The field remembers.</em></h2><p>Several kinds of workday event can interrupt the current episode. Their affective meaning remains open to interpretation.</p><p className="aetr-pencil">Focus changes what you notice; the working world remains one field.</p></div>
        <div className="aetr-live-stage">
          <div className="aetr-note-row" role="group" aria-label="Move through the constructed workday">
            {moments.map((moment, index) => <button key={moment.time} className={`aetr-note-button tone-${moment.tone} ${index === eventIndex ? "is-selected" : ""}`} aria-pressed={index === eventIndex} onClick={() => markEvent(index)}><span>{moment.time}</span><strong>{moment.label}</strong></button>)}
          </div>
          <EventField index={eventIndex} residue={eventResidue} />
          <div className="aetr-live-reading" aria-live="polite"><Dot colour={eventIndex === 1 || eventIndex === 3 ? "coral" : eventIndex === 2 ? "teal" : "cobalt"} /><div><span className="aetr-reading-kicker">{moments[eventIndex].time} · {moments[eventIndex].label}</span><p>{moments[eventIndex].detail}</p></div></div>
        </div>
      </section>

      <section className="aetr-live-block aetr-reaction-block" id="aetr-reaction-field" aria-labelledby="aetr-reaction-title">
        <div className="aetr-live-intro"><p className="aetr-live-label">04 / ONE EVENT, MORE THAN ONE READING</p><h2 id="aetr-reaction-title">The same event<br /><em>does not contain one emotion.</em></h2><p>{rec.reactionContrast?.boundary}</p><p className="aetr-pencil">event ≠ interpretation ≠ reaction</p></div>
        <div className="aetr-reaction-stage">
          <div className="aetr-stable-event"><Dot colour="coral" /><span>{rec.reactionContrast?.event}</span></div>
          <div className="aetr-reaction-paths" aria-hidden="true"><svg viewBox="0 0 900 180"><path d="M56 90 C230 86 260 30 438 48 S640 70 840 31" className="reaction-path reaction-path-coral" /><path d="M56 90 C230 94 270 150 438 127 S650 113 840 155" className="reaction-path reaction-path-teal" /><circle cx="56" cy="90" r="10" className="reaction-origin" /></svg></div>
          <div className="aetr-reaction-choices" role="group" aria-label="Compare two possible readings of the same event">{reactions.map((item, index) => <button key={item.name} className={`aetr-reading-note note-${item.colour} ${reaction === index ? "is-selected" : ""}`} aria-pressed={reaction === index} onClick={() => setReaction(index)}><span>{item.name}</span><strong>{item.reading}</strong><small>{item.body}</small></button>)}</div>
          <p className="aetr-reaction-takeaway" aria-live="polite">{reactions[reaction].name}: {reactions[reaction].body}</p>
        </div>
      </section>

      <section className="aetr-live-block aetr-route-block" id="aetr-route-field" aria-labelledby="aetr-route-title">
        <div className="aetr-live-intro"><p className="aetr-live-label">05 / ONE FEELING, TWO CLOCKS</p><h2 id="aetr-route-title">Affect-driven<br /><em>and judgement-driven.</em></h2><p>{rec.pathwaysLede}</p><p className="aetr-pencil">parallel currents · never a single scale</p></div>
        <div className="aetr-route-stage"><div className="aetr-route-controls" role="group" aria-label="Inspect behavioural routes">{(["both", "affect", "judgement"] as const).map((key) => <button key={key} className={`aetr-route-button route-button-${key} ${route === key ? "is-selected" : ""}`} aria-pressed={route === key} onClick={() => setRoute(key)}>{key === "both" ? "both clocks" : key === "affect" ? "affect-driven" : "judgement-driven"}</button>)}</div><RouteField route={route} /><div className="aetr-route-reading" aria-live="polite"><span>{routeNotes[route].title}</span><p>{routeNotes[route].copy}</p></div><p className="aetr-caution"><b>Boundary.</b> {rec.pathwaysCaution}</p></div>
      </section>

      <section className="aetr-live-block aetr-time-block" id="aetr-time-field" aria-labelledby="aetr-time-title">
        <div className="aetr-live-intro"><p className="aetr-live-label">06 / WITHIN-PERSON TIME</p><h2 id="aetr-time-title">By 4:32,<br /><em>the page remembers.</em></h2><p>{rec.workday?.takeaway}</p><p className="aetr-pencil">time leaves marks · some fade · some stay</p></div>
        <div className="aetr-time-stage"><div className="aetr-day-strip" aria-hidden="true"><span className="aetr-day-baseline" /><span className="aetr-day-residue residue-one" /><span className="aetr-day-residue residue-two" /><span className="aetr-day-now" style={{ left: `${12 + timeIndex * 25}%` }} /></div><div className="aetr-time-controls" role="group" aria-label="Move through one constructed workday">{moments.map((moment, index) => <button key={moment.time} className={`aetr-time-button tone-${moment.tone} ${timeIndex === index ? "is-selected" : ""}`} aria-pressed={timeIndex === index} onClick={() => setTimeIndex(index)}><span>{moment.time}</span><strong>{moment.label}</strong></button>)}</div><div className="aetr-time-reading" aria-live="polite"><span>{moments[timeIndex].time} · {moments[timeIndex].label}</span><p>{moments[timeIndex].detail}</p></div><p className="aetr-caption"><b>▲ Teaching construction.</b> The residue is a visual prompt for within-person history, not a mood score or measured persistence.</p></div>
      </section>

    </div>
  );
}
