import type { Metadata } from "next";
import { RECORDS, KIND } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import type { RecordKind } from "@/content/types";
import { LibraryBrowser } from "../_components/LibraryBrowser";
import { DisciplineNav } from "../_components/DisciplineNav";
import { Crumbs } from "../_components/RecordShell";
import { ReadingCompass } from "../_components/VisualAtlas";

export const metadata: Metadata = { title: "Library" };

type Search = { kind?: string; discipline?: string };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  // Validated against KIND itself, not a hand-kept list — a hardcoded triple
  // here silently sent ?kind=mechanism to an unfiltered library.
  const kind = sp.kind && sp.kind in KIND ? (sp.kind as RecordKind) : undefined;
  const discipline = sp.discipline && DISCIPLINES[sp.discipline] ? sp.discipline : undefined;

  return (
    <div className="wrap">
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "Library" }]} />
      <section className="hero page-hero page-hero-library">
        <div>
          <span className="k">the working index</span>
          <h1 className="title" style={{ fontSize: "clamp(2.1rem,5vw,4rem)" }}>The library</h1>
          <p className="lede" style={{ marginTop: ".7rem" }}>
            Every record, filterable. The library is the surface that scales — no record ever needs to appear in the main navigation.
          </p>
        </div>
        <ReadingCompass />
      </section>
      <DisciplineNav disciplines={DISCIPLINES} current={discipline} />
      <LibraryBrowser records={RECORDS} disciplines={DISCIPLINES} initialKind={kind} initialDiscipline={discipline} showDisciplineSelect={false} />
    </div>
  );
}
