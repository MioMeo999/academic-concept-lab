import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { Contents, Foot, Masthead, Opening, RunningHead, characterStyle } from "../_components/Frame";
import { OvertureItpra } from "../_components/Overture";
import { Aside, Note, PlainList, RegisterTable, Rich, Section, Steps } from "../_components/Spread";
import { ProvenanceBlock, Relations, Scope, SourceList, Trail, Xray } from "../_components/Apparatus";
import { Hinge } from "../_components/figures/Hinge";

const SLUG = "hurons-itpra-theory-of-expectation";
const KEYS = ["vermilion", "ochre", "viridian"] as const;

export const metadata: Metadata = {
  title: "Huron’s ITPRA Theory of Expectation",
  description: "Plate IV of the atlas: the outcome hinge, and what happens on both sides of it.",
};

/* ---------------------------------------------------------------------------
   PLATE IV · HURON'S ITPRA THEORY OF EXPECTATION

   This is the adversarial record for any visual language. Its five named
   responses invite a five-step pipeline, and a pipeline is precisely what the
   record denies: Prediction and Reaction begin together, Appraisal is slower
   and recurring, and the ordering is functional rather than algorithmic or
   neural.

   So the composition is built around a single vertical — the outcome onset —
   and everything on the plate is registered to it. The five responses are
   introduced *after* the hinge figure rather than before it, so the reader
   meets simultaneity first and names second. The expectation sources come
   later still, and are set as a parallel list, because they are concurrent
   inputs and not a sixth through-line.
   ------------------------------------------------------------------------ */

const TOC = [
  { id: "s1", label: "Waiting" },
  { id: "s2", label: "The outcome hinge" },
  { id: "s3", label: "Five, and what they are for" },
  { id: "s4", label: "Imagination" },
  { id: "s5", label: "Tension" },
  { id: "s6", label: "The outcome itself" },
  { id: "s7", label: "Was I accurate?" },
  { id: "s8", label: "Together, not in turn" },
  { id: "s9", label: "Appraisal" },
  { id: "s10", label: "One event, three questions" },
  { id: "s11", label: "Contrastive valence" },
  { id: "s12", label: "Where expectations come from" },
  { id: "s13", label: "Schematic and veridical" },
  { id: "s14", label: "Dynamic expectation" },
  { id: "s15", label: "The adaptive account" },
  { id: "s16", label: "What was actually tested" },
  { id: "s17", label: "Where it stops" },
  { id: "s18", label: "The trail" },
  { id: "s19", label: "Do not conclude" },
  { id: "s20", label: "Still open" },
  { id: "s21", label: "Sources" },
  { id: "s22", label: "Provenance" },
  { id: "s23", label: "Nearby records" },
];

