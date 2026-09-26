import type { Metadata } from "next";
import { RECORDS, KIND } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import type { MethodRecord, RecordKind } from "@/content/types";
import { TheoryLibrary } from "./TheoryLibrary";
import { StudyLibrary } from "./StudyLibrary";
import { MethodLibrary } from "./MethodLibrary";
import { MechanismLibrary, type MechanismRecord } from "./MechanismLibrary";
import { LibraryHub } from "./LibraryHub";

export const metadata: Metadata = { title: "Library" };

type Search = { kind?: string; discipline?: string };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  // Validated against KIND itself, not a hand-kept list — a hardcoded triple
  // here silently sent ?kind=mechanism to an unfiltered library.
  const kind = sp.kind && sp.kind in KIND ? (sp.kind as RecordKind) : undefined;
  const discipline = sp.discipline && DISCIPLINES[sp.discipline] ? sp.discipline : undefined;

  if (kind === "theory") {
    return (
      <TheoryLibrary
        records={RECORDS.filter((record) => record.kind === "theory")}
        initialDiscipline={discipline}
      />
    );
  }

  if (kind === "study") {
    return <StudyLibrary records={RECORDS.filter((record) => record.kind === "study")} totalRecords={RECORDS.length} />;
  }

  if (kind === "method") {
    const methods = RECORDS.filter((record): record is MethodRecord => record.kind === "method");
    return <MethodLibrary records={methods} />;
  }

  if (kind === "mechanism") {
    const mechanisms = RECORDS.filter((record): record is MechanismRecord => record.kind === "mechanism");
    return <MechanismLibrary records={mechanisms} />;
  }

  return <LibraryHub records={RECORDS} disciplines={DISCIPLINES} initialDiscipline={discipline} />;
}
