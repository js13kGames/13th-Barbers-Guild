export enum DiseaseType {
  Flu,
  Measles,
  Plague,
}

export const diseases: Disease[] = [
  {
    type: DiseaseType.Flu,
    name: "Flu",
    symptoms: "I'm feeling feverish and just hate this stuffy nose!",
    symptomsShort: "fever and runny nose",
  },
  {
    type: DiseaseType.Measles,
    name: "Measles",
    symptoms: "My body is covered in red rashes, and I'm burning up!",
    symptomsShort: "red rashes and fever",
  },
  {
    type: DiseaseType.Plague,
    name: "Plague",
    symptoms: "These swollen lumps are painful! My entire body aches!",
    symptomsShort: "swollen lumps and body pain",
  },
];

export interface Disease {
  type: DiseaseType;
  name: string;
  symptoms: string;
  symptomsShort: string;
}
