import "../style/style.css";
import { generateIngredients, generateLevels } from "./data";
import { createWalls } from "./walls";
import { createShelves } from "./shelves";
import { createPotions } from "./potions";
import { createCauldron } from "./cauldron";
import { createScore } from "./score";
import { createTimer } from "./timer";
import { createNotifications } from "./notifications";
import { createWaitingLounge } from "./waitingLounge";
import { getElement } from "./utils";
import { notify, dismiss, newLevel, reset, gameComplete } from "./events";

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
    ${createScore()}
    ${createTimer()}
    ${createNotifications(width, height)}
    ${createWaitingLounge(width, height)}
  `;
  // Init app in the next event cycle so all listeners are in place
  setTimeout(initApp);
}

function initApp() {
  const levelGenerator = generateLevels(ingredients);
  function createLevel() {
    const level = levelGenerator.next().value;
    console.debug("New level:", level);
    if (level) {
      dispatchEvent(newLevel(level));
    } else {
      dispatchEvent(gameComplete());
    }
  }
  window.dispatchEvent(
    notify(
      [
        "Welcome young barber surgeon ⚕️! This is your chance to join the <b>13th Barber's Guild</b> and work with the best!",
        `✅ Hit <em>SPACE</em> or click anywhere in the screen to continue.\n✅ Hit <em>ESC</em> anytime to reset.\n✅ Drag potions to the cauldron when asked.\n✅ Within ${
          import.meta.env.VITE_TIME_LIMIT
        } seconds, get a credit for each cure!`,
      ],
      createLevel,
    ),
  );
  window.addEventListener("levelComplete", createLevel);
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
  const root = getElement("app");
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
