import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { InkWorldPage } from "./_components/InkWorldPage";

export const metadata: Metadata = {
  title: "Predictive Processing / Ink Atlas",
  description: "An isolated Ink Atlas visual study using the Predictive Processing in Music record.",
};

export default function InkExplorationPage() {
  const record = findRecord("theory", "predictive-processing-in-music") as TheoryRecord | undefined;
  if (!record) notFound();
  return <InkWorldPage record={record} />;
}
