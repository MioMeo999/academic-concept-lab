import type { Metadata } from "next";
import "./predictive-editorial.css";

export const metadata: Metadata = {
  title: "Chromatic Scholarly Sketch · iteration 02",
  description: "A second isolated Academic Concept Lab visual exploration built around Predictive Processing in Music.",
  robots: { index: false, follow: false },
};

export default function PredictiveEditorialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
