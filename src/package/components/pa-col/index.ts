// # Import
import PaCol from "./pa-col.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaCol"]) app.component("PaCol", PaCol);
};

export default {
  name: "PaCol",
  install
};
