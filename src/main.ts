import "../style/style.css";
import { generateIngredients } from "./data";
import { createWalls } from "./walls";
import { createShelves } from "./shelves";
import { createPotions } from "./potions";
import { createCauldron } from "./cauldron";
import { createWaitingLounge } from "./waitingLounge";
import { reset } from "./events";

function runApp() {
  renderApp();
  listenToEvents();
}

function renderApp() {
  const [width, height, scale, isLandscape] = getFluidDimensions();
  const root = getScaledRoot(scale, isLandscape);
  const ingredients = generateIngredients();
  root.innerHTML = `
    ${createWalls(width, height)}
    ${createCauldron(height)}
    ${createPotions(ingredients, scale)}
    ${createShelves(width, height)}
    ${createWaitingLounge(width, height)}
  `;
}

function getFluidDimensions() {
  const width = 720;
  const height = 800;
  const xRate = window.innerWidth / width;
  const yRate = window.innerHeight / height;
  const scale = Math.min(xRate, yRate);
  return [width, height, scale, xRate > yRate] as const;
}

function getScaledRoot(scale: number, isLandscape: boolean) {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (root === null) {
    throw new Error("Missing #app");
  }
  root.style.setProperty("transform", `scale(${scale})`);
  root.style.setProperty("transform-origin", isLandscape ? "top" : "left top");
  return root;
}

function listenToEvents() {
  window.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      window.dispatchEvent(reset());
    }
  });
}

runApp();
