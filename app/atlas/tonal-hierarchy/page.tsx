import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findRecord } from "@/content/records";
import type { TheoryRecord, TonalProbe } from "@/content/types";
import { Contents, Foot, Masthead, Opening, RunningHead, characterStyle } from "../_components/Frame";
import { OvertureTonal } from "../_components/Overture";
import { Aside, Note, PlainList, RegisterTable, Rich, Section, Steps } from "../_components/Spread";
import { ProvenanceBlock, Relations, Scope, SourceList, Trail } from "../_components/Apparatus";
import { FourHomes } from "../_components/figures/FourHomes";
import { ProfileBands } from "../_components/figures/ProfileBands";
import { Underscore } from "../_components/Pigment";

const SLUG = "tonal-hierarchy";
const KEYS = ["violet", "ochre", "graphite"] as const;

export const metadata: Metadata = {
  title: "Tonal Hierarchy",
  description: "Plate II of the atlas: one probe, four surrounds.",
};

/* ---------------------------------------------------------------------------
   PLATE II · TONAL HIERARCHY

   The record's geometry is a *relation*: context × pitch → contextual role. Its
   central hazard is that a psychological profile gets read as a measurement of
   liking, of physical pitch, or of the whole key-finding process.

   So this spread is composed around one held thing and four surrounds, and it
   keeps the three levels the record insists on — judgment, profile,
   interpretation — in three separate sections rather than letting one figure
   quietly do all three. There is no rating curve on this plate, no ring, no
   spiral and no torus, because the record holds ordered categories and a
   qualified psychological space, not coordinates.
   ------------------------------------------------------------------------ */

const TOC = [
  { id: "s1", label: "The first encounter" },
  { id: "s2", label: "Context is the meaning" },
  { id: "s3", label: "The measurement path" },
  { id: "s4", label: "The reconstruction" },
  { id: "s5", label: "The profile, as held" },
  { id: "s6", label: "One note, four homes" },
  { id: "s7", label: "Intersecting dimensions" },
  { id: "s8", label: "What a representation is" },
  { id: "s9", label: "Key neighbourhoods" },
  { id: "s10", label: "A space, not a place" },
  { id: "s11", label: "Updating over time" },
  { id: "s12", label: "Distribution" },
  { id: "s13", label: "Development" },
  { id: "s14", label: "Culture" },
  { id: "s15", label: "Profile versus process" },
  { id: "s16", label: "Where it stops" },
  { id: "s17", label: "The trail" },
  { id: "s18", label: "Do not conclude" },
  { id: "s19", label: "Still open" },
  { id: "s20", label: "Sources" },
  { id: "s21", label: "Provenance" },
  { id: "s22", label: "Nearby records" },
];

const probeRows = (probes: TonalProbe[]) =>
  probes.map((p) => ({ label: `${p.note} · ${p.role}`, body: p.body, colour: p.colour }));

