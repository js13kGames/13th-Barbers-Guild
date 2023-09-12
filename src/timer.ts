import { wrapper, rect, ellipsis, move, resize, vmirror } from "./utils";

const height = 100;

export function createTimer() {
  return wrapper(group, 70, height, { style: "top: 10px; left: 560px" });
}

const coverLid = ellipsis(35, 10, 35, 10, "#784421");
const coverShadow = move(ellipsis(35, 10, 35, 10, "#28170b"), 0, 5);
const cover = coverShadow + coverLid;

const path =
  "M 0,0 C 0,-20.654185 70,-21.872077 70,0 70,22.378835 39.954921,54.914604 35,55 30.084107,55.084723 0,21.945938 0,0 Z";
const triangle = (color: string) => `<path d="${path}" fill="${color}" />`;

const group = resize(
  [
    move(resize(triangle("#afe"), 0.9, 0.75), 4, 20),
    move(cover, 0, height - 25),
    move(vmirror(resize(triangle("#afe"), 0.9, 0.65)), 4, -18),
    move(resize(triangle("#c8ab37"), 0.65, 0.5), 12, 24),
    move(vmirror(resize(triangle("#c8ab37"), 0.65, 0.5)), 12, -20),
    cover,
  ].join(""),
  0.8,
  1,
);
