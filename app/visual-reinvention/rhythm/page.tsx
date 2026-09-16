import { Topbar, Masthead, Constructed } from "../_components/Frame";
import { ApparatusSpread, Anchor, type Note } from "../_components/Apparatus";
import { Figure, PartialBoundary, PigmentField, MultiPass } from "../_components/Marks";
import { Evidence, Source, ProvenanceRow, Relation } from "../quiet/_components/QuietBlocks";
import { Precision, Omission } from "./_components/PrecisionOmission";

/**
 * The page-wide argument.
 *
 * Six movements, each with a declared tempo. Chroma is highest at the opening
 * and gone by the end; drawing stops entirely two movements before the page
 * does; and the silences between movements are real measured space, not
 * padding. The tempo marks are visible on the page on purpose — this prototype
 * exists to be judged as a sequence, so it states what it thinks it is doing.
 */

const NOTES: Note[] = [
  {
    id: "generative",
    kind: "source",
    anchor: "a generative model, not a next-note guesser",
    body: (
      <>
        The framework concerns predictions about hidden or lower-level states and their relation to incoming evidence.
        It is broader than next-note guessing, and a generative model is not generative AI.
      </>
    ),
    voice: "Source claim · predictive-coding accounts",
  },
  {
    id: "precision",
    kind: "constructed",
    anchor: "the two plates below",
    body: (
      <>
        Constructed. The target event, its pitch, duration, timbre, gain and its <span className="vr-mono">+120 ms</span>{" "}
        displacement are held; only the constructed uncertainty envelope changes. No neural response, brain
        distribution or conscious confidence is measured.
      </>
    ),
    voice: "Constructed teaching example",
  },
  {
    id: "notdefinition",
    kind: "unresolved",
    anchor: "not prediction error by definition",
    body: (
      <>
        MMN and MMNm, ERAN, P3-related signals and omission responses are compatible with predictive accounts. A
        compatible signal does not identify the computation that produced it, and what would distinguish them is open.
      </>
    ),
    voice: "Open question · unresolved",
  },
];

function Movement({
  tempo,
  label,
  children,
}: {
  tempo: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="vr-movement">
      <div className="vr-movement__meta">
        <span className="vr-label">{label}</span>
        <span className="vr-tempo">{tempo}</span>
      </div>
      {children}
    </section>
  );
}

