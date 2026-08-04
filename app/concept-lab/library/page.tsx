import type { Metadata } from "next";
import { RECORDS } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import { LibraryBrowser } from "../_components/LibraryBrowser";
import { Crumbs } from "../_components/RecordShell";

export const metadata: Metadata = { title: "Library" };

export default function LibraryPage() {
  return (
    <div className="wrap">
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Library" }]} />
      <section className="hero" style={{ paddingTop: "1.2rem" }}>
        <h1 className="title" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)" }}>The library</h1>
        <p className="lede" style={{ marginTop: ".7rem" }}>
          Every record, filterable. The library is the surface that scales — no record ever needs to appear in the main navigation.
        </p>
      </section>
      <LibraryBrowser records={RECORDS} disciplines={DISCIPLINES} />
    </div>
  );
}
