import { absDiv, getElement } from "./utils";
import { createPatient } from "./patient";
import { theme } from "./theme";

export function createWaitingLounge(width: number, height: number) {
  setTimeout(() => {
    const element = getElement(import.meta.env.VITE_ID_WAITING_LOUNGE);
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
