import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { Contents, Foot, Masthead, Opening, RunningHead, characterStyle } from "../_components/Frame";
import { OvertureGestalt } from "../_components/Overture";
import { Aside, Note, PlainList, RegisterTable, Rich, Section, Steps } from "../_components/Spread";
import { ProvenanceBlock, Relations, Scope, SourceList, Trail, Xray } from "../_components/Apparatus";
import { Organisations } from "../_components/figures/Organisations";
import { WholePart } from "../_components/figures/WholePart";
import { PIGMENT, Underscore } from "../_components/Pigment";

const SLUG = "gestalt-principles-in-music";
const KEYS = ["ultramarine", "viridian", "vermilion"] as const;

export const metadata: Metadata = {
  title: "Gestalt Principles in Music",
  description: "Plate I of the atlas: competing organisations, drawn.",
};

/* ---------------------------------------------------------------------------
   PLATE I · GESTALT PRINCIPLES IN MUSIC

   Composition follows the record's own geometry, which is a relational one:
   events, candidate organisations, and a part whose role depends on the whole
   it is organised into. So this spread is built around overlap and disagreement
   rather than sequence. Its loudest passage is the cue conflict — the one place
   where two readings are genuinely in play at once — and everything after it
   cools deliberately, because what follows is bounded evidence about later
   formalised grouping rules, not more of the same argument.

   What this spread must not do: present the principles as a law list, let a
   drawn boundary look like a measured one, or let the two later empirical
   records read as confirmations of classical Gestalt psychology.
   ------------------------------------------------------------------------ */

const TOC = [
  { id: "s1", label: "The grouping problem" },
  { id: "s2", label: "The whole and the part" },
  { id: "s3", label: "Proximity" },
  { id: "s4", label: "Similarity" },
  { id: "s5", label: "Where the cues disagree" },
  { id: "s6", label: "Tendencies, not laws" },
  { id: "s7", label: "Continuation and closure" },
  { id: "s8", label: "Prägnanz, unfinished" },
  { id: "s9", label: "How far the hierarchy goes" },
  { id: "s10", label: "Gestalt to GTTM" },
  { id: "s11", label: "What was actually tested" },
  { id: "s12", label: "Where experience enters" },
  { id: "s13", label: "Where it stops" },
  { id: "s14", label: "Do not conclude" },
  { id: "s15", label: "Still open" },
  { id: "s16", label: "The trail" },
  { id: "s17", label: "Sources" },
  { id: "s18", label: "Provenance" },
  { id: "s19", label: "Nearby records" },
];

