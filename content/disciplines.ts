export type Discipline = { id: string; name: string; short: string };

export const DISCIPLINES: Record<string, Discipline> = {
  ob: { id: "ob", name: "Organizational Behaviour", short: "Org. Behaviour" },
  "music-psych": { id: "music-psych", name: "Psychology of Music", short: "Music Psych." },
};
