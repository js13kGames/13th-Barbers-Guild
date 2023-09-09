import { type Level, type Patient } from "./data";
import { getElement, wrapper } from "./utils";
import { character2 as character } from "./character";
import { notify } from "./events";

export function createPatient(container: HTMLElement, level: Level) {
  const patient = level.getRandomPatient();
  console.debug(
    `Patient has ${patient.disease.name} and need ${patient.ingredients
      .map((item) => item.name)
      .join(" + ")}`,
  );
  setTimeout(() => {
    getElement("pnt");
    window.addEventListener("cauldronPrepared", (event) => {
      patient.giveIngredient(event.detail.ingredient);
      renderPatient(container, patient);
    });
  });
  renderPatient(container, patient);
}

function renderPatient(container: HTMLElement, patient: Patient) {
  window.dispatchEvent(notify(patient.getSymptoms()));
  container.innerHTML = wrapper(
    character(patient.getHealth()),
    character.width,
    character.height,
    {
      id: "pnt",
      style: "position: absolute; right: 30px; bottom: 30px",
    },
  );
}
