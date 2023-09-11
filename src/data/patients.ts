import { type Ingredient } from "./ingredients";
import { type Disease } from "./diseases";
import { type Level } from "./levels";
import { Health } from "../types";
import { shuffle, coloredIngredientNames } from "../utils";

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
    const isGettingBetter = this.givenIngredients.every((item) =>
      this.ingredients.includes(item),
    );
    if (isGettingBetter) {
      return Health.GettingBetter;
    }
    const isDead = this.givenIngredients.length === this.attempts;
    if (isDead) {
      return Health.Dead;
    }
    return Health.Bad;
  }

  hasLeft() {
    return this.health === Health.Cured || this.health === Health.Dead;
  }

  getSymptoms() {
    let health = this.health;
    if (health === Health.GettingBetter || health === Health.Bad) {
      const latestIngredient = this.givenIngredients.slice(-1)[0];
      health = this.ingredients.includes(latestIngredient)
        ? Health.GettingBetter
        : Health.Bad;
    }
    const messages = messagesByHealth[health](this.disease);
    const message = shuffle([...messages]).slice(0, 1)[0];
    return message
      .replace("#i", coloredIngredientNames(this.ingredients))
      .replace("#d", this.disease.name);
  }
}

const goodMessages = (disease: Disease) => disease.symptoms;

const gettingBetterMessages = () => [
  "I'm not full refresh, but I'm felling slightly better!",
  "I think there's been a small change for the better in how I feel.",
  "I've noticed a slight improvement in my condition.",
  "I'm not as bad as I was before; there's been a minor improvement.",
  "I'm feeling a tad better, but there's still some discomfort.",
];

const badMessages = () => [
  "I'm not felling better!",
  "I'm felling worse, what did you gave me doc?",
];

const deadMessages = () => [
  "You were suposed to save people. He only needed #i for his #d.",
  "How do you think you'd join the guild by killing your patients? #d is supposed to be cured with #i.",
];

const curedMessages = () => [
  "I'm felling much better doc! Thanks!",
  "You are a life safer sir, I feel renewed!",
  "It's a miracle! I'm feeling myself again!",
];

const messagesByHealth = {
  [Health.Good]: goodMessages,
  [Health.GettingBetter]: gettingBetterMessages,
  [Health.Bad]: badMessages,
  [Health.Dead]: deadMessages,
  [Health.Cured]: curedMessages,
};
