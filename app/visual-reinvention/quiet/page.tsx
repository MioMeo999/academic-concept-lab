import { Topbar, Masthead, Section } from "../_components/Frame";
import { Figure, PartialBoundary } from "../_components/Marks";
import { Evidence, Source, Relation, ProvenanceRow } from "./_components/QuietBlocks";

const NOT_RECORDED = (
  <span style={{ color: "var(--vr-ink-faint)", fontStyle: "italic" }}>
    not recorded at this level of the handoff — held in the record
  </span>
);

export default function QuietPrototype() {
  return (
    <main className="vr-shell vr-quiet">
      <Topbar here="/visual-reinvention/quiet" />
      <Masthead
        kicker="Prototype 04 · Predictive Processing in Music"
        title="What the evidence actually did"
        lede="The calm register. Evidence, scope, limitations, provenance, sources and relations for one record — with what each source did not test kept at the same weight as what it found."
        testing={
          <>
            Whether quiet reads as rigorous rather than abandoned; whether the eight questions of the acceptance test
            can be answered here without operating a single control; and whether a register change from the conceptual
            prototypes produces rhythm rather than a drop in quality. No cards, no metadata panels, no bibliography
            dump, no evidence tiles.
          </>
        }
      />

      <Section label="Evidence">
        <p style={{ maxWidth: "40rem" }}>
          Six sources with different jobs. An empirical study, a critical review, a theoretical account and a synthesis
          are not one class of evidence, and nothing below is set as though they were. Where the frozen handoff does not
          record a field, the field says so.
        </p>

        <Evidence
          cite={
            <>
              Vuust, P. et al. (2009). <em>Rhythmic incongruity and expertise.</em>
            </>
          }
          kind="Empirical study"
          fields={[
            { key: "Design", value: NOT_RECORDED },
            { key: "Tested", value: "Responses to rhythmic incongruity, and differences associated with musical expertise." },
            { key: "Found", value: "Expertise differences in MMNm and P3am responses to rhythmic incongruity." },
            {
              key: "Not tested",
              limit: true,
              value:
                "A complete predictive-processing circuit; a neural precision parameter; any causal result of training.",
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
            { key: "Design", value: NOT_RECORDED },
            { key: "Tested", value: "Whether information about the identity of an expected note is present during the omission period." },
            {
              key: "Found",
              value:
                "Omission-period information about expected-note identity, with differences by familiarity of context, and a reported decoding distinction.",
            },
            {
              key: "Not tested",
              limit: true,
              value:
                "Proof of the full architecture, or a uniquely identified pure prediction-error signal. The familiarity conditions differed in more than the melody, so familiarity is not isolated.",
            },
          ]}
        />

        <Evidence
          cite={
            <>
              Rohrmeier, M. &amp; Koelsch, S. (2012). <em>Predictive information processing in music cognition.</em>
            </>
          }
          kind="Review · critical boundary"
          fields={[
            { key: "Design", value: NOT_RECORDED },
            { key: "Tested", value: "Not an empirical test. A critical assessment of how far predictive accounts are specified." },
            {
              key: "Found",
              value:
                "Feature prediction and temporal prediction are not equally specified for polyphony, formal structure, or higher-order prediction.",
            },
            {
              key: "Not tested",
              limit: true,
              value: "This is not a rejection of all prediction accounts, and it is not evidence against the framework.",
            },
          ]}
        />

        <Evidence
          cite={
            <>
              Koelsch, S., Vuust, P. &amp; Friston, K. (2019). <em>Predictive processes and the peculiar case of music.</em>
            </>
          }
          kind="Theoretical account"
          fields={[
            { key: "Design", value: NOT_RECORDED },
            {
              key: "Supports",
              value:
                "A music-focused account of content prediction, precision prediction, attention, and active listening.",
            },
            {
              key: "Not tested",
              limit: true,
              value: "A theoretical account is not complete mechanistic validation, and is not presented as one here.",
            },
          ]}
        />

        <Evidence
          cite={
            <>
              Vuust, P. et al. (2022), and the subsequent cross-cultural exchange. <em>Expanded PCM synthesis.</em>
            </>
          }
          kind="Synthesis · with an unsettled boundary"
          fields={[
            { key: "Design", value: NOT_RECORDED },
            {
              key: "Supports",
              value:
                "An expanded Predictive Coding of Music synthesis, and the importance of culture and the history of a listener’s priors.",
            },
            {
              key: "Not tested",
              limit: true,
              value: "Cross-cultural validity remains unsettled. Culture is not one homogeneous prior.",
            },
          ]}
        />

        <Evidence
          cite={
            <>
              Furutachi, S. &amp; Hofer, S. (2026). <em>Critical pressure on mechanistic interpretation.</em>
            </>
          }
          kind="Review · current critical pressure"
          fields={[
            { key: "Design", value: NOT_RECORDED },
            {
              key: "Argues",
              value:
                "That stronger mechanistic discrimination is needed, and that prediction-error responses require careful interpretation.",
            },
            {
              key: "Not tested",
              limit: true,
              value: "This does not debunk predictive processing. It raises the standard of evidence required of it.",
            },
          ]}
        />
      </Section>

      <Section label="Scope">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              The framework is useful for context-sensitive perception, musical expectation, sensory prediction,
              violation responses, uncertainty, learning, attention, rhythm and meter, some aspects of groove,
              expertise, omission, and perception–action coupling.
            </p>
            <p>
              Stopping points are part of the record’s identity rather than an admission. They are drawn once, below,
              and the edge is left open on purpose.
            </p>
          </div>
        </div>

        <Figure
          tone="quiet"
          equivalent="A boundary drawn in graphite around the record's stopping points and deliberately left unclosed on the right: a complete account of all music, of emotion, reward and aesthetics, of culture, social interaction and creativity, and of every neural computation."
          caption={
            <>
              <b>The only drawing in this register.</b> The record stops here; the open edge says that it stops rather
              than that the territory ends. One mark, doing one piece of intellectual work — and then the drawing gets
              out of the way, because everything else on this page is better carried by type.
            </>
          }
        >
          <svg viewBox="0 0 640 140">
            <PartialBoundary x={24} y={18} w={576} h={104} open="right" colour="var(--vr-graphite)" seed={19} inset={168} />
            <g fontFamily="var(--vr-sans)" fontSize={13} fill="var(--vr-ink)">
              <text x={54} y={48}>a complete account of all music</text>
              <text x={54} y={72}>emotion · reward · aesthetics</text>
              <text x={54} y={96}>culture · social interaction · creativity</text>
              <text x={330} y={48}>every neural computation</text>
            </g>
            <text x={452} y={96} fontFamily="var(--vr-sans)" fontSize={11.5} fill="var(--vr-ink-faint)">
              stops here — the edge is not a wall
            </text>
          </svg>
        </Figure>
      </Section>

      <Section label="Limitations, and distinctions that are easy to lose">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              Most of the risk in this record is terminological. Predictive processing is broader than next-note
              guessing. A generative model is not generative AI. Predictive-coding error is not IDyOM information
              content, and IDyOM entropy is not predictive precision. Precision is not conscious confidence, and
              attention is not established as being only precision weighting.
            </p>
            <p>
              Two further boundaries carry real inferential weight. MMN and MMNm, ERAN, P3-related signals and omission
              responses are not prediction error by definition — a compatible signal does not identify the computation
              that produced it. And Predictive Coding of Music is a music-specific formulation inside a wider family,
              not the whole family and not one unchanged model. Zero error is not maximum pleasure.
            </p>
            <p>
              The hierarchy language — acoustic feature, onset, pitch, rhythm, meter, melody, harmony, phrase, style —
              names explanatory levels. It does not assign them anatomical destinations, and no fixed cortical or
              musical hierarchy is established here.
            </p>
          </div>
          <aside className="vr-margin">
            <div className="vr-apparatus" style={{ position: "static" }}>
              <div className="vr-note">
                <span className="vr-glyph" aria-hidden="true">
                  ?
                </span>
                <div className="vr-note__body">
                  What would distinguish predictive-processing computations from other explanations of these signals is
                  an open question in the record, not a gap in this page.
                  <span className="vr-note__voice">Open question · unresolved</span>
                </div>
              </div>
              <div className="vr-note">
                <span className="vr-glyph" aria-hidden="true">
                  ?
                </span>
                <div className="vr-note__body">
                  Which musical levels are explanatory conveniences and which are empirically specified model levels is
                  also unresolved.
                  <span className="vr-note__voice">Open question · unresolved</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section label="Provenance">
        <p style={{ maxWidth: "40rem" }}>
          Five marks, and what each one covers in this record. They are not colour-coded: the glyph and the sentence
          beside it carry the class, so nothing here depends on seeing a hue.
        </p>
        <div className="vr-provenance">
          <ProvenanceRow
            kind="source"
            covers="Predictive-coding models, the history of Predictive Coding of Music, precision accounts, and cited theoretical claims."
          />
          <ProvenanceRow
            kind="finding"
            covers="Bounded findings, faithful explanations, and the boundaries drawn by critical reviews."
          />
          <ProvenanceRow
            kind="constructed"
            covers="The constructed precision comparison and the omission teaching example, with their manipulated variables and held constants."
          />
          <ProvenanceRow
            kind="synthesis"
            covers="The arrangement model → predict → compare → error → weight → update, and the final model. A Concept Lab arrangement, not a source-authored figure."
          />
          <ProvenanceRow
            kind="unresolved"
            covers="Cortical implementation, signal interpretation, precision and attention mechanisms, cross-cultural generalisation, active inference, and scope."
          />
        </div>
      </Section>

      <Section label="Sources, and what each is responsible for">
        <Source
          mark="●"
          cite={<>Koelsch, S., Vuust, P. &amp; Friston, K. (2019)</>}
          contribution="Music-focused account of content prediction, precision prediction, attention and active listening."
        />
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
          mark="■"
          cite={<>Rohrmeier, M. &amp; Koelsch, S. (2012)</>}
          contribution="Critical boundary on how far feature and temporal prediction are specified."
        />
        <Source
          mark="●"
          cite={<>Vuust, P. et al. (2022), and the cross-cultural exchange that followed</>}
          contribution="Expanded PCM synthesis; the history of a listener’s priors; culture as plural."
        />
        <Source
          mark="■"
          cite={<>Furutachi, S. &amp; Hofer, S. (2026)</>}
          contribution="Current critical pressure toward stronger mechanistic discrimination."
        />
        <div className="vr-note" style={{ marginTop: "1.4rem", maxWidth: "40rem" }}>
          <span className="vr-glyph" aria-hidden="true">
            ?
          </span>
          <div className="vr-note__body" style={{ fontFamily: "var(--vr-sans)", fontSize: "0.79rem", color: "var(--vr-ink-soft)" }}>
            This is a source trail, not a minimum-reading list. Which of these constitutes the record’s reading
            threshold lives in the record data and is not reproduced in the frozen handoff, so this prototype does not
            assert one. DOIs are identifiers; none of these papers was independently re-verified for this prototype.
            <span className="vr-note__voice">Concept Lab · stated limit of this prototype</span>
          </div>
        </div>
      </Section>

      <Section label="Relations">
        <p style={{ maxWidth: "40rem" }}>
          A relation says how two records can be read together and what stays a distinct question. Direction matters,
          and so does where the relation came from.
        </p>
        <Relation
          verb="is distinguished from"
          to="IDyOM information content and entropy"
          why="Predictive-coding error is not IDyOM information content, and IDyOM entropy is not predictive precision. The quantities are not interchangeable and mapping them is an open question."
          provenance="Source-grounded distinction, recorded in the record"
        />
        <Relation
          verb="is distinguished from"
          to="Huron’s ITPRA Theory of Expectation"
          why="Both concern musical expectation, and they are not the same object. ITPRA is a functional and temporal vocabulary for responses around an outcome; predictive processing is a framework about generative models, mismatch and precision."
          provenance="Source-grounded distinction, recorded in the record"
        />
        <Relation
          verb="is reached, in the Atlas, after"
          to="Statistical Learning → IDyOM"
          why="One of the three approved question-led learning routes: learn, model, predict. A route is a reading order, not a claim that these form one historical chain."
          provenance="Editorial route, approved in the handoff"
        />
      </Section>

      <hr className="vr-rule" />

      <Section label="The acceptance test, answered without operating anything">
        <div className="vr-spread">
          <div className="vr-column">
            <p>
              This is a theory record, in the framework knowledge form, in the expectation-and-prediction branch. It
              explains context-sensitive perception, expectation, uncertainty, learning and attention in music. Its
              cited evidence tested rhythmic incongruity responses, omission-period information, and the specification
              of prediction accounts — and tested none of the full architecture. Its source claims, its constructed
              teaching examples and its Concept Lab arrangements are marked separately above. It stops before emotion,
              reward, culture, creativity and neural computation in general. What remains unresolved is what would
              distinguish this computation from its alternatives.
            </p>
            <p>
              Nothing in that paragraph required a control to be operated, a section to be expanded, or a colour to be
              seen.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
