import type { SDTMotive, SDTRegulation } from "@/content/types";

/* ---------------------------------------------------------------------------
   The register's teaching logic: which reasons there are, how they are
   grouped, and what a set of selections says. Pure functions, so the reading a
   reader is given can be tested without a browser.

   Everything here is a teaching reading of the record's distinctions. It is
   not a measure: no selection carries a weight, and nothing is added up.
   ------------------------------------------------------------------------- */

export type PlaceId = "amotivation" | "external" | "introjected" | "identified" | "integrated" | "intrinsic";
export type Cut = "purpose" | "owner";

export const PLACE_ORDER: PlaceId[] = ["amotivation", "external", "introjected", "identified", "integrated", "intrinsic"];

const BY_LABEL: Record<string, PlaceId> = {
  Amotivation: "amotivation",
  "External regulation": "external",
  "Introjected regulation": "introjected",
  "Identified regulation": "identified",
  "Integrated regulation": "integrated",
  "Intrinsic motivation": "intrinsic",
};

export type Place = {
  id: PlaceId;
  /** Regulation name as the record gives it. */
  name: string;
  descriptor: string;
  body: string;
  statement: string;
  explanation: string;
  /** The cut by purpose: what the behaviour is for. */
  purpose: "none" | "extrinsic" | "intrinsic";
  /** The cut by ownership: whose the reason feels. */
  owner: "none" | "controlled" | "autonomous";
};

const PURPOSE: Record<PlaceId, Place["purpose"]> = { amotivation: "none", external: "extrinsic", introjected: "extrinsic", identified: "extrinsic", integrated: "extrinsic", intrinsic: "intrinsic" };
const OWNER: Record<PlaceId, Place["owner"]> = { amotivation: "none", external: "controlled", introjected: "controlled", identified: "autonomous", integrated: "autonomous", intrinsic: "autonomous" };

/** Joins the record's regulations to the first-person statements that voice them, in register order. */
export function buildPlaces(regulations: SDTRegulation[], motives: SDTMotive[]): Place[] {
  return PLACE_ORDER.map((id) => {
    const reg = regulations.find((r) => BY_LABEL[r.label] === id);
    const mot = motives.find((m) => BY_LABEL[m.regulation] === id);
    if (!reg || !mot) throw new Error(`SDT register: the record has no ${id} entry`);
    return { id, name: reg.label, descriptor: reg.descriptor, body: reg.body, statement: mot.statement, explanation: mot.explanation, purpose: PURPOSE[id], owner: OWNER[id] };
  });
}

export type CutGroup = { key: string; label: string; ids: PlaceId[] };

/** The two ways of dividing the same row. Neither is a sub-division of the other. */
export const CUTS: Record<Cut, { title: string; hint: string; groups: CutGroup[] }> = {
  purpose: {
    title: "By purpose",
    hint: "What the behaviour is for",
    groups: [
      { key: "none", label: "No reason", ids: ["amotivation"] },
      { key: "extrinsic", label: "Extrinsic — done for a separable outcome", ids: ["external", "introjected", "identified", "integrated"] },
      { key: "intrinsic", label: "Intrinsic — done for the activity itself", ids: ["intrinsic"] },
    ],
  },
  owner: {
    title: "By ownership",
    hint: "Whose the reason feels",
    groups: [
      { key: "none", label: "No intention", ids: ["amotivation"] },
      { key: "controlled", label: "Controlled — pressure", ids: ["external", "introjected"] },
      { key: "autonomous", label: "Autonomous — endorsed", ids: ["identified", "integrated", "intrinsic"] },
    ],
  },
};

export type Reading = { kind: "prompt" | "reading"; sentences: string[] };

export const PROMPT =
  "Select every reason that can describe a task you do. More than one is normal: most behaviour is moved by a mixture of reasons. This is a teaching reading of the row, not a score and not a diagnosis.";

/**
 * What a set of selections says. Ownership is read first, then purpose; amotivation
 * stands outside both cuts, so it is read beside the others and never added to them.
 */
export function readFlags(picked: PlaceId[]): Reading {
  if (!picked.length) return { kind: "prompt", sentences: [PROMPT] };
  const has = (id: PlaceId) => picked.includes(id);
  const controlled = (["external", "introjected"] as PlaceId[]).filter(has).length;
  const heldExtrinsic = (["identified", "integrated"] as PlaceId[]).filter(has).length;
  const intrinsic = has("intrinsic");
  const autonomous = heldExtrinsic + (intrinsic ? 1 : 0);
  const out: string[] = [];

  if (controlled && autonomous) {
    out.push("Flags fall on both sides of the ownership cut. That is a mixed-motive case, which Ryan and Deci (2022) describe as the ordinary one. SDT asks how far the reason is pressure and how far it is endorsed; this page does not compute that.");
  } else if (controlled) {
    out.push("Every flag sits where the reason presses, whether from outside or from guilt, approval or ego already taken in. SDT calls these relatively controlled.");
  } else if (autonomous) {
    out.push("Every flag sits where the reason is held as the person’s own. SDT calls these relatively autonomous.");
  }

  if (intrinsic && controlled + heldExtrinsic > 0) {
    out.push("By purpose you have flagged both reasons that serve a separable outcome and the activity itself. The two can coexist.");
  } else if (heldExtrinsic && !intrinsic) {
    out.push("Identified and integrated reasons are autonomous but still extrinsic: the behaviour serves something beyond itself. Only intrinsic motivation is done for the activity itself.");
  }

  if (has("amotivation")) {
    out.push(picked.length === 1
      ? "Only no reason: the person lacks intention, valuing or a reason to act. SDT does not treat this as low effort or as another point on the controlled–autonomous contrast."
      : "No reason stands outside both cuts, so it is read beside the other flags and never added to them.");
  }
  return { kind: "reading", sentences: out };
}

/** The cut a place belongs to, for labelling. */
export function groupOf(id: PlaceId, cut: Cut): CutGroup {
  return CUTS[cut].groups.find((g) => g.ids.includes(id))!;
}
