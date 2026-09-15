import type { Metadata } from "next";
import "./reflexive-ta.css";
import RTAFrame from "./_components/RTAFrame";

export const metadata: Metadata = {
  title: "Reflexive Thematic Analysis · patterns made through interpretation",
  description: "An isolated Academic Concept Lab method prototype for reflexive thematic analysis.",
  robots: { index: false, follow: false },
};

export default function ReflexiveTATargetLayout({ children }: { children: React.ReactNode }) {
  return <RTAFrame variant="target">{children}</RTAFrame>;
}
