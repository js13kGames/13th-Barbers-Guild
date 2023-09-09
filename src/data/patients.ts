import { type Ingredient } from "./ingredients";
import { type Disease } from "./diseases";
import { Health } from "../types";
import { shuffle } from "../utils";

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
      return Health.Cured;
    }
    const isDead = this.givenIngredients.size === this.attempts;
    if (isDead) {
      return Health.Dead;
    }
    return Health.Bad;
  }

  getSymptoms() {
    const health = this.getHealth();
    const messages = messagesByHealth[health](this.disease);
    return shuffle([...messages]).slice(0, 1);
  }
}

const goodMessages = (disease) => disease.symptoms;

const badMessages = () => [
  "I'm not felling better!",
  "I'm felling worse, what did you gave me doc?",
];

const deadMessages = () => [
  "You were suposed to save people.",
  "How do you think you'd join the guild by killing your patients?",
];

const curedMessages = () => [
  "I'm felling much better doc! Thanks!",
  "You are a life safer sir, I feel renewed!",
  "It's a miracle! I'm feeling myself again!",
];

const messagesByHealth = {
  [Health.Good]: goodMessages,
  [Health.Bad]: badMessages,
  [Health.Dead]: deadMessages,
  [Health.Cured]: curedMessages,
};
