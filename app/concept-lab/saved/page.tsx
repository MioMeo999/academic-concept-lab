import type { Metadata } from "next";
import { RECORDS } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import { LibraryBrowser } from "../_components/LibraryBrowser";
import { Crumbs } from "../_components/RecordShell";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return (
    <div className="wrap">
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Saved" }]} />
      <section className="hero" style={{ paddingTop: "1.2rem" }}>
        <h1 className="title" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)" }}>Saved</h1>
        <p className="lede" style={{ marginTop: ".7rem" }}>Records you starred. Stored on this device only.</p>
      </section>
      <LibraryBrowser records={RECORDS} disciplines={DISCIPLINES} onlySaved />
    </div>
  );
}
