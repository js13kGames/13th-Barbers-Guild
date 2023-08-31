import { ellipsis, move, resize, className } from "./utils";

export function createCauldron() {
  const x = 106;
  const y = 83;
  const group = `
    <style>
      .cauldron .ctd ellipse {
        fill: blue;
      }
      .cauldron:hover .ctd ellipse {
        fill: red;
      }
    </style>
    <svg width="216" height="170" class="cauldron">
      ${move(ellipsis(x, y, x, y, "rgba(0, 0, 0, 0.3)"), 0, 4)}
      ${move(ellipsis(x, y, x, y, "#1c1f24"), 4, 0)}
      ${move(
        className(
          ellipsis(
            x * 0.66,
            y * 0.2,
            x * 0.66,
            y * 0.2 + 6,
            "red",
            "#0f1013",
            5,
          ),
          "ctd",
        ),
        40,
        8,
      )}
    </svg>
  `;
  return move(group, 100, 700);
}
