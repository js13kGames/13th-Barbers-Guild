export function rect(width: number, height: number, bg: string, rx: number = 0) {
  let output = `<rect width="${width}" height="${height}" style="fill:${bg};" `
  if (rx) {
    output += `rx="${rx}" `;
  }
  return output + '/>';
}

export function move(content: string, x: number, y: number) {
  return `
    <g transform="translate(${x},${y})">${content}</g>
  `
}

export function resize(content: string, x: number, y: number) {
  return `
    <g transform="scale(${x} ${y})">${content}</g>
  `
}

export function hmirror(content: string) {
  return `
    <g style="transform: scale(-1, 1); transform-origin: center">${content}</g>;
  `
}

export function rotate(content: string, angle: number) {
  return `
    <g style="transform: rotate(${angle}deg); transform-origin: center">${content}</g>;
  `
}

export function skewY(content: string, angle: number) {
  return `
    <g style="transform: skewY(${angle}deg)">${content}</g>;
  `
}
