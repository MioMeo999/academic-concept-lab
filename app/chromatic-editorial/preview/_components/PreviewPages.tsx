"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { DISCIPLINES } from "@/content/disciplines";
import { getDisciplineOrientation, getDisciplineRecordCount, getPresentationGroupsForDiscipline } from "@/content/atlas";
import { gestaltPrinciplesInMusic } from "@/content/gestalt-principles-in-music";
import { jobDemandsResources } from "@/content/theory";
import { KIND, RECORDS, recordHref } from "@/content/records";
import type { AnyRecord, EvidenceXray, GestaltWholeCase, Provenance, Source } from "@/content/types";
import { PigmentField } from "@/app/chromatic-editorial/_components/PigmentField";

const jdr = jobDemandsResources;
const gestalt = gestaltPrinciplesInMusic;
const gestaltContent = gestalt.gestalt!;

function HtmlText({ html, className, as: Tag = "p" }: { html: string; className?: string; as?: "p" | "span" | "div" }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Mark({ glyph }: { glyph: Provenance["glyph"] }) {
  const name = glyph === "●" ? "source" : glyph === "■" ? "finding" : glyph === "▲" ? "teaching" : glyph === "✦" ? "synthesis" : "open";
  return <span className={`pp-mark pp-mark-${name}`} aria-hidden="true">{glyph}</span>;
}

function PreviewHeader({ active, canonicalHref }: { active: "atlas" | "jdr" | "gestalt"; canonicalHref?: string }) {
  return (
    <header className="pp-header">
      <Link className="pp-brand" href="/concept-lab"><span className="pp-brand-mark" aria-hidden="true">✦</span><span>Academic Concept Lab</span></Link>
      <nav className="pp-nav" aria-label="Preview pages">
        <Link className={active === "atlas" ? "is-active" : ""} href="/chromatic-editorial/preview/home">Atlas</Link>
        <Link className={active === "jdr" ? "is-active" : ""} href="/chromatic-editorial/preview/job-demands-resources">JD–R</Link>
        <Link className={active === "gestalt" ? "is-active" : ""} href="/chromatic-editorial/preview/gestalt-principles-in-music">Gestalt</Link>
      </nav>
      <Link className="pp-canonical" href={canonicalHref ?? "/chromatic-editorial/preview"}>isolated preview ↗</Link>
    </header>
  );
}

function SectionRail({ number, label, colour = "blue" }: { number: string; label: string; colour?: string }) {
  return <div className={`pp-section-rail pp-rail-${colour}`}><span>{label}</span><b>{number}</b></div>;
}

function Pigment({ tone, className = "" }: { tone: "blue" | "red" | "yellow" | "teal"; className?: string }) {
  return <PigmentField tone={tone === "teal" ? "teal" : tone} className={`pp-pigment pp-pigment-${tone} ${className}`} />;
}

function PaperRule({ colour = "var(--pp-blue)" }: { colour?: string }) {
  return <svg className="pp-paper-rule" viewBox="0 0 180 22" aria-hidden="true"><path d="M4 12c37-5 74 4 112-1 22-3 34-2 60-5" fill="none" stroke={colour} strokeWidth="3" strokeLinecap="round" opacity=".75" /><path d="M9 17c46-5 88 1 158-4" fill="none" stroke={colour} strokeWidth="1" strokeLinecap="round" opacity=".42" /></svg>;
}

function ProvenanceList({ items }: { items: Provenance[] }) {
  return <div className="pp-provenance-list">{items.map((item) => <div className="pp-provenance-row" key={item.glyph}><Mark glyph={item.glyph} /><div><h3>{item.label}</h3><p>{item.note}</p></div></div>)}</div>;
}

function SourceList({ sources, className = "" }: { sources: Source[]; className?: string }) {
  return <ol className={`pp-source-list ${className}`}>{sources.map((source, index) => <li key={source.citation}><span className="pp-source-number">{String(index + 1).padStart(2, "0")}</span><div><HtmlText html={source.citation} /><p>{source.contribution}</p>{source.doi && <a href={`https://doi.org/${source.doi}`} target="_blank" rel="noreferrer">doi ↗</a>}</div></li>)}</ol>;
}

function RecordLink({ record, className = "" }: { record: AnyRecord; className?: string }) {
  return <Link className={`pp-record-link ${className}`} href={recordHref(record)}><span>{KIND[record.kind].nav}</span><strong>{record.title}</strong><i aria-hidden="true">↗</i></Link>;
}

const dialect: Record<string, { label: string; body: string }> = {
  theory: { label: "A theory is a lens", body: "A way of seeing why or how a phenomenon should be understood." },
  study: { label: "A study is an argument", body: "A specific investigation, with its design, evidence, finding, and limits kept together." },
  method: { label: "A method is a practice", body: "A repeatable way to make a defensible interpretive or empirical move." },
  mechanism: { label: "A mechanism is a pathway", body: "A process showing through what something happens, rather than why the whole field exists." },
};

function AtlasMap() {
  const nodes = [
    { kind: "theory" as const, x: 124, y: 130, w: 176, h: 88 },
    { kind: "study" as const, x: 518, y: 130, w: 176, h: 88 },
    { kind: "method" as const, x: 124, y: 364, w: 176, h: 88 },
    { kind: "mechanism" as const, x: 518, y: 364, w: 176, h: 88 },
  ];
  return <figure className="pp-atlas-map"><Pigment tone="blue" className="pp-atlas-wash" /><svg viewBox="0 0 820 520" role="img" aria-labelledby="atlas-map-title atlas-map-desc"><title id="atlas-map-title">The Academic Concept Lab record ontology</title><desc id="atlas-map-desc">Four record kinds orbit a central question: theory, study, method, and mechanism.</desc><path className="pp-atlas-thread" d="M214 174C300 110 330 118 410 170S520 120 606 174M214 408C302 458 344 421 410 350s106 108 196 58M212 219C267 263 309 269 373 269M607 219C553 263 511 269 447 269M212 365C264 320 309 307 373 307M607 365C551 321 512 307 447 307" /><circle className="pp-atlas-centre" cx="410" cy="288" r="89" /><circle className="pp-atlas-centre-inner" cx="410" cy="288" r="67" /><text x="410" y="280" textAnchor="middle" className="pp-atlas-centre-title">make ideas</text><text x="410" y="307" textAnchor="middle" className="pp-atlas-centre-title">visible</text><text x="410" y="333" textAnchor="middle" className="pp-atlas-centre-sub">then trace the claim</text>{nodes.map((node) => { const count = RECORDS.filter((record) => record.kind === node.kind).length; return <g key={node.kind}><rect x={node.x - node.w / 2} y={node.y - node.h / 2} width={node.w} height={node.h} className={`pp-atlas-node pp-node-${node.kind}`} /><text x={node.x} y={node.y - 11} textAnchor="middle" className="pp-atlas-node-title">{KIND[node.kind].nav.toUpperCase()}</text><text x={node.x} y={node.y + 16} textAnchor="middle" className="pp-atlas-node-sub">{dialect[node.kind].label.replace("A ", "")} · {count} records</text></g>; })}</svg><figcaption><Mark glyph="✦" /> The page is an index into different kinds of knowledge, not a collection of interchangeable cards.</figcaption></figure>;
}

function AtlasHome() {
  const groups = getPresentationGroupsForDiscipline(RECORDS, "ob");
  const disciplineEntries = Object.values(DISCIPLINES).map((discipline) => ({ discipline, count: getDisciplineRecordCount(RECORDS, discipline.id), orientation: getDisciplineOrientation(discipline.id), records: RECORDS.filter((record) => record.discipline === discipline.id) })).filter((entry) => entry.count > 0);
  const starterIds = ["person-environment-fit", "auditory-scene-analysis", "tuned-out-or-dialed-in", "hpa-axis"];
  const starters = starterIds.map((id) => RECORDS.find((record) => record.id === id)).filter((record): record is AnyRecord => Boolean(record));

  return <div className="pp-page pp-atlas-page">
    <PreviewHeader active="atlas" canonicalHref="/concept-lab" />
    <main>
      <section className="pp-home-hero">
        <div className="pp-home-copy"><p className="pp-kicker">00 / a living atlas · isolated preview</p><h1>Academic<br /><em>Concept</em> Lab</h1><p className="pp-home-tagline">Theory, evidence and method — drawn out until you can actually see them.</p><p className="pp-home-deck">Academic work explained without being flattened. Every claim carries a mark saying where it came from — and where it does not, the page says so.</p><div className="pp-home-note"><span aria-hidden="true">↗</span><p>Read across disciplines.<br /><em>Keep the distinctions.</em></p></div></div>
        <AtlasMap />
        <div className="pp-home-index"><span>{RECORDS.length} records</span><span>4 disciplines</span><span>5 provenance marks</span></div>
      </section>

      <section className="pp-home-material"><div><span className="pp-material-label">The material of the atlas</span><strong>print carries the claim · pencil carries the question</strong></div><div className="pp-material-samples"><span><i className="pp-sample-ink" />typeset structure</span><span><i className="pp-sample-pencil" />editorial intervention</span><span><i className="pp-sample-pigment" />attention, not decoration</span></div></section>

      <section className="pp-atlas-section pp-light-band"><SectionRail number="01" label="where to begin" colour="blue" /><div className="pp-atlas-intro"><h2>Start with the<br /><em>question, not the card.</em></h2><p>The atlas groups records by what a reader may be trying to understand. The groupings help you enter; the record kind tells you what sort of knowledge you are actually reading.</p></div><div className="pp-atlas-groups">{groups.map((group, index) => <article className="pp-atlas-group" key={group.id}><div className="pp-group-top"><span>0{index + 1}</span><PaperRule colour={index % 2 ? "var(--pp-red)" : "var(--pp-blue)"} /></div><h3>{group.label}</h3><p>{group.description}</p><div className="pp-group-records">{group.records.map((record) => <RecordLink key={record.id} record={record} />)}</div></article>)}</div></section>

      <section className="pp-atlas-section pp-disciplines"><SectionRail number="02" label="four fields, one grammar" colour="teal" /><div className="pp-atlas-intro"><h2>Different terrain.<br /><em>Same curiosity.</em></h2><p>The records travel across fields without pretending that each field asks the same question. The discipline orientation is a doorway, not a replacement for the sources.</p></div><div className="pp-discipline-ledger">{disciplineEntries.map(({ discipline, count, orientation, records }) => <article key={discipline.id}><div className="pp-discipline-heading"><span>{String(count).padStart(2, "0")}</span><h3>{discipline.name}</h3></div><p>{orientation?.summary}</p><div className="pp-topic-line">{orientation?.themes.map((theme) => <span key={theme}>{theme}</span>)}</div><div className="pp-discipline-records">{records.map((record) => <Link href={recordHref(record)} key={record.id}>{record.title}</Link>)}</div></article>)}</div></section>

      <section className="pp-atlas-section pp-ways pp-light-band"><SectionRail number="03" label="the record dialect" colour="yellow" /><div className="pp-atlas-intro"><h2>Four kinds of<br /><em>academic move.</em></h2><p>These are not interchangeable page skins. Each kind holds a different relationship to evidence, explanation, and uncertainty.</p></div><div className="pp-dialect-list">{(["theory", "study", "method", "mechanism"] as const).map((kind, index) => <div className={`pp-dialect-row pp-dialect-${kind}`} key={kind}><span className="pp-dialect-number">0{index + 1}</span><span className="pp-dialect-kind">{KIND[kind].label}</span><strong>{dialect[kind].label}</strong><p>{dialect[kind].body}</p><span className="pp-dialect-count">{RECORDS.filter((record) => record.kind === kind).length} in atlas</span></div>)}</div></section>

      <section className="pp-atlas-section pp-starters"><SectionRail number="04" label="a first walk" colour="red" /><div className="pp-atlas-intro"><h2>Four ways<br /><em>into the lab.</em></h2><p>These starter records open different parts of the collection. Follow the links when the question—not the subject label—is the thing you recognise.</p></div><div className="pp-starter-list">{starters.map((record, index) => <RecordLink record={record} key={record.id} className={`pp-starter-${index + 1}`} />)}</div></section>

      <section className="pp-atlas-section pp-provenance-section pp-light-band"><SectionRail number="05" label="how to read the marks" colour="violet" /><div className="pp-atlas-intro"><h2>Colour helps you move.<br /><em>It cannot prove a claim.</em></h2><p>The visual system keeps the source, the explanation, the teaching device, the editorial synthesis, and the unresolved edge distinct.</p></div><ProvenanceList items={[{ glyph: "●", colour: "var(--red)", label: "Source-grounded", note: "The claim is tied to a source or directly reported finding." }, { glyph: "■", colour: "var(--teal)", label: "Plain-language paraphrase", note: "The language has been compressed for teaching without becoming a quotation." }, { glyph: "▲", colour: "var(--gold-deep)", label: "Teaching analogy", note: "A visual or comparison makes the structure easier to handle; it is not evidence." }, { glyph: "✦", colour: "var(--plum-deep)", label: "Concept Lab synthesis", note: "The arrangement, connection, or question is an editorial move." }, { glyph: "?", colour: "var(--plum-deep)", label: "Contested / unresolved", note: "The evidence or interpretation has a boundary the page should leave visible." }]} /></section>
    </main>
    <footer className="pp-footer"><span>Academic Concept Lab · chromatic scholarly sketch · iteration 03</span><Link href="/concept-lab">Return to canonical atlas ↗</Link></footer>
  </div>;
}

function JdrPathways() {
  return <figure className="pp-jdr-path-figure"><Pigment tone="red" className="pp-jdr-wash-red" /><Pigment tone="blue" className="pp-jdr-wash-blue" /><svg viewBox="0 0 760 570" role="img" aria-labelledby="jdr-path-title jdr-path-desc"><title id="jdr-path-title">Job Demands–Resources two-process model</title><desc id="jdr-path-desc">Working conditions sort into demands and resources, which travel through a health-impairment process or a motivational process.</desc><path className="pp-jdr-path-line pp-jdr-path-red" d="M380 88C292 121 213 136 186 213s42 133-48 239" /><path className="pp-jdr-path-line pp-jdr-path-teal" d="M380 88C468 121 547 136 574 213s-42 133 48 239" /><path className="pp-jdr-arrow pp-jdr-arrow-red" d="M135 438l4 19 17-11" /><path className="pp-jdr-arrow pp-jdr-arrow-teal" d="M625 438l-4 19-17-11" /><rect x="278" y="32" width="204" height="72" className="pp-jdr-core-box" /><text x="380" y="62" textAnchor="middle" className="pp-jdr-core-title">WORKING</text><text x="380" y="86" textAnchor="middle" className="pp-jdr-core-title">CONDITIONS</text><circle cx="182" cy="213" r="42" className="pp-jdr-node-red" /><circle cx="578" cy="213" r="42" className="pp-jdr-node-teal" /><text x="182" y="208" textAnchor="middle" className="pp-jdr-node-title">job</text><text x="182" y="230" textAnchor="middle" className="pp-jdr-node-title">demands</text><text x="578" y="208" textAnchor="middle" className="pp-jdr-node-title">job</text><text x="578" y="230" textAnchor="middle" className="pp-jdr-node-title">resources</text><text x="105" y="520" className="pp-jdr-path-label pp-label-red">health impairment</text><text x="484" y="520" className="pp-jdr-path-label pp-label-teal">motivation</text></svg><div className="pp-jdr-road-labels">{(jdr.pathways ?? []).map((road) => <div key={road.title} className="pp-jdr-road" style={{ "--road": road.colour === "var(--red)" ? "var(--pp-red)" : "var(--pp-green)" } as CSSProperties}><div className="pp-road-heading"><span aria-hidden="true">{road.title.includes("health") ? "!" : "✦"}</span><h3>{road.title}</h3></div><p>{road.blurb}</p><ol>{road.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>)}</div><figcaption><Mark glyph="▲" /> The roads are a teaching arrangement. The line weight is not an effect size, and the paths do not make a personal prediction.</figcaption></figure>;
}

function JdrCategoryPlates() {
  return <div className="pp-jdr-category-plates">{jdr.categories?.map((category, index) => <article className="pp-jdr-category" key={category.title} style={{ "--accent": category.colour === "var(--red)" ? "var(--pp-red)" : "var(--pp-green)" } as CSSProperties}><span className="pp-category-number">0{index + 1}</span><h3>{category.title}</h3><p>{category.definition}</p><div className="pp-example-line"><b>examples</b>{category.examples.map((example) => <span key={example}>{example}</span>)}</div></article>)}</div>;
}

function JdrDemandTypes() {
  return <div className="pp-demand-types">{jdr.demandTypes?.map((type, index) => <article key={type.title} className="pp-demand-type" style={{ "--accent": type.colour === "var(--red)" ? "var(--pp-red)" : "var(--pp-green)" } as CSSProperties}><div className="pp-demand-type-head"><span>0{index + 1}</span><h3>{type.title}</h3></div><p>{type.definition}</p><div className="pp-demand-examples">{type.examples.map((example) => <span key={example}>{example}</span>)}</div><p className="pp-demand-relates"><b>relates to</b> <HtmlText html={type.relates} as="span" /></p></article>)}</div>;
}

function JdrTimeline() {
  return <div className="pp-jdr-timeline">{jdr.origins?.map((origin) => <article key={origin.year}><span className="pp-timeline-year">{origin.year}</span><div><h3>{origin.author}</h3><HtmlText html={origin.work} className="pp-timeline-work" /><p>{origin.contribution}</p></div></article>)}</div>;
}

function JobDemandsResources() {
  const related = (jdr.relatedTo ?? []).slice(0, 3).map((relation) => ({ relation, record: RECORDS.find((record) => record.id === relation.recordId) })).filter((entry): entry is { relation: NonNullable<typeof jdr.relatedTo>[number]; record: AnyRecord } => Boolean(entry.record));
  return <div className="pp-page pp-jdr-page">
    <PreviewHeader active="jdr" canonicalHref={recordHref(jdr)} />
    <main>
      <section className="pp-jdr-hero"><div className="pp-jdr-copy"><p className="pp-kicker">Organizational behaviour · theory record</p><h1>Job Demands–<br /><em>Resources</em><br />Theory</h1><p className="pp-hook">{jdr.hook}</p><p className="pp-deck">{jdr.oneSentence}</p><div className="pp-jdr-annotation"><span aria-hidden="true">↗</span><p>The same person<br /><em>can be exhausted and engaged.</em></p></div></div><JdrPathways /><div className="pp-page-index"><span>01</span><span>two categories</span><span>two processes</span></div></section>

      <section className="pp-jdr-material"><div><span>Material key</span><strong>red traces cost · green traces support</strong></div><div className="pp-jdr-material-samples"><span><i className="pp-swatch-red" />health impairment</span><span><i className="pp-swatch-green" />motivation</span><span><i className="pp-swatch-yellow" />challenge / correction</span></div><p><Mark glyph="●" /> Five markers, 2001 → 2023. A burnout model widened into a general theory of working conditions.</p></section>

      <section className="pp-jdr-section pp-light-band"><SectionRail number="02" label="the classification" colour="red" /><div className="pp-jdr-intro"><h2>Two categories.<br /><em>Not a fixed list.</em></h2><p>{jdr.categoriesLede}</p><p className="pp-note-line"><Mark glyph="■" /> {jdr.categoriesNote}</p></div><JdrCategoryPlates /></section>

      <section className="pp-jdr-section pp-pathway-section"><SectionRail number="03" label="the two processes" colour="teal" /><div className="pp-jdr-intro"><h2>Parallel roads.<br /><em>Not opposite ends.</em></h2><p>{jdr.pathwaysLede}</p><p className="pp-caution-line"><Mark glyph="?" /> {jdr.pathwaysCaution}</p></div><div className="pp-pathway-summary"><div className="pp-summary-red"><b>demands</b><span>effort · recovery · cost</span></div><div className="pp-summary-arrow">↔</div><div className="pp-summary-green"><b>resources</b><span>growth · support · motivation</span></div></div></section>

      <section className="pp-jdr-section pp-light-band"><SectionRail number="04" label="the important correction" colour="yellow" /><div className="pp-jdr-intro"><h2>Demanding<br /><em>is not the same as bad.</em></h2><p>{jdr.demandTypesLede}</p><p className="pp-note-line"><Mark glyph="■" /> {jdr.demandTypesNote}</p></div><JdrDemandTypes /></section>

      <section className="pp-jdr-section pp-interaction-section"><SectionRail number="05" label="where the paths meet" colour="blue" /><div className="pp-jdr-intro"><h2>Resources change<br /><em>what demands do.</em></h2><p>{jdr.interactionsLede}</p></div><div className="pp-interaction-ledger">{jdr.interactions?.map((interaction, index) => <article key={interaction.title}><span className="pp-interaction-index">0{index + 1}</span><span className="pp-interaction-kicker">{interaction.kicker}</span><h3>{interaction.title}</h3><p><HtmlText html={interaction.body} as="span" /></p><PaperRule colour={index ? "var(--pp-red)" : "var(--pp-blue)"} /></article>)}</div></section>

      <section className="pp-jdr-section pp-light-band"><SectionRail number="06" label="a theory that widened" colour="violet" /><div className="pp-jdr-intro"><h2>From burnout model<br /><em>to working conditions.</em></h2><p>{jdr.trailLede}</p></div><JdrTimeline /></section>

      <section className="pp-jdr-section pp-quiet-section"><SectionRail number="07" label="keep the lens honest" colour="red" /><div className="pp-jdr-intro"><h2>Useful flexibility<br /><em>has a cost.</em></h2><p>{jdr.expansionsLede}</p></div><div className="pp-qualification-grid"><div><h3>What the later theory adds</h3>{jdr.expansions?.map((item) => <div className="pp-qualification-row" key={item.title}><span style={{ color: item.colour === "var(--red)" ? "var(--pp-red)" : "var(--pp-green)" }}>✦</span><div><strong>{item.title}</strong><p>{item.body}</p></div></div>)}</div><div><h3>Where to stay cautious</h3>{jdr.qualifications?.map((qualification, index) => <div className="pp-caution-row" key={qualification}><span>0{index + 1}</span><p>{qualification}</p></div>)}</div></div></section>

      <section className="pp-jdr-section pp-evidence-section pp-light-band"><SectionRail number="08" label="scholarly apparatus" colour="teal" /><div className="pp-jdr-intro"><h2>Follow the arc<br /><em>back to sources.</em></h2><p>{jdr.originsNote}</p></div><div className="pp-evidence-headline"><Mark glyph="●" /><span>minimum reading · {jdr.minimumReading?.length} sources</span></div><SourceList sources={jdr.minimumReading ?? []} /></section>

      <section className="pp-jdr-section pp-provenance-section"><SectionRail number="09" label="provenance" colour="violet" /><div className="pp-jdr-intro"><h2>Every colour<br /><em>has a job.</em></h2><p>JD–R’s terms are source-grounded; the two-road diagram is an editorial teaching arrangement; the edge cases stay visible.</p></div><ProvenanceList items={jdr.provenance} /><div className="pp-related-block"><h3>In conversation with</h3><div>{related.map(({ relation, record }) => <Link href={recordHref(record)} key={record.id}><span>{relation.relation}</span><strong>{record.title}</strong><i>↗</i></Link>)}</div></div></section>
    </main>
    <footer className="pp-footer"><span>Job Demands–Resources Theory · isolated visual mirror</span><Link href={recordHref(jdr)}>View canonical record ↗</Link></footer>
  </div>;
}

function GroupingField() {
  return <figure className="pp-gestalt-field"><PigmentField tone="blue" className="pp-pigment pp-gestalt-contour" /><PigmentField tone="yellow" className="pp-pigment pp-gestalt-ring" /><svg viewBox="0 0 760 560" role="img" aria-labelledby="gestalt-field-title gestalt-field-desc"><title id="gestalt-field-title">A perceptual field from events to groups</title><desc id="gestalt-field-desc">Individual sound events sit in related clusters with visible candidate boundaries; the group is an interpretation of the relationships.</desc><path className="pp-field-line pp-field-blue" d="M76 152c100-82 208-80 305 0s186 79 304 3" /><path className="pp-field-line pp-field-red" d="M76 367c96 74 202 80 305 0s197-76 304 0" /><path className="pp-field-boundary" d="M378 82v397" /><g className="pp-field-cluster pp-cluster-left">{[0, 1, 2, 3].map((index) => <circle key={index} cx={120 + index * 50} cy={192 + (index % 2) * 28} r="13" />)}</g><g className="pp-field-cluster pp-cluster-right">{[0, 1, 2, 3].map((index) => <circle key={index} cx={464 + index * 50} cy={192 + (index % 2) * 28} r="13" />)}</g><g className="pp-field-cluster pp-cluster-low">{[0, 1, 2, 3].map((index) => <circle key={index} cx={120 + index * 50} cy={370 - (index % 2) * 22} r="13" />)}</g><text x="380" y="48" textAnchor="middle" className="pp-field-caption">same events · another organisation</text><text x="380" y="535" textAnchor="middle" className="pp-field-caption pp-field-caption-red">the boundary is experienced, not simply printed</text><text x="89" y="130" className="pp-field-label">events</text><text x="566" y="130" className="pp-field-label">groups</text><text x="395" y="112" className="pp-field-label pp-field-boundary-label">candidate boundary</text></svg><figcaption><Mark glyph="✦" /> A Concept Lab synthesis: the field makes the relational claim visible without turning it into a deterministic law.</figcaption></figure>;
}

function WholePartFigure({ cases }: { cases: GestaltWholeCase[] }) {
  return <div className="pp-whole-cases">{cases.map((item) => <article key={item.label} style={{ "--accent": item.colour === "var(--red)" ? "var(--pp-red)" : "var(--pp-green)" } as CSSProperties}><div className="pp-whole-head"><span>{item.label}</span><PaperRule colour={item.colour === "var(--red)" ? "var(--pp-red)" : "var(--pp-green)"} /></div><div className="pp-note-sequence"><span>{item.before}</span><b>{item.central}</b><span>{item.after}</span></div><p>{item.role}</p></article>)}</div>;
}

function AudioBoundaryInteraction() {
  const [selected, setSelected] = useState(0);
  const preset = gestaltContent.opening.presets[selected];
  return <div className="pp-audio-study"><div className="pp-audio-study-copy"><span className="pp-study-number">01</span><h3>Move the gap.<br /><em>Watch the group move.</em></h3><p>{gestaltContent.opening.lede}</p><div className="pp-audio-tabs" role="group" aria-label="Boundary positions">{gestaltContent.opening.presets.map((option, index) => <button type="button" key={option.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{option.label}</button>)}</div></div><div className="pp-audio-visual"><svg viewBox="0 0 680 240" role="img" aria-live="polite" aria-label={`${preset.label}. The larger temporal gap is after event ${preset.markers?.[0]?.after ?? "four"}.`}><line x1="36" x2="646" y1="126" y2="126" className="pp-audio-axis" />{preset.events.map((event, index) => { const x = 54 + event.start * 278; const y = 126 - ((event.pitch - 60) * 3.2); return <g key={`${event.pitch}-${event.start}`}><circle cx={x} cy={y} r="11" className="pp-audio-note" /><text x={x} y="176" textAnchor="middle" className="pp-audio-note-label">{index + 1}</text>{index < preset.events.length - 1 && <line x1={x + 13} x2={54 + preset.events[index + 1].start * 278 - 13} y1={126} y2={126 - ((preset.events[index + 1].pitch - 60) * 3.2)} className="pp-audio-connector" />}</g>; })}<line x1={54 + (preset.markers?.[0]?.after === 4 ? 0.96 : 1.2) * 278} x2={54 + (preset.markers?.[0]?.after === 4 ? 0.96 : 1.2) * 278} y1="40" y2="195" className="pp-audio-boundary" /><text x={54 + (preset.markers?.[0]?.after === 4 ? 0.96 : 1.2) * 278} y="25" textAnchor="middle" className="pp-audio-boundary-label">boundary</text></svg><p className="pp-audio-result"><Mark glyph="▲" /> {preset.body}</p><p className="pp-audio-note"><Mark glyph="?" /> {gestaltContent.opening.note}</p></div></div>;
}

function ConflictInteraction() {
  const [selected, setSelected] = useState(2);
  const preset = gestaltContent.conflict.presets[selected];
  return <div className="pp-conflict-study"><div className="pp-conflict-copy"><span className="pp-study-number pp-study-number-red">02</span><h3>When cues<br /><em>disagree.</em></h3><p>{gestaltContent.conflict.lede}</p><div className="pp-audio-tabs" role="group" aria-label="Cue conflict conditions">{gestaltContent.conflict.presets.map((option, index) => <button type="button" key={option.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{option.label}</button>)}</div></div><div className="pp-conflict-visual"><svg viewBox="0 0 680 250" role="img" aria-live="polite" aria-label={`${preset.label}. ${preset.variable}.`}><line x1="40" x2="640" y1="148" y2="148" className="pp-audio-axis" />{preset.events.map((event, index) => { const x = 62 + event.start * 278; const y = 148 - ((event.pitch - 60) * 3.1); return <g key={`${event.pitch}-${event.start}`}><circle cx={x} cy={y} r="11" className="pp-conflict-note" /><text x={x} y="192" textAnchor="middle" className="pp-audio-note-label">{index + 1}</text></g>; })}<path className="pp-conflict-cue pp-conflict-time" d="M174 72c59-22 105-22 157 0" /><path className="pp-conflict-cue pp-conflict-register" d="M398 73c43 20 89 20 145 0" /><text x="246" y="52" textAnchor="middle" className="pp-cue-label pp-cue-time">time / proximity</text><text x="516" y="52" textAnchor="middle" className="pp-cue-label pp-cue-register">register / similarity</text></svg><p className="pp-conflict-result"><Mark glyph="▲" /> {preset.body}</p><p className="pp-audio-note"><Mark glyph="?" /> {gestaltContent.conflict.note}</p></div></div>;
}

function EvidenceLedger({ items }: { items: EvidenceXray[] }) {
  return <div className="pp-gestalt-evidence">{items.map((item) => <article key={item.title}><div className="pp-evidence-title"><span>{item.label}</span><h3>{item.title}</h3>{item.doi && <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noreferrer">doi ↗</a>}</div><HtmlText html={item.citation} className="pp-evidence-citation" /><div className="pp-evidence-columns"><div><h4>Design</h4><p>{item.design}</p></div><div><h4>{item.testedLabel}</h4><p>{item.tested}</p></div><div className="pp-evidence-found"><h4>{item.foundLabel}</h4><p>{item.found}</p></div><div className="pp-evidence-caution"><h4>Not tested</h4><p>{item.notTested}</p></div></div></article>)}</div>;
}

function GestaltPage() {
  const related = (gestalt.relatedTo ?? []).map((relation) => ({ relation, record: RECORDS.find((record) => record.id === relation.recordId) })).filter((entry): entry is { relation: NonNullable<typeof gestalt.relatedTo>[number]; record: AnyRecord } => Boolean(entry.record));
  return <div className="pp-page pp-gestalt-page">
    <PreviewHeader active="gestalt" canonicalHref={recordHref(gestalt)} />
    <main>
      <section className="pp-gestalt-hero"><div className="pp-gestalt-copy"><p className="pp-kicker">Psychology of music · perceptual tradition</p><h1>Gestalt<br /><em>Principles</em><br />in Music</h1><p className="pp-hook">{gestalt.hook}</p><p className="pp-deck">{gestalt.oneSentence}</p><div className="pp-gestalt-annotation"><span aria-hidden="true">↗</span><p>A phrase is not<br /><em>a pile of events.</em></p></div></div><GroupingField /><div className="pp-page-index"><span>01</span><span>events → groups</span><span>cues compete</span></div></section>

      <section className="pp-gestalt-material"><div><span>Material key</span><strong>blue groups · red boundaries · yellow questions</strong></div><div className="pp-gestalt-material-samples"><span><i className="pp-swatch-blue" />perceptual organisation</span><span><i className="pp-swatch-red" />candidate boundary</span><span><i className="pp-swatch-yellow" />historical bridge</span></div><p><Mark glyph="●" /> The visual language borrows the surface of a sketchbook while keeping the source trail underneath.</p></section>

      <section className="pp-gestalt-section pp-light-band"><SectionRail number="02" label="the problem" colour="blue" /><div className="pp-gestalt-intro"><h2>From sensory events<br /><em>to perceptual organisation.</em></h2><p>{gestaltContent.problem.lede}</p></div><div className="pp-gestalt-card-rows">{gestaltContent.problem.cards.map((card) => <article key={card.label} style={{ "--accent": card.colour === "var(--red)" ? "var(--pp-red)" : card.colour === "var(--gold-deep)" ? "var(--pp-yellow)" : "var(--pp-blue)" } as CSSProperties}><span className="pp-card-dot" /><h3>{card.label}</h3><p>{card.body}</p></article>)}</div><p className="pp-section-note"><Mark glyph="■" /> {gestaltContent.problem.note}</p></section>

      <section className="pp-gestalt-section pp-whole-section"><SectionRail number="03" label="the whole and the part" colour="red" /><div className="pp-gestalt-intro"><h2>The same event.<br /><em>Another role.</em></h2><p>{gestaltContent.whole.lede}</p></div><WholePartFigure cases={gestaltContent.whole.cases} /><p className="pp-section-note"><Mark glyph="▲" /> {gestaltContent.whole.note}</p></section>

      <section className="pp-gestalt-section pp-light-band"><SectionRail number="04" label="a small experiment" colour="teal" /><div className="pp-gestalt-intro"><h2>Move one gap.<br /><em>Change the grouping.</em></h2><p>{gestaltContent.proximity.lede}</p></div><AudioBoundaryInteraction /></section>

      <section className="pp-gestalt-section pp-conflict-section"><SectionRail number="05" label="when cues compete" colour="yellow" /><div className="pp-gestalt-intro"><h2>No cue is<br /><em>the whole story.</em></h2><p>{gestaltContent.conflict.lede}</p></div><ConflictInteraction /></section>

      <section className="pp-gestalt-section pp-light-band"><SectionRail number="06" label="keep the neighbours distinct" colour="violet" /><div className="pp-gestalt-intro"><h2>Grouping is not<br /><em>every music theory.</em></h2><p>{gestaltContent.scope.lede}</p></div><div className="pp-scope-grid"><div><h3>It can explain</h3><ul>{gestaltContent.scope.explains.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul></div><div><h3>It stops before</h3><ul>{gestaltContent.scope.stops.map((item) => <li key={item}><span>—</span>{item}</li>)}</ul></div></div><p className="pp-section-note"><Mark glyph="?" /> {gestaltContent.scope.note}</p></section>

      <section className="pp-gestalt-section pp-evidence-section"><SectionRail number="07" label="later tests, narrower claims" colour="red" /><div className="pp-gestalt-intro"><h2>Compatible with<br /><em>is not proved by.</em></h2><p>{gestaltContent.deliege.lede} {gestaltContent.frankland.lede}</p></div><EvidenceLedger items={[gestaltContent.deliege.evidence, gestaltContent.frankland.evidence]} /><p className="pp-section-note"><Mark glyph="■" /> {gestaltContent.deliege.note} {gestaltContent.frankland.note}</p></section>

      <section className="pp-gestalt-section pp-light-band"><SectionRail number="08" label="the evidence trail" colour="blue" /><div className="pp-gestalt-intro"><h2>A branching history,<br /><em>not a law book.</em></h2><p>{gestalt.trailLede}</p></div><div className="pp-gestalt-lineage">{gestalt.origins?.map((origin, index) => <article key={`${origin.year}-${origin.author}`}><span>{origin.year}</span><div><h3>{origin.author}</h3><strong>{origin.work}</strong><p>{origin.contribution}</p></div>{index < (gestalt.origins?.length ?? 0) - 1 && <i aria-hidden="true">↓</i>}</article>)}</div></section>

      <section className="pp-gestalt-section pp-provenance-section"><SectionRail number="09" label="provenance" colour="violet" /><div className="pp-gestalt-intro"><h2>What the marks<br /><em>are doing here.</em></h2><p>The constructed audio and visual diagrams are labelled as teaching or synthesis. The historical and empirical boundaries remain part of the design.</p></div><ProvenanceList items={gestalt.provenance} /><div className="pp-related-block"><h3>In conversation with</h3><div>{related.map(({ relation, record }) => <Link href={recordHref(record)} key={record.id}><span>{relation.relation}</span><strong>{record.title}</strong><i>↗</i></Link>)}</div></div></section>

      <section className="pp-gestalt-section pp-light-band pp-sources-section"><SectionRail number="10" label="minimum reading" colour="yellow" /><div className="pp-gestalt-intro"><h2>Leave with<br /><em>better boundaries.</em></h2><p>{gestalt.minimumReadingLabel}</p></div><SourceList sources={gestalt.minimumReading ?? []} /></section>
    </main>
    <footer className="pp-footer"><span>Gestalt Principles in Music · isolated visual mirror</span><Link href={recordHref(gestalt)}>View canonical record ↗</Link></footer>
  </div>;
}

export { AtlasHome, JobDemandsResources, GestaltPage };
