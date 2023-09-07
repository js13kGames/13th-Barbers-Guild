import { absDiv } from "./utils";
import { createPatient } from "./patient";
import { theme } from "./theme";

export function createWaitingLounge(width: number, height: number) {
  setTimeout(() => {
    const element = document.getElementById(import.meta.env.VITE_ID_WAITING_LOUNGE);
    if (element === null) {
      return;
    }
    createPatient(element);
  });
  return absDiv(
    "",
    import.meta.env.VITE_ID_WAITING_LOUNGE,
    width,
    height,
    theme.layers.patient,
  );
}
