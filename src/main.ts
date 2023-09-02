import "./style.css";
import { createWalls } from "./walls";
import { createShadow } from "./shadow";
import { createShelves } from "./shelves";
import { createPotions } from "./potions";
import { createCauldron } from "./cauldron";

function runApp() {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (root === null) {
    return;
  }
  const width = 720;
  const height = 800;
  root.innerHTML = `
    ${wrapper(
      createWalls(width, height) +
        createShadow(width, height) +
        createCauldron(height),
    )}
    ${createPotions()}
    ${wrapper(createShelves(), "pointer-events: none")}
  `;
}

function wrapper(content: string, style: string = "") {
  return `<svg width="720" height="800" viewBox="0 0 720 800" style="${style}">${content}</svg>`;
}

runApp();
