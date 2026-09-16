import type { Metadata } from "next";
import { tonalHierarchy } from "@/content/tonal-hierarchy";
import { TonalEncounter } from "../_components/TonalEncounter";
import { Contents } from "../_components/Contents";
import { Evidence, Scope, Sources, ProvenanceRegister, Relations } from "../_components/Apparatus";
import { Rich, Note, SectionLead } from "../_components/Type";
import { Intervention } from "../_components/Pigment";

export const metadata: Metadata = { title: "Tonal Hierarchy · B2 prototype" };
const t = tonalHierarchy.tonal!;
const contents = [{ id: "encounter", title: "One note, four contexts" }, { id: "measurement", title: "Judgment → interpretation" }, { id: "evidence", title: "Evidence" }, { id: "scope", title: "Scope" }, { id: "sources", title: "Sources & provenance" }];

export default function TonalPage() {
  return <main id="b2-main" className="b2-main b2-tonal-page">
    <header className="b2-title-block"><p className="b2-eyebrow">Theory / Framework · Music psychology</p><h1>Tonal<br /><em>Hierarchy</em></h1><div className="b2-title-aside"><p>A note stays the same.<br />Its place in the music changes.</p><Intervention tone="cobalt">Where is home?</Intervention></div><p className="b2-intro">Tonal function belongs to a pitch <em>in context</em>. A physical note can stay identical while the surrounding music gives it another role.</p></header>
    <Contents items={contents} />
    <section id="encounter" className="b2-section"><SectionLead n="01" title="Keep the note. Change its context."><p>{t.sameNote.lede}</p></SectionLead><TonalEncounter contexts={t.sameNote.contexts} /></section>
    <section id="measurement" className="b2-section b2-measurement"><SectionLead n="02" title="Three different kinds of knowledge."><p>{t.measurement.lede}</p></SectionLead>
      <div className="b2-measurement-movement">{t.measurement.cards.slice(0, 3).map((item, i) => <article key={item.label}><span className="b2-large-number">{i + 1}</span><div><span className="b2-eyebrow">{["What is observed", "What is assembled", "What is inferred"][i]}</span><h3>{["Judgment", "Profile", "Interpretation"][i]}</h3><p><Rich text={item.body} /></p></div></article>)}</div>
      <Note glyph="■">Faithful explanation of the measurement logic. A fit judgment is not liking; a profile is not itself a psychological construct.</Note>
      <div className="b2-reading-pair"><div><h3>A qualitative hierarchy</h3><p>Within the C-major teaching context, distinguish the tonic, other tonic-triad members, other diatonic tones and nondiatonic tones. These are contextual functions, not four exact numerical scores.</p><dl className="b2-tonal-categories"><div><dt>Tonic</dt><dd>C</dd></div><div><dt>Other tonic-triad members</dt><dd>E · G</dd></div><div><dt>Other diatonic tones</dt><dd>D · F · A · B</dd></div><div><dt>Nondiatonic tones</dt><dd>C♯ · D♯ · F♯ · G♯ · A♯</dd></div></dl><Note>Editorial grouping of the canonical qualitative categories. No exact profile values are shown.</Note></div><div><h3>A profile leaves a process question.</h3><p>{t.process.lede}</p><p>{t.process.cards[1].body}</p><Intervention tone="vermilion">description ≠ mechanism</Intervention><Note glyph="?">{t.process.note.replace(/^\?\s*/, "")}</Note></div></div>
      <div className="b2-continuous-reading"><h3>Neighbourhoods, not a map of the brain.</h3><p>{t.keySpace.lede}</p><p>{t.keySpace.note.replace(/^[●■▲✦? /]+/, "")}</p><h3>Context can keep changing.</h3><p>{t.dynamics.lede}</p><p>{t.culture.lede}</p><Note glyph="?">Psychological key space is not literal neural space. Western major/minor organisation is not a universal default, and a changing interpretation does not supply a complete key-finding algorithm.</Note></div>
    </section>
    <section id="evidence" className="b2-section b2-quiet"><SectionLead n="03" title="What the evidence actually carries."><p>A task, a response and an inference belong together. Each source below supports a bounded contribution to the framework.</p></SectionLead><Evidence items={tonalHierarchy.evidenceXrays!.filter((_, i) => [0, 2, 5].includes(i))} /><Note glyph="■">Selected canonical evidence summaries. The critical review is a boundary on inference; it is not another participant experiment.</Note></section>
    <section id="scope" className="b2-section b2-quiet"><SectionLead n="04" title="A useful framework has edges."><p>{t.scope.lede}</p></SectionLead><Scope explains={t.scope.explains} stops={t.scope.stops} qualifications={tonalHierarchy.qualifications!} /></section>
    <section id="sources" className="b2-section b2-quiet"><SectionLead n="05" title="Follow the claim back."><p>Every source has a job. Every editorial intervention has an author.</p></SectionLead><Sources minimum={tonalHierarchy.minimumReading!} full={tonalHierarchy.fullSources!} /><ProvenanceRegister items={tonalHierarchy.provenance} local="This B2 arrangement uses a fixed-probe context comparison and a typeset qualitative hierarchy. Colour differentiates local contexts; it does not encode fit magnitude or evidence strength. No learner ratings or neural measurements are collected." /><Relations items={tonalHierarchy.relatedTo!} /></section>
  </main>;
}
