import { type Ingredient } from "./ingredients";
import { type Disease } from "./diseases";
import { type Level } from "./levels";
import { Health } from "../types";
import { shuffle } from "../utils";

export class Patient {
  level: Level;
  disease: Disease;
  ingredients: Ingredient[];
  givenIngredients: Ingredient[];
  attempts: number;
  health: Health;

  constructor(
    level: Level,
    disease: Disease,
    ingredients: Ingredient[],
    enableMiss: boolean,
  ) {
    this.level = level;
    this.health = Health.Good;
    this.disease = disease;
    this.ingredients = ingredients;
    this.attempts = this.ingredients.length;
    if (enableMiss) {
      this.attempts++;
    }
    this.givenIngredients = [];
  }

  giveIngredient(ingredient: Ingredient) {
    this.givenIngredients.push(ingredient);
    this.health = this.getHealth();
  }

  private getHealth() {
    if (this.givenIngredients.length === 0) {
      return Health.Good;
    }
    const isCured = this.ingredients.every((item) =>
      this.givenIngredients.includes(item),
    );
    if (isCured) {
      return Health.Cured;
    }
    const isDead = this.givenIngredients.length === this.attempts;
    if (isDead) {
      return Health.Dead;
    }
    return Health.Bad;
  }

  hasLeft() {
    console.debug('patient health', this.health)
    return this.health === Health.Cured || this.health === Health.Dead;
  }

  getSymptoms() {
    const health = this.health;
    const messages = messagesByHealth[health](this.disease);
    return shuffle([...messages]).slice(0, 1);
  }
}

const goodMessages = (disease: Disease) => disease.symptoms;

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
