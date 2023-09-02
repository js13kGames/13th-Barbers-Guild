import { move } from "./utils";
import { theme } from "./theme";
import { potionClick, potionRelease } from "./events";

export function createPotions() {
  const x1 = 120;
  const x2 = 320;
  const x3 = 520;
  const y1 = 185;
  const y2 = 415;
  const deltay1 = 15;
  return [
    createPotion(0, theme.potions[0], x1, y1),
    createPotion(1, theme.potions[1], x1, y2),
    createPotion(2, theme.potions[2], x2, y1 + deltay1),
    createPotion(3, theme.potions[3], x2, y2 + deltay1),
    createPotion(4, theme.potions[4], x3, y1, true),
    createPotion(5, theme.potions[5], x3, y2, true),
  ].join("");
}

function createPotion(
  index: number,
  color: string,
  x: number,
  y: number,
  right?: boolean,
) {
  const id = `p-${index}`;
  setTimeout(() => {
    configEvents(id, color);
  });
  return potion(id, color, x, y, right);
}

function potion(
  id: string,
  color: string,
  x: number,
  y: number,
  right?: boolean,
) {
  const position = right === true ? 0 : 6;
  return `
  <svg id="${id}" width="75" height="75" style="top: ${y}px; left: ${x}px; z-index: ${
    theme.layers.potion
  }">
    ${move(shape("rgba(0, 0, 0, 0.5)", 66, 66, true), 3, 3)}
    ${move(shape(color, 66, 66), position, 0)}
    ${move(shape("rgba(0, 0, 0, 0.5)", 50, 50), position + 8, 8)}
  </svg>`;
}

function shape(color: string, width: number, height: number, blur?: boolean) {
  let filter = "";
  if (blur === true) {
    filter = "filter:blur(4px)";
  }
  return `
<svg width="${width}" height="${height}" viewBox="0 0 53 53" style="cursor: move; ${filter}">
<g transform="translate(-510 143)">
<path d="m557-96c-4.6 4.6-26 8.1-32 5.1-5.8-3-16-23-15-29 1-6.4 17-22 23-23 6.4-1 26 9 29 15s-0.49 28-5.1 32z" fill="${color}" fill-opacity="1"/>
</g>
</svg>`;
}

export function configEvents(id: string, color: string) {
  let clicked = false;
  let initialX = 0;
  let initialY = 0;
  let deltaX = 0;
  let deltaY = 0;
  const element = document.getElementById(id);
  if (element === null) {
    return;
  }
  element.addEventListener("mousedown", (event) => {
    clicked = true;
    initialX = event.clientX;
    initialY = event.clientY;
    element.dispatchEvent(potionClick(color));
    element.style.zIndex = theme.layers.activePotion;
  });
  window.addEventListener("mousemove", (event) => {
    if (!clicked) {
      return;
    }
    deltaX = event.clientX - initialX;
    deltaY = event.clientY - initialY;
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    element.style.pointerEvents = "none";
  });
  window.addEventListener("mouseup", () => {
    if (!clicked) {
      return;
    }
    clicked = false;
    deltaX = 0;
    deltaY = 0;
    element.style.transform = "";
    element.style.pointerEvents = "";
    element.style.zIndex = theme.layers.potion;
    element.dispatchEvent(potionRelease);
  });
}
