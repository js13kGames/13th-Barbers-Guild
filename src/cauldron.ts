import { ellipsis, move, className } from "./utils";
import { wrapper } from "./wrapper";
import { cauldronDrop, cauldronPrepared } from "./events";

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
      // remove class on next event cycle so it happens after potion release
      setTimeout(() => {
        element.classList.remove("hover");
      });
    });
    window.addEventListener("potionClick", (event) => {
      setColor(element, event.detail.color);
    });
    window.addEventListener("potionRelease", (event) => {
      if (element.classList.contains("hover")) {
        const color = event.detail.color;
        element.style.setProperty("--initColor", color);
        element.dispatchEvent(cauldronDrop(color));
      } else {
        setColor(element, "var(--initColor)");
      }
    });
    window.addEventListener("reset", () => {
      element.style.setProperty("--initColor", "var(--defaultColor)");
    });
  });
  return getGroup(height) + getDropAnimation(height);
}

function setColor(element: HTMLElement, color: string) {
  element.style.setProperty("--color", color);
}

const x = 106;
const y = 83;

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

export function getDropAnimation(height: number) {
  setTimeout(() => {
    const element = document.getElementById("cdr-anim2");
    if (element === null) {
      return;
    }
    window.addEventListener("cauldronDrop", (event) => {
      const effect = [{ top: "100%" }, { top: "-100%" }];
      const timing = {
        duration: 1000,
        easing: "ease-in-out",
      };
      element.style.setProperty("--animColor", event.detail.color);
      const animation = element.animate(effect, timing);
      animation.onfinish = () => {
        element.dispatchEvent(cauldronPrepared(event.detail.color));
      };
      window.addEventListener("reset", () => {
        animation.cancel();
      });
    });
  });
  return `<div id="cdr-anim" style="height: ${
    height - 150
  }px"><div id="cdr-anim2"></div></div>`;
}
