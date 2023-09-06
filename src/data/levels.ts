import type { Ingredient } from "./ingredients";
import { type Disease, diseases } from "./diseases";
import { shuffle } from "../utils";

type DiseasesIngredients = Array<Readonly<[Disease, Ingredient[]]>>;

export class Level {
  diseasesIngredients: DiseasesIngredients;
  enableMisses: boolean;

  constructor(diseasesIngredients: DiseasesIngredients, enableMisses: boolean) {
    this.diseasesIngredients = diseasesIngredients;
    this.enableMisses = enableMisses;
  }

  // "Give potions according to the disease:\n🧪 Flu: Rat Tooth + Devil's Herb + Frog Paw\n🧪 Plague: Cat Paw\n🧪 Measles: Salamander Tail",
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
}

export function* generateLevels(ingredients: Ingredient[]) {
  for (const params of generateLevelParameters()) {
    const [requiredIngredients, enableMisses] = params;
    const diseasesIngredients = diseases.map(
      (disease) =>
        [
          disease,
          getRandomIngredients(requiredIngredients, ingredients),
        ] as const,
    );
    yield new Level(diseasesIngredients, enableMisses);
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
