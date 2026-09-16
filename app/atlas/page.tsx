import Link from "next/link";
import type { Metadata } from "next";
import { findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { CHARACTER, Foot, Masthead, PLATES, characterStyle, type PlateSlug } from "./_components/Frame";
import { OvertureGestalt, OvertureItpra, OvertureProcessing, OvertureTonal } from "./_components/Overture";

export const metadata: Metadata = {
  title: "Atlas — a visual direction for Academic Concept Lab",
};

/* ---------------------------------------------------------------------------
   THE COVER

   Not a card grid, and not four tiles of the same shape in four colours. Each
   record is announced at full editorial weight and identified by its own plate
   — the same drawing that opens its spread — so the cover's differentiation
   comes from the arguments themselves rather than from four hero images.
   ------------------------------------------------------------------------ */

const MARK: Record<PlateSlug, (p: { inline?: boolean }) => React.ReactElement> = {
  "gestalt-principles-in-music": OvertureGestalt,
  "tonal-hierarchy": OvertureTonal,
  "predictive-processing-in-music": OvertureProcessing,
  "hurons-itpra-theory-of-expectation": OvertureItpra,
};

const CAPTION: Record<PlateSlug, string> = {
  "gestalt-principles-in-music":
    "Two organisations over one set of events, and a bracket left open where the record refuses to award the conflict to either cue.",
  "tonal-hierarchy":
    "One mark held on one line, four surrounds at four distances. The note does not move; its role is a relation to what is around it.",
  "predictive-processing-in-music":
    "The same amount of ink, spread wide, and one firm arrival landing outside it. Spread is the quantity; density is not.",
  "hurons-itpra-theory-of-expectation":
    "A single hinge at the outcome, lanes that begin together on it, and one that will not close because it can recur later.",
};

export default function AtlasCover() {
  return (
    <div className="at-page at-spread">
      <Masthead here="/atlas" />

      <main id="at-main">
        <header className="at-cover at-col-wide">
          <span className="at-label at-label--key">Academic Concept Lab · a visual direction · exploration, not production</span>
          <h1 className="at-display at-cover__title" style={{ marginTop: "1.1rem", maxWidth: "16ch" }}>
            Typeset knowledge, drawn thinking.
          </h1>
          <p className="at-lede" style={{ maxWidth: "36rem" }}>
            An academic publication that has become a working surface. The scholarship stays typeset and exact — every
            claim, citation, boundary and qualification survives with the drawing switched off. The drawing appears where
            thought is happening, and nowhere else.
          </p>
        </header>

        <section className="at-col-wide" style={{ marginTop: "2.6rem" }} aria-label="The direction in short">
          <div className="at-register" style={{ marginTop: 0 }}>
            <div className="at-register__row">
              <span className="at-register__term">Two registers</span>
              <div className="at-register__read">
                Type carries the scholarship. Pigment and graphite carry the thinking — grouping, comparing, connecting,
                doubting, bounding, revising. They share every page and never merge into one another.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Colour is material</span>
              <div className="at-register__read">
                A pigment is chosen for how it behaves in the mass, not for what it stands for. The same pigment does
                different work on different plates, and no claim, kind or status is ever encoded by hue.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Density is not evidence</span>
              <div className="at-register__read">
                A darker field is more <i>worked</i>, not more true, more probable, or more brain. Weight of evidence is
                stated in words, in the quiet register, where it can be checked.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Structure from theory</span>
              <div className="at-register__read">
                No plate is a re-skin of another. Composition follows each record&rsquo;s own geometry, so a record about
                competing readings is built out of overlap, and a record about one instant is built around one vertical.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Rhythm</span>
              <div className="at-register__read">
                A plate is loud where an argument is being worked out and quiet where the material is settled. Evidence,
                scope, limits, provenance and sources drop the colour and keep the precision.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Ground</span>
              <div className="at-register__read">
                White, and only white. No paper simulation, no tint, no tape, no aged surface. Grain lives in the mark.
              </div>
            </div>
          </div>
          <p className="at-small" style={{ marginTop: "1.4rem", maxWidth: "44rem" }}>
            <Link href="/atlas/conventions">How to read a spread</Link> sets out what each kind of mark is doing, and what
            none of them is allowed to mean.
          </p>
        </section>

        <section className="at-col-wide" style={{ marginTop: "5rem" }} aria-label="Plates">
          <span className="at-label" style={{ marginBottom: "1.2rem" }}>
            Four plates · music psychology
          </span>
          {PLATES.map((plate, i) => {
            const record = findRecord("theory", plate.slug) as TheoryRecord | undefined;
            if (!record) return null;
            const Mark = MARK[plate.slug];
            return (
              <Link className="at-plate" href={`/atlas/${plate.slug}`} key={plate.slug} style={characterStyle(plate.slug)}>
                <Mark inline />
                <div className="at-plate__body">
                  <div>
                    <span className="at-plate__num">
                      Plate {plate.plate} · {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2>{record.title}</h2>
                    <p className="at-plate__hook">{record.hook}</p>
                    <div className="at-plate__meta">
                      <span className="at-label">{record.knowledgeFormQualifier ?? record.knowledgeForm ?? "theory"}</span>
                      <span className="at-label">{record.statusChip ?? ""}</span>
                    </div>
                  </div>
                  <div>
                    <p className="at-plate__caption" style={{ borderTop: "none", paddingTop: 0, marginTop: "0.5rem" }}>
                      {CAPTION[plate.slug]}
                    </p>
                    <p className="at-small" style={{ marginTop: "1rem", fontSize: "0.86rem" }}>
                      <b>Pigment character.</b> {CHARACTER[plate.slug].note}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="at-col-wide" style={{ marginTop: "4rem" }} aria-label="What this is and is not">
          <span className="at-label">Standing of this exploration</span>
          <div className="at-register">
            <div className="at-register__row">
              <span className="at-register__term">Content</span>
              <div className="at-register__read">
                Every claim, citation, evidence summary, scope statement, limitation, qualification and provenance note on
                these plates is read from the canonical record content. None of it was rewritten for the visual direction,
                and nothing was invented to make a composition work.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Isolation</span>
              <div className="at-register__read">
                These routes, components and stylesheet are new and self-contained. No production route, component,
                stylesheet or record was modified. The production site is unchanged and still live at{" "}
                <Link href="/concept-lab">/concept-lab</Link>.
              </div>
            </div>
            <div className="at-register__row">
              <span className="at-register__term">Not yet decided</span>
              <div className="at-register__read">
                Audio playback, the remaining record kinds — study, method, mechanism — the library and atlas navigation,
                and the other twelve records are outside this exploration. The four plates were chosen because they stress
                the direction in four different ways.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Foot />
    </div>
  );
}
