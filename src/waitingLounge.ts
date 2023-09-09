import { absDiv, getElement } from "./utils";
import { createAttendant } from "./attendant";
import { createPatient } from "./patient";
import { theme } from "./theme";

export function createWaitingLounge(width: number, height: number) {
  setTimeout(() => {
    const container = getElement(import.meta.env.VITE_ID_WAITING_LOUNGE);
    createAttendant(container);
    function callNewPatient(event: WindowEventMap["newLevel"]) {
      createPatient(container, event.detail.level);
    }
    function callNextPatient(event: WindowEventMap["patientLeave"]) {
      createPatient(container, event.detail.patient.level);
    }
    window.addEventListener("newLevel", callNewPatient);
    window.addEventListener("patientLeave", callNextPatient);
    window.addEventListener("reset", () => {
      window.removeEventListener("newLevel", callNewPatient);
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
