import type { Metadata } from "next";
import { DISCIPLINES } from "@/content/disciplines";
import { RECORDS } from "@/content/records";
import { SavedTarget } from "./_components/SavedTarget";

export const metadata: Metadata = { title: "Saved preview" };

export default function SavedTargetPage() {
  return <SavedTarget records={RECORDS} disciplines={DISCIPLINES} />;
}
