export const diseases: Disease[] = [
  { type: DiseaseType.Flu, name: "Flu" },
  { type: DiseaseType.Measles, name: "Measles" },
  { type: DiseaseType.Plague, name: "Plague" },
];

export interface Disease {
  type: DiseaseType;
  name: string;
}

export enum DiseaseType {
  Flu,
  Measles,
  Plague,
}