export default function TonalPlate() {
  const r = findRecord("theory", SLUG) as TheoryRecord | undefined;
  if (!r?.tonal) notFound();
  const t = r.tonal;

  return (
    <div className="at-page at-spread" style={characterStyle(SLUG)}>
      <Masthead here={`/atlas/${SLUG}`} />
      <RunningHead plate="II" title={r.title} kind={r.knowledgeFormQualifier ?? "Framework"} />
      <OvertureTonal />

      <main id="at-main">
        <Opening
          kicker={["Plate II", "Musical structure & grammar", r.statusChip ?? "framework"]}
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
          kicker="Before any of it is explained"
          title="Listen first, then read the role"
          aside={
            <Note label="On the opening probes" glyph="▲">
              {t.opening.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.opening.lede} />
          <RegisterTable rows={probeRows(t.opening.probes)} keys={[...KEYS]} />
          <Aside label="The context these probes follow">
            <b>{t.opening.context.label}.</b> {t.opening.context.body} {t.opening.context.controls}
          </Aside>
        </Section>

        <Section
          id="s2"
          num={2}
          register="reading"
          kicker="The record's first commitment"
          title="A pitch does not carry its function with it"
          aside={
            <Note label="Where this comes from" glyph="●">
              {t.context.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.context.lede} />
          <RegisterTable rows={t.context.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s3"
          num={3}
          register="working"
          kicker="A logic, not a readout"
          title="The measurement path"
          aside={
            <Note label="What the path is not" glyph="?">
              {t.measurement.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.measurement.lede} />
          <Steps items={t.measurement.cards} />
          <Aside label="Read this chain in one direction only">
            Context, then probe, then a fit judgment, then a repeated profile, then a psychological inference. Each arrow
            adds an assumption. The chain is a way of{" "}
            <span className="at-marked">
              measuring
              <Underscore pigment="ochre" seed={4411} />
            </span>{" "}
            tonal organisation; it is not a description of the process that produces it.
          </Aside>
        </Section>

        <Section
          id="s4"
          num={4}
          register="reading"
          kicker="The teaching reconstruction"
          title="Choosing a probe, and judging its fit"
          aside={
            <Note label="Learner-generated data" glyph="▲">
              {t.probeLab.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.probeLab.lede} />
          <RegisterTable rows={probeRows(t.probeLab.probes)} keys={[...KEYS]} />
          <Aside label="Documented conditions">
            <b>{t.probeLab.context.label}.</b> {t.probeLab.context.controls}
          </Aside>
        </Section>

        <Section
          id="s5"
          num={5}
          register="working"
          kicker="The second level"
          title="The profile, as this record holds it"
          aside={
            <Note label="Categories, not values" glyph="●">
              {t.profile.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.profile.lede} />
          <ProfileBands items={t.profile.items} />
        </Section>

        {/* --- the centre of the plate ---------------------------------- */}
        <Section
          id="s6"
          num={6}
          register="working"
          kicker="The centre of the record"
          title="One note, four homes"
          aside={
            <>
              <Note label="What is held" glyph="▲">
                {t.sameNote.note}
              </Note>
              <Note label="Relational, not intrinsic" glyph="✦">
                Each panel names a role. The role belongs to the relation between the probe and its context, which is why
                the drawing changes the surround and refuses to change the mark.
              </Note>
            </>
          }
        >
          <Rich className="at-lede" as="p" html={t.sameNote.lede} />
          <FourHomes
            probe={t.sameNote.probe}
            contexts={t.sameNote.contexts}
            probeLabel={`${t.sameNote.probe.note} · MIDI ${t.sameNote.probe.midi} · held in every panel`}
          />
        </Section>

        <Section
          id="s7"
          num={7}
          register="reading"
          kicker="Not one line"
          title="Intersecting dimensions"
          aside={
            <Note label="Several at once" glyph="●">
              {t.dimensions.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.dimensions.lede} />
          <RegisterTable rows={t.dimensions.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s8"
          num={8}
          register="reading"
          kicker="The third level"
          title="What a psychological representation is"
          aside={
            <Note label="Interpretation" glyph="✦">
              {t.representation.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.representation.lede} />
          <RegisterTable rows={t.representation.cards} keys={[...KEYS]} />
        </Section>

        <Section
          id="s9"
          num={9}
          register="reading"
          kicker="Similarity between keys"
          title="Key neighbourhoods"
          aside={
            <Note label="Levels of description" glyph="●">
              {t.neighbourhood.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.neighbourhood.lede} />
          <Steps
            items={t.neighbourhood.levels.map((l) => ({
              label: l.label,
              body: `${l.body}<br /><span style="font-size:0.86em;opacity:0.75">${l.relations.join(" · ")}</span>`,
            }))}
          />
        </Section>

        <Section
          id="s10"
          num={10}
          register="reading"
          kicker="A warning that has to be typographic"
          title="A space, and not a place"
          aside={
            <Note label="Not a literal object" glyph="?">
              {t.keySpace.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.keySpace.lede} />
          <Aside label="Why there is no diagram here" pigment="graphite">
            A ring, a spiral or a torus would be the easiest drawing on this plate and the most misleading. The record
            describes a psychological similarity structure, not coordinates a listener occupies. Drawing the object would
            hand the reader a geometry the evidence does not supply, so this section is left in type.
          </Aside>
        </Section>

        <Section
          id="s11"
          num={11}
          register="reading"
          kicker="Over time"
          title="Context keeps arriving"
          aside={
            <Note label="Conceptual update" glyph="●">
              {t.dynamics.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.dynamics.lede} />
          <RegisterTable rows={t.dynamics.states} keys={[...KEYS]} />
        </Section>

        {/* === quiet from here ========================================== */}
        <Section
          id="s12"
          num={12}
          register="quiet"
          kicker="A neighbouring explanation"
          title="Distribution, frequency and what follows from them"
          aside={
            <Note label="Correlation is not the mechanism" glyph="?">
              {t.distribution.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.distribution.lede} />
          <RegisterTable rows={t.distribution.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s13"
          num={13}
          register="quiet"
          kicker="Boundary condition"
          title="Development"
          aside={
            <Note label="Bounded" glyph="■">
              {t.development.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.development.lede} />
          <RegisterTable rows={t.development.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s14"
          num={14}
          register="quiet"
          kicker="Boundary condition"
          title="Culture"
          aside={
            <Note label="Not one universal default" glyph="■">
              {t.culture.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.culture.lede} />
          <RegisterTable rows={t.culture.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section
          id="s15"
          num={15}
          register="quiet"
          kicker="The distinction the record ends on"
          title="A profile is not a process"
          aside={
            <Note label="What remains unspecified" glyph="?">
              {t.process.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={t.process.lede} />
          <RegisterTable rows={t.process.cards} keys={["graphite", "graphite", "graphite"]} />
        </Section>

        <Section id="s16" num={16} register="quiet" kicker="Scope" title="What this explains, and where it stops">
          <Rich className="at-lede" as="p" html={t.scope.lede} />
          <Scope explains={t.scope.explains} stops={t.scope.stops} note={t.scope.note} />
        </Section>

        <Section
          id="s17"
          num={17}
          register="quiet"
          kicker="Historical trail"
          title="The trail"
          aside={
            <Note label="A branching history" glyph="✦">
              {t.lineage.note}
            </Note>
          }
        >
          <Rich className="at-lede" as="p" html={r.trailLede} />
          <Trail origins={r.origins} />
          <div style={{ marginTop: "2.4rem" }}>
            <Rich className="at-small" as="p" html={t.lineage.lede} />
            <RegisterTable rows={t.lineage.nodes} keys={["graphite", "graphite", "graphite"]} />
          </div>
        </Section>

        <Section id="s18" num={18} register="quiet" kicker="Limitations" title="Do not conclude">
          <Rich className="at-lede" as="p" html={r.oversimplificationsLede} />
          <PlainList items={r.oversimplifications} />
        </Section>

        <Section id="s19" num={19} register="quiet" kicker="Qualifications" title="Still open">
          <PlainList items={r.qualifications} single />
        </Section>

        <Section
          id="s20"
          num={20}
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

        <Section id="s21" num={21} register="quiet" kicker="Provenance" title="Where every claim came from">
          <ProvenanceBlock items={r.provenance} />
        </Section>

        <Section id="s22" num={22} register="quiet" kicker="Relations" title="Nearby records">
          <Rich className="at-lede" as="p" html={r.relatedToLede ?? ""} />
          <Relations record={r} />
        </Section>
      </main>

      <Foot />
    </div>
  );
}
