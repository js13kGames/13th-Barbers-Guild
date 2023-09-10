import { absDiv, getElement } from "./utils";
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
            "The diseases are spreading across the kingdom!",
            `<h4>Pay Attention!</h4>Give potions according to the diseases:\n${currentLevel
              .getDiseaseIngredientsDescriptions()
              .join("\n")}`,
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
  });
  return absDiv(
    "",
    import.meta.env.VITE_ID_WAITING_LOUNGE,
    width,
    height,
    theme.layers.patient,
  );
}
