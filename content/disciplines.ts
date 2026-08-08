export type Discipline = { id: string; name: string; short: string };

export const DISCIPLINES: Record<string, Discipline> = {
  ob: { id: "ob", name: "Organizational Behaviour", short: "Org. Behaviour" },
  "music-psych": { id: "music-psych", name: "Psychology of Music", short: "Music Psych." },
  "qual-methods": { id: "qual-methods", name: "Qualitative Methods", short: "Qual. Methods" },
  psychobiology: { id: "psychobiology", name: "Psychobiology", short: "Psychobiology" },
};
