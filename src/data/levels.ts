import { type Ingredient } from "./ingredients";
import { type Disease, diseases } from "./diseases";
import { Patient } from "./patients";
import { shuffle } from "../utils";

type DiseasesIngredients = Array<Readonly<[Disease, Ingredient[]]>>;

export class Level {
  diseasesIngredients: DiseasesIngredients;
  enableMisses: boolean;

  constructor(diseasesIngredients: DiseasesIngredients, enableMisses: boolean) {
    this.diseasesIngredients = diseasesIngredients;
    this.enableMisses = enableMisses;
  }

  getDiseaseIngredientsDescriptions() {
    return this.diseasesIngredients.map(([disease, ingredients]) => {
      const ingredientNames = ingredients
        .map(
          (ingredient) =>
            `<span style="text-decoration-line: underline; text-decoration-color: ${ingredient.color}; text-decoration-style: wavy">${ingredient.name}</span>`,
        )
        .join(" + ");
      return `🧪 ${disease.name}: ${ingredientNames}`;
    });
  }

  getRandomPatient() {
    const randomDiseases = shuffle([...this.diseasesIngredients]);
    console.debug(randomDiseases.map(([disease]) => disease.name));
    const [disease, ingredients] = randomDiseases[0];
    return new Patient(disease, ingredients, this.enableMisses);
  }
}

export function* generateLevels(ingredients: Ingredient[]) {
  for (const params of generateLevelParameters()) {
    const [requiredIngredients, enableMisses] = params;
    const usedCombinations = new UsedCombinations();
    const diseasesIngredients = diseases.map((disease) => {
      let selectedIngredients: Ingredient[] | null = null;
      for (let index = 0; index < 100; index++) {
        selectedIngredients = getRandomIngredients(
          requiredIngredients,
          ingredients,
        );
        if (usedCombinations.add(selectedIngredients)) {
          break;
        }
      }
      if (!selectedIngredients) {
        throw new Error(); // Could not generate distinct ingredients
      }
      return [disease, selectedIngredients] as const;
    });
    yield new Level(diseasesIngredients, enableMisses);
  }
}

class UsedCombinations {
  usedCombinations: string[];

  constructor() {
    this.usedCombinations = [];
  }

  add(ingredients: Ingredient[]) {
    const key = ingredients
      .map(({ id }) => id)
      .sort()
      .join("");
    const hasKey = this.usedCombinations.includes(key);
    if (!hasKey) {
      this.usedCombinations.push(key);
      return true;
    }
    return false;
  }
}

function getRandomIngredients(count: number, ingredients: Ingredient[]) {
  const availableIngredients = shuffle([...ingredients]);
  return availableIngredients.slice(0, count);
}

export function* generateLevelParameters() {
  let requiredIngredients = 1;
  let enableMisses = true;
  while (requiredIngredients < 7) {
    yield [requiredIngredients, enableMisses] as const;
    enableMisses = !enableMisses;
    if (enableMisses) {
      requiredIngredients++;
    }
  }
}
