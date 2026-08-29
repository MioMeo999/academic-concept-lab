import Link from "next/link";
import type { ReactNode } from "react";
import type { ASACard, EvidenceXray as EvidenceXrayData, Source, TheoryRecord } from "@/content/types";
import { DISCIPLINES } from "@/content/disciplines";
import { KIND, RECORDS, otherRecords, recordHref } from "@/content/records";
import { WmIndex, type IndexEntry } from "./WmIndex";
import { WmSave } from "./WmSave";
import { WmStage } from "./WmStage";
import { MARKS, Note, Rich, StickyNote, Underlined, accent, pad2, type Accent, type Mark } from "./wm";

/* ---------------------------------------------------------------------------
   Gestalt Principles in Music, retypeset in the Wide Margin language.

   Content is a fixed variable. Every sentence, source, claim, boundary and
   ordering comes from content/gestalt-principles-in-music.ts and from the
   production body component; nothing here rewrites the theory to make the
   layout easier. The section sequence is identical to the live record.
   ------------------------------------------------------------------------- */

/** Content stores presentation colour as production tokens. Translate them to
 *  the experiment's accents rather than editing the content file. */
const FROM_CONTENT: Record<string, Accent> = {
  "var(--teal)": "blue",
  "var(--red)": "red",
  "var(--gold-deep)": "amber",
  "var(--plum-deep)": "violet",
  "var(--pen-3)": "ink",
};
const toAccent = (colour: string): Accent => FROM_CONTENT[colour] ?? "ink";

/* ---------- block vocabulary ---------- */

function Blocks({ items }: { items: ASACard[] }) {
  return (
    <div className="wm-blocks">
      {items.map((item) => (
        <div className="wm-block" style={accent(toAccent(item.colour))} key={item.label}>
          <h3>{item.label}</h3>
          <Rich as="p" html={item.body} />
        </div>
      ))}
    </div>
  );
}

function WholeVisual({ cases }: { cases: { label: string; before: string; central: string; after: string; role: string; colour: string }[] }) {
  return (
    <div className="wm-whole" role="img" aria-label="The same central musical event has different perceptual roles inside two surrounding organisations.">
      {cases.map((item) => (
        <div className="wm-whole-case" style={accent(toAccent(item.colour))} key={item.label}>
          <span className="wm-label">{item.label}</span>
          <p className="wm-whole-seq" aria-hidden="true">
            <span>{item.before}</span><strong>{item.central}</strong><span>{item.after}</span>
          </p>
          <p>{item.role}</p>
        </div>
      ))}
      <p className="wm-whole-cap"><b>same event</b> · different surrounding organisation · different perceptual role</p>
    </div>
  );
}

const RAY_ACCENT: Accent[] = ["blue", "amber", "red"];

