import Link from "next/link";

const pages = [
  { href: "/chromatic-editorial/preview/second-pass/home", number: "01", label: "living atlas", title: "Academic Concept Lab", note: "Four knowledge forms mapped as an interacting intellectual architecture." },
  { href: "/chromatic-editorial/preview/second-pass/job-demands-resources", number: "02", label: "parallel processes", title: "Job Demands–Resources Theory", note: "The theory’s two roads become the page’s drawing, not an illustration placed beside it." },
  { href: "/chromatic-editorial/preview/second-pass/gestalt-principles-in-music", number: "03", label: "reorganising perception", title: "Gestalt Principles in Music", note: "The same events are shown inside several competing, incomplete organisations." },
];

export default function SecondPassIndex() {
  return <div className="sp-page sp-index-page">
    <header className="sp-header"><Link className="sp-brand" href="/concept-lab"><span className="sp-brand-mark" aria-hidden="true">✦</span>Academic Concept Lab</Link><span className="sp-header-note">second pass · controlled abundance</span><Link className="sp-header-link" href="/chromatic-editorial/preview">compare first pass ↗</Link></header>
    <main>
      <section className="sp-index-hero"><p className="sp-kicker">isolated visual exploration · iteration 04</p><h1>A richer<br /><em>thinking surface.</em></h1><p className="sp-index-deck">The structural sketch has been re-composed as a contemporary academic canvas: more material, more authored drawing, and more visible reasoning.</p><div className="sp-index-scribble"><span>01</span><p>draw the logic<br /><em>then edit the noise.</em></p></div></section>
      <section className="sp-index-list" aria-label="Second pass preview pages">{pages.map((page) => <Link className="sp-index-row" href={page.href} key={page.href}><span className="sp-index-number">{page.number}</span><span className="sp-index-label">{page.label}</span><strong>{page.title}</strong><p>{page.note}</p><i aria-hidden="true">↗</i></Link>)}</section>
      <section className="sp-index-principles"><span className="sp-index-principles-label">What changed</span><div><p><b>colour</b> behaves as pigment and grouping, not a border.</p><p><b>drawing</b> carries the conceptual relation, not just the annotation.</p><p><b>quiet sections</b> retain ledger, scope, source, and provenance discipline.</p></div></section>
    </main>
    <footer className="sp-footer"><span>Academic Concept Lab · pure-white contemporary academic canvas</span><Link href="/concept-lab">Canonical atlas ↗</Link></footer>
  </div>;
}
