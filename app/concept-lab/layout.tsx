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
              <path d="M20 3c2.8 6.6 4.3 9.4 9.8 10.1-5.4 1.3-7.6 3.9-9.8 10.6-2.2-6.7-4.4-9.3-9.8-10.6C15.7 12.4 17.2 9.6 20 3z" fill="#E24E1B" />
              <path d="M20 23.7c2.1 5.9 3.7 8.4 8.6 9.1-4.8 1.1-6.8 3.1-8.6 7.1-1.8-4-3.8-6-8.6-7.1 4.9-.7 6.5-3.2 8.6-9.1z" fill="#2E7D8F" opacity=".82" />
            </svg>
            Academic Concept Lab
          </Link>
          <span className="site-motto">ideas drawn out · knowledge in context · research made visible</span>
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
