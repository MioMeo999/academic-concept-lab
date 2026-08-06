import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECORDS, findRecord } from "@/content/records";
import type { MethodRecord } from "@/content/types";
import { MethodBody } from "../../_components/MethodBody";

export function generateStaticParams() {
  return RECORDS.filter((r) => r.kind === "method").map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = findRecord("method", slug);
  return r ? { title: r.title, description: r.oneSentence } : { title: "Not found" };
}

export default async function MethodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = findRecord("method", slug) as MethodRecord | undefined;
  if (!record) notFound();
  return <MethodBody record={record} />;
}
