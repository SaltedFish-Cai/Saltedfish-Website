// # Import
import MEditor from "./m-editor.vue";
import inBrowser from "../tools/inBrowser";

// # Var
if (inBrowser) {
  const script = window.document?.createElement("script") || {};
  const useDomain = window.location.href.includes("Saltedfish-Website") ? "/Saltedfish-Website" : "";
  script.src = useDomain + "/library/wangeditor.js";
  window.document?.head?.appendChild(script);
}

// #Function install
const install = function (app) {
  if (!app._context.components["MEditor"]) app.component("MEditor", MEditor);
};

export default {
  name: "MEditor",
  install
};
