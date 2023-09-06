import { getElement } from "./utils";
import { theme } from "./theme";

export function createNotifications() {
  const content = `
<div id="${theme.ids.notification}" style="z-index: ${theme.layers.notification}">
</div>
`;
  setTimeout(() => {
    let messages: string[] = [];
    function onNotify(event: WindowEventMap["notify"]) {
      messages = event.detail.messages;
      const element = getElement(theme.ids.notification);
      element.innerHTML = messages.shift() ?? "";
      element.style.display = "block";
    }
    function onDismiss() {
      const message = messages.shift();
      const element = getElement(theme.ids.notification);
      element.innerHTML = message ?? "";
      if (!message) {
        element.style.display = "none";
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
