import type { Metadata } from "next";
import Image from "next/image";
import { affectiveEventsTheory as rec } from "../../content/affective-events-theory";
import AETInteractive from "./_components/AETInteractive";

export const metadata: Metadata = {
  title: "Affective Events Theory · visual study",
  description: rec.oneSentence,
  robots: { index: false, follow: false },
};

function Rich({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function SectionKicker({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="aet-kicker"><span>{number}</span><span>{children}</span></p>;
}

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return <h2 id={id} className="aet-section-title">{children}</h2>;
}

export default function AETTargetPage() {
  return (
    <div className="aet-page">
      <div className="aet-breadcrumb"><a href="/concept-lab">Theories</a><span>/</span><a href="/concept-lab/library">Organisational Behaviour</a><span>/</span><b>Affective Events Theory</b></div>

      <section className="aet-opening" aria-labelledby="aet-title">
        <div className="aet-opening-copy">
          <SectionKicker number="01">TEMPORAL THEORY / ORGANISATIONAL BEHAVIOUR</SectionKicker>
          <h1 id="aet-title">The day changes<br /><em>in moments.</em></h1>
          <p className="aet-opening-thesis">The job is the backdrop.<br /><em>The event is the turn.</em></p>
          <p className="aet-opening-lede">{rec.oneSentence}</p>
          <p className="aet-opening-hook">{rec.hook}</p>
          <div className="aet-opening-facts" role="group" aria-label="Record facts">
            <div><strong>1996</strong><span>foundational<br />framework</span></div>
            <div><strong>1</strong><span>workday<br />many moments</span></div>
            <div><strong>2</strong><span>routes to<br />behaviour</span></div>
          </div>
          <a className="aet-enter" href="#aet-event"><span aria-hidden="true">↗</span>Enter the workday</a>
          <p className="aet-hand-note">same job · different moment</p>
        </div>
        <figure className="aet-opening-field">
          <div className="aet-opening-art">
            <Image src="/aet-target-assets/aet-workday-field.png" alt="A lightly constructed workplace with one worker at a desk and an open field for events to enter." width={2048} height={1152} priority unoptimized sizes="(max-width: 900px) 100vw, 56vw" />
            <svg className="aet-opening-overlay" viewBox="0 0 820 470" aria-hidden="true">
              <path className="aet-opening-trace trace-cobalt" d="M30 362C156 338 252 376 356 332s164-24 250 13 126 20 180-14" />
              <path className="aet-opening-trace trace-ochre" d="M68 112C177 141 235 193 327 178s110-12 182 18 155 12 237-31" />
              <circle className="aet-opening-puncture puncture-coral" cx="432" cy="220" r="11" />
              <circle className="aet-opening-puncture puncture-coral-fade" cx="432" cy="220" r="27" />
              <circle className="aet-opening-puncture puncture-teal" cx="610" cy="174" r="8" />
              <circle className="aet-opening-puncture puncture-ochre" cx="274" cy="313" r="8" />
            </svg>
            <span className="aet-opening-note note-setting">the workday stays<br />recognisable</span>
            <span className="aet-opening-note note-event">an event lands</span>
            <span className="aet-opening-note note-trace">time leaves a trace</span>
          </div>
          <div className="aet-field-caption"><span>09:05 · routine</span><span>10:43 · interruption</span><span>12:15 · exchange</span><span>15:20 · return</span></div>
          <figcaption className="aet-caption"><b>Figure 01.</b> A teaching field, not a mood scale. The workplace stays broadly recognisable while affective experience changes around events.</figcaption>
        </figure>
      </section>

      <nav className="aet-contents" aria-label="On this page">
        <span>read the record</span>
        {[["aet-event", "Job / event"], ["aet-reaction", "Different reactions"], ["aet-routes", "Two routes"], ["aet-time", "In time"], ["aet-distinction", "Affect / attitude"], ["aet-changed", "What changed"], ["aet-scholarship", "After 1996"], ["aet-open", "Still open"]].map(([id, label], index) => <a href={`#${id}`} key={id}><small>{String(index + 2).padStart(2, "0")}</small>{label}</a>)}
      </nav>

      <section className="aet-section aet-event-section" id="aet-event" aria-labelledby="aet-event-title">
        <div className="aet-section-intro"><SectionKicker number="02">THE JOB IS NOT THE EVENT</SectionKicker><SectionTitle id="aet-event-title">Keep the job.<br /><em>Change the event.</em></SectionTitle><p>Work-environment features are relatively enduring. Work events are occurrences or changes that become affectively significant within that setting.</p><p className="aet-hand-note">same room · another turn</p></div>
        <AETInteractive mode="event" />
        <div className="aet-classification" aria-label="Canonical feature and event examples">
          <p className="aet-subhead">CLASSIFY THE THING BEING DESCRIBED</p>
          {(rec.classification?.items ?? []).map((item) => <div key={item.scenario}><span className={item.answer === "event" ? "is-event" : "is-feature"}>{item.answer}</span><p><b>{item.scenario}</b><small>{item.explanation}</small></p></div>)}
        </div>
      </section>

      <section className="aet-section aet-reaction-section" id="aet-reaction" aria-labelledby="aet-reaction-title">
        <div className="aet-section-intro"><SectionKicker number="03">DISPOSITIONS / INTERPRETATION</SectionKicker><SectionTitle id="aet-reaction-title">Keep the event.<br /><em>Change the reaction.</em></SectionTitle><p>{rec.reactionContrast?.boundary}</p><p className="aet-hand-note">the event does not contain<br />the emotion</p></div>
        <AETInteractive mode="reaction" />
        <div className="aet-disposition-notes" aria-label="How dispositions enter the model">{(rec.interactions ?? []).map((item) => <article key={item.title}><span>{item.kicker}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      </section>

      <section className="aet-section aet-routes-section" id="aet-routes" aria-labelledby="aet-routes-title">
        <div className="aet-section-intro"><SectionKicker number="04">AFFECT → BEHAVIOUR</SectionKicker><SectionTitle id="aet-routes-title">One feeling.<br /><em>Two routes.</em></SectionTitle><p>{rec.pathwaysLede}</p><p className="aet-route-caution">{rec.pathwaysCaution}</p></div>
        <AETInteractive mode="routes" />
        <div className="aet-architecture-note"><p className="aet-subhead">THE MACROSTRUCTURE STAYS OPEN</p><ol>{(rec.modelReveal?.linear ?? []).map((line) => <li key={line}>{line}</li>)}</ol><p className="aet-caption"><b>Figure 02.</b> {rec.modelReveal?.caption}</p></div>
      </section>

      <section className="aet-section aet-time-section" id="aet-time" aria-labelledby="aet-time-title">
        <div className="aet-section-intro"><SectionKicker number="05">WITHIN-PERSON TIME</SectionKicker><SectionTitle id="aet-time-title">You are not in the same<br /><em>affective state all day.</em></SectionTitle><p>{rec.workday?.takeaway}</p><p className="aet-hand-note">events arrive · traces remain</p></div>
        <AETInteractive mode="time" />
      </section>

      <section className="aet-section aet-distinction-section" id="aet-distinction" aria-labelledby="aet-distinction-title">
        <div className="aet-section-intro"><SectionKicker number="06">DO NOT FLATTEN THE TERMS</SectionKicker><SectionTitle id="aet-distinction-title">Affect is not<br /><em>job satisfaction.</em></SectionTitle><p>{rec.conceptComparison?.lede}</p></div>
        <div className="aet-distinction-field">
          <div className="aet-distinction-line" aria-hidden="true"><span /><span /><span /></div>
          {rec.conceptComparison?.cards.map((card) => <article key={card.title} className="aet-distinction-card" style={{ "--aet-card-colour": card.colour } as React.CSSProperties}><span>{card.label}</span><h3>{card.title}</h3><p>{card.body}</p></article>)}
          <p className="aet-inline-note"><b aria-hidden="true">■</b> {rec.conceptComparison?.note}</p>
        </div>
      </section>

      <section className="aet-section aet-changed-section" id="aet-changed" aria-labelledby="aet-changed-title">
        <div className="aet-section-intro"><SectionKicker number="07">THE CONTRIBUTION</SectionKicker><SectionTitle id="aet-changed-title">What AET<br /><em>changed.</em></SectionTitle></div>
        <div className="aet-changed-copy"><p className="aet-big-claim">The job is not the only unit of attention.</p><p>AET redirected organisational behaviour toward specific work events, within-person fluctuation, temporal affective experience, the distinction between affective reactions and work attitudes, and different routes from affect to behaviour.</p><div className="aet-changed-notes"><span>not an emotion box</span><span>not a causal machine</span><span>not a mood score</span></div></div>
      </section>

      <section className="aet-scholarship" id="aet-scholarship" aria-labelledby="aet-scholarship-title">
        <div className="aet-section-intro"><SectionKicker number="08">QUIET SCHOLARSHIP / AFTER 1996</SectionKicker><SectionTitle id="aet-scholarship-title">The map kept<br /><em>moving.</em></SectionTitle><p>{rec.trailLede}</p></div>
        <div><div className="aet-trail-list">{rec.origins.map((origin, index) => <article key={`${origin.year}-${origin.author}`}><span className="aet-trail-year">{origin.year}</span><div><h3><Rich html={origin.author} /></h3><p className="aet-trail-work"><Rich html={origin.work} /></p><p>{origin.contribution}</p></div><span className="aet-trail-index">0{index + 1}</span></article>)}</div><div className="aet-evidence-list"><p className="aet-subhead">WHAT HAS ACTUALLY BEEN TESTED?</p>{(rec.evidenceXrays ?? []).map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.found}</p><small>Not tested here: {item.notTested}</small></article>)}</div></div>
      </section>

      <section className="aet-section aet-open-section" id="aet-open" aria-labelledby="aet-open-title">
        <div className="aet-section-intro"><SectionKicker number="09">BOUNDARIES / OPEN QUESTIONS</SectionKicker><SectionTitle id="aet-open-title">A map is useful<br /><em>because it stops.</em></SectionTitle><p>{rec.scopeMap?.lede}</p></div>
        <div className="aet-open-grid"><article><h3>Do not conclude</h3><ol>{rec.oversimplifications.map((item) => <li key={item}><Rich html={item} /></li>)}</ol></article><article><h3>Still open</h3><ul>{rec.qualifications.map((item) => <li key={item}>{item}</li>)}</ul></article></div>
        <p className="aet-open-note"><b>?</b> {rec.scopeMap?.note}</p>
      </section>

      <section className="aet-sources" id="aet-sources" aria-labelledby="aet-sources-title">
        <div className="aet-section-intro"><SectionKicker number="10">SOURCES / PROVENANCE</SectionKicker><SectionTitle id="aet-sources-title">Keep the marks<br /><em>attached to the claims.</em></SectionTitle><p>Every route, teaching scenario and qualification has a different responsibility to the literature.</p></div>
        <div className="aet-source-columns"><ol className="aet-source-list">{rec.minimumReading.map((source, index) => <li key={source.citation}><span>0{index + 1}</span><div><p><Rich html={source.citation} /></p><small>{source.contribution}</small>{source.doi && <a href={`https://doi.org/${source.doi}`}>doi ↗</a>}</div></li>)}</ol><ul className="aet-provenance-list">{rec.provenance.map((item) => <li key={item.label}><span style={{ color: item.colour }}>{item.glyph}</span><div><strong>{item.label}</strong><p>{item.note}</p></div></li>)}</ul></div>
      </section>

      <div className="aet-back"><a href="/concept-lab/library">← Return to the atlas</a><span>Affective Events Theory · isolated visual/interaction prototype</span></div>
    </div>
  );
}
