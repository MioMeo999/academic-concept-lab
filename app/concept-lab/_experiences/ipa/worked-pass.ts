/* ---------------------------------------------------------------------------
   Constructed teaching material for the IPA record — NOT DATA.

   The extract below was written for this page to demonstrate the four-column
   close pass. It is not from any interview, participant or published study,
   including the exemplars the record cites. It answers one of the record's
   own illustrative questions ("How do employees experience having workplace
   music selected for them?"). The notes, statements and theme are one
   possible reading made to show the moves; a different analyst would make a
   different — not necessarily worse — reading.
   ------------------------------------------------------------------------- */

export type AttendFeature =
  | "metaphors"
  | "pronouns"
  | "hesitations"
  | "laughter"
  | "self-correction"
  | "temporal shifts"
  | "changes in emotional position"
  | "contradictions"
  | "unusually vivid expressions"
  | "things that are hard to articulate";

export type PassLine = {
  n: number;
  /** The participant's words, with feature spans marked as [[text|feature]]. */
  text: string;
  descriptive: string;
  linguistic: string;
  conceptual: string;
};

export const WORKED_QUESTION = "How do employees experience having workplace music selected for them?";

export const WORKED_PASS: PassLine[] = [
  {
    n: 1,
    text: "[[At first|temporal shifts]] I thought, fine, it's nice — someone cares about the atmosphere.",
    descriptive: "Initial acceptance; the music is read as care for the room.",
    linguistic: "“At first” announces a change still to come.",
    conceptual: "Early goodwill frames what follows as something lost.",
  },
  {
    n: 2,
    text: "But it's… [[it's|hesitations]] their playlist, [[you know? You|pronouns]] don't get a say.",
    descriptive: "The music is chosen by others; there is no say in it.",
    linguistic: "Repetition, then a shift from “I” to “you” — generalising, perhaps distancing.",
    conceptual: "The difficulty is less the sound than not being asked.",
  },
  {
    n: 3,
    text: "[[I don't mind it. Well — I do mind it, actually,|self-correction]] on some days.",
    descriptive: "Mixed feeling: minding it, some days.",
    linguistic: "Denial, then admission, in one breath.",
    conceptual: "Objecting may not feel fully permitted, even to herself.",
  },
  {
    n: 4,
    text: "It's [[like being a guest in your own desk|metaphors]].",
    descriptive: "Feeling displaced at her own workspace.",
    linguistic: "Metaphor: guest / own desk — ownership turned inside out.",
    conceptual: "Belonging and ownership of space are what is at stake.",
  },
  {
    n: 5,
    text: "So I put my headphones in and [[make myself small|unusually vivid expressions]]. [[laughs|laughter]] Which is ridiculous.",
    descriptive: "Withdraws behind headphones.",
    linguistic: "A self-diminishing image, softened at once by laughter and self-judgement.",
    conceptual: "Withdrawal as accommodation, not protest.",
  },
  {
    n: 6,
    text: "[[Now I kind of wait for the afternoon|changes in emotional position]], when it goes quiet again.",
    descriptive: "Waits for the quieter afternoon.",
    linguistic: "“Now”, and a hedge — the day is reorganised around the music.",
    conceptual: "Part of the working day becomes something to be waited through.",
  },
];

export const WORKED_STATEMENTS = [
  { text: "Goodwill turning into having no say", lines: [1, 2] },
  { text: "Unsure of the right to object", lines: [3] },
  { text: "Becoming a guest at one’s own desk", lines: [4] },
  { text: "Shrinking to make room for someone else’s sound", lines: [5] },
  { text: "Waiting for the day to return", lines: [6] },
];

export const WORKED_PET = "Being a guest in one’s own workspace: shared sound as a quiet loss of ownership";

/** The same line read three ways — used to show the two failure modes. */
export const VOICE_SENSE = {
  line: "So I put my headphones in and make myself small.",
  readings: {
    voice: {
      label: "Only giving voice",
      reading: "She says she wears headphones and keeps to herself when the music is on.",
      verdict: "Paraphrase. Accurate, and not yet analysis.",
    },
    both: {
      label: "Giving voice and making sense",
      reading: "Headphones become a way of withdrawing; “make myself small” suggests the shared sound is felt as an intrusion she accommodates rather than contests.",
      verdict: "Interpretation that stays tied to her words.",
    },
    theory: {
      label: "Only making sense",
      reading: "This exemplifies resistance to organisational control through micro-practices of autonomy.",
      verdict: "A theory has overwhelmed the account; her words have gone.",
    },
  },
} as const;
