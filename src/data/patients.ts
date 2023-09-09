import { type Ingredient } from "./ingredients";
import { type Disease } from "./diseases";
import { Health } from "../types";

export class Patient {
  disease: Disease;
  ingredients: Ingredient[];
  givenIngredients: Set<Ingredient>;
  attempts: number;

  constructor(
    disease: Disease,
    ingredients: Ingredient[],
    enableMiss: boolean,
  ) {
    this.disease = disease;
    this.ingredients = ingredients;
    this.attempts = this.ingredients.length;
    if (enableMiss) {
      this.attempts++;
    }
    this.givenIngredients = new Set();
  }

  giveIngredient(ingredient: Ingredient) {
    this.givenIngredients.add(ingredient);
  }

  getHealth() {
    if (this.givenIngredients.size === 0) {
      return Health.Good;
    }
    const isCured = this.ingredients.every((item) =>
      this.givenIngredients.has(item),
    );
    if (isCured) {
      return Health.Good;
    }
    const isDead = this.givenIngredients.size === this.attempts;
    if (isDead) {
      return Health.Dead;
    }
    return Health.Bad;
  }
}
