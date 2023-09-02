export const potionClick = (color: string) =>
  new CustomEvent("potionClick", {
    bubbles: true,
    detail: { color },
  });

export const potionRelease = new Event("potionRelease", { bubbles: true });
