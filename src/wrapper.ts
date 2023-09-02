export function wrapper(
  content: string,
  width: number,
  height: number,
  opt?: {
    id?: string;
    style?: string;
    viewBoxWidth?: number;
    viewBoxHeight?: number;
  },
) {
  return `<svg${
    opt?.id !== undefined ? " id=" + opt.id : ""
  } width="${width}" height="${height}" viewBox="0 0 ${
    opt?.viewBoxWidth ?? width
  } ${opt?.viewBoxHeight ?? height}" style="${
    opt?.style ?? ""
  }">${content}</svg>`;
}
