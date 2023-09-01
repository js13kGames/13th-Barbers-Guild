import "./style.css";
import { createWalls } from "./walls";
import { createShadow } from "./shadow";
import { createShelves } from "./shelves";
import { createPotions, listenToPotionEvents } from "./potions";
import { createCauldron } from "./cauldron";

function runApp() {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (root === null) {
    return;
  }
  root.innerHTML = `
    ${wrapper(
      createWalls() +
        createShadow() +
        createCauldron() +
        createShelves() +
        createPotions(),
    )}
  `;
  listenToPotionEvents();
}

function wrapper(content: string) {
  return `<svg width="720" height="900" viewBox="0 0 720 900">${content}</svg>`;
}

runApp();
