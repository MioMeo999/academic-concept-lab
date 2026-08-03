import type { Metadata } from "next";
import { PrototypePage } from "../../PrototypeLab";
export const metadata: Metadata = { title: "Tuned Out or Dialed In · Living Editorial Atlas" };
export default function Page() { return <PrototypePage prototype="editorial-atlas" mode="study" />; }
