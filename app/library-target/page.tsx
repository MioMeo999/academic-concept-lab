import type { Metadata } from "next";
import { DISCIPLINES } from "@/content/disciplines";
import { KIND, RECORDS } from "@/content/records";
import type { RecordKind } from "@/content/types";
import { LibraryTarget } from "./_components/LibraryTarget";

export const metadata: Metadata = { title: "Library preview" };

type SearchParams = { kind?: string; discipline?: string; q?: string };

export default async function LibraryTargetPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const initialKind = params.kind && params.kind in KIND ? params.kind as RecordKind : undefined;
  const initialDiscipline = params.discipline && DISCIPLINES[params.discipline] ? params.discipline : undefined;

  return <LibraryTarget records={RECORDS} disciplines={DISCIPLINES} initialKind={initialKind} initialDiscipline={initialDiscipline} initialQuery={params.q ?? ""} />;
}
