import type { PaperRecord } from "@/content/types";
import { ArrowSmall, Bullet, Cloud, Divider, Icon, Ribbon, Rich, SecHead, Strike, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";

/* An empirical study is an argument: the design and sample stay welded to the
   result, every claim carries a verdict, and the eliminated explanations are
   shown rather than buried. */

const TOC: [string, string][] = [
  ["The question", "The question"],
  ["How it travels", "How the effect is supposed to travel"],
  ["The three studies", "The three studies"],
  ["What held up", "What held across all three"],
  ["Ruled out", "Ruled out"],
  ["Claim ↔ evidence", "Claim ↔ evidence"],
  ["Strengths & limits", "Strengths & limits"],
  ["So what", "So what"],
  ["Provenance", "Where every claim came from"],
];

export function StudyBody({ record: r }: { record: PaperRecord }) {
  const toc = TOC.map(([short], i) => [pad2(i + 1), short, `s${i + 1}`] as [string, string, string]);
  const heads = TOC.map(([, full], i) => ({ num: pad2(i + 1), full, colour: i === 4 || i === 5 ? "var(--red)" : "var(--teal)" }));

  const sections = [
    /* 01 the question */
    <>
      <div className="sk-box tilt-l2" style={{ maxWidth: 640 }}>
        <div style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
          <Icon id="i-q" style={{ width: 24, height: 24, color: "var(--red)", flex: "none", marginTop: 2 }} />
          <p style={{ fontSize: "1.05rem", lineHeight: 1.4 }}>{r.researchQuestion}</p>
        </div>
      </div>
      <Rich className="body" as="p" style={{ marginTop: "1rem" }} html={r.theoreticalFoundation} />
      <div className="sk-box tilt-r2" style={{ marginTop: "1.1rem" }}>
        <div className="stage" style={{ gap: "clamp(1rem,6vw,3rem)" }}>
          <figure>
            <Icon id="i-head" style={{ width: 74, height: 74 }} />
            <figcaption className="k">the listener</figcaption>
          </figure>
          <svg style={{ width: 50, height: 26, color: "var(--red)", alignSelf: "center" }} viewBox="0 0 60 26" aria-hidden="true">
            <path d="M52 13c-14-.4-28-.5-42 .2" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
            <path d="M18 6c-4 3-7.6 5.2-11.4 7.2C10.4 15 14 17.2 17.4 20" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figure>
            <Icon id="i-eye" style={{ width: 74, height: 74, color: "var(--teal)" }} />
            <figcaption className="k">the coworker</figcaption>
          </figure>
        </div>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap", marginTop: ".9rem" }}>
          <span className="chip red">“they’ve switched off” → leisure</span>
          <span className="chip teal">“they’re locked in” → productivity</span>
        </div>
        <p className="read" style={{ textAlign: "center", fontSize: ".9rem", lineHeight: 1.5, color: "var(--pen-2)", marginTop: ".8rem", maxWidth: "52ch", marginInline: "auto" }}>
          Only the coworker’s inference is in this study. The listener’s <b>actual</b> purpose never enters the model.
        </p>
      </div>
    </>,

    /* 02 conceptual model */
    <>
      <p className="lede">Five stages. Notice what is missing — the listener’s real intention appears nowhere in the chain.</p>
      <div className="chain" style={{ marginTop: "1rem" }}>
        {r.conceptualModel.map((node, i) => {
          const last = i === r.conceptualModel.length - 1;
          return (
            <span key={node} style={{ display: "contents" }}>
              <div className={`node sk-box tight flat${last ? " red" : ""}`}>
                <span className="k" style={last ? { color: "var(--red)" } : undefined}>0{i + 1}</span>
                <p style={{ fontSize: ".9rem", lineHeight: 1.25, marginTop: ".2rem", ...(last ? { color: "var(--red)" } : {}) }}>{node}</p>
              </div>
              {!last && <ArrowSmall colour="var(--red)" />}
            </span>
          );
        })}
      </div>
      <div style={{ marginTop: "1.1rem" }}>
        <span className="k">what they predicted</span>
        <div style={{ marginTop: ".5rem" }}>
          {r.hypotheses.map((h, i) => <Bullet icon="i-arrowb" colour="var(--teal)" html={`<b>H${i + 1}</b> — ${h}`} key={h} />)}
        </div>
      </div>
    </>,

    /* 03 the studies */
    <>
      <p className="lede">Three designs doing three different jobs. The package is the finding — no single one of these carries the argument alone.</p>
      {r.studies.map((s, i) => (
        <div className={`sk-box ${i % 2 ? "tilt-r2" : "tilt-l2"}`} style={{ marginTop: "1rem" }} key={s.label}>
          <div className="study-hd">
            <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
              <span className="study-n">{s.n}</span>
              <div>
                <h3 style={{ fontSize: "1.08rem" }}>{s.label} — {s.design}</h3>
                <span className="k">{s.sample}</span>
              </div>
            </div>
            <span className="chip teal">
              <Icon id={s.locIcon} style={{ width: 15, height: 15 }} />
              {s.location}
            </span>
          </div>
          <div className="anat">
            <div className="anat-row"><span className="t">Question</span><span className="v">{s.question}</span></div>
            <div className="anat-row"><span className="t">Method</span><span className="v">{s.method}</span></div>
            <div className="anat-row"><span className="t">Role</span><span className="v">{s.role}</span></div>
            <div className="anat-row"><span className="t">Result</span><span className="v"><span className="hl">{s.result}</span></span></div>
          </div>
          <div className="grid2" style={{ marginTop: ".8rem" }}>
            <div className="bullet" style={{ margin: 0 }}>
              <Icon id="i-check" style={{ color: "var(--teal)" }} />
              <span className="read" style={{ fontSize: ".87rem", lineHeight: 1.5, color: "var(--pen-2)" }}>{s.strength}</span>
            </div>
            <div className="bullet" style={{ margin: 0 }}>
              <Icon id="i-x" style={{ color: "var(--red)" }} />
              <span className="read" style={{ fontSize: ".87rem", lineHeight: 1.5, color: "var(--pen-2)" }}>{s.limitation}</span>
            </div>
          </div>
        </div>
      ))}
    </>,

    /* 04 cross-study */
    <div key="s4" style={{ marginTop: ".5rem" }}>
      {r.crossStudyFindings.map((f) => <Bullet icon="i-star" colour="var(--red)" html={f} size=".95rem" key={f} />)}
    </div>,

    /* 05 ruled out */
    <>
      <p className="lede">Before the finding is allowed to stand, nine competing explanations have to fail. This is the part of a paper nobody reads and everybody should.</p>
      <div className="sk-box tilt-r2" style={{ marginTop: "1rem" }}>
        <span className="k">nine robustness checks</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem 1.1rem", marginTop: ".6rem" }}>
          {r.robustness.map((x, i) => <Strike text={x} i={i} key={x} />)}
        </div>
      </div>
      <div style={{ marginTop: "1.1rem" }}>
        <span className="k">and what the authors said about the alternatives</span>
        <div style={{ marginTop: ".5rem" }}>
          {r.alternativeExplanations.map((a) => <Bullet icon={a.icon} colour={a.colour} html={a.text} key={a.text} />)}
        </div>
      </div>
    </>,

    /* 06 claim vs evidence */
    <>
      <Rich className="lede" as="p" html={'Four things people will take from this paper. <span class="hl">Only one of them survives the evidence intact.</span>'} />
      <div style={{ marginTop: "1.1rem" }}>
        {r.claimEvidencePairs.map((c) => (
          <div className="verdict" key={c.claim}>
            <div><Ribbon text={c.status} fill={c.fill} stroke={c.stroke} tilt={c.tilt} /></div>
            <div>
              <p className="claim">“{c.claim}”</p>
              <p className="ev" style={{ marginTop: ".35rem" }}>{c.evidence}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="tilt-l2" style={{ maxWidth: 620 }}>
        <Cloud colour="#E24E1B">
          <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
            <Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
            <p className="read" style={{ fontSize: ".91rem", lineHeight: 1.55, color: "var(--pen-2)" }}>
              Observer perception is not proof of the listener’s actual motive, engagement, or performance.
            </p>
          </div>
        </Cloud>
      </div>
    </>,

    /* 07 strengths & limits */
    <div key="s7" className="grid2" style={{ marginTop: ".9rem" }}>
      <div className="sk-box teal tilt-l2">
        <span className="k" style={{ color: "var(--teal)" }}>what makes it strong</span>
        <div style={{ marginTop: ".6rem" }}>
          {r.strengths.map((x) => <Bullet icon="i-check" colour="var(--teal)" html={x} size=".89rem" key={x} />)}
        </div>
      </div>
      <div className="sk-box red tilt-r2">
        <span className="k" style={{ color: "var(--red)" }}>what it cannot carry</span>
        <div style={{ marginTop: ".6rem" }}>
          {r.limitations.map((x) => <Bullet icon="i-x" colour="var(--red)" html={x} size=".89rem" key={x} />)}
        </div>
      </div>
    </div>,

    /* 08 so what */
    <>
      <div className="grid2" style={{ marginTop: ".8rem" }}>
        <div>
          <span className="k">what it adds to the field</span>
          <div style={{ marginTop: ".5rem" }}>
            {r.contributions.map((x) => <Bullet icon="i-arrowb" colour="var(--teal)" html={x} size=".91rem" key={x} />)}
          </div>
        </div>
        <div>
          <span className="k">what it means at work</span>
          <div style={{ marginTop: ".5rem" }}>
            {r.implications.map((x) => <Bullet icon="i-star" colour="var(--red)" html={x} size=".91rem" key={x} />)}
          </div>
        </div>
      </div>
      <div className="sk-box tilt-l2 fill" style={{ marginTop: "1.1rem", maxWidth: 560 }}>
        <span className="k">go to the source</span>
        <p className="read" style={{ fontSize: ".91rem", lineHeight: 1.5, marginTop: ".3rem", color: "var(--pen-2)" }}>
          Open data, materials, code, outputs and supplemental material —{" "}
          <a href={r.openMaterials} target="_blank" rel="noopener noreferrer">researchbox.org/5962</a>
        </p>
      </div>
    </>,

    /* 09 provenance */
    <div key="s9" className="prov" style={{ marginTop: ".8rem" }}>
      {r.provenance.map((p) => (
        <div className="prov-item" key={p.label}>
          <span className="g" style={{ color: p.colour }}>{p.glyph}</span>
          <div>
            <h4>{p.label}</h4>
            <p>{p.note}</p>
          </div>
        </div>
      ))}
    </div>,
  ];

  return (
    <RecordShell record={r} toc={toc}>
      {sections.map((body, i) => (
        <span key={heads[i].num} style={{ display: "contents" }}>
          {i > 0 && <Divider />}
          <section className="rec" id={`s${i + 1}`}>
            <SecHead num={heads[i].num} title={heads[i].full} colour={heads[i].colour} />
            {body}
          </section>
        </span>
      ))}
    </RecordShell>
  );
}
