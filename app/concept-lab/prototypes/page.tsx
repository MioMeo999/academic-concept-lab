import type { Metadata } from "next";
import { PrototypeIndex } from "./PrototypeLab";

export const metadata: Metadata = { title: "Prototype comparison · Academic Concept Lab", description: "Compare three controlled visual systems for theory and empirical research." };

export default function PrototypesPage() { return <PrototypeIndex />; }
