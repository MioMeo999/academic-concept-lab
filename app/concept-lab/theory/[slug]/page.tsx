import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECORDS, findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { TheoryBody } from "../../_components/TheoryBody";

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
  return <TheoryBody record={record} />;
}