export default function GestaltPlate() {
  const r = findRecord("theory", SLUG) as TheoryRecord | undefined;
  if (!r?.gestalt) notFound();
  const g = r.gestalt;

  return (
    <div className="at-page at-spread" style={characterStyle(SLUG)}>
      <Masthead here={`/atlas/${SLUG}`} />
      <RunningHead plate="I" title={r.title} kind="Perceptual tradition · principle family" />
      <OvertureGestalt />

      <main id="at-main">
        <Opening
          kicker={["Plate I", "Perception & organisation", r.statusChip ?? ""]}
          title={r.title}
          hook={r.hook}
          oneSentence={r.oneSentence}
          topics={r.topics}
        >
          <Rich className="at-small" as="p" style={{ marginTop: "1.4rem", maxWidth: "34rem" }} html={r.ideaLede ?? ""} />
        </Opening>

        <Contents items={TOC} />

        {/* ------------------------------------------------------------- */}
        <Section
          id="s1"
          num={1}
          register="working"
          kicker="The problem this record is for"
          title="Separate events, and the organisation a listener already has"
          aside={
            <>
              <Note label="What Wertheimer asked" glyph="●">
                {g.problem.note}
              </Note>
              <Note label="On the opening experiment" glyph="▲">
                {g.opening.note}
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={g.problem.lede} />
          <RegisterTable rows={g.problem.cards} keys={[...KEYS]} />
          <Rich className="at-small" as="p" style={{ marginTop: "1.5rem" }} html={g.opening.lede} />
        </Section>

        {/* ------------------------------------------------------------- */}
        <Section
          id="s2"
          num={2}
          register="working"
          kicker="Mutual constraint"
          title="The same event, in two organisations"
          aside={
            <Note label="Whole–part, carefully" glyph="✦">
              {g.whole.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.whole.lede} />
          <WholePart cases={g.whole.cases} />
        </Section>

        {/* ------------------------------------------------------------- */}
        <Section
          id="s3"
          num={3}
          register="reading"
          kicker="A relational tendency"
          title="Proximity"
          aside={
            <Note label="Source and construction" glyph="●">
              {g.proximity.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.proximity.lede} />
          <RegisterTable rows={g.proximity.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s4"
          num={4}
          register="reading"
          kicker="A family of relations"
          title="Similarity is not one dimension"
          aside={
            <Note label="Cue weight" glyph="●">
              {g.similarity.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.similarity.lede} />
          <RegisterTable rows={g.similarity.cards} keys={[...KEYS]} />
        </Section>

        {/* --- the loudest passage on the plate ------------------------- */}
        <Section
          id="s5"
          num={5}
          register="working"
          kicker="The centre of the record"
          title="Where the cues disagree"
          aside={
            <>
              <Note label="What the conditions are" glyph="▲">
                {g.conflict.note}
              </Note>
              <Note label="The question, left open">
                <span className="at-hand at-hand--note" style={{ fontSize: "1.3rem" }}>
                  {g.conflict.question}
                </span>
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={g.conflict.lede} />
          <Organisations presets={g.conflict.presets} />
          <Aside label="Why this figure is built this way" pigment="graphite">
            The three conditions are the record&rsquo;s own. What the drawing adds is that both organisations can be present
            at once and that neither has to win — which is the record&rsquo;s claim, and the reason the bracket over the
            contested span is left unclosed rather than resolved.
          </Aside>
        </Section>

        {/* ------------------------------------------------------------- */}
        <Section
          id="s6"
          num={6}
          register="reading"
          kicker="Vocabulary"
          title={
            "Tendencies, factors, constraints — not laws"
          }
          aside={
            <Note label="How to write it" glyph="✦">
              {g.laws.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.laws.lede} />
          <RegisterTable rows={g.laws.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s7"
          num={7}
          register="reading"
          kicker="Two neighbouring ideas, kept apart"
          title="Continuation, and closure"
          aside={
            <>
              <Note label="Continuation is not expectancy" glyph="●">
                {g.continuation.note}
              </Note>
              <Note label="Closure is not resolution" glyph="●">
                {g.closure.note}
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={g.continuation.lede} />
          <RegisterTable rows={g.continuation.options} keys={[...KEYS]} />
          <Rich className="at-small" as="p" style={{ marginTop: "2rem" }} html={g.closure.lede} />
          <RegisterTable rows={g.closure.cards} keys={[...KEYS]} />
        </Section>

        {/* --- the one place the page marks its own uncertainty --------- */}
        <Section
          id="s8"
          num={8}
          register="working"
          kicker="An ambition, and a problem"
          title="Prägnanz, unfinished"
          aside={
            <Note label="Later frameworks" glyph="?">
              {g.pragnanz.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.pragnanz.lede} />
          <div className="at-pair">
            <div className="at-pair__side">
              <span className="at-label">The historical ambition</span>
              <Rich as="p" html={g.pragnanz.historical} />
            </div>
            <div className="at-pair__side">
              <span className="at-label">The problem it leaves</span>
              <p>
                {g.pragnanz.problem.split("precisely enough")[0]}
                <span className="at-marked">
                  precisely enough
                  <Underscore pigment="vermilion" seed={917} />
                </span>
                {g.pragnanz.problem.split("precisely enough")[1]}
              </p>
              <p className="at-hand" style={{ marginTop: "0.9rem", color: PIGMENT.vermilion }}>
                what is being optimised, and under which conditions? the record does not say, because the tradition did not.
              </p>
            </div>
          </div>
          <div style={{ marginTop: "1.6rem" }}>
            <span className="at-label">Later reformulations of the same problem</span>
            <PlainList items={g.pragnanz.later} />
          </div>
        </Section>

        {/* ------------------------------------------------------------- */}
        <Section
          id="s9"
          num={9}
          register="reading"
          kicker="Part, and larger part"
          title="How far the hierarchy goes"
          aside={
            <Note label="Where this stops being Gestalt" glyph="●">
              {g.hierarchy.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.hierarchy.lede} />
          <Steps items={g.hierarchy.levels} />
        </Section>

        <Section
          id="s10"
          num={10}
          register="reading"
          kicker="Four stages, not one lineage"
          title="From Gestalt to GTTM"
          aside={
            <Note label="Defeasible, not absolute" glyph="●">
              {g.gttm.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.gttm.lede} />
          <Steps items={g.gttm.stages} />
        </Section>

        {/* === the page goes quiet here ================================= */}
        <Section
          id="s11"
          num={11}
          register="quiet"
          kicker="Evidence"
          title="What was actually tested"
          aside={
            <>
              <Note label="On Deliège" glyph="■">
                {g.deliege.note}
              </Note>
              <Note label="On Frankland &amp; Cohen" glyph="■">
                {g.frankland.note}
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={g.deliege.lede} />
          <Xray item={g.deliege.evidence} />
          <Rich className="at-small" as="p" style={{ marginTop: "2.4rem" }} html={g.frankland.lede} />
          <Xray item={g.frankland.evidence} />
        </Section>

        <Section
          id="s12"
          num={12}
          register="quiet"
          kicker="A boundary condition"
          title="Where experience enters"
          aside={
            <Note label="Use this narrowly" glyph="■">
              {g.culture.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={g.culture.lede} />
          <RegisterTable rows={g.culture.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s13"
          num={13}
          register="quiet"
          kicker="Scope"
          title="What this explains, and where it stops"
        >
          <Rich className="at-lede" as="p" html={g.scope.lede} />
          <Scope explains={g.scope.explains} stops={g.scope.stops} note={g.scope.note} />
        </Section>

        <Section
          id="s14"
          num={14}
          register="quiet"
          kicker="Limitations"
          title="Do not conclude"
          aside={
            <Note label="Why this list exists">
              A powerful lens becomes a law book the moment its tendencies are written as rules. Each line below is a
              shortcut the record explicitly refuses.
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={r.oversimplificationsLede} />
          <PlainList items={r.oversimplifications} />
        </Section>

        <Section id="s15" num={15} register="quiet" kicker="Qualifications" title="Still open">
          <PlainList items={r.qualifications} single />
        </Section>

        <Section id="s16" num={16} register="quiet" kicker="Historical trail" title="The trail">
          <Rich className="at-lede" as="p" html={r.trailLede} />
          <Trail origins={r.origins} />
        </Section>

        <Section
          id="s17"
          num={17}
          register="quiet"
          kicker="Sources"
          title={r.minimumReadingLabel ?? "If you read three things"}
          aside={
            <Note label="A threshold, not a limit">
              The short list is a teaching threshold. It is not the evidence base, and the full trail below is not exhaustive
              either.
            </Note>
          }
        >
          <SourceList items={r.minimumReading} />
          <div style={{ marginTop: "2.4rem" }}>
            <span className="at-label">The full trail</span>
            <SourceList items={r.fullSources} start={r.minimumReading.length + 1} />
          </div>
        </Section>

        <Section
          id="s18"
          num={18}
          register="quiet"
          kicker="Provenance"
          title="Where every claim came from"
          aside={
            <Note label="The glyphs are the contract">
              Five marks, and each note says what its mark covers. They are semantic, they predate this exploration, and no
              meaning here is carried by colour.
            </Note>
          }
        >
          <ProvenanceBlock items={r.provenance} />
        </Section>

        <Section id="s19" num={19} register="quiet" kicker="Relations" title="Nearby records">
          <Rich className="at-lede" as="p" html={r.relatedToLede ?? ""} />
          <Relations record={r} />
        </Section>
      </main>

      <Foot />
    </div>
  );
}
