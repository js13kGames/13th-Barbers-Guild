import {
  getElement,
  wrapper,
  rect,
  ellipsis,
  move,
  rotate,
  hmirror,
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
  const objWidth = 100;
  const objHeight = 170;
  container.innerHTML = wrapper(
    face(Health.Dead) + getTakenMedicine(patient),
    objWidth,
    objHeight,
    {
      id: "pnt",
      style: "position: absolute; right: 30px; bottom: 30px",
    },
  );
}

const back = move(rect(98, 98, theme.character, 35, theme.black, 2), 2, 2);

const opacity = move(rect(94, 94, theme.white(0.3), 35), 6, 0);

const eye = ellipsis(5, 5, 5, 5, theme.black);

const eyeDecoration = `<path d="m2.2 0.5c-1.9 1.8-2.6 4.9 0 8.3" fill="none" stroke="${theme.black}" stroke-width="2" stroke-linecap="round"/>`;

const deadEyeLine = (direction: 1 | -1) =>
  move(rotate(rect(16, 2, theme.black), direction * 45), direction * -5, 5);

const deadEye = wrapper(deadEyeLine(1) + deadEyeLine(-1), 16, 16);

const face = (health: Health) =>
  [
    back,
    opacity,
    health !== Health.Dead ? move(eye, 20, 30) + move(eye, 50, 30) : "",
    health === Health.Bad
      ? move(eyeDecoration, 15, 30) + hmirror(move(eyeDecoration, 35, 30))
      : "",
    health === Health.Dead
      ? move(deadEye, 17.5, 26.5) + move(deadEye, 47.5, 26.5)
      : "", // instead of 20, 30 and 50, 30
  ].join("");

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
