import Link from "next/link";

const pages = [
  { href: "/chromatic-editorial/preview/home", number: "01", label: "Atlas entryway", title: "Academic Concept Lab", note: "A question-led home surface that explains the ontology before asking the reader to browse." },
  { href: "/chromatic-editorial/preview/job-demands-resources", number: "02", label: "Systems / work", title: "Job Demands–Resources Theory", note: "A two-process page where the parallel pathways, functional categories, and 2010 correction become the composition." },
  { href: "/chromatic-editorial/preview/gestalt-principles-in-music", number: "03", label: "Perception / music", title: "Gestalt Principles in Music", note: "A spatial page about grouping, boundaries, whole–part relations, and cues that can compete." },
];

export default function PreviewIndex() {
  return (
    <div className="pp-page pp-index-page">
      <header className="pp-header">
        <Link className="pp-brand" href="/concept-lab"><span className="pp-brand-mark" aria-hidden="true">✦</span><span>Academic Concept Lab</span></Link>
        <span className="pp-header-note">isolated visual preview · production untouched</span>
        <Link className="pp-canonical" href="/concept-lab">Open canonical atlas</Link>
      </header>

      <main>
        <section className="pp-index-hero">
          <div>
            <p className="pp-kicker">A new visual grammar · review set</p>
            <h1>Three pages,<br /><em>drawn differently.</em></h1>
            <p className="pp-index-deck">The same scholarly material, given enough room to show its shape: atlas, system, and perceptual field.</p>
          </div>
          <div className="pp-index-note"><span aria-hidden="true">↗</span><p>Read the print.<br /><em>Follow the pencil.</em></p></div>
        </section>

        <section className="pp-index-list" aria-label="Preview pages">
          {pages.map((page) => (
            <Link className="pp-index-row" href={page.href} key={page.href}>
              <span className="pp-index-number">{page.number}</span>
              <span className="pp-index-label">{page.label}</span>
              <span className="pp-index-title">{page.title}</span>
              <span className="pp-index-note">{page.note}</span>
              <span className="pp-index-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </section>

        <div className="pp-index-footer"><span>Chromatic scholarly sketch · iteration 03</span><span>Use the top navigation on each page to move between mirrors.</span></div>
      </main>
    </div>
  );
}
