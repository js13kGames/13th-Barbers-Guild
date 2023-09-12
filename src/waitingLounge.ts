import { absDiv, getElement, coloredIngredientNames } from "./utils";
import { createAttendant } from "./attendant";
import { createPatient } from "./patient";
import { theme } from "./theme";
import { notify } from "./events";
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
            `Within 1 minute, do you think you can earn ${
              import.meta.env.VITE_PATIENT_LIMIT
            } credits to join our Barber's Guild? If you fail, you are fired 🔥!`,
            `<h4>Pay Attention!</h4>Give potions according to the diseases:\n${getDiseasesAndIngredients(
              currentLevel.diseasesIngredients,
            )}`,
            "Ready to start?",
          ],
          () => {
            createPatient(container, currentLevel);
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
    window.addEventListener("reset", () => {
      window.removeEventListener("newLevel", beginLevel);
      window.removeEventListener("patientLeave", callNextPatient);
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
