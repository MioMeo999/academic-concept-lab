import type { Metadata } from "next";
import Link from "next/link";
import "./ink-exploration.css";

export const metadata: Metadata = {
  title: { default: "Ink Atlas — visual direction", template: "%s · Ink Atlas" },
  description: "An isolated visual-direction study for Academic Concept Lab.",
  robots: { index: false, follow: false },
};

export default function InkExplorationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ink-world">
      <div className="ink-experiment-strip">
        <div className="ink-frame ink-experiment-strip-inner">
          <span><strong>Independent visual direction</strong> · Ink Atlas</span>
          <span>Prototype only · canonical site untouched</span>
          <Link href="/experiments">Compare the earlier study</Link>
        </div>
      </div>

      <header className="ink-header">
        <div className="ink-frame ink-header-inner">
          <Link className="ink-brand" href="/ink-exploration" aria-label="Ink Atlas home">
            <svg className="ink-brand-mark" viewBox="0 0 44 44" aria-hidden="true">
              <rect className="ink-brand-seal" x="4.5" y="4.5" width="35" height="35" />
              <path className="ink-brand-seal-grid" d="M11 11h22v22H11Zm0 7h22M11 25h22M18 11v22M25 11v22" />
              <path className="ink-brand-seal-mark" d="M15 15h4v14h-4m4-7h6m0-7h4v14h-4" />
            </svg>
            <span className="ink-brand-wordmark"><strong>Ink Atlas</strong><small>Academic Concept Lab / visual study</small></span>
          </Link>
          <nav className="ink-nav" aria-label="Ink Atlas">
            <a href="#map">The model</a>
            <a href="#evidence">Evidence</a>
            <a href="#trail">The trail</a>
            <Link href="/concept-lab">Canonical site</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="ink-footer">
        <div className="ink-frame ink-footer-inner">
          <div>
            <span className="ink-footer-title">Ink Atlas / independent design track</span>
            <p>One visual world, different intellectual weather. This prototype is a study, not a migration.</p>
          </div>
          <div className="ink-footer-links">
            <Link href="/concept-lab">Read the canonical lab</Link>
            <Link href="/experiments">See the previous visual study</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
