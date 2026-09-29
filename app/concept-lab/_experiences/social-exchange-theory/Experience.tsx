import type { CSSProperties } from "react";
import type { SETAuditCase, SETChainStep, SETResource, TheoryRecord } from "@/content/types";
import { Folio, FolioIdentity, Chapter, Kicker, Margin, Glyph, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, BoundaryMap, Trail, CodaHead, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { DimensionProfile, FamilyMap, PowerLab, RelationshipSpiral } from "./Dependence";
import { ExchangeSpec, ReciprocityLenses, ResponseStrand, RuleRoutes } from "./Interactions";
import s from "./set.module.css";

/* ---------------------------------------------------------------------------
   Social Exchange Theory — WHAT MAKES WHAT HAPPENS NEXT AN EXCHANGE?

   The knowledge is interdependence over time: something passes between two
   actors, a rule makes the answer intelligible, dependence shifts, and the
   relationship that results changes how the next exchange is read. So the
   page is built on two rails — each actor's own line — and the strands that
   pass between them. One strand is a transaction; a weave of many is a
   history. Every later figure re-reads the same two lines: a third rail for
   the group, spare routes for alternatives, colour for the sign of an
   exchange and path for what is done about it.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "spec", num: "01", label: "Exchange?" },
  { id: "passes", num: "02", label: "What passes" },
  { id: "rules", num: "03", label: "Rules" },
  { id: "mixed", num: "04", label: "Mixed" },
  { id: "dependence", num: "05", label: "Dependence" },
  { id: "history", num: "06", label: "History" },
  { id: "response", num: "07", label: "Response" },
  { id: "audit", num: "08", label: "Audit" },
  { id: "family", num: "09", label: "Family" },
  { id: "limits", num: "10", label: "Limits" },
  { id: "sources", num: "11", label: "Sources" },
  { id: "provenance", num: "12", label: "Provenance" },
];

const HERO = "/visual-language/theories/set";
const TAG_HUE = ["var(--red)", "var(--gold)", "var(--teal)", "var(--violet)", "var(--cobalt)", "var(--plum)"];

/** Six kinds of resource, hung on one strand. Words are typeset; the tags are marks, not icons. */
function ResourceStrand({ items }: { items: SETResource[] }) {
  return (
    <div className={s.resources}>
      <div className={s.resourcesIntro}>
        <p className={s.smallHead}>what can pass between actors?</p>
        <p className={s.resourcesWord}>resource</p>
        <p className={s.resourcesNote}>The same resource can carry different meanings in different relationships.</p>
      </div>
      <div className={s.resourcesBody}>
        <svg className={s.resourceLine} viewBox="0 0 1200 36" preserveAspectRatio="none" aria-hidden="true">
          <path d={hand.curve([[4, 18], [200, 14], [420, 22], [640, 16], [860, 22], [1060, 16], [1196, 20]], { seed: 7, wander: 1.2 })} filter="url(#folio-pencil)" />
        </svg>
        <ol className={s.resourceList}>
          {items.map((it, i) => (
            <li key={it.label} style={{ "--hue": TAG_HUE[i % TAG_HUE.length] } as CSSProperties}>
              <svg className={s.resourceTag} viewBox="0 0 60 60" aria-hidden="true">
                <path d={hand.line(30, 0, 30, 14, { seed: 20 + i, wander: 0.5 })} filter="url(#folio-pencil)" />
                <g transform={`rotate(${(i % 3) * 4 - 4} 30 34)`}>
                  <path className={s.tagFill} d="M14 18 H46 V52 H14 Z" />
                  <path d={hand.line(14, 18, 46, 18, { seed: 30 + i, wander: 0.6 }) + hand.line(46, 18, 46, 52, { seed: 40 + i, wander: 0.6 }) + hand.line(46, 52, 14, 52, { seed: 50 + i, wander: 0.6 }) + hand.line(14, 52, 14, 18, { seed: 60 + i, wander: 0.6 })} filter="url(#folio-pencil)" />
                  <circle cx="30" cy="25" r="2.6" />
                </g>
              </svg>
              <h3>{it.label}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className={s.teachingNote}><Glyph g="▲" /> Adapted from resource theory as a teaching map; categories are not a claim that every exchange contains only one resource.</p>
    </div>
  );
}

/** The five questions that read one exchange, along a thread with a knot at each. */
function Chain({ steps }: { steps: SETChainStep[] }) {
  return (
    <ol className={s.chain} aria-label="Five questions that read one exchange">
      {steps.map((st, i) => (
        <li key={st.label}>
          <span className={s.chainNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <h3>{st.label}</h3>
          <p>{st.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Two claims, side by side. An unanswered question is a dashed slot; a named answer is a ticked one. */
function Audit({ items }: { items: SETAuditCase[] }) {
  return (
    <div className={s.audit}>
      {items.map((it) => {
        const open = it.answers.every((a) => a.trim().endsWith("?"));
        return (
          <article key={it.label} className={s.claim} data-open={open || undefined}>
            <p className={s.claimKick}>claim under inspection · {it.label.toLowerCase()}</p>
            <blockquote className={s.claimText}>{it.claim}</blockquote>
            <ol className={s.slots}>
              {it.answers.map((a, k) => (
                <li key={a} data-open={open || undefined}>
                  <span className={s.slotMark} aria-hidden="true">{open ? "?" : "✓"}</span>
                  <span><span className={s.slotNum}>{String(k + 1).padStart(2, "0")}</span> {a}</span>
                </li>
              ))}
            </ol>
            <p className={s.verdictKick}>audit reading</p>
            <p className={s.verdict}>{it.verdict}</p>
          </article>
        );
      })}
    </div>
  );
}

export function SETExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.set!;

  const opening = (
    <header className={s.opening}>
      <div className={s.openingHead}>
        <FolioIdentity record={r} />
        <h1 className={s.title}>Social <em>Exchange</em> Theory</h1>
      </div>
      <div className={s.openingSide}>
        <p className={s.hook}>{r.hook}</p>
        <p className={s.lede}>{r.oneSentence}</p>
        <Margin tone="kind" className={s.openingMargin}>one favour · then what?</Margin>
      </div>
      <figure className={s.field}>
        <picture>
          <source media="(max-width: 760px)" srcSet={`${HERO}/set-hero-stack.webp`} />
          <img src={`${HERO}/set-hero.webp`} srcSet={`${HERO}/set-hero-900.webp 900w, ${HERO}/set-hero.webp 1600w`} sizes="(max-width: 760px) 100vw, 96vw" width={1600} height={520} alt="A coloured-pencil drawing of two horizontal lines, actor A's above and actor B's below, each with a ringed dot at its left end. At the left, one teal strand carrying a small ochre token runs from A's line down to B's. In the middle, a later, thinner ochre strand runs back up from B to A, broken partway by three dots. At the right, many teal, coral, ochre and blue strands cross between the two lines in a dense woven band." fetchPriority="high" />
        </picture>
        <span className={s.fieldLabel} data-at="a" aria-hidden="true">actor A</span>
        <span className={s.fieldLabel} data-at="b" aria-hidden="true">actor B</span>
        <figcaption className={s.fieldCaption}>
          <Glyph g="▲" /> Original teaching drawing. Each line is one actor&rsquo;s own history; what passes between them is drawn as strands. One strand is a transaction; many, accumulated, are a history. Density shows accumulation, never how warm or how strong a relationship is.
        </figcaption>
      </figure>
      <div className={s.moments}>
        <p className={s.momentsLede}>The first useful question is not &ldquo;was this nice?&rdquo; It is: what moved between which actors, under which expectation, and with what possible response?</p>
        {d.opening.cases.map((c, i) => (
          <article key={c.label} className={s.moment} data-moment={i}>
            <p className={s.momentLabel}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span> {c.label}</p>
            <p className={s.momentQuote}>&ldquo;{c.quote}&rdquo;</p>
            <p className={s.momentBody}>{c.body}</p>
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
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Social Exchange Theory">
      {/* 01 · a favour is not automatically an exchange */}
      <Chapter id="spec" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="01">The first question</Kicker>
          <h2 className={s.h2}>When is it <em>actually</em> an exchange?</h2>
          <p className={s.headLede}>An interaction is not automatically an exchange. SET needs a relation between actors, a resource or outcome, a rule of response, and some interdependence across the episode.</p>
        </div>
        <ExchangeSpec caption="A favour becomes analytically useful as an exchange when actors, resource, rule, and relation are specified. This is a teaching structure, not a universal sequence." />
      </Chapter>

      {/* 02 · what passes, and what it obliges */}
      <Chapter id="passes" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="02">Resources and reciprocity</Kicker>
          <h2 className={s.h2}>What passed — and what it <em>obliges</em>.</h2>
          <p className={s.headLede}>Resources are not limited to money or objects. Their value and meaning are relational and contextual.</p>
        </div>
        <ResourceStrand items={d.resources} />
        <div className={s.subhead}>
          <p className={s.smallHead}>One word, three jobs</p>
          <h3 className={s.h3}>Which <em>reciprocity</em>?</h3>
          <p className={s.subLede}>&ldquo;Reciprocity&rdquo; does three kinds of work in SET conversations. Keep the meanings adjacent, not collapsed.</p>
        </div>
        <ReciprocityLenses items={d.reciprocity} note="Gouldner supplies the foundational norm of reciprocity; this later three-part organisation should not be attributed to Gouldner alone." />
      </Chapter>

      {/* 03 · the rule decides what a return looks like */}
      <Chapter id="rules" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="03">Exchange rules</Kicker>
          <h2 className={s.h2}>Same action. Different <em>rule</em>?</h2>
          <p className={s.headLede}>The same helping act can be read as a return, a negotiated term, a contribution to a group, or a moral obligation. The rule changes the analysis.</p>
        </div>
        <RuleRoutes items={d.rules} />
      </Chapter>

      {/* 04 · social or economic is a profile, not a point */}
      <Chapter id="mixed" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="04">Social or economic?</Kicker>
          <h2 className={s.h2}>It isn&rsquo;t just about <em>money</em>.</h2>
          <p className={s.headLede}>Social and economic exchange are often treated as contrasting patterns, but the contrast is multidimensional. The map below is a Concept Lab synthesis for comparison, not an official seven-dimension taxonomy.</p>
        </div>
        <DimensionProfile dimensions={d.dimensions} />
        <p className={s.synthesis}><span className={s.badge}>✦ Concept Lab synthesis</span> An exchange can be mixed: explicit terms may sit inside a warm relationship; a social obligation can be closely monitored; money can carry status or care. This is not a money/non-money or moral binary.</p>
      </Chapter>

      {/* 05 · dependence is relational */}
      <Chapter id="dependence" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="05">Power and dependence</Kicker>
          <h2 className={s.h2}>Who needs <em>whom</em>?</h2>
          <p className={s.headLede}>Emerson&rsquo;s point is relational: dependence rises when a valued outcome is mediated by a partner and alternatives are scarce. Power is the asymmetry in that dependence, not a person-level score.</p>
        </div>
        <PowerLab model={d.power} />
      </Chapter>

      {/* 06 · a transaction is one turn; a relationship is the history */}
      <Chapter id="history" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="06">Transaction and relationship</Kicker>
          <h2 className={s.h2}>A transaction is not a <em>relationship</em>.</h2>
          <p className={s.headLede}>A single exchange can be analysed without claiming a durable relationship. A relationship is built, revised, or weakened through feedback across exchanges.</p>
        </div>
        <RelationshipSpiral stages={d.relationshipStages} />
      </Chapter>

      {/* 07 · sign and action are separate; constraints redirect */}
      <Chapter id="response" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="07">Value and activity</Kicker>
          <h2 className={s.h2}>Positive / negative is <em>not enough</em>.</h2>
          <div className={s.headLede}>
            <p>A positive or negative outcome does not fully identify what the actor does. Activity and hedonic value can vary separately.</p>
            <p>Actors can want to reciprocate and still lack the resources, time, role permission, safety, or alternatives to do so directly.</p>
          </div>
        </div>
        <ResponseStrand cells={d.hedonic} constraints={d.constraints} />
        <p className={s.teachingNote}><Glyph g="▲" /> Later theoretical remedies keep hedonic direction and activity distinct; a benefit does not force activity, and a cost does not prescribe one response.</p>
        <p className={s.synthesis}><span className={s.badge}>later refinement</span> Constraints may reduce or redirect activity while the actor&rsquo;s hedonic direction remains positive. They do not make response deterministic.</p>
      </Chapter>

      {/* 08 · reading an exchange, and auditing a claim */}
      <Chapter id="audit" density="quiet" className={s.band}>
        <div className={s.head}>
          <Kicker num="08">Reading and auditing</Kicker>
          <h2 className={s.h2}>One response becomes the <em>next action</em>.</h2>
          <p className={s.headLede}>SET becomes relational when the present exchange changes the conditions under which the next exchange will be interpreted.</p>
        </div>
        <Chain steps={d.chain} />
        <div className={s.subhead}>
          <p className={s.smallHead}>Before you call it SET</p>
          <h3 className={s.h3}>Do you actually have an <em>SET model</em>?</h3>
          <p className={s.subLede}>Before calling a finding &ldquo;SET&rdquo;, audit the exchange rather than attaching the label to any helpful or harmful relationship.</p>
        </div>
        <Audit items={d.audit} />
      </Chapter>

      {/* 09 · a family of traditions, dated */}
      <Chapter id="family" density="active" className={s.band}>
        <div className={s.head}>
          <Kicker num="09">A family, not a diagram</Kicker>
          <h2 className={s.h2}>Why isn&rsquo;t there one <em>SET diagram</em>?</h2>
          <p className={s.headLede}>The label names a family of traditions. Their shared concern is interdependence; their preferred units, mechanisms, and outcomes differ.</p>
        </div>
        <FamilyMap nodes={d.family} />
        <div className={s.trailWrap}>
          <CodaHead kicker="The trail" title="Six works, sixty years">
            <p>{r.trailLede}</p>
          </CodaHead>
          <Trail nodes={r.origins} />
        </div>
      </Chapter>

      {/* 10 · limits — quieter */}
      <Chapter id="limits" density="quiet" className={s.band}>
        <CodaHead kicker="10 · Scope and limits" title={<>What SET explains — and <em>where it stops</em>.</>}>
          <p>SET is a family of lenses for interdependence and exchange.</p>
        </CodaHead>
        <BoundaryMap explains={d.scope.explains} stops={d.scope.stops} explainsLabel="What the lens makes visible" stopsLabel="The lens has boundaries" note={d.scope.note} />
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

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="11 · Sources" title={r.minimumReadingLabel ?? "If you read seven things"} />
        <SourceShelf items={r.minimumReading} />
        <p className={s.smallHead} style={{ marginTop: "2.4rem" }}>Also drawn on</p>
        <SourceShelf items={r.fullSources.filter((f) => !r.minimumReading.some((m) => m.citation === f.citation))} start={r.minimumReading.length + 1} />
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="12 · Provenance" title="Where every claim came from">
          <p>The three opening moments, the specify-it exercise, the profile illustrations and every drawing on this page are constructed teaching material (▲), written or drawn for this record.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}
