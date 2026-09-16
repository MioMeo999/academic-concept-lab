import Link from "next/link";
import { DISCIPLINES } from "@/content/disciplines";
import { getDisciplineOrientation, getDisciplineRecordCount } from "@/content/atlas";
import { KIND, RECORDS, recordHref } from "@/content/records";
import type { AnyRecord, RecordKind } from "@/content/types";
import { AtlasSketch, DisciplineSketch, KindSketch, ProvenanceMarks, ShelfSketch } from "./layout";

const KIND_ORDER: RecordKind[] = ["theory", "mechanism", "method", "study"];
const START_HERE = ["person-environment-fit", "ipa", "tuned-out-or-dialed-in", "hpa-axis"];
const kindText: Record<RecordKind, { title: string; line: string; body: string }> = {
  theory: { title: "Theory", line: "A lens for understanding.", body: "Frameworks for explaining how and why things happen, organising observations into bigger pictures." },
  mechanism: { title: "Mechanism", line: "A pathway between things.", body: "Processes and causal pathways that connect one thing to another." },
  method: { title: "Method", line: "A practice for investigation.", body: "Tools and practices used to generate, analyse, and interpret evidence about the world." },
  study: { title: "Study", line: "An argument from evidence.", body: "Empirical findings, testing theories, examining mechanisms, or applying methods to real-world questions." },
};

function Note({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "red" | "yellow" | "teal" }) { return <span className={`home-note note-${tone}`}>{children}</span>; }

function MiniRecord({ record, number }: { record: AnyRecord; number: string }) {
  const kind = KIND[record.kind];
  return <article className={`mini-record mini-${record.kind}`}>
    <div className="mini-record-head"><span className="mini-number">{number}</span><span className="mini-kind">{kind.label}</span></div>
    <h3><Link href={recordHref(record)}>{record.title}</Link></h3>
    <p>{record.hook}</p>
    <Link className="mini-go" href={recordHref(record)}>Explore <span aria-hidden="true">→</span></Link>
  </article>;
}

