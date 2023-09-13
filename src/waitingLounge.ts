import { absDiv, getElement, coloredIngredientNames } from "./utils";
import { createAttendant } from "./attendant";
import { createPatient } from "./patient";
import { theme } from "./theme";
import { notify, beginLevel } from "./events";
import { type Level } from "./data";

export function createWaitingLounge(width: number, height: number) {
  let isGameDone = false;
  let currentLevel: Level;
  setTimeout(() => {
    const container = getElement(import.meta.env.VITE_ID_WAITING_LOUNGE);
    function startLevel(event: WindowEventMap["newLevel"]) {
      currentLevel = event.detail.level;
      createAttendant(container);
      const nextLevelAction =
        currentLevel.requiredIngredientsCount === 1
          ? "join our Barber's Guild"
          : `advance to level ${currentLevel.requiredIngredientsCount}`;
      window.dispatchEvent(
        notify(
          [
            currentLevel.requiredIngredientsCount === 1
              ? "You are on probation! The diseases are spreading across the kingdom!"
              : `Diseases are worse than ever! Now you need to combine ${currentLevel.requiredIngredientsCount} ingredients for a cure.`,
            `Do you believe you can earn ${
              import.meta.env.VITE_PATIENT_LIMIT
            } credits ${nextLevelAction} within ${
              import.meta.env.VITE_TIME_LIMIT
            } seconds? Failure results in termination! 🔥!`,
            `<h4>Pay Attention!</h4><p>Give potions according to the diseases:</p><p>${getDiseasesAndIngredients(
              currentLevel.diseasesIngredients,
            )}</p><p>Are you ready to start?</p>`,
          ],
          () => {
            window.dispatchEvent(beginLevel());
            createPatient(container, currentLevel);
          },
        ),
      );
    }
    const teardownIntructions =
      "<p>Press <i>ESC</i> or hit <i>Reset</i> to restart.</p>";
    function gameOver() {
      isGameDone = true;
      console.debug("Game over!");
      createAttendant(container);
      window.dispatchEvent(
        notify(
          [
            "<h4>Game Over!</h4><p>You are a shame to our guild! Don't you dare come back here until you are really prepared!</p>" +
              teardownIntructions,
          ],
          undefined,
          true,
        ),
      );
    }
    function gameComplete() {
      isGameDone = true;
      console.debug("Game complete!");
      createAttendant(container);
      window.dispatchEvent(
        notify(
          [
            "<h4>Game Complete!</h4><p>Congratulations! Your name will be remembered 1300 years from now as the greatest barber-surgeon ever. Ben Kingsley will portray you in movies!</p>" +
              teardownIntructions,
          ],
          undefined,
          true,
        ),
      );
    }
    function callNextPatient(event: WindowEventMap["patientLeave"]) {
      const level = event.detail.patient.level;
      if (level === currentLevel && !isGameDone) {
        createPatient(container, event.detail.patient.level);
      }
    }
    window.addEventListener("newLevel", startLevel);
    window.addEventListener("patientLeave", callNextPatient);
    window.addEventListener("gameOver", gameOver);
    window.addEventListener("gameComplete", gameComplete);
    window.addEventListener("reset", () => {
      window.removeEventListener("newLevel", startLevel);
      window.removeEventListener("patientLeave", callNextPatient);
      window.removeEventListener("gameOver", gameOver);
      window.removeEventListener("gameComplete", gameComplete);
    });
    // Create attendant by default while the game hasn't started
    createAttendant(container);
  });
  return absDiv(
    "",
    import.meta.env.VITE_ID_WAITING_LOUNGE,
    width,
    height,
    theme.layers.patient,
  );
}

function getDiseasesAndIngredients(
  diseasesIngredients: Level["diseasesIngredients"],
) {
  return diseasesIngredients
    .map(([disease, ingredients]) => {
      return `🧪 ${disease.name}: ${coloredIngredientNames(ingredients)}`;
    })
    .join("\n");
}
