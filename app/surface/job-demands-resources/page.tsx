import type { Metadata } from "next";
import { jobDemandsResources as rec } from "../../../content/theory";
import { RECORDS, recordHref } from "../../../content/records";
import {
  Band, Chip, Contents, Foot, Frayed, Heading, Note, Rest, Text, Think,
} from "../_components/Shell";
import { Chips, Crumb, TopNav } from "../_components/Web";
import type { Hue } from "../_components/Pigment";
import { Hi, Ring, Strike } from "../_components/Notes";
import { ChallengeHindrance, Crossing, TwoProcesses } from "./_components/Figures";

export const metadata: Metadata = {
  title: "Job Demands–Resources",
  description: rec.oneSentence,
};

const FACT_HUES: Hue[] = ["vermilion", "teal", "cobalt", "ochre"];

const SECTIONS = [
  { id: "s-fork", label: "The fork" },
  { id: "s-categories", label: "Two categories" },
  { id: "s-processes", label: "Two processes" },
  { id: "s-types", label: "Challenge ≠ hindrance" },
  { id: "s-interactions", label: "Where the lanes touch" },
  { id: "s-expansions", label: "What was added later" },
  { id: "s-shortcuts", label: "Do not conclude" },
  { id: "s-trail", label: "The trail" },
  { id: "s-sources", label: "Sources" },
  { id: "s-prov", label: "Provenance" },
  { id: "s-rel", label: "Nearby records" },
];

