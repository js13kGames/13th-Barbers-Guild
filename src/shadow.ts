import {theme} from './theme';
import {rect, move} from './utils';

const shadow = rect(800, 2800, "url('#shadow')");

export function createShadow() {
  return `<svg width="720" height="900" viewBox"0 0 720 900">
    <defs>
      <radialGradient fr="20%" id="shadow">
        <stop offset="0%" stop-color="rgba(0,0,0,0)">
          <animate attributeName="stop-color" dur="500ms" values="${theme.bg0};${theme.bg5}" repeatCount="indefinite" />
        </stop>
        <stop offset="75%" stop-color="${theme.bg}">
        <stop offset="100%" stop-color="${theme.bg}" />
        <animate attributeName="fx" dur="5s" values="50%;47%;50%;53%" repeatCount="indefinite" />
        <animate attributeName="fy" dur="5s" begin="2s" values="50%;42%;50%;57%" repeatCount="indefinite" />
      </radialGradient>
    </defs>
    ${move(shadow, -50, -1000)}
  </svg>`;
}
