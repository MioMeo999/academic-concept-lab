import type { Metadata } from "next";
import "./aet-visual-rebuild.css";
import AETFrame from "@/app/aet-visual-rebuild/_components/AETFrame";

export const metadata: Metadata = {
  title: "Affective Events Theory · visual rebuild",
  description: "An isolated visual rebuild of Affective Events Theory for review.",
  robots: { index: false, follow: false },
};

export default function AETVisualRebuildLayout({ children }: { children: React.ReactNode }) {
  return <AETFrame variant="target">{children}</AETFrame>;
}

