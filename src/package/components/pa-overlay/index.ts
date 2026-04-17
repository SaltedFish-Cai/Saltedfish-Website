// # Import
import PaOverlay from "./pa-overlay.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaOverlay"]) app.component("PaOverlay", PaOverlay);
};

export default {
  name: "PaOverlay",
  install
};
