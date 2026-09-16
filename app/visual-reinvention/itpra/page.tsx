import { Topbar, Masthead, Section, Constructed } from "../_components/Frame";
import { ApparatusSpread, Anchor, type Note } from "../_components/Apparatus";
import { Figure, MultiPass, PigmentField } from "../_components/Marks";
import { Hinge } from "./_components/Hinge";

const NOTES: Note[] = [
  {
    id: "huron",
    kind: "source",
    anchor: "five functionally distinct response systems",
    body: (
      <>
        Huron (2006) proposes Imagination, Tension, Prediction, Reaction and Appraisal as functionally distinct
        responses with different temporal positions. A proposal about function is not a demonstration of five isolated
        physiological modules.
      </>
    ),
    voice: "Source claim · Huron",
  },
  {
    id: "acronym",
    kind: "synthesis",
    anchor: "the acronym is not the architecture",
    body: (
      <>
        Reading ITPRA as a sequence <span className="vr-mono">I → T → P → R → A</span> is a mnemonic artefact. Keeping
        the hinge, the parallelism and the slower tail visible without a five-stage timeline is a Concept Lab
        arrangement, not a source figure.
      </>
    ),
    voice: "Concept Lab synthesis",
  },
  {
    id: "steinbeis",
    kind: "finding",
    anchor: "subjective, physiological and neural consequences",
    body: (
      <>
        Steinbeis, Koelsch &amp; Sloboda (2006) report consequences of expected and unexpected harmonic events across
        subjective, physiological and neural measures. This is <b>not</b> a direct test of the five systems, and not a
        demonstration of contrastive valence as a mechanism.
      </>
    ),
    voice: "Reported finding · bounded",
  },
  {
    id: "hinge",
    kind: "constructed",
    anchor: "the plate below",
    body: (
      <>
        The plate is a Concept Lab construction. The timing control changes outcome onset and holds the outcome, the
        preceding context, pitch, harmony, timbre, gain and tone duration constant. The lens control changes only the
        question asked. Neither can measure tension, reaction, appraisal, reinforcement, or any state of the reader.
      </>
    ),
    voice: "Constructed teaching example",
  },
  {
    id: "operational",
    kind: "unresolved",
    anchor: "cannot yet be cleanly separated",
    body: (
      <>
        Whether the five responses can be operationalised or distinguished without assuming five independent
        physiological modules is unresolved in the record — as is which parts of the temporal architecture are
        approximate functional timing and which have independent evidence.
      </>
    ),
    voice: "Open question · unresolved",
  },
];

