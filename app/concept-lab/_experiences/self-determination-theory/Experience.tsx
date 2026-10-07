import type { CSSProperties, ReactNode } from "react";
import type { SourceNote, TheoryRecord } from "@/content/types";
import { Folio, Chapter, Glyph, Margin, FolioIdentity, type ChapterEntry } from "../../_folio/Folio";
import { SourceShelf, ProvenanceLedger, Cautions, OpenQuestions, BoundaryMap, Trail, CodaHead, BesideOtherLenses } from "../../_folio/Coda";
import { Rich } from "../../_components/Sketch";
import * as hand from "../../_folio/hand";
import { ReasonRegister } from "./Terrain";
import { Rule } from "./Rule";
import { Needs } from "./Needs";
import { ContextFlow, RewardLens } from "./Bonus";
import { buildPlaces } from "./places";
import s from "./sdt.module.css";

/* ---------------------------------------------------------------------------
   Self-Determination Theory — WHOSE REASON IS IT?

   The knowledge is a comparison of reasons. One act can be moved by six
   different kinds of reason, ordered by how far the person holds the reason
   as their own, and read two different ways: by what the behaviour is for
   (extrinsic or intrinsic) and by whose the reason feels (controlled or
   autonomous). So the page opens on one continuous workplace — a recurring
   worker in six surrounding situations — that is also the working field: readers plant flags for every
   reason that is true of a task they do, because most behaviour is mixed.

   Below it the page follows how a demand gets taken in, what a situation does
   to three needs, and how the same bonus can press or inform. The register
   then slows into the record's own scholarship.
   ------------------------------------------------------------------------- */

const CHAPTERS: ChapterEntry[] = [
  { id: "same", num: "01", label: "Same night" },
  { id: "rule", num: "02", label: "Taking a demand in" },
  { id: "needs", num: "03", label: "Three needs" },
  { id: "context", num: "04", label: "Context and reward" },
  { id: "family", num: "05", label: "A family" },
  { id: "limits", num: "06", label: "Limits" },
  { id: "trail", num: "07", label: "Trail" },
  { id: "sources", num: "08", label: "Sources" },
  { id: "provenance", num: "09", label: "Provenance" },
];

const ART = "/visual-language/theories/sdt";
const ALT =
  "An open work notebook and writing hand remain constant amid overlapping graphite and coloured-pencil traces in vermilion, ochre, cobalt and teal. The marks are a teaching field, not measurement; live text names the different kinds of reason.";

function Head({ id, num, hue, children, lede }: { id: string; num: string; hue: string; children: ReactNode; lede?: ReactNode }) {
  return (
    <header className={s.chHead} style={{ "--chn": hue } as CSSProperties}>
      <span className={s.chNum} aria-hidden="true">{num}</span>
      <h2 className={s.chTitle} id={id}>{children}</h2>
      {lede && <div className={s.chLede}>{lede}</div>}
    </header>
  );
}

function SrcNote({ n, className }: { n: SourceNote; className?: string }) {
  return (
    <div role="note" className={[s.srcNote, className].filter(Boolean).join(" ")}>
      <p className={s.srcKick}><Glyph g="●" /> What the sources add · {n.label}</p>
      <p>{n.body}</p>
      <p className={s.srcBy}>{n.source}</p>
    </div>
  );
}

