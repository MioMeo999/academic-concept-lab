import type { KnowledgeForm } from "../types";

export const KNOWLEDGE_FORM_LABELS: Record<KnowledgeForm, string> = {
  theory: "Theory",
  framework: "Framework",
  "formal-model": "Formal model",
  "computational-model": "Computational model",
  "perceptual-tradition": "Perceptual tradition",
};

export function getKnowledgeFormLabel(form: KnowledgeForm) {
  return KNOWLEDGE_FORM_LABELS[form];
}
