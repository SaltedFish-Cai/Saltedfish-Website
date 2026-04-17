// # Import
import PaEditor from "./pa-editor.vue";
import inBrowser from "../tools/inBrowser";

// # Var
if (inBrowser) {
  const script = window.document?.createElement("script") || {};
  script.src = "/DocumentToDms/library/wangEditor.js";
  window.document?.head?.appendChild(script);
}

// #Function install
const install = function (app) {
  if (!app._context.components["PaEditor"]) app.component("PaEditor", PaEditor);
};

export default {
  name: "PaEditor",
  install
};