export function SDTExperience({ record: r }: { record: TheoryRecord }) {
  const d = r.sdt!;
  const note = (key: string) => {
    const n = r.sourceNotes?.find((x) => x.key === key);
    if (!n) throw new Error(`SDT: the record has no source note "${key}"`);
    return n;
  };
  const places = buildPlaces(d.regulations, d.motives);
  const [caseA, caseB] = d.opening.cases;
  const mini = d.miniTheories;
  const sources = r.minimumReading ?? [];
  const alsoConsulted = r.fullSources.filter((f) => !sources.some((m) => m.citation === f.citation));

  const sky = (
    <>
      <FolioIdentity record={r} />
      <h1 className={s.title}>Self-Determination <em>Theory</em></h1>
      <p className={s.hook}>{r.hook}</p>
    </>
  );
  const skyAside = (
    <>
      <p className={s.lede}>{r.oneSentence}</p>
      <Margin tone="kind" className={s.skyMargin}>same action · different why</Margin>
    </>
  );

  const opening = (
    <header className={s.opening}>
      <ReasonRegister
        places={places}
        plateSrc={`${ART}/sdt-reason-field-v2.webp`}
        plateWidth={1536}
        plateHeight={1024}
        description={ALT}
        sky={sky}
        skyAside={skyAside}
        caption={<><Glyph g="▲" /> One note-taking action remains in view while overlapping pencil traces invite different readings of why it is done. The marks are a teaching construction, not data, a scale or a developmental path. Each reason and distinction is live text; motives may be mixed and nothing is scored.</>}
      />
      <div className={s.rowNotes}>
        <SrcNote n={note("not-a-staircase")} />
        <SrcNote n={note("amotivation-roots")} />
        <SrcNote n={note("mixed-motives")} />
      </div>
    </header>
  );

  return (
    <Folio record={r} chapters={CHAPTERS} opening={opening} className={s.page} mapLabel="Self-Determination Theory">
      {/* 01 · the same night */}
      <Chapter id="same" density="active" className={s.band} labelledBy="h-same">
        <Head id="h-same" num="01" hue="var(--pen)" lede={<p>Two people work the same late night. From outside the effort looks alike; the reason moving it may not.</p>}>
          Same night, <em>two reasons</em>.
        </Head>
        <div className={s.same}>
          <article className={s.voiceCard} data-side="a">
            <p className={s.voiceWho}>{caseA.label}</p>
            <blockquote className={s.voiceQuote}>“{caseA.quote}”</blockquote>
            <p className={s.voiceBody}>{caseA.body}</p>
          </article>
          <div className={s.actionLine} aria-hidden="true">
            <svg viewBox="0 0 40 160" preserveAspectRatio="none"><path d={hand.line(20, 4, 21, 156, { seed: 11, wander: 1.4, segments: 8 })} /></svg>
            <span>the same night</span>
          </div>
          <article className={s.voiceCard} data-side="b">
            <p className={s.voiceWho}>{caseB.label}</p>
            <blockquote className={s.voiceQuote}>“{caseB.quote}”</blockquote>
            <p className={s.voiceBody}>{caseB.body}</p>
          </article>
        </div>
        <p className={s.teachingNote}><Glyph g="▲" /> {d.opening.note}</p>
      </Chapter>

      {/* 02 · taking a demand in */}
      <Chapter id="rule" density="rich" className={s.band} labelledBy="h-rule">
        <Head id="h-rule" num="02" hue="var(--c-intro-ink)" lede={<><p>{d.internalisation.lede}</p></>}>
          How a demand gets <em>taken in</em>.
        </Head>
        <Rule internalisation={d.internalisation} expl="Teaching drawing. Type is a device: it says whose voice the sentence is in, not how much motivation there is. The four are places a reason can sit, not stages a person must pass through." />
        <p className={s.teachingNote}><Glyph g="?" /> {d.internalisation.note}</p>
        <SrcNote n={note("what-helps-internalise")} />
      </Chapter>

      {/* 03 · three questions */}
      <Chapter id="needs" density="active" className={s.band} labelledBy="h-needs">
        <Head id="h-needs" num="03" hue="var(--c-need-ink)" lede={<p>Beneath the quality of motivation sit three psychological needs. They are experiences a situation can support, leave unsupported or work against. They are not three ingredients in a formula.</p>}>
          Three questions a situation <em>answers</em>.
        </Head>
        <Needs
          needs={d.needs}
          comparison={d.needComparison}
          matrix={d.autonomyMatrix.cases}
          matrixNote={d.autonomyMatrix.note}
          universal={note("needs-universal")}
        />
      </Chapter>

      {/* 04 · context and the same bonus */}
      <Chapter id="context" density="active" className={s.band} labelledBy="h-context">
        <Head id="h-context" num="04" hue="var(--c-intr-ink)" lede={<p>{d.context.note}</p>}>
          Context gets <em>inside</em> motivation.
        </Head>
        <ContextFlow context={d.context} model={d.workModel} />
        <RewardLens rewards={d.rewards} source={note("reward-pattern")} />
      </Chapter>

      {/* 05 · a family */}
      <Chapter id="family" density="active" className={s.band} labelledBy="h-family">
        <Head id="h-family" num="05" hue="var(--c-integ-ink)" lede={<p>SDT is a macro-theory made of mini-theories, each built to answer a different motivational question. The family should not be flattened into six boxes feeding one outcome.</p>}>
          A family of <em>connected questions</em>.
        </Head>
        <ol className={s.family}>
          {mini.map((m) => (
            <li key={m.acronym} className={s.volume} data-emphasis={m.emphasis} style={{ "--vc": m.colour } as CSSProperties}>
              <p className={s.volumeAcr}>{m.acronym}</p>
              <h3 className={s.volumeTitle}>{m.title}</h3>
              <p className={s.volumeQ}>{m.question}</p>
              <p className={s.volumeTag}>{m.emphasis === "core" ? "This record leans on it" : "Adjacent, named but not developed"}</p>
            </li>
          ))}
        </ol>
        <p className={s.teachingNote}><Glyph g="✦" /> Which mini-theories are drawn as core and which as adjacent is the Concept Lab’s teaching arrangement. All six are named in Ryan and Deci’s (2022) overview; the family map is not their diagram.</p>
      </Chapter>

      {/* 06 · scope, cautions, open questions */}
      <Chapter id="limits" density="quiet" className={s.band} labelledBy="h-limits">
        <CodaHead id="h-limits" kicker="06 · Scope and limits" title={<>What SDT explains, and <em>where it stops</em>.</>}>
          <p>SDT gives a motivational map. The map is not every outcome.</p>
        </CodaHead>
        <BoundaryMap explains={d.scope.explains} stops={d.scope.stops} explainsLabel="SDT gives us a motivational map" stopsLabel="The map is not every outcome" note={d.scope.note} />
        <div className={s.limits}>
          <div>
            <p className={s.smallHead}>Do not conclude</p>
            <Rich as="p" className={s.limitsLede} html={r.oversimplificationsLede ?? ""} />
            <Cautions items={r.oversimplifications ?? []} />
          </div>
          <div>
            <p className={s.smallHead}>Still open</p>
            <OpenQuestions items={r.qualifications} />
          </div>
        </div>
        <BesideOtherLenses record={r} />
      </Chapter>

      <Chapter id="trail" density="scholarly" className={s.band}>
        <CodaHead kicker="07 · The trail" title="From intrinsic motivation to a family of theories">
          <p>{r.trailLede}</p>
          {r.originsNote && <p>{r.originsNote}</p>}
        </CodaHead>
        <Trail nodes={r.origins ?? []} />
      </Chapter>

      <Chapter id="sources" density="scholarly" className={s.band}>
        <CodaHead kicker="08 · Sources" title={r.minimumReadingLabel ?? "If you read five things"} />
        <SourceShelf items={sources} />
        {alsoConsulted.length > 0 && (
          <>
            <p className={s.smallHead} style={{ marginTop: "2rem" }}>Also drawn on</p>
            <SourceShelf items={alsoConsulted} start={sources.length + 1} />
          </>
        )}
      </Chapter>

      <Chapter id="provenance" density="scholarly" className={s.band}>
        <CodaHead kicker="09 · Provenance" title="Where every claim came from">
          <p>The two opening employees, the six statements, every flag reading and every drawing on this page are constructed teaching material (▲) or the Concept Lab’s own explanation (✦). The notes headed “What the sources add” are marked ● and name the paper they come from.</p>
        </CodaHead>
        <ProvenanceLedger items={r.provenance} />
      </Chapter>
    </Folio>
  );
}
