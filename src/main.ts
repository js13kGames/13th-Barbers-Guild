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
  const xRate = window.innerWidth / width;
  const yRate = window.innerHeight / height;
  const rate = Math.min(xRate, yRate);
  root.style.setProperty("transform", `scale(${rate})`);
  root.style.setProperty(
    "transform-origin",
    xRate > yRate ? "top" : "left top",
  );
  root.innerHTML = `
    ${wrapper(
      createWalls(width, height) + createShadow(width, height),
      width,
      height,
    )}
    ${createCauldron(height)},
    ${createPotions(rate)}
    ${createShelves(width, height)}
  `;
}

runApp();
