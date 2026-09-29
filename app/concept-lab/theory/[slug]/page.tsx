import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECORDS, findRecord } from "@/content/records";
import type { TheoryRecord } from "@/content/types";
import { TheoryBody } from "../../_components/TheoryBody";
import { isPersonEnvironmentFitRecord, PersonEnvironmentFitBody } from "../../_components/PersonEnvironmentFitBody";
import { TonalExperience } from "../../_experiences/tonal-hierarchy/Experience";
import { JDRExperience } from "../../_experiences/job-demands-resources/Experience";
import { SDTExperience } from "../../_experiences/self-determination-theory/Experience";
import { SETExperience } from "../../_experiences/social-exchange-theory/Experience";
import { POExperience } from "../../_experiences/person-organisation-fit/Experience";
import { WPExperience } from "../../_experiences/workplace-design/Experience";
import { ASAExperience } from "../../_experiences/auditory-scene-analysis/Experience";
import { GTTMExperience } from "../../_experiences/generative-theory-of-tonal-music/Experience";
import { NarmourExperience } from "../../_experiences/narmours-implication-realization-theory/Experience";
import { StatisticalExperience } from "../../_experiences/statistical-learning-of-music/Experience";
import { PredictiveExperience } from "../../_experiences/predictive-processing-in-music/Experience";
import { MusicPreferenceExperience } from "../../_experiences/music-preference/Experience";
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
  if (slug === "self-determination-theory" && record.sdt) return <SDTExperience record={record} />;
  if (slug === "social-exchange-theory" && record.set) return <SETExperience record={record} />;
  if (slug === "person-organisation-fit") return <POExperience record={record} />;
  if (slug === "workplace-design" && record.disambiguation) return <WPExperience record={record} />;
  if (slug === "auditory-scene-analysis" && record.asa) return <ASAExperience record={record} />;
  if (slug === "generative-theory-of-tonal-music" && record.gttm) return <GTTMExperience record={record} />;
  if (slug === "narmours-implication-realization-theory" && record.narmour) return <NarmourExperience record={record} />;
  if (slug === "statistical-learning-of-music" && record.statistical) return <StatisticalExperience record={record} />;
  if (slug === "predictive-processing-in-music" && record.predictiveProcessing) return <PredictiveExperience record={record} />;
  if (slug === "music-preference" && record.conceptualStatus) return <MusicPreferenceExperience record={record} />;
  if (slug === "tonal-hierarchy" && record.tonal) return <TonalExperience record={record} />;
  return <TheoryBody record={record} />;
}
