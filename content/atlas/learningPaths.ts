export type LearningPath = {
  id: string;
  discipline: string;
  question: string;
  description: string;
  recordIds: readonly string[];
};

export const LEARNING_PATHS = [
  {
    id: "organise-sound",
    discipline: "music-psych",
    question: "How does the mind organise sound?",
    description: "A curated route from grouping principles through auditory streams and tonal structure to formal hierarchical description.",
    recordIds: [
      "gestalt-principles-in-music",
      "auditory-scene-analysis",
      "tonal-hierarchy",
      "generative-theory-of-tonal-music",
    ],
  },
  {
    id: "musical-expectation",
    discipline: "music-psych",
    question: "Why does music create expectations?",
    description: "A route from Meyer’s historical account through Narmour’s melodic model to Huron’s integrative response theory.",
    recordIds: [
      "meyers-expectancy-theory",
      "narmours-implication-realization-theory",
      "hurons-itpra-theory",
    ],
  },
  {
    id: "learn-model-predict",
    discipline: "music-psych",
    question: "How are musical regularities learned and modelled?",
    description: "A curated route from exposure and regularity learning through IDyOM to predictive processing as an integrative capstone, not a strict historical sequence.",
    recordIds: [
      "statistical-learning-of-music",
      "idyom-information-dynamics-of-music",
      "predictive-processing-in-music",
    ],
  },
] as const satisfies readonly LearningPath[];

export function getLearningPathsForDiscipline(discipline: string) {
  return LEARNING_PATHS.filter((path) => path.discipline === discipline);
}