function ContourVisual({ options }: { options: ASACard[] }) {
  return (
    <div className="wm-contour">
      <svg
        viewBox="0 0 720 210"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="An unfolding contour reaches a point where three continuations are possible: continue the direction, continue the smoothness, or change the organisation."
      >
        {/* what has already happened */}
        <path d="M28 168C86 164 108 96 168 100 224 104 250 150 300 138" fill="none" stroke="var(--wm-ink)" strokeWidth={3.4} strokeLinecap="round" />
        {/* the point at which the organisation is still open */}
        <circle cx={300} cy={138} r={7} fill="var(--wm-ink)" />
        {/* 1 — continue the direction */}
        <path d="M300 138C356 126 404 86 470 62" fill="none" stroke="var(--wm-blue)" strokeWidth={3} strokeDasharray="8 7" strokeLinecap="round" />
        <text x={486} y={60} fontSize={22} fill="var(--wm-blue-ink)" fontFamily="'Patrick Hand', cursive">1</text>
        {/* 2 — continue the smoothness */}
        <path d="M300 138C358 136 410 128 470 122" fill="none" stroke="var(--wm-amber-ink)" strokeWidth={3} strokeDasharray="8 7" strokeLinecap="round" />
        <text x={486} y={128} fontSize={22} fill="var(--wm-amber-ink)" fontFamily="'Patrick Hand', cursive">2</text>
        {/* 3 — change the organisation */}
        <path d="M300 138C338 152 356 186 400 190" fill="none" stroke="var(--wm-red)" strokeWidth={3} strokeDasharray="8 7" strokeLinecap="round" />
        <text x={416} y={196} fontSize={22} fill="var(--wm-red-ink)" fontFamily="'Patrick Hand', cursive">3</text>
        <text x={28} y={196} fontSize={13} fill="var(--wm-mute)" fontFamily="ui-monospace, Consolas, monospace">ALREADY HEARD</text>
        <text x={540} y={166} fontSize={20} fill="var(--wm-mute)" fontFamily="'Patrick Hand', cursive">still open</text>
      </svg>
      <div className="wm-contour-opts">
        {options.map((option, index) => (
          <div key={option.label} style={accent(RAY_ACCENT[index] ?? "ink")}>
            <h3><span aria-hidden="true">{index + 1} · </span>{option.label}</h3>
            <Rich as="p" html={option.body} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PragnanzSteps({ data }: { data: { historical: string; problem: string; later: string[] } }) {
  return (
    <div className="wm-steps">
      <div className="wm-step" style={accent("blue")}>
        <span className="wm-label"><span aria-hidden="true">●</span> Historical ambition</span>
        <p>{data.historical}</p>
      </div>
      <div className="wm-step-arrow" aria-hidden="true">↓</div>
      <div className="wm-step" style={accent("red")}>
        <span className="wm-label"><span aria-hidden="true">?</span> The problem</span>
        <p>{data.problem}</p>
      </div>
      <div className="wm-step-arrow" aria-hidden="true">↓</div>
      <div className="wm-step" style={accent("violet")}>
        <span className="wm-label">Later reformulations</span>
        <div className="wm-chips">{data.later.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </div>
  );
}

function Chain({ items }: { items: ASACard[] }) {
  return (
    <div className="wm-chain">
      {items.map((item, index) => (
        <div className="wm-chain-step" style={accent(toAccent(item.colour))} key={item.label}>
          <span className="n">{pad2(index + 1)}</span>
          <h3>{item.label}</h3>
          <Rich as="p" html={item.body} />
        </div>
      ))}
    </div>
  );
}

function Xray({ item, tone }: { item: EvidenceXrayData; tone: Accent }) {
  return (
    <div className="wm-xray" style={accent(tone)}>
      <div className="wm-xray-head">
        <h3>{item.title}</h3>
        <span className="wm-xray-kind">{item.label}</span>
      </div>
      <Rich as="p" className="wm-xray-cite" html={item.citation} />
      <dl className="wm-xray-rows">
        {item.design && (
          <div className="wm-xray-row"><dt>Design</dt><dd>{item.design}</dd></div>
        )}
        <div className="wm-xray-row"><dt>{item.testedLabel}</dt><dd>{item.tested}</dd></div>
        <div className="wm-xray-row"><dt>{item.foundLabel}</dt><dd>{item.found}</dd></div>
        <div className="wm-xray-row is-limit"><dt>What it did not test</dt><dd>{item.notTested}</dd></div>
      </dl>
      {item.doi && <p className="wm-xray-doi">doi {item.doi}</p>}
    </div>
  );
}

function SourceList({ items, offset = 0 }: { items: Source[]; offset?: number }) {
  return (
    <div className="wm-src">
      {items.map((source, index) => (
        <div className="wm-src-item" key={`${source.citation}-${index}`}>
          <span className="n">{pad2(offset + index + 1)}</span>
          <div>
            <Rich as="div" className="c" html={source.citation} />
            <div className="w">{source.contribution}</div>
            {source.doi && <div className="doi">doi {source.doi}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function FinalModel() {
  return (
    <div
      className="wm-model"
      role="img"
      aria-label="Concept Lab synthesis: musical events support multiple possible organisations; proximity, similarity, and continuation can reinforce or compete; grouping can be preferred or ambiguous; groups can become groups of groups; context, experience, attention, and musical structure influence the organisation."
    >
      <span className="wm-label"><span aria-hidden="true">✦</span> Concept Lab synthesis</span>
      <div className="wm-model-flow" style={{ marginTop: ".9rem" }}>
        <p className="wm-model-lead">musical events</p>
        <span className="a" aria-hidden="true">↓</span>
        <p className="wm-model-lead">multiple possible organisations</p>
        <div className="wm-model-cues">
          <div><strong>proximity</strong><small>temporal relation</small></div>
          <div><strong>similarity</strong><small>like with like</small></div>
          <div><strong>continuation</strong><small>trajectory / contour</small></div>
        </div>
        <p className="wm-hand" style={{ fontSize: "1.15rem", color: "var(--wm-violet-ink)" }}>
          <span aria-hidden="true">↘ </span>reinforcement / competition<span aria-hidden="true"> ↙</span>
        </p>
        <p className="wm-model-band">preferred or ambiguous grouping<small>groups · boundaries · figures</small></p>
        <span className="a" aria-hidden="true">↓</span>
        <p className="wm-model-lead">groups of <em style={{ fontStyle: "normal", fontFamily: "var(--wm-hand)", fontSize: "1.3em" }}>groups</em></p>
        <div className="wm-model-side">
          <span>context</span><b aria-hidden="true">↔</b>
          <span>past experience</span><b aria-hidden="true">↔</b>
          <span>attention</span><b aria-hidden="true">↔</b>
          <span>musical structure</span>
          <small>side influences, not late downstream outcomes</small>
        </div>
      </div>
    </div>
  );
}

/* ---------- cover ---------- */

function GroupingStrip({ events }: { events: { pitch: number; start: number; duration: number }[] }) {
  const pitches = events.map((event) => event.pitch);
  const min = Math.min(...pitches);
  const span = Math.max(Math.max(...pitches) - min, 1);
  const modal = 0.24;

  const cells: ReactNode[] = [];
  events.forEach((event, index) => {
    const previous = events[index - 1];
    if (previous && event.start - previous.start > modal + 0.01) {
      cells.push(<span className="is-gap" key={`gap-${index}`} />);
    }
    cells.push(
      <span key={`e-${index}`} style={{ height: `${34 + (event.pitch - min) / span * 62}%` }} />,
    );
  });

  return (
    <div className="wm-strip" style={accent("blue")}>
      <span className="wm-label" style={{ display: "block", marginBottom: ".7rem" }}>
        The opening stimulus, drawn as time
      </span>
      <div className="wm-strip-row" role="img" aria-label="Eight events drawn in order of time, bar height following pitch, with one larger gap after the fourth event.">
        {cells}
      </div>
      <div className="wm-strip-cap">
        <span className="wm-hand">eight events · one larger gap after 04</span>
        <span className="wm-label"><span aria-hidden="true">▲</span> constructed example</span>
      </div>
    </div>
  );
}

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="wm-spec-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/* ---------- the record ---------- */

type Section = {
  id: string;
  num: string;
  title: string;
  index: string;
  mark: Mark | null;
  tone: Accent;
  body: ReactNode;
};

export function WideMarginGestalt({ record: r }: { record: TheoryRecord }) {
  const data = r.gestalt;
  if (!data) return null;

  const sections: Section[] = [];
  const add = (id: string, title: string, index: string, mark: Mark | null, tone: Accent, body: ReactNode) => {
    sections.push({ id, num: pad2(sections.length + 1), title, index, mark, tone, body });
  };

  add("s01", "Where is the boundary?", "Where is the boundary?", "▲", "amber", (
    <>
      <Rich as="p" className="wm-lede" html={data.opening.lede} />
      <WmStage
        title="Same notes · different grouping"
        description="Choose a condition, listen if you can, and inspect the marked candidate boundary in the visual timeline."
        presets={data.opening.presets}
        tones={["blue", "red"]}
      />
      <div className="wm-ask" style={accent("amber")}>
        <span className="wm-label">the question the interaction asks</span>
        <p>Where do you hear the group boundary?</p>
      </div>
      <StickyNote>{data.opening.note}</StickyNote>
    </>
  ));

  add("s02", "Why did you hear a group?", "Why did you hear a group?", "●", "blue", (
    <>
      <Rich as="p" className="wm-lede" html={data.problem.lede} />
      <Blocks items={data.problem.cards} />
      <Note mark="●">{data.problem.note}</Note>
    </>
  ));

  add("s03", "The whole changes the part", "The whole changes the part", "■", "green", (
    <>
      <Rich as="p" className="wm-lede" html={data.whole.lede} />
      <WholeVisual cases={data.whole.cases} />
      <Note mark="■">{data.whole.note}</Note>
    </>
  ));

  add("s04", "Closer events often group", "Closer events often group", "●", "blue", (
    <>
      <Rich as="p" className="wm-lede" html={data.proximity.lede} />
      <Blocks items={data.proximity.cards} />
      <Note mark="●">{data.proximity.note}</Note>
    </>
  ));

  add("s05", "Like can go with like", "Like can go with like", "●", "blue", (
    <>
      <Rich as="p" className="wm-lede" html={data.similarity.lede} />
      <Blocks items={data.similarity.cards} />
      <Note mark="●">{data.similarity.note}</Note>
    </>
  ));

  add("s06", "When the cues disagree", "When the cues disagree", "✦", "violet", (
    <>
      <Rich as="p" className="wm-lede" html={data.conflict.lede} />
      <WmStage
        title="Time × register"
        description="A, B, and C isolate a temporal cue, a register cue, and their conflict. The labels X and Y mark the boundaries each cue favours."
        presets={data.conflict.presets}
        tones={["blue", "amber", "red"]}
      />
      <div className="wm-ask" style={accent("violet")}>
        <span className="wm-label">no answer is collected, and none is scored</span>
        <p>{data.conflict.question}</p>
      </div>
      <Note mark="✦">{data.conflict.note}</Note>
    </>
  ));

  add("s07", "These aren’t strict laws", "These aren’t strict laws", "✦", "violet", (
    <>
      <Rich as="p" className="wm-lede" html={data.laws.lede} />
      <Blocks items={data.laws.cards} />
      <Note mark="✦">{data.laws.note}</Note>
    </>
  ));

  add("s08", "What counts as a good continuation?", "What counts as a good continuation?", "●", "blue", (
    <>
      <Rich as="p" className="wm-lede" html={data.continuation.lede} />
      <ContourVisual options={data.continuation.options} />
      <div className="wm-bridge">
        <div><b>Gestalt asks</b><span>how is the unfolding pattern organised?</span></div>
        <div><b>Meyer asks</b><span>what can that organisation imply?</span></div>
      </div>
      <Note mark="●">{data.continuation.note}</Note>
    </>
  ));

  add("s09", "When does a pattern feel complete?", "When does a pattern feel complete?", "●", "blue", (
    <>
      <Rich as="p" className="wm-lede" html={data.closure.lede} />
      <Blocks items={data.closure.cards} />
      <Note mark="●">{data.closure.note}</Note>
    </>
  ));

  add("s10", "Why does one organisation feel ‘better’?", "Why does one organisation feel better?", "✦", "violet", (
    <>
      <Rich as="p" className="wm-lede" html={data.pragnanz.lede} />
      <PragnanzSteps data={data.pragnanz} />
      <Note mark="✦">{data.pragnanz.note}</Note>
    </>
  ));

  add("s11", "Groups become groups of groups", "Groups become groups of groups", "●", "blue", (
    <>
      <Rich as="p" className="wm-lede" html={data.hierarchy.lede} />
      <Blocks items={data.hierarchy.levels} />
      <Note mark="●">{data.hierarchy.note}</Note>
    </>
  ));

  add("s12", "From Gestalt to musical grouping rules", "From Gestalt to musical grouping rules", "●", "blue", (
    <>
      <Rich as="p" className="wm-lede" html={data.gttm.lede} />
      <Chain items={data.gttm.stages} />
      <Note mark="●">{data.gttm.note}</Note>
    </>
  ));

  add("s13", "What listeners actually do: Deliège", "What listeners actually do", "■", "green", (
    <>
      <Rich as="p" className="wm-lede" html={data.deliege.lede} />
      <p className="wm-evlabel" style={accent("green")}>Later musical grouping evidence · not Gestalt confirmation</p>
      <Xray item={data.deliege.evidence} tone="green" />
      <Note mark="■">{data.deliege.note}</Note>
    </>
  ));

  add("s14", "Testing formalised grouping rules: Frankland & Cohen", "Testing formalised grouping rules", "■", "green", (
    <>
      <Rich as="p" className="wm-lede" html={data.frankland.lede} />
      <p className="wm-evlabel" style={accent("green")}>Testing formalised musical grouping rules</p>
      <Xray item={data.frankland.evidence} tone="green" />
      <Note mark="■">{data.frankland.note}</Note>
    </>
  ));

  add("s15", "Experience changes grouping", "Experience changes grouping", "■", "green", (
    <>
      <Rich as="p" className="wm-lede" html={data.culture.lede} />
      <Blocks items={data.culture.cards} />
      <Note mark="■">{data.culture.note}</Note>
    </>
  ));

  add("s16", "What Gestalt explains", "What Gestalt explains", "?", "red", (
    <>
      <Rich as="p" className="wm-lede" html={data.scope.lede} />
      <div className="wm-two">
        <div style={accent("blue")}>
          <h3>Gestalt helps explain</h3>
          <ul className="wm-list">{data.scope.explains.map((item) => <li key={item}><span>{item}</span></li>)}</ul>
        </div>
        <div style={accent("red")}>
          <h3>Where Gestalt stops</h3>
          <ul className="wm-list is-stop">{data.scope.stops.map((item) => <li key={item}><span>{item}</span></li>)}</ul>
        </div>
      </div>
      <Note mark="?">{data.scope.note}</Note>
    </>
  ));

  add("s17", "What came after Gestalt?", "What came after Gestalt?", "✦", "violet", (
    <>
      <Rich as="p" className="wm-lede" html={data.lineage.lede} />
      <Chain items={data.lineage.nodes} />
      <FinalModel />
      <Note mark="✦">{data.lineage.note}</Note>
    </>
  ));

  add("s18", "The intellectual / evidence trail", "The intellectual / evidence trail", null, "blue", (
    <>
      <Rich as="p" className="wm-lede" html={r.trailLede} />
      <div className="wm-trail" style={accent("blue")}>
        {r.origins.map((origin) => (
          <div className="wm-trail-item" key={`${origin.year}-${origin.author}`}>
            <span className="wm-trail-year">{origin.year}</span>
            <div>
              <Rich as="h3" html={origin.author} />
              <Rich as="span" className="wm-trail-work" html={origin.work} />
              <Rich as="p" html={origin.contribution} />
            </div>
          </div>
        ))}
      </div>
    </>
  ));

  add("s19", "Don’t conclude", "Don’t conclude", null, "red", (
    <>
      <Rich as="p" className="wm-lede" html={r.oversimplificationsLede} />
      <ul className="wm-dont">
        {r.oversimplifications.map((item) => <li key={item}><Rich as="span" html={item} /></li>)}
      </ul>
    </>
  ));

  add("s20", "Still open", "Still open", "?", "red", (
    <ul className="wm-open" style={accent("red")}>
      {r.qualifications.map((item) => <li key={item}><Rich as="span" html={item} /></li>)}
    </ul>
  ));

  const minimumCitations = new Set(r.minimumReading.map((source) => source.citation));
  const rest = r.fullSources.filter((source) => !minimumCitations.has(source.citation));
  add("s21", "Sources", "Sources", null, "ink", (
    <>
      <div className="wm-src-lead" style={accent("blue")}>
        <span className="wm-label">Start here</span>
        <h3 style={{ fontSize: "1.2rem", marginTop: ".3rem" }}>{r.minimumReadingLabel ?? "If you read six things"}</h3>
        <SourceList items={r.minimumReading} />
      </div>
      <div style={accent("ink")}>
        <span className="wm-label">The rest of the trail</span>
        <SourceList items={rest} offset={r.minimumReading.length} />
      </div>
    </>
  ));

  const related = (r.relatedTo ?? [])
    .map((link) => ({ link, target: RECORDS.find((record) => record.id === link.recordId) }))
    .filter((item) => item.target);

  if (related.length) {
    add("s22", "Related records", "Related records", null, "violet", (
      <>
        <p className="wm-lede">These records sit beside Gestalt without becoming interchangeable.</p>
        <div className="wm-rel">
          {related.map(({ link, target }) => (
            <Link className="wm-rel-card" href={recordHref(target!)} key={link.recordId} style={accent("violet")}>
              <span className="r">this record {link.relation}</span>
              <h3>{target!.title}</h3>
              <span className="h">{target!.hook}</span>
              <Rich as="span" className="b" html={link.body} />
              <span className="go">{KIND[target!.kind].cta} →</span>
            </Link>
          ))}
        </div>
      </>
    ));
  }

  add("s23", "Where every claim came from", "Provenance", null, "ink", (
    <div className="wm-prov">
      {r.provenance.map((item) => {
        const mark = item.glyph as Mark;
        return (
          <div className="wm-prov-item" style={accent(MARKS[mark]?.accent ?? "ink")} key={item.label}>
            <span className="g" aria-hidden="true">{item.glyph}</span>
            <div>
              <h3>{item.label}</h3>
              <p>{item.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  ));

  const entries: IndexEntry[] = sections.map((section) => ({
    num: section.num,
    label: section.index,
    id: section.id,
    accent: section.tone,
  }));

  const discipline = DISCIPLINES[r.discipline];
  const [firstQuestion, ...restOfHook] = r.hook.split("? ");
  const openingEvents = data.opening.presets[0]?.events ?? [];

  return (
    <>
      <div className="wm-shell">
        <nav className="wm-crumb" aria-label="Breadcrumb">
          <Link href="/experiments">Wide Margin study</Link>
          <span aria-hidden="true">/</span>
          <Link href="/experiments/library">Library</Link>
          <span aria-hidden="true">/</span>
          <span>Theory</span>
        </nav>

        <header className="wm-cover">
          <div className="wm-cover-grid">
            <div>
              <div className="wm-cover-kick">
                <span className="wm-tagchip is-kind">{KIND[r.kind].label}</span>
                <span className="wm-tagchip">{discipline?.name}</span>
                <span className="wm-tagchip">{r.statusChip}</span>
              </div>

              <h1 className="wm-cover-title">{r.title}</h1>

              <p className="wm-cover-q" style={accent("red")}>
                <Underlined>{firstQuestion}?</Underlined>
                {restOfHook.length > 0 && (
                  <span className="wm-cover-q-rest">{restOfHook.join("? ")}</span>
                )}
              </p>

              <p className="wm-cover-sub">{r.oneSentence}</p>

              <div className="wm-cover-actions">
                <WmSave id={r.id} />
                <a className="wm-stop" href="#s01" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                  Start reading ↓
                </a>
              </div>
            </div>

            {openingEvents.length > 0 && <GroupingStrip events={openingEvents} />}
          </div>

          <dl className="wm-spec">
            <SpecRow label="Kind">{KIND[r.kind].label}<small> — a lens, not a result</small></SpecRow>
            <SpecRow label="Discipline">{discipline?.name}</SpecRow>
            <SpecRow label="Knowledge form">{r.knowledgeFormQualifier ?? r.knowledgeForm}</SpecRow>
            <SpecRow label="In one line">
              <span className="wm-spec-tags">{r.facts.map((fact) => <span key={fact}>{fact}</span>)}</span>
            </SpecRow>
            <SpecRow label="Topics">
              <span className="wm-spec-tags">{r.topics.map((topic) => <span key={topic}>{topic}</span>)}</span>
            </SpecRow>
            <SpecRow label="Sources">
              {r.minimumReading.length} core · {rest.length} further · {r.origins.length} entries in the historical trail
            </SpecRow>
            <SpecRow label="Sections">{sections.length}, in the order the live record uses</SpecRow>
          </dl>

          <div className="wm-key">
            <span className="wm-label">How to read the marks</span>
            <div className="wm-key-list">
              {r.provenance.map((item) => {
                const mark = item.glyph as Mark;
                return (
                  <div className="wm-key-item" style={accent(MARKS[mark]?.accent ?? "ink")} key={item.label}>
                    <span className="g" aria-hidden="true">{item.glyph}</span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
            <p className="wm-label" style={{ marginTop: ".8rem", textTransform: "none", letterSpacing: ".02em", fontSize: ".72rem", maxWidth: "62ch" }}>
              Each mark keeps its own colour throughout the page, so the colour of a section number tells you
              what kind of claim the section is making — and every mark is also written out in words.
            </p>
          </div>
        </header>

        <div className="wm-layout">
          <WmIndex entries={entries} />

          <div className="wm-article">
            {sections.map((section) => (
              <section className="wm-sec" id={section.id} key={section.id} style={accent(section.tone)}>
                <div className="wm-sec-in">
                  <div className="wm-sec-rail">
                    <span className="wm-num" aria-hidden="true">{section.num}</span>
                    {section.mark && (
                      <span className="wm-rail-mark">
                        <span className="g" aria-hidden="true">{section.mark}</span>
                        <span>{MARKS[section.mark].short}</span>
                      </span>
                    )}
                  </div>
                  <div className="wm-sec-main">
                    <h2 className="wm-h2">
                      <span className="wm-sr">{section.num}. </span>
                      {section.title}
                    </h2>
                    {section.body}
                  </div>
                </div>
              </section>
            ))}

            <section className="wm-sec" style={accent("ink")}>
              <div className="wm-sec-in">
                <div className="wm-sec-rail"><span className="wm-num" aria-hidden="true">↗</span></div>
                <div className="wm-sec-main">
                  <h2 className="wm-h2">Elsewhere in the library</h2>
                  <p className="wm-lede">Each is a separate record — not a test of the other.</p>
                  <div className="wm-cards">
                    {otherRecords(r).map((other) => (
                      <Link className="wm-card" href={recordHref(other)} key={other.id} style={accent("ink")}>
                        <span className="wm-card-kind">{KIND[other.kind].nav}</span>
                        <h3>{other.title}</h3>
                        <p className="h">{other.hook}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
