import type { Metadata } from "next";
import RTAExperience from "./_components/RTAExperience";

export const metadata: Metadata = {
  title: "Reflexive Thematic Analysis · patterns made through interpretation",
  description: "An isolated Academic Concept Lab method prototype for reflexive thematic analysis.",
  robots: { index: false, follow: false },
};

export default function ReflexiveTATargetPage() {
  return <RTAExperience variant="target" />;
}
