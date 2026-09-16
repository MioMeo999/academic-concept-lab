import type { Metadata } from "next";
import "../../../aet-visual-rebuild/aet-visual-rebuild.css";
import { affectiveEventsTheory } from "@/content/affective-events-theory";
import AETFrame from "@/app/aet-visual-rebuild/_components/AETFrame";

export const metadata: Metadata = {
  title: "Affective Events Theory · two truths at once",
  description: affectiveEventsTheory.oneSentence,
  robots: { index: true, follow: true },
};

export default function CanonicalAetLayout({ children }: { children: React.ReactNode }) {
  return <AETFrame variant="canonical" mainMode="div">{children}</AETFrame>;
}
