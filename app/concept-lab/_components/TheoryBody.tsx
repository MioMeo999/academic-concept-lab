import type { ReactNode } from "react";
import type { Source, TheoryRecord } from "@/content/types";
import { ArrowSmall, Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";
import { TheoryDemo } from "./TheoryDemo";

/* ---------------------------------------------------------------------------
   Section-driven theory template.

   Each block renders only if the record carries data for it; numbering and the
   contents rail are generated from whatever survives. A theory with dual
   pathways and a challenge/hindrance split does not have to be forced into the
   shape of one about correspondence.
   ------------------------------------------------------------------------- */

type Block = { toc: string; title: string; colour: string; body: ReactNode };

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
  const B: Block[] = [];
  const add = (toc: string, title: string, colour: string, body: ReactNode) => B.push({ toc, title, colour, body });

  /* the idea — always */
  add("The idea", "The idea", "var(--teal)", (
    <>
      <Rich className="lede" as="p" html={r.ideaLede} />
      {r.demo && <TheoryDemo demo={r.demo} />}
      <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 660 }}>
        <Cloud colour="#2E7D8F">
          <div style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
            <Icon id="i-q" style={{ width: 26, height: 26, color: "var(--teal)", flex: "none" }} />
            <Rich className="read" as="p" style={{ fontSize: ".91rem", lineHeight: 1.55, color: "var(--teal)" }} html={r.originsNote} />
          </div>
        </Cloud>
      </div>
    </>
  ));

  /* two categories */
  if (r.categories) {
    add("Two buckets", "Everything in a job goes in one of two buckets", "var(--teal)", (
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
    add("Two roads", "Two roads out of the same job", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.pathwaysLede ?? ""} />
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
    add("Challenge vs hindrance", "Not all demands are the same kind of hard", "var(--red)", (
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
    add("Where they cross", "Where the two roads cross", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.interactionsLede ?? ""} />
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

  /* later expansions */
  if (r.expansions) {
    add("What got added", "What got added later", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.expansionsLede ?? ""} />
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
    add("Two flavours", "Two flavours of correspondence", "var(--teal)", (
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
    add("Where fit shows up", "Where fit shows up", "var(--teal)", (
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
    add("A continuing relationship", "A continuing relationship", "var(--teal)", (
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
  add("The trail", "The trail", "var(--teal)", (
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
  add("Don’t conclude", "Don’t conclude", "var(--red)", (
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
  add("Still open", "Still open", "var(--teal)", (
    <div style={{ marginTop: ".4rem" }}>
      {r.qualifications.map((q) => <Bullet icon="i-q" colour="var(--teal)" html={q} key={q} />)}
    </div>
  ));

  /* sources — always */
  add("Sources", "Sources", "var(--teal)", (
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
  add("Provenance", "Where every claim came from", "var(--teal)", (
    <div className="prov" style={{ marginTop: ".8rem" }}>
      {r.provenance.map((p) => (
        <div className="prov-item" key={p.label}>
          <span className="g" style={{ color: p.colour }}>{p.glyph}</span>
          <div>
            <h4>{p.label}</h4>
            <p>{p.note}</p>
          </div>
        </div>
      ))}
    </div>
  ));

  const toc = B.map((b, i) => [pad2(i + 1), b.toc, `s${i + 1}`] as [string, string, string]);

  return (
    <RecordShell record={r} toc={toc}>
      {B.map((b, i) => (
        <span key={b.toc} style={{ display: "contents" }}>
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
