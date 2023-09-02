import { theme } from "./theme";
import { rect, move } from "./utils";

const shadow = rect(800, 2800, "url('#shadow')");

export function createShadow(width: number, height: number) {
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
