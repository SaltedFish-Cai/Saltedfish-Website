// # Import
import PaColor from "./pa-color.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaColor"]) {
    app.component("PaColor", PaColor);
  }
};

export default {
  name: "PaColor",
  install
};
