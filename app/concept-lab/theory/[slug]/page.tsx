import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECORDS, findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { TheoryBody } from "../../_components/TheoryBody";
import { isPersonEnvironmentFitRecord, PersonEnvironmentFitBody } from "../../_components/PersonEnvironmentFitBody";
import { JDRExperience } from "../../_experiences/job-demands-resources/Experience";
import { GestaltFrame } from "../../_components/GestaltFrame";
import { GestaltTargetContent } from "../../_components/GestaltTargetPage";

export function generateStaticParams() {
  return RECORDS.filter((r) => r.kind === "theory").map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = findRecord("theory", slug);
  return r ? { title: r.title, description: r.oneSentence } : { title: "Not found" };
}

export default async function TheoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = findRecord("theory", slug) as TheoryRecord | undefined;
  if (!record) notFound();
  if (slug === "gestalt-principles-in-music") {
    return <GestaltFrame><GestaltTargetContent /></GestaltFrame>;
  }
  if (slug === "person-environment-fit" && isPersonEnvironmentFitRecord(record)) {
    return <PersonEnvironmentFitBody record={record} />;
  }
  if (slug === "job-demands-resources") return <JDRExperience record={record} />;
  return <TheoryBody record={record} />;
}
