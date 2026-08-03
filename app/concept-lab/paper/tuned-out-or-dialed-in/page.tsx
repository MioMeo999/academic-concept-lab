import type { Metadata } from "next";
import { ContentPage } from "../../ConceptLab";

export const metadata: Metadata = { title: "Tuned Out or Dialed In · Concept Lab", description: "An evidence-grounded interactive reading of Gencay, Foulk, and Schaerer (2026)." };
export default function PaperPage() { return <ContentPage kind="paper"/>; }
