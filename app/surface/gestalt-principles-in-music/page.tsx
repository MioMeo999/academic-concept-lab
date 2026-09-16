import type { Metadata } from "next";
import { gestaltPrinciplesInMusic as rec } from "../../../content/gestalt-principles-in-music";
import { RECORDS, recordHref } from "../../../content/records";
import type { ASACard, AudioPreset } from "../../../content/types";
import { Foot } from "../_components/Shell";
import type { Hue } from "../_components/Pigment";
import { Actions, Aside, Card, Chips, Columns, Crumb, KeyIdea, Numbered, Pull, Rail, TopNav } from "../_components/Web";
import { Hi, Ring, Strike, Ul } from "../_components/Notes";
import { ContestedSpan, Ladder, MovedBoundary, OneEventTwoWholes, OpenBoundary } from "./_components/Figures";

export const metadata: Metadata = {
  title: "Gestalt Principles in Music",
  description: rec.oneSentence,
};

const g = rec.gestalt!;

const NAV = [
  { href: "/surface", label: "Home" },
  { href: "/surface/job-demands-resources", label: "Theories" },
  { href: "/surface/conventions", label: "Materials" },
  { href: "/surface/bench/g1", label: "Visual library" },
];

const FACT_HUES: Hue[] = ["cobalt", "vermilion", "ochre", "teal", "violet"];

const RAIL = [
  { id: "s-overview", label: "Overview" },
  { id: "s-principles", label: "Key principles" },
  { id: "s-music", label: "In music" },
  { id: "s-conflict", label: "When cues compete" },
  { id: "s-hierarchy", label: "Hierarchy" },
  { id: "s-evidence", label: "Evidence" },
  { id: "s-scope", label: "Limitations" },
  { id: "s-connections", label: "Connections" },
  { id: "s-references", label: "References" },
];

/* The record's own cue families, each with its own pigment. Colour separates
   one principle from the next and encodes nothing else. */
const PRINCIPLE_HUES: Hue[] = ["cobalt", "vermilion", "teal", "lemon", "violet", "ochre"];

