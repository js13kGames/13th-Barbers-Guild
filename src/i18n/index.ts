import { messages as enMessages } from "./en";
import { messages as ptMessages } from "./pt";

const params = new URL(document.location.href).searchParams;
const lang = params.get("lang");

export let i18n: typeof enMessages;

if (lang === "pt") {
  i18n = ptMessages;
} else {
  i18n = enMessages;
}
