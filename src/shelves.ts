import { move, hmirror, resize, skewY } from "./utils";
import { theme } from "./theme";

export function createShelves() {
  return `<svg
    width="720"
    height="900"
    viewBox="0 0 720 900"
  >
    ${move(shelf, 95, 270)}
    ${move(shelf, 95, 500)}
    ${hmirror(move(shelf, 95, 270))}
    ${hmirror(move(shelf, 95, 500))}
    ${skewY(resize(move(shelf, 185, 320), 1.5, 1), -5)}
    ${skewY(resize(move(shelf, 185, 550), 1.5, 1), -5)}
  </svg>`;
}

const front = `<polygon
  points="0,0 100,20 100,40 0,20"
  style="fill:${theme.shelfFront}"
/>`;

const side = `<polygon
  points="0,0 -10,20 -10,35 0,20"
  style="fill:${theme.shelfSide}"
/>`;

const bottom = `<polygon
  points="0,20 100,40 90,45 -10,35"
  style="fill:${theme.shelfBottom}"
/>`;

const shelf = `${move(front + side + bottom, 10, 70)}`;
