// # Import
import PaDialog from "./pa-dialog.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaDialog"]) app.component("PaDialog", PaDialog);
};

export default {
  name: "PaDialog",
  install
};