export default function ItpraPrototype() {
  return (
    <main className="vr-shell">
      <Topbar here="/visual-reinvention/itpra" />
      <Masthead
        kicker="Prototype 02 · Huron’s ITPRA Theory of Expectation · adversarial case"
        title="One outcome, and everything that happens around it"
        lede="The record this direction is least suited to. Its structure is temporal, but a ruled timeline of five stages would assert an algorithm and five isolated modules that the evidence does not support. The problem is to make simultaneity and revision perceptible without either."
        testing={
          <>
            Whether Prediction and Reaction can be shown beginning together without implying a sequence; whether a later
            Appraisal can revise an earlier response without appearing to erase or refute it; whether the four
            expectation sources stay concurrent rather than becoming four earlier stages; and whether the result is
            structurally different from Prototype 03 rather than the same plate with different labels.
          </>
        }
      />

      <ApparatusSpread notes={NOTES}>
        <div className="vr-column">
          <Section label="What the theory is for">
            <p>
              Something is about to happen in the music. Before it arrives, a listener can imagine possible outcomes and
              can prepare for one. When it arrives, two questions open at once: how good the forecast was, and what to
              do now. Later — and more slowly — a third question can revise what the event meant.
            </p>
            <p>
              Huron’s account names <Anchor id="huron">five functionally distinct response systems</Anchor>. They differ
              in what they are for and in where they sit relative to the outcome, and{" "}
              <Anchor id="acronym">the acronym is not the architecture</Anchor>: Prediction and Reaction begin in
              parallel after onset, and Appraisal forms a slower tail that can recur. Prediction is also not the
              prediction. The forecast is formed before onset; the Prediction response is the assessment of it
              afterwards.
            </p>
            <p>
              The evidence around this is real but oblique. Expectancy-violation work reports{" "}
              <Anchor id="steinbeis">subjective, physiological and neural consequences</Anchor> of unexpected harmonic
              events, and later work reports a nonlinear relationship among uncertainty, surprise and pleasure. None of
              it tests five systems directly, and the five{" "}
              <Anchor id="operational">cannot yet be cleanly separated</Anchor> in the way the names suggest.
            </p>
          </Section>
        </div>
      </ApparatusSpread>

      <Constructed
        manipulated="outcome timing, and separately the interpretive question asked of the same outcome"
        held="the musical outcome and its identity, the preceding context, pitch, harmony, timbre, gain and tone duration"
        boundary="physiological latency, measured tension, reaction, appraisal, reinforcement, emotional state, or anything about the reader"
      />

      <Figure
        tone="loud"
        equivalent="Described in full in the plate's own description."
        caption={
          <>
            <b>The hinge.</b> One firm line, because outcome onset is the one thing the record is firm about. Everything
            else is drawn as an extent with soft or missing edges, because
            the record’s temporal ordering is functional and approximate. Imagination has no left edge; Appraisal has no
            right edge. Prediction and Reaction leave a single shared origin at the same weight — there is no first one.
            The four expectation sources run the whole width and cross the hinge, because they are a parallel layer, not
            four earlier stages.
          </>
        }
      >
        <Hinge />
      </Figure>

      <Section label="Revision without erasure">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              The hardest thing to draw here is that a later appraisal can change what an outcome means while the
              earlier response remains a real thing that happened. An unexpected event can be evaluated one way at onset
              and differently once its context is available. Huron’s contrastive-valence proposal is one route by which
              that can produce a positive experience — a proposal, not a universal mechanism, and not a complete account
              of musical pleasure.
            </p>
          </div>
        </div>

        <Figure
          tone="loud"
          equivalent="At the outcome onset, an initial response is drawn as a firm mark below the line. Later along the same band, an appraisal is drawn as a separate mark above the line, in a different pigment. A stroke connects the two, curving from the earlier to the later. The earlier mark is not faded out, cancelled or crossed through: it stays fully drawn, and a label states that it still stands."
          caption={
            <>
              <b>The earlier response is not erased.</b> It is still fully drawn, and it is still where it was. Only its
              meaning has been revisited. This is the one place on the page where a prior state is deliberately kept
              visible; it is kept at full pressure rather than reduced, because the record says the prior response is
              not cancelled by the later one.
            </>
          }
        >
          <svg viewBox="0 0 640 190">
            <MultiPass d="M 96 26 L 96 158" colour="var(--vr-graphite)" width={2.2} count={2} seed={21} />
            <text x={104} y={22} fontFamily="var(--vr-sans)" fontSize={12} fill="var(--vr-ink)">
              outcome onset
            </text>

            <PigmentField
              id="cv-early"
              x={84}
              y={100}
              w={92}
              h={54}
              colour="var(--vr-vermilion)"
              angles={[-18, 24]}
              gap={3.6}
              seed={41}
              broken={0.24}
              soft={0.34}
              pressure={[0.14, 0.5]}
            />
            <text x={90} y={172} fontFamily="var(--vr-sans)" fontSize={12} fill="var(--vr-vermilion)">
              initial predictive / reactive response
            </text>

            <path
              d="M 178 120 C 250 118 268 84 340 74"
              stroke="var(--vr-ink-faint)"
              strokeWidth={1.4}
              strokeDasharray="6 6"
              fill="none"
            />
            <text x={214} y={110} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              revisited later
            </text>

            <PigmentField
              id="cv-late"
              x={340}
              y={44}
              w={168}
              h={54}
              colour="var(--vr-emerald)"
              angles={[12, -22]}
              gap={4}
              seed={73}
              broken={0.3}
              soft={0.4}
              pressure={[0.12, 0.44]}
            />
            <text x={344} y={34} fontFamily="var(--vr-sans)" fontSize={12} fill="var(--vr-emerald)">
              appraisal · a different evaluation of the same event
            </text>

            <path
              d="M 84 158 L 176 158"
              stroke="var(--vr-vermilion)"
              strokeWidth={1.6}
              fill="none"
              strokeLinecap="round"
            />
            <text x={84} y={186} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-faint)">
              still standing · not cancelled, not crossed out, not faded
            </text>
            <text x={520} y={128} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ochre)">
              ? contrastive valence is a
            </text>
            <text x={520} y={143} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ochre)">
              proposal, not a universal
            </text>
            <text x={520} y={158} fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ochre)">
              pleasure mechanism
            </text>
          </svg>
        </Figure>
      </Section>

      <Section label="Sources that disagree with each other">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              The source layer is where the record resists the tidiest reading. Schematic, veridical, dynamic and
              conscious expectations operate concurrently, and they can conflict: a listener can veridically expect —
              from knowing the piece — exactly the event that is schematically unexpected. That is one event, two
              simultaneous and incompatible expectations, and no arbitration.
            </p>
            <p>
              This is why the source layer on the plate crosses the hinge rather than sitting before it, and why two of
              its four channels are drawn running against each other. Nothing in the record licenses ranking them.
            </p>
          </div>
          <aside className="vr-margin">
            <div className="vr-apparatus">
              <div className="vr-note">
                <span className="vr-glyph vr-glyph--unresolved" aria-hidden="true">
                  ?
                </span>
                <div className="vr-note__body">
                  How the four sources interact in a particular event is an open question in the record. The plate shows
                  them concurrent; it does not show how they combine, because that is not established.
                  <span className="vr-note__voice">Open question · unresolved</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <hr className="vr-rule" />

      <Section label="What this plate refuses to do">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              It does not put five stages in a row. It does not box the responses, because boxes would make them look
              like five separate mechanisms with edges. It does not give them equal widths, because they are not
              comparable durations. It does not draw a time axis, a tick, a unit or a scale, because the ordering is
              functional and approximate and any axis would invite a reader to measure it.
            </p>
            <p>
              It does not let Prediction precede Reaction, or Reaction precede Prediction. They leave the same point.
              And it does not close Imagination on the left or Appraisal on the right, because the record says one
              reaches furthest back and the other extends later and can recur.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
