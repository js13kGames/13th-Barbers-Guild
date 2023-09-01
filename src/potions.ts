import { move, id } from "./utils";

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
  return `
    ${id("a", move(potion("#ff6600"), 115 + deltaX, 215 + deltaY))}
    ${id("b", move(potion("#ff0000"), 115, 445))}
    ${id("c", move(potion("#ccff00"), 330, 235))}
    ${id("d", move(potion("#d4aa00"), 330, 465))}
    ${id("e", move(potion("#ff0066", true), 525, 220))}
    ${id("f", move(potion("#5fd38d", true), 525, 450))}
  `;
}

function potion(color: string, right?: boolean) {
  const position = right === true ? 0 : 6;
  return `
  <svg width="75" height="75">
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