export default function RhythmPrototype() {
  return (
    <main className="vr-shell">
      <Topbar here="/visual-reinvention/rhythm" />
      <Masthead
        kicker="Prototype 05 · Predictive Processing in Music · the whole page"
        title="Loud, then quiet"
        lede="One record read end to end: conceptual intensity, then interaction, then interpretation, then evidence, then limitations, then provenance. The question is not whether any single passage is good. It is whether the sequence has a tempo."
        testing={
          <>
            Where colour accumulates and where it disappears; where drawing stops and typography takes over; whether the
            reader is given cognitive silence at the right moments; and whether the quiet end reads as the calm part of
            one argument rather than as the part where the design ran out.
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      <Movement label="First movement · the claim" tempo="loudest · full chroma · drawing leads">
        <ApparatusSpread notes={NOTES}>
          <div className="vr-column">
            <p>
              Perception can be modelled as an interaction between predictions about hidden or lower-level states and
              the sensory evidence arriving. What matters is not the evidence alone but its relation to what was
              expected — and how much that relation is allowed to count.
            </p>
            <p>
              This is <Anchor id="generative">a generative model, not a next-note guesser</Anchor>. Mismatch between
              model and input can carry information for inference, attention, learning or revision. Precision — how
              reliable the model treats the incoming evidence as being — changes how much a given mismatch influences
              what happens next. Error is not failure, and it is not dislike.
            </p>
          </div>
        </ApparatusSpread>

        <Figure
          tone="loud"
          equivalent="A dense chromatic accumulation: a broad field of blue material standing for the model's predictions, meeting a narrower field of red standing for arriving evidence, with the region where they overlap drawn more densely than either. Above the overlap, the word mismatch; beneath it, weighted by precision. Nothing is boxed and no arrow asserts a circuit."
          caption={
            <>
              <b>The densest drawing on the page, and the only one this large.</b> The overlap is darker because two
              things are in play there, not because anything is stronger. There is no circuit here, no anatomy, and no
              claim that any of this maps to a fixed cortical hierarchy.
            </>
          }
        >
          <svg viewBox="0 0 640 260">
            <PigmentField
              id="rh-model"
              x={30}
              y={30}
              w={340}
              h={150}
              colour="var(--vr-cobalt)"
              angles={[22, 9]}
              gap={3.1}
              seed={17}
              broken={0.2}
              soft={0.44}
              pressure={[0.15, 0.5]}
            />
            <PigmentField
              id="rh-input"
              x={286}
              y={62}
              w={320}
              h={150}
              colour="var(--vr-vermilion)"
              angles={[-24, -9]}
              gap={3.4}
              seed={43}
              broken={0.24}
              soft={0.44}
              pressure={[0.13, 0.46]}
            />
            <text x={44} y={24} fontFamily="var(--vr-sans)" fontSize={13} fill="var(--vr-cobalt)">
              generative model · prediction
            </text>
            <text x={606} y={232} textAnchor="end" fontFamily="var(--vr-sans)" fontSize={13} fill="var(--vr-vermilion)">
              arriving evidence
            </text>
            <MultiPass d="M 328 96 L 328 158" colour="var(--vr-graphite)" width={1.2} count={1} seed={11} dash="5 6" />
            <text x={336} y={92} fontFamily="var(--vr-sans)" fontSize={13} fill="var(--vr-ink)">
              mismatch
            </text>
            <text x={336} y={174} fontFamily="var(--vr-sans)" fontSize={11.5} fill="var(--vr-ink-soft)">
              weighted by precision
            </text>
          </svg>
        </Figure>
      </Movement>

      <div className="vr-silence" />

      {/* ---------------------------------------------------------------- */}
      <Movement label="Second movement · the comparison" tempo="loud · chroma narrowing to one pigment · drawing and control together">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              The same deviation can matter more or less depending on how certain the model was. That is the claim, and
              it is exactly the kind of claim a reader should be able to put pressure on rather than take on trust.
            </p>
          </div>
        </div>
        <Constructed
          manipulated="the width of the constructed uncertainty envelope"
          held="the same target event, pitch, duration, timbre, gain, and the same +120 ms displacement"
          boundary="any neural response magnitude, brain distribution, or measurement of conscious confidence"
        />
        <Precision />
      </Movement>

      <div className="vr-silence" />

      {/* ---------------------------------------------------------------- */}
      <Movement label="Third movement · the interesting case" tempo="quieter · one pigment · the drawing all but disappears">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              If prediction is doing real work, then an event that does not arrive is still something. Silence at a
              position the model predicted is a mismatch — and this is where drawing has to do the one thing prose
              cannot, because a described absence is just an absence.
            </p>
          </div>
        </div>
        <Omission />
      </Movement>

      <div className="vr-silence vr-silence--deep" />

      {/* ---------------------------------------------------------------- */}
      <Movement label="Fourth movement · what the evidence did" tempo="quiet · graphite only · no pigment from here on">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              Two of the record’s six sources, at the level of detail that keeps a claim attached to what produced it.
              This is the same intellectual grammar as the comparisons above — what was held, what varied, what that
              licenses — at a much lower temperature.
            </p>
          </div>
        </div>

        <Evidence
          cite={
            <>
              Vuust, P. et al. (2009). <em>Rhythmic incongruity and expertise.</em>
            </>
          }
          kind="Empirical study"
          fields={[
            { key: "Tested", value: "Responses to rhythmic incongruity, and differences associated with musical expertise." },
            { key: "Found", value: "Expertise differences in MMNm and P3am responses to rhythmic incongruity." },
            {
              key: "Not tested",
              limit: true,
              value: "A complete predictive-processing circuit; a neural precision parameter; any causal result of training.",
            },
          ]}
        />
        <Evidence
          cite={
            <>
              Ishida, K., Ishida, K. &amp; Nittono, H. (2024). <em>Information during an omission period.</em>
            </>
          }
          kind="Empirical study"
          fields={[
            { key: "Tested", value: "Whether information about the identity of an expected note is present during the omission period." },
            {
              key: "Found",
              value: "Omission-period information about expected-note identity, with differences by familiarity of context.",
            },
            {
              key: "Not tested",
              limit: true,
              value:
                "Proof of the full architecture, or a uniquely identified pure prediction-error signal. Familiarity conditions differed in more than the melody.",
            },
          ]}
        />
      </Movement>

      <div className="vr-silence" />

      {/* ---------------------------------------------------------------- */}
      <Movement label="Fifth movement · where it stops" tempo="quietest · one graphite mark, and then none">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              A signal compatible with a predictive account is <Anchor id="notdefinition">not prediction error by
              definition</Anchor>. That sentence is the most important one on this page, and it is deliberately given no
              drawing at all — the page has run out of chroma by the time the reader reaches it, and the sentence has
              to carry itself.
            </p>
          </div>
        </div>

        <Figure
          tone="quiet"
          equivalent="A graphite boundary around the record's stopping points, left unclosed on the right: a complete account of all music, of emotion, reward and aesthetics, of culture, social interaction and creativity, and of every neural computation."
          caption={
            <>
              <b>The last mark on the page.</b> Everything after this is typeset. The edge is open because the record
              stops here rather than because the territory ends here.
            </>
          }
        >
          <svg viewBox="0 0 640 128">
            <PartialBoundary x={24} y={16} w={576} h={94} open="right" colour="var(--vr-graphite)" seed={19} inset={168} />
            <g fontFamily="var(--vr-sans)" fontSize={13} fill="var(--vr-ink)">
              <text x={54} y={44}>a complete account of all music</text>
              <text x={54} y={68}>emotion · reward · aesthetics</text>
              <text x={54} y={92}>culture · social interaction · creativity</text>
              <text x={334} y={44}>every neural computation</text>
            </g>
          </svg>
        </Figure>
      </Movement>

      <div className="vr-silence vr-silence--deep" />

      {/* ---------------------------------------------------------------- */}
      <Movement label="Sixth movement · responsibility" tempo="silent · hairlines and type only · no drawing">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              Who is responsible for each kind of statement in this record, and what each source is for. Nothing here is
              colour-coded and nothing here needs to be operated.
            </p>
          </div>
        </div>

        <div className="vr-provenance" style={{ marginBottom: "2.2rem" }}>
          <ProvenanceRow kind="source" covers="Predictive-coding models, PCM history, precision accounts, and cited theoretical claims." />
          <ProvenanceRow kind="finding" covers="Bounded findings, faithful explanations, and critical review boundaries." />
          <ProvenanceRow kind="constructed" covers="The precision comparison and the omission example, with their manipulated variables and held constants." />
          <ProvenanceRow kind="synthesis" covers="The arrangement model → predict → compare → error → weight → update. A Concept Lab arrangement, not a source figure." />
          <ProvenanceRow kind="unresolved" covers="Cortical implementation, signal interpretation, precision and attention, cross-cultural generalisation, active inference, scope." />
        </div>

        <Source
          mark="■"
          cite={<>Vuust, P. et al. (2009)</>}
          contribution="Expertise differences in responses to rhythmic incongruity."
        />
        <Source
          mark="■"
          cite={<>Ishida, K., Ishida, K. &amp; Nittono, H. (2024)</>}
          contribution="Omission-period information about the identity of an expected note."
        />
        <Source
          mark="●"
          cite={<>Koelsch, S., Vuust, P. &amp; Friston, K. (2019)</>}
          contribution="Music-focused account of content prediction, precision prediction, attention and active listening."
        />
        <Source
          mark="■"
          cite={<>Furutachi, S. &amp; Hofer, S. (2026)</>}
          contribution="Current critical pressure toward stronger mechanistic discrimination."
        />

        <div style={{ marginTop: "2.2rem" }}>
          <Relation
            verb="is distinguished from"
            to="IDyOM information content and entropy"
            why="Predictive-coding error is not IDyOM information content, and IDyOM entropy is not predictive precision."
            provenance="Source-grounded distinction, recorded in the record"
          />
          <Relation
            verb="is distinguished from"
            to="Huron’s ITPRA Theory of Expectation"
            why="Both concern musical expectation and they are not the same object. See prototype 02."
            provenance="Source-grounded distinction, recorded in the record"
          />
        </div>
      </Movement>

      <hr className="vr-rule" />

      <section className="vr-section">
        <div className="vr-section__head">
          <span className="vr-label">What this page thinks its tempo is</span>
        </div>
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              Colour accumulates in the first movement and is gone by the fourth. Two pigments become one, then none.
              Drawing stops at the fifth movement and does not return, so the last thing the reader does on this page is
              read. The two deep silences fall before the evidence and before the limitations — the two places where a
              reader has to change what kind of attention they are paying.
            </p>
            <p>
              The claim being tested is that this is one argument getting quieter, not a good page followed by a
              neglected one. That is a judgement a human reader has to make, and it is the reason this prototype exists.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