export default function HomeTargetPage() {
  const counts = Object.fromEntries(KIND_ORDER.map((kind) => [kind, RECORDS.filter((record) => record.kind === kind).length])) as Record<RecordKind, number>;
  const disciplineEntries = Object.values(DISCIPLINES).map((discipline) => ({ discipline, count: getDisciplineRecordCount(RECORDS, discipline.id), orientation: getDisciplineOrientation(discipline.id) })).filter((entry) => entry.count > 0);
  const major = ["ob", "music-psych"].map((id) => disciplineEntries.find((entry) => entry.discipline.id === id)).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const secondary = disciplineEntries.filter((entry) => !major.some((item) => item.discipline.id === entry.discipline.id));
  const starters = START_HERE.map((id) => RECORDS.find((record) => record.id === id)).filter((record): record is AnyRecord => Boolean(record));

  return <div className="home-target-page">
    <section className="home-hero home-frame">
      <div className="hero-copy">
        <span className="home-kicker">a living atlas of theories, evidence, methods and people</span>
        <h1>Academic<br /><i>Concept Lab</i></h1>
        <p className="hero-subhead">Theory, evidence and method — <span className="ink-underline underline-blue">drawn out</span> until you can actually <span className="ink-underline underline-yellow">see them</span>.</p>
        <p className="hero-body">We explore key concepts across disciplines, showing how they connect, how they are supported by evidence, and who has developed them. Academic work, made visible without being flattened.</p>
        <div className="hero-stats" role="group" aria-label="Atlas contents"><span><b>{RECORDS.length}</b><small>records</small></span><span><b>{KIND_ORDER.length}</b><small>kinds</small></span><span><b>{disciplineEntries.length}</b><small>disciplines</small></span></div>
        <Link className="hero-cta" href="/concept-lab/library">Enter the atlas <span aria-hidden="true">→</span></Link>
        <Note tone="blue">A clearer way<br />to explore<br />academic ideas.</Note>
      </div>
      <div className="hero-art"><AtlasSketch /><Note tone="red">See connections.<br />Find new questions.</Note><Note tone="yellow">Different theories.<br />A richer picture.</Note></div>
    </section>

    <section className="home-frame home-ways" aria-label="Ways to explore">
      <div className="section-intro"><span className="home-kicker">small steps to bigger ideas</span><h2>Follow the <i>connections.</i></h2><p>Begin with a theory, a discipline, a method, or a piece of evidence. Each route opens into the same living atlas.</p></div>
      <div className="ways-grid"><Link href="/concept-lab/library?kind=theory"><span className="way-art circles-art" aria-hidden="true"><i/><i/><i/></span><b>Explore theories</b><small>From core ideas to detailed explanations.</small><span className="way-arrow">→</span></Link><Link href="#disciplines"><span className="way-art network-art" aria-hidden="true"><i/><i/><i/><i/></span><b>See the bigger picture</b><small>Discover unexpected connections across fields.</small><span className="way-arrow">→</span></Link><Link href="#provenance"><span className="way-art books-art" aria-hidden="true"><i/><i/><i/></span><b>Follow the evidence</b><small>See how claims are supported and developed.</small><span className="way-arrow">→</span></Link><Link href="#kinds"><span className="way-art squares-art" aria-hidden="true"><i/><i/><i/></span><b>Make new connections</b><small>Compare perspectives and find new ways of thinking.</small><span className="way-arrow">→</span></Link></div>
    </section>

    <section id="disciplines" className="home-frame disciplines-section">
      <div className="section-heading"><div><span className="home-kicker">explore by discipline</span><h2>Different fields.<br /><i>Shared questions.</i></h2></div><div className="heading-aside"><Note tone="blue">Disciplines are different lenses on shared human questions.</Note><p>Explore key concepts within each discipline, then see how they connect across fields.</p><Link href="/concept-lab/library">Browse all disciplines →</Link></div></div>
      <div className="discipline-feature-grid">{major.map(({ discipline, count, orientation }, index) => <article className="discipline-feature" key={discipline.id}><div className="discipline-copy"><span className="feature-number">0{index + 1}</span><h3>{discipline.name}</h3><strong>{count}+ <small>records</small></strong><p>{orientation?.summary}</p><div className="discipline-tags">{orientation?.themes.map((theme) => <span key={theme}>{theme}</span>)}</div><Link href={`/concept-lab/library?discipline=${discipline.id}`}>Explore {discipline.short} <span aria-hidden="true">→</span></Link></div><div className="discipline-art"><DisciplineSketch kind={discipline.id === "ob" ? "work" : "music"} /><Note tone={index === 0 ? "blue" : "red"}>{index === 0 ? "Work is a human system." : "Music is a way of thinking."}</Note></div></article>)}</div>
      <div className="secondary-row"><div><span className="home-kicker">more disciplines in the lab</span><p>Different fields. More connections.</p></div><div className="secondary-list">{secondary.map(({ discipline, count }) => <Link href={`/concept-lab/library?discipline=${discipline.id}`} key={discipline.id}><span className="secondary-orb" aria-hidden="true" /> <span><b>{discipline.name}</b><small>{count}+ records</small></span><span aria-hidden="true">→</span></Link>)}</div></div>
    </section>

    <section id="kinds" className="home-frame kinds-section"><div className="section-heading"><div><span className="home-kicker">different ways in</span><h2>Four kinds of record — <i>pick a way in.</i></h2><p className="heading-lede">The same ideas can be seen as theories, mechanisms, methods or studies. Explore through the form that makes most sense to you.</p></div><Note tone="red">Different forms.<br />Same curiosity.</Note></div><div className="kind-grid">{KIND_ORDER.map((kind) => <Link className={`kind-card kind-card-${kind}`} href={`/concept-lab/library?kind=${kind}`} key={kind}><KindSketch kind={kind} /><span className="kind-label">{String(counts[kind]).padStart(2, "0")} records</span><h3>{kindText[kind].title}</h3><em>{kindText[kind].line}</em><p>{kindText[kind].body}</p><span className="kind-link">Explore {KIND[kind].nav.toLowerCase()} <span aria-hidden="true">→</span></span></Link>)}</div></section>

    <section className="home-frame start-section"><div className="section-heading"><div><span className="home-kicker">a few places to begin</span><h2>Start <i>here.</i></h2><p className="heading-lede">Four hand-picked records to get you exploring.</p></div><Note tone="yellow">Different entry points.<br />A more connected picture.</Note></div><div className="start-grid">{starters.map((record, index) => <MiniRecord record={record} number={`0${index + 1}`} key={record.id} />)}</div></section>

    <section id="provenance" className="home-frame provenance-section"><div className="provenance-hero"><div><span className="home-kicker">trust, provenance and a more visible academic world</span><h2>Why you<br /><i>can check it.</i></h2><p className="provenance-subhead">Every claim in Academic Concept Lab carries a <span className="ink-underline underline-red">mark</span> showing where it came from.</p><p>Understanding grows when its sources are visible. Each statement is labelled with a clear provenance mark, so you can see how it is supported — and explore the evidence for yourself.</p></div><div className="shelf-wrap"><ShelfSketch /><Note tone="blue">Knowledge travels further<br />when we see where it comes from.</Note></div></div><div className="section-heading provenance-heading"><div><span className="home-kicker">five ways to read a claim</span><h2>The provenance marks.</h2></div><p>Different kinds of knowledge. A clearer picture.</p></div><ProvenanceMarks /><div className="provenance-bottom"><blockquote>“The strength of a theory is not just in what it says, but in how clearly it shows where it comes from.”<cite>— a more visible academic world</cite></blockquote><div><h3>How we cite</h3><p>Learn more about our provenance system, source conventions and editorial approach.</p><Link href="/concept-lab/about">Our approach →</Link></div><Link href="/concept-lab/library" className="provenance-cta">Enter the atlas <span aria-hidden="true">→</span></Link></div></section>
  </div>;
}
