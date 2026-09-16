import type { Metadata } from "next";
import { tonalHierarchy as rec } from "../../../content/tonal-hierarchy";
import { RECORDS, recordHref } from "../../../content/records";
import type { EvidenceXray, TonalCard } from "../../../content/types";
import {
  Band, Chip, Contents, Foot, Frayed, Heading, Masthead, Note, Rest, Status, Text, Think,
} from "../_components/Shell";
import { Plate } from "../_components/Pigment";
import { Contour, Field, Halo, Link, Note as Hand } from "../_components/Draw";
import { Hi, Query, Ring, Strike, TermRow, Ul } from "../_components/Notes";
import { CompetingReadings, LocalNeighbourhood, OneProbeFourSurrounds, OrderedRegisters } from "./_components/Figures";

export const metadata: Metadata = {
  title: "Tonal Hierarchy",
  description: rec.oneSentence,
};

const t = rec.tonal!;

type Hue = "cobalt" | "teal" | "ochre" | "vermilion" | "violet" | "sky" | "magenta" | "sand";
const set = (...h: Hue[]) => (i: number) => h[i % h.length];
const FACT_HUES: Hue[] = ["vermilion", "cobalt", "ochre", "teal", "violet"];

const SECTIONS = [
  { id: "s-open", label: "One note, four jobs" },
  { id: "s-context", label: "What a key supplies" },
  { id: "s-measure", label: "Rating ≠ profile ≠ stability" },
  { id: "s-profile", label: "The qualitative profile" },
  { id: "s-same", label: "Holding the probe still" },
  { id: "s-dimensions", label: "Not tonal function alone" },
  { id: "s-repr", label: "A psychological representation" },
  { id: "s-neigh", label: "Keys have neighbourhoods" },
  { id: "s-torus", label: "Why the torus is not drawn" },
  { id: "s-dynamics", label: "Organisation is dynamic" },
  { id: "s-distribution", label: "What exposure could explain" },
  { id: "s-development", label: "Increasing differentiation" },
  { id: "s-culture", label: "Beyond major and minor" },
  { id: "s-process", label: "Profile is not process" },
  { id: "s-evidence", label: "Evidence x-rays" },
  { id: "s-scope", label: "Where it stops" },
  { id: "s-shortcuts", label: "Do not conclude" },
  { id: "s-lineage", label: "What came after" },
  { id: "s-trail", label: "The trail" },
  { id: "s-sources", label: "Sources" },
  { id: "s-prov", label: "Provenance" },
  { id: "s-rel", label: "Nearby records" },
];

