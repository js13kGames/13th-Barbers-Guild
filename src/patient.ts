import { type Level, type Patient } from "./data";
import { getElement, wrapper, cycle } from "./utils";
import { character2, character3 } from "./character";
import { notify, patientLeave } from "./events";

const characters = [character2, character3];

export function createPatient(container: HTMLElement, level: Level) {
  const patient = level.getRandomPatient();
  const character = cycle(characters);
  console.debug(
    `Patient has ${patient.disease.name} and need ${patient.ingredients
      .map((item) => item.name)
      .join(" + ")}`,
  );
  setTimeout(() => {
    getElement("pnt");
    window.addEventListener("cauldronPrepared", (event) => {
      patient.giveIngredient(event.detail.ingredient);
      renderPatient(container, patient, character);
    });
  });
  renderPatient(container, patient, character);
}

function renderPatient(
  container: HTMLElement,
  patient: Patient,
  character: typeof character2,
) {
  window.dispatchEvent(
    notify(patient.getSymptoms(), () => {
      console.debug("patientLeave?");
      if (patient.hasLeft()) {
        console.debug("patientLeave!");
        window.dispatchEvent(patientLeave(patient));
      }
    }),
  );
  container.innerHTML = wrapper(
    character(patient.health),
    character.width,
    character.height,
    {
      id: "pnt",
      style: "position: absolute; right: 30px; bottom: 30px",
    },
  );
}
