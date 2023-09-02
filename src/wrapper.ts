export function wrapper(
  content: string,
  width: number,
  height: number,
  opt?: {
    id?: string;
    style?: string;
  },
) {
  return `<svg${
    opt?.id !== undefined ? " id=" + opt.id : ""
  } width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="${
    opt?.style ?? ""
  }">${content}</svg>`;
}
