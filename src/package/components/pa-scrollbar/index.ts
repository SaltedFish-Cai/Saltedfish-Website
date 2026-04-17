// # Import
import PaScrollBar from "./pa-scrollbar.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaScrollBar"]) {
    app.component("PaScrollBar", PaScrollBar);
  }
};

export default {
  name: "PaScrollBar",
  install
};
