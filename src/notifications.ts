import { getElement } from "./utils";
import { theme } from "./theme";
import { dismissed } from "./events";

export function createNotifications(width: number, height: number) {
  const content = `
<div style="position: absolute; top: 0; left: 0; width: ${width}px; height: ${height}px; pointer-events: none; z-index: ${theme.layers.notification}">
<div id="${theme.ids.notification}">
<span></span>
</div>
</div>
`;
  setTimeout(() => {
    let messageId: string;
    let messages: string[] = [];
    function renderLatestMessage() {
      const message = messages.shift();
      const element = getElement(theme.ids.notification);
      const span = element.querySelector("span");
      const parent = element.parentElement;
      if (!span || !parent) {
        throw new Error("Missing span");
      }
      span.innerHTML = message ?? "";
      parent.style.setProperty("backdrop-filter", message ? "blur(2px)" : "none");
      element.style.display = message ? "flex" : "none";
      return Boolean(message);
    }
    function onNotify(event: WindowEventMap["notify"]) {
      messageId = event.detail.id;
      messages = event.detail.messages;
      renderLatestMessage();
    }
    function onDismiss() {
      const hasRendered = renderLatestMessage();
      if (!hasRendered) {
        window.dispatchEvent(dismissed(messageId));
      }
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
