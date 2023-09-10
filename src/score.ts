import { wrapper, rect, move, getElement } from "./utils";
import { Health } from "./types";
import { theme } from "./theme";
import { levelComplete } from "./events";

const width = 400;
const height = 20;
const deltaX = 120;
const deltaY = 30;
const margin = 6;

export function createScore() {
  let points = 0;
  const limit = 2;
  function updateBar() {
    const element = getElement(import.meta.env.VITE_ID_SCORE);
    const rect = element.querySelector("rect:last-child");
    const newWidth = (width - margin) * (points / limit);
    rect?.setAttribute("width", `${newWidth}`);
  }
  function incrementScore(event: WindowEventMap["patientDone"]) {
    if (event.detail.patient.health !== Health.Cured) {
      return;
    }
    points++;
    updateBar();
  }
  function informLevelComplete() {
    if (points === limit) {
      points = 0;
      updateBar();
      window.dispatchEvent(levelComplete());
    }
  }
  window.addEventListener("patientDone", incrementScore);
  window.addEventListener("patientLeave", informLevelComplete);
  window.addEventListener("reset", () => {
    window.removeEventListener("patientDone", incrementScore);
    window.removeEventListener("patientLeave", informLevelComplete);
  });
  return scoreBar;
}

const bar1 = rect(width, height, theme.scoreBack, height / 2);
const bar2 = move(
  rect(0, height - margin, theme.scoreFront, (height - margin) / 2),
  margin / 2,
  margin / 2,
);
const content = move(bar1 + bar2, deltaX, deltaY);
const scoreBar = wrapper(content, width + deltaX, height + deltaY, {
  id: import.meta.env.VITE_ID_SCORE,
});
