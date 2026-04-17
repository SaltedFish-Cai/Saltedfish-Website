// # Import
import PaDrawer from "./pa-drawer.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaDrawer"]) app.component("PaDrawer", PaDrawer);
};

export default {
  name: "PaDrawer",
  install
};
