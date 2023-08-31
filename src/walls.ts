import { theme } from "./theme";
import { rect, hmirror, move, resize, skewY } from "./utils";
import { bricks } from "./bricks";

const bg = rect(720, 800, theme.wall);

const floorPerspective = `<polygon
  points="0,750 0,800 50,800"
  style="fill:${theme.bg}"
/>`;

const roofPespective = `<polygon
  points="0,100 50,50 50,100 0,150"
  style="fill:${theme.bg}"
/>`;

const internalFloor = `<polygon
  points="0,50 175,0 445,0 620,50"
  style="fill:${theme.bg}"
/>`;

const pillar = rect(20, 1100, theme.bg);

const backRow = rect(270, 50, theme.bg);

export function createWalls() {
  const content = `
    <svg width="720" height="900">
      ${bg}
      ${floorPerspective}
      ${hmirror(floorPerspective)}
      ${roofPespective}
      ${hmirror(roofPespective)}
      ${move(pillar, 50, 100)}
      ${hmirror(move(pillar, 50, 100))}
      ${move(resize(roofPespective, 3.5, 1), 495, 0)}
      ${move(hmirror(resize(roofPespective, 3.5, 1)), -495, 0)}
      ${move(backRow, 225, 100)}
      ${move(pillar, 225, 100)}
      ${move(pillar, 225 + 270 - 20, 100)}
      ${move(internalFloor, 50, 750)}
      ${move(skewY(bricks(), 15), 90, 110)}
      ${hmirror(move(skewY(bricks(), 15), 90, 110))}
      ${move(bricks(), 380, 630)}
      ${move(skewY(bricks(), -40), 685, 660)}
      ${hmirror(move(skewY(bricks(), -40), 685, 660))}
    </svg>
  `;
  return move(content, 0, 50);
}
