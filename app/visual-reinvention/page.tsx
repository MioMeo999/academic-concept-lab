import Link from "next/link";
import { Topbar } from "./_components/Frame";

const ITEMS = [
  {
    href: "/visual-reinvention/grammar",
    num: "01",
    title: "Visual grammar in use",
    record: "Gestalt Principles in Music",
    what:
      "Held mark, changed surround, overlap, ambiguity, partial boundary, retained trace, attached apparatus and provenance glyphs, all doing real work inside a scholarly fragment. Not a swatch sheet.",
  },
  {
    href: "/visual-reinvention/itpra",
    num: "02",
    title: "The outcome hinge",
    record: "Huron’s ITPRA Theory of Expectation",
    what:
      "The adversarial case. Simultaneity and revision without a five-stage timeline: Prediction and Reaction must begin together, Appraisal must revise without erasing, and the expectation sources must stay concurrent.",
  },
  {
    href: "/visual-reinvention/tonal-hierarchy",
    num: "03",
    title: "One note, four homes",
    record: "Tonal Hierarchy",
    what:
      "The control case. A mechanically identical C4 under four tonal contexts, with judgment, profile and interpretation held apart, no invented profile values, and no rings, orbits or torus.",
  },
  {
    href: "/visual-reinvention/quiet",
    num: "04",
    title: "Quiet scholarship",
    record: "Predictive Processing in Music",
    what:
      "Evidence, scope, limitations, provenance, sources and relations. No cards, no grey panels, no bibliography dump. Testing whether quiet reads as rigorous rather than abandoned.",
  },
  {
    href: "/visual-reinvention/rhythm",
    num: "05",
    title: "One page, end to end",
    record: "Predictive Processing in Music",
    what:
      "The page-wide argument: conceptual intensity → interaction → interpretation → quiet evidence → limitations → provenance. Where colour accumulates, where drawing stops, and where the reader is given silence.",
  },
];

export default function VisualReinventionIndex() {
  return (
    <main className="vr-shell">
      <Topbar here="/visual-reinvention" />
      <header className="vr-masthead">
        <span className="vr-label vr-masthead__kicker">Academic Concept Lab · Phase B2</span>
        <h1 className="vr-display">Conditions and Apparatus</h1>
        <p className="vr-lede">
          Five isolated prototypes testing whether the ratified direction survives contact with real record content.
          Nothing here is production. No canonical route, component, stylesheet or record has been modified.
        </p>
      </header>

      <div className="vr-spread">
        <div className="vr-column">
          <p>
            The direction under test is a bounded synthesis: <b>conditions</b> as an epistemic operation — hold, vary,
            compare, inspect, recontextualise — inside a <b>critical apparatus</b> where interventions attach to
            specific claims and intellectual voice stays attributable, with a single bounded{" "}
            <b>retained-trace</b> device for coexistence, revision and prior states.
          </p>
          <p>
            Four calibrations govern these prototypes. Condition is an operation, not a metaphysics, so no comparison is
            manufactured where the knowledge does not license one. The apparatus is attachment and attribution, not a
            second cipher: the canonical glyphs <span className="vr-mono">● ■ ▲ ✦ ?</span> and their words stay
            authoritative, and colour remains drawing material. A mark must do intellectual work, but that work includes
            establishing a field, exposing ambiguity, marking a boundary and carrying the rhythm of a passage — not only
            differencing two conditions. And reduced pressure means <i>prior</i>, never <i>false</i>.
          </p>
        </div>
        <aside className="vr-margin">
          <div className="vr-apparatus">
            <div className="vr-note">
              <span className="vr-glyph vr-glyph--constructed" aria-hidden="true">
                ▲
              </span>
              <div className="vr-note__body">
                Every drawing on these pages is a Concept Lab construction. None is a source-authored figure, and none
                reports a measurement.
                <span className="vr-note__voice">Concept Lab · constructed</span>
              </div>
            </div>
            <div className="vr-note">
              <span className="vr-glyph vr-glyph--unresolved" aria-hidden="true">
                ?
              </span>
              <div className="vr-note__body">
                Material conventions here are hypotheses under test, not settled meanings. Findings are recorded in the
                Phase B2 prototype findings document.
                <span className="vr-note__voice">Concept Lab · unresolved</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="vr-index">
        {ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="vr-index__item">
            <span className="vr-index__num">{item.num}</span>
            <span>
              <span className="vr-index__title">{item.title}</span>
              <span className="vr-label" style={{ display: "block", marginBottom: "0.45rem" }}>
                {item.record}
              </span>
              <span className="vr-index__what">{item.what}</span>
            </span>
          </Link>
        ))}
      </div>

      <p className="vr-figure__caption" style={{ marginTop: "2.6rem" }}>
        Content is drawn from the frozen Phase A semantic handoff. No academic claim, effect, mechanism or historical
        relation is asserted beyond it, no open question is resolved, and no numerical value has been invented.
      </p>
    </main>
  );
}
