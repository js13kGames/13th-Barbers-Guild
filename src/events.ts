export const potionClick = (color: string) =>
  new CustomEvent("potionClick", { bubbles: true, detail: { color } });

export const potionRelease = (color: string) =>
  new CustomEvent("potionRelease", { bubbles: true, detail: { color } });

export const cauldronDrop = (color: string) =>
  new CustomEvent("cauldronDrop", { bubbles: true, detail: { color } });
