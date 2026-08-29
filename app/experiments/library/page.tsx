import type { Metadata } from "next";
import Link from "next/link";
import { KIND, RECORDS } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import type { RecordKind } from "@/content/types";
import { WmLibrary } from "../_components/WmLibrary";

export const metadata: Metadata = { title: "Library" };

type Search = { kind?: string; discipline?: string };

export default async function WideMarginLibrary({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const kind = sp.kind && sp.kind in KIND ? (sp.kind as RecordKind) : undefined;
  const discipline = sp.discipline && DISCIPLINES[sp.discipline] ? sp.discipline : undefined;

  return (
    <div className="wm-shell">
      <nav className="wm-crumb" aria-label="Breadcrumb">
        <Link href="/experiments">Wide Margin study</Link>
        <span aria-hidden="true">/</span>
        <span>Library</span>
      </nav>

      <section className="wm-home-hero" style={{ paddingTop: "clamp(1.4rem,4vh,2.6rem)" }}>
        <h1 className="wm-home-title" style={{ fontSize: "clamp(2.2rem,6vw,4.2rem)", maxWidth: "18ch" }}>The library</h1>
        <p className="wm-home-sub">
          Every record, filterable. The library is the surface that scales — no record ever needs to appear in the
          main navigation.
        </p>
        <p className="wm-why" style={{ marginTop: "1rem", maxWidth: "48ch" }}>
          Only Gestalt Principles in Music has been retypeset for this study. Every other title opens the live record
          in the current design.
        </p>
      </section>

      <WmLibrary records={RECORDS} disciplines={DISCIPLINES} initialKind={kind} initialDiscipline={discipline} />
    </div>
  );
}
