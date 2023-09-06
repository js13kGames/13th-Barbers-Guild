import "../style/style.css";
import { generateIngredients } from "./data";
import { createWalls } from "./walls";
import { createShelves } from "./shelves";
import { createPotions } from "./potions";
import { createCauldron } from "./cauldron";
import { createNotifications } from "./notifications";
import { createWaitingLounge } from "./waitingLounge";
import { notify, dismiss, reset } from "./events";

const ingredients = generateIngredients();

function runApp() {
  listenToEvents();
  renderApp();
}

function renderApp() {
  const [width, height, scale, isLandscape] = getFluidDimensions();
  const root = getScaledRoot(scale, isLandscape);
  root.innerHTML = `
    ${createWalls(width, height)}
    ${createCauldron(height)}
    ${createPotions(ingredients, scale)}
    ${createShelves(width, height)}
    ${createNotifications()}
    ${createWaitingLounge(width, height)}
  `;
  // Init app in the next event cycle so all listeners are in place
  setTimeout(function initApp() {
    window.dispatchEvent(notify("Welcome", "There", "Handsome"));
  });
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
      renderApp(); // reset application
    }
    if (event.key === " ") {
      window.dispatchEvent(dismiss());
    }
  });
}

runApp();
