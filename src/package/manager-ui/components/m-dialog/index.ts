// # Import
import MDialog from "./m-dialog.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["MDialog"]) app.component("MDialog", MDialog);
};

export default {
  name: "MDialog",
  install
};
