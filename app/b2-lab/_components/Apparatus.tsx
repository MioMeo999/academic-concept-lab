import type { EvidenceXray, Provenance, Source, RecordLink } from "@/content/types";
import { RECORDS, recordHref } from "@/content/records";
import { Rich, Note } from "./Type";

export function Evidence({ items }: { items: EvidenceXray[] }) {
  return <div className="b2-evidence">{items.map((item, i) => <article className="b2-evidence-entry" key={item.title}>
    <div className="b2-evidence-identity"><span className="b2-eyebrow">{String(i + 1).padStart(2, "0")} / {item.label}</span><h3>{item.title}</h3><p className="b2-citation"><Rich text={item.citation} /></p>{item.doi ? <a className="b2-doi" href={`https://doi.org/${item.doi}`}>Read source ↗ <span>{item.doi}</span></a> : null}</div>
    <dl className="b2-evidence-reading">{item.design ? <div><dt>Design / material</dt><dd><Rich text={item.design} /></dd></div> : null}<div><dt>{item.testedLabel}</dt><dd><Rich text={item.tested} /></dd></div><div><dt>{item.foundLabel}</dt><dd><Rich text={item.found} /></dd></div><div className="b2-non-test"><dt>Does not establish</dt><dd><Rich text={item.notTested} /></dd></div></dl>
  </article>)}</div>;
}

export function Scope({ explains, stops, qualifications }: { explains: string[]; stops: string[]; qualifications: string[] }) {
  return <div className="b2-scope"><div className="b2-scope-pair"><div><h3>Within its reach</h3><ul>{explains.map(item => <li key={item}><Rich text={item} /></li>)}</ul></div><div><h3>Where it stops</h3><ul>{stops.map(item => <li key={item}><Rich text={item} /></li>)}</ul></div></div><div className="b2-qualifications"><h3>Qualifications that stay with the claim</h3>{qualifications.map((item, i) => <Note key={i} glyph="?"><Rich text={item} /></Note>)}</div></div>;
}

export function Sources({ minimum, full }: { minimum: Source[]; full: Source[] }) {
  const primary = new Set(minimum.map(item => item.citation));
  const others = full.filter(item => !primary.has(item.citation));
  function entries(items: Source[]) { return <ol className="b2-sources">{items.map((item, i) => <li key={item.citation}><span className="b2-source-number">{String(i + 1).padStart(2, "0")}</span><div><p><Rich text={item.citation} /></p><p className="b2-source-contribution"><Rich text={item.contribution} /></p>{item.doi ? <a className="b2-doi" href={`https://doi.org/${item.doi}`}>Source ↗ {item.doi}</a> : null}</div></li>)}</ol>; }
  return <div className="b2-source-register"><h3>Minimum reading</h3><p className="b2-small">An entry into the scholarship; not the complete evidence base.</p>{entries(minimum)}{others.length ? <details className="b2-full-sources"><summary>Continue through the full source trail <span>{others.length} further entries</span></summary>{entries(others)}</details> : null}</div>;
}

export function ProvenanceRegister({ items, local }: { items: Provenance[]; local: string }) {
  return <div className="b2-provenance"><h3>Responsibility for this reading</h3><Note>{local}</Note><p className="b2-small">The record’s five provenance notes follow. Local notes identify the constructions actually used in this selected prototype.</p><dl>{items.map(item => <div key={item.glyph}><dt><span aria-hidden="true">{item.glyph}</span> {item.label}</dt><dd><Rich text={item.note} /></dd></div>)}</dl></div>;
}

export function Relations({ items }: { items: RecordLink[] }) {
  return <div className="b2-relations"><h3>Read in relation</h3>{items.map(item => {
    const target = RECORDS.find(record => record.id === item.recordId);
    return target ? <div className="b2-relation" key={item.recordId}><span className="b2-eyebrow">{item.relation}</span><a href={recordHref(target)}>{target.title} <span aria-hidden="true">↗</span></a><p><Rich text={item.body} /></p><span className="b2-small">✦ Canonical record’s editorial reading connection. Opens the canonical record.</span></div> : null;
  })}</div>;
}

export function IpaNeighbour() {
  const target = RECORDS.find(record => record.kind === "method" && record.id !== "ipa");
  if (!target) return null;
  return <div className="b2-relations"><h3>A neighbouring practice</h3><div className="b2-relation"><span className="b2-eyebrow">Compare the research question</span><a href={recordHref(target)}>{target.title} ↗</a><p>The IPA record’s question-fit guidance distinguishes personally significant sense-making from asking what themes occur across opinions. The choice of method follows the question.</p><Note>Editorial reading connection from the canonical question-fit guidance; this is not a claim that the methods are interchangeable or share one procedure.</Note></div></div>;
}
