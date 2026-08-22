import type { CSSProperties, ReactNode } from "react";
import type { Source, TheoryRecord } from "@/content/types";
import { KIND, RECORDS, recordHref } from "@/content/records";
import { Bullet, Cloud, Divider, Icon, Rich, SecHead, pad2 } from "./Sketch";
import { RecordShell } from "./RecordShell";
import { SETPowerDependenceLab, SETReciprocitySelector, SETRuleSelector, SETTheoryAudit } from "./SETPatterns";

type Block = { key: string; toc: string; title: string; colour: string; body: ReactNode };

function SourceList({ items }: { items: Source[] }) {
  return <>{items.map((source, index) => <div className="src-item" key={source.citation + index}><span className="n">{index + 1}</span><div><Rich className="c" as="div" html={source.citation} /><div className="w">{source.contribution}</div>{source.doi && <div className="doi">doi {source.doi}</div>}</div></div>)}</>;
}

function RelatedLinks({ record }: { record: TheoryRecord }) {
  if (!record.relatedTo?.length) return null;
  return <><Rich className="lede" as="p" html={record.relatedToLede ?? ""} />{record.relatedTo.map((relation) => {
    const target = RECORDS.find((item) => item.id === relation.recordId);
    if (!target) return null;
    const kind = KIND[target.kind];
    return <a className="rel-card" href={recordHref(target)} key={relation.recordId}><span className="rel-relation">this record {relation.relation}</span><span className="rel-title">{target.title}</span><span className="rel-hook">{target.hook}</span><Rich className="rel-body read" as="span" html={relation.body} /><span className="rel-go" style={{ color: kind.colour }}>{kind.cta} →</span></a>;
  })}</>;
}

function ResourceMap({ items }: { items: { label: string; body: string }[] }) {
  return <figure className="set-resource-map sk-box tilt-l" aria-label="Six social exchange resource categories"><div className="set-resource-centre"><span className="k">what can pass between actors?</span><strong>resource</strong><span className="read">The same resource can carry different meanings in different relationships.</span></div><div className="set-resource-grid">{items.map((item, index) => <article className="set-resource" key={item.label}><span className="set-resource-number">{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3><p className="read">{item.body}</p></article>)}</div><figcaption className="set-caption"><span className="set-mark">●</span> Adapted from resource theory as a teaching map; categories are not a claim that every exchange contains only one resource.</figcaption></figure>;
}

function ExchangeStructure() {
  return <figure className="set-structure sk-box tilt-r" aria-label="Elements of a social exchange"><div className="set-structure-row"><div className="set-node red"><span className="k">actor A</span><strong>acts</strong><span>offers, withholds, or changes access</span></div><div className="set-connector"><span>resource / signal</span>→</div><div className="set-node teal"><span className="k">actor B</span><strong>receives</strong><span>interprets, accepts, returns, or refuses</span></div></div><div className="set-structure-row set-structure-lower"><div className="set-node gold"><span className="k">exchange rule</span><strong>makes it legible</strong><span>direct, generalised, negotiated, or norm-led</span></div><div className="set-connector"><span>history + alternatives</span>↕</div><div className="set-node plum"><span className="k">relation</span><strong>changes</strong><span>dependence, trust, obligation, solidarity</span></div></div><figcaption className="set-caption"><span className="set-mark">●</span> A favour becomes analytically useful as an exchange when actors, resource, rule, and relation are specified. This is a teaching structure, not a universal sequence.</figcaption></figure>;
}

function SocialEconomicMap({ dimensions }: { dimensions: { label: string; body: string }[] }) {
  return <div className="set-social-map"><div className="set-social-axis"><span>MORE ECONOMIC-LIKE</span><span>comparison across dimensions</span><span>MORE SOCIAL-LIKE</span></div><div className="set-dimension-grid">{dimensions.map((item) => <article className="set-dimension" key={item.label}><h3>{item.label}</h3><p className="read">{item.body}</p></article>)}</div><p className="set-synthesis"><span className="set-badge">✦ Concept Lab synthesis</span> An exchange can be mixed: explicit terms may sit inside a warm relationship; a social obligation can be closely monitored; money can carry status or care. This is not a money/non-money or moral binary.</p></div>;
}

function RelationshipLoop({ stages }: { stages: { label: string; body: string }[] }) {
  return <figure className="set-loop sk-box tilt-l" aria-label="Feedback between exchange and relationship"><div className="set-loop-track">{stages.map((stage, index) => <span className="set-loop-step" key={stage.label}><b>{String(index + 1).padStart(2, "0")}</b><strong>{stage.label}</strong><small>{stage.body}</small></span>)}</div><div className="set-loop-return" aria-hidden="true">↺ subsequent exchange feeds back into the relationship</div><figcaption className="set-caption"><span className="set-mark">▲</span> A transaction can be one episode; a relationship is the feedback history that makes later exchanges meaningful.</figcaption></figure>;
}

function HedonicMatrix({ items }: { items: { label: string; body: string; colour: string }[] }) {
  return <div className="set-hedonic-grid" aria-label="Hedonic value and activity are separate dimensions">{items.map((item) => <article className="set-hedonic-cell" key={item.label} style={{ "--set-colour": item.colour } as CSSProperties}><span className="k">{item.label}</span><p className="read">{item.body}</p></article>)}</div>;
}

function ConstraintMap({ items }: { items: { desired: string; constrained: string; body: string }[] }) {
  return <div className="set-constraint-grid">{items.map((item) => <article className="set-constraint sk-box" key={item.desired}><span className="k">{item.desired}</span><h3>{item.constrained}</h3><p className="read">{item.body}</p></article>)}</div>;
}

function ExchangeChain({ steps }: { steps: { label: string; body: string }[] }) {
  return <div className="set-chain" aria-label="Subsequent exchange chain">{steps.map((step, index) => <div className="set-chain-step" key={step.label}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step.label}</strong><p className="read">{step.body}</p></div>{index < steps.length - 1 && <b className="set-chain-arrow" aria-hidden="true">↓</b>}</div>)}</div>;
}

