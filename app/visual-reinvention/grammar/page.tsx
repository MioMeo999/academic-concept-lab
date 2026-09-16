import { Topbar, Masthead, Section, Constructed } from "../_components/Frame";
import { ApparatusSpread, Anchor, type Note } from "../_components/Apparatus";
import { Figure, PartialBoundary, HatchField } from "../_components/Marks";
import { GestaltCues } from "./_components/GestaltCues";
import { Pragnanz } from "./_components/Pragnanz";

const NOTES: Note[] = [
  {
    id: "wertheimer",
    kind: "source",
    anchor: "the classical tradition",
    body: (
      <>
        Wertheimer (1923) and the classical tradition establish the historical grouping problem — proximity, similarity,
        auditory extension, whole–part organisation. They do not establish a fixed modern law list or a complete theory
        of music.
      </>
    ),
    voice: "Source claim · Wertheimer, Koffka, Wagemans",
  },
  {
    id: "frankland",
    kind: "finding",
    anchor: "unevenly, and not equally",
    body: (
      <>
        Frankland &amp; Cohen (2004): <b>in the tested materials</b>, Rest and Attack-point predicted boundaries more
        usefully than Register-change and Length-change. This does not establish equal contribution of all rules,
        universal proximity dominance, or direct validation of classical Gestalt.
      </>
    ),
    voice: "Reported finding · bounded by material",
  },
  {
    id: "conditions",
    kind: "constructed",
    anchor: "three conditions below",
    body: (
      <>
        The conditions are a Concept Lab construction. They change temporal spacing, register, or both, and hold the
        note sequence, tone duration, timbre and gain constant. They are not a perceptual experiment, a historical
        replication, or a measurement of the reader.
      </>
    ),
    voice: "Constructed teaching example",
  },
  {
    id: "branch",
    kind: "synthesis",
    anchor: "candidate organisations",
    body: (
      <>
        The pathway <span className="vr-mono">events → candidate organisations → reinforcement / competition →
        preferred, unstable or ambiguous grouping → groups of groups</span> is a Concept Lab arrangement of the
        record’s material. It is not a source-authored figure.
      </>
    ),
    voice: "Concept Lab synthesis",
  },
  {
    id: "open",
    kind: "unresolved",
    anchor: "no cue has universal priority",
    body: (
      <>
        Which grouping tendencies generalise across materials and listeners, and how much listener variation is
        attributable to experience, culture, task or material, remain open in the record. Cue weights are not settled.
      </>
    ),
    voice: "Open question · unresolved",
  },
];

