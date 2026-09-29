import type { CSSProperties } from "react";
import type { TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, BoundaryMap, Trail, CodaHead, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { AutonomyMap, ContextMap, Constellation, CutRow, ReasonLens, RewardFrame } from "./Interactions";
import s from "./sdt.module.css";

/* ---------------------------------------------------------------------------
   Self-Determination Theory — WHOSE REASON IS IT?

   The knowledge is a relation between an action and the self. Its own words
   are spatial: a reason can be taken *in* (internalised), thrown in and left
   foreign (introjected), or brought into one coherent whole (integrated). So
   the page is built on one loop that stands for a person's sense of self,
   crossed by an action line that never changes. The reader moves the reason
   across the loop, reads two different cuts through the same row of reasons,
   and only then meets the three needs, the contexts that support or thwart
   them, and the refinements the slogans miss.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "reason", num: "01", label: "Whose reason" },
  { id: "row", num: "02", label: "Two cuts" },
  { id: "owning", num: "03", label: "Owning" },
  { id: "needs", num: "04", label: "Needs" },
  { id: "context", num: "05", label: "Context" },
  { id: "refinements", num: "06", label: "Refinements" },
  { id: "family", num: "07", label: "Family" },
  { id: "limits", num: "08", label: "Limits" },
  { id: "trail", num: "09", label: "Trail" },
  { id: "sources", num: "10", label: "Sources" },
  { id: "provenance", num: "11", label: "Provenance" },
];

const HERO = "/visual-language/theories/sdt";

/** A small hand-drawn mark for each need — what the question feels like, not a measure. */
function NeedMark({ kind, colour }: { kind: "autonomy" | "competence" | "relatedness"; colour: string }) {
  return (
    <svg className={s.needMark} viewBox="0 0 180 60" aria-hidden="true" style={{ color: colour }}>
      {kind === "autonomy" && (
        <>
          <path d={hand.line(6, 14, 174, 14, { seed: 3, wander: 0.6 })} className={s.markRuled} filter="url(#folio-graphite)" />
          <path d={hand.curve([[6, 48], [50, 40], [80, 22], [116, 44], [150, 30], [172, 34]], { seed: 5 })} filter="url(#folio-pencil)" />
          <path d={hand.arrowHead(172, 34, -0.1, { size: 10, seed: 6 })} filter="url(#folio-pencil)" />
        </>
      )}
      {kind === "competence" && (
        <>
          <path d={hand.ring(146, 26, 20, 19, { seed: 8, wobble: 0.07, overlap: 0.2 })} filter="url(#folio-pencil)" />
          <circle cx="146" cy="26" r="3.2" fill="currentColor" />
          <path d={hand.curve([[8, 50], [48, 44], [88, 22], [126, 26]], { seed: 9 })} filter="url(#folio-pencil)" />
          <path d={hand.arrowHead(126, 26, 0.05, { size: 10, seed: 10 })} filter="url(#folio-pencil)" />
        </>
      )}
      {kind === "relatedness" && (
        <>
          <path d={hand.ring(66, 30, 30, 22, { seed: 12, wobble: 0.06, overlap: 0.16 })} filter="url(#folio-pencil)" />
          <path d={hand.ring(112, 30, 30, 22, { seed: 13, wobble: 0.06, overlap: 0.16 })} filter="url(#folio-pencil)" />
          <circle cx="66" cy="30" r="3" fill="currentColor" />
          <circle cx="112" cy="30" r="3" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

/** Absence and opposition are different marks: one fades away, the other meets a counter-force. */
function AbsenceMark({ colour }: { colour: string }) {
  const id = `fade-${colour.replace(/\W/g, "")}`;
  return (
    <svg className={s.pairMark} viewBox="0 0 240 52" aria-hidden="true" style={{ color: colour }}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="8" x2="232" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="1" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <path d={hand.curve([[8, 28], [56, 24], [104, 29], [150, 26], [196, 28]], { seed: 21, wander: 0.9 })} stroke={`url(#${id})`} filter="url(#folio-pencil)" />
      <path d={hand.line(204, 28, 232, 28, { seed: 26, wander: 0.4 })} className={s.markTrace} filter="url(#folio-graphite)" />
    </svg>
  );
}

function OppositionMark({ colour }: { colour: string }) {
  return (
    <svg className={s.pairMark} viewBox="0 0 240 52" aria-hidden="true" style={{ color: colour }}>
      <path d={hand.curve([[8, 28], [56, 28], [96, 28], [112, 26]], { seed: 22, wander: 0.5 })} filter="url(#folio-pencil)" />
      <path d={hand.arrowHead(116, 26, 0, { size: 12, seed: 24 })} filter="url(#folio-pencil)" />
      <path d={hand.curve([[232, 28], [190, 28], [150, 28], [134, 26]], { seed: 23, wander: 0.5 })} filter="url(#folio-pencil)" className={s.markCounter} />
      <path d={hand.arrowHead(130, 26, Math.PI, { size: 12, seed: 25 })} filter="url(#folio-pencil)" className={s.markCounter} />
      <path d={hand.line(124, 8, 124, 16, { seed: 27, wander: 0.3 })} filter="url(#folio-pencil)" />
      <path d={hand.line(112, 12, 117, 19, { seed: 28, wander: 0.3 })} filter="url(#folio-pencil)" />
      <path d={hand.line(136, 12, 131, 19, { seed: 29, wander: 0.3 })} filter="url(#folio-pencil)" />
    </svg>
  );
}

export function SDTExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.sdt!;
  const [autonomy, competence, relatedness] = d.needs;
  const needKinds = ["autonomy", "competence", "relatedness"] as const;

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}><span>Self-Determination</span> <em>Theory</em></h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>same action · different why</Margin>
      </div>
      <figure className={s.field}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/sdt-hero-stack.webp`} />
          <img src={`${HERO}/sdt-hero.webp`} srcSet={`${HERO}/sdt-hero-900.webp 900w, ${HERO}/sdt-hero.webp 1600w`} sizes="(max-width: 760px) 100vw, 96vw" width={1600} height={580} alt="A coloured-pencil drawing in which one graphite line, the visible action, runs unchanged through two loops that stand for two people's sense of self. In the first loop a settled teal swirl sits inside and warm yellow marks open outward through the wall. Around the second, red strands press in from outside and gather in a collar along the inner wall." fetchPriority="high" />
        </picture>
        <figcaption className={s.fieldCaption}>
          <Glyph g="▲" /> Original teaching drawing. The line is the visible action; each loop is a person&rsquo;s sense of self. Pigment and position show the <em>kind</em> of reason, never an amount of effort.
        </figcaption>
      </figure>
      <div className={s.cases}>
        <p className={s.casesLede}>Two employees stay late to finish the same project. Their visible behaviour looks similar; the reason moving it may not.</p>
        {d.opening.cases.map((c, i) => (
          <article key={c.label} className={s.case} data-case={i === 0 ? "a" : "b"}>
            <p className={s.caseLabel}>{c.label}</p>
            <p className={s.caseQuote}>&ldquo;{c.quote}&rdquo;</p>
            <p className={s.caseBody}>{c.body}</p>
          </article>
        ))}
        <p className={s.teachingNote}><Glyph g="▲" /> {d.opening.note}</p>
      </div>
      <ul className={s.facts} aria-label="The theory at a glance">
        {r.facts.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Self-Determination Theory">
      {/* 01 · a reason has a place relative to the self */}
      <Chapter id="reason" density="rich" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">Why are you doing it?</Kicker>
          <h2 className={s.h2}>Whose reason <em>is it</em>?</h2>
          <p className={s.headLede}>SDT asks not only how much motivation is present, but what kind of motivation is moving the action.</p>
        </div>
        <ReasonLens motives={d.motives} note="Real behaviour can draw on mixed motives; these statements isolate useful teaching contrasts rather than diagnose a person." />
      </Chapter>

      {/* 02 · two cuts through one row */}
      <Chapter id="row" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">The regulation architecture</Kicker>
          <h2 className={s.h2}>Two cuts through <em>one row</em>.</h2>
          <p className={s.headLede}>The continuum orders reasons by relative autonomy. It is a landscape of possible regulations, not a staircase that every person must climb. And extrinsic means only that the activity is undertaken for a separable outcome — it does not tell us, by itself, whether the reason is pressured or personally endorsed.</p>
        </div>
        <CutRow items={d.regulations} />
        <div className={s.twoExtrinsic}>
          <p className={s.smallHead}>Two extrinsic reasons</p>
          <div className={s.twoExtrinsicPair}>
            <figure data-tone="controlled">
              <blockquote>&ldquo;I&rsquo;ll do it because I get paid.&rdquo;</blockquote>
              <figcaption><b>External</b> — the reason depends on an external contingency. It is extrinsic and relatively controlled.</figcaption>
            </figure>
            <span className={s.twoExtrinsicMid} aria-hidden="true">≠</span>
            <figure data-tone="autonomous">
              <blockquote>&ldquo;I don&rsquo;t enjoy the paperwork, but I genuinely believe it matters.&rdquo;</blockquote>
              <figcaption><b>Identified</b> — the outcome remains separable from the activity, but the value is personally accepted. It is extrinsic and relatively autonomous.</figcaption>
            </figure>
          </div>
          <Margin tone="red" className={s.twoExtrinsicNote}>Same category? Not quite — extrinsic is not one thing.</Margin>
        </div>
        <p className={s.teachingNote}><Glyph g="●" /> Relative autonomy is the organising dimension. This is not a required developmental sequence; integrated regulation remains extrinsic.</p>
      </Chapter>

      {/* 03 · the same behaviour, owned to different degrees */}
      <Chapter id="owning" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Internalisation</Kicker>
          <h2 className={s.h2}>Same paperwork, four ways of <em>owning it</em>.</h2>
          <div className={s.headLede}>
            <p>Internalisation is taking in a value or regulation. Integration is bringing that regulation into coherence with wider values and the self.</p>
            <p>{d.internalisation.lede}</p>
          </div>
        </div>
        <div className={s.voices}>
          <p className={s.voicesRoot}><span>same behaviour</span> complete the paperwork</p>
          <ol className={s.voiceList}>
            {d.internalisation.branches.map((b, i) => (
              <li key={b.label} data-voice={i} style={{ "--voice": b.colour } as CSSProperties}>
                <p className={s.voiceLabel}>{b.label}</p>
                <blockquote className={s.voiceQuote}>{i === 3 ? <>…and <em>{b.quote.replace(/^./, (c) => c.toLowerCase())}</em></> : <>&ldquo;{b.quote}&rdquo;</>}</blockquote>
                <p className={s.voiceBody}>{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className={s.teachingNote}><Glyph g="?" /> {d.internalisation.note}</p>
      </Chapter>

      {/* 04 · three needs, asked as questions */}
      <Chapter id="needs" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">Basic psychological needs</Kicker>
          <h2 className={s.h2}>Three questions, <em>asked separately</em>.</h2>
          <p className={s.headLede}>Only after the quality of motivation is visible do the three needs enter. They describe psychological experiences, not three decorative ingredients in a formula.</p>
        </div>
        <ol className={s.needs}>
          {[autonomy, competence, relatedness].map((n, i) => (
            <li key={n.label} style={{ "--need": n.colour } as CSSProperties}>
              <p className={s.needName}>{n.label}</p>
              <h3 className={s.needQuestion}>{n.question}</h3>
              <NeedMark kind={needKinds[i]} colour={n.colour} />
              <p className={s.needMeaning}>{n.meaning}</p>
              <p className={s.needNot}><b>Not the same as</b> {n.distinction}</p>
            </li>
          ))}
        </ol>

        <div className={s.subhead}>
          <p className={s.smallHead}>A confusion worth separating</p>
          <h3 className={s.h3}>Autonomy is <em>not</em> independence.</h3>
          <p className={s.subLede}>Autonomy concerns volition. A person can act autonomously while interdependent, or act under control while working alone.</p>
        </div>
        <AutonomyMap cases={d.autonomyMatrix.cases} note={d.autonomyMatrix.note} />
      </Chapter>

      {/* 05 · context gets inside motivation */}
      <Chapter id="context" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Context</Kicker>
          <h2 className={s.h2}>Context gets <em>inside</em> motivation.</h2>
          <div className={s.headLede}>
            <p>Leadership, job design, feedback, rewards, participation, choice, climate, and relationships are contextual conditions. They are not automatically psychological needs.</p>
            <p>The workplace model brings context, person-level influences, psychological needs, motivation quality, and selected outcomes into one map without pretending that every study tests every arrow.</p>
          </div>
        </div>
        <ContextMap context={d.context} model={d.workModel} />
      </Chapter>

      {/* 06 · two refinements */}
      <Chapter id="refinements" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Two refinements</Kicker>
          <h2 className={s.h2}>Two things the slogans <em>miss</em>.</h2>
        </div>
        <div className={s.subhead}>
          <p className={s.smallHead}>A reward is not a verdict</p>
          <h3 className={s.h3}>The same reward can mean <em>different things</em>.</h3>
          <p className={s.subLede}>A reward does not arrive with one universal motivational function. Contingency, salience, meaning, interpersonal delivery, and task context matter.</p>
        </div>
        <RewardFrame data={d.rewards} />

        <div className={s.subhead} data-second>
          <p className={s.smallHead}>Absence is not opposition</p>
          <h3 className={s.h3}>Satisfaction is not simply the opposite of <em>frustration</em>.</h3>
          <p className={s.subLede}>The absence of support is not automatically the same as active thwarting. Keep need satisfaction and need frustration related, but distinct.</p>
        </div>
        <ol className={s.pairs}>
          {d.needComparison.pairs.map((p) => (
            <li key={p.label} style={{ "--need": p.colour } as CSSProperties}>
              <p className={s.pairName}>{p.label}</p>
              <div className={s.pairSide}>
                <p className={s.pairKind}>low satisfaction</p>
                <AbsenceMark colour={p.colour} />
                <p className={s.pairSaid}>&ldquo;{p.low}&rdquo;</p>
              </div>
              <div className={s.pairSide} data-thwart>
                <p className={s.pairKind}>active frustration</p>
                <OppositionMark colour={p.colour} />
                <p className={s.pairSaid}>&ldquo;{p.thwart}&rdquo;</p>
              </div>
              <p className={s.pairNote}>{p.body}</p>
            </li>
          ))}
        </ol>
        <p className={s.teachingNote}><Glyph g="●" /> {d.needComparison.note} The faded stroke and the opposed stroke are different marks on purpose: neither is a score.</p>
      </Chapter>

      {/* 07 · the family */}
      <Chapter id="family" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="07">SDT is a family</Kicker>
          <h2 className={s.h2}>A family of <em>connected questions</em>.</h2>
          <p className={s.headLede}>Each mini-theory answers a different motivational question. The family should not be flattened into six boxes mechanically feeding the same outcome.</p>
        </div>
        <Constellation items={d.miniTheories} />
      </Chapter>

      {/* 08 · limits, cautions, open questions — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="08 · Scope and limits" title={<>What SDT explains — and <em>where it stops</em>.</>}>
          <p>SDT gives us a motivational map. The map is not every outcome.</p>
        </CodaHead>
        <BoundaryMap explains={d.scope.explains} stops={d.scope.stops} explainsLabel="SDT gives us a motivational map" stopsLabel="The map is not every outcome" note={d.scope.note} />
        <div className={s.limits}>
          <div>
            <p className={s.smallHead}>Do not conclude</p>
            <Rich as="p" className={s.limitsLede} html={r.oversimplificationsLede} />
            <Cautions items={r.oversimplifications} />
          </div>
          <div>
            <p className={s.smallHead}>Still open</p>
            <OpenQuestions items={r.qualifications} />
          </div>
        </div>
        <BesideOtherLenses record={r} />
      </Chapter>

      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · The trail" title="From intrinsic motivation to a family of theories">
          <p>{r.trailLede}</p>
          {r.originsNote && <p>{r.originsNote}</p>}
        </CodaHead>
        <Trail nodes={r.origins} />
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="10 · Sources" title={r.minimumReadingLabel ?? "If you read five things"} />
        <SourceShelf items={r.minimumReading} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · Provenance" title="Where every claim came from">
          <p>The opening employees, the six motive statements, the autonomy matrix, the reward scenarios and every drawing on this page are constructed teaching material (▲), written or drawn for this record.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}
