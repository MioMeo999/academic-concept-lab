import { Topbar, Masthead, Section, Constructed } from "../_components/Frame";
import { ApparatusSpread, Anchor, type Note } from "../_components/Apparatus";
import { Figure, PigmentField, MultiPass, PartialBoundary, RetainedTrace } from "../_components/Marks";
import { ProbeConditions } from "./_components/ProbeConditions";

const NOTES_QUESTION: Note[] = [
  {
    id: "krumhansl",
    kind: "source",
    anchor: "a research programme, not a single experiment",
    body: (
      <>
        Krumhansl and colleagues (1979–1982) establish context-dependent completion judgments, psychological pitch
        organisation beyond frequency distance, and key relations represented through profile similarity.
      </>
    ),
    voice: "Source claim · Krumhansl and colleagues",
  },
  {
    id: "notliking",
    kind: "finding",
    anchor: "how well it fits, not how much you like it",
    body: (
      <>
        The judgment is fit or completion. It is not liking, pleasure, emotional valence, musical ability, or next-event
        probability. Keeping those apart is the whole basis for reading a profile at all.
      </>
    ),
    voice: "Faithful explanation · bounded",
  },
];

const NOTES_PROFILE: Note[] = [
  {
    id: "values",
    kind: "unresolved",
    anchor: "no values are shown here",
    body: (
      <>
        Which exact empirical profile values are safe to display remains unresolved pending direct source verification.
        Nothing on this page is drawn to a scale, and no number is implied by any density.
      </>
    ),
    voice: "Open question · unresolved",
  },
];

const NOTES_INTERPRETATION: Note[] = [
  {
    id: "torus",
    kind: "synthesis",
    anchor: "deliberately not drawn",
    body: (
      <>
        The record calls the key space a psychological similarity representation and not a literal neural map. Drawing
        it would assert a geometry the record declines to assert, so this prototype declines to draw it. That decision
        is Concept Lab’s.
      </>
    ),
    voice: "Concept Lab synthesis",
  },
  {
    id: "butler",
    kind: "unresolved",
    anchor: "a profile is not a process",
    body: (
      <>
        Butler (1989) raises the profile/process and task-interpretation problem. What connects a profile-like
        representation to key recognition as music unfolds is not settled by the profile itself.
      </>
    ),
    voice: "Critical boundary · unresolved",
  },
];

