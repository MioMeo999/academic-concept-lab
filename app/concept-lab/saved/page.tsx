import type { Metadata } from "next";
import { RECORDS } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import { LibraryBrowser } from "../_components/LibraryBrowser";
import { Crumbs } from "../_components/RecordShell";
import { Icon } from "../_components/Sketch";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return (
    <div className="wrap">
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Saved" }]} />
      <section className="hero page-hero page-hero-saved">
        <div>
          <span className="k">your field notes</span>
          <h1 className="title" style={{ fontSize: "clamp(2.1rem,5vw,4rem)" }}>Saved</h1>
          <p className="lede" style={{ marginTop: ".7rem" }}>Records you starred. Stored on this device only.</p>
        </div>
        <div className="saved-hero-mark" aria-hidden="true">
          <Icon id="i-star" style={{ width: 62, height: 62, color: "var(--gold)" }} />
          <span className="hand-note">keep a thought<br />close by</span>
        </div>
      </section>
      <LibraryBrowser records={RECORDS} disciplines={DISCIPLINES} onlySaved />
    </div>
  );
}
