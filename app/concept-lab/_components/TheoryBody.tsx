import type { ReactNode } from "react";
import type { Source, TheoryRecord } from "@/content/types";
import { ArrowSmall, Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";
import { SDTBody } from "./SDTBody";
import { SETBody } from "./SETBody";
import { ASABody } from "./ASABody";
import { MeyerBody } from "./MeyerBody";
import { TonalBody } from "./TonalBody";
import { GestaltBody } from "./GestaltBody";
import { GTTMBody } from "./GTTMBody";
import { NarmourBody } from "./NarmourBody";
import { HuronBody } from "./HuronBody";
import { StatisticalBody } from "./StatisticalBody";
import { IdyomBody } from "./IdyomBody";
import { PredictiveProcessingBody } from "./PredictiveProcessingBody";
import { RECORDS, KIND, recordHref } from "@/content/records";
import { Cascade } from "./Cascade";
import { TheoryDemo } from "./TheoryDemo";
import {
  ConceptComparison,
  EvidenceXray,
  FeatureEventExercise,
  ModelReveal,
  ReactionContrast,
  ScopeMap,
  SimpleModel,
  WorkdayTimeline,
} from "./TheoryPatterns";

/* ---------------------------------------------------------------------------
   Section-driven theory template.

   Each block renders only if the record carries data for it; numbering and the
   contents rail are generated from whatever survives. A theory with dual
   pathways and a challenge/hindrance split does not have to be forced into the
   shape of one about correspondence.
   ------------------------------------------------------------------------- */

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

/** One side of a disambiguation: what this page covers, or what it does not. */
function DisambigSide({
  side,
  tone,
  sources,
}: {
  side: { title: string; blurb: string; items: string[] };
  tone: "teal" | "red";
  sources?: Source[];
}) {
  return (
    <div className={`sk-box ${tone} ${tone === "teal" ? "tilt-l2" : "tilt-r2"}`}>
      <div style={{ display: "flex", gap: ".55rem", alignItems: "center" }}>
        <Icon id={tone === "teal" ? "i-check" : "i-x"} style={{ width: 22, height: 22, color: `var(--${tone})`, flex: "none" }} />
        <h3 style={{ fontSize: "1.05rem", color: `var(--${tone})` }}>{side.title}</h3>
      </div>
      <Rich className="read" as="p" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".45rem" }} html={side.blurb} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginTop: ".7rem" }}>
        {side.items.map((x) => <span className="fact" key={x}>{x}</span>)}
      </div>
      {sources && sources.length > 0 && (
        <div style={{ marginTop: ".9rem", paddingTop: ".7rem", borderTop: "1.6px dashed rgba(28,27,25,.22)" }}>
          <p className="k">go here instead</p>
          <div style={{ marginTop: ".35rem" }}><SourceList items={sources} /></div>
        </div>
      )}
    </div>
  );
}

function SourceList({ items }: { items: Source[] }) {
  return (
    <>
      {items.map((s, i) => (
        <div className="src-item" key={s.citation + i}>
          <span className="n">{i + 1}</span>
          <div>
            <Rich className="c" as="div" html={s.citation} />
            <div className="w">{s.contribution}</div>
            {s.doi && <div className="doi">doi {s.doi}</div>}
          </div>
        </div>
      ))}
    </>
  );
}

