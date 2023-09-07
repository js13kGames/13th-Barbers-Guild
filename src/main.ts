import "../style/style.css";
import { generateIngredients, generateLevels } from "./data";
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
    ${createNotifications(width, height)}
    ${createWaitingLounge(width, height)}
  `;
  // Init app in the next event cycle so all listeners are in place
  setTimeout(initApp);
}

function initApp() {
  const levelGenerator = generateLevels(ingredients);
  window.dispatchEvent(
    notify("instructions", [
      "Welcome young barber surgeon ⚕️! This is your chance to join the 13th Barber's Guild and work with the best!",
      "You are now in probation. Cure someone and earn a credit, lose someone and lose a credit. Lose all credits and you are fired 🔥!",
      "I'm giving you 3 credits, do you think you can earn 10 more credits to join our Barber's Guild?",
      "Hit <em>SPACE</em> or click anywhere in the screen to continue.\nHit <em>ESC</em> anytime to reset.\nDrag potions to the cauldron when asked.",
    ]),
  );
  function updateGame(event: WindowEventMap["dismissed"]) {
    if (event.detail.id === "instructions") {
      const level = levelGenerator.next().value;
      if (level) {
        window.dispatchEvent(
          notify("level", [
            "The diseases are spreading across the kingdom!",
            `Give potions according to the diseases:\n${level
              .getDiseaseIngredientsDescriptions()
              .join("\n")}`,
            "Ready to start?",
          ]),
        );
      }
    }
  }
  window.addEventListener("dismissed", updateGame);
  window.addEventListener("reset", () => {
    window.removeEventListener("dismissed", updateGame);
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
  // Dismiss on mouseup, which covers also mobile environments
  window.addEventListener("mouseup", () => {
    window.dispatchEvent(dismiss());
  });
}

runApp();
