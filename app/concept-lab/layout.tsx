import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource/patrick-hand/400.css";
import "./sketchnote.css";
import { Sprite } from "./_components/Sprite";
import { Reveal } from "./_components/Reveal";
import { SiteNav } from "./_components/SiteNav";

export const metadata: Metadata = {
  description: "Serious theory and evidence, explained without being flattened. Every claim carries a mark saying where it came from.",
};

/**
 * The library is the only surface that grows: no record is ever listed in the
 * nav, so it stays this length whether there are 3 records or 300.
 */
export default function ConceptLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="acl">
      <Sprite />
      <Reveal />
      <header className="site">
        <div className="wrap site-in">
          <Link className="brand" href="/concept-lab">
            <svg width={29} height={29} viewBox="0 0 40 40" aria-hidden="true">
              <path d="M20 3.6c9.3-.3 16.6 6.9 16.4 16.2-.2 9.2-7.3 16.4-16.5 16.2C10.7 35.8 3.7 28.7 3.6 19.8 3.5 10.6 10.8 3.9 20 3.6z" fill="none" stroke="#1C1B19" strokeWidth={2.4} />
              <path d="M13.5 24c2-6.5 4.2-9.8 6.6-9.8 2.3 0 4.5 3.3 6.5 9.8" fill="none" stroke="#E24E1B" strokeWidth={2.4} strokeLinecap="round" />
            </svg>
            Academic Concept Lab
          </Link>
          <SiteNav />
        </div>
      </header>

      <main>{children}</main>

      <footer className="site">
        <div className="wrap foot-in">
          <div>
            <span className="k">Academic Concept Lab</span>
            <p className="read" style={{ fontSize: ".88rem", color: "#6E6A62", marginTop: ".3rem", maxWidth: "44ch" }}>
              Serious theory and evidence, explained without being flattened. Every claim carries a mark saying where it came from.
            </p>
          </div>
          <SiteNav footer />
        </div>
      </footer>
    </div>
  );
}
