import { move } from "./utils";

export function createPotions() {
  return `
    ${move(potion("#ccff00"), 330, 235)}
    ${move(potion("#d4aa00"), 330, 465)}
    ${move(potion("#ff0066"), 525, 220)}
    ${move(potion("#5fd38d"), 525, 450)}
    ${move(potion("#ff6600"), 115, 215)}
    ${move(potion("#ff0000"), 115, 445)}
  `;
}

function potion(color: string) {
  return `
    ${move(
      shape({ color: "rgba(0, 0, 0, 0.5)", width: 66, height: 66, blur: true }),
      -5,
      71,
    )}
    ${move(shape({ color, width: 66, height: 66 }), 0, 66)}
    ${move(
      shape({ color: "rgba(0, 0, 0, 0.5)", width: 50, height: 50 }),
      8,
      74,
    )}
  `;
}

function shape({
  color,
  width,
  height,
  blur,
}: {
  color: string;
  width: number;
  height: number;
  blur?: boolean;
}) {
  let filter = "";
  if (blur === true) {
    filter = "filter:blur(4px)";
  }
  return `
<svg width="${width}" height="${height}" version="1.1" viewBox="0 0 53 53" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; ${filter}">
<g transform="translate(-510 143)">
<path d="m557-96c-4.6 4.6-26 8.1-32 5.1-5.8-3-16-23-15-29 1-6.4 17-22 23-23 6.4-1 26 9 29 15s-0.49 28-5.1 32z" fill="${color}" fill-opacity="1"/>
</g>
</svg>`;
}
