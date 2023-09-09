import { absDiv, getElement } from "./utils";
import { createAttendant } from "./attendant";
import { createPatient } from "./patient";
import { theme } from "./theme";

export function createWaitingLounge(width: number, height: number) {
  setTimeout(() => {
    const container = getElement(import.meta.env.VITE_ID_WAITING_LOUNGE);
    createAttendant(container);
    function callPatient(event: WindowEventMap["newLevel"]) {
      createPatient(container, event.detail.level);
    }
    window.addEventListener("newLevel", callPatient);
    window.addEventListener("reset", () => {
      window.removeEventListener("newLevel", callPatient);
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
