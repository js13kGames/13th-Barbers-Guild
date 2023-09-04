import { createPatient } from "./patient";

export function createWaitingLounge(width: number, height: number) {
  setTimeout(() => {
    const element = document.getElementById("wlg");
    if (element === null) {
      return;
    }
    createPatient(element);
  });
  return `<div id="wlg" style="position: absolute; width: ${width}px; height: ${height}px"></div>`;
}