function FamilyConstellation({ items }: { items: { label: string; kind: "root" | "branch" | "synthesis" | "remedy"; body: string }[] }) {
  return <div className="set-family" aria-label="Social Exchange Theory family constellation"><div className="set-family-grid">{items.map((item) => <article className={`set-family-node ${item.kind}`} key={item.label}><span className="k">{item.kind}</span><h3>{item.label}</h3><p className="read">{item.body}</p></article>)}</div><p className="set-caption"><span className="set-mark">✦</span> This constellation keeps traditions connected without making every branch a mandatory causal stage.</p></div>;
}

export function SETBody({ record: r }: { record: TheoryRecord }) {
  const data = r.set;
  if (!data) return null;
  const blocks: Block[] = [];
  const add = (key: string, toc: string, title: string, colour: string, body: ReactNode) => blocks.push({ key, toc, title, colour, body });

  add("opening", "I did you a favour. Now what?", "I did you a favour. Now what?", "var(--red)", <><p className="lede">The first useful question is not “was this nice?” It is: what moved between which actors, under which expectation, and with what possible response?</p><div className="set-opening-grid">{data.opening.cases.map((item) => <article className="set-opening-case sk-box" key={item.label}><span className="k">{item.label}</span><blockquote>“{item.quote}”</blockquote><p className="read">{item.body}</p></article>)}</div><p className="set-note"><span className="set-mark">▲</span> {data.opening.note}</p></>);

  add("exchange", "When is it actually an exchange?", "When is it actually an exchange?", "var(--teal)", <><p className="lede">An interaction is not automatically an exchange. SET needs a relation between actors, a resource or outcome, a rule of response, and some interdependence across the episode.</p><ExchangeStructure /></>);

  add("reciprocity", "Which reciprocity?", "Which reciprocity?", "var(--red)", <><p className="lede">“Reciprocity” does three kinds of work in SET conversations. Keep the meanings adjacent, not collapsed.</p><SETReciprocitySelector items={data.reciprocity} /></>);

  add("resources", "What passed between us?", "What passed between us?", "var(--teal)", <><p className="lede">Resources are not limited to money or objects. Their value and meaning are relational and contextual.</p><ResourceMap items={data.resources} /></>);

  add("rules", "Same action. Different rule?", "Same action. Different rule?", "var(--red)", <><p className="lede">The same helping act can be read as a return, a negotiated term, a contribution to a group, or a moral obligation. The rule changes the analysis.</p><SETRuleSelector items={data.rules} /></>);

  add("socialEconomic", "Social or economic?", "Social or economic? It isn’t just about money", "var(--gold-deep)", <><p className="lede">Social and economic exchange are often treated as contrasting patterns, but the contrast is multidimensional. The map below is a Concept Lab synthesis for comparison, not an official seven-dimension taxonomy.</p><SocialEconomicMap dimensions={data.dimensions} /></>);

  add("power", "Who needs whom?", "Who needs whom? Power & Dependence Lab", "var(--plum-deep)", <><p className="lede">Emerson’s point is relational: dependence rises when a valued outcome is mediated by a partner and alternatives are scarce. Power is the asymmetry in that dependence, not a person-level score.</p><SETPowerDependenceLab model={data.power} /></>);

  add("relationship", "A transaction is not a relationship", "A transaction is not a relationship", "var(--teal)", <><p className="lede">A single exchange can be analysed without claiming a durable relationship. A relationship is built, revised, or weakened through feedback across exchanges.</p><RelationshipLoop stages={data.relationshipStages} /></>);

  add("hedonic", "Positive / negative is not enough", "Positive / negative is not enough", "var(--red)", <><p className="lede">A positive or negative outcome does not fully identify what the actor does. Activity and hedonic value can vary separately.</p><HedonicMatrix items={data.hedonic} /><p className="set-note"><span className="set-mark">▲</span> Later theoretical remedies keep hedonic direction and activity distinct; a benefit does not force activity, and a cost does not prescribe one response.</p></>);

  add("constraints", "What if I can’t respond the way I want?", "What if I can’t respond the way I want?", "var(--gold-deep)", <><p className="lede">Actors can want to reciprocate and still lack the resources, time, role permission, safety, or alternatives to do so directly.</p><ConstraintMap items={data.constraints} /><p className="set-synthesis"><span className="set-badge">later refinement</span> Constraints may reduce or redirect activity while the actor’s hedonic direction remains positive. They do not make response deterministic.</p></>);

  add("chain", "One response becomes the next action", "One response becomes the next action", "var(--teal)", <><p className="lede">SET becomes relational when the present exchange changes the conditions under which the next exchange will be interpreted.</p><ExchangeChain steps={data.chain} /></>);

  add("audit", "Do you actually have an SET model?", "Do you actually have an SET model?", "var(--red)", <><p className="lede">Before calling a finding “SET”, audit the exchange rather than attaching the label to any helpful or harmful relationship.</p><SETTheoryAudit items={data.audit} /></>);

  add("family", "Why isn’t there one SET diagram?", "Why isn’t there one SET diagram?", "var(--plum-deep)", <><p className="lede">The label names a family of traditions. Their shared concern is interdependence; their preferred units, mechanisms, and outcomes differ.</p><FamilyConstellation items={data.family} /></>);

  add("explains", "What SET explains", "What SET explains", "var(--teal)", <div className="set-scope-grid"><div className="sk-box teal tilt-l"><span className="k">what the lens makes visible</span><ul>{data.scope.explains.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div><div className="sk-box gold tilt-r"><span className="k">the lens has boundaries</span><ul>{data.scope.stops.map((item) => <li key={item}><span>?</span>{item}</li>)}</ul></div></div>);

  add("stops", "Where SET stops", "Where SET stops", "var(--red)", <><div className="set-stop-box sk-box red tilt-r2"><Icon id="i-warn" style={{ width: 28, height: 28, color: "var(--red)" }} /><p className="read">{data.scope.note}</p></div><div className="set-boundaries">{data.scope.stops.map((item) => <Bullet icon="i-q" colour="var(--red)" html={item} key={item} />)}</div></>);

  add("related", "Where it sits", "Where this sits in the library", "var(--teal)", <RelatedLinks record={r} />);
  add("trail", "The intellectual trail", "The intellectual trail", "var(--teal)", <><p className="lede">{r.trailLede}</p><div className="trail">{r.origins.map((origin) => <div className="trail-item" key={origin.year + origin.author}><span className="trail-year">{origin.year}</span><div><Rich as="h3" html={origin.author} /><Rich className="work" as="span" html={origin.work} /><Rich as="p" html={origin.contribution} /></div></div>)}</div></>);
  add("oversimplifications", "Don’t conclude", "Don’t conclude", "var(--red)", <><p className="lede">{r.oversimplificationsLede}</p><div className="grid2" style={{ marginTop: "1rem" }}>{r.oversimplifications.map((item, index) => <div className={index % 2 ? "tilt-r2" : "tilt-l2"} key={item}><Cloud colour="#E24E1B"><Rich className="read" as="p" html={item} /></Cloud></div>)}</div></>);
  add("qualifications", "Still open", "Still open", "var(--teal)", <div style={{ marginTop: ".4rem" }}>{r.qualifications.map((item) => <Bullet icon="i-q" colour="var(--teal)" html={item} key={item} />)}</div>);
  add("sources", "Sources", "Sources", "var(--teal)", <div className="sk-box tilt-l2" style={{ marginTop: ".7rem" }}><div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: ".4rem" }}><Icon id="i-book" style={{ width: 26, height: 26, color: "var(--red)" }} /><h3>{r.minimumReadingLabel ?? "If you read seven things"}</h3></div><SourceList items={r.minimumReading} /></div>);
  add("provenance", "Provenance", "Where every claim came from", "var(--teal)", <div className="prov" style={{ marginTop: ".8rem" }}>{r.provenance.map((item) => <div className="prov-item" key={item.label} data-reveal="rise"><span className="g" style={{ color: item.colour }}>{item.glyph}</span><div><h4>{item.label}</h4><p>{item.note}</p></div></div>)}</div>);

  const toc = blocks.map((block, index) => [pad2(index + 1), block.toc, `s${index + 1}`] as [string, string, string]);
  return <RecordShell record={r} toc={toc}>{blocks.map((block, index) => <span key={block.key} style={{ display: "contents" }}>{index > 0 && <Divider />}<section className="rec" id={`s${index + 1}`}><SecHead num={pad2(index + 1)} title={block.title} colour={block.colour} />{block.body}</section></span>)}</RecordShell>;
}
