import type { Metadata } from "next";
import "@fontsource/patrick-hand/400.css";
import "./chromatic-editorial.css";

export const metadata: Metadata = {
  title: "Chromatic Scholarly Sketch — visual exploration",
  description: "An isolated Academic Concept Lab visual exploration using Gestalt Principles in Music.",
  robots: { index: false, follow: false },
};

export default function ChromaticEditorialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
