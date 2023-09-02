import { ellipsis, move, className } from "./utils";
import { wrapper } from "./wrapper";

const id = "cdr";

export function createCauldron(height: number) {
  setTimeout(() => {
    window.addEventListener("potionClick", (event) => {
      setColor(event.detail.color);
    });
    window.addEventListener("potionRelease", () => {
      setColor("blue");
    });
  });
  return style + move(group, 100, height - 170);
}

function setColor(color: string) {
  const element = getCauldronElement();
  if (element !== null) {
    element.style.setProperty("--color", color);
  }
}

function getCauldronElement() {
  return document.getElementById(id);
}

const x = 106;
const y = 83;

const style = `<style>
  #${id} {
    --color: blue;
  }
  #${id} .ctd ellipse {
    fill: blue;
  }
  #${id}:hover .ctd ellipse {
    fill: var(--color);
  }
</style>`;

const shadow = move(ellipsis(x, y, x, y, "rgba(0, 0, 0, 0.3)"), 0, 4);
const body = move(ellipsis(x, y, x, y, "#1c1f24"), 4, 0);
const mouth = move(
  className(
    ellipsis(x * 0.66, y * 0.2, x * 0.66, y * 0.2 + 6, "red", "#0f1013", 5),
    "ctd",
  ),
  40,
  8,
);
const group = wrapper(shadow + body + mouth, 216, 170, { id });