export default function GrammarPrototype() {
  return (
    <main className="vr-shell">
      <Topbar here="/visual-reinvention/grammar" />
      <Masthead
        kicker="Prototype 01 · Gestalt Principles in Music"
        title="A fragment, with its apparatus"
        lede="A working scholarly passage in which the proposed material behaviours are doing intellectual work: a held mark, a changed arrangement, an overlap, an ambiguity, a partial boundary, a retained trace, and an apparatus attached to particular claims."
        testing={
          <>
            Whether drawing and typesetting genuinely coexist rather than one decorating the other; whether attachment
            and attribution are legible without a second visual cipher; and whether accumulated pigment reads as{" "}
            <i>amount of claim in play</i> rather than as strength of evidence.
          </>
        }
      />

      <ApparatusSpread notes={NOTES}>
        <div className="vr-column">
          <Section label="The problem">
            <p>
              Separate musical events do not stay separate. They become groups, boundaries, figures and larger wholes.
              The question the record asks is how relations in time, pitch, intensity, timbre, articulation and duration
              influence the organisation a listener experiences — and it asks it without assuming that any one
              organisation is objectively correct.
            </p>
            <p>
              This is not a list of laws. <Anchor id="wertheimer">The classical tradition</Anchor> set up a relational,
              graded and context-sensitive problem; the modern habit of reducing it to five rules with universal
              thresholds is a later simplification the record actively blocks. Events supply relations; relations
              support <Anchor id="branch">candidate organisations</Anchor>; those candidates can reinforce one another,
              compete, or leave the organisation unresolved.
            </p>
          </Section>

          <Section label="Cues, and what happens when they disagree">
            <p>
              A larger gap between two events can propose a boundary. So can a step in register. When both are present
              and both propose the same boundary, they reinforce. When they propose different boundaries, they compete —
              and <Anchor id="open">no cue has universal priority</Anchor> in this record. Where later formal grouping
              rules have been tested against listener segmentation, the correspondence has been{" "}
              <Anchor id="frankland">unevenly, and not equally</Anchor>, distributed across rules.
            </p>
            <p>
              The <Anchor id="conditions">three conditions below</Anchor> hold the seven-event sequence constant and
              change only the spacing, the register, or both. In the third, the two cues are made to disagree — and the
              record does not require one of them to win.
            </p>
          </Section>
        </div>
      </ApparatusSpread>

      <Constructed
        manipulated="temporal spacing, register, or both"
        held="the seven-event sequence, tone duration, timbre, gain, and the surrounding construction"
        boundary="a universal boundary, a perceptual score, a judgement of the reader’s musical ability, or a replication of any published experiment"
      />

      <Figure
        tone="loud"
        equivalent="Three stacked conditions at the same scale. In each, seven identical event marks are placed on a common horizontal line. In the first, a larger gap after the third event supports one boundary. In the second, spacing is even and a register step after the third event supports the same boundary. In the third, the gap falls after the third event and the register step after the fourth, so the two drawn fields disagree and cross."
        caption={
          <>
            <b>One mark, three arrangements.</b> The event glyph is defined once and placed with <code>use</code>, so
            every event in every condition is mechanically the same mark — it is re-used, never re-drawn. What changes
            is the arrangement, because in this record the arrangement is the variable. The drawn fields are{" "}
            <b>candidate organisations</b>, and in the third condition the darker band is where two of them overlap.
            Density here is <b>how much is in play</b>, not how strong anything is.
          </>
        }
      >
        <GestaltCues />
      </Figure>

      <Section label="What the whole does to the part">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              The relation runs in both directions. Local cues contribute to the whole that is experienced, and the whole
              constrains the role a part can have inside it. The same event is not the same perceptual object in two
              different organisations. That mutual constraint is why the record refuses a one-way pipeline from cue to
              result, and why an unresolved case is a legitimate outcome rather than a failure of the example.
            </p>
            <p>
              Organisation is also not yet expectation. Good continuation asks how an unfolding pattern is organised;
              what that organisation implies for what comes next is a different question, belonging to a different
              record. Closure is not automatically cadence, tonic resolution, expectancy fulfilment, or emotional
              release.
            </p>
          </div>
        </div>
      </Section>

      <Pragnanz />

      <Section label="Where this record stops">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              A scope statement is a claim about a boundary, so it is drawn as one — and drawn open, because the record
              stops here without asserting that nothing lies beyond.
            </p>
          </div>
        </div>

        <Figure
          tone="quiet"
          equivalent="A boundary drawn around the record's stopping points, deliberately left unclosed on the right-hand side. Inside it: complete musical grammar, tonality, musical expectancy, affect, auditory source recovery, whole-piece formal analysis, one objectively correct segmentation, and universal grouping thresholds."
          caption={
            <>
              <b>A partial boundary.</b> The unclosed edge is not an unfinished drawing. It states that the record stops
              here rather than that the territory ends here. Neighbouring records — Auditory Scene Analysis, Meyer,
              Tonal Hierarchy, GTTM — take up what lies past the opening, and each remains a separate question.
            </>
          }
        >
          <svg viewBox="0 0 640 168">
            <defs>
              <clipPath id="scope-clip">
                <rect x={30} y={26} width={560} height={116} />
              </clipPath>
            </defs>
            <HatchField
              x={30}
              y={26}
              w={560}
              h={116}
              angle={62}
              gap={13}
              seed={97}
              broken={0.55}
              weight={0.7}
              pressure={[0.1, 0.24]}
              colour="var(--vr-graphite)"
              clipId="scope-clip"
              ramp="toEnd"
            />
            <PartialBoundary x={26} y={22} w={572} h={124} open="right" colour="var(--vr-graphite)" seed={44} inset={150} />
            <g fontFamily="var(--vr-sans)" fontSize={13} fill="var(--vr-ink)">
              <text x={52} y={54}>complete musical grammar</text>
              <text x={52} y={76}>tonality · musical expectancy · affect</text>
              <text x={52} y={98}>auditory source recovery</text>
              <text x={52} y={120}>whole-piece formal analysis</text>
              <text x={310} y={54}>one objectively correct segmentation</text>
              <text x={310} y={76}>universal grouping thresholds</text>
            </g>
            <text x={452} y={120} fontFamily="var(--vr-sans)" fontSize={12} fill="var(--vr-ink-faint)">
              the record stops; the question does not
            </text>
          </svg>
        </Figure>
      </Section>

      <hr className="vr-rule" />

      <Section label="What the drawing is, and is not, doing">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              There is no second vocabulary to learn on this page. Responsibility for every claim is carried by the
              canonical glyphs and their words in the margin: <span className="vr-mono">●</span> a source-grounded
              claim, <span className="vr-mono">■</span> a bounded empirical finding, <span className="vr-mono">▲</span>{" "}
              a constructed teaching example, <span className="vr-mono">✦</span> a Concept Lab arrangement,{" "}
              <span className="vr-mono">?</span> something unresolved. Those five, and the sentences beside them, are
              the whole provenance system.
            </p>
            <p>
              Drawing does four things here, and each is stated where it happens rather than encoded in a key. It{" "}
              <b>holds</b> a mark constant so that a changed arrangement is inspectable. It <b>establishes a field</b> so
              that a candidate organisation has an extent. It <b>leaves a boundary open</b> where the record declines to
              close one. And it <b>retains a prior state</b> where the record’s own argument depends on an earlier
              formulation still being present. Colour separates one drawn field from another; it does not tell you what
              kind of claim you are reading.
            </p>
          </div>
          <aside className="vr-margin">
            <div className="vr-apparatus">
              <div className="vr-note">
                <span className="vr-glyph vr-glyph--unresolved" aria-hidden="true">
                  ?
                </span>
                <div className="vr-note__body">
                  Whether accumulated pigment can be kept from reading as evidential strength is the open question this
                  prototype exists to answer. Findings are recorded in the Phase B2 document.
                  <span className="vr-note__voice">Concept Lab · unresolved</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