export default function ItpraPlate() {
  const r = findRecord("theory", SLUG) as TheoryRecord | undefined;
  if (!r?.huron) notFound();
  const h = r.huron;

  return (
    <div className="at-page at-spread" style={characterStyle(SLUG)}>
      <Masthead here={`/atlas/${SLUG}`} />
      <RunningHead plate="IV" title={r.title} kind={h.identity.knowledgeForm} />
      <OvertureItpra />

      <main id="at-main">
        <Opening
          kicker={["Plate IV", h.identity.branch, h.identity.status]}
          title={r.title}
          hook={r.hook}
          oneSentence={r.oneSentence}
          topics={r.topics}
        >
          <Rich className="at-small" as="p" style={{ marginTop: "1.4rem", maxWidth: "34rem" }} html={r.ideaLede ?? ""} />
        </Opening>

        <Contents items={TOC} />

        <Section
          id="s1"
          num={1}
          register="working"
          kicker="Before the outcome"
          title="Waiting is already part of it"
          aside={
            <>
              <Note label="On the constructed timing" glyph="▲">
                {h.opening.timing.note}
              </Note>
              <Note label="The question this record opens with">
                <span className="at-hand at-hand--note" style={{ fontSize: "1.3rem" }}>
                  {h.opening.question}
                </span>
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={h.opening.lede} />
          <Rich className="at-small" as="p" style={{ marginTop: "1.3rem" }} html={h.opening.timing.lede} />

          {h.opening.timing.presets.map((preset) => (
            <div key={preset.label} style={{ marginTop: "2rem" }}>
              <span className="at-label">{preset.label}</span>
              <p style={{ marginTop: "0.4rem" }}>{preset.body}</p>
              <dl className="at-conditions">
                <dt>Changed</dt>
                <dd>
                  <b>{preset.variable}</b>
                </dd>
                <dt>Expected onset</dt>
                <dd>{preset.expectedOnset}</dd>
                <dt>Actual onset</dt>
                <dd>
                  {preset.actualOnset} {preset.delay ? `· ${preset.delay}` : ""}
                </dd>
                <dt>Held constant</dt>
                <dd>{preset.held}</dd>
              </dl>
            </div>
          ))}

          <Aside label="What waiting cannot be read as" pigment="graphite">
            Preparation and expectation-related response can be discussed before an outcome arrives. Nothing on this plate
            measures a physiological latency, a heart rate, or an amount of tension in the reader.
          </Aside>
        </Section>

        {/* --- simultaneity before names -------------------------------- */}
        <Section
          id="s2"
          num={2}
          register="working"
          kicker="The centre of the record"
          title="The outcome hinge"
          aside={
            <>
              <Note label="Functional, and approximate" glyph="●">
                {h.timeline.note}
              </Note>
              <Note label="Not five modules" glyph="?">
                The five names are functional questions about one event. The record does not claim five independently
                verified biological systems, and the drawing does not give them one each.
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={h.timeline.lede} />
          <Hinge windows={h.timeline.windows} hingeLabel="OUTCOME ONSET" />
        </Section>

        <Section
          id="s3"
          num={3}
          register="reading"
          kicker="Now the names"
          title="Five responses, and what each is for"
          aside={
            <Note label="An overview, not an algorithm" glyph="●">
              {h.overview.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.overview.lede} />
          <RegisterTable rows={h.overview.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s4"
          num={4}
          register="reading"
          kicker="Reaching furthest back"
          title="Imagination"
          aside={
            <Note label="Not literal musical imagery" glyph="●">
              {h.imagination.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.imagination.lede} />
          <RegisterTable rows={h.imagination.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s5"
          num={5}
          register="reading"
          kicker="Approaching the hinge"
          title="Tension"
          aside={
            <Note label="Not musical tension in the GTTM sense" glyph="●">
              {h.tension.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.tension.lede} />
          <RegisterTable rows={h.tension.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s6"
          num={6}
          register="reading"
          kicker="The instant itself"
          title="The outcome"
          aside={
            <Note label="One event, several questions" glyph="●">
              {h.outcome.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.outcome.lede} />
          <RegisterTable rows={h.outcome.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s7"
          num={7}
          register="reading"
          kicker="After onset"
          title="Was I accurate?"
          aside={
            <Note label="Accuracy of the forecast, not the act" glyph="●">
              {h.prediction.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.prediction.lede} />
          <RegisterTable rows={h.prediction.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s8"
          num={8}
          register="working"
          kicker="The distinction the plate is built on"
          title="Together, not in turn"
          aside={
            <Note label="Parallel onset" glyph="●">
              {h.parallel.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.parallel.lede} />
          <RegisterTable rows={h.parallel.cards} keys={[...KEYS]} />
          <Aside label="Why the hinge figure looks the way it does" pigment="vermilion">
            Prediction and Reaction share a left edge <b>exactly</b> on the outcome onset, and are drawn in one pigment at
            opposite hatch angles. Two questions, one instant. Any drawing that put them in sequence would have made the
            record say something it spends a section denying.
          </Aside>
        </Section>

        <Section
          id="s9"
          num={9}
          register="reading"
          kicker="Slower, and recurring"
          title="Appraisal"
          aside={
            <Note label="Not a liking rating" glyph="●">
              {h.appraisal.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.appraisal.lede} />
          <RegisterTable rows={h.appraisal.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s10"
          num={10}
          register="working"
          kicker="Three lenses on one instant"
          title="One event, three questions"
          aside={
            <Note label="The event is fixed" glyph="▲">
              {h.surprise.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.surprise.lede} />
          <Aside label="The fixed event">{h.surprise.event}</Aside>
          <div className="at-register">
            {h.surprise.lenses.map((lens) => (
              <div className="at-register__row" key={lens.label}>
                <span className="at-register__term">{lens.label}</span>
                <div>
                  <h3 style={{ marginBottom: "0.25rem" }}>{lens.question}</h3>
                  <Rich className="at-register__read" as="div" html={lens.body} />
                  <p className="at-small" style={{ marginTop: "0.4rem", fontSize: "0.86rem" }}>
                    <b>Boundary:</b> {lens.boundary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="s11"
          num={11}
          register="reading"
          kicker="A possible pathway"
          title="Contrastive valence"
          aside={
            <Note label="Non-deterministic" glyph="?">
              {h.valence.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.valence.lede} />
          <Steps items={h.valence.steps.map((s) => ({ label: s.label, body: s.body }))} />
        </Section>

        <Section
          id="s12"
          num={12}
          register="working"
          kicker="Concurrent inputs, not further stages"
          title="Where expectations come from"
          aside={
            <Note label="Parallel, and able to conflict" glyph="●">
              {h.sourcesOfExpectation.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.sourcesOfExpectation.lede} />
          <div className="at-register">
            {h.sourcesOfExpectation.sources.map((s) => (
              <div className="at-register__row" key={s.label}>
                <span className="at-register__term">{s.label}</span>
                <div>
                  <h3 style={{ marginBottom: "0.25rem" }}>{s.question}</h3>
                  <Rich className="at-register__read" as="div" html={s.body} />
                  <p className="at-small" style={{ marginTop: "0.4rem", fontSize: "0.86rem" }}>
                    <b>Draws on:</b> {s.memory}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Aside label="Read these across, not down" pigment="ochre">
            These four are not four more ITPRA stages. They can operate at the same time and can disagree with each other —
            an event can be veridically expected and schematically unexpected at once.
          </Aside>
        </Section>

        <Section
          id="s13"
          num={13}
          register="reading"
          kicker="Two of them, closely"
          title="Schematic and veridical"
          aside={
            <Note label="Distinct sources" glyph="●">
              {h.schematicVeridical.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.schematicVeridical.lede} />
          <RegisterTable rows={h.schematicVeridical.cards} keys={[...KEYS]} />
        </Section>

        {/* === quiet from here ========================================== */}
        <Section
          id="s14"
          num={14}
          register="quiet"
          kicker="Within the piece"
          title="Dynamic expectation"
          aside={
            <Note label="Bounded" glyph="●">
              {h.dynamic.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.dynamic.lede} />
          <RegisterTable rows={h.dynamic.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s15"
          num={15}
          register="quiet"
          kicker="The rationale, and its limits"
          title="The adaptive account"
          aside={
            <Note label="An account, not a finding" glyph="?">
              {h.adaptive.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.adaptive.lede} />
          <RegisterTable rows={h.adaptive.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s16"
          num={16}
          register="quiet"
          kicker="Evidence"
          title="What was actually tested"
          aside={
            <Note label="Convergent is not confirmatory" glyph="■">
              {h.evidence.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={h.evidence.lede} />
          {h.evidence.items.map((item) => (
            <Xray key={item.title} item={item} />
          ))}
        </Section>

        <Section id="s17" num={17} register="quiet" kicker="Scope" title="What this explains, and where it stops">
          <Rich className="at-lede" as="p" html={h.scope.lede} />
          <Scope explains={h.scope.explains} stops={h.scope.stops} note={h.scope.note} />
        </Section>

        <Section id="s18" num={18} register="quiet" kicker="Historical trail" title="The trail">
          <Rich className="at-lede" as="p" html={r.trailLede} />
          <Trail origins={r.origins} />
        </Section>

        <Section id="s19" num={19} register="quiet" kicker="Limitations" title="Do not conclude">
          <Rich className="at-lede" as="p" html={r.oversimplificationsLede} />
          <PlainList items={r.oversimplifications} />
        </Section>

        <Section id="s20" num={20} register="quiet" kicker="Qualifications" title="Still open">
          <PlainList items={r.qualifications} single />
        </Section>

        <Section
          id="s21"
          num={21}
          register="quiet"
          kicker="Sources"
          title={r.minimumReadingLabel ?? "If you read three things"}
          aside={
            <Note label="A threshold, not a limit">
              The short list is a teaching threshold, not the evidence base; the full trail below is not exhaustive either.
            </Note>
          }
        >
          <SourceList items={r.minimumReading} />
          <div style={{ marginTop: "2.4rem" }}>
            <span className="at-label">The full trail</span>
            <SourceList items={r.fullSources} start={r.minimumReading.length + 1} />
          </div>
        </Section>

        <Section id="s22" num={22} register="quiet" kicker="Provenance" title="Where every claim came from">
          <ProvenanceBlock items={r.provenance} />
        </Section>

        <Section id="s23" num={23} register="quiet" kicker="Relations" title="Nearby records">
          <Rich className="at-lede" as="p" html={r.relatedToLede ?? ""} />
          <Relations record={r} />
        </Section>
      </main>

      <Foot />
    </div>
  );
}
