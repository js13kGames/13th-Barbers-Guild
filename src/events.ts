import type { Level, Ingredient, Patient } from "./data";

export const reset = () => new CustomEvent("reset");

export const potionClick = (ingredient: Ingredient) =>
  new CustomEvent("potionClick", { bubbles: true, detail: { ingredient } });

export const potionRelease = (ingredient: Ingredient) =>
  new CustomEvent("potionRelease", { bubbles: true, detail: { ingredient } });

export const cauldronDrop = (ingredient: Ingredient) =>
  new CustomEvent("cauldronDrop", { bubbles: true, detail: { ingredient } });

export const cauldronPrepared = (ingredient: Ingredient) =>
  new CustomEvent("cauldronPrepared", {
    bubbles: true,
    detail: { ingredient },
  });

export const notify = (messages: string[], onDismissed?: () => void) =>
  new CustomEvent("notify", { detail: { messages, onDismissed } });

export const dismiss = () => new CustomEvent("dismiss");

export const newLevel = (level: Level) =>
  new CustomEvent("newLevel", { detail: { level } });

export const scoreMaxed = () => new CustomEvent("scoreMaxed");

export const levelComplete = () => new CustomEvent("levelComplete");

export const patientCalled = (patient: Patient) =>
  new CustomEvent("patientCalled", {
    bubbles: true,
    detail: { patient },
  });

export const patientDone = (patient: Patient) =>
  new CustomEvent("patientDone", {
    bubbles: true,
    detail: { patient },
  });

export const patientLeave = (patient: Patient) =>
  new CustomEvent("patientLeave", {
    bubbles: true,
    detail: { patient },
  });

export const gameOver = () => new CustomEvent("gameOver", { bubbles: true });