function Cards({ cards, hues }: { cards: TonalCard[]; hues: (i: number) => Hue }) {
  return (
    <div className="sf-terms">
      {cards.map((c, i) => (
        <div className="sf-term" key={c.label}>
          <Chip hue={hues(i)} seed={13 + i * 11} />
          <div>
            <h4>{c.label}</h4>
            <p dangerouslySetInnerHTML={{ __html: c.body }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Xray({ e }: { e: EvidenceXray }) {
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
        <dt>{e.testedLabel}</dt>
        <dd>{e.tested}</dd>
        <dt>{e.foundLabel}</dt>
        <dd>{e.found}</dd>
        <dt>what it did not test</dt>
        <dd data-neg="true">{e.notTested}</dd>
        {e.doi ? (<><dt>doi</dt><dd><a href={`https://doi.org/${e.doi}`} rel="noreferrer">{e.doi}</a></dd></>) : null}
      </dl>
    </div>
  );
}

export default function TonalSurface() {
  const related = (rec.relatedTo ?? []).map((l) => ({
    link: l,
    target: RECORDS.find((r) => r.id === l.recordId),
  }));

  const surrounds = t.sameNote.contexts.map((c) => ({
    label: c.label,
    role: c.role ?? "",
    chords: (() => {
      // Rebuild the three triads from the context's own event list: events
      // sharing an onset are one chord. Nothing is invented for the drawing.
      const byStart = new Map<number, number[]>();
      for (const ev of c.events) {
        const k = Math.round(ev.start * 1000);
        byStart.set(k, [...(byStart.get(k) ?? []), ev.pitch]);
      }
      return Array.from(byStart.entries()).sort((a, b) => a[0] - b[0]).map(([, v]) => v).slice(0, 3);
    })(),
  }));

  return (
    <>
      <Masthead here="/surface/tonal-hierarchy" />
      <main className="sf-shell" id="sf-main">
        <Status
          items={[
            ["Record", "Theory · empirical cognitive framework"],
            ["Branch", "Musical structure & grammar"],
            ["Discipline", "Music psychology"],
            ["Status", "Visual exploration — not production"],
          ]}
        />

        {/* --------------------------------------------------- 01 ignition */}
        <Band register="ignition" n="01" id="s-open">
          <Text>
            <p className="sf-kicker">Plate two · built around one held mark</p>
            <h1 className="sf-title">Tonal <em>Hierarchy</em></h1>
            <p className="sf-sub">{rec.oneSentence}</p>
            <p className="sf-hook">{rec.hook}</p>
            <div className="sf-meta">
              <span data-strong="true">{rec.knowledgeFormQualifier}</span>
              <span>Music psychology</span>
            </div>
            <TermRow terms={rec.facts.map((f, i) => ({ label: f, hue: FACT_HUES[i % FACT_HUES.length] }))} />
            <p className="sf-p" style={{ marginTop: "1.6rem" }}>
              {t.sameNote.lede}
            </p>
          </Text>
          <Think>
            <p className="sf-figlabel"><b>Figure 1</b> <span>one probe, four surrounds</span></p>
            <OneProbeFourSurrounds contexts={surrounds} />
            <p className="sf-cap">
              The probe is <b>drawn once and instanced four times</b>, and the pitch
              mapping is shared, so it lands at the same coordinate in every panel. The
              vertical column it forms is the figure&rsquo;s only assertion: this did not
              change. All four surrounds are one pigment, because they are the same kind
              of object and differ only in which pitches they contain.
            </p>
          </Think>
        </Band>

        <Band register="quiet" full>
          <div className="sf-band" data-register="quiet" style={{ borderTop: "1px solid var(--hair)", paddingTop: "1.6rem" }}>
            <div className="sf-rail" aria-hidden="true"><div className="sf-reg">contents</div></div>
            <div className="sf-wide"><Contents items={SECTIONS} /></div>
          </div>
        </Band>

        {/* ---------------------------------------------------- conditions */}
        <Band register="working" n="02" id="s-same">
          <Text>
            <Heading kicker="Held and manipulated">What Figure 1 changes, and what it does not</Heading>
            <div className="sf-xray" style={{ borderTopColor: "var(--hair)" }}>
              <dl>
                <dt>probe</dt>
                <dd>
                  {t.sameNote.probe.note} · pitch class {t.sameNote.probe.pitchClass}. {t.sameNote.probe.body}
                </dd>
                {t.sameNote.contexts.map((c) => (
                  <div key={c.id} style={{ display: "contents" }}>
                    <dt>{c.label}</dt>
                    <dd>
                      {c.body}
                      {c.role ? <> The probe&rsquo;s role here: <b>{c.role}</b>.</> : null}
                      <br />
                      <span style={{ color: "var(--ink-3)", fontSize: ".86rem" }}>
                        <i>Held:</i> {c.controls}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Note html={t.sameNote.note} />
          </Text>
          <Think>
            <div className="sf-margin">
              <div className="sf-mnote">
                <h4>Why this plate is not the last one</h4>
                Gestalt is built out of overlap, because its problem is that one set of
                events supports more than one organisation. This record&rsquo;s problem
                is the opposite: one thing is held rigidly constant and everything around
                it moves. So the page is built around a single vertical, and no figure on
                it lets two pigments occupy one span.
              </div>
              <div className="sf-mhand">Fit is not liking.</div>
            </div>
          </Think>
        </Band>

        <Band register="working" n="03" id="s-context">
          <Text>
            <Heading kicker="Context">What a <Ring c="violet" seed={201}>key</Ring> supplies</Heading>
            <p className="sf-lede">{t.context.lede}</p>
            <Cards cards={t.context.cards} hues={set("cobalt", "vermilion", "ochre", "violet", "teal")} />
            <Note html={t.context.note} />
          </Text>
          <Think />
        </Band>

        {/* ------------------------------------------------- 04 measurement */}
        <Band register="working" n="04" id="s-measure">
          <Text>
            <Heading kicker="Measurement">
              A rating is not a profile is not <Ul c="vermilion" seed={77}>stability</Ul>
            </Heading>
            <p className="sf-lede">{t.measurement.lede}</p>
            <Cards cards={t.measurement.cards} hues={set("vermilion", "teal", "ochre", "violet")} />
            <Note html={t.measurement.note} />
          </Text>
          <Think>
            <Plate viewBox="0 0 340 250" ratio="340 / 250">
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <Field x={30} y={24 + i * 74} w={196} h={46} hue={["vermilion", "teal", "ochre"][i] as Hue}
                    seed={9100 + i * 61} passes={9} rows={8} angle={-13} weight={0.28} width={1.5} />
                  <Halo cx={128} cy={47 + i * 74} rx={104} ry={28} hue={["vermilion", "teal", "ochre"][i] as Hue}
                    seed={9150 + i * 31} laps={2} weight={1.5} opacity={0.5} />
                  <Link x1={244} y1={47 + i * 74} x2={288} y2={47 + i * 74} hue="graphite"
                    bend={0.06} seed={9200 + i} weight={1.1} opacity={0.35} />
                </g>
              ))}
              <Hand x={318} y={134} hue="graphite" size={16} rotate={-90} anchor="middle">{"three different objects"}</Hand>
            </Plate>
            <p className="sf-cap">
              Three deposits, deliberately never touching. The record&rsquo;s central
              caution is that these levels get collapsed into one another.
            </p>
          </Think>
        </Band>

        {/* ---------------------------------------------------- 05 profile */}
        <Band register="working" n="05" id="s-profile" full>
          <div className="sf-band" data-register="working" style={{ borderTop: "1px solid var(--hair-2)" }}>
            <div className="sf-rail" aria-hidden="true">
              <div className="sf-num">05</div>
              <div className="sf-reg">working</div>
            </div>
            <div className="sf-text">
              <Heading kicker="The profile">Ordered registers, <Strike c="vermilion" seed={203}>not a curve</Strike></Heading>
              <p className="sf-lede">{t.profile.lede}</p>
              <Note html={t.profile.note} />
            </div>
            <div className="sf-think">
              <div className="sf-margin">
                <div className="sf-mnote">
                  <h4>A refusal, drawn</h4>
                  A curve or a bar chart needs a height axis, and a height axis supplies
                  the very numbers this record declines to display. So the twelve pitch
                  classes are sorted into four ordered registers instead, every one drawn
                  with the same mark at the same ink density. The ordering is carried by
                  position alone — nothing here is darker because it is more stable.
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: ".6rem 0 0" }}>
            <p className="sf-figlabel"><b>Figure 2</b> <span>the qualitative profile — C-major context</span></p>
            <div className="sf-scroll">
              <OrderedRegisters items={t.profile.items} />
            </div>
            <div className="sf-split" style={{ maxWidth: "52rem", marginTop: "1.4rem" }}>
              <div>
                <h4>What each register holds</h4>
                <ul className="sf-plain">
                  {t.profile.items.slice(0, 6).map((it) => (
                    <li key={it.note}><b>{it.pitchClass}</b> — {it.role}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>(continued)</h4>
                <ul className="sf-plain">
                  {t.profile.items.slice(6).map((it) => (
                    <li key={it.note}><b>{it.pitchClass}</b> — {it.role}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Band>

        <Band register="reading" n="06" id="s-dimensions">
          <Text>
            <Heading kicker="Dimensions">Tonal function is not the whole result</Heading>
            <p className="sf-lede">{t.dimensions.lede}</p>
            <Cards cards={t.dimensions.cards} hues={set("vermilion", "teal", "ochre")} />
            <Note html={t.dimensions.note} />
          </Text>
          <Think>
            <div className="sf-mhand">Pitch height did not go away.</div>
          </Think>
        </Band>

        <Band register="reading" n="07" id="s-repr">
          <Text>
            <Heading kicker="Representation">A psychological scaling result</Heading>
            <p className="sf-lede">{t.representation.lede}</p>
            <Cards cards={t.representation.cards} hues={set("vermilion", "ochre", "violet")} />
            <Note html={t.representation.note} />
          </Text>
          <Think />
        </Band>

        {/* ----------------------------------------------- 08 neighbourhood */}
        <Band register="reading" n="08" id="s-neigh">
          <Text>
            <Heading kicker="Neighbourhood">Keys have neighbourhoods too</Heading>
            <p className="sf-lede">{t.neighbourhood.lede}</p>
            <div className="sf-terms">
              {t.neighbourhood.levels.map((lv, i) => (
                <div className="sf-term" key={lv.label}>
                  <Chip hue={set("violet", "cobalt", "teal", "sand")(i)} seed={41 + i * 17} />
                  <div>
                    <h4>{lv.label}</h4>
                    <p>
                      {lv.body}
                      <br />
                      <span style={{ color: "var(--ink-3)", fontSize: ".88rem" }}>{lv.relations.join(" · ")}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Note html={t.neighbourhood.note} />
          </Text>
          <Think>
            <p className="sf-figlabel"><b>Figure 3</b> <span>the local map</span></p>
            <LocalNeighbourhood relations={t.neighbourhood.levels[0].relations} />
            <p className="sf-cap">
              Four related regions around one centre, drawn flat and left open on one
              side. The record&rsquo;s own instruction is to start with a usable local map
              rather than a torus.
            </p>
          </Think>
        </Band>

        {/* ---------------------------------------------- 09 declined torus */}
        <Band register="reading" n="09" id="s-torus">
          <Text>
            <Heading kicker="A drawing declined">Why the torus is <Hi c="lemon" seed={205}>not on this page</Hi> <Query c="violet" /></Heading>
            <p className="sf-lede">{t.keySpace.lede}</p>
            <p className="sf-p">
              The toroidal figure is the most recognisable image the Krumhansl tradition
              produced, and it is the easiest thing this plate could have drawn. It is
              not drawn, because a well-made drawing of it would be read as a picture of
              a place — and the record is explicit that it is not one.
            </p>
            <Note html={t.keySpace.note} />
            <p className="sf-p" style={{ marginTop: "1.2rem" }}>
              A four-dimensional solution rendered as a surface would need to be
              flattened, shaded and oriented, and every one of those choices would add
              information the analysis does not contain. The relations it preserves —
              fifth-related, relative, parallel, and psychological similarity — are listed
              in section 08 in type, where they can keep their status as similarity
              relations derived from patterns of ratings.
            </p>
          </Text>
          <Think>
            <Plate viewBox="0 0 300 190" ratio="300 / 190">
              <Contour points={[[46, 96], [92, 40], [190, 32], [258, 56], [268, 118], [212, 158], [104, 158], [52, 134]]}
                hue="graphite" seed={9520} weight={1.3} opacity={0.32} dash="9 8" wobble={5} />
              <Contour points={[[92, 96], [128, 66], [186, 62], [214, 92], [188, 124], [126, 126]]}
                hue="graphite" seed={9540} weight={1.1} opacity={0.2} dash="7 9" wobble={4} />
              <Hand x={150} y={100} hue="graphite" size={18} anchor="middle">{"not drawn"}</Hand>
            </Plate>
            <p className="sf-cap">
              The space left where the recognisable figure would have gone. The relations
              it encodes are in the text; the surface is not.
            </p>
          </Think>
        </Band>

        {/* ---------------------------------------------------- 10 dynamics */}
        <Band register="working" n="10" id="s-dynamics" full>
          <div className="sf-band" data-register="working" style={{ borderTop: "1px solid var(--hair-2)" }}>
            <div className="sf-rail" aria-hidden="true">
              <div className="sf-num">10</div>
              <div className="sf-reg">working</div>
            </div>
            <div className="sf-text">
              <Heading kicker="Dynamics">The reading moves while the music runs</Heading>
              <p className="sf-lede">{t.dynamics.lede}</p>
              <Cards cards={t.dynamics.states} hues={set("teal", "ochre", "vermilion")} />
              <Note html={t.dynamics.note} />
            </div>
            <div className="sf-think">
              <div className="sf-margin">
                <div className="sf-mnote">
                  <h4>Where the constraint costs something</h4>
                  Support really is content here — the record says a new chord can
                  strengthen an alternative reading. But density on this surface never
                  means evidence, so support is drawn as the <i>extent</i> a band occupies
                  at constant ink. A reading that gains support becomes wider, never
                  darker. It is a less immediate picture, and it is the honest one.
                </div>
                <div className="sf-mhand">The last chord is not the whole key.</div>
              </div>
            </div>
          </div>
          <div style={{ padding: ".6rem 0 0" }}>
            <p className="sf-figlabel"><b>Figure 4</b> <span>two readings across a chord sequence</span></p>
            <div className="sf-scroll">
              <CompetingReadings />
            </div>
          </div>
        </Band>

        <Band register="reading" n="11" id="s-distribution">
          <Text>
            <Heading kicker="Exposure">What distribution could and could not explain</Heading>
            <p className="sf-lede">{t.distribution.lede}</p>
            <Cards cards={t.distribution.cards} hues={set("teal", "ochre", "vermilion")} />
            <Note html={t.distribution.note} />
          </Text>
          <Think />
        </Band>

        <Band register="reading" n="12" id="s-development">
          <Text>
            <Heading kicker="Development">Increasing differentiation, in one study</Heading>
            <p className="sf-lede">{t.development.lede}</p>
            <Cards cards={t.development.cards} hues={set("teal", "ochre", "vermilion")} />
            <Note html={t.development.note} />
          </Text>
          <Think>
            <div className="sf-mhand">Not an innate staircase.</div>
          </Think>
        </Band>

        <Rest />

        <Band register="quiet" n="13" id="s-culture">
          <Text>
            <Heading kicker="Culture">Beyond major and minor</Heading>
            <p className="sf-lede">{t.culture.lede}</p>
            <Cards cards={t.culture.cards} hues={set("teal", "vermilion", "ochre")} />
            <Note html={t.culture.note} />
          </Text>
          <Think>
            <div className="sf-mnote">
              <h4>Quiet register</h4>
              From here the page keeps the same grid, the same faces and the same
              apparatus rail. What it drops is colour, not precision.
            </div>
          </Think>
        </Band>

        <Band register="quiet" n="14" id="s-process">
          <Text>
            <Heading kicker="Profile and process">A boundary on inference</Heading>
            <p className="sf-lede">{t.process.lede}</p>
            <Cards cards={t.process.cards} hues={set("teal", "vermilion", "ochre")} />
            <Note html={t.process.note} />
          </Text>
          <Think />
        </Band>

        <Band register="quiet" n="15" id="s-evidence">
          <Text>
            <p className="sf-kicker">Evidence · x-rays</p>
            <h2 className="sf-h">What each study did, found, and did not test</h2>
            {(rec.evidenceXrays ?? []).map((e) => (
              <Xray key={e.title} e={e} />
            ))}
          </Text>
          <Think>
            <div className="sf-mnote">
              <h4>Seven, in full</h4>
              Every x-ray on this page carries its design, what it tested, what it found,
              and what it did not test. The last row is the one that gets dropped when a
              framework is summarised, so it is the one that is never dropped here.
            </div>
          </Think>
        </Band>

        <Band register="quiet" n="16" id="s-scope">
          <Text>
            <Heading kicker="Scope">What it explains, and <Ul c="cobalt" seed={207}>where it stops</Ul></Heading>
            <p className="sf-lede">{t.scope.lede}</p>
            <div className="sf-split">
              <div>
                <h4>Explains</h4>
                <ul className="sf-plain">{t.scope.explains.map((e) => (<li key={e}>{e}</li>))}</ul>
              </div>
              <div>
                <h4>Stops before</h4>
                <ul className="sf-plain">{t.scope.stops.map((s) => (<li key={s}>{s}</li>))}</ul>
              </div>
            </div>
            <Note html={t.scope.note} />
          </Text>
          <Think>
            <Plate viewBox="0 0 300 120" ratio="300 / 120">
              <Contour points={[[44, 64], [92, 30], [166, 24], [238, 40], [266, 70], [242, 104], [168, 116], [98, 106]]}
                hue="graphite" seed={9720} weight={1.4} opacity={0.44} dash="8 8" wobble={4} />
              <Hand x={152} y={70} hue="graphite" size={19} anchor="middle">{"where it stops"}</Hand>
            </Plate>
          </Think>
        </Band>

        <Band register="quiet" n="17" id="s-shortcuts">
          <Text>
            <Heading kicker="Do not conclude">Shortcuts that turn a measurement into a property</Heading>
            <p className="sf-lede">{rec.oversimplificationsLede}</p>
            <ul className="sf-plain sf-struck">
              {rec.oversimplifications.map((o, i) => (
                <li key={o}>
                  <Strike c="vermilion" seed={240 + i * 7}>
                    <span dangerouslySetInnerHTML={{ __html: o }} />
                  </Strike>
                </li>
              ))}
            </ul>
            <Frayed hue="vermilion" seed={9800} width={320} />
            <h3 className="sf-kicker" style={{ marginTop: "1.6rem" }}>Qualifications the record keeps</h3>
            <ul className="sf-plain">
              {rec.qualifications.map((q) => (<li key={q} dangerouslySetInnerHTML={{ __html: q }} />))}
            </ul>
          </Text>
          <Think>
            <div className="sf-mhand">A profile is produced in context, not carried by a pitch.</div>
          </Think>
        </Band>

        <Band register="reading" n="18" id="s-lineage">
          <Text>
            <Heading kicker="After">A branching history</Heading>
            <p className="sf-lede">{t.lineage.lede}</p>
            <Cards cards={t.lineage.nodes} hues={set("teal", "vermilion", "ochre")} />
            <Note html={t.lineage.note} />
          </Text>
          <Think />
        </Band>

        <Band register="quiet" n="19" id="s-trail">
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
            {rec.originsNote ? <Note html={rec.originsNote} label="On the programme" /> : null}
          </Text>
          <Think />
        </Band>

        <Band register="quiet" n="20" id="s-sources">
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

        <Band register="quiet" n="21" id="s-prov">
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
          <Think>
            <div className="sf-mnote">
              <h4>Unchanged from the record</h4>
              The glyph vocabulary, the labels and the notes are the record&rsquo;s own.
              No pigment on this page stands in for a provenance class.
            </div>
          </Think>
        </Band>

        <Band register="quiet" n="22" id="s-rel">
          <Text>
            <Heading kicker="Nearby">Records that ask a different question</Heading>
            <p className="sf-lede">{rec.relatedToLede}</p>
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
      </main>
      <Foot />
    </>
  );
}