export default function JDRSurface() {
  const related = (rec.relatedTo ?? []).map((l) => ({
    link: l,
    target: RECORDS.find((r) => r.id === l.recordId),
  }));

  return (
    <>
      <TopNav items={[
        { href: "/surface", label: "Home" },
        { href: "/surface/job-demands-resources", label: "Theories" },
        { href: "/surface/conventions", label: "Materials" },
        { href: "/surface/bench/g1", label: "Visual library" },
      ]} here="/surface/job-demands-resources" />
      <main className="sf-shell" id="sf-main">
        <Crumb trail={[
          { href: "/surface", label: "Theories" },
          { href: "/surface", label: "Organisational Behaviour" },
          { label: rec.title },
        ]} />

        {/* ------------------------------------------------------- ignition */}
        <Band register="ignition" n="01" id="s-fork">
          <Text>
            <p className="sf-kicker">Plate three · built on a fork</p>
            <h1 className="sf-title">
              Job Demands–<em>Resources</em>
            </h1>
            <p className="sf-sub">{rec.oneSentence}</p>
            <p className="sf-hook">{rec.hook}</p>
            <div className="sf-meta">
              <span data-strong="true">Theory record</span>
              <span>Organisational behaviour</span>
            </div>
            <Chips items={rec.facts.map((f, i) => ({ label: f, hue: FACT_HUES[i % FACT_HUES.length] }))} />
          </Text>
          <Think>
            <div className="sf-margin">
              <div className="sf-mnote">
                <h4>The shape of this record</h4>
                Gestalt is built out of overlap and Tonal Hierarchy around one held mark.
                JD–R is built out of a <i>fork</i>: one set of conditions sorts into two
                categories, and two processes run from them in parallel and never merge.
                So the page is built on two lanes.
              </div>
              <div className="sf-mhand">Two roads out of one job.</div>
            </div>
          </Think>
        </Band>

        <Band register="working" full>
          <div style={{ padding: "0 0 1rem" }}>
            <p className="sf-figlabel"><b>Figure 1</b> <span>one job, two processes</span></p>
            <div className="sf-scroll"><TwoProcesses pathways={rec.pathways ?? []} /></div>
            <p className="sf-cap" style={{ maxWidth: "44rem" }}>
              Both lanes are drawn identically — same ring, same wash, same spacing —
              because the record&rsquo;s claim is that these are <b>two processes of the
              same standing</b>, not a main effect and a side effect.
            </p>
          </div>
        </Band>

        <Band register="quiet" full>
          <div className="sf-band" data-register="quiet" style={{ borderTop: "1px solid var(--hair)", paddingTop: "1.6rem" }}>
            <div className="sf-rail" aria-hidden="true"><div className="sf-reg">contents</div></div>
            <div className="sf-wide"><Contents items={SECTIONS} /></div>
          </div>
        </Band>

        {/* ----------------------------------------------------- categories */}
        <Band register="working" n="02" id="s-categories">
          <Text>
            <Heading kicker="The categories">
              Every job is different. The <Ring c="cobalt" seed={53}>categories</Ring> are not.
            </Heading>
            {rec.ideaLede ? (
              <p className="sf-lede" dangerouslySetInnerHTML={{ __html: rec.ideaLede.replace(/<\/?span[^>]*>/g, "") }} />
            ) : null}
            {rec.categoriesLede ? <p className="sf-p">{rec.categoriesLede}</p> : null}
            <div className="sf-terms">
              {(rec.categories ?? []).map((c, i) => (
                <div className="sf-term" key={c.title}>
                  <Chip hue={i === 0 ? "vermilion" : "teal"} seed={31 + i * 9} />
                  <div>
                    <h4>{c.title}</h4>
                    <p>
                      {c.definition}
                      <br />
                      <span style={{ color: "var(--ink-3)", fontSize: ".9em" }}>{c.examples.join(" · ")}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {rec.categoriesNote ? <Note html={rec.categoriesNote} /> : null}
          </Text>
          <Think>
            <div className="sf-margin">
              <div className="sf-mnote">
                <h4>Why colour is allowed here</h4>
                Two lanes have to be told apart at a glance, so they get two pigments.
                That is the only thing hue does on this plate — no claim class, evidence
                status or confidence level is carried by colour anywhere.
              </div>
              <div className="sf-mhand">Sort the conditions, and the processes follow.</div>
            </div>
          </Think>
        </Band>

        {/* ------------------------------------------------------ processes */}
        <Band register="working" n="03" id="s-processes">
          <Text>
            <Heading kicker="The processes">Two roads out of one job</Heading>
            {rec.pathwaysLede ? <p className="sf-lede">{rec.pathwaysLede}</p> : null}
            <div className="sf-terms">
              {(rec.pathways ?? []).map((p, i) => (
                <div className="sf-term" key={p.title}>
                  <Chip hue={i === 0 ? "vermilion" : "teal"} seed={41 + i * 13} />
                  <div>
                    <h4>{p.title}</h4>
                    <p>
                      {p.blurb}
                      <br />
                      <span style={{ color: "var(--ink-3)", fontSize: ".9em" }}>{p.steps.join(" → ")}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {rec.pathwaysCaution ? <Note html={rec.pathwaysCaution} label="Caution" /> : null}
          </Text>
          <Think />
        </Band>

        {/* ---------------------------------------------------- demand types */}
        <Band register="working" n="04" id="s-types" full>
          <div className="sf-band" data-register="working" style={{ borderTop: "1px solid var(--hair-2)" }}>
            <div className="sf-rail" aria-hidden="true">
              <div className="sf-num">04</div>
              <div className="sf-reg">working</div>
            </div>
            <div className="sf-text">
              <Heading kicker="Not all demands">
                Challenge <Strike c="vermilion" seed={61}>=</Strike> hindrance
              </Heading>
              {rec.demandTypesLede ? <p className="sf-lede">{rec.demandTypesLede}</p> : null}
              <div className="sf-terms">
                {(rec.demandTypes ?? []).map((d, i) => (
                  <div className="sf-term" key={d.title}>
                    <Chip hue={i === 0 ? "teal" : "vermilion"} seed={51 + i * 11} />
                    <div>
                      <h4>{d.title}</h4>
                      <p>
                        {d.definition}
                        <br />
                        <span style={{ color: "var(--ink-3)", fontSize: ".9em" }}>{d.examples.join(" · ")}</span>
                        <br />
                        <i dangerouslySetInnerHTML={{ __html: `Relates to ${d.relates}` }} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {rec.demandTypesNote ? <Note html={rec.demandTypesNote} /> : null}
            </div>
            <div className="sf-think">
              <div className="sf-margin">
                <div className="sf-mnote">
                  <h4>Why the effort bar is identical</h4>
                  Both rows carry the same mark, generated from one seed. The record&rsquo;s
                  point is that the <i>cost</i> is not what separates a challenge from a
                  hindrance — so the figure must not let the cost look different.
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "1rem 0 0" }}>
            <p className="sf-figlabel"><b>Figure 2</b> <span>same cost, different return</span></p>
            <div className="sf-scroll"><ChallengeHindrance types={rec.demandTypes ?? []} /></div>
          </div>
        </Band>

        {/* --------------------------------------------------- interactions */}
        <Band register="working" n="05" id="s-interactions">
          <Text>
            <Heading kicker="The interactions">
              Where the lanes <Hi c="lemon" seed={71}>touch</Hi>
            </Heading>
            {rec.interactionsLede ? <p className="sf-lede">{rec.interactionsLede}</p> : null}
            <ol className="sf-runs">
              {(rec.interactions ?? []).map((it) => (
                <li key={it.title}>
                  <span>
                    <b style={{ letterSpacing: ".06em", fontSize: ".8rem", textTransform: "uppercase" }}>{it.kicker}</b>
                    <br />
                    <b>{it.title}.</b> <span dangerouslySetInnerHTML={{ __html: it.body }} />
                  </span>
                </li>
              ))}
            </ol>
          </Text>
          <Think>
            <p className="sf-figlabel"><b>Figure 3</b> <span>buffering and boosting</span></p>
            <div className="sf-scroll"><Crossing interactions={rec.interactions ?? []} /></div>
            <p className="sf-cap">
              Both arrows land on a <b>link</b> rather than on a box, because each
              hypothesis is a claim about a relationship, not about a quantity.
            </p>
          </Think>
        </Band>

        <Rest />

        {/* ----------------------------------------------------- expansions */}
        <Band register="reading" n="06" id="s-expansions">
          <Text>
            <Heading kicker="After 2001">What was added later</Heading>
            {rec.expansionsLede ? <p className="sf-lede">{rec.expansionsLede}</p> : null}
            <div className="sf-terms">
              {(rec.expansions ?? []).map((e, i) => (
                <div className="sf-term" key={e.title}>
                  <Chip hue={(["teal", "vermilion", "cobalt", "violet"] as Hue[])[i % 4]} seed={71 + i * 7} />
                  <div>
                    <h4>{e.title}</h4>
                    <p dangerouslySetInnerHTML={{ __html: e.body }} />
                  </div>
                </div>
              ))}
            </div>
          </Text>
          <Think>
            <div className="sf-mhand">The arrows run backwards as well as forwards.</div>
          </Think>
        </Band>

        <Band register="quiet" n="07" id="s-shortcuts">
          <Text>
            <Heading kicker="Do not conclude">Shortcuts the theory does not license</Heading>
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
            <Frayed hue="vermilion" seed={181} width={320} />
            <h3 className="sf-kicker" style={{ marginTop: "1.6rem" }}>Qualifications the record keeps</h3>
            <ul className="sf-plain">
              {rec.qualifications.map((q) => (<li key={q} dangerouslySetInnerHTML={{ __html: q }} />))}
            </ul>
          </Text>
          <Think>
            <div className="sf-mhand">Uncertainty is content, not a defect to smooth away.</div>
          </Think>
        </Band>

        <Band register="quiet" n="08" id="s-trail">
          <Text>
            <Heading kicker="The trail">Where the claims come from</Heading>
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
            {rec.originsNote ? <Note html={rec.originsNote} label="On the arc" /> : null}
          </Text>
          <Think />
        </Band>

        <Band register="quiet" n="09" id="s-sources">
          <Text>
            <Heading kicker="Sources">{rec.minimumReadingLabel ?? "Minimum reading"}</Heading>
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
                  </div>
                </li>
              ))}
            </ol>
          </Text>
          <Think />
        </Band>

        <Band register="quiet" n="10" id="s-prov">
          <Text>
            <Heading kicker="Provenance">What kind of claim each mark on this page is</Heading>
            <ul className="sf-prov">
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
          </Text>
          <Think />
        </Band>

        {related.length ? (
          <Band register="quiet" n="11" id="s-rel">
            <Text>
              <Heading kicker="Nearby">Records that ask a different question</Heading>
              {rec.relatedToLede ? <p className="sf-lede">{rec.relatedToLede}</p> : null}
              <ul className="sf-rel">
                {related.map(({ link, target }) => (
                  <li key={link.recordId}>
                    {target ? <a href={recordHref(target)}>{target.title}</a> : <span>{link.recordId}</span>}
                    <p><i>{link.relation}</i> — {link.body}</p>
                  </li>
                ))}
              </ul>
            </Text>
            <Think />
          </Band>
        ) : null}
      </main>
      <Foot />
    </>
  );
}
