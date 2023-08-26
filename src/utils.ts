export function rect(width: number, height: number, bg: string) {
  return `<rect width="${width}" height="${height}" style="fill:${bg};" />`;
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
