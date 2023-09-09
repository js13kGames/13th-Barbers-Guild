import { type Level, type Patient } from "./data";
import { getElement, wrapper } from "./utils";
import { character2 as character } from "./character";

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
      console.debug(
        `Added ingredient ${
          event.detail.ingredient.name
        } - health ${patient.getHealth()}`,
      );
      renderPatient(container, patient);
    });
  });
  renderPatient(container, patient);
}

function renderPatient(container: HTMLElement, patient: Patient) {
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
