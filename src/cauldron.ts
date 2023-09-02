import { ellipsis, move, className } from "./utils";
import { wrapper } from "./wrapper";

const id = "cdr";

export function createCauldron(height: number) {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element === null) {
      return;
    }
    function toggleHover(x: number, y: number) {
      if (element === null) {
        return;
      }
      const rect = element.getBoundingClientRect();
      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        element.classList.add("hover");
      } else {
        element.classList.remove("hover");
      }
    }
    window.addEventListener("mousemove", (event) => {
      toggleHover(event.clientX, event.clientY);
    });
    window.addEventListener("touchmove", (event) => {
      const touch = event.changedTouches[0];
      toggleHover(touch.clientX, touch.clientY);
    });
    window.addEventListener("touchend", () => {
      element.classList.remove("hover");
    });
    window.addEventListener("potionClick", (event) => {
      setColor(element, event.detail.color);
    });
    window.addEventListener("potionRelease", () => {
      setColor(element, "blue");
    });
  });
  return style + getGroup(height);
}

function setColor(element: HTMLElement, color: string) {
  element.style.setProperty("--color", color);
}

const x = 106;
const y = 83;

const style = `<style>
  #${id} {
    --color: green;
  }
  #${id} .ctd ellipse {
    fill: blue;
  }
  #${id}.hover .ctd ellipse {
    fill: var(--color);
  }
</style>`;

function getGroup(height: number) {
  return wrapper(shadow + body + mouth, 216, 170, {
    id,
    style: `left: 100px; top: ${height - 170}px`,
  });
}

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
