import { rect, ellipsis, move } from "./utils";
import { wrapper } from "./wrapper";

export function createPatient(width: number, height: number) {
  setTimeout(() => {
    const element = document.getElementById("pnt");
    if (element === null) {
      return;
    }
    window.addEventListener("cauldronPrepared", (event) => {
      console.debug("Medicine", event.detail.color);
    });
  });
  const objWidth = 100;
  const objHeight = 170;
  const margin = 20;
  return wrapper(head + body, objWidth, objHeight, {
    id: "pnt",
    style: `top: ${height - objHeight - margin}px; left: ${
      width - objWidth - margin
    }px; pointer-events: none`,
  });
}

const head = move(ellipsis(40, 40, 40, 40, "yellow"), 10, 0);
const body = move(rect(100, 100, "black"), 0, 80);
