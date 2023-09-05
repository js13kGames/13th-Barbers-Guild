export function id(idName: string, content: string) {
  return `<g id="${idName}">${content}</g>`;
}

export function className(content: string, className: string) {
  return `<g class="${className}">${content}</g>`;
}

export function rect(
  width: number,
  height: number,
  bg: string,
  rx: number = 0,
) {
  let output = `<rect width="${width}" height="${height}" style="fill:${bg};" `;
  if (rx !== 0) {
    output += `rx="${rx}" `;
  }
  return output + "/>";
}

export function ellipsis(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  fill: string,
  stroke: string = "#fff",
  strokeWidth: number = 0,
) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
}

export function move(content: string, x: number, y: number) {
  return `
    <g transform="translate(${x},${y})">${content}</g>
  `;
}

export function resize(content: string, x: number, y: number) {
  return `
    <g transform="scale(${x} ${y})">${content}</g>
  `;
}

export function hmirror(content: string) {
  return `
    <g style="transform: scale(-1, 1); transform-origin: center">${content}</g>;
  `;
}

export function rotate(content: string, angle: number) {
  return `
    <g style="transform: rotate(${angle}deg); transform-origin: center">${content}</g>;
  `;
}

export function skewY(content: string, angle: number) {
  return `
    <g style="transform: skewY(${angle}deg)">${content}</g>;
  `;
}

export function shuffle<T>(list: T[]) {
  return list.sort(() => Math.random() - 0.5);
}