export default function TonalPrototype() {
  return (
    <main className="vr-shell">
      <Topbar here="/visual-reinvention/tonal-hierarchy" />
      <Masthead
        kicker="Prototype 03 · Tonal Hierarchy · control case"
        title="One note, four homes"
        lede="The case this direction should find easy. A single physical pitch is held mechanically constant while the tonal context around it changes, and its function changes with the context. The difficulty is not the comparison — it is keeping three levels apart, and refusing to draw what the record will not claim."
        testing={
          <>
            Whether a genuinely invariant mark under a changed field makes the change of role immediately perceptible;
            whether observed judgment, aggregated profile and psychological interpretation stay in visibly separate
            registers; whether a qualitative hierarchy can be drawn with no values and no axis; and whether the page is
            structurally different from Prototype 02 rather than the same plate with different labels.
          </>
        }
      />

      <ApparatusSpread notes={NOTES_QUESTION}>
        <div className="vr-column">
          <Section label="The question">
            <p>
              Play a tonal context, then play a single pitch after it, and ask how well that pitch completes what came
              before. Ask it again with a different context in front of the same pitch. The physical event has not
              changed at all — same frequency, same duration, same timbre — and yet what it is doing has.
            </p>
            <p>
              That is the claim: tonal function and stability are relational properties of pitch-in-context. It comes
              from <Anchor id="krumhansl">a research programme, not a single experiment</Anchor>, and its central task
              asks <Anchor id="notliking">how well it fits, not how much you like it</Anchor>.
            </p>
            <p>
              The distinction matters more than it first appears. A fit judgment is not liking, not pleasure, not
              emotional valence, not musical ability, and not a judgment about what is likely to happen next. Each of
              those is a different question with a different literature behind it, and a rating scale looks the same in
              all of them. Everything the framework can support rests on keeping them apart.
            </p>
            <p>
              There are also three different objects in play here, and the rest of this page is organised around
              refusing to composite them. There is what a listener judged, once, in one context. There is the pattern
              that appears when that judgment is repeated across every pitch class and many listeners. And there is what
              that pattern is taken to say about how tonal organisation works. Each is a step further from the event and
              a step closer to interpretation.
            </p>
            <p>
              Pitch height and chroma do not disappear when tonal function arrives, either. The record keeps several
              intersecting dimensions rather than one line: the tonic anchor, the rest of the tonic triad, the remaining
              diatonic relations, tones outside the collection, physical height, octave equivalence, and the similarity
              of one key to another. A single vertical scale would flatten all of that into a ranking.
            </p>
          </Section>
        </div>
      </ApparatusSpread>

      <Constructed
        manipulated="the tonal context preceding the probe"
        held="the physical C4 probe itself — register, timbre, loudness, duration — and the position it occupies in every plate"
        boundary="that all listeners produce the same judgement, that fit is liking, or anything about the reader’s ability"
      />

      <Section label="First register — the judgment">
        <Figure
          tone="loud"
          equivalent="Four plates side by side at the same scale. In each, the same probe mark sits in exactly the same position, drawn in the same graphite. Around it, a differently drawn field stands for a different tonal context: dense and near-horizontal for C major, a different direction and pigment for F major, sparser for G major, and sparse, broken and pale for B major. Only the surrounding field differs between the four."
          caption={
            <>
              <b>The mark does not change.</b> It is one definition in the document, placed four times at the identical
              coordinates. Anything you see happening to it is happening in the field around it — which is the point,
              and is also the reason this had to be drawn rather than described. Field density is <b>how much of the
              surrounding context is doing work on this pitch</b>. It is not a rating, a probability, or a measured
              strength.
            </>
          }
        >
          <ProbeConditions />
        </Figure>
      </Section>

      <Section label="Second register — the profile">
        <ApparatusSpread notes={NOTES_PROFILE}>
          <div className="vr-column">
            <p>
              Repeat that judgment across every pitch class and a pattern appears: tonic, then the other members of the
              tonic triad, then the remaining diatonic tones, then the tones outside the collection. That ordering is
              the empirical profile — and it is a different kind of object from any single judgment. One is something a
              listener did once; the other is an aggregate across many.
            </p>
            <p>
              This is where the record stops us from drawing what a designer would want to draw. There is no bar chart
              here, no axis and no numbers, because <Anchor id="values">no values are shown here</Anchor> until the
              exact figures are verified against the primary sources. What can honestly be shown is that the four groups
              differ, and in which direction — so that is all that is drawn.
            </p>
            <p>
              What the bands below show is an ordering and nothing else. Read across them and the direction of the
              difference is legible; try to read a value off any one of them and there is nothing to read, which is the
              intended outcome rather than a missing feature.
            </p>
          </div>
        </ApparatusSpread>

        <Figure
          tone="loud"
          equivalent="Four bands of drawn material stacked vertically, labelled tonic, other tonic-triad tones, other diatonic tones, and tones outside the collection. Each band is built from accumulated strokes, and each has visibly less material than the one above it. There is no scale, no axis, no number and no measured height: only the ordering is shown."
          caption={
            <>
              <b>Ordinal, not cardinal.</b> Each band carries less accumulated material than the one above it, and that
              is the entire claim — these groups differ, in this direction. There is no axis to read a value off, and no
              band has a height that means anything. Drawing the difference without drawing a quantity is exactly what
              the record’s boundary requires here.
            </>
          }
        >
          <svg viewBox="0 0 640 232">
            {(
              [
                ["tonic", 22, 3.0, 0.12, "var(--vr-cobalt)", 11],
                ["other tonic-triad tones", 74, 4.4, 0.26, "var(--vr-cobalt)", 23],
                ["other diatonic tones", 126, 6.6, 0.44, "var(--vr-cobalt)", 37],
                ["tones outside the collection", 178, 11, 0.66, "var(--vr-cobalt)", 53],
              ] as const
            ).map(([label, y, gap, broken, colour, seed]) => (
              <g key={label}>
                <PigmentField
                  id={`prof-${seed}`}
                  x={224}
                  y={y}
                  w={330}
                  h={38}
                  colour={colour}
                  angles={[18, 6]}
                  gap={gap}
                  seed={seed}
                  broken={broken}
                  soft={0.3}
                  pressure={[0.12, 0.44]}
                />
                <text x={210} y={y + 24} textAnchor="end" fontFamily="var(--vr-sans)" fontSize={13} fill="var(--vr-ink)">
                  {label}
                </text>
              </g>
            ))}
            <MultiPass d="M 568 26 L 568 212" colour="var(--vr-hair-strong)" width={1} count={1} seed={9} dash="4 6" />
            <text x={576} y={112} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              no axis
            </text>
            <text x={576} y={126} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              no values
            </text>
            <text x={224} y={226} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              relative and qualitative · the direction of the difference only
            </text>
          </svg>
        </Figure>
      </Section>

      <Section label="Third register — interpretation, and what it does not cover">
        <ApparatusSpread notes={NOTES_INTERPRETATION}>
          <div className="vr-column">
            <p>
              A profile describes an organisation. It does not specify the process that builds, maintains or revises
              one, and <Anchor id="butler">a profile is not a process</Anchor>. As successive chords arrive, earlier
              context stays relevant while new context changes the balance among competing tonal interpretations —
              a relation the record states conceptually and does not reduce to an algorithm.
            </p>
            <p>
              Key relations belong to a third kind of object again: neighbourhoods in a psychological similarity
              representation, not physical distances and not a literal map in the brain. A picture of that space is{" "}
              <Anchor id="torus">deliberately not drawn</Anchor> on this page. Every available way of drawing it —
              rings, orbits, a surface — would assert a geometry the record explicitly declines to assert, and the
              sentence you are reading carries the claim without the risk.
            </p>
            <p>
              That refusal is worth being explicit about, because it is the clearest case on these pages of drawing
              being the wrong instrument. A picture would be more memorable than the sentence and less true than it.
              Where those two come apart, the record decides, not the design.
            </p>
          </div>
        </ApparatusSpread>

        <Figure
          tone="quiet"
          equivalent="Three overlapping accumulations left to right, standing for successive contexts arriving. The earlier ones are still present at reduced pressure beneath the most recent, which is drawn at full pressure. A boundary is drawn around the first as a closed shape labelled snapshot, and around the sequence as an unclosed shape labelled process, with the right-hand edge left open."
          caption={
            <>
              <b>Earlier context does not leave.</b> The reduced pressure on the left means <b>earlier</b> — not weaker,
              not wrong, and not ruled out. The closed boundary marks what a profile is: a snapshot. The open one marks
              what a profile is not: the process by which a key is recognised, maintained or revised over time. That
              edge is left open because the record leaves it open.
            </>
          }
        >
          <svg viewBox="0 0 640 208">
            <RetainedTrace label="earlier contexts still relevant">
              <PigmentField
                id="upd-1"
                x={60}
                y={54}
                w={150}
                h={72}
                colour="var(--vr-violet)"
                angles={[20, 8]}
                gap={4.6}
                seed={13}
                broken={0.24}
                soft={0.4}
                pressure={[0.24, 0.62]}
              />
              <PigmentField
                id="upd-2"
                x={186}
                y={54}
                w={150}
                h={72}
                colour="var(--vr-violet)"
                angles={[-14, -2]}
                gap={4.8}
                seed={31}
                broken={0.26}
                soft={0.4}
                pressure={[0.24, 0.62]}
              />
            </RetainedTrace>
            <PigmentField
              id="upd-3"
              x={312}
              y={54}
              w={170}
              h={72}
              colour="var(--vr-cobalt)"
              angles={[26, 12]}
              gap={5.4}
              seed={57}
              broken={0.2}
              soft={0.36}
              pressure={[0.22, 0.58]}
            />

            <MultiPass d="M 56 42 L 214 42 L 214 138 L 56 138 Z" colour="var(--vr-graphite)" width={1.1} count={2} seed={71} />
            <text x={56} y={166} fontFamily="var(--vr-sans)" fontSize={12} fill="var(--vr-ink)">
              snapshot — closed
            </text>
            <text x={56} y={181} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              what a profile describes
            </text>

            <PartialBoundary x={44} y={30} w={560} h={120} open="right" colour="var(--vr-graphite)" seed={83} inset={150} width={1.4} />
            <text x={330} y={166} fontFamily="var(--vr-sans)" fontSize={12} fill="var(--vr-ink)">
              process — left open
            </text>
            <text x={330} y={181} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              how a key is recognised, maintained or revised is not specified by the profile
            </text>
            <text x={60} y={26} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              earlier context · still relevant
            </text>
            <text x={330} y={26} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              new context · changes the balance
            </text>
          </svg>
        </Figure>
      </Section>

      <hr className="vr-rule" />

      <Section label="Where this record stops">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              It explains context-dependent fit, relative stability, tonic centrality, the differentiation of tonal
              functions, psychological pitch relations, key similarity, and how tonal organisation changes as music
              unfolds. It stops short of all melody perception, all harmonic processing, all expectation,
              emotion and preference, universal tonality, complete key finding, and any literal geometry of key space in
              the brain.
            </p>
            <p>
              Two further boundaries are load-bearing and easy to lose. Western major/minor organisation is not
              universal tonal cognition; immediate context and culturally specific relations both matter, and one study
              of developmental differentiation is not an innate universal staircase.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
