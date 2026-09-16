import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { Contents, Foot, Masthead, Opening, RunningHead, characterStyle } from "../_components/Frame";
import { OvertureProcessing } from "../_components/Overture";
import { Aside, Note, PlainList, RegisterTable, Rich, Section, Steps } from "../_components/Spread";
import { ProvenanceBlock, Relations, SourceList, Trail, Xray } from "../_components/Apparatus";
import { Envelope } from "../_components/figures/Envelope";
import { Levels } from "../_components/figures/Levels";
import { Underscore } from "../_components/Pigment";

const SLUG = "predictive-processing-in-music";
const KEYS = ["ultramarine", "rose", "graphite"] as const;

export const metadata: Metadata = {
  title: "Predictive Processing in Music",
  description: "Plate III of the atlas: the same displacement under two uncertainties.",
};

/* ---------------------------------------------------------------------------
   PLATE III · PREDICTIVE PROCESSING IN MUSIC

   The record's quantity is a *relation between* a prediction, an input, and how
   confident the model was. Its hazards are the ones density-driven graphics
   walk straight into: making error look like magnitude, making precision look
   like certainty of an answer, and making a compatible signal look like proof
   of a computation.

   So this plate uses spread rather than density as its main material. The
   envelope figure deposits exactly the same amount of ink in both conditions;
   the levels figure distinguishes timescales by how marks behave rather than by
   how dark they are; and the evidence section is entirely typeset, because
   the limits of the signals are the part most likely to be skipped.
   ------------------------------------------------------------------------ */

const TOC = [
  { id: "s1", label: "What the framework claims" },
  { id: "s2", label: "The next note" },
  { id: "s3", label: "The generative model" },
  { id: "s4", label: "Two directions" },
  { id: "s5", label: "Error is a relation" },
  { id: "s6", label: "Precision" },
  { id: "s7", label: "Same displacement, two contexts" },
  { id: "s8", label: "First and second" },
  { id: "s9", label: "Attention" },
  { id: "s10", label: "Levels and timescales" },
  { id: "s11", label: "When error is zero" },
  { id: "s12", label: "The framework, assembled" },
  { id: "s13", label: "Neighbouring vocabularies" },
  { id: "s14", label: "Culture and expertise" },
  { id: "s15", label: "Active inference" },
  { id: "s16", label: "What the signals support" },
  { id: "s17", label: "The critical position" },
  { id: "s18", label: "The trail" },
  { id: "s19", label: "Do not conclude" },
  { id: "s20", label: "Still open" },
  { id: "s21", label: "Sources" },
  { id: "s22", label: "Provenance" },
  { id: "s23", label: "Nearby records" },
];

