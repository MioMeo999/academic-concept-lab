import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { WideMarginGestalt } from "../_components/WideMarginGestalt";

export const metadata: Metadata = {
  title: "Gestalt Principles in Music",
  description: "Visual study only. The production record lives at /concept-lab/theory/gestalt-principles-in-music.",
};

/* The canonical route is untouched: this page reads the same record object out
   of the same registry and renders it through a different visual system. */
export default function GestaltVisualStudy() {
  const record = findRecord("theory", "gestalt-principles-in-music") as TheoryRecord | undefined;
  if (!record) notFound();
  return <WideMarginGestalt record={record} />;
}
