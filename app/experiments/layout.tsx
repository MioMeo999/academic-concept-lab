import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource/patrick-hand/400.css";
import "./wide-margin.css";
import { WmNav } from "./_components/WmNav";

/* ---------------------------------------------------------------------------
   Isolated shell for the "Wide Margin" visual study.

   This route tree deliberately sits OUTSIDE /concept-lab. A nested layout
   cannot opt out of app/concept-lab/layout.tsx, and the whole point of the
   study is to see the page without the current header, footer and
   sketchnote.css around it. Nothing under /concept-lab imports anything from
   here, and wide-margin.css is scoped under `.wm`.
   ------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: { default: "Wide Margin — visual study", template: "%s · Wide Margin study" },
  robots: { index: false, follow: false },
};

export default function ExperimentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wm">
      <div className="wm-flag">
        <div className="wm-shell wm-flag-in">
          <span><b>Experiment</b> · Wide Margin visual study · not production</span>
          <a href="https://academic-concept-lab.vercel.app/concept-lab/theory/gestalt-principles-in-music">
            See the live record →
          </a>
        </div>
      </div>

      <header className="wm-top">
        <div className="wm-shell wm-top-in">
          <Link className="wm-brand" href="/experiments">
            <em>A</em> Academic Concept Lab
          </Link>
          <WmNav />
        </div>
      </header>

      <main className="wm-main">{children}</main>

      <footer className="wm-foot">
        <div className="wm-shell wm-foot-in">
          <div>
            <span className="wm-label">Wide Margin — experimental visual language</span>
            <p>
              A parallel visual study of Academic Concept Lab. The words, evidence, sources and teaching
              structure are the production record, unchanged; only the visual system is new. The live site
              is untouched.
            </p>
          </div>
          <nav className="wm-nav" aria-label="Production site">
            <a href="https://academic-concept-lab.vercel.app/concept-lab">Live site</a>
            <a href="https://academic-concept-lab.vercel.app/concept-lab/library">Live library</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
