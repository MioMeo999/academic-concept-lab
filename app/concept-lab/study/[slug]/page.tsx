import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECORDS, findRecord } from "@/content/records";
import type { PaperRecord } from "@/content/types";
import { StudyBody } from "../../_components/StudyBody";

export function generateStaticParams() {
  return RECORDS.filter((r) => r.kind === "study").map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = findRecord("study", slug);
  return r ? { title: r.title, description: r.oneSentence } : { title: "Not found" };
}

export default async function StudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = findRecord("study", slug) as PaperRecord | undefined;
  if (!record) notFound();
  return <StudyBody record={record} />;
}
