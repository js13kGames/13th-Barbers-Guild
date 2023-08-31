import { rect, move } from "./utils";
import { theme } from "./theme";

const brick = rect(50, 20, theme.brick, 5);

export function bricks() {
  return `${move(brick, 0, 20)}${move(brick, 20, 50)}${move(brick, 0, 80)}`;
}
