import {theme} from './theme';
import {rect, move} from './utils';

const shadow = rect(920, 2800, "url('#shadow')");

export function createShadow() {
  return `<svg width="720" height="900" viewBox"0 0 720 900">
    <defs>
      <radialGradient fr="20%" id="shadow">
        <stop offset="0%" stop-color="rgba(0,0,0,0)" />
        <stop offset="66%" stop-color="${theme.bg}">
          <animate attributeName="offset" dur="3s" values="66%;60%;66%;60%;66%" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="${theme.bg}" />
        <animate attributeName="fx" dur="10s" values="50%;48%;50%;52%;50%" repeatCount="indefinite" />
        <animate attributeName="fy" dur="10s" begin="2s" values="50%;45%;50%;55%;50%" repeatCount="indefinite" />
      </radialGradient>
    </defs>
    ${move(shadow, -100, -1000)}
  </svg>`;
}
