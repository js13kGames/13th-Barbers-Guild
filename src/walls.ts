import { theme } from "./theme";
import { wrapper, rect, hmirror, move, resize, skewY } from "./utils";

export function createWalls(width: number, height: number) {
  const walls = `
    <svg width="${width}" height="${height}">
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
  return wrapper(
    move(walls, 0, -30) + createShadow(width, height),
    width,
    height,
  );
}

const brick = rect(50, 20, theme.brick, 5);

function bricks() {
  return `${move(brick, 0, 20)}${move(brick, 20, 50)}${move(brick, 0, 80)}`;
}

const bg = rect(720, 799, theme.wall);

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

const shadow = rect(800, 2800, "url('#shadow')");

function createShadow(width: number, height: number) {
  return `<svg width="${width}" height="${height}">
    <defs>
      <radialGradient fr="25%" id="shadow">
        <stop offset="0%" stop-color="rgba(0,0,0,0)">
        </stop>
        <stop offset="75%" stop-color="${theme.bg}">
        <stop offset="100%" stop-color="${theme.bg}" />
        <animate attributeName="fx" dur="2s" values="50%;40%;50%;60%" repeatCount="indefinite" />
        <animate attributeName="fy" dur="2s" begin="2s" values="50%;40%;50%;60%" repeatCount="indefinite" />
      </radialGradient>
    </defs>
    ${move(shadow, -40, -900)}
  </svg>`;
}
