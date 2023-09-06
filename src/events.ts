export const reset = () => new CustomEvent("reset");

export const potionClick = (color: string) =>
  new CustomEvent("potionClick", { bubbles: true, detail: { color } });

export const potionRelease = (color: string) =>
  new CustomEvent("potionRelease", { bubbles: true, detail: { color } });

export const cauldronDrop = (color: string) =>
  new CustomEvent("cauldronDrop", { bubbles: true, detail: { color } });

export const cauldronPrepared = (color: string) =>
  new CustomEvent("cauldronPrepared", { bubbles: true, detail: { color } });

export const notify = (id: string, messages: string[]) =>
  new CustomEvent("notify", { detail: { id, messages } });

export const dismiss = () => new CustomEvent("dismiss");

export const dismissed = (id: string) =>
  new CustomEvent("dismissed", { detail: { id } });
