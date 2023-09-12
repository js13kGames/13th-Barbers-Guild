import { absDiv, getElement, coloredIngredientNames } from "./utils";
import { createAttendant } from "./attendant";
import { createPatient } from "./patient";
import { theme } from "./theme";
import { notify, reset } from "./events";
import { type Level } from "./data";

export function createWaitingLounge(width: number, height: number) {
  let currentLevel: Level;
  setTimeout(() => {
    const container = getElement(import.meta.env.VITE_ID_WAITING_LOUNGE);
    function beginLevel(event: WindowEventMap["newLevel"]) {
      currentLevel = event.detail.level;
      createAttendant(container);
      window.dispatchEvent(
        notify(
          [
            "You are in probation! The diseases are spreading across the kingdom!",
            `Within ${
              import.meta.env.VITE_TIME_LIMIT
            } minute, do you think you can earn ${
              import.meta.env.VITE_PATIENT_LIMIT
            } credits to join our Barber's Guild? If you fail, you are fired 🔥!`,
            `<h4>Pay Attention!</h4><p>Give potions according to the diseases:</p><p>${getDiseasesAndIngredients(
              currentLevel.diseasesIngredients,
            )}</p><p>Ready to start?</p>`,
          ],
          () => {
            createPatient(container, currentLevel);
          },
        ),
      );
    }
    function gameOver() {
      console.debug("Game over!");
      createAttendant(container);
      window.dispatchEvent(
        notify(
          [
            "<h4>Game Over!</h4><p>You are a shame for our guild! Don't you dare getting back here until you are really prepared!</p><p>Press <i>ESC</i> or hit <i>Reset</i> to restart.</p>",
          ],
          () => {
            reset();
          },
        ),
      );
    }
    function callNextPatient(event: WindowEventMap["patientLeave"]) {
      const level = event.detail.patient.level;
      if (level === currentLevel) {
        createPatient(container, event.detail.patient.level);
      }
    }
    window.addEventListener("newLevel", beginLevel);
    window.addEventListener("patientLeave", callNextPatient);
    window.addEventListener("gameOver", gameOver);
    window.addEventListener("reset", () => {
      window.removeEventListener("newLevel", beginLevel);
      window.removeEventListener("patientLeave", callNextPatient);
      window.removeEventListener("gameOver", gameOver);
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
