export function wrapper(
  content: string,
  width: number,
  height: number,
  style: string = "",
) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="${style}">${content}</svg>`;
}
