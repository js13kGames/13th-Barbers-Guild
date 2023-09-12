export enum DiseaseType {
  Flu,
  Measles,
  Plague,
}

export const diseases: Disease[] = [
  {
    type: DiseaseType.Flu,
    name: "Flu",
    symptoms: "I'm felling feverish and just hate this snuffing nose!",
    symptomsShort: "fever and runny nose",
  },
  {
    type: DiseaseType.Measles,
    name: "Measles",
    symptoms: "My body is full of red hashes and I'm burning!",
    symptomsShort: "red hashes and fever",
  },
  {
    type: DiseaseType.Plague,
    name: "Plague",
    symptoms: "Those swollen lumps hurt! My full body hurts!",
    symptomsShort: "swollen lumps and body pain",
  },
];

export interface Disease {
  type: DiseaseType;
  name: string;
  symptoms: string;
  symptomsShort: string;
}
