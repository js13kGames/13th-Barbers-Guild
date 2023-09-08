import {
  getElement,
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

class Patient {
  medicines: number[];
  attempts: number;

  constructor() {
    this.medicines = [0, 4];
    this.attempts = 3;
  }
}

export function createPatient(container: HTMLElement) {
  const patient = new Patient();
  setTimeout(() => {
    getElement("pnt");
  });
  const objWidth = 121;
  const objHeight = 141;
  container.innerHTML = wrapper(
    char1(Health.Good) + getTakenMedicine(patient),
    objWidth,
    objHeight,
    {
      id: "pnt",
      style: "position: absolute; right: 30px; bottom: 30px",
    },
  );
}

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

const hair = move(
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

const char1 = (health: Health) => wrapper(move(group(health), 0, 35) + move(hair, 7, 0), 121, 141);

function getTakenMedicine(patient: Patient) {
  setTimeout(() => {
    const element = getElement("pnt-indicator");
    const rects = Array.from(element.querySelectorAll("rect"));
    window.addEventListener("cauldronPrepared", (event) => {
      const rect = rects.shift();
      if (rect !== undefined) {
        rect.style.fill = event.detail.color;
      }
    });
  });
  return move(
    wrapper(
      patient.medicines
        .map((_, index) => move(medicineIndicator, 10 + 20 * index, 0))
        .join(""),
      100,
      30,
      { id: "pnt-indicator" },
    ),
    0,
    150,
  );
}

const defaultColor = "transparent";

const medicineIndicator = rect(10, 10, defaultColor);
