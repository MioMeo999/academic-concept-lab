import type { ReactNode } from "react";
import type { MethodRecord, Source } from "@/content/types";
import { Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";
import { QuestionFit } from "./QuestionFit";

/* ---------------------------------------------------------------------------
   Section-driven method template.

   A method is a practice, so this template is built to be usable at the desk:
   the procedure is a sequence you can follow, the craft block is the analytic
   pass itself, and the quality markers are an audit you can run. Same shell,
   numbering and contents rail as the other two kinds — different template,
   because a practice is not a lens or an argument.
   ------------------------------------------------------------------------- */

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

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

export function MethodBody({ record: r }: { record: MethodRecord }) {
  const B: Block[] = [];
  const add = (key: string, defToc: string, defTitle: string, colour: string, body: ReactNode) =>
    B.push({
      key,
      toc: r.headings?.[key]?.toc ?? defToc,
      title: r.headings?.[key]?.title ?? defTitle,
      colour,
      body,
    });

  /* what it is — always */
  add("idea", "What it is", "What it is", "var(--gold-deep)", (
    <>
      <Rich className="lede" as="p" html={r.ideaLede} />
      <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 660 }}>
        <Cloud colour="#9C7018">
          <div style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
            <Icon id="i-q" style={{ width: 26, height: 26, color: "var(--gold-deep)", flex: "none" }} />
            <Rich className="read" as="p" style={{ fontSize: ".91rem", lineHeight: 1.55, color: "var(--gold-deep)" }} html={r.originsNote} />
          </div>
        </Cloud>
      </div>
    </>
  ));

  /* the commitments the method rests on */
  if (r.commitments) {
    add("commitments", "Commitments", "What it rests on", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.commitmentsLede ?? ""} />
        <div className="grid3" style={{ marginTop: "1rem" }}>
          {r.commitments.map((c) => (
            <div className="sk-box tight tilt-l2" key={c.title}>
              <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
                <Icon id={c.icon} style={{ width: 26, height: 26, color: c.colour, flex: "none" }} />
                <h3 style={{ fontSize: "1rem", color: c.colour }}>{c.title}</h3>
              </div>
              <Rich className="read" as="p" style={{ fontSize: ".87rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".45rem" }} html={c.body} />
            </div>
          ))}
        </div>
        {r.doubleHermeneutic && (
          <div className="sk-box tilt-r2 fill" style={{ marginTop: "1.2rem" }}>
            <p className="k">the double hermeneutic</p>
            <blockquote className="dh-quote">{r.doubleHermeneutic.quote}</blockquote>
            <Rich className="read" as="p" style={{ fontSize: ".93rem", lineHeight: 1.6, color: "var(--pen-2)", marginTop: ".7rem" }} html={r.doubleHermeneutic.body} />
          </div>
        )}
      </>
    ));
  }

  /* does the question fit the method at all */
  if (r.questionFit) {
    add("questionFit", "Does it fit?", "Is this the right instrument?", "var(--red)", (
      <>
        <Rich className="lede" as="p" html={r.questionFitLede ?? ""} />
        <QuestionFit items={r.questionFit} note={r.questionFitNote} />
      </>
    ));
  }

  /* the procedure, and the rule that governs it */
  if (r.procedure) {
    add("procedure", "The procedure", "The procedure", "var(--gold-deep)", (
      <>
        <Rich className="lede" as="p" html={r.procedureLede ?? ""} />
        <ol className="proc-list">
          {r.procedure.map((s) => (
            <li key={s.n}>
              <span className="proc-n">{s.n}</span>
              <div>
                <h3 style={{ fontSize: ".98rem" }}>{s.title}</h3>
                <Rich className="read" as="p" style={{ fontSize: ".88rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".2rem" }} html={s.body} />
              </div>
            </li>
          ))}
        </ol>
        {r.cardinalRule && (
          <div className="tilt-l2" style={{ marginTop: "1.2rem", maxWidth: 700 }}>
            <Cloud colour="#E24E1B">
              <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
                <Icon id="i-warn" style={{ width: 26, height: 26, color: "var(--red)", flex: "none" }} />
                <div>
                  <p style={{ fontWeight: 700, color: "var(--red)", fontSize: "1rem" }}>The rule that governs the rest</p>
                  <Rich className="read" as="p" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".3rem" }} html={r.cardinalRule} />
                </div>
              </div>
            </Cloud>
          </div>
        )}
      </>
    ));
  }

  /* the close reading pass itself */
  if (r.craft) {
    add("craft", "The close pass", "The close pass", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.craftLede ?? ""} />
        <div className="craft-cols">
          {r.craft.map((c) => (
            <div className="craft-col" key={c.title} style={{ borderTopColor: c.colour }}>
              <h3 style={{ fontSize: ".95rem", color: c.colour }}>{c.title}</h3>
              <p className="read" style={{ fontSize: ".84rem", lineHeight: 1.45, color: "var(--pen-3)", marginTop: ".25rem" }}>{c.asks}</p>
            </div>
          ))}
        </div>
        {r.attendTo && (
          <div style={{ marginTop: "1.2rem" }}>
            <p className="k">what to attend to in the language</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginTop: ".5rem" }}>
              {r.attendTo.map((a) => <span className="fact" key={a}>{a}</span>)}
            </div>
          </div>
        )}
      </>
    ));
  }

  /* vocabulary the field has revised */
  if (r.terminology) {
    add("terminology", "Current terms", "Current terminology", "var(--gold-deep)", (
      <>
        <Rich className="lede" as="p" html={r.terminologyLede ?? ""} />
        <div style={{ marginTop: "1rem" }}>
          {r.terminology.map((t, i) => (
            <div className={`sk-box tight ${i % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ marginTop: ".7rem" }} key={t.now}>
              <div className="term-shift">
                <span className="term-was">{t.was}</span>
                <svg style={{ width: 30, height: 20, color: "var(--gold-deep)", flex: "none" }} viewBox="0 0 40 20" aria-hidden="true">
                  <path d="M4 10c10-.3 21-.4 31 0" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
                  <path d="M27 4c3.4 2.4 6.6 4.4 9.4 6-2.8 1.6-5.6 3.6-8.4 6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="term-now">{t.now}</span>
              </div>
              <Rich className="read" as="p" style={{ fontSize: ".87rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".5rem" }} html={t.note} />
            </div>
          ))}
        </div>
      </>
    ));
  }

  /* quality markers — an audit you can run */
  if (r.qualityMarkers) {
    add("qualityMarkers", "Quality markers", "Markers of a high-quality analysis", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.qualityMarkersLede ?? ""} />
        <div className="grid2" style={{ marginTop: "1rem" }}>
          {r.qualityMarkers.map((m, i) => (
            <div className={`sk-box teal ${i % 2 ? "tilt-r2" : "tilt-l2"}`} key={m.n}>
              <div style={{ display: "flex", gap: ".6rem", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--teal)", lineHeight: 1 }}>{m.n}</span>
                <h3 style={{ fontSize: "1rem" }}>{m.title}</h3>
              </div>
              <Rich className="read" as="p" style={{ fontSize: ".88rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".4rem" }} html={m.body} />
            </div>
          ))}
        </div>
      </>
    ));
  }

  /* what a theme name should be doing */
  if (r.themeContrast) {
    const tc = r.themeContrast;
    add("themeContrast", "Themes that work", "Themes that do work", "var(--red)", (
      <>
        <Rich className="lede" as="p" html={r.themeContrastLede ?? ""} />
        <div className="grid2" style={{ marginTop: "1rem" }}>
          <div className="sk-box red tilt-l2">
            <p className="k" style={{ color: "var(--red)" }}>doing no work</p>
            <div style={{ marginTop: ".6rem", display: "flex", flexDirection: "column", gap: ".45rem" }}>
              {tc.weak.map((w) => (
                <span className="strike" style={{ fontSize: ".95rem" }} key={w}>
                  {w}
                  <svg viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 8C24 3 48 11 72 6c16-3 32 4 46-1" fill="none" stroke="#E24E1B" strokeWidth={2.2} strokeLinecap="round" />
                  </svg>
                </span>
              ))}
            </div>
          </div>
          <div className="sk-box teal tilt-r2">
            <p className="k" style={{ color: "var(--teal)" }}>carrying an argument</p>
            <div style={{ marginTop: ".6rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {tc.strong.map((sName) => (
                <span style={{ fontSize: ".95rem", lineHeight: 1.35, fontWeight: 700 }} key={sName}>{sName}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 680 }}>
          <Cloud colour="#2E7D8F">
            <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
              <Icon id="i-star" style={{ width: 24, height: 24, color: "var(--teal)", flex: "none" }} />
              <Rich className="read" as="p" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)" }} html={tc.note} />
            </div>
          </Cloud>
        </div>
      </>
    ));
  }

  /* the learn-by-doing pathway */
  if (r.stages) {
    add("stages", "Learn by doing", "A learn-by-doing pathway", "var(--gold-deep)", (
      <>
        <Rich className="lede" as="p" html={r.stagesLede ?? ""} />
        <ol className="proc-list" style={{ marginTop: "1rem" }}>
          {r.stages.map((st) => (
            <li key={st.n}>
              <span className="proc-n gold">{st.n}</span>
              <div>
                <h3 style={{ fontSize: ".98rem" }}>{st.title}</h3>
                <Rich className="read" as="p" style={{ fontSize: ".88rem", lineHeight: 1.55, color: "var(--pen-2)", marginTop: ".2rem" }} html={st.body} />
                {st.read && (
                  <p className="k" style={{ marginTop: ".4rem" }}>read — {st.read}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </>
    ));
  }

  /* papers to watch it done in */
  if (r.exemplars) {
    add("exemplars", "Read these", "Watch it done well", "var(--teal)", (
      <>
        <Rich className="lede" as="p" html={r.exemplarsLede ?? ""} />
        {r.exemplars.map((e, i) => (
          <div className={`sk-box ${i % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ marginTop: "1rem" }} key={e.work}>
            <div className="study-hd">
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
                <span className="study-n">{e.year}</span>
                <div>
                  <h3 style={{ fontSize: "1rem" }}>{e.authors}</h3>
                  <Rich className="model-src" as="div" html={e.work} />
                </div>
              </div>
            </div>
            <Rich className="read" as="p" style={{ fontSize: ".89rem", lineHeight: 1.6, color: "var(--pen-2)", marginTop: ".55rem" }} html={e.body} />
          </div>
        ))}
      </>
    ));
  }

  /* how it goes wrong */
  add("misuses", "How it goes wrong", "How a study stops being IPA", "var(--red)", (
    <>
      <Rich className="lede" as="p" html={r.misusesLede} />
      <div className="grid2" style={{ marginTop: "1rem" }}>
        {r.misuses.map((m, i) => (
          <div className={i % 2 ? "tilt-r2" : "tilt-l2"} key={m}>
            <Cloud colour="#E24E1B">
              <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
                <Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
                <Rich className="read" as="p" style={{ fontSize: ".89rem", lineHeight: 1.5, color: "var(--pen-2)" }} html={m} />
              </div>
            </Cloud>
          </div>
        ))}
      </div>
    </>
  ));

  /* limits — always */
  add("qualifications", "Limits", "What it cannot do", "var(--teal)", (
    <div style={{ marginTop: ".4rem" }}>
      {r.qualifications.map((q) => (
        <div className="bullet" key={q}>
          <svg style={{ color: "var(--teal)" }} aria-hidden="true"><use href="#i-q" /></svg>
          <Rich className="read" as="span" style={{ fontSize: ".93rem", lineHeight: 1.6, color: "var(--pen-2)" }} html={q} />
        </div>
      ))}
    </div>
  ));

  /* sources — always */
  add("sources", "Sources", "Sources", "var(--gold-deep)", (
    <>
      <div className="sk-box tilt-l2" style={{ marginTop: ".7rem" }}>
        <div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: ".4rem" }}>
          <Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} />
          <h3>{r.coreReadingLabel ?? "Core reading"}</h3>
        </div>
        <SourceList items={r.coreReading} />
      </div>
      <div style={{ marginTop: "1.1rem" }}>
        <p className="k">the full shelf</p>
        <div style={{ marginTop: ".4rem" }}><SourceList items={r.fullSources} /></div>
      </div>
    </>
  ));

  /* provenance — always */
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", (
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
