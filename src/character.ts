import {
  wrapper,
  rect,
  ellipsis,
  move,
  resize,
  rotate,
  hmirror,
  blur,
} from "./utils";
import { theme } from "./theme";
import { Health } from "./types";

const back = move(rect(98, 98, theme.character, 35, theme.black(), 2), 2, 2);

const opacity = move(rect(94, 94, theme.white(0.3), 35), 6, 0);

const eye = ellipsis(5, 5, 5, 5, theme.black());

const eyeDecoration = `<path d="m2.2 0.5c-1.9 1.8-2.6 4.9 0 8.3" fill="none" stroke="${theme.black()}" stroke-width="1.5" stroke-linecap="round"/>`;

const deadEyeLine = (direction: 1 | -1) =>
  move(rotate(rect(16, 2, theme.black()), direction * 45), direction * -5, 5);

const deadEye = wrapper(deadEyeLine(1) + deadEyeLine(-1), 16, 16);

const face = (health: Health) =>
  [
    back,
    opacity,
    health !== Health.Dead ? move(eye, 10, 40) + move(eye, 40, 40) : "",
    health === Health.Bad
      ? move(eyeDecoration, 6, 40) + hmirror(move(eyeDecoration, 52, 40))
      : "",
    health === Health.Dead
      ? move(deadEye, 7.5, 36.5) + move(deadEye, 37.5, 36.5)
      : "", // instead of orig eye's position
  ].join("");

const shadow = blur(move(rect(94, 94, theme.black(0.3), 35), 2, 8), 4);

const hair1 = move(
  resize(
    `<path d="m18.1 33.6c4.48-14.8 3.53-19.5-3.5-20.7-2.17 6.77-12.5 5.61-14.3 2.88-0.076-6.38 1.08-14.9 12-15.5 3.6-0.191 7.65 1.39 9.38 5.54 7.97-0.938 8.67 20.6 1.78 27.4z" fill="#fc0" stroke="#000" stroke-linejoin="round" stroke-width=".606"/>`,
    4,
    4,
  ),
  0,
  0,
);

const group = (health: Health) =>
  wrapper(shadow + move(face(health), 6, 0), 106, 106);

export const character = (health: Health) =>
  wrapper(move(group(health), 0, 35) + move(hair1, 7, 0), 121, 141);
character.width = 121;
character.height = 141;

let hair2 = resize(
  `<path d="m140 268c46.6-154 1.96-204-137-145 13.3-58.2 34.7-104 127-120 122 78.8 184 253 10.7 265z" fill="#603d33" stroke="#000" stroke-linejoin="round" stroke-width="4.74"/>`,
  0.5,
  0.5,
);
for (let i = 0; i < 4; i++) {
  hair2 = move(ellipsis(10, 10, 10, 10, "#666"), 5 + i * 10, 45 - i * 2.5) + hair2;
}

export const character2 = (health: Health) =>
  wrapper(move(group(health), 0, 35) + move(hair2, 7, 0), 132, 141);
character2.width = 132;
character2.health = 141;
