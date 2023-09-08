import { getElement, wrapper, rect, move } from "./utils";
import { character } from "./character";
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
    character(Health.Good) + getTakenMedicine(patient),
    objWidth,
    objHeight,
    {
      id: "pnt",
      style: "position: absolute; right: 30px; bottom: 30px",
    },
  );
}

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
