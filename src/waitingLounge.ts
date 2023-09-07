import { createPatient } from "./patient";
import { theme } from "./theme";

export function createWaitingLounge(width: number, height: number) {
  setTimeout(() => {
    const element = document.getElementById("wlg");
    if (element === null) {
      return;
    }
    createPatient(element);
  });
  return `<div id="wlg" style="position: absolute; width: ${width}px; height: ${height}px; pointer-events: none; z-index: ${theme.layers.patient}"></div>`;
}