function Terms({ cards, hues, from = 0 }: { cards: ASACard[]; hues: Hue[]; from?: number }) {
  return (
    <ul className="wb-col-body" style={{ listStyle: "none", margin: "1rem 0 0", padding: 0, display: "grid", gap: ".85rem" }}>
      {cards.map((c, i) => (
        <li key={c.label} style={{ paddingLeft: 0, display: "grid", gridTemplateColumns: "1rem 1fr", gap: ".7rem" }}>
          <span aria-hidden="true" style={{
            width: ".72rem", height: ".72rem", marginTop: ".34rem", borderRadius: "50%",
            background: `var(--pg-${hues[(i + from) % hues.length]})`, opacity: 0.72,
          }} />
          <span>
            <b style={{ color: "var(--ink)", fontWeight: 620 }}>{c.label}</b>{" "}
            <span dangerouslySetInnerHTML={{ __html: c.body }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Conditions({ presets, label }: { presets: AudioPreset[]; label: string }) {
  return (
    <div className="sf-xray" style={{ borderTopColor: "var(--hair)" }}>
      <div className="sf-xray-head">
        <h4 style={{ fontSize: "0.92rem" }}>{label}</h4>
        <span className="sf-xray-kind">conditions · in full</span>
      </div>
      <dl>
        {presets.map((p) => (
          <div key={p.label} style={{ display: "contents" }}>
            <dt>{p.label}</dt>
            <dd>
              {p.body}
              <br />
              <span style={{ color: "var(--ink-3)", fontSize: ".86rem" }}>
                <i>Manipulated:</i> {p.variable}. <i>Held:</i> {p.controls}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Xray({ e }: { e: NonNullable<typeof g.deliege.evidence> }) {
  return (
    <div className="sf-xray">
      <div className="sf-xray-head">
        <h4>{e.title}</h4>
        <span className="sf-xray-kind">{e.label}</span>
      </div>
      <dl>
        <dt>citation</dt>
        <dd className="sf-cite" dangerouslySetInnerHTML={{ __html: e.citation }} />
        {e.design ? (<><dt>design</dt><dd>{e.design}</dd></>) : null}
        <dt>{e.testedLabel}</dt><dd>{e.tested}</dd>
        <dt>{e.foundLabel}</dt><dd>{e.found}</dd>
        <dt>what it did not test</dt><dd data-neg="true">{e.notTested}</dd>
        {e.doi ? (<><dt>doi</dt><dd><a href={`https://doi.org/${e.doi}`} rel="noreferrer">{e.doi}</a></dd></>) : null}
      </dl>
    </div>
  );
}

export default function GestaltSurface() {
  const related = (rec.relatedTo ?? []).map((l) => ({
    link: l,
    target: RECORDS.find((r) => r.id === l.recordId),
  }));

  return (
    <>
      <TopNav items={NAV} here="/surface/job-demands-resources" />
      <main className="sf-shell" id="sf-main">
        <Crumb trail={[
          { href: "/surface", label: "Theories" },
          { href: "/surface", label: "Music Psychology" },
          { label: rec.title },
        ]} />

        {/* ------------------------------------------------------------ hero */}
        <div className="wb-record">
          <Rail items={RAIL} active="s-overview" />

          <div className="wb-main" id="s-overview">
            <p className="sf-kicker">{rec.knowledgeFormQualifier} · perception &amp; organisation</p>
            <h1 className="wb-hero-title">
              Gestalt <em>Principles</em><br />in Music
            </h1>
            <p className="wb-hero-sub">
              How we hear the whole — <Hi c="lemon" seed={5}>more than the sum of the parts.</Hi>
            </p>
            <p className="wb-hero-body">{rec.oneSentence}</p>
            <p className="wb-hero-body">{rec.hook}</p>
            <Actions
              primary={{ href: "#s-principles", label: "Explore the theory" }}
              secondary={{ href: "#s-connections", label: "View connections" }}
            />
            <Chips items={rec.facts.map((f, i) => ({ label: f, hue: FACT_HUES[i % FACT_HUES.length] }))} />
            <Aside hue="graphite">{"Same sounds.\nDifferent organisations.\nDifferent music."}</Aside>
          </div>

          <aside className="wb-side">
            <Pull attrib="Kurt Koffka, 1935" hue="lemon">
              “The whole has a different character than the sum of its parts.”
            </Pull>
            <KeyIdea>
              A musical event has no fixed perceptual job. <Ul c="cobalt" seed={11}>Grouping is what
              gives it one</Ul> — and the same events can be grouped more than one way.
            </KeyIdea>
          </aside>

          {/* --------------------------------------------------- opening figure */}
          <div className="wb-full" style={{ marginTop: "2.4rem" }}>
            <p className="sf-figlabel"><b>Figure 1</b> <span>the moved boundary</span></p>
            <div className="sf-scroll"><MovedBoundary /></div>
            <p className="sf-cap" style={{ maxWidth: "48rem" }}>
              {g.opening.lede} The grouping is marked the way a musician marks one — a slur
              over the notes a reading gathers. <b>Where the slur can close is the whole
              difference between the two conditions.</b>
            </p>
          </div>
        </div>

        {/* --------------------------------------------------- principles row */}
        <section id="s-principles" style={{ paddingTop: "1rem" }}>
          <div className="wb-secthead">
            <h2>Key principles</h2>
            <span className="fill" aria-hidden="true" />
            <span className="note">cues, not laws</span>
          </div>
          <Columns items={[
            {
              kicker: "the problem", head: "Events arrive; organisation happens", hue: "ochre",
              body: (
                <>
                  <p>{g.problem.lede}</p>
                  <Terms cards={g.problem.cards} hues={PRINCIPLE_HUES} />
                </>
              ),
              note: "the ear seeks patterns",
            },
            {
              kicker: "proximity", head: "A tendency, not a threshold", hue: "teal",
              body: (
                <>
                  <p>{g.proximity.lede}</p>
                  <Terms cards={g.proximity.cards} hues={PRINCIPLE_HUES} from={2} />
                </>
              ),
              note: "no magic number",
            },
            {
              kicker: "similarity", head: "Like with like — on more than one dimension", hue: "violet",
              body: (
                <>
                  <p>{g.similarity.lede}</p>
                  <Terms cards={g.similarity.cards} hues={PRINCIPLE_HUES} from={4} />
                </>
              ),
            },
            {
              kicker: "terminology", head: "Tendencies, factors, constraints", hue: "vermilion",
              body: (
                <>
                  <p>{g.laws.lede}</p>
                  <Terms cards={g.laws.cards} hues={PRINCIPLE_HUES} from={1} />
                </>
              ),
              note: "not a law book",
            },
          ]} />
        </section>

        {/* ------------------------------------------------------ whole/part */}
        <div className="wb-record" id="s-music" style={{ paddingTop: "2.4rem" }}>
          <div className="wb-rail" aria-hidden="true" />
          <div className="wb-main">
            <div className="wb-secthead" style={{ marginTop: 0 }}>
              <h2>The part&rsquo;s role depends on the <Ring c="vermilion" seed={53}>whole</Ring></h2>
            </div>
            <p className="sf-lede">{g.whole.lede}</p>
            <div className="sf-terms">
              {g.whole.cases.map((c, i) => (
                <div className="sf-term" key={c.label}>
                  <span aria-hidden="true" style={{
                    width: ".72rem", height: ".72rem", marginTop: ".42rem", borderRadius: "50%",
                    background: `var(--pg-${i === 0 ? "teal" : "vermilion"})`, opacity: 0.72,
                  }} />
                  <div>
                    <h4>{c.label}</h4>
                    <p>
                      <span style={{ fontVariantNumeric: "oldstyle-num" }}>{c.before} </span>
                      <b>{c.central}</b>
                      <span style={{ fontVariantNumeric: "oldstyle-num" }}> {c.after}</span>
                      <br /><i>{c.role}</i>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="sf-note"><b>Editorial note.</b> <span dangerouslySetInnerHTML={{ __html: g.whole.note }} /></p>
          </div>
          <aside className="wb-side">
            <p className="sf-figlabel"><b>Figure 2</b> <span>one note, two wholes</span></p>
            <OneEventTwoWholes cases={g.whole.cases} />
            <p className="sf-cap">
              The central note is drawn once and instanced twice; only the slur moves. It
              has to be visibly the same note, or the figure argues something the record
              does not.
            </p>
          </aside>
        </div>

        {/* -------------------------------------------------------- conflict */}
        <div className="wb-record" id="s-conflict" style={{ paddingTop: "1.6rem" }}>
          <div className="wb-rail" aria-hidden="true" />
          <div className="wb-main">
            <div className="wb-secthead" style={{ marginTop: 0 }}>
              <h2>Where the two readings <Ul c="vermilion" seed={107}>collide</Ul></h2>
            </div>
            <p className="sf-lede">{g.conflict.lede}</p>
            <p className="sf-p"><b>{g.conflict.question}</b> The record does not collect an
              answer, score one, or treat a preference as a measurement of anything about
              the listener.</p>
            <p className="sf-note"><b>Editorial note.</b> <span dangerouslySetInnerHTML={{ __html: g.conflict.note }} /></p>
          </div>
          <aside className="wb-side">
            <Card title="How to read Figure 3" sub="two cues, one stimulus">
              <p style={{ margin: 0, fontSize: ".89rem", lineHeight: 1.55, color: "var(--ink-3)" }}>
                This is the only figure on the page where two colours occupy one span.
                Where they cross they darken — because the two readings genuinely claim
                the same notes, not because that region is more certain.
              </p>
              <Aside hue="vermilion">The contour does not close.</Aside>
            </Card>
          </aside>
          <div className="wb-full" style={{ marginTop: "1.6rem" }}>
            <p className="sf-figlabel"><b>Figure 3</b> <span>the contested span — three conditions over one frame</span></p>
            <div className="sf-scroll"><ContestedSpan /></div>
            <div style={{ maxWidth: "46rem" }}>
              <Conditions presets={g.conflict.presets} label="Figure 3 — what changed and what was held" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- hierarchy */}
        <div className="wb-record" id="s-hierarchy" style={{ paddingTop: "1.6rem" }}>
          <div className="wb-rail" aria-hidden="true" />
          <div className="wb-main">
            <div className="wb-secthead" style={{ marginTop: 0 }}>
              <h2>How far the part–whole claim goes</h2>
            </div>
            <p className="sf-lede">{g.hierarchy.lede}</p>
            <Terms cards={g.hierarchy.levels} hues={PRINCIPLE_HUES} />
            <p className="sf-note"><b>Editorial note.</b> <span dangerouslySetInnerHTML={{ __html: g.hierarchy.note }} /></p>
            <div className="wb-secthead"><h2>Gestalt is not GTTM</h2></div>
            <p className="sf-lede">{g.gttm.lede}</p>
            <ol className="sf-runs">
              {g.gttm.stages.map((s) => (
                <li key={s.label}>
                  <span>
                    <b style={{ letterSpacing: ".08em", fontSize: ".82rem", textTransform: "uppercase" }}>{s.label}</b>
                    <br />{s.body}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="wb-side">
            <p className="sf-figlabel"><b>Figure 4</b> <span>notes to phrases</span></p>
            <Ladder levels={g.hierarchy.levels} />
            <p className="sf-cap">
              Nested slurs over one line — how a musician marks structure. Not a tree,
              because the record keeps its hierarchy claim local.
            </p>
            <Aside hue="graphite">Later rules are not already present in 1923.</Aside>
          </aside>
        </div>

        {/* -------------------------------------------------------- evidence */}
        <section id="s-evidence" style={{ paddingTop: "1.4rem" }}>
          <div className="wb-secthead">
            <h2>Evidence at a glance</h2>
            <span className="fill" aria-hidden="true" />
            <span className="note">what the research shows</span>
          </div>
          <div className="wb-record" style={{ paddingTop: 0 }}>
            <div className="wb-rail" aria-hidden="true" />
            <div className="wb-main">
              <p className="sf-lede">{g.deliege.lede}</p>
              <Xray e={g.deliege.evidence} />
              <p className="sf-note"><b>Editorial note.</b> <span dangerouslySetInnerHTML={{ __html: g.deliege.note }} /></p>
              <p className="sf-lede" style={{ marginTop: "2rem" }}>{g.frankland.lede}</p>
              <Xray e={g.frankland.evidence} />
              <p className="sf-note"><b>Editorial note.</b> <span dangerouslySetInnerHTML={{ __html: g.frankland.note }} /></p>
            </div>
            <aside className="wb-side">
              <Card title="Where experience enters" sub="the cultural boundary">
                <p style={{ margin: "0 0 .8rem", fontSize: ".89rem", lineHeight: 1.55, color: "var(--ink-3)" }}>
                  {g.culture.lede}
                </p>
                <Numbered items={g.culture.cards.map((c) => ({ head: c.label, body: c.body }))} />
              </Card>
              <Card title="Prägnanz, unfinished" sub="an ambition that was never completed">
                <p style={{ margin: "0 0 .6rem", fontSize: ".89rem", lineHeight: 1.55, color: "var(--ink-3)" }}>
                  {g.pragnanz.problem}
                </p>
                <p style={{ margin: 0, fontSize: ".84rem", lineHeight: 1.5, color: "var(--ink-4)" }}>
                  Later reformulations: {g.pragnanz.later.join(", ")}.
                </p>
              </Card>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------------- scope */}
        <div className="wb-record" id="s-scope" style={{ paddingTop: "1rem" }}>
          <div className="wb-rail" aria-hidden="true" />
          <div className="wb-main">
            <div className="wb-secthead" style={{ marginTop: 0 }}>
              <h2>What it explains, and <Ul c="cobalt" seed={113}>where it stops</Ul></h2>
            </div>
            <p className="sf-lede">{g.scope.lede}</p>
            <div className="sf-split">
              <div>
                <h4>Explains</h4>
                <ul className="sf-plain">{g.scope.explains.map((e) => (<li key={e}>{e}</li>))}</ul>
              </div>
              <div>
                <h4>Stops before</h4>
                <ul className="sf-plain">{g.scope.stops.map((s) => (<li key={s}>{s}</li>))}</ul>
              </div>
            </div>
            <div className="wb-secthead"><h2>Do not conclude</h2></div>
            <p className="sf-lede">{rec.oversimplificationsLede}</p>
            <ul className="sf-plain sf-struck">
              {rec.oversimplifications.map((o, i) => (
                <li key={o}>
                  <Strike c="vermilion" seed={140 + i * 7}>
                    <span dangerouslySetInnerHTML={{ __html: o }} />
                  </Strike>
                </li>
              ))}
            </ul>
            <h3 className="sf-kicker" style={{ marginTop: "1.6rem" }}>Qualifications the record keeps</h3>
            <ul className="sf-plain">
              {rec.qualifications.map((q) => (<li key={q} dangerouslySetInnerHTML={{ __html: q }} />))}
            </ul>
          </div>
          <aside className="wb-side">
            <OpenBoundary />
            <p className="sf-cap">
              The one mark allowed in a quiet section: a boundary that will not close,
              under the section that says where the record stops.
            </p>
          </aside>
        </div>

        {/* ----------------------------------------------------- connections */}
        <section id="s-connections" style={{ paddingTop: "1.4rem" }}>
          <div className="wb-secthead">
            <h2>Connections</h2>
            <span className="fill" aria-hidden="true" />
            <span className="note">different lenses. a richer understanding.</span>
          </div>
          <Columns items={[
            {
              kicker: "what came after", head: "A branching, not a ladder", hue: "teal",
              body: (<><p>{g.lineage.lede}</p><Terms cards={g.lineage.nodes} hues={PRINCIPLE_HUES} /></>),
            },
            ...related.map(({ link, target }, i) => ({
              kicker: link.relation,
              head: target?.title ?? link.recordId,
              hue: PRINCIPLE_HUES[(i + 1) % PRINCIPLE_HUES.length],
              body: (
                <>
                  <p>{link.body}</p>
                  {target ? (
                    <p style={{ marginTop: ".7rem" }}>
                      <a href={recordHref(target)} style={{
                        fontFamily: "var(--sf-instrument), system-ui, sans-serif",
                        fontSize: ".66rem", letterSpacing: ".15em", textTransform: "uppercase",
                        color: "var(--ink-2)", textDecoration: "none",
                      }}>Read the record →</a>
                    </p>
                  ) : null}
                </>
              ),
            })),
          ]} />
        </section>

        {/* ------------------------------------------------------ references */}
        <div className="wb-record" id="s-references" style={{ paddingTop: "1.4rem" }}>
          <div className="wb-rail" aria-hidden="true" />
          <div className="wb-main">
            <div className="wb-secthead" style={{ marginTop: 0 }}>
              <h2>References</h2>
              <span className="fill" aria-hidden="true" />
              <span className="note">{rec.minimumReadingLabel}</span>
            </div>
            <ol className="sf-sources">
              {rec.minimumReading.map((s, i) => (
                <li key={s.citation}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="sf-cite" dangerouslySetInnerHTML={{ __html: s.citation }} />
                    <p className="sf-contrib">{s.contribution}</p>
                    {s.doi ? <a href={`https://doi.org/${s.doi}`} rel="noreferrer">doi {s.doi}</a> : null}
                  </div>
                </li>
              ))}
            </ol>
            <h3 className="sf-kicker" style={{ marginTop: "2rem" }}>Full source list</h3>
            <ol className="sf-sources">
              {rec.fullSources.map((s, i) => (
                <li key={s.citation}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="sf-cite" dangerouslySetInnerHTML={{ __html: s.citation }} />
                    <p className="sf-contrib">{s.contribution}</p>
                    {s.doi ? <a href={`https://doi.org/${s.doi}`} rel="noreferrer">doi {s.doi}</a> : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="wb-secthead"><h2>The trail</h2></div>
            <p className="sf-lede">{rec.trailLede}</p>
            <ol className="sf-sources">
              {rec.origins.map((o, i) => (
                <li key={`${o.year}${o.author}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="sf-cite"><b>{o.author}</b> · {o.year} — <i dangerouslySetInnerHTML={{ __html: o.work }} /></p>
                    <p className="sf-contrib">{o.contribution}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="wb-side">
            <Card title="Provenance" sub="what kind of claim each mark is">
              <ul className="sf-prov" style={{ marginTop: 0 }}>
                {rec.provenance.map((p) => (
                  <li key={p.label}>
                    <span className="sf-glyph" aria-hidden="true">{p.glyph}</span>
                    <div>
                      <h4>{p.label}</h4>
                      <p>{p.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </main>
      <Foot />
    </>
  );
}
