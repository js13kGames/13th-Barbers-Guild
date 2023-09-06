import { getElement } from "./utils";
import { theme } from "./theme";

export function createNotifications(width: number, height: number) {
  const content = `
<div style="position: absolute; top: 0; left: 0; width: ${width}px; height: ${height}px">
<div id="${theme.ids.notification}" style="z-index: ${theme.layers.notification}">
<span></span>
</div>
</div>
`;
  setTimeout(() => {
    let messages: string[] = [];
    function renderLatestMessage() {
      const message = messages.shift();
      const element = getElement(theme.ids.notification);
      const span = element.querySelector("span");
      if (!span) {
        throw new Error("Missing span");
      }
      span.innerHTML = message ?? "";
      element.style.display = message ? "flex" : "none";
    }
    function onNotify(event: WindowEventMap["notify"]) {
      messages = event.detail.messages;
      renderLatestMessage();
    }
    function onDismiss() {
      renderLatestMessage();
    }
    window.addEventListener("notify", onNotify);
    window.addEventListener("dismiss", onDismiss);
    window.addEventListener("reset", () => {
      window.removeEventListener("notify", onNotify);
      window.removeEventListener("dismiss", onDismiss);
    });
  });
  return content;
}
