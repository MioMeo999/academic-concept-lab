import type { Metadata } from "next";
import AETExperience from "./_components/AETExperience";

export const metadata: Metadata = {
  title: "Affective Events Theory · visual rebuild",
  description: "An isolated visual rebuild of Affective Events Theory for review.",
  robots: { index: false, follow: false },
};

export default function AETVisualRebuildPage() {
  return <AETExperience />;
}
