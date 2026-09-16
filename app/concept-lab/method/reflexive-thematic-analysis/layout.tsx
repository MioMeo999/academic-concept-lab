import type { Metadata } from "next";
import "../../../reflexive-ta-target/reflexive-ta.css";
import { rta } from "@/content/rta";
import RTAFrame from "@/app/reflexive-ta-target/_components/RTAFrame";

export const metadata: Metadata = {
  title: "Reflexive Thematic Analysis · patterns made through interpretation",
  description: rta.oneSentence,
  robots: { index: true, follow: true },
};

export default function CanonicalRtaLayout({ children }: { children: React.ReactNode }) {
  return <RTAFrame variant="canonical" mainMode="div">{children}</RTAFrame>;
}
