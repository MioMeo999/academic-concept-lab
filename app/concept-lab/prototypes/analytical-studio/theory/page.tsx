import type { Metadata } from "next";
import { PrototypePage } from "../../PrototypeLab";
export const metadata: Metadata = { title: "Person–Environment Fit · Analytical Research Studio" };
export default function Page() { return <PrototypePage prototype="analytical-studio" mode="theory" />; }
