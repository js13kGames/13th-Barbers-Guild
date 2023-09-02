import "./style.css";
import { createWalls } from "./walls";
import { createShadow } from "./shadow";
import { createShelves } from "./shelves";
import { createPotions } from "./potions";
import { createCauldron } from "./cauldron";
import { wrapper } from "./wrapper";

function runApp() {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (root === null) {
    return;
  }
  const width = 720;
  const height = 800;
  root.innerHTML = `
    ${wrapper(
      createWalls(width, height) + createShadow(width, height),
      width,
      height,
    )}
    ${createCauldron(height)},
    ${createPotions()}
    ${createShelves(width, height)}
  `;
}

runApp();
