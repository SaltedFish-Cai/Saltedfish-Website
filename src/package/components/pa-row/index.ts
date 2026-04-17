// # Import
import PaRow from "./pa-row.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaRow"]) app.component("PaRow", PaRow);
};

export default {
  name: "PaRow",
  install
};
