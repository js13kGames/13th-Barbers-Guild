import { move } from "./utils";

let clicked = false;
let initialX = 0;
let initialY = 0;
let deltaX = 0;
let deltaY = 0;

export function listenToPotionEvents() {
  const element = document.getElementById("a");
  if (element === null) {
    return;
  }
  element.addEventListener("mousedown", (event) => {
    clicked = true;
    initialX = event.clientX;
    initialY = event.clientY;
  });
  window.addEventListener("mousemove", (event) => {
    if (clicked) {
      deltaX = event.clientX - initialX;
      deltaY = event.clientY - initialY;
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      console.debug({ deltaX, deltaY });
    }
  });
  window.addEventListener("mouseup", () => {
    clicked = false;
    deltaX = 0;
    deltaY = 0;
    element.style.transform = "";
  });
}

export function createPotions() {
  const x1 = 120;
  const x2 = 320;
  const x3 = 520;
  const y1 = 185;
  const y2 = 415;
  const deltay1 = 15;
  return [
    createPotion("#ff6600", x1, y1),
    createPotion("#ff0000", x1, y2),
    createPotion("#ccff00", x2, y1 + deltay1),
    createPotion("#d4aa00", x2, y2 + deltay1),
    createPotion("#ff0066", x3, y1, true),
    createPotion("#5fd38d", x3, y2, true),
  ].join("");
}

function createPotion(color: string, x: number, y: number, right?: boolean) {
  return potion(color, x, y, right);
}

function potion(color: string, x: number, y: number, right?: boolean) {
  const position = right === true ? 0 : 6;
  return `
  <svg width="75" height="75" style="top: ${y}px; left: ${x}px">
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
