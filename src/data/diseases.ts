export enum DiseaseType {
  Flu,
  Measles,
  Plague,
}

export const diseases: Disease[] = [
  {
    type: DiseaseType.Flu,
    name: "Flu",
    symptoms: [
      "I'm felling feverish and just hate this snuffing nose! Help me doc!",
    ],
  },
  {
    type: DiseaseType.Measles,
    name: "Measles",
    symptoms: [
      "My body is full of red hashes and I'm burning! What can you do for me sir?",
    ],
  },
  {
    type: DiseaseType.Plague,
    name: "Plague",
    symptoms: [
      "Those swollen lumps hurt! My full body hurts! I'm scared, help me please!",
    ],
  },
];

export interface Disease {
  type: DiseaseType;
  name: string;
  symptoms: string[];
}