export default function PredictivePlate() {
  const r = findRecord("theory", SLUG) as TheoryRecord | undefined;
  if (!r?.predictiveProcessing) notFound();
  const p = r.predictiveProcessing;

  return (
    <div className="at-page at-spread" style={characterStyle(SLUG)}>
      <Masthead here={`/atlas/${SLUG}`} />
      <RunningHead plate="III" title={r.title} kind={p.identity.knowledgeForm} />
      <OvertureProcessing />

      <main id="at-main">
        <Opening
          kicker={["Plate III", p.identity.branch, p.identity.status]}
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
          kicker="The claim, stated once"
          title="Perception as a model meeting its input"
          aside={
            <Note label="What kind of thing this is" glyph="●">
              {p.opening.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.opening.lede} />
          <RegisterTable rows={p.opening.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s2"
          num={2}
          register="reading"
          kicker="The everyday case"
          title="The next note"
          aside={
            <Note label="Boundary" glyph="?">
              {p.nextNote.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.nextNote.lede} />
          <RegisterTable rows={p.nextNote.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s3"
          num={3}
          register="reading"
          kicker="What is doing the predicting"
          title="The generative model"
          aside={
            <Note label="Source-grounded" glyph="●">
              {p.generative.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.generative.lede} />
          <RegisterTable rows={p.generative.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s4"
          num={4}
          register="reading"
          kicker="Direction, without a wiring map"
          title="Two directions"
          aside={
            <Note label="Not anatomy" glyph="?">
              {p.messagePassing.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.messagePassing.lede} />
          <RegisterTable rows={p.messagePassing.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s5"
          num={5}
          register="working"
          kicker="The word that causes the most trouble"
          title="Error is a relation, not a verdict"
          aside={
            <Note label="Not a value judgement" glyph="●">
              {p.error.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.error.lede} />
          <RegisterTable rows={p.error.cards} keys={[...KEYS]} />
          <Aside label="A note on the word" pigment="rose">
            &ldquo;Error&rdquo; here names a <b>difference between a prediction and an input</b>. It carries no musical or
            moral evaluation, and a larger difference is not a{" "}
            <span className="at-marked">
              worse note
              <Underscore pigment="rose" seed={5511} />
            </span>
            .
          </Aside>
        </Section>

        <Section
          id="s6"
          num={6}
          register="reading"
          kicker="The weighting term"
          title="Precision"
          aside={
            <Note label="Weighting, in the teaching model" glyph="●">
              {p.precision.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.precision.lede} />
          <RegisterTable rows={p.precision.cards} keys={[...KEYS]} />
        </Section>

        {/* --- the centre of the plate ---------------------------------- */}
        <Section
          id="s7"
          num={7}
          register="working"
          kicker="The centre of the record"
          title="The same displacement, under two uncertainties"
          aside={
            <>
              <Note label="What the envelope is" glyph="▲">
                {p.precisionInteraction.note}
              </Note>
              <Note label="On the omission" glyph="▲">
                {p.omission.note}
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={p.precisionInteraction.lede} />
          <Envelope contexts={p.precisionInteraction.contexts} omission={p.omission} />
          <Aside label="Why spread and not density" pigment="graphite">
            A denser cloud would read as a stronger claim, and this record has no licence to make one. Both conditions
            deposit the same number of marks, so the only difference the reader can see is <b>how far the ink is spread</b>{" "}
            — which is what an uncertainty assumption actually changes in the constructed model.
          </Aside>
        </Section>

        <Section
          id="s8"
          num={8}
          register="reading"
          kicker="Two hearings"
          title="First and second"
          aside={
            <Note label="Bounded" glyph="?">
              {p.firstSecond.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.firstSecond.lede} />
          <RegisterTable rows={p.firstSecond.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s9"
          num={9}
          register="reading"
          kicker="A theoretical account"
          title="Attention, in this vocabulary"
          aside={
            <Note label="Theoretical, and marked as such" glyph="?">
              {p.attention.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.attention.lede} />
          <RegisterTable rows={p.attention.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s10"
          num={10}
          register="working"
          kicker="Explanatory, not anatomical"
          title="Levels and timescales"
          aside={
            <Note label="The qualification that has to survive" glyph="?">
              {p.hierarchy.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.hierarchy.lede} />
          <Levels
            cards={p.hierarchy.cards}
            downLabel="predictions run this way"
            upLabel="mismatch runs back"
          />
        </Section>

        <Section
          id="s11"
          num={11}
          register="reading"
          kicker="The case people forget"
          title="When there is nothing to correct"
          aside={
            <Note label="Still an inference" glyph="●">
              {p.zeroError.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.zeroError.lede} />
          <RegisterTable rows={p.zeroError.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s12"
          num={12}
          register="working"
          kicker="Put together"
          title="The framework, assembled"
          aside={
            <Note label="An editorial arrangement" glyph="✦">
              {p.finalModel.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.finalModel.lede} />
          <Steps items={p.finalModel.nodes} />
        </Section>

        {/* === quiet from here ========================================== */}
        <Section
          id="s13"
          num={13}
          register="quiet"
          kicker="Not synonyms"
          title="Neighbouring vocabularies"
          aside={
            <Note label="Keep these apart" glyph="●">
              {p.pcm.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.pcm.lede} />
          <RegisterTable rows={p.pcm.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s14"
          num={14}
          register="quiet"
          kicker="Boundary condition"
          title="Culture and expertise"
          aside={
            <Note label="Not one homogeneous prior" glyph="?">
              {p.culture.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.culture.lede} />
          <RegisterTable rows={p.culture.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s15"
          num={15}
          register="quiet"
          kicker="A subordinate extension"
          title="Active inference"
          aside={
            <Note label="Kept subordinate" glyph="●">
              {p.activeInference.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.activeInference.lede} />
          <RegisterTable rows={p.activeInference.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s16"
          num={16}
          register="quiet"
          kicker="Evidence"
          title="What the signals can and cannot support"
          aside={
            <Note label="Compatible is not identical" glyph="■">
              {p.signals.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.signals.lede} />
          {p.signals.items.map((item) => (
            <Xray key={item.title} item={item} />
          ))}
        </Section>

        <Section
          id="s17"
          num={17}
          register="quiet"
          kicker="Standing"
          title="The critical position"
          aside={
            <Note label="Contested, and recorded as contested" glyph="?">
              {p.critical.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={p.critical.lede} />
          <RegisterTable rows={p.critical.cards} keys={["graphite", "graphite", "graphite"]} />
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
