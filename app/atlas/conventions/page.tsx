import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Foot, Masthead, Opening, RunningHead } from "../_components/Frame";
import { Aside, Note, Section } from "../_components/Spread";
import { Boundary, Erasure, Field, Ghost, PIGMENT, Stroke } from "../_components/Pigment";
import { rng, toPath, wander } from "../_lib/marks";

export const metadata: Metadata = {
  title: "How to read a spread",
  description: "What each kind of mark in the atlas is doing, and what none of them is allowed to mean.",
};

/* ---------------------------------------------------------------------------
   CONVENTIONS

   The direction only works if the marks are doing declared work. A hatch does
   not intrinsically mean "asserted" and an open boundary does not intrinsically
   mean "defeasible" — those are conventions this publication adopts, and a
   convention that is never stated is decoration with a good story attached.

   So this page states them, and states the four things a mark is never allowed
   to mean. It is deliberately not a swatch sheet: every specimen below is
   attached to a claim about reading, and there are no families of variants
   presented for their own sake.
   ------------------------------------------------------------------------ */

function Specimen({ children, height = 92 }: { children: ReactNode; height?: number }) {
  return (
    <svg viewBox={`0 0 220 ${height}`} className="at-specimen" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

function Convention({
  mark,
  term,
  children,
}: {
  mark: ReactNode;
  term: string;
  children: ReactNode;
}) {
  return (
    <div className="at-convention">
      <div className="at-convention__mark">{mark}</div>
      <div>
        <h3>{term}</h3>
        <p className="at-register__read" style={{ marginTop: "0.3rem" }}>
          {children}
        </p>
      </div>
    </div>
  );
}

const GHOST_RUN = toPath(wander(16, 74, 204, 22, rng(31), 2.4));

export default function ConventionsPage() {
  return (
    <div className="at-page at-spread">
      <Masthead here="/atlas/conventions" />
      <RunningHead plate="—" title="How to read a spread" kind="Conventions" />

      <main id="at-main">
        <Opening
          kicker={["Conventions", "Read this once"]}
          title="How to read a spread"
          hook="Every mark in this atlas is doing declared work. A convention that is never stated is decoration with a good story attached."
          oneSentence="The scholarship is typeset and survives with the drawing switched off. The drawing appears where thought is happening, and this page says what each kind of it is for — and what none of it is allowed to mean."
          topics={["two registers", "marks", "prohibitions", "provenance", "rhythm"]}
        />

        <Section
          id="c1"
          num={1}
          register="reading"
          kicker="The division everything else rests on"
          title="Two registers, and they never merge"
          aside={
            <Note label="The test">
              Turn every drawing off. If a claim, a citation, a boundary, a limitation or a provenance mark disappears with
              it, the spread is wrong and the drawing was carrying scholarship it had no business carrying.
            </Note>
          }
        >
          <p className="at-lede">
            Typeset knowledge carries the argument. Drawn thinking carries the work of arriving at it. Both are on every
            spread; neither does the other&rsquo;s job.
          </p>
          <div className="at-pair">
            <div className="at-pair__side">
              <span className="at-label">Typeset</span>
              <p>
                Claims, citations, evidence chains, scope, limitations, qualifications, provenance, relations, and every
                condition disclosure. Set at one measure, ruled to one grid, with the apparatus beside the text rather than
                boxed inside it.
              </p>
            </div>
            <div className="at-pair__side">
              <span className="at-label">Drawn</span>
              <p>
                Grouping, comparing, connecting, questioning, bounding, revising. Pigment and graphite, accumulated by
                repetition, overlapping without destroying each other, and removable without loss.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="c2"
          num={2}
          register="working"
          kicker="The vocabulary"
          title="What a mark is doing"
          aside={
            <Note label="Attached, not free-standing" glyph="✦">
              Every convention below is used somewhere in this atlas with text beside it saying what it covers. None of them
              is a general-purpose ornament, and none appears on a spread that has nothing for it to do.
            </Note>
          }
        >
          <p className="at-lede">
            Eight behaviours, and each one earns its place by being the shortest way to say something the type would need a
            paragraph for.
          </p>

          <div className="at-conventions">
            <Convention
              term="An accumulated field"
              mark={
                <Specimen>
                  <Field cx={110} cy={46} w={180} h={62} pigment="ultramarine" angle={-28} seed={101} broken={0.16} pressure={[0.2, 0.56]} gap={3.8} />
                </Specimen>
              }
            >
              A reading is being asserted over this span. Tone is reached by repetition — more passes, crossed passes,
              heavier pressure — never declared as a fill, because the page should show that a reading was <i>worked at</i>.
            </Convention>

            <Convention
              term="Two fields crossing"
              mark={
                <Specimen>
                  <Field cx={86} cy={46} w={140} h={58} pigment="ultramarine" angle={-30} seed={211} broken={0.16} pressure={[0.2, 0.54]} gap={3.8} />
                  <Field cx={140} cy={48} w={140} h={58} pigment="viridian" angle={32} seed={223} broken={0.16} pressure={[0.2, 0.54]} gap={3.8} />
                </Specimen>
              }
            >
              Two readings are in play over the same material. Pigment layers instead of covering, so both directions stay
              legible in the overlap. The darker band says <b>how much is in play</b>, never how strong either reading is.
            </Convention>

            <Convention
              term="A boundary that will not close"
              mark={
                <Specimen>
                  <Boundary x={18} y={20} w={184} h={52} open="right" pigment="graphite" seed={307} />
                </Specimen>
              }
            >
              A claim the record does not fully assert. The missing edge is the shape of defeasibility — a grouping that
              can be overridden, an appraisal that can recur, a hierarchy the record declines to close.
            </Convention>

            <Convention
              term="Construction, kept"
              mark={
                <Specimen>
                  <Ghost d={GHOST_RUN} pigment="ultramarine" opacity={0.75} />
                  <Ghost d="M16 22 L204 22" pigment="graphite" opacity={0.4} />
                </Specimen>
              }
            >
              Scaffolding the page has decided not to erase: a predicted position, an alternative reading, a line needed to
              build something else. It is faint because it is <b>not asserted</b> — never because it has been discredited.
            </Convention>

            <Convention
              term="An overdraw"
              mark={
                <Specimen>
                  <Field cx={95} cy={50} w={150} h={44} pigment="vermilion" angle={-26} seed={401} broken={0.14} pressure={[0.2, 0.5]} gap={4} />
                  <Stroke x1={190} y1={26} x2={44} y2={70} pigment="violet" seed={411} weight={1.6} count={2} opacity={0.9} />
                </Specimen>
              }
            >
              A later reading laid over an earlier one, offset, with the earlier marks still legible underneath. Revision,
              not deletion. The atlas uses it once — for appraisal changing the meaning of an outcome it does not undo.
            </Convention>

            <Convention
              term="Residue"
              mark={
                <Specimen>
                  <Erasure cx={110} cy={46} w={160} h={54} pigment="graphite" seed={509} />
                </Specimen>
              }
            >
              A mark that was lifted keeps a broken skeleton and a soft rub. It records a relationship to a former state.
              It does not mean the former state was wrong, and it is never used to mean an idea was refuted.
            </Convention>

            <Convention
              term="Spread, not density"
              mark={
                <Specimen>
                  <Field cx={64} cy={46} w={54} h={54} pigment="ultramarine" angle={-84} seed={601} gap={2.6} pressure={[0.3, 0.6]} shaped={false} />
                  <Field cx={158} cy={46} w={116} h={54} pigment="ultramarine" angle={-84} seed={613} gap={6.4} pressure={[0.3, 0.6]} shaped={false} />
                </Specimen>
              }
            >
              Where a record&rsquo;s quantity is uncertainty, both conditions deposit the same amount of ink and only its
              width changes. Crowding is <b>narrow</b>, not strong; spreading is <b>wide</b>, not weak.
            </Convention>

            <Convention
              term="A hand note"
              mark={
                <Specimen>
                  <text x={14} y={40} fontFamily="var(--at-hand)" fontSize={21} fill={PIGMENT.vermilion}>
                    what is being
                  </text>
                  <text x={14} y={64} fontFamily="var(--at-hand)" fontSize={21} fill={PIGMENT.vermilion}>
                    optimised, and when?
                  </text>
                </Specimen>
              }
            >
              Scarce enough to matter — a handful per spread. It names a hidden assumption, an overclaim, a boundary, a
              contradiction, or a question the literature has left open. It never says &ldquo;important&rdquo;.
            </Convention>
          </div>
        </Section>

        <Section
          id="c3"
          num={3}
          register="quiet"
          kicker="The prohibitions"
          title="What no mark is allowed to mean"
          aside={
            <Note label="Why these four" glyph="?">
              These are the readings a drawn language invites by default. They are the ones most likely to turn a bounded
              record into an overclaim, so they are ruled out here rather than watched for case by case.
            </Note>
          }
        >
          <p className="at-lede">
            A visual language earns trust by what it refuses. Four readings are ruled out everywhere in this atlas.
          </p>
          <div className="at-register">
            <div className="at-register__row">
              <span className="at-register__term">Density is not truth</span>
              <div className="at-register__read">
                A darker field is more <i>worked</i>. It is not more established, more probable, a larger effect, or more
                brain activity. Weight of evidence is stated in words, where it can be checked against a citation.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Faintness is not refutation</span>
              <div className="at-register__read">
                A ghost or a residue marks something not currently asserted. &ldquo;Not established&rdquo; is not
                &ldquo;false&rdquo;, and &ldquo;constructed&rdquo; is not &ldquo;weak&rdquo;.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">An open edge is not missing content</span>
              <div className="at-register__read">
                An unclosed boundary is a claim about defeasibility, made deliberately. Where one appears, the text beside
                it says what the missing edge covers.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Colour is not a key</span>
              <div className="at-register__read">
                Pigments are chosen for how they behave in the mass. The same pigment does different work on different
                plates, and no record kind, claim class, evidence status or provenance mark is encoded by hue.
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="c4"
          num={4}
          register="quiet"
          kicker="Provenance"
          title="The five marks, which predate this direction"
          aside={
            <Note label="Authority">
              Each record&rsquo;s own provenance notes are authoritative for that record. The summary here is the shared
              vocabulary, not a replacement for the notes at the foot of each plate.
            </Note>
          }
        >
          <p className="at-lede">
            The glyphs are semantic and they survive the redesign unchanged. None of their meaning is carried by colour, and
            each note on each plate says what its mark covers.
          </p>
          <div className="at-prov">
            {[
              ["●", "Source-grounded theory, framework, historical or model claim", "Attributed to a named source, with its scope kept. A proposal is not presented as a measurement."],
              ["■", "Source-grounded empirical finding or faithful explanation", "Design, measure, result and limit stay attached to each other."],
              ["▲", "Constructed teaching, audio or comparison", "States what is manipulated, what is held, and what it cannot establish about the reader."],
              ["✦", "Concept Lab synthesis or editorial arrangement", "An arrangement made here. Never presented as a source-authored figure or a result."],
              ["?", "Bounded, debated, under-specified or unresolved", "Kept visible as unresolved rather than completed by design convenience."],
            ].map(([glyph, label, note]) => (
              <div className="at-prov__item" key={label}>
                <span className="at-prov__glyph" aria-hidden="true">
                  {glyph}
                </span>
                <div>
                  <h3>{label}</h3>
                  <p>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="c5"
          num={5}
          register="quiet"
          kicker="Rhythm"
          title="Why a plate is not the same all the way down"
          aside={
            <Note label="Quiet is not generic">
              A quiet section is ruled to the same grid, set in the same faces, and keeps the same apparatus column. What it
              drops is pigment, not precision.
            </Note>
          }
        >
          <p className="at-lede">
            Each section declares a register, and the register governs how much pigment it may use and how much air it gets.
          </p>
          <div className="at-register">
            <div className="at-register__row">
              <span className="at-register__term">Ignition</span>
              <div className="at-register__read">The opening claim. Display type, and the plate&rsquo;s own drawing full bleed.</div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Working</span>
              <div className="at-register__read">A figure or a comparison. Marks are carrying an argument, and a caption says which.</div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Reading</span>
              <div className="at-register__read">Running prose at one measure, with at most one marginal mark.</div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Quiet</span>
              <div className="at-register__read">
                Evidence, scope, limitations, provenance, sources, relations. Type only — with one exception, the frayed rule
                under a record&rsquo;s stopping points, because a boundary is a finding rather than a gap.
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="c6"
          num={6}
          register="quiet"
          kicker="Operation"
          title="Controls, motion and what happens without them"
        >
          <p className="at-lede">
            A control changes the explanatory condition. It never changes what the record claims, and it is never the only
            place a distinction exists.
          </p>
          <Aside label="On every interactive figure">
            The condition, the variable, the held constants and the epistemic boundary are printed underneath in type. Every
            control is a real button with a pressed state, operable by keyboard, legible with no colour at all, and readable
            when the drawing fails to load. Motion is used only to show that a condition changed while the held material did
            not, and it is switched off under a reduced-motion preference.
          </Aside>
          <p className="at-small" style={{ marginTop: "1.6rem" }}>
            Every decorative mark on these plates is <code className="at-mono">aria-hidden</code> and inert. Where a drawing
            carries an argument, its figure supplies a caption and a linear text equivalent in the document itself. The plates
            print, with the atmosphere removed and the argument kept.
          </p>
          <p className="at-small" style={{ marginTop: "1.4rem" }}>
            Back to <Link href="/atlas">the cover</Link>.
          </p>
        </Section>
      </main>

      <Foot />
    </div>
  );
}
