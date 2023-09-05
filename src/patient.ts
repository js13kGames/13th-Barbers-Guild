import { wrapper, rect, ellipsis, move } from "./utils";

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
    const element = document.getElementById("pnt");
    if (element === null) {
    }
  });
  const objWidth = 100;
  const objHeight = 170;
  container.innerHTML = wrapper(
    head + body + getTakenMedicine(patient),
    objWidth,
    objHeight,
    {
      id: "pnt",
      style: "position: absolute; right: 30px; bottom: 30px",
    },
  );
}

const head = move(ellipsis(40, 40, 40, 40, "yellow"), 10, 0);

const body = move(rect(100, 100, "black"), 0, 80);

function getTakenMedicine(patient: Patient) {
  setTimeout(() => {
    const element = document.getElementById("pnt-indicator");
    if (element === null) {
      return;
    }
    const rects = Array.from(element.querySelectorAll("rect"));
    const initialRects = [...rects];
    window.addEventListener("cauldronPrepared", (event) => {
      const rect = rects.shift();
      if (rect !== undefined) {
        rect.style.fill = event.detail.color;
      }
    });
    window.addEventListener("reset", () => {
      initialRects.forEach((rect) => {
        rect.style.fill = defaultColor;
      });
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