export function TheoryBody({ record: r }: { record: TheoryRecord }) {
  if (r.sdt) return <SDTBody record={r} />;
  if (r.set) return <SETBody record={r} />;
  if (r.asa) return <ASABody record={r} />;
  if (r.meyer) return <MeyerBody record={r} />;
  if (r.tonal) return <TonalBody record={r} />;
  if (r.gestalt) return <GestaltBody record={r} />;
  if (r.gttm) return <GTTMBody record={r} />;
  if (r.narmour) return <NarmourBody record={r} />;
  if (r.huron) return <HuronBody record={r} />;
  if (r.statistical) return <StatisticalBody record={r} />;
  if (r.idyom) return <IdyomBody record={r} />;
  if (r.predictiveProcessing) return <PredictiveProcessingBody record={r} />;

  const B: Block[] = [];

  /* Blocks ship with a default heading; a record overrides it by key, so the
     two-category block reads "Everything in a job goes in one of two buckets"
     for Job Demands-Resources and "Person-Music Fit: the two sides" elsewhere.
     A record may also set `order` to sequence the blocks it uses. */
  const add = (key: string, defToc: string, defTitle: string, colour: string, body: ReactNode) =>
    B.push({
      key,
      toc: r.headings?.[key]?.toc ?? defToc,
      title: r.headings?.[key]?.title ?? defTitle,
      colour,
      body,
    });

  /* The demo belongs beside whatever it illustrates. Records say where with
     `demoIn`; otherwise it sits with the models block, or the idea. */
  const demoHome = r.demoIn ?? (r.models ? "models" : "idea");
  const demoFor = (key: string) => (r.demo && demoHome === key ? <TheoryDemo demo={r.demo} /> : null);

  /* disambiguation — where one name covers two different literatures */
  if (r.disambiguation) {
    const d = r.disambiguation;
    add("disambiguation", "Two things, one name", "Two different literatures answer to this name", "var(--red)", (
      <>
        <div className="sk-box red tilt-l2" style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", gap: ".7rem", alignItems: "flex-start" }}>
            <Icon id="i-warn" style={{ width: 30, height: 30, color: "var(--red)", flex: "none" }} />
            <Rich className="read" as="p" style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--pen-2)" }} html={d.flag} />
          </div>
        </div>
        <div className="grid2" style={{ marginTop: "1.1rem" }}>
          <DisambigSide side={d.covered} tone="teal" />
          <DisambigSide side={d.notCovered} tone="red" sources={d.notCovered.sources} />
        </div>
        <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 680 }}>
          <Cloud colour="#E24E1B">
            <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
              <Icon id="i-star" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
              <Rich className="read" as="p" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)" }} html={d.note} />
            </div>
          </Cloud>
        </div>
      </>
    ));
  }

  /* a colloquial name, or an unqualified one, corrected to what the literature uses */
  if (r.terminology) {
    add("terminology", "What to call it", "What to call it", "var(--red)", (
      <>
        <Rich className="lede" as="p" html={r.terminologyLede ?? ""} />
        <div style={{ marginTop: "1rem" }}>
          {r.terminology.map((t, i) => (
            <div className={`sk-box tight ${i % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ marginTop: ".7rem" }} key={t.now}>
              <div className="term-shift">
                <span className="term-was">{t.was}</span>
                <svg style={{ width: 30, height: 20, color: "var(--red)", flex: "none" }} viewBox="0 0 40 20" aria-hidden="true">
                  <path d="M4 10c10-.3 21-.4 31 0" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
                  <path d="M27 4c3.4 2.4 6.6 4.4 9.4 6-2.8 1.6-5.6 3.6-8.4 6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="term-now" style={{ color: "var(--red)" }}>{t.now}</span>
              </div>
              <Rich className="read" as="p" style={{ fontSize: ".88rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".5rem" }} html={t.note} />
            </div>
          ))}
        </div>
      </>
    ));
  }

  /* an explicit relation to another record already in the library */
  if (r.relatedTo) {
    const links = r.relatedTo
      .map((l) => ({ link: l, target: RECORDS.find((x) => x.id === l.recordId) }))
      .filter((x) => x.target);
    if (links.length) {
      add("relatedTo", "Where it sits", "Where this sits in the library", "var(--teal)", (
        <>
          <Rich className="lede" as="p" html={r.relatedToLede ?? ""} />
          {links.map(({ link, target }) => {
            const k = KIND[target!.kind];
            return (
              <a className="rel-card" href={recordHref(target!)} key={link.recordId}>
                <span className="rel-relation">this record {link.relation}</span>
                <span className="rel-title">{target!.title}</span>
                <span className="rel-hook">{target!.hook}</span>
                <Rich className="rel-body read" as="span" html={link.body} />
                <span className="rel-go" style={{ color: k.colour }}>{k.cta} →</span>
              </a>
            );
          })}
        </>
      ));
    }
  }

  /* conceptual status — for records that are a field rather than one theory */
  if (r.conceptualStatus) {
    const cs = r.conceptualStatus;
    add("conceptualStatus", "What this is", "What this is, and what it is not", "var(--red)", (
      <>
        <div className="sk-box red tilt-l2" style={{ maxWidth: 700 }}>
          <div style={{ display: "flex", gap: ".7rem", alignItems: "flex-start" }}>
            <Icon id="i-warn" style={{ width: 30, height: 30, color: "var(--red)", flex: "none" }} />
            <div>
              <h3 style={{ fontSize: "1.15rem", color: "var(--red)" }}>{cs.flag}</h3>
              <Rich className="read" as="p" style={{ fontSize: ".95rem", lineHeight: 1.6, color: "var(--pen-2)", marginTop: ".4rem" }} html={cs.body} />
            </div>
          </div>
        </div>
        <p className="k" style={{ marginTop: "1.2rem" }}>what the field sets out to explain</p>
        <div style={{ marginTop: ".5rem" }}>
          {cs.questions.map((q, i) => (
            <div className="bullet" key={q}>
              <svg style={{ color: "var(--teal)" }} aria-hidden="true"><use href="#i-q" /></svg>
              <Rich className="read" as="span" style={{ fontSize: ".95rem", lineHeight: 1.6, color: "var(--pen-2)" }} html={`<b>0${i + 1}</b> &nbsp; ${q}`} />
            </div>
          ))}
        </div>
      </>
    ));
  }

  /* the idea — unless another block already opens the record */
  if (r.ideaLede) {
    add("idea", "The idea", "The idea", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={r.ideaLede} />
      {demoFor("idea")}
      {r.originsNote && (
        <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 660 }}>
          <Cloud colour="#2E7D8F">
            <div style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
              <Icon id="i-q" style={{ width: 26, height: 26, color: "var(--teal)", flex: "none" }} />
              <Rich className="read" as="p" style={{ fontSize: ".91rem", lineHeight: 1.55, color: "var(--teal)" }} html={r.originsNote} />
            </div>
          </Cloud>
        </div>
      )}
    </>
    ));
  }

  /* a compact classification: the distinction is the lesson, not the score */
  if (r.classification) {
    add("classification", "Feature or event?", "Feature or event?", "var(--red)", (
      <>
        <p className="lede">Work features are relatively enduring aspects of the situation. Work events are changes or occurrences that become affectively significant. The distinction is useful before we ask what anyone felt.</p>
        <FeatureEventExercise data={r.classification} />
      </>
    ));
  }

  /* start with the deliberately incomplete event-to-affect shortcut */
  if (r.simpleModel) {
    add("simpleModel", "The first shortcut", "The simple model — and why it is not enough", "var(--red)", (
      <SimpleModel data={r.simpleModel} />
    ));
  }

  /* the full macrostructure, revealed as a drawing rather than a finished map */
  if (r.modelReveal) {
    add("modelReveal", "Build the model", "Build the AET macrostructure", "var(--teal)", (
      <ModelReveal data={r.modelReveal} />
    ));
  }

  /* within-person variation over a constructed workday */
  if (r.workday) {
    add("workday", "One workday", "One workday, many affective moments", "var(--red)", (
      <WorkdayTimeline data={r.workday} />
    ));
  }

  /* current affect, accumulated experience, beliefs, and satisfaction are not one thing */
  if (r.conceptComparison) {
    add("conceptComparison", "Affect ≠ satisfaction", "Affect is not job satisfaction", "var(--teal)", (
      <ConceptComparison data={r.conceptComparison} />
    ));
  }

  /* a signalling chain, drawn as a schematic */
  if (r.cascade) {
    add("cascade", "The cascade", "The cascade", "var(--plum-deep)", (
      <>
        <Rich className="lede" as="p" html={r.cascadeLede ?? ""} />
        <Cascade data={r.cascade} />
      </>
    ));
  }

  /* how the thing is measured, and what each approach can actually tell you */
  if (r.measures) {
    add("measures", "Measuring it", "Measuring it, and what each measure can say", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.measuresLede ?? ""} />
        <div className="measure-table">
          <div className="measure-head">
            <span>Method</span><span>What it tells you</span><span>The catch</span>
          </div>
          {r.measures.map((m) => (
            <div className="measure-row" key={m.method}>
              <span className="measure-method" data-label="Method">{m.method}</span>
              <Rich className="measure-tells" as="span" data-label="What it tells you" html={m.tells} />
              <Rich className="measure-caution" as="span" data-label="The catch" html={m.caution} />
            </div>
          ))}
        </div>
        {r.measuresNote && (
          <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 690 }}>
            <Cloud colour="#E24E1B">
              <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
                <Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
                <Rich className="read" as="p" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)" }} html={r.measuresNote} />
              </div>
            </Cloud>
          </div>
        )}
      </>
    ));
  }

  /* an ordered succession of models, where the succession is the point */
  if (r.models) {
    add("models", "The models", "How the structure has been modelled", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.modelsLede ?? ""} />
        {demoFor("models")}
        <div className="model-row">
          {r.models.map((m, i) => (
            <div className={`sk-box ${i % 2 ? "tilt-r2" : "tilt-l2"}`} key={m.name}>
              <div className="model-year">{m.year}</div>
              <h3 style={{ fontSize: "1.05rem", marginTop: ".3rem" }}>{m.name}</h3>
              <div className="model-src">{m.source}</div>
              <Rich className="read" as="p" style={{ fontSize: ".89rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".5rem" }} html={m.body} />
              {m.note && (
                <div style={{ display: "flex", gap: ".45rem", alignItems: "flex-start", marginTop: ".6rem" }}>
                  <Icon id="i-star" style={{ width: 18, height: 18, color: "var(--red)", flex: "none", marginTop: 3 }} />
                  <Rich className="read" as="span" style={{ fontSize: ".85rem", lineHeight: 1.5, color: "var(--red)" }} html={m.note} />
                </div>
              )}
            </div>
          ))}
        </div>
        {r.modelsNote && (
          <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 680 }}>
            <Cloud colour="#E24E1B">
              <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
                <Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
                <Rich className="read" as="p" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)" }} html={r.modelsNote} />
              </div>
            </Cloud>
          </div>
        )}
      </>
    ));
  }

  /* an applied literature, anchored to the studies that make it up */
  if (r.applied) {
    add("applied", "Applied", "Where the field meets the workplace", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.appliedLede ?? ""} />
        {r.applied.map((a, i) => (
          <div className={`sk-box ${i % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ marginTop: "1rem" }} key={a.work}>
            <div className="study-hd">
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
                <span className="study-n">{a.year}</span>
                <div>
                  <h3 style={{ fontSize: "1.02rem" }}>{a.authors}</h3>
                  <Rich className="model-src" as="div" html={a.work} />
                </div>
              </div>
            </div>
            <Rich className="read" as="p" style={{ fontSize: ".9rem", lineHeight: 1.6, color: "var(--pen-2)", marginTop: ".6rem" }} html={a.body} />
          </div>
        ))}
      </>
    ));
  }

  /* two categories */
  if (r.categories) {
    add("categories", "Two buckets", "Everything in a job goes in one of two buckets", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.categoriesLede ?? ""} />
        <div className="grid2" style={{ marginTop: "1rem" }}>
          {r.categories.map((c, i) => (
            <div className={`sk-box ${i ? "teal tilt-r2" : "red tilt-l2"}`} key={c.title}>
              <div style={{ display: "flex", gap: ".55rem", alignItems: "center" }}>
                <Icon id={c.icon} style={{ width: 28, height: 28, color: c.colour, flex: "none" }} />
                <h3 style={{ fontSize: "1.08rem", color: c.colour }}>{c.title}</h3>
              </div>
              <p className="read" style={{ fontSize: ".89rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".5rem" }}>{c.definition}</p>
              <p className="k" style={{ marginTop: ".7rem" }}>typically</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginTop: ".3rem" }}>
                {c.examples.map((e) => <span className="fact" key={e}>{e}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "flex-start", marginTop: ".9rem", maxWidth: "60ch" }}>
          <Icon id="i-star" style={{ width: 20, height: 20, color: "var(--red)", flex: "none", marginTop: 3 }} />
          <span style={{ color: "var(--red)", fontSize: ".94rem" }}>{r.categoriesNote}</span>
        </div>
      </>
    ));
  }

  /* dual pathways */
  if (r.pathways) {
    add("pathways", "Two roads", "Two roads out of the same job", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.pathwaysLede ?? ""} />
        {demoFor("pathways")}
        {r.pathways.map((p) => (
          <div style={{ marginTop: "1.1rem" }} key={p.title}>
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
              <Icon id={p.icon} style={{ width: 26, height: 26, color: p.colour, flex: "none" }} />
              <h3 style={{ fontSize: "1.05rem", color: p.colour }}>{p.title}</h3>
            </div>
            <p className="read" style={{ fontSize: ".89rem", lineHeight: 1.5, color: "var(--pen-2)", margin: ".35rem 0 .6rem", maxWidth: "62ch" }}>{p.blurb}</p>
            <div className="chain">
              {p.steps.map((step, n) => {
                const last = n === p.steps.length - 1;
                return (
                  <span key={step} style={{ display: "contents" }}>
                    <div className={`node sk-box tight flat${last ? (p.colour === "var(--red)" ? " red" : " teal") : ""}`}>
                      <span className="k" style={last ? { color: p.colour } : undefined}>0{n + 1}</span>
                      <p style={{ fontSize: ".9rem", lineHeight: 1.25, marginTop: ".2rem", ...(last ? { color: p.colour } : {}) }}>{step}</p>
                    </div>
                    {!last && <ArrowSmall colour={p.colour} />}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
        <div className="tilt-l2" style={{ marginTop: "1.2rem", maxWidth: 660 }}>
          <Cloud colour="#E24E1B">
            <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
              <Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
              <p className="read" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)" }}>{r.pathwaysCaution}</p>
            </div>
          </Cloud>
        </div>
      </>
    ));
  }

  /* challenge vs hindrance */
  if (r.demandTypes) {
    add("demandTypes", "Challenge vs hindrance", "Not all demands are the same kind of hard", "var(--red)", (
      <>
        <Rich className="lede" as="p" html={r.demandTypesLede ?? ""} />
        <div className="grid2" style={{ marginTop: "1rem" }}>
          {r.demandTypes.map((d, i) => (
            <div className={`sk-box ${i ? "red tilt-r2" : "teal tilt-l2"}`} key={d.title}>
              <h3 style={{ fontSize: "1.05rem", color: d.colour }}>{d.title}</h3>
              <p className="read" style={{ fontSize: ".89rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".4rem" }}>{d.definition}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginTop: ".65rem" }}>
                {d.examples.map((e) => <span className="fact" key={e}>{e}</span>)}
              </div>
              <Rich className="read" as="p" style={{ fontSize: ".86rem", lineHeight: 1.5, color: "var(--pen-3)", marginTop: ".65rem" }} html={`<b>Tends to relate to:</b> ${d.relates}`} />
            </div>
          ))}
        </div>
        <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 660 }}>
          <Cloud colour="#E24E1B">
            <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
              <Icon id="i-star" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
              <p className="read" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)" }}>{r.demandTypesNote}</p>
            </div>
          </Cloud>
        </div>
      </>
    ));
  }

  /* interactions */
  if (r.interactions) {
    add("interactions", "Where they cross", "Where the two roads cross", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.interactionsLede ?? ""} />
        {demoFor("interactions")}
        <div className="grid2" style={{ marginTop: "1rem" }}>
          {r.interactions.map((x, i) => (
            <div className={`sk-box tight ${i ? "tilt-r2" : "tilt-l2"} fill`} key={x.title}>
              <span className="k">{x.kicker}</span>
              <h3 style={{ fontSize: "1rem", marginTop: ".2rem" }}>{x.title}</h3>
              <Rich className="read" as="p" style={{ fontSize: ".88rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".35rem" }} html={x.body} />
            </div>
          ))}
        </div>
      </>
    ));
  }

  if (r.reactionContrast) {
    add("reactionContrast", "Same event, different reaction", "The same event does not guarantee the same reaction", "var(--red)", (
      <ReactionContrast data={r.reactionContrast} />
    ));
  }

  if (r.evidenceXrays) {
    add("evidenceXrays", "Evidence X-ray", "What has actually been tested?", "var(--teal)", (
      <>
        <p className="lede">These studies support parts of the AET picture. None should be used as blanket validation of every arrow in the macrostructure.</p>
        <EvidenceXray items={r.evidenceXrays} />
      </>
    ));
  }

  if (r.scopeMap) {
    add("scopeMap", "Where it stops", "What AET explains — and where it stops", "var(--teal)", (
      <ScopeMap data={r.scopeMap} />
    ));
  }

  /* later expansions */
  if (r.expansions) {
    add("expansions", "What got added", "What got added later", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.expansionsLede ?? ""} />
        {demoFor("expansions")}
        <div className="grid2" style={{ marginTop: "1rem" }}>
          {r.expansions.map((e, i) => (
            <div className={`sk-box tight ${i % 2 ? "tilt-r2" : "tilt-l2"}`} key={e.title}>
              <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
                <Icon id={e.icon} style={{ width: 30, height: 30, flex: "none", color: e.colour }} />
                <div>
                  <h3 style={{ fontSize: ".98rem" }}>{e.title}</h3>
                  <p className="read" style={{ fontSize: ".86rem", lineHeight: 1.5, color: "var(--pen-2)", marginTop: ".2rem" }}>{e.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ));
  }

  /* core processes (PEF) */
  if (r.coreProcesses) {
    add("coreProcesses", "Two flavours", "Two flavours of correspondence", "var(--teal)", (
      <>
        <p className="lede">Same word, two different questions. Which one a study means changes what its answer is worth.</p>
        <div className="grid2" style={{ marginTop: "1rem" }}>
          {r.coreProcesses.map((p, i) => (
            <div className={`sk-box ${i ? "tilt-r2" : "tilt-l2"}`} key={p.id}>
              <h3 style={{ fontSize: "1.05rem" }}>{p.title}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: ".6rem", margin: ".7rem 0" }}>
                <div style={{ flex: 1 }}>
                  <span className="k">person</span>
                  <p className="read" style={{ fontSize: ".89rem", lineHeight: 1.4 }}>{p.person}</p>
                </div>
                <svg style={{ width: 26, height: 20, flex: "none", color: "var(--red)" }} viewBox="0 0 40 20" aria-hidden="true">
                  <path d="M6 10c9-.3 19-.4 28 0" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
                  <path d="M12 5C9 7 6.6 8.6 4 10c2.6 1.4 5 3 7.6 5M28 5c3 2 5.4 3.6 8 5-2.6 1.4-5 3-7.6 5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <span className="k">setting</span>
                  <p className="read" style={{ fontSize: ".89rem", lineHeight: 1.4 }}>{p.environment}</p>
                </div>
              </div>
              <p className="read" style={{ fontSize: ".87rem", lineHeight: 1.55, color: "var(--pen-2)" }}>{p.explanation}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".9rem" }}>
          <Icon id="i-star" style={{ width: 20, height: 20, color: "var(--red)", flex: "none" }} />
          <span style={{ color: "var(--red)", fontSize: ".94rem" }}>the two are not interchangeable — check which one a study measured</span>
        </div>
      </>
    ));
  }

  /* fit targets (PEF) */
  if (r.fitTargets) {
    add("fitTargets", "Where fit shows up", "Where fit shows up", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={'Four targets. A good match with one <span class="hl">does not guarantee</span> a good match with another.'} />
        <div className="grid4" style={{ marginTop: "1rem" }}>
          {r.fitTargets.map((t, i) => (
            <div className={`sk-box tight ${i % 2 ? "tilt-r2" : "tilt-l2"}`} key={t.id}>
              <div style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
                <Icon id={t.icon} style={{ width: 38, height: 38, flex: "none", color: t.colour }} />
                <div>
                  <h3>{t.title}</h3>
                  <p className="read" style={{ fontSize: ".85rem", lineHeight: 1.45, color: "var(--pen-2)", marginTop: ".2rem" }}>{t.question}</p>
                  <p className="read" style={{ fontSize: ".83rem", lineHeight: 1.45, color: "var(--pen-3)", marginTop: ".4rem" }}><b>e.g.</b> {t.example}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ));
  }

  /* work adjustment (PEF) */
  if (r.workAdjustment) {
    add("workAdjustment", "A continuing relationship", "A continuing relationship", "var(--teal)", (
      <>
        <Rich className="body" as="p" html={r.workAdjustment.replace("Satisfaction", "<b>Satisfaction</b>").replace("satisfactoriness", "<b>satisfactoriness</b>")} />
        <div className="grid2" style={{ marginTop: "1rem" }}>
          <div className="sk-box tight tilt-l2 fill">
            <span className="k">the person’s view</span>
            <h3 style={{ marginTop: ".2rem" }}>Satisfaction</h3>
            <p className="read" style={{ fontSize: ".87rem", lineHeight: 1.5, color: "var(--pen-2)", marginTop: ".25rem" }}>Are this person’s needs met by what the environment supplies?</p>
          </div>
          <div className="sk-box tight tilt-r2 fill">
            <span className="k">the environment’s view</span>
            <h3 style={{ marginTop: ".2rem" }}>Satisfactoriness</h3>
            <p className="read" style={{ fontSize: ".87rem", lineHeight: 1.5, color: "var(--pen-2)", marginTop: ".25rem" }}>Are the environment’s requirements met by what this person can do?</p>
          </div>
        </div>
      </>
    ));
  }

  /* the trail — always */
  add("trail", "The trail", "The trail", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={r.trailLede} />
      <svg style={{ width: "100%", height: 58, color: "var(--teal)", margin: ".9rem 0 .3rem" }} viewBox="0 0 400 58" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6 42C48 16 84 48 126 24s70 28 112 4 76 24 150 4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={6} cy={42} r={3.6} fill="currentColor" />
        <circle cx={126} cy={24} r={3.6} fill="currentColor" />
        <circle cx={238} cy={28} r={3.6} fill="currentColor" />
        <circle cx={388} cy={26} r={3.6} fill="currentColor" />
      </svg>
      <div className="trail">
        {r.origins.map((o) => (
          <div className="trail-item" key={o.year + o.author}>
            <span className="trail-year">{o.year}</span>
            <div>
              <Rich as="h3" html={o.author} />
              <Rich className="work" as="span" html={o.work} />
              <Rich as="p" html={o.contribution} />
            </div>
          </div>
        ))}
      </div>
    </>
  ));

  /* don't conclude — always */
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={r.oversimplificationsLede} />
      <div className="grid2" style={{ marginTop: "1rem" }}>
        {r.oversimplifications.map((o, i) => (
          <div className={i % 2 ? "tilt-r2" : "tilt-l2"} key={o}>
            <Cloud colour="#E24E1B">
              <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
                <Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
                <Rich className="read" as="p" style={{ fontSize: ".89rem", lineHeight: 1.5, color: "var(--pen-2)" }} html={o} />
              </div>
            </Cloud>
          </div>
        ))}
      </div>
    </>
  ));

  /* still open — always */
  add("qualifications", "Still open", "Still open", "var(--teal)", (
    <div style={{ marginTop: ".4rem" }}>
      {r.qualifications.map((q) => <Bullet icon="i-q" colour="var(--teal)" html={q} key={q} />)}
    </div>
  ));

  /* sources — always */
  add("sources", "Sources", "Sources", "var(--teal)", (
    <>
      <div className="sk-box tilt-l2" style={{ marginTop: ".7rem" }}>
        <div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: ".4rem" }}>
          <Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} />
          <h3>{r.minimumReadingLabel ?? "If you read three things"}</h3>
        </div>
        <SourceList items={r.minimumReading} />
      </div>
      <div style={{ marginTop: "1.1rem" }}>
        <span className="k">the full trail</span>
        <div style={{ marginTop: ".4rem" }}>
          <SourceList items={r.fullSources} />
        </div>
      </div>
    </>
  ));

  /* provenance — always */
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", (
    <div className="prov" style={{ marginTop: ".8rem" }}>
      {r.provenance.map((p) => (
        <div className="prov-item" key={p.label} data-reveal="rise">
          <span className="g" style={{ color: p.colour }}>{p.glyph}</span>
          <div>
            <h4>{p.label}</h4>
            <p>{p.note}</p>
          </div>
        </div>
      ))}
    </div>
  ));

  /* Blocks are declared in a fixed order above, but the order a record should
     be *read* in is the record's business. Music Preference needs its applied
     literature after the explanatory blocks, not before them. Keys absent from
     `order` keep their declared position at the end. */
  const blocks = r.order
    ? [...B].sort((a, b) => {
        const rank = (k: string) => {
          const i = r.order!.indexOf(k);
          return i < 0 ? Number.MAX_SAFE_INTEGER : i;
        };
        return rank(a.key) - rank(b.key);
      })
    : B;

  const toc = blocks.map((b, i) => [pad2(i + 1), b.toc, `s${i + 1}`] as [string, string, string]);

  return (
    <RecordShell record={r} toc={toc}>
      {blocks.map((b, i) => (
        <span key={b.key} style={{ display: "contents" }}>
          {i > 0 && <Divider />}
          <section className="rec" id={`s${i + 1}`}>
            <SecHead num={pad2(i + 1)} title={b.title} colour={b.colour} />
            {b.body}
          </section>
        </span>
      ))}
    </RecordShell>
  );
}
